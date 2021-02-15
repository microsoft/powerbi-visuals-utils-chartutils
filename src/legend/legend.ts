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
import { Selection } from "d3-selection";
import { interactivityBaseService } from "powerbi-visuals-utils-interactivityutils";
import IInteractivityService = interactivityBaseService.IInteractivityService;
import IInteractiveBehavior = interactivityBaseService.IInteractiveBehavior;
import { ILegend, LegendPosition, LegendDataPoint } from "./legendInterfaces";
import { InteractiveLegend } from "./interactiveLegend";
import { SVGLegend } from "./svgLegend";

export function createLegend(
    legendParentElement: HTMLElement,
    interactive: boolean,
    interactivityService: IInteractivityService<LegendDataPoint>,
    isScrollable: boolean = false,
    legendPosition: LegendPosition = LegendPosition.Top,
    interactiveBehavior?: IInteractiveBehavior,
): ILegend {

    if (interactive) {
        return new InteractiveLegend(legendParentElement);
    }

    return new SVGLegend(legendParentElement, legendPosition, interactivityService, isScrollable, interactiveBehavior);
}

export function isLeft(orientation: LegendPosition): boolean {
    switch (orientation) {
        case LegendPosition.Left:
        case LegendPosition.LeftCenter:
            return true;
        default:
            return false;
    }
}

export function isTop(orientation: LegendPosition): boolean {
    switch (orientation) {
        case LegendPosition.Top:
        case LegendPosition.TopCenter:
            return true;
        default:
            return false;
    }
}

export function positionChartArea(chartArea: Selection<any, any, any, any>, legend: ILegend): void {
    let legendMargins = legend.getMargins(),
        legendOrientation = legend.getOrientation();

    chartArea.style(
        "margin-left", isLeft(legendOrientation)
            ? legendMargins.width + "px"
            : null
    );
    chartArea.style(
        "margin-top", isTop(legendOrientation)
            ? legendMargins.height + "px"
            : null,
    );
}
