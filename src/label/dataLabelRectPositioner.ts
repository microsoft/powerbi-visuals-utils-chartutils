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
    shapes,
    shapesInterfaces,
    IRect,
} from "powerbi-visuals-utils-svgutils";

import { double } from "powerbi-visuals-utils-typeutils";

import {
    LabelDataPointLayoutInfo,
    RectLabelPosition,
    LabelParentRect,
    NewRectOrientation,
    LabelDataPoint
} from "./labelLayout";

/**
 * (Private) Contains methods for calculating the bounding box of a data label
 */

export interface OverflowingConstants {
    equalityPrecision: number;
    minIntersectionRatio: number;
    parentToLabelOverflowRatioThreshold: number;
}

export const LabelOverflowingConsts: OverflowingConstants = {
    equalityPrecision: 0.09,
    minIntersectionRatio: 0.2, 
    parentToLabelOverflowRatioThreshold: 1 / 50
};

interface LabelContainment {
    isContainedHorizontally: boolean;
    isContainedVertically: boolean;
}

export function getLabelRect(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, position: RectLabelPosition, offset: number): IRect {
    const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
    const parentRect: LabelParentRect = <LabelParentRect>labelDataPoint.parentShape;
    if (parentRect != null) {
        const defaultProps: [shapesInterfaces.ISize, IRect, number] = [labelDataPointLayoutInfo.labelSize, parentRect.rect, offset];
        // Each combination of position and orientation results in a different actual positioning, which is then called.
        switch (position) {
            case RectLabelPosition.InsideCenter:
            case RectLabelPosition.OverflowInsideCenter:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                    case NewRectOrientation.VerticalTopBased:
                        return middleVertical(...defaultProps);
                    case NewRectOrientation.HorizontalLeftBased:
                    case NewRectOrientation.HorizontalRightBased:
                        return middleHorizontal(...defaultProps);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
                break;
            case RectLabelPosition.InsideBase:
            case RectLabelPosition.OverflowInsideBase:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return bottomInside(...defaultProps);
                    case NewRectOrientation.VerticalTopBased:
                        return topInside(...defaultProps);
                    case NewRectOrientation.HorizontalLeftBased:
                        return leftInside(...defaultProps);
                    case NewRectOrientation.HorizontalRightBased:
                        return rightInside(...defaultProps);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
                break;
            case RectLabelPosition.InsideEnd:
            case RectLabelPosition.OverflowInsideEnd:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return topInside(...defaultProps);
                    case NewRectOrientation.VerticalTopBased:
                        return bottomInside(...defaultProps);
                    case NewRectOrientation.HorizontalLeftBased:
                        return rightInside(...defaultProps);
                    case NewRectOrientation.HorizontalRightBased:
                        return leftInside(...defaultProps);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
                break;
            case RectLabelPosition.OutsideBase:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return bottomOutside(...defaultProps);
                    case NewRectOrientation.VerticalTopBased:
                        return topOutside(...defaultProps);
                    case NewRectOrientation.HorizontalLeftBased:
                        return leftOutside(...defaultProps);
                    case NewRectOrientation.HorizontalRightBased:
                        return rightOutside(...defaultProps);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
                break;
            case RectLabelPosition.OutsideEnd:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return topOutside(...defaultProps);
                    case NewRectOrientation.VerticalTopBased:
                        return bottomOutside(...defaultProps);
                    case NewRectOrientation.HorizontalLeftBased:
                        return rightOutside(...defaultProps);
                    case NewRectOrientation.HorizontalRightBased:
                        return leftOutside(...defaultProps);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
        }
    }
    else {
        // TODO: Data labels for non-rectangular visuals (line chart)
    }
    return null;
}

export function canFitWithinParent({labelDataPoint, labelSize}: LabelDataPointLayoutInfo, horizontalPadding: number, verticalPadding: number): boolean {
    const parentRect = (<LabelParentRect>labelDataPoint.parentShape).rect;
    const horizontalPaddingWithLabel = 2 * horizontalPadding + labelSize.width;
    const verticalPaddingWithLabel = 2 * verticalPadding + labelSize.height;
    return (horizontalPaddingWithLabel < parentRect.width) || (verticalPaddingWithLabel < parentRect.height);
}

export function isLabelWithinParent(labelRect: IRect, labelPoint: LabelDataPoint, horizontalPadding: number, verticalPadding: number): boolean {
    const parentRect = (<LabelParentRect>labelPoint.parentShape).rect;
    const { left, top, width, height } = shapes.inflate(
        labelRect, 
        { left: horizontalPadding, right: horizontalPadding, top: verticalPadding, bottom: verticalPadding }
    );
    return shapes.containsPoint(parentRect, {
        x: left,
        y: top
    }) && shapes.containsPoint(parentRect, {
        x: left + width,
        y: top + height
    });
}

