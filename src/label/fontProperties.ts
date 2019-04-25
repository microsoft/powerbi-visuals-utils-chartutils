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

import { FontSize } from "./units";

export interface FontProperties {
    readonly color?: string;
    readonly family?: string;
    readonly lineHeight?: string;
    readonly size?: FontSize;
    readonly style?: string;
    readonly variant?: string;
    readonly weight?: string;
    readonly whiteSpace?: string;
}

export interface MutableFontProperties {
    color?: string;
    family?: string;
    lineHeight?: string;
    size?: FontSize;
    style?: string;
    variant?: string;
    weight?: string;
    whiteSpace?: string;
}

/**
 * Inherits a `FontProperties` object allowing specific properties to be overriden.
 * Typically used for changing values on an existing object as all properties are readonly.
 * @param fontProperties The existing `FontProperties` object
 * @param newFontProperties The properties to override
 * @returns A new object inherited from `fontProperties`.
 */
export function inherit(fontProperties: FontProperties, newFontProperties: FontProperties): FontProperties {
    return {
        ...fontProperties,
        ...newFontProperties
    };
}
