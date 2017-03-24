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

/// <reference path="../_references.ts" />

module powerbi.extensibility.utils.chart.test.helpers {
    import parseColorString = powerbi.extensibility.utils.color.parseColorString;
    import RgbColor = powerbi.extensibility.utils.color.RgbColor;

    export function assertColorsMatch(actual: string, expected: string, invert: boolean = false): boolean {
        const rgbActual: RgbColor = parseColorString(actual),
            rgbExpected: RgbColor = parseColorString(expected);

        if (invert) {
            return expect(rgbActual).not.toEqual(rgbExpected);
        }

        return expect(rgbActual).toEqual(rgbExpected);
    }

    /**
     * Checks if value is in the given range
     * @val Value to check
     * @min Min value of range
     * @max Max value of range
     * @returns True, if value falls in range. False, otherwise
     **/
    export function isInRange(val: number, min: number, max: number): Boolean {
        return min <= val && val <= max;
    }

    export function findElementTitle(element: JQuery): string {
        return element.children("title").text();
    }
}
