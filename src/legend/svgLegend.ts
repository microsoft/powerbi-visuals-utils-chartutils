/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.utils.chart.legend {
    // powerbi.visuals
    import ISelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility.utils.formatting
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    import font = powerbi.extensibility.utils.formatting.font;

    // powerbi.extensibility.utils.type
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;
    import Prototype = powerbi.extensibility.utils.type.Prototype;

    // powerbi.extensibility.utils.svg
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    import createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;
    import translate = powerbi.extensibility.utils.svg.translate;
    import createArrow = powerbi.extensibility.utils.svg.createArrow;

    // powerbi.extensibility.utils.interactivity
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import appendClearCatcher = powerbi.extensibility.utils.interactivity.appendClearCatcher;
    import dataHasSelection = powerbi.extensibility.utils.interactivity.dataHasSelection;

    interface TitleLayout {
        x: number;
        y: number;
        text: string;
        width: number;
        height: number;
    }

    const enum NavigationArrowType {
        Increase,
        Decrease
    }

    interface NavigationArrow {
        x: number;
        y: number;
        path: string;
        rotateTransform: string;
        dataType: NavigationArrowType;
    }

    interface LegendLayout {
        numberOfItems: number;
        title: TitleLayout;
        navigationArrows: NavigationArrow[];
    }

    interface LegendItem {
        dataPoint: LegendDataPoint;
        textProperties: TextProperties;
        width: number;
        desiredWidth: number;
        desiredOverMaxWidth: boolean;
    }

    export class SVGLegend implements ILegend {
        private orientation: LegendPosition;
        private viewport: IViewport;
        private parentViewport: IViewport;
        private svg: d3.Selection<any>;
        private group: d3.Selection<any>;
        private clearCatcher: d3.Selection<any>;
        private element: HTMLElement;
        private interactivityService: IInteractivityService;
        private interactiveBehavior?: IInteractiveBehavior;
        private legendDataStartIndex = 0;
        private arrowPosWindow = 1;
        private data: LegendData;
        private isScrollable: boolean;

        private lastCalculatedWidth = 0;
        private visibleLegendWidth = 0;
        private visibleLegendHeight = 0;
        private legendFontSizeMarginDifference = 0;
        private legendFontSizeMarginValue = 0;

        public static DefaultFontSizeInPt = 8;
        private static LegendIconRadius = 5;
        private static LegendIconRadiusFactor = 5;
        private static MaxTextLength = 60;
        private static TextAndIconPadding = 5;
        private static TitlePadding = 15;
        private static LegendEdgeMariginWidth = 10;
        private static LegendMaxWidthFactor = 0.3;
        private static TopLegendHeight = 24;
        private static DefaultTextMargin = PixelConverter.fromPointToPixel(SVGLegend.DefaultFontSizeInPt);
        private static LegendIconYRatio = 0.52;

        // Navigation Arrow constants
        private static LegendArrowOffset = 10;
        private static LegendArrowHeight = 15;
        private static LegendArrowWidth = 7.5;

        private static DefaultFontFamily: string = font.Family.regular.css;
        private static DefaultTitleFontFamily: string = font.Family.semibold.css;

        private static LegendItem: ClassAndSelector = createClassAndSelector("legendItem");
        private static LegendText: ClassAndSelector = createClassAndSelector("legendText");
        private static LegendIcon: ClassAndSelector = createClassAndSelector("legendIcon");
        private static LegendTitle: ClassAndSelector = createClassAndSelector("legendTitle");
        private static NavigationArrow: ClassAndSelector = createClassAndSelector("navArrow");

        constructor(
            element: HTMLElement,
            legendPosition: LegendPosition,
            interactivityService: IInteractivityService,
            isScrollable: boolean,
            interactiveBehavior?: IInteractiveBehavior) {

            this.svg = d3.select(element)
                .append("svg")
                .style("position", "absolute");

            this.svg.style("display", "inherit");
            this.svg.classed("legend", true);

            if (interactivityService) {
                this.clearCatcher = appendClearCatcher(this.svg);
            }

            this.group = this.svg
                .append("g")
                .attr("id", "legendGroup");

            this.interactiveBehavior = interactiveBehavior ? interactiveBehavior : new LegendBehavior();
            this.interactivityService = interactivityService;
            this.isScrollable = isScrollable;
            this.element = element;
            this.changeOrientation(legendPosition);
            this.parentViewport = { height: 0, width: 0 };
            this.calculateViewport();
            this.updateLayout();
        }

        private updateLayout() {
            let legendViewport = this.viewport;
            let orientation = this.orientation;

            this.svg.attr({
                "height": legendViewport.height || (orientation === LegendPosition.None ? 0 : this.parentViewport.height),
                "width": legendViewport.width || (orientation === LegendPosition.None ? 0 : this.parentViewport.width)
            });

            let isRight = orientation === LegendPosition.Right || orientation === LegendPosition.RightCenter,
                isBottom = orientation === LegendPosition.Bottom || orientation === LegendPosition.BottomCenter;

            this.svg.style({
                "margin-left": isRight ? (this.parentViewport.width - legendViewport.width) + "px" : null,
                "margin-top": isBottom ? (this.parentViewport.height - legendViewport.height) + "px" : null,
            });
        }

        private calculateViewport(): void {
            switch (this.orientation) {
                case LegendPosition.Top:
                case LegendPosition.Bottom:
                case LegendPosition.TopCenter:
                case LegendPosition.BottomCenter:
                    let pixelHeight = PixelConverter.fromPointToPixel(this.data && this.data.fontSize
                        ? this.data.fontSize
                        : SVGLegend.DefaultFontSizeInPt);

                    let fontHeightSize = SVGLegend.TopLegendHeight + (pixelHeight - SVGLegend.DefaultFontSizeInPt);
                    this.viewport = { height: fontHeightSize, width: 0 };
                    return;
                case LegendPosition.Right:
                case LegendPosition.Left:
                case LegendPosition.RightCenter:
                case LegendPosition.LeftCenter:
                    let width = this.lastCalculatedWidth
                        ? this.lastCalculatedWidth
                        : this.parentViewport.width * SVGLegend.LegendMaxWidthFactor;

                    this.viewport = { height: 0, width: width };
                    return;

                case LegendPosition.None:
                    this.viewport = { height: 0, width: 0 };
            }
        }

        public getMargins(): IViewport {
            return this.viewport;
        }

        public isVisible(): boolean {
            return this.orientation !== LegendPosition.None;
        }

        public changeOrientation(orientation: LegendPosition): void {
            if (orientation) {
                this.orientation = orientation;
            } else {
                this.orientation = LegendPosition.Top;
            }

            this.svg.attr("orientation", orientation);
        }

        public getOrientation(): LegendPosition {
            return this.orientation;
        }

        public drawLegend(data: LegendData, viewport: IViewport): void {
            // clone because we modify legend item label with ellipsis if it is truncated
            let clonedData = Prototype.inherit(data),
                newDataPoints: LegendDataPoint[] = [];

            for (let dp of data.dataPoints) {
                newDataPoints.push(Prototype.inherit(dp));
            }

            clonedData.dataPoints = newDataPoints;

            this.setTooltipToLegendItems(clonedData);
            this.drawLegendInternal(clonedData, viewport, true /* perform auto width */);
        }

        public drawLegendInternal(data: LegendData, viewport: IViewport, autoWidth: boolean): void {
            this.parentViewport = viewport;
            this.data = data;

            if (this.interactivityService)
                this.interactivityService.applySelectionStateToData(data.dataPoints);

            if (data.dataPoints.length === 0) {
                this.changeOrientation(LegendPosition.None);
            }

            if (this.getOrientation() === LegendPosition.None) {
                data.dataPoints = [];
            }

            // Adding back the workaround for Legend Left/Right position for Map
            let mapControls = this.element.getElementsByClassName("mapControl");
            if (mapControls.length > 0 && !this.isTopOrBottom(this.orientation)) {
                for (let i = 0; i < mapControls.length; ++i) {
                    let element = <HTMLElement>mapControls[i];
                    element.style.display = "inline-block";
                }
            }

            this.calculateViewport();

            let layout = this.calculateLayout(data, autoWidth);
            let titleLayout = layout.title;
            let titleData = titleLayout ? [titleLayout] : [];
            let hasSelection = this.interactivityService && dataHasSelection(data.dataPoints);

            let group = this.group;

            // transform the wrapping group if position is centered
            if (this.isCentered(this.orientation)) {
                let centerOffset = 0;
                if (this.isTopOrBottom(this.orientation)) {
                    centerOffset = Math.max(0, (this.parentViewport.width - this.visibleLegendWidth) / 2);
                    group.attr("transform", translate(centerOffset, 0));
                }
                else {
                    centerOffset = Math.max((this.parentViewport.height - this.visibleLegendHeight) / 2);
                    group.attr("transform", translate(0, centerOffset));
                }
            }
            else {
                group.attr("transform", null);
            }

            let legendTitle = group
                .selectAll(SVGLegend.LegendTitle.selectorName)
                .data(titleData);

            legendTitle.enter()
                .append("text")
                .classed(SVGLegend.LegendTitle.className, true);

            legendTitle
                .style({
                    "fill": data.labelColor,
                    "font-size": PixelConverter.fromPoint(data.fontSize),
                    "font-family": SVGLegend.DefaultTitleFontFamily
                })
                .text((d: TitleLayout) => d.text)
                .attr({
                    "x": (d: TitleLayout) => d.x,
                    "y": (d: TitleLayout) => d.y
                })
                .append("title")
                .text(data.title);

            legendTitle
                .exit()
                .remove();

            let virtualizedDataPoints = data.dataPoints.slice(
                this.legendDataStartIndex,
                this.legendDataStartIndex + layout.numberOfItems);

            let iconRadius = textMeasurementService.estimateSvgTextHeight(SVGLegend.getTextProperties(false, "", this.data.fontSize)) / SVGLegend.LegendIconRadiusFactor;

            iconRadius = (this.legendFontSizeMarginValue > SVGLegend.DefaultTextMargin) && iconRadius > SVGLegend.LegendIconRadius
                ? iconRadius :
                SVGLegend.LegendIconRadius;

            let legendItems = group
                .selectAll(SVGLegend.LegendItem.selectorName)
                .data(virtualizedDataPoints, (d: LegendDataPoint) => {
                    return (d.identity as ISelectionId).getKey() + (d.layerNumber != null ? d.layerNumber : "");
                });

            let itemsEnter = legendItems.enter()
                .append("g")
                .classed(SVGLegend.LegendItem.className, true);

            itemsEnter
                .append("circle")
                .classed(SVGLegend.LegendIcon.className, true);

            itemsEnter
                .append("text")
                .classed(SVGLegend.LegendText.className, true);

            itemsEnter
                .append("title")
                .text((d: LegendDataPoint) => d.tooltip);

            legendItems
                .select(SVGLegend.LegendIcon.selectorName)
                .attr({
                    "cx": (d: LegendDataPoint, i) => d.glyphPosition.x,
                    "cy": (d: LegendDataPoint) => d.glyphPosition.y,
                    "r": iconRadius,
                });

            legendItems
                .select("title")
                .text((d: LegendDataPoint) => d.tooltip);

            legendItems
                .select(SVGLegend.LegendText.selectorName)
                .attr({
                    "x": (d: LegendDataPoint) => d.textPosition.x,
                    "y": (d: LegendDataPoint) => d.textPosition.y,
                })
                .text((d: LegendDataPoint) => d.label)
                .style({
                    "fill": data.labelColor,
                    "font-size": PixelConverter.fromPoint(data.fontSize)
                });

            if (this.interactivityService) {
                let iconsSelection = legendItems.select(SVGLegend.LegendIcon.selectorName);
                let behaviorOptions: LegendBehaviorOptions = {
                    legendItems: legendItems,
                    legendIcons: iconsSelection,
                    clearCatcher: this.clearCatcher,
                };

                this.interactivityService.bind(data.dataPoints, this.interactiveBehavior, behaviorOptions, { isLegend: true });
                this.interactiveBehavior.renderSelection(hasSelection);
            }

            legendItems.exit().remove();

            this.drawNavigationArrows(layout.navigationArrows);

            this.updateLayout();
        }

        private normalizePosition(points: any[]): void {
            if (this.legendDataStartIndex >= points.length) {
                this.legendDataStartIndex = points.length - 1;
            }

            if (this.legendDataStartIndex < 0) {
                this.legendDataStartIndex = 0;
            }
        }

        private calculateTitleLayout(title: string): TitleLayout {
            let width = 0,
                hasTitle = !!title;

            if (hasTitle) {
                let isHorizontal = this.isTopOrBottom(this.orientation),
                    maxMeasureLength: number;

                let textProperties = SVGLegend.getTextProperties(true, title, this.data.fontSize);
                let text = title;
                width = textMeasurementService.measureSvgTextWidth(textProperties);

                if (isHorizontal) {
                    width += SVGLegend.TitlePadding;
                } else {
                    text = textMeasurementService.getTailoredTextOrDefault(textProperties, this.viewport.width);
                }

                return {
                    x: 0,
                    y: 0,
                    text: text,
                    width: width,
                    height: textMeasurementService.estimateSvgTextHeight(textProperties)
                };
            }

            return null;
        }

        /** Performs layout offline for optimal perfomance */
        private calculateLayout(data: LegendData, autoWidth: boolean): LegendLayout {
            let dataPoints = data.dataPoints;
            if (data.dataPoints.length === 0) {
                return {
                    numberOfItems: 0,
                    title: null,
                    navigationArrows: []
                };
            }

            this.legendFontSizeMarginValue = PixelConverter.fromPointToPixel(this.data && this.data.fontSize !== undefined ? this.data.fontSize : SVGLegend.DefaultFontSizeInPt);
            this.legendFontSizeMarginDifference = (this.legendFontSizeMarginValue - SVGLegend.DefaultTextMargin);

            this.normalizePosition(dataPoints);
            if (this.legendDataStartIndex < dataPoints.length) {
                dataPoints = dataPoints.slice(this.legendDataStartIndex);
            }

            let title = this.calculateTitleLayout(data.title);

            let navArrows: NavigationArrow[];
            let numberOfItems: number;

            if (this.isTopOrBottom(this.orientation)) {
                navArrows = this.isScrollable ? this.calculateHorizontalNavigationArrowsLayout(title) : [];
                numberOfItems = this.calculateHorizontalLayout(dataPoints, title, navArrows);
            }
            else {
                navArrows = this.isScrollable ? this.calculateVerticalNavigationArrowsLayout(title) : [];
                numberOfItems = this.calculateVerticalLayout(dataPoints, title, navArrows, autoWidth);
            }

            return {
                numberOfItems: numberOfItems,
                title: title,
                navigationArrows: navArrows
            };
        }

        private updateNavigationArrowLayout(navigationArrows: NavigationArrow[], remainingDataLength: number, visibleDataLength: number): void {
            if (this.legendDataStartIndex === 0) {
                navigationArrows.shift();
            }

            let lastWindow = this.arrowPosWindow;
            this.arrowPosWindow = visibleDataLength;

            if (navigationArrows && navigationArrows.length > 0 && this.arrowPosWindow === remainingDataLength) {
                this.arrowPosWindow = lastWindow;
                navigationArrows.length = navigationArrows.length - 1;
            }
        }

        private calculateHorizontalNavigationArrowsLayout(title: TitleLayout): NavigationArrow[] {
            let height = SVGLegend.LegendArrowHeight;
            let width = SVGLegend.LegendArrowWidth;
            let translateY = (this.viewport.height / 2) - (height / 2);

            let data: NavigationArrow[] = [];
            let rightShift = title ? title.x + title.width : 0;
            let arrowLeft = createArrow(width, height, 180 /*angle*/);
            let arrowRight = createArrow(width, height, 0 /*angle*/);

            data.push({
                x: rightShift,
                y: translateY,
                path: arrowLeft.path,
                rotateTransform: arrowLeft.transform,
                dataType: NavigationArrowType.Decrease
            });

            data.push({
                x: this.parentViewport.width - width,
                y: translateY,
                path: arrowRight.path,
                rotateTransform: arrowRight.transform,
                dataType: NavigationArrowType.Increase
            });

            return data;
        }

        private calculateVerticalNavigationArrowsLayout(title: TitleLayout): NavigationArrow[] {
            let height = SVGLegend.LegendArrowHeight;
            let width = SVGLegend.LegendArrowWidth;

            let verticalCenter = this.viewport.height / 2;
            let data: NavigationArrow[] = [];
            let rightShift = verticalCenter + height / 2;
            let arrowTop = createArrow(width, height, 270 /*angle*/);
            let arrowBottom = createArrow(width, height, 90 /*angle*/);
            let titleHeight = title ? title.height : 0;

            data.push({
                x: rightShift,
                y: width + titleHeight,
                path: arrowTop.path,
                rotateTransform: arrowTop.transform,
                dataType: NavigationArrowType.Decrease
            });

            data.push({
                x: rightShift,
                y: this.parentViewport.height - height,
                path: arrowBottom.path,
                rotateTransform: arrowBottom.transform,
                dataType: NavigationArrowType.Increase
            });

            return data;
        }

        /**
         * Calculates the widths for each horizontal legend item.
         */
        private static calculateHorizontalLegendItemsWidths(dataPoints: LegendDataPoint[], availableWidth: number, iconPadding: number, fontSize: number): LegendItem[] {

            let dataPointsLength = dataPoints.length;

            // Set the maximum amount of space available to each item. They can use less, but can't go over this number.
            let maxItemWidth = dataPointsLength > 0 ? availableWidth / dataPointsLength | 0 : 0;
            let maxItemTextWidth = maxItemWidth - iconPadding;

            // Makes sure the amount of space available to each item is at least SVGLegend.MaxTextLength wide.
            // If you had many items and/or a narrow amount of available width, the availableTextWidthPerItem would be small, essentially making everything ellipsis.
            // This prevents that from happening by giving each item at least SVGLegend.MaxTextLength of space.
            if (maxItemTextWidth < SVGLegend.MaxTextLength) {
                maxItemTextWidth = SVGLegend.MaxTextLength;
                maxItemWidth = maxItemTextWidth + iconPadding;
            }

            // Make sure the availableWidthPerItem is less than the availableWidth. This lets the long text properly add ellipsis when we're displaying one item at a time.
            if (maxItemWidth > availableWidth) {
                maxItemWidth = availableWidth;
                maxItemTextWidth = maxItemWidth - iconPadding;
            }

            let occupiedWidth = 0;
            let legendItems: LegendItem[] = [];

            // Add legend items until we can't fit any more (the last one doesn't fit) or we've added all of them
            for (let dataPoint of dataPoints) {

                let textProperties = SVGLegend.getTextProperties(false, dataPoint.label, fontSize);
                let itemTextWidth = textMeasurementService.measureSvgTextWidth(textProperties);
                let desiredWidth = itemTextWidth + iconPadding;
                let overMaxWidth = desiredWidth > maxItemWidth;
                let actualWidth = overMaxWidth ? maxItemWidth : desiredWidth;
                occupiedWidth += actualWidth;

                if (occupiedWidth >= availableWidth) {

                    // Always add at least 1 element
                    if (legendItems.length === 0) {

                        legendItems.push({
                            dataPoint: dataPoint,
                            textProperties: textProperties,
                            desiredWidth: desiredWidth,
                            desiredOverMaxWidth: true,
                            width: desiredWidth
                        });

                        // Set the width to the amount of space we actually have
                        occupiedWidth = availableWidth;
                    } else {
                        // Subtract the width from what was just added since it won't fit
                        occupiedWidth -= actualWidth;
                    }
                    break;
                }

                legendItems.push({
                    dataPoint: dataPoint,
                    textProperties: textProperties,
                    desiredWidth: desiredWidth,
                    desiredOverMaxWidth: overMaxWidth,
                    width: desiredWidth
                });
            }

            // If there are items at max width, evenly redistribute the extra space to them
            let itemsOverMax = legendItems.filter((li: LegendItem) => li.desiredOverMaxWidth);
            let numItemsOverMax = itemsOverMax.length;

            if (numItemsOverMax > 0) {
                let extraWidth = availableWidth - occupiedWidth;

                for (let item of itemsOverMax) {
                    // Divvy up the extra space and add it to the max
                    // We need to do this calculation in every loop since the remainingWidth may not be changed by the same amount every time
                    let extraWidthPerItem = extraWidth / numItemsOverMax;
                    let newMaxItemWidth = maxItemWidth + extraWidthPerItem;

                    let usedExtraWidth: number;
                    if (item.desiredWidth <= newMaxItemWidth) {
                        // If the item doesn't need all the extra space, it's not at max anymore
                        item.desiredOverMaxWidth = false;
                        usedExtraWidth = item.desiredWidth - maxItemWidth;
                    } else {
                        // Otherwise the item is taking up all the extra space so update the actual width to indicate that
                        item.width = newMaxItemWidth;
                        usedExtraWidth = newMaxItemWidth - maxItemWidth;
                    }

                    extraWidth -= usedExtraWidth;
                    numItemsOverMax--;
                }
            }

            return legendItems;
        }

        private calculateHorizontalLayout(dataPoints: LegendDataPoint[], title: TitleLayout, navigationArrows: NavigationArrow[]): number {
            // calculate the text shift
            let HorizontalTextShift = 4 + SVGLegend.LegendIconRadius;
            // check if we need more space for the margin, or use the default text padding
            let fontSizeBiggerThanDefault = this.legendFontSizeMarginDifference > 0;
            let fontSizeMargin = fontSizeBiggerThanDefault ? SVGLegend.TextAndIconPadding + this.legendFontSizeMarginDifference : SVGLegend.TextAndIconPadding;
            let fixedTextShift = (fontSizeMargin / (SVGLegend.LegendIconRadiusFactor / 2)) + HorizontalTextShift;
            let occupiedWidth = 0;
            // calculate the size of the space for both sides of the radius
            let iconTotalItemPadding = SVGLegend.LegendIconRadius * 2 + fontSizeMargin * 1.5;
            let numberOfItems: number = dataPoints.length;
            // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
            let defaultTextProperties = SVGLegend.getTextProperties(false, "", this.data.fontSize);
            let verticalCenter = this.viewport.height / 2;
            let textYCoordinate = verticalCenter + textMeasurementService.estimateSvgTextHeight(defaultTextProperties) / 2
                - textMeasurementService.estimateSvgTextBaselineDelta(defaultTextProperties);

            if (title) {
                occupiedWidth += title.width;
                // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
                title.y = verticalCenter + title.height / 2 - textMeasurementService.estimateSvgTextBaselineDelta(SVGLegend.getTextProperties(true, title.text, this.data.fontSize));
            }

            // if an arrow should be added, we add space for it
            if (this.legendDataStartIndex > 0) {
                occupiedWidth += SVGLegend.LegendArrowOffset;
            }

            // Calculate the width for each of the legend items
            let dataPointsLength = dataPoints.length;
            let availableWidth = this.parentViewport.width - occupiedWidth;
            let legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(dataPoints, availableWidth, iconTotalItemPadding, this.data.fontSize);
            numberOfItems = legendItems.length;

            // If we can't show all the legend items, subtract the "next" arrow space from the available space and re-run the width calculations
            if (numberOfItems !== dataPointsLength) {
                availableWidth -= SVGLegend.LegendArrowOffset;
                legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(dataPoints, availableWidth, iconTotalItemPadding, this.data.fontSize);
                numberOfItems = legendItems.length;
            }

            for (let legendItem of legendItems) {

                let dataPoint = legendItem.dataPoint;

                dataPoint.glyphPosition = {
                    // the space taken so far + the radius + the margin / radiusFactor to prevent huge spaces
                    x: occupiedWidth + SVGLegend.LegendIconRadius + (this.legendFontSizeMarginDifference / SVGLegend.LegendIconRadiusFactor),
                    // The middle of the container but a bit lower due to text not being in the middle (qP for example making middle between q and P)
                    y: (this.viewport.height * SVGLegend.LegendIconYRatio),
                };

                dataPoint.textPosition = {
                    x: occupiedWidth + fixedTextShift,
                    y: textYCoordinate,
                };

                // If we're over the max width, process it so it fits
                if (legendItem.desiredOverMaxWidth) {
                    let textWidth = legendItem.width - iconTotalItemPadding;
                    let text = textMeasurementService.getTailoredTextOrDefault(legendItem.textProperties, textWidth);
                    dataPoint.label = text;
                }

                occupiedWidth += legendItem.width;
            }

            this.visibleLegendWidth = occupiedWidth;
            this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);

            return numberOfItems;
        }

        private calculateVerticalLayout(
            dataPoints: LegendDataPoint[],
            title: TitleLayout,
            navigationArrows: NavigationArrow[],
            autoWidth: boolean): number {
            // check if we need more space for the margin, or use the default text padding
            let fontSizeBiggerThenDefault = this.legendFontSizeMarginDifference > 0;
            let fontFactor = fontSizeBiggerThenDefault ? this.legendFontSizeMarginDifference : 0;
            // calculate the size needed after font size change
            let verticalLegendHeight = 20 + fontFactor;
            let spaceNeededByTitle = 15 + fontFactor;
            let extraShiftForTextAlignmentToIcon = 4 + fontFactor;
            let totalSpaceOccupiedThusFar = verticalLegendHeight;
            // the default space for text and icon radius + the margin after the font size change
            let fixedHorizontalIconShift = SVGLegend.TextAndIconPadding + SVGLegend.LegendIconRadius + (this.legendFontSizeMarginDifference / SVGLegend.LegendIconRadiusFactor);
            let fixedHorizontalTextShift = fixedHorizontalIconShift * 2;
            // check how much space is needed
            let maxHorizontalSpaceAvaliable = autoWidth
                ? this.parentViewport.width * SVGLegend.LegendMaxWidthFactor
                - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth
                : this.lastCalculatedWidth
                - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth;
            let numberOfItems: number = dataPoints.length;

            let maxHorizontalSpaceUsed = 0;
            let parentHeight = this.parentViewport.height;

            if (title) {
                totalSpaceOccupiedThusFar += spaceNeededByTitle;
                title.x = SVGLegend.TextAndIconPadding;
                title.y = spaceNeededByTitle;
                maxHorizontalSpaceUsed = title.width || 0;
            }
            // if an arrow should be added, we add space for it
            if (this.legendDataStartIndex > 0)
                totalSpaceOccupiedThusFar += SVGLegend.LegendArrowOffset;

            let dataPointsLength = dataPoints.length;
            for (let i = 0; i < dataPointsLength; i++) {
                let dp = dataPoints[i];
                let textProperties = SVGLegend.getTextProperties(false, dp.label, this.data.fontSize);

                dp.glyphPosition = {
                    x: fixedHorizontalIconShift,
                    y: (totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon) - textMeasurementService.estimateSvgTextBaselineDelta(textProperties)
                };

                dp.textPosition = {
                    x: fixedHorizontalTextShift,
                    y: totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon
                };

                // TODO: [PERF] Get rid of this extra measurement, and modify
                // getTailoredTextToReturnWidth + Text
                let width = textMeasurementService.measureSvgTextWidth(textProperties);
                if (width > maxHorizontalSpaceUsed) {
                    maxHorizontalSpaceUsed = width;
                }

                if (width > maxHorizontalSpaceAvaliable) {
                    let text = textMeasurementService.getTailoredTextOrDefault(
                        textProperties,
                        maxHorizontalSpaceAvaliable);
                    dp.label = text;
                }

                totalSpaceOccupiedThusFar += verticalLegendHeight;

                if (totalSpaceOccupiedThusFar > parentHeight) {
                    numberOfItems = i;
                    break;
                }
            }

            if (autoWidth) {
                if (maxHorizontalSpaceUsed < maxHorizontalSpaceAvaliable) {
                    this.lastCalculatedWidth = this.viewport.width = Math.ceil(maxHorizontalSpaceUsed + fixedHorizontalTextShift + SVGLegend.LegendEdgeMariginWidth);
                } else {
                    this.lastCalculatedWidth = this.viewport.width = Math.ceil(this.parentViewport.width * SVGLegend.LegendMaxWidthFactor);
                }
            }
            else {
                this.viewport.width = this.lastCalculatedWidth;
            }

            this.visibleLegendHeight = totalSpaceOccupiedThusFar;

            navigationArrows.forEach(d => d.x = this.lastCalculatedWidth / 2);
            this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);

            return numberOfItems;
        }

        private drawNavigationArrows(layout: NavigationArrow[]): void {
            let arrows = this.group.selectAll(SVGLegend.NavigationArrow.selectorName)
                .data(layout);

            arrows
                .enter()
                .append("g")
                .on("click", (d: NavigationArrow) => {
                    let pos = this.legendDataStartIndex;
                    this.legendDataStartIndex = d.dataType === NavigationArrowType.Increase
                        ? pos + this.arrowPosWindow : pos - this.arrowPosWindow;
                    this.drawLegendInternal(this.data, this.parentViewport, false);
                })
                .classed(SVGLegend.NavigationArrow.className, true)
                .append("path");

            arrows
                .attr("transform", (d: NavigationArrow) => translate(d.x, d.y))
                .select("path")
                .attr({
                    "d": (d: NavigationArrow) => d.path,
                    "transform": (d: NavigationArrow) => d.rotateTransform
                });

            arrows
                .exit()
                .remove();
        }

        private isTopOrBottom(orientation: LegendPosition): boolean {
            switch (orientation) {
                case LegendPosition.Top:
                case LegendPosition.Bottom:
                case LegendPosition.BottomCenter:
                case LegendPosition.TopCenter:
                    return true;
                default:
                    return false;
            }
        }

        private isCentered(orientation: LegendPosition): boolean {
            switch (orientation) {
                case LegendPosition.BottomCenter:
                case LegendPosition.LeftCenter:
                case LegendPosition.RightCenter:
                case LegendPosition.TopCenter:
                    return true;
                default:
                    return false;
            }
        }

        public reset(): void { }

        private static getTextProperties(isTitle: boolean, text?: string, fontSize?: number): TextProperties {
            return {
                text: text,
                fontFamily: isTitle
                    ? SVGLegend.DefaultTitleFontFamily
                    : SVGLegend.DefaultFontFamily,
                fontSize: PixelConverter.fromPoint(fontSize || SVGLegend.DefaultFontSizeInPt)
            };
        }

        private setTooltipToLegendItems(data: LegendData) {
            // we save the values to tooltip before cut
            for (let dataPoint of data.dataPoints) {
                dataPoint.tooltip = dataPoint.label;
            }
        }
    }
}
