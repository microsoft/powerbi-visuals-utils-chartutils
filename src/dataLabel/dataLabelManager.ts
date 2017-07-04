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

module powerbi.extensibility.utils.chart.dataLabel {
    // powerbi.extensibility.utils.svg.shapes
    import IVector = powerbi.extensibility.utils.svg.shapes.IVector;
    import IPoint = powerbi.extensibility.utils.svg.shapes.IPoint;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import Rect = powerbi.extensibility.utils.svg.shapes.Rect;

    // powerbi.extensibility.utils.type
    import Double = powerbi.extensibility.utils.type.Double;

    /**
    * Arranges label elements using the anchor point or rectangle. Collisions
    * between elements can be automatically detected and as a result elements
    * can be repositioned or get hidden.
    */
    export class DataLabelManager {
        public static DefaultAnchorMargin: number = 0; // For future use
        public static DefaultMaximumMovingDistance: number = 12;
        public static DefaultMinimumMovingDistance: number = 3;
        public static InflateAmount: number = 5;

        public movingStep: number = 3;
        public hideOverlapped: boolean = true;

        // The global settings for all labels.
        // They can be oweridden by each label we add into the panel, because contains same properties.
        private defaultDataLabelSettings: IDataLabelSettings = {
            anchorMargin: DataLabelManager.DefaultAnchorMargin,
            anchorRectOrientation: RectOrientation.None,
            contentPosition: ContentPositions.BottomCenter,
            outsidePlacement: OutsidePlacement.Disallowed,
            maximumMovingDistance: DataLabelManager.DefaultMaximumMovingDistance,
            minimumMovingDistance: DataLabelManager.DefaultMinimumMovingDistance,
            validContentPositions: ContentPositions.BottomCenter,
            opacity: 1
        };

        public get defaultSettings(): IDataLabelSettings {
            return this.defaultDataLabelSettings;
        }

        /** Arranges the lables position and visibility*/
        public hideCollidedLabels(viewport: IViewport, data: any[], layout: any, addTransform: boolean = false, hideCollidedLabels: boolean = true): LabelEnabledDataPoint[] {

            // Split size into a grid
            let arrangeGrid = new DataLabelArrangeGrid(viewport, data, layout);
            let filteredData = [];
            let transform: IVector = { x: 0, y: 0 };

            if (addTransform) {
                transform.x = viewport.width / 2;
                transform.y = viewport.height / 2;
            }

            for (let i = 0, len = data.length; i < len; i++) {

                // Filter unwanted data points
                if (!layout.filter(data[i])) {
                    continue;
                }

                // Set default values where properties values are undefined
                let info = this.getLabelInfo(data[i]);

                info.anchorPoint = {
                    x: layout.labelLayout.x(data[i]) + transform.x,
                    y: layout.labelLayout.y(data[i]) + transform.y,
                };

                let position: IRect = this.calculateContentPosition(info, info.contentPosition, data[i].size, info.anchorMargin);

                if (DataLabelManager.isValid(position) && (!this.hasCollisions(arrangeGrid, info, position, viewport) || !hideCollidedLabels)) {
                    data[i].labelX = position.left - transform.x;
                    data[i].labelY = position.top - transform.y;

                    // Keep track of all panel elements positions.
                    arrangeGrid.add(info, position);

                    // Save all data points to display
                    filteredData.push(data[i]);
                }
            }

            return filteredData;
        }

        /**
         * Merges the label element info with the panel element info and returns correct label info.
         * @param source The label info.
         */
        public getLabelInfo(source: IDataLabelInfo): IDataLabelInfo {
            let settings = this.defaultDataLabelSettings;

            source.anchorMargin = source.anchorMargin !== undefined
                ? source.anchorMargin
                : settings.anchorMargin;

            source.anchorRectOrientation = source.anchorRectOrientation !== undefined
                ? source.anchorRectOrientation
                : settings.anchorRectOrientation;

            source.contentPosition = source.contentPosition !== undefined
                ? source.contentPosition
                : settings.contentPosition;

            source.maximumMovingDistance = source.maximumMovingDistance !== undefined
                ? source.maximumMovingDistance
                : settings.maximumMovingDistance;

            source.minimumMovingDistance = source.minimumMovingDistance !== undefined
                ? source.minimumMovingDistance
                : settings.minimumMovingDistance;

            source.outsidePlacement = source.outsidePlacement !== undefined
                ? source.outsidePlacement
                : settings.outsidePlacement;

            source.validContentPositions = source.validContentPositions !== undefined
                ? source.validContentPositions
                : settings.validContentPositions;

            source.opacity = source.opacity !== undefined
                ? source.opacity
                : settings.opacity;

            source.maximumMovingDistance += source.anchorMargin;

            return source;
        }

