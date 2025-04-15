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

import {
    select,
    Selection,
    BaseType
} from "d3-selection";
import powerbi from "powerbi-visuals-api";
import { textMeasurementService, interfaces } from "powerbi-visuals-utils-formattingutils";
import { pixelConverter as PixelConverter, prototype as Prototype } from "powerbi-visuals-utils-typeutils";

import {
    CssConstants,
    manipulation as svgManipulation
} from "powerbi-visuals-utils-svgutils";

import { ILegend, LegendData, LegendDataPoint, LegendPosition } from "./legendInterfaces";

import * as Markers from "./markers";

import {
    LineStyle,
    MarkerShape
} from "./legendInterfaces";

// powerbi.visuals
import ISelectionId = powerbi.visuals.ISelectionId;

// powerbi.extensibility.utils.formatting
import TextProperties = interfaces.TextProperties;

// powerbi.extensibility.utils.svg
import ClassAndSelector = CssConstants.ClassAndSelector;
import createClassAndSelector = CssConstants.createClassAndSelector;

export interface TitleLayout {
    x: number;
    y: number;
    text: string;
    width: number;
    height: number;
}

export const enum NavigationArrowType {
    Increase,
    Decrease
}

export interface NavigationArrow {
    x: number;
    y: number;
    path: string;
    rotateTransform: string;
    dataType: NavigationArrowType;
}

export interface LegendLayout {
    numberOfItems: number;
    title: TitleLayout;
    navigationArrows: NavigationArrow[];
}

export interface LegendItem {
    dataPoint: LegendDataPoint;
    textProperties: TextProperties;
    width: number;
    desiredWidth: number;
    desiredOverMaxWidth: boolean;
}

export class SVGLegend implements ILegend {
    private orientation: LegendPosition;
    private viewport: powerbi.IViewport;
    private parentViewport: powerbi.IViewport;
    private svg: Selection<any, any, any, any>;
    private group: Selection<any, any, any, any>;
    private element: HTMLElement;
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

    private static LegendItem: ClassAndSelector = createClassAndSelector("legendItem");
    private static LegendText: ClassAndSelector = createClassAndSelector("legendText");
    private static LegendIcon: ClassAndSelector = createClassAndSelector("legendIcon");
    private static LegendTitle: ClassAndSelector = createClassAndSelector("legendTitle");
    private static NavigationArrow: ClassAndSelector = createClassAndSelector("navArrow");

    constructor(
        element: HTMLElement,
        legendPosition: LegendPosition,
        isScrollable: boolean
    ) {

        this.svg = select(element)
            .append("svg")
            .style("position", "absolute");

        this.svg.style("display", "inherit");
        this.svg.classed("legend", true);

        this.group = this.svg
            .append("g")
            .attr("id", "legendGroup");

        this.isScrollable = isScrollable;
        this.element = element;
        this.changeOrientation(legendPosition);
        this.parentViewport = { height: 0, width: 0 };
        this.calculateViewport();
        this.updateLayout();
    }

    private updateLayout() {
        const legendViewport = this.viewport;
        const orientation = this.orientation;

        this.svg.attr(
            "height", legendViewport.height || (orientation === LegendPosition.None ? 0 : this.parentViewport.height)
        );
        this.svg.attr(
            "width", legendViewport.width || (orientation === LegendPosition.None ? 0 : this.parentViewport.width)
        );

        const isRight = orientation === LegendPosition.Right || orientation === LegendPosition.RightCenter,
            isBottom = orientation === LegendPosition.Bottom || orientation === LegendPosition.BottomCenter;

        this.svg.style(
            "margin-left", isRight ? (this.parentViewport.width - legendViewport.width) + "px" : null
        );
        this.svg.style(
            "margin-top", isBottom ? (this.parentViewport.height - legendViewport.height) + "px" : null,
        );
    }

