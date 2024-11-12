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
import powerbi from "powerbi-visuals-api";

// powerbi.extensibility.utils.svg
import  { shapesInterfaces, IRect, shapes } from "powerbi-visuals-utils-svgutils";
import IPoint = shapesInterfaces.IPoint;
import IVector = shapesInterfaces.IVector;
import ISize = shapesInterfaces.ISize;

// powerbi.extensibility.utils.formatting
import  { double as Double } from "powerbi-visuals-utils-typeutils";

import { RectOrientation, ContentPositions, OutsidePlacement, IDataLabelSettings, IDataLabelInfo, LabelEnabledDataPoint, ILabelLayout, DataPointLabels  } from "./dataLabelInterfaces";

import * as locationConverter from "./locationConverter";
import DataLabelArrangeGrid from "./dataLabelArrangeGrid";

/**
* Arranges label elements using the anchor point or rectangle. Collisions
* between elements can be automatically detected and as a result elements
* can be repositioned or get hidden.
*/
export default class DataLabelManager {
    public static DefaultAnchorMargin: number = 0;
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

    /** Arranges the labels position and visibility */
    /**
     * Hides collided labels within the given viewport.
     *
     * @template T - The type of data points.
     * @param {powerbi.IViewport} viewport - The viewport dimensions.
     * @param {T[]} data - The array of data points to process.
     * @param {ILabelLayout} layout - The layout configuration for labels.
     * @param {boolean} [addTransform=false] - Whether to add a transform to the label positions.
     * @param {boolean} [hideCollidedLabels=true] - Whether to hide labels that collide with others.
     * @returns {(T & LabelEnabledDataPoint)[]} - The array of data points with non-colliding labels.
     */
    public hideCollidedLabels<T extends DataPointLabels>(
        viewport: powerbi.IViewport,
        data: T[],
        layout: ILabelLayout,
        addTransform: boolean = false,
        hideCollidedLabels: boolean = true
    ): Array<T & LabelEnabledDataPoint> {
        const transform = this.calculateTransform(viewport, addTransform);
        const arrangeGrid = new DataLabelArrangeGrid(viewport, data, layout);
        
        return this.processDataPoints(data, layout, transform, arrangeGrid, viewport, hideCollidedLabels);
    }

    private calculateTransform(viewport: powerbi.IViewport, addTransform: boolean): IVector {
        if (addTransform) {
            return {
                x: viewport.width / 2,
                y: viewport.height / 2
            };
        }
        return { x: 0, y: 0 };
    }

