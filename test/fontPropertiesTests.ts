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

/// <reference path="_references.ts" />

module powerbi.extensibility.utils.chart.label.utils.test {
    import FontSize = powerbi.extensibility.utils.chart.label.Units.FontSize;
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

    describe("Units", () => {
        describe("FontSize", () => {
            describe("createFromPt", () => {
                let fontSize: FontSize;
                const expectedPtValue = 10;
                const expectedPxValue = 20;

                beforeAll(() => {
                    spyOn(PixelConverter, "fromPointToPixel").and.returnValue(expectedPxValue);
                    fontSize = FontSize.createFromPt(expectedPtValue);
                });

                it("sets the point value", () => {
                    expect(fontSize.pt).toBe(expectedPtValue);
                });

                it("sets the pixel value", () => {
                    expect(fontSize.px).toBe(expectedPxValue);
                });
            });

            describe("createFromPx", () => {
                let fontSize: FontSize;
                const expectedPtValue = 10;
                const expectedPxValue = 20;

                beforeAll(() => {
                    spyOn(PixelConverter, "toPoint").and.returnValue(expectedPtValue);
                    fontSize = FontSize.createFromPx(expectedPxValue);
                });

                it("sets the point value", () => {
                    expect(fontSize.pt).toBe(expectedPtValue);
                });

                it("sets the pixel value", () => {
                    expect(fontSize.px).toBe(expectedPxValue);
                });
            });
        });
    });
}
