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

module powerbi.extensibility.utils.chart.dataLabel.locationConverter {
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;

    export function topInside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0,
            top: rect.top + offset,
            width: size.width,
            height: size.height
        };
    }

    export function bottomInside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0,
            top: (rect.top + rect.height) - size.height - offset,
            width: size.width,
            height: size.height
        };
    }

    export function rightInside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: (rect.left + rect.width) - size.width - offset,
            top: rect.top + rect.height / 2.0 - size.height / 2.0,
            width: size.width,
            height: size.height
        };
    }

    export function leftInside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + offset,
            top: rect.top + rect.height / 2.0 - size.height / 2.0,
            width: size.width,
            height: size.height
        };
    }

    export function topOutside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0,
            top: rect.top - size.height - offset,
            width: size.width,
            height: size.height
        };
    }

    export function bottomOutside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0,
            top: (rect.top + rect.height) + offset,
            width: size.width,
            height: size.height
        };
    }

    export function rightOutside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: (rect.left + rect.width) + offset,
            top: rect.top + rect.height / 2.0 - size.height / 2.0,
            width: size.width,
            height: size.height
        };
    }

    export function leftOutside(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left - size.width - offset,
            top: rect.top + rect.height / 2.0 - size.height / 2.0,
            width: size.width,
            height: size.height
        };
    }

    export function middleHorizontal(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0 + offset,
            top: rect.top + rect.height / 2.0 - size.height / 2.0,
            width: size.width,
            height: size.height
        };
    }

    export function middleVertical(size: ISize, rect: IRect, offset: number): IRect {
        return {
            left: rect.left + rect.width / 2.0 - size.width / 2.0,
            top: rect.top + rect.height / 2.0 - size.height / 2.0 + offset,
            width: size.width,
            height: size.height
        };
    }
}