    private processDataPoints<T extends DataPointLabels>(
        data: T[],
        layout: ILabelLayout,
        transform: IVector,
        arrangeGrid: DataLabelArrangeGrid,
        viewport: powerbi.IViewport,
        hideCollidedLabels: boolean
    ): (T & LabelEnabledDataPoint)[] {
        const filteredData: (T & LabelEnabledDataPoint)[] = [];

        for (let i = 0; i < data.length; i++) {
            // Filter unwanted data points
            if (!layout.filter(data[i])) {
                continue;
            }

            // Set default values where properties values are undefined
            const info = this.getLabelInfo(data[i]);
            info.anchorPoint = {
                x: layout.labelLayout.x(data[i], i) + transform.x,
                y: layout.labelLayout.y(data[i], i) + transform.y,
            };

            const position = this.calculateContentPosition(info, data[i].size, info.anchorMargin);

            if (this.shouldKeepLabel(position, arrangeGrid, info, viewport, hideCollidedLabels)) {
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

    private shouldKeepLabel(
        position: IRect,
        arrangeGrid: DataLabelArrangeGrid,
        info: IDataLabelInfo,
        viewport: powerbi.IViewport,
        hideCollidedLabels: boolean
    ): boolean {
        return DataLabelManager.isValid(position) && 
               (!this.hasCollisions(arrangeGrid, info, position, viewport) || !hideCollidedLabels);
    }

    /**
     * Merges the label element info with the panel element info and returns correct label info.
     * @param source The label info.
     */
    public getLabelInfo(source: IDataLabelInfo): IDataLabelInfo {
        const settings = this.defaultDataLabelSettings;
        const properties = [
            'anchorMargin',
            'anchorRectOrientation', 
            'contentPosition',
            'maximumMovingDistance',
            'minimumMovingDistance',
            'outsidePlacement',
            'validContentPositions',
            'opacity'
        ];

        // Copy default values for each property if not defined in source
        properties.forEach(prop => {
            source[prop] = source[prop] !== undefined ? source[prop] : settings[prop];
        });

        // Adjust maximum moving distance by anchor margin
        source.maximumMovingDistance += source.anchorMargin;

        return source;
    }
 
    /**
    * (Private) Calculates element position using anchor point..
    */
    private calculateContentPositionFromPoint(anchorPoint: IPoint, contentPosition: ContentPositions, contentSize: ISize, offset: number): IRect {
        const position: IPoint = { x: 0, y: 0 };

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
        const positionHandlers = {
            [ContentPositions.InsideCenter]: () => this.handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset),
            [ContentPositions.InsideEnd]: () => this.handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset),
            [ContentPositions.InsideBase]: () => this.handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset),
            [ContentPositions.OutsideEnd]: () => this.handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset),
            [ContentPositions.OutsideBase]: () => this.handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset)
        };

        const handler = positionHandlers[contentPosition];
        return handler ? handler() : { left: 0, top: 0, width: -1, height: -1 };
    }

    /** (Private) Calculates element inside center position using anchor rect. */
    private handleInsideCenterPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
        const isVerticalOrientation = [
            RectOrientation.VerticalBottomTop,
            RectOrientation.VerticalTopBottom
        ].includes(anchorRectOrientation);

        return isVerticalOrientation
            ? locationConverter.middleVertical(contentSize, anchorRect, offset)
            : locationConverter.middleHorizontal(contentSize, anchorRect, offset);
    }

    /** (Private) Calculates element inside end position using anchor rect. */
    private handleInsideEndPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
        const orientationToPositionMap = {
            [RectOrientation.VerticalBottomTop]: locationConverter.topInside,
            [RectOrientation.VerticalTopBottom]: locationConverter.bottomInside,
            [RectOrientation.HorizontalRightLeft]: locationConverter.leftInside,
            [RectOrientation.HorizontalLeftRight]: locationConverter.rightInside
        };

        const positionFn = orientationToPositionMap[anchorRectOrientation] || orientationToPositionMap[RectOrientation.HorizontalLeftRight];
        return positionFn(contentSize, anchorRect, offset);
    }

    /** (Private) Calculates element inside base position using anchor rect. */
    private handleInsideBasePosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
        const orientationToPositionMap = {
            [RectOrientation.VerticalBottomTop]: locationConverter.bottomInside,
            [RectOrientation.VerticalTopBottom]: locationConverter.topInside,
            [RectOrientation.HorizontalRightLeft]: locationConverter.rightInside,
            [RectOrientation.HorizontalLeftRight]: locationConverter.leftInside
        };

        const positionFn = orientationToPositionMap[anchorRectOrientation] || orientationToPositionMap[RectOrientation.HorizontalLeftRight];
        return positionFn(contentSize, anchorRect, offset);
    }

    /** (Private) Calculates element outside end position using anchor rect. */
    private handleOutsideEndPosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
        const orientationToPositionMap = {
            [RectOrientation.VerticalBottomTop]: locationConverter.topOutside,
            [RectOrientation.VerticalTopBottom]: locationConverter.bottomOutside,
            [RectOrientation.HorizontalRightLeft]: locationConverter.leftOutside,
            [RectOrientation.HorizontalLeftRight]: locationConverter.rightOutside
        };

        const positionFn = orientationToPositionMap[anchorRectOrientation] || orientationToPositionMap[RectOrientation.HorizontalLeftRight];
        return positionFn(contentSize, anchorRect, offset);
    }

    /** (Private) Calculates element outside base position using anchor rect. */
    private handleOutsideBasePosition(anchorRectOrientation: RectOrientation, contentSize: ISize, anchorRect: IRect, offset: number): IRect {
        const orientationToPositionMap = {
            [RectOrientation.VerticalBottomTop]: locationConverter.bottomOutside,
            [RectOrientation.VerticalTopBottom]: locationConverter.topOutside,
            [RectOrientation.HorizontalRightLeft]: locationConverter.rightOutside,
            [RectOrientation.HorizontalLeftRight]: locationConverter.leftOutside
        };

        const positionFn = orientationToPositionMap[anchorRectOrientation] || orientationToPositionMap[RectOrientation.HorizontalLeftRight];
        return positionFn(contentSize, anchorRect, offset);
    }

    /**  (Private) Calculates element position. */
    private calculateContentPosition(anchoredElementInfo: IDataLabelInfo, contentSize: ISize, offset: number): IRect {
        const { contentPosition, anchorPoint, anchorRect, anchorRectOrientation } = anchoredElementInfo;
        
        const isRectBasedPosition = [
            ContentPositions.InsideBase,
            ContentPositions.InsideCenter, 
            ContentPositions.InsideEnd,
            ContentPositions.OutsideBase,
            ContentPositions.OutsideEnd
        ].includes(contentPosition);

        if (isRectBasedPosition) {
            return this.calculateContentPositionFromRect(
                anchorRect,
                anchorRectOrientation, 
                contentPosition,
                contentSize,
                offset
            );
        }

        return this.calculateContentPositionFromPoint(
            anchorPoint,
            contentPosition,
            contentSize, 
            offset
        );
    }

    /** (Private) Check for collisions. */
    private hasCollisions(arrangeGrid: DataLabelArrangeGrid, info: IDataLabelInfo, position: IRect, size: ISize): boolean {
        // Check for conflicts with other labels in the arrange grid
        if (arrangeGrid.hasConflict(position)) {
            return true;
        }

        // Create viewport intersection rectangle
        const viewportIntersection = this.createViewportIntersection(position, size);
        
        // Get intersection with label position
        const labelIntersection = shapes.intersect(viewportIntersection, position);

        // Empty intersection means collision
        if (shapes.isEmpty(labelIntersection)) {
            return true;
        }

        return this.checkOutsidePlacementCollisions(info.outsidePlacement, labelIntersection, position);
    }

    private createViewportIntersection(position: IRect, size: ISize): IRect {
        // Adjust for viewport by adding half height to top
        const intersection = { 
            left: 0, 
            top: position.height / 2,
            width: size.width, 
            height: size.height 
        };

        // Add padding
        return shapes.inflate(intersection, {
            left: DataLabelManager.InflateAmount,
            top: 0,
            right: DataLabelManager.InflateAmount,
            bottom: 0
        });
    }

    private checkOutsidePlacementCollisions(placement: OutsidePlacement, intersection: IRect, position: IRect): boolean {
        switch (placement) {
            case OutsidePlacement.Disallowed:
                return Double.lessWithPrecision(intersection.width, position.width) ||
                       Double.lessWithPrecision(intersection.height, position.height / 2);

            case OutsidePlacement.Partial:
                return Double.lessWithPrecision(intersection.width, position.width / 2) ||
                       Double.lessWithPrecision(intersection.height, position.height / 4);

            default:
                return false;
        }
    }

    public static isValid(rect: IRect): boolean {
        return !shapes.isEmpty(rect) && (rect.width > 0 && rect.height > 0);
    }
}
