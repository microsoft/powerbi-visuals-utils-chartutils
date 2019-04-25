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
    shapesInterfaces,
    IRect,
} from "powerbi-visuals-utils-svgutils";

import {
    NewPointLabelPosition,
    LabelParentPoint
} from "./labelLayout";

export const cos45 = Math.cos(45);
export const sin45 = Math.sin(45);

export function getLabelRect(labelSize: shapesInterfaces.ISize, parentPoint: LabelParentPoint, position: NewPointLabelPosition, offset: number): IRect {
    switch (position) {
        case NewPointLabelPosition.Above: {
            return above(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.Below: {
            return below(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.Left: {
            return left(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.Right: {
            return right(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.BelowLeft: {
            return belowLeft(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.BelowRight: {
            return belowRight(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.AboveLeft: {
            return aboveLeft(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.AboveRight: {
            return aboveRight(labelSize, parentPoint.point, parentPoint.radius + offset);
        }
        case NewPointLabelPosition.Center: {
            return center(labelSize, parentPoint.point);
        }
    }
    return null;
}

export function above(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x - (labelSize.width / 2),
        top: parentPoint.y - offset - labelSize.height,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function below(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x - (labelSize.width / 2),
        top: parentPoint.y + offset,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function left(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x - offset - labelSize.width,
        top: parentPoint.y - (labelSize.height / 2),
        width: labelSize.width,
        height: labelSize.height
    };
}

export function right(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x + offset,
        top: parentPoint.y - (labelSize.height / 2),
        width: labelSize.width,
        height: labelSize.height
    };
}

export function belowLeft(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x - (sin45 * offset) - labelSize.width,
        top: parentPoint.y + (cos45 * offset),
        width: labelSize.width,
        height: labelSize.height
    };
}

export function belowRight(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x + (sin45 * offset),
        top: parentPoint.y + (cos45 * offset),
        width: labelSize.width,
        height: labelSize.height
    };
}

export function aboveLeft(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x - (sin45 * offset) - labelSize.width,
        top: parentPoint.y - (cos45 * offset) - labelSize.height,
        width: labelSize.width,
        height: labelSize.height
    };
}

export function aboveRight(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint, offset: number): IRect {
    return {
        left: parentPoint.x + (sin45 * offset),
        top: parentPoint.y - (cos45 * offset) - labelSize.height,
        width: labelSize.width,
        height: labelSize.height
    };
}
export function center(labelSize: shapesInterfaces.ISize, parentPoint: shapesInterfaces.IPoint): IRect {
    return {
        left: parentPoint.x - (labelSize.width / 2),
        top: parentPoint.y - (labelSize.height / 2),
        width: labelSize.width,
        height: labelSize.height
    };
}

export function getLabelLeaderLineEndingPoint(boundingBox: IRect, position: NewPointLabelPosition, parentShape: LabelParentPoint): number[][] {
    let x = boundingBox.left;
    let y = boundingBox.top;
    switch (position) {
        case NewPointLabelPosition.Above:
            x += (boundingBox.width / 2);
            y += boundingBox.height;
            break;
        case NewPointLabelPosition.Below:
            x += (boundingBox.width / 2);
            break;
        case NewPointLabelPosition.Left:
            x += boundingBox.width;
            y += ((boundingBox.height * 2) / 3);
            break;
        case NewPointLabelPosition.Right:
            y += ((boundingBox.height * 2) / 3);
            break;
        case NewPointLabelPosition.BelowLeft:
            x += boundingBox.width;
            y += (boundingBox.height / 2);
            break;
        case NewPointLabelPosition.BelowRight:
            y += (boundingBox.height / 2);
            break;
        case NewPointLabelPosition.AboveLeft:
            x += boundingBox.width;
            y += boundingBox.height;
            break;
        case NewPointLabelPosition.AboveRight:
            y += boundingBox.height;
            break;
    }

    return [[parentShape.point.x, parentShape.point.y], [x, y]];
}

