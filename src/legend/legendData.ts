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

module powerbi.extensibility.utils.chart.legend.data {
    export const DefaultLegendLabelFillColor: string = "#666666";

    export function update(legendData: LegendData, legendObject: DataViewObject): void {
        if (legendObject[legendProps.show] == null) {
            legendObject[legendProps.show] = true;
        }

        if (legendObject[legendProps.show] === false) {
            legendData.dataPoints = [];
        }

        if (legendObject[legendProps.show] === true && legendObject[legendProps.position] == null) {
            legendObject[legendProps.position] = position.top;
        }

        if (legendObject[legendProps.fontSize] !== undefined) {
            legendData.fontSize = <number>legendObject[legendProps.fontSize];
        }

        if (legendObject[legendProps.labelColor] !== undefined) {

            let fillColor = <Fill>legendObject[legendProps.labelColor];

            if (fillColor != null) {
                legendData.labelColor = fillColor.solid.color;
            }
        }

        if (legendObject[legendProps.showTitle] === false) {
            legendData.title = "";
        }
        else if (legendObject[legendProps.titleText] !== undefined) {
            legendData.title = <string>legendObject[legendProps.titleText];
        }
    }
}