        /**
        * (Private) Calculates element position using anchor point..
        */
        private calculateContentPositionFromPoint(anchorPoint: IPoint, contentPosition: ContentPositions, contentSize: ISize, offset: number): IRect {
            let position: IPoint = { x: 0, y: 0 };

            if (anchorPoint) {
                if (anchorPoint.x !== undefined && isFinite(anchorPoint.x)) {
                    position.x = anchorPoint.x;

                    switch (contentPosition) {
                        // D3 positions the label in the middle by default.
                        // The algorithem asumed the label was positioned in right so this is why we add/substract half width
                        case ContentPositions.TopLeft:
                        case ContentPositions.MiddleLeft:
                        case ContentPositions.BottomLeft:
                            position.x -= contentSize.width / 2.0;
                            break;

                        case ContentPositions.TopRight:
                        case ContentPositions.MiddleRight:
                        case ContentPositions.BottomRight:
                            position.x += contentSize.width / 2.0;
                            break;
                    }
                }

                if (anchorPoint.y !== undefined && isFinite(anchorPoint.y)) {
                    position.y = anchorPoint.y;
                    switch (contentPosition) {
                        case ContentPositions.MiddleLeft:
                        case ContentPositions.MiddleCenter:
                        case ContentPositions.MiddleRight:
                            position.y -= contentSize.height / 2.0;
                            break;
                        case ContentPositions.TopRight:
                        case ContentPositions.TopLeft:
                        case ContentPositions.TopCenter:
                            position.y -= contentSize.height;
                            break;
                    }
                }

                if (offset !== undefined && isFinite(offset)) {
                    switch (contentPosition) {
                        case ContentPositions.TopLeft:
                            position.x -= offset;
                            position.y -= offset;
                            break;
                        case ContentPositions.MiddleLeft:
                            position.x -= offset;
                            break;
                        case ContentPositions.BottomLeft:
                            position.x -= offset;
                            position.y += offset;
                            break;
                        case ContentPositions.TopCenter:
                            position.y -= offset;
                            break;
                        case ContentPositions.MiddleCenter:
                            // Offset is not applied
                            break;
                        case ContentPositions.BottomCenter:
                            position.y += offset;
                            break;
                        case ContentPositions.TopRight:
                            position.x += offset;
                            position.y -= offset;
                            break;
                        case ContentPositions.MiddleRight:
                            position.x += offset;
                            break;
                        case ContentPositions.BottomRight:
                            position.x += offset;
                            position.y += offset;
                            break;
                    }
                }
            }
            return {
                left: position.x,
                top: position.y,
                width: contentSize.width,
                height: contentSize.height
            };
        }

        /** (Private) Calculates element position using anchor rect. */
        private calculateContentPositionFromRect(anchorRect: IRect, anchorRectOrientation: RectOrientation, contentPosition: ContentPositions, contentSize: ISize, offset: number): IRect {
            switch (contentPosition) {
                case ContentPositions.InsideCenter:
                    return this.handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                case ContentPositions.InsideEnd:
                    return this.handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                case ContentPositions.InsideBase:
                    return this.handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
                case ContentPositions.OutsideEnd:
                    return this.handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                case ContentPositions.OutsideBase:
                    return this.handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
            }

            return { left: 0, top: 0, width: -1, height: -1 };
        }

        /** (Private) Calculates element inside center position using anchor rect. */
        private handleInsideCenterPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
            switch (anchorRectOrientation) {
                case RectOrientation.VerticalBottomTop:
                case RectOrientation.VerticalTopBottom:
                    return locationConverter.middleVertical(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalLeftRight:
                case RectOrientation.HorizontalRightLeft:
                default:
                    return locationConverter.middleHorizontal(contentSize, anchorRect, offset);
            }
        }

