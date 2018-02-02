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

namespace powerbi.extensibility.utils.chart.label {
    import Units = powerbi.extensibility.utils.chart.label.Units;
    export interface FontProperties {
        readonly color?: string;
        readonly family?: string;
        readonly lineHeight?: string;
        readonly size?: Units.FontSize;
        readonly style?: string;
        readonly variant?: string;
        readonly weight?: string;
        readonly whiteSpace?: string;
    }

    export interface MutableFontProperties {
        color?: string;
        family?: string;
        lineHeight?: string;
        size?: Units.FontSize;
        style?: string;
        variant?: string;
        weight?: string;
        whiteSpace?: string;
    }

    export module FontProperties {

        /**
         * Inherits a `FontProperties` object allowing specific properties to be overriden.
         * Typically used for changing values on an existing object as all properties are readonly.
         * @param fontProperties The existing `FontProperties` object
         * @param newFontProperties The properties to override
         * @returns A new object inherited from `fontProperties`.
         */
        export function inherit(fontProperties: FontProperties, newFontProperties: FontProperties): FontProperties {

            // Cast to FontPropertiesInt so we can set the properties
            let inheritedFontProperties = Prototype.inherit<MutableFontProperties>(fontProperties);

            if (!newFontProperties) {
                return inheritedFontProperties;
            }

            if (newFontProperties.color) inheritedFontProperties.color = newFontProperties.color;
            if (newFontProperties.family) inheritedFontProperties.family = newFontProperties.family;
            if (newFontProperties.lineHeight) inheritedFontProperties.lineHeight = newFontProperties.lineHeight;
            if (newFontProperties.size) inheritedFontProperties.size = newFontProperties.size;
            if (newFontProperties.style) inheritedFontProperties.style = newFontProperties.style;
            if (newFontProperties.variant) inheritedFontProperties.variant = newFontProperties.variant;
            if (newFontProperties.weight) inheritedFontProperties.weight = newFontProperties.weight;
            if (newFontProperties.whiteSpace) inheritedFontProperties.whiteSpace = newFontProperties.whiteSpace;

            return inheritedFontProperties;
        }
    }
}