    private calculateViewport(): void {
        switch (this.orientation) {
            case LegendPosition.Top:
            case LegendPosition.Bottom:
            case LegendPosition.TopCenter:
            case LegendPosition.BottomCenter:
                const pixelHeight = PixelConverter.fromPointToPixel(this.data && this.data.fontSize
                    ? this.data.fontSize
                    : SVGLegend.DefaultFontSizeInPt);

                const fontHeightSize = SVGLegend.TopLegendHeight + (pixelHeight - SVGLegend.DefaultFontSizeInPt);
                this.viewport = { height: fontHeightSize, width: 0 };
                return;
            case LegendPosition.Right:
            case LegendPosition.Left:
            case LegendPosition.RightCenter:
            case LegendPosition.LeftCenter:
                const width = this.lastCalculatedWidth
                    ? this.lastCalculatedWidth
                    : this.parentViewport.width * SVGLegend.LegendMaxWidthFactor;

                this.viewport = { height: 0, width: width };
                return;

            case LegendPosition.None:
                this.viewport = { height: 0, width: 0 };
        }
    }

    public getMargins(): powerbi.IViewport {
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

    public drawLegend(data: LegendData, viewport: powerbi.IViewport): void {
        // clone because we modify legend item label with ellipsis if it is truncated
        const clonedData = Prototype.inherit(data),
            newDataPoints: LegendDataPoint[] = [];

        for (const dp of data.dataPoints) {
            newDataPoints.push(Prototype.inherit(dp));
        }

        clonedData.dataPoints = newDataPoints;

        this.setTooltipToLegendItems(clonedData);
        this.drawLegendInternal(clonedData, viewport, true /* perform auto width */);
    }

    public drawLegendInternal(data: LegendData, viewport: powerbi.IViewport, autoWidth: boolean): void {
        this.parentViewport = viewport;
        this.data = data;

        if (data.dataPoints.length === 0) {
            this.changeOrientation(LegendPosition.None);
        }

        if (this.getOrientation() === LegendPosition.None) {
            data.dataPoints = [];
        }

        // Adding back the workaround for Legend Left/Right position for Map
        const mapControls = this.element.getElementsByClassName("mapControl");
        if (mapControls.length > 0 && !this.isTopOrBottom(this.orientation)) {
            for (let i = 0; i < mapControls.length; ++i) {
                const element = <HTMLElement>mapControls[i];
                element.style.display = "inline-block";
            }
        }

        this.calculateViewport();

        const layout = this.calculateLayout(data, autoWidth);
        const titleLayout = layout.title;
        const titleData = titleLayout ? [titleLayout] : [];

        const group = this.group;

        // transform the wrapping group if position is centered
        if (this.isCentered(this.orientation)) {
            let centerOffset = 0;
            if (this.isTopOrBottom(this.orientation)) {
                centerOffset = Math.max(0, (this.parentViewport.width - this.visibleLegendWidth) / 2);
                group.attr("transform", svgManipulation.translate(centerOffset, 0));
            }
            else {
                centerOffset = Math.max((this.parentViewport.height - this.visibleLegendHeight) / 2);
                group.attr("transform", svgManipulation.translate(0, centerOffset));
            }
        }
        else {
            group.attr("transform", null);
        }

        const legendTitle = group
            .selectAll(SVGLegend.LegendTitle.selectorName);

        const legendTitleData = legendTitle.data(titleData);

        const enteredLegendTitle = legendTitleData
            .enter()
            .append("text")
            .classed(SVGLegend.LegendTitle.className, true);

        legendTitleData
            .merge(enteredLegendTitle)
            .style("fill", data.labelColor)
            .style("font-size", PixelConverter.fromPoint(data.fontSize))
            .style("font-family", data.fontFamily)
            .style("font-weight", data.fontWeight)
            .style("font-style", data.fontStyle)
            .style("text-decoration", data.textDecoration)
            .text((d: TitleLayout) => d.text)
            .attr("x", (d: TitleLayout) => d.x)
            .attr("y", (d: TitleLayout) => d.y)
            .append("title")
            .text(data.title);

        legendTitleData
            .exit()
            .remove();

        const virtualizedDataPoints = data.dataPoints.slice(
            this.legendDataStartIndex,
            this.legendDataStartIndex + layout.numberOfItems);

        const legendItems = group
            .selectAll(SVGLegend.LegendItem.selectorName)
            .data(virtualizedDataPoints, (d: LegendDataPoint) => {
                return (d.identity as ISelectionId).getKey() + (d.layerNumber != null ? d.layerNumber : "");
            });

        const itemsEnter = legendItems.enter()
            .append("g")
            .classed(SVGLegend.LegendItem.className, true);

        itemsEnter
            .append("path")
            .classed(SVGLegend.LegendIcon.className, true);

        itemsEnter
            .append("text")
            .classed(SVGLegend.LegendText.className, true);

        itemsEnter
            .append("title")
            .text((d: LegendDataPoint) => d.tooltip);

        legendItems
            .merge(itemsEnter)
            .select(SVGLegend.LegendIcon.selectorName)
            .attr("transform", (dataPoint: LegendDataPoint) => {
                return svgManipulation.translateAndScale(
                    dataPoint.glyphPosition.x,
                    dataPoint.glyphPosition.y,
                    this.getIconScale(dataPoint.markerShape)
                );
            })
            .attr("d", (dataPoint: LegendDataPoint) => {
                return Markers.getPath(dataPoint.markerShape || MarkerShape.circle);
            })
            .attr("stroke-width", (dataPoint: LegendDataPoint) => {
                if (dataPoint.lineStyle) {
                    return 2;
                }

                return Markers.getStrokeWidth(dataPoint.markerShape || MarkerShape.circle);
            })
            .style("fill", (dataPoint: LegendDataPoint) => {
                if (dataPoint.lineStyle) {
                    return null;
                }

                return dataPoint.color;
            })
            .style("stroke", (dataPoint: LegendDataPoint) => dataPoint.color)
            .style("stroke-dasharray", (dataPoint: LegendDataPoint) => {
                if (dataPoint.lineStyle) {
                    return SVGLegend.getStrokeDashArrayForLegend(dataPoint.lineStyle);
                }

                return null;
            })
            .style("stroke-linejoin", "round");

        legendItems
            .merge(itemsEnter)
            .select("title")
            .text((dataPoint: LegendDataPoint) => dataPoint.tooltip);

        const mergedLegendItems = legendItems.merge(itemsEnter);

        mergedLegendItems
            .select(SVGLegend.LegendText.selectorName)
            .attr("x", (dataPoint: LegendDataPoint) => dataPoint.textPosition.x)
            .attr("y", (dataPoint: LegendDataPoint) => dataPoint.textPosition.y)
            .text((d: LegendDataPoint) => d.label)
            .style("fill", data.labelColor)
            .style("font-size", PixelConverter.fromPoint(data.fontSize))
            .style("font-family", data.fontFamily)
            .style("font-weight", data.fontWeight)
            .style("font-style", data.fontStyle)
            .style("text-decoration", data.textDecoration);

        legendItems
            .exit()
            .remove();

        this.drawNavigationArrows(layout.navigationArrows);

        this.updateLayout();
    }

    private static getStrokeDashArrayForLegend(style: LineStyle): string {
        switch (style) {
            case LineStyle.dashed: {
                return "7,5";
            }
            case LineStyle.dotted: {
                return "2.5,3.1";
            }
            case LineStyle.dotdash: {
                return "2.5,3.1,7,3.1";
            }
            case LineStyle.dashdot: {
                return "7,3.1,2.5,3.1";
            }
            case LineStyle.solid: {
                return null;
            }
        }
    }

    private normalizePosition(points: LegendDataPoint[]): void {
        if (this.legendDataStartIndex >= points.length) {
            this.legendDataStartIndex = points.length - 1;
        }

        if (this.legendDataStartIndex < 0) {
            this.legendDataStartIndex = 0;
        }
    }

    private calculateTitleLayout(title: string): TitleLayout {
        let width = 0;
        const hasTitle = !!title;

        if (hasTitle) {
            const isHorizontal = this.isTopOrBottom(this.orientation);

            const textProperties = SVGLegend.getTextProperties(title, this.data.fontSize, this.data.fontFamily);
            let text = title;
            width = textMeasurementService.measureSvgTextWidth(textProperties);

            if (isHorizontal) {
                const maxTitleWidth = this.parentViewport.width * SVGLegend.LegendMaxWidthFactor - SVGLegend.TitlePadding;
                text = textMeasurementService.getTailoredTextOrDefault(textProperties, maxTitleWidth);

                if (width > maxTitleWidth){
                    width = maxTitleWidth;
                }
                width += SVGLegend.TitlePadding;
            } else {
                text = textMeasurementService.getTailoredTextOrDefault(textProperties, this.viewport.width);
            }

            return {
                text,
                width,
                x: 0,
                y: 0,
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

        const title: TitleLayout = this.calculateTitleLayout(data.title);

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
            numberOfItems,
            title,
            navigationArrows: navArrows
        };
    }

    private updateNavigationArrowLayout(navigationArrows: NavigationArrow[], remainingDataLength: number, visibleDataLength: number): void {
        if (this.legendDataStartIndex === 0) {
            navigationArrows.shift();
        }

        const lastWindow = this.arrowPosWindow;
        this.arrowPosWindow = visibleDataLength;

        if (navigationArrows && navigationArrows.length > 0 && this.arrowPosWindow === remainingDataLength) {
            this.arrowPosWindow = lastWindow;
            navigationArrows.length = navigationArrows.length - 1;
        }
    }

    private calculateHorizontalNavigationArrowsLayout(title: TitleLayout): NavigationArrow[] {
        const height = SVGLegend.LegendArrowHeight;
        const width = SVGLegend.LegendArrowWidth;
        const translateY = (this.viewport.height / 2) - (height / 2);

        const data: NavigationArrow[] = [];
        const rightShift = title ? title.x + title.width : 0;
        const arrowLeft = svgManipulation.createArrow(width, height, 180 /*angle*/);
        const arrowRight = svgManipulation.createArrow(width, height, 0 /*angle*/);

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
        const height = SVGLegend.LegendArrowHeight;
        const width = SVGLegend.LegendArrowWidth;

        const verticalCenter = this.viewport.height / 2;
        const data: NavigationArrow[] = [];
        const rightShift = verticalCenter + height / 2;
        const arrowTop = svgManipulation.createArrow(width, height, 270 /*angle*/);
        const arrowBottom = svgManipulation.createArrow(width, height, 90 /*angle*/);
        const titleHeight = title ? title.height : 0;

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
    private static calculateHorizontalLegendItemsWidths(
        dataPoints: LegendDataPoint[],
        availableWidth: number,
        iconPadding: number,
        fontSize: number,
        fontFamily: string,
    ): LegendItem[] {

        const dataPointsLength = dataPoints.length;

        // Set the maximum amount of space available to each item. They can use less, but can"t go over this number.
        let maxItemWidth = dataPointsLength > 0 ? availableWidth / dataPointsLength | 0 : 0;
        let maxItemTextWidth = maxItemWidth - iconPadding;

        // Makes sure the amount of space available to each item is at least SVGLegend.MaxTextLength wide.
        // If you had many items and/or a narrow amount of available width, the availableTextWidthPerItem would be small, essentially making everything ellipsis.
        // This prevents that from happening by giving each item at least SVGLegend.MaxTextLength of space.
        if (maxItemTextWidth < SVGLegend.MaxTextLength) {
            maxItemTextWidth = SVGLegend.MaxTextLength;
            maxItemWidth = maxItemTextWidth + iconPadding;
        }

        // Make sure the availableWidthPerItem is less than the availableWidth. This lets the long text properly add ellipsis when we"re displaying one item at a time.
        if (maxItemWidth > availableWidth) {
            maxItemWidth = availableWidth;
            maxItemTextWidth = maxItemWidth - iconPadding;
        }

        let occupiedWidth = 0;
        const legendItems: LegendItem[] = [];

        // Add legend items until we can"t fit any more (the last one doesn"t fit) or we"ve added all of them
        for (const dataPoint of dataPoints) {

            const textProperties = SVGLegend.getTextProperties(dataPoint.label, fontSize, fontFamily);
            const itemTextWidth = textMeasurementService.measureSvgTextWidth(textProperties);
            const desiredWidth = itemTextWidth + iconPadding;
            const overMaxWidth = desiredWidth > maxItemWidth;
            const actualWidth = overMaxWidth ? maxItemWidth : desiredWidth;
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
                    // Subtract the width from what was just added since it won"t fit
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
        const itemsOverMax = legendItems.filter((li: LegendItem) => li.desiredOverMaxWidth);
        let numItemsOverMax = itemsOverMax.length;

        if (numItemsOverMax > 0) {
            let extraWidth = availableWidth - occupiedWidth;

            for (const item of itemsOverMax) {
                // Divvy up the extra space and add it to the max
                // We need to do this calculation in every loop since the remainingWidth may not be changed by the same amount every time
                const extraWidthPerItem = extraWidth / numItemsOverMax;
                const newMaxItemWidth = maxItemWidth + extraWidthPerItem;

                let usedExtraWidth: number;
                if (item.desiredWidth <= newMaxItemWidth) {
                    // If the item doesn"t need all the extra space, it"s not at max anymore
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
        const fontSizeBiggerThanDefault = this.legendFontSizeMarginDifference > 0;

        const fontSizeMargin = fontSizeBiggerThanDefault
            ? SVGLegend.TextAndIconPadding + this.legendFontSizeMarginDifference
            : SVGLegend.TextAndIconPadding;

        let occupiedWidth = 0;

        const firstDataPointMarkerShape: MarkerShape = dataPoints && dataPoints[0] && dataPoints[0].markerShape;

        const iconTotalItemPadding = this.getMarkerShapeWidth(firstDataPointMarkerShape) + fontSizeMargin * 1.5;

        let numberOfItems: number = dataPoints.length;
        // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
        const defaultTextProperties = SVGLegend.getTextProperties("", this.data.fontSize, this.data.fontFamily);
        const verticalCenter = this.viewport.height / 2;
        const textYCoordinate = verticalCenter + textMeasurementService.estimateSvgTextHeight(defaultTextProperties) / 2
            - textMeasurementService.estimateSvgTextBaselineDelta(defaultTextProperties);

        if (title) {
            occupiedWidth += title.width;
            // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
            title.y = verticalCenter
                + title.height / 2
                - textMeasurementService.estimateSvgTextBaselineDelta(SVGLegend.getTextProperties(title.text, this.data.fontSize, this.data.fontFamily));
        }

        // if an arrow should be added, we add space for it
        if (this.legendDataStartIndex > 0) {
            occupiedWidth += SVGLegend.LegendArrowOffset;
        }

        // Calculate the width for each of the legend items
        const dataPointsLength = dataPoints.length;
        let availableWidth = this.parentViewport.width - occupiedWidth;

        let legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(
            dataPoints,
            availableWidth,
            iconTotalItemPadding,
            this.data.fontSize,
            this.data.fontFamily,
        );

        numberOfItems = legendItems.length;

        // If we can"t show all the legend items, subtract the "next" arrow space from the available space and re-run the width calculations
        if (numberOfItems !== dataPointsLength) {
            availableWidth -= SVGLegend.LegendArrowOffset;

            legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(
                dataPoints,
                availableWidth,
                iconTotalItemPadding,
                this.data.fontSize,
                this.data.fontFamily,
            );

            numberOfItems = legendItems.length;
        }

        for (const legendItem of legendItems) {
            const { dataPoint } = legendItem;

            const markerShapeWidth: number = this.getMarkerShapeWidth(dataPoint.markerShape);

            dataPoint.glyphPosition = {
                // the space taken so far + the radius + the margin / radiusFactor to prevent huge spaces
                x: occupiedWidth + markerShapeWidth / 2 + (this.legendFontSizeMarginDifference / this.getLegendIconFactor(dataPoint.markerShape)),
                // The middle of the container but a bit lower due to text not being in the middle (qP for example making middle between q and P)
                y: this.viewport.height * SVGLegend.LegendIconYRatio,
            };

            const fixedTextShift = (fontSizeMargin / (this.getLegendIconFactor(dataPoint.markerShape) / 2)) + markerShapeWidth;

            dataPoint.textPosition = {
                x: occupiedWidth + fixedTextShift,
                y: textYCoordinate,
            };

            // If we're over the max width, process it so it fits
            if (legendItem.desiredOverMaxWidth) {
                const textWidth = legendItem.width - iconTotalItemPadding;

                dataPoint.label = textMeasurementService.getTailoredTextOrDefault(legendItem.textProperties, textWidth);
            }

            occupiedWidth += legendItem.width;
        }

        this.visibleLegendWidth = occupiedWidth;
        this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);

        return numberOfItems;
    }

    private getMarkerShapeWidth(markerShape: MarkerShape): number {
        switch (markerShape) {
            case MarkerShape.longDash: {
                return Markers.LegendIconLineTotalWidth;
            }
            default: {
                return SVGLegend.LegendIconRadius * 2;
            }
        }
    }

    private getLegendIconFactor(markerShape: MarkerShape): number {
        switch (markerShape) {
            case MarkerShape.circle:
            case MarkerShape.square: {
                return 5;
            }
            default: {
                return 6;
            }
        }
    }

    private getIconScale(markerShape: MarkerShape): number {
        switch (markerShape) {
            case MarkerShape.circle:
            case MarkerShape.square: {
                return SVGLegend.LegendIconRadius / Markers.defaultSize;
            }
            default: {
                return 1;
            }
        }
    }

    private calculateVerticalLayout(
        dataPoints: LegendDataPoint[],
        title: TitleLayout,
        navigationArrows: NavigationArrow[],
        autoWidth: boolean
    ): number {
        // check if we need more space for the margin, or use the default text padding
        const fontSizeBiggerThenDefault = this.legendFontSizeMarginDifference > 0;
        const fontFactor = fontSizeBiggerThenDefault ? this.legendFontSizeMarginDifference : 0;
        
        // calculate the size needed after font size change
        const verticalLegendHeight = 20 + fontFactor;
        const spaceNeededByTitle = 15 + fontFactor;
        const extraShiftForTextAlignmentToIcon = 4 + fontFactor;
        let totalSpaceOccupiedThusFar = verticalLegendHeight;

        // the default space for text and icon radius + the margin after the font size change
        const firstDataPointMarkerShape: MarkerShape = dataPoints && dataPoints[0] && dataPoints[0].markerShape;
        const fixedHorizontalIconShift: number = SVGLegend.TextAndIconPadding 
            + this.getMarkerShapeWidth(firstDataPointMarkerShape) / 2
            + this.legendFontSizeMarginDifference;
        const fixedHorizontalTextShift = fixedHorizontalIconShift * 2;

        // check how much space is needed
        const maxHorizontalSpaceAvaliable = autoWidth
            ? this.parentViewport.width * SVGLegend.LegendMaxWidthFactor - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth
            : this.lastCalculatedWidth - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth;

        let numberOfItems: number = dataPoints.length;
        let maxHorizontalSpaceUsed = 0;
        const parentHeight = this.parentViewport.height;

        if (title) {
            totalSpaceOccupiedThusFar += spaceNeededByTitle;
            title.x = SVGLegend.TextAndIconPadding;
            title.y = spaceNeededByTitle;
            maxHorizontalSpaceUsed = title.width || 0;
        }

        // if an arrow should be added, we add space for it
        if (this.legendDataStartIndex > 0) {
            totalSpaceOccupiedThusFar += SVGLegend.LegendArrowOffset;
        }

        const dataPointsLength = dataPoints.length;
        for (let i = 0; i < dataPointsLength; i++) {
            const dp = dataPoints[i];
            const textProperties = SVGLegend.getTextProperties(dp.label, this.data.fontSize, this.data.fontFamily);
            const baselineDelta = textMeasurementService.estimateSvgTextBaselineDelta(textProperties);

            dp.glyphPosition = {
                x: fixedHorizontalIconShift,
                y: (totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon) - baselineDelta
            };

            dp.textPosition = {
                x: fixedHorizontalTextShift,
                y: totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon
            };

            // TODO: [PERF] Get rid of this extra measurement, and modify
            // getTailoredTextToReturnWidth + Text
            const width = textMeasurementService.measureSvgTextWidth(textProperties);
            maxHorizontalSpaceUsed = Math.max(maxHorizontalSpaceUsed, width);

            if (width > maxHorizontalSpaceAvaliable) {
                dp.label = textMeasurementService.getTailoredTextOrDefault(
                    textProperties,
                    maxHorizontalSpaceAvaliable);
            }

            totalSpaceOccupiedThusFar += verticalLegendHeight;

            if (totalSpaceOccupiedThusFar > parentHeight) {
                numberOfItems = i;
                break;
            }
        }

        if (autoWidth) {
            this.lastCalculatedWidth = this.viewport.width = Math.ceil(
                maxHorizontalSpaceUsed < maxHorizontalSpaceAvaliable
                    ? maxHorizontalSpaceUsed + fixedHorizontalTextShift + SVGLegend.LegendEdgeMariginWidth
                    : this.parentViewport.width * SVGLegend.LegendMaxWidthFactor
            );
        } else {
            this.viewport.width = this.lastCalculatedWidth;
        }

        this.visibleLegendHeight = totalSpaceOccupiedThusFar;

        navigationArrows.forEach(d => d.x = this.lastCalculatedWidth / 2);
        this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);

        return numberOfItems;
    }

    private drawNavigationArrows(layout: NavigationArrow[]): void {
        let arrows: Selection<BaseType, NavigationArrow, HTMLElement, any> = this.group.selectAll(SVGLegend.NavigationArrow.selectorName)
            .data(layout);

        arrows.exit().remove();

        arrows = arrows.merge(arrows
            .enter()
            .append("g")
            .classed(SVGLegend.NavigationArrow.className, true)
        )
            .on("click", (event, d: NavigationArrow) => {
                const pos = this.legendDataStartIndex;
                this.legendDataStartIndex = d.dataType === NavigationArrowType.Increase
                    ? pos + this.arrowPosWindow : pos - this.arrowPosWindow;
                this.drawLegendInternal(this.data, this.parentViewport, false);
            })
            .attr("transform", (d: NavigationArrow) => svgManipulation.translate(d.x, d.y));

        let path: Selection<SVGPathElement, NavigationArrow, BaseType, any> = arrows.selectAll<SVGPathElement, NavigationArrow>("path")
            .data((data) => [data]);

        path.exit().remove();
        path = path
            .enter()
            .append("path")
            .merge(path);

        path.attr("d", (d: NavigationArrow) => d.path)
            .attr("transform", (d: NavigationArrow) => d.rotateTransform);
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

    private static getTextProperties(
        text: string,
        fontSize: number,
        fontFamily: string
    ): TextProperties {
        return {
            fontFamily,
            fontSize: PixelConverter.fromPoint(fontSize || SVGLegend.DefaultFontSizeInPt),
            text,
        };
    }

    private setTooltipToLegendItems(data: LegendData) {
        // we save the values to tooltip before cut
        for (const dataPoint of data.dataPoints) {
            dataPoint.tooltip = dataPoint.label;
        }
    }
}
