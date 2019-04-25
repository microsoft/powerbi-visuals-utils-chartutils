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

export namespace LabelOverflowingConsts {
    export const equalityPrecision = 0.09; // one decimal point
    export const minIntersectionRatio = 0.2;
    export const parentToLabelOverflowRatioThreshold = 1 / 50;
}

export function getLabelRect(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, position: RectLabelPosition, offset: number): IRect {
    let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
    let parentRect: LabelParentRect = <LabelParentRect>labelDataPoint.parentShape;
    if (parentRect != null) {
        // Each combination of position and orientation results in a different actual positioning, which is then called.
        switch (position) {
            case RectLabelPosition.InsideCenter:
            case RectLabelPosition.OverflowInsideCenter:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                    case NewRectOrientation.VerticalTopBased:
                        return middleVertical(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalLeftBased:
                    case NewRectOrientation.HorizontalRightBased:
                        return middleHorizontal(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
            case RectLabelPosition.InsideBase:
            case RectLabelPosition.OverflowInsideBase:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return bottomInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.VerticalTopBased:
                        return topInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalLeftBased:
                        return leftInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalRightBased:
                        return rightInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
            case RectLabelPosition.InsideEnd:
            case RectLabelPosition.OverflowInsideEnd:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return topInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.VerticalTopBased:
                        return bottomInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalLeftBased:
                        return rightInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalRightBased:
                        return leftInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
            case RectLabelPosition.OutsideBase:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return bottomOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.VerticalTopBased:
                        return topOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalLeftBased:
                        return leftOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalRightBased:
                        return rightOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.None:
                    // TODO: which of the above cases should we default to for rects with no orientation?
                }
            case RectLabelPosition.OutsideEnd:
                switch (parentRect.orientation) {
                    case NewRectOrientation.VerticalBottomBased:
                        return topOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.VerticalTopBased:
                        return bottomOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalLeftBased:
                        return rightOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                    case NewRectOrientation.HorizontalRightBased:
                        return leftOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
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

export function canFitWithinParent(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, horizontalPadding: number, verticalPadding: number): boolean {
    let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
    return (labelDataPointLayoutInfo.labelSize.width + 2 * horizontalPadding < (<LabelParentRect>labelDataPoint.parentShape).rect.width) ||
        (labelDataPointLayoutInfo.labelSize.height + 2 * verticalPadding < (<LabelParentRect>labelDataPoint.parentShape).rect.height);
}

export function isLabelWithinParent(labelRect: IRect, labelPoint: LabelDataPoint, horizontalPadding: number, verticalPadding: number): boolean {
    let parentRect = (<LabelParentRect>labelPoint.parentShape).rect;
    let labelRectWithPadding = shapes.Rect.inflate(labelRect, { left: horizontalPadding, right: horizontalPadding, top: verticalPadding, bottom: verticalPadding });
    return shapes.Rect.containsPoint(parentRect, {
        x: labelRectWithPadding.left,
        y: labelRectWithPadding.top,
    }) && shapes.Rect.containsPoint(parentRect, {
        x: labelRectWithPadding.left + labelRectWithPadding.width,
        y: labelRectWithPadding.top + labelRectWithPadding.height,
    });
}

export function isValidLabelOverflowing(labelRect: IRect, labelPoint: LabelDataPoint, hasMultipleDataSeries: boolean): boolean {
    const parentRect = (<LabelParentRect>labelPoint.parentShape).rect;

    if (!shapes.Rect.isIntersecting(labelRect, parentRect)) {
        return false; // label isn't overflowing from within parent
    }

    const intersection = shapes.Rect.intersect(labelRect, parentRect);
    const precision = LabelOverflowingConsts.equalityPrecision;
    const isLabelContainedVertically =
        double.equalWithPrecision(intersection.top, labelRect.top, precision) &&
        double.equalWithPrecision(intersection.height, labelRect.height, precision);
    const isLabelContainedHorizontally =
        double.equalWithPrecision(intersection.left, labelRect.left, precision) &&
        double.equalWithPrecision(intersection.width, labelRect.width, precision);

    const isParentOrientVertically = [
        NewRectOrientation.VerticalBottomBased,
        NewRectOrientation.VerticalTopBased
    ].some((orientation) => orientation === (<LabelParentRect>labelPoint.parentShape).orientation);


    if (!isLabelContainedHorizontally && !isLabelContainedVertically ||
        (hasMultipleDataSeries &&
            (isParentOrientVertically && !isLabelContainedVertically ||
                !isParentOrientVertically && !isLabelContainedHorizontally)
        )) {
        // Our overflowing definition require that at least one label's rectangle dimension (width / height) to be contained in parent rectangle.
        // Furthermore, if we have multiple data series the contained dimention should be respective with the parent's orientation.
        // To avoid data labels collisions from one series to another which appears inside the same bar.
        return false;
    } else if (isLabelContainedHorizontally && isLabelContainedVertically) {
        return true; // null-overflowing, label is fully contained.
    }

    // Our overflowing definition require that the label and parent "will touch each other enough", this is defined by the ratio of their intersection
    // (touching) against each of them, we look at the maximal intersection ratio which means that at least one of them is 'touched' enought by the other.
    const labelAndParentIntersectEnough = maximalIntersectionRatio(labelRect, parentRect) >= LabelOverflowingConsts.minIntersectionRatio;

    // Our overflowing definition require that the overflowing dimensions will not be too big in comparison to the same dimension of parent.
    // this is done to avoid situationion where the parent is barely visible or that label text is very long.
    let labelOverflowIsValid = false;
    const parentToLabelOverflowRatioThreshold = LabelOverflowingConsts.parentToLabelOverflowRatioThreshold;
    if (isLabelContainedVertically) {
        labelOverflowIsValid = parentRect.width === 0 || (parentRect.width / labelRect.width) > parentToLabelOverflowRatioThreshold;
    } else if (isLabelContainedHorizontally) {
        labelOverflowIsValid = parentRect.height === 0 || (parentRect.height / labelRect.height) > parentToLabelOverflowRatioThreshold;
    }

    return labelAndParentIntersectEnough && labelOverflowIsValid;
}

export function maximalIntersectionRatio(labelRect: IRect, parentRect: IRect): number {
    const parentRectArea = parentRect.width * parentRect.height;
    const labelPointArea = labelRect.width * labelRect.height;

    const maxArea = Math.max(parentRectArea, labelPointArea);
    if (maxArea === 0) {
        return 0;
    }

    const minArea = Math.min(parentRectArea, labelPointArea);
    const minimalAreaNotZero = (minArea !== 0) ? minArea : maxArea;

    const intersectionRect = shapes.Rect.intersect(parentRect, labelRect);
    const intersectionRectArea = intersectionRect.width * intersectionRect.height;

    // Dividing by the minimal area yields the maximal intersection ratio
    return intersectionRectArea / minimalAreaNotZero;
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
