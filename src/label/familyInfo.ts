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
    export module Font {

        export const FamilyDelimiter = ", ";

        export class FamilyInfo {
            constructor(public families: string[]) { }

            /**
             * Gets the font-families joined by FamilyDelimiter.
             */
            get family(): string {
                return this.getFamily();
            }

            /**
            * Gets the font-families joined by FamilyDelimiter.
            */
            getFamily(): string {
                return this.families.join(FamilyDelimiter);
            }

            /**
             * Gets the CSS string for the "font-family" CSS attribute.
             */
            get css(): string {
                return this.getCSS();
            }

            /**
             * Gets the CSS string for the "font-family" CSS attribute.
             */
            getCSS(): string {
                return this.families ? this.families.map((font => font.indexOf(" ") > -1 ? `'${font}'` : font)).join(", ") : null;
            }
        }

        // These should map to the fonts in src\clients\externals\StyleLibrary\less\fontFaces.less
        export let Family = {
            light: new FamilyInfo(["Segoe UI Light", "wf_segoe-ui_light", "helvetica", "arial", "sans-serif"]),
            semilight: new FamilyInfo(["Segoe UI Semilight", "wf_segoe-ui_semilight", "helvetica", "arial", "sans-serif"]),
            regular: new FamilyInfo(["Segoe UI", "wf_segoe-ui_normal", "helvetica", "arial", "sans-serif"]),
            semibold: new FamilyInfo(["Segoe UI Semibold", "wf_segoe-ui_semibold", "helvetica", "arial", "sans-serif"]),
            bold: new FamilyInfo(["Segoe UI Bold", "wf_segoe-ui_bold", "helvetica", "arial", "sans-serif"]),
            lightSecondary: new FamilyInfo(["wf_standard-font_light", "helvetica", "arial", "sans-serif"]),
            regularSecondary: new FamilyInfo(["wf_standard-font", "helvetica", "arial", "sans-serif"]),
            boldSecondary: new FamilyInfo(["wf_standard-font_bold", "helvetica", "arial", "sans-serif"]),
            glyphs: new FamilyInfo(["PowerVisuals"]),
        };
    }
}