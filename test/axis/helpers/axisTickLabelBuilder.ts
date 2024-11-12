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

// powerbi.extensibility.utils.formatting
import powerbi from "powerbi-visuals-api";
import IViewport = powerbi.IViewport;

import * as axis from "./../../../src/axis/axis";
import * as axisInterfaces from "./../../../src/axis/axisInterfaces";
import IAxisProperties = axisInterfaces.IAxisProperties;

import { textMeasurementService, interfaces } from "powerbi-visuals-utils-formattingutils";
import TextProperties = interfaces.TextProperties;
import CartesianAxisProperties = axisInterfaces.CartesianAxisProperties;

export class AxisTickLabelBuilder {
    private xAxisProperties: IAxisProperties;
    private y1AxisProperties: IAxisProperties;
    private y2AxisProperties: IAxisProperties;
    private axes: CartesianAxisProperties;

    private viewPort: IViewport = {
        width: 200,
        height: 125
    };

    private textProperties: TextProperties = {
        fontFamily: "",
        fontSize: "16px"
    };

    constructor(viewport?: IViewport, xValues?: any[]) {
        this.xAxisProperties = this.buildAxisOptions(xValues || ["Oregon", "Washington", "California", "Mississippi"]);
        this.y1AxisProperties = this.buildAxisOptions([20, 30, 50]);
        this.y2AxisProperties = this.buildAxisOptions([2000, 3000, 5000]);

        this.axes = {
            x: this.xAxisProperties,
            y1: this.y1AxisProperties,
            y2: this.y2AxisProperties,
        };

        if (viewport) {
            this.viewPort = viewport;
        }
    }

    public getFontSize(): number {
        return parseInt(this.textProperties.fontSize, 10);
    }

    public buildAxisOptions(values: any[]): IAxisProperties {
        return {
            scale: undefined,
            values: values,
            axisLabel: "",
            isCategoryAxis: true,
            xLabelMaxWidth: 20,
            outerPadding: 10,
            categoryThickness: 25,
        } as IAxisProperties;
    }

    public buildTickLabelMargins(
        rotateX?: boolean,
        wordBreak?: boolean,
        showOnRight?: boolean,
        renderXAxis?: boolean,
        renderYAxes?: boolean,
        renderY2Axis?: boolean,
        categoryThickness?: number,
        outerPadding?: number,
        isScalar?: boolean
    ) {

        this.xAxisProperties.willLabelsFit = !rotateX;
        this.xAxisProperties.willLabelsWordBreak = wordBreak;
        let dataDomain = [0, 10];
        this.xAxisProperties.dataDomain = dataDomain;
        this.xAxisProperties.scale = isScalar
            ? axis.createLinearScale(this.viewPort.width, dataDomain)
            : axis.createOrdinalScale(this.viewPort.width, dataDomain);

        if (categoryThickness != null) {
            this.xAxisProperties.categoryThickness = categoryThickness;
            this.xAxisProperties.xLabelMaxWidth = categoryThickness * 0.9;
            this.xAxisProperties.outerPadding = categoryThickness * 0.5;
        }

        // scalar line chart sets outer padding to zero since it isn't drawing rectangles
        if (outerPadding != null)
            this.xAxisProperties.outerPadding = outerPadding;

        let margins = axis.getTickLabelMargins({
            viewport: this.viewPort,
            yMarginLimit: this.viewPort.width * 0.3,
            textWidthMeasurer: textMeasurementService.measureSvgTextWidth,
            textHeightMeasurer: textMeasurementService.estimateSvgTextHeight,
            axes: this.axes,
            bottomMarginLimit: this.viewPort.height * 0.2,
            properties: this.textProperties,
            showOnRight,
            renderXAxis,
            renderY1Axis: renderYAxes,
            renderY2Axis
        });

        return margins;
    }
}