        /** (Private) Calculates element inside end position using anchor rect. */
        private handleInsideEndPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
            switch (anchorRectOrientation) {
                case RectOrientation.VerticalBottomTop:
                    return locationConverter.topInside(contentSize, anchorRect, offset);
                case RectOrientation.VerticalTopBottom:
                    return locationConverter.bottomInside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalRightLeft:
                    return locationConverter.leftInside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalLeftRight:
                default:
                    return locationConverter.rightInside(contentSize, anchorRect, offset);
            }
        }

        /** (Private) Calculates element inside base position using anchor rect. */
        private handleInsideBasePosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
            switch (anchorRectOrientation) {
                case RectOrientation.VerticalBottomTop:
                    return locationConverter.bottomInside(contentSize, anchorRect, offset);
                case RectOrientation.VerticalTopBottom:
                    return locationConverter.topInside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalRightLeft:
                    return locationConverter.rightInside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalLeftRight:
                default:
                    return locationConverter.leftInside(contentSize, anchorRect, offset);
            }
        }

        /** (Private) Calculates element outside end position using anchor rect. */
        private handleOutsideEndPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
            switch (anchorRectOrientation) {
                case RectOrientation.VerticalBottomTop:
                    return locationConverter.topOutside(contentSize, anchorRect, offset);
                case RectOrientation.VerticalTopBottom:
                    return locationConverter.bottomOutside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalRightLeft:
                    return locationConverter.leftOutside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalLeftRight:
                default:
                    return locationConverter.rightOutside(contentSize, anchorRect, offset);
            }
        }

        /** (Private) Calculates element outside base position using anchor rect. */
        private handleOutsideBasePosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
            switch (anchorRectOrientation) {
                case RectOrientation.VerticalBottomTop:
                    return locationConverter.bottomOutside(contentSize, anchorRect, offset);
                case RectOrientation.VerticalTopBottom:
                    return locationConverter.topOutside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalRightLeft:
                    return locationConverter.rightOutside(contentSize, anchorRect, offset);
                case RectOrientation.HorizontalLeftRight:
                default:
                    return locationConverter.leftOutside(contentSize, anchorRect, offset);
            }
        }

        /**  (Private) Calculates element position. */
        private calculateContentPosition(anchoredElementInfo: IDataLabelInfo, contentPosition: ContentPositions, contentSize: ISize, offset: number): IRect {

            if (contentPosition !== ContentPositions.InsideEnd &&
                contentPosition !== ContentPositions.InsideCenter &&
                contentPosition !== ContentPositions.InsideBase &&
                contentPosition !== ContentPositions.OutsideBase &&
                contentPosition !== ContentPositions.OutsideEnd) {
                // Determine position using anchor point.
                return this.calculateContentPositionFromPoint(
                    anchoredElementInfo.anchorPoint,
                    contentPosition,
                    contentSize,
                    offset);
            }

            // Determine position using anchor rectangle.
            return this.calculateContentPositionFromRect(
                anchoredElementInfo.anchorRect,
                anchoredElementInfo.anchorRectOrientation,
                contentPosition,
                contentSize,
                offset);
        }

        /** (Private) Check for collisions. */
        private hasCollisions(arrangeGrid: DataLabelArrangeGrid, info: IDataLabelInfo, position: IRect, size: ISize): boolean {
            if (arrangeGrid.hasConflict(position)) {
                return true;
            }

            // Since we divide the height by 2 we add it back to the top of the view port so labels won't be cut off
            let intersection = { left: 0, top: position.height / 2, width: size.width, height: size.height };
            intersection = Rect.inflate(intersection, { left: DataLabelManager.InflateAmount, top: 0, right: DataLabelManager.InflateAmount, bottom: 0 });

            intersection = Rect.intersect(intersection, position);

            if (Rect.isEmpty(intersection)) {
                // Empty rectangle means there is a collision
                return true;
            }

            switch (info.outsidePlacement) {
                // D3 positions the label in the middle by default.
                // The algorithem asumed the label was positioned in right so this is why we devide by 2 or 4
                case OutsidePlacement.Disallowed:
                    return Double.lessWithPrecision(intersection.width, position.width) ||
                        Double.lessWithPrecision(intersection.height, position.height / 2);

                case OutsidePlacement.Partial:
                    return Double.lessWithPrecision(intersection.width, position.width / 2) ||
                        Double.lessWithPrecision(intersection.height, position.height / 4);
            }
            return false;
        }

        public static isValid(rect: IRect): boolean {
            return !Rect.isEmpty(rect) && (rect.width > 0 && rect.height > 0);
        }
    }
}