export function isValidLabelOverflowing(labelRect: IRect, labelPoint: LabelDataPoint, hasMultipleDataSeries: boolean): boolean {
    const parentRect = (<LabelParentRect>labelPoint.parentShape).rect;

    if (!shapes.isIntersecting(labelRect, parentRect)) {
        return false; // label isn't overflowing from within parent
    }

    const intersection = shapes.intersect(labelRect, parentRect);
    const precision = LabelOverflowingConsts.equalityPrecision;
    
    const labelContainment = getLabelContainment(labelRect, intersection, precision);
    const parentOrientation = (<LabelParentRect>labelPoint.parentShape).orientation;
    const isParentOrientVertically = isVerticalOrientation(parentOrientation);

    if (!isValidContainment(labelContainment, hasMultipleDataSeries, isParentOrientVertically)) {
        // Our overflowing definition require that at least one label's rectangle dimension (width / height) to be contained in parent rectangle.
        // Furthermore, if we have multiple data series the contained dimention should be respective with the parent's orientation.
        // To avoid data labels collisions from one series to another which appears inside the same bar.
        return false;
    }

    if (labelContainment.isContainedHorizontally && labelContainment.isContainedVertically) {
        return true; // null-overflowing, label is fully contained.
    }
// Our overflowing definition require that the label and parent "will touch each other enough", this is defined by the ratio of their intersection
    // (touching) against each of them, we look at the maximal intersection ratio which means that at least one of them is 'touched' enought by the other.
    const labelAndParentIntersectEnough = maximalIntersectionRatio(labelRect, parentRect) >= 
        LabelOverflowingConsts.minIntersectionRatio;
    
// Our overflowing definition require that the overflowing dimensions will not be too big in comparison to the same dimension of parent.
    // this is done to avoid situationion where the parent is barely visible or that label text is very long.
    return labelAndParentIntersectEnough && 
        isValidOverflowRatio(labelRect, parentRect, labelContainment);
}

function getLabelContainment(labelRect: IRect, intersection: IRect, precision: number): LabelContainment {
    return {
        isContainedHorizontally: 
            double.equalWithPrecision(intersection.left, labelRect.left, precision) &&
            double.equalWithPrecision(intersection.width, labelRect.width, precision),
        isContainedVertically:
            double.equalWithPrecision(intersection.top, labelRect.top, precision) &&
            double.equalWithPrecision(intersection.height, labelRect.height, precision)
    };
}

function isVerticalOrientation(orientation: NewRectOrientation): boolean {
    return [
        NewRectOrientation.VerticalBottomBased,
        NewRectOrientation.VerticalTopBased
    ].includes(orientation);
}

function isValidContainment(
    containment: LabelContainment, 
    hasMultipleDataSeries: boolean, 
    isParentOrientVertically: boolean
): boolean {
    if (!containment.isContainedHorizontally && !containment.isContainedVertically) {
        return false;
    }

    if (hasMultipleDataSeries) {
        if (isParentOrientVertically && !containment.isContainedVertically) {
            return false;
        }
        if (!isParentOrientVertically && !containment.isContainedHorizontally) {
            return false;
        }
    }

    return true;
}

function isValidOverflowRatio(
    labelRect: IRect, 
    parentRect: IRect, 
    containment: LabelContainment
): boolean {
    const threshold = LabelOverflowingConsts.parentToLabelOverflowRatioThreshold;

    if (containment.isContainedVertically) {
        return parentRect.width === 0 || (parentRect.width / labelRect.width) > threshold;
    }
    
    if (containment.isContainedHorizontally) {
        return parentRect.height === 0 || (parentRect.height / labelRect.height) > threshold;
    }

    return false;
}

export function maximalIntersectionRatio(labelRect: IRect, parentRect: IRect): number {
    const getArea = (rect: IRect) => rect.width * rect.height;
    
    const parentArea = getArea(parentRect);
    const labelArea = getArea(labelRect);
    
    const maxArea = Math.max(parentArea, labelArea);
    if (maxArea === 0) {
        return 0;
    }

    const intersectionArea = getArea(shapes.intersect(parentRect, labelRect));
    const divisor = labelArea === 0 ? parentArea : Math.min(parentArea, labelArea);

    return intersectionArea / divisor;
}

export function topInside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
        top: parentRect.top + offset,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function bottomInside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
        top: (parentRect.top + parentRect.height) - offset - labelSize.height,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function rightInside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: (parentRect.left + parentRect.width) - labelSize.width - offset,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function leftInside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + offset,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function topOutside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
        top: parentRect.top - labelSize.height - offset,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function bottomOutside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
        top: (parentRect.top + parentRect.height) + offset,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function rightOutside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: (parentRect.left + parentRect.width) + offset,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function leftOutside(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left - labelSize.width - offset,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function middleHorizontal(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0 + offset,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function middleVertical(labelSize: shapesInterfaces.ISize, parentRect: IRect, offset: number): IRect {
    return {
        left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
        top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0 + offset,
        width: labelSize.width,
        height: labelSize.height
    };
}
