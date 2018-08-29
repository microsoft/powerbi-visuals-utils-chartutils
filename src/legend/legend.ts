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

module powerbi.extensibility.utils.chart.legend {
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;

    export function createLegend(
        legendParentElement: HTMLElement,
        interactive: boolean,
        interactivityService: IInteractivityService,
        isScrollable: boolean = false,
        legendPosition: LegendPosition = LegendPosition.Top,
        interactiveBehavior?: IInteractiveBehavior): ILegend {

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

    export function positionChartArea(chartArea: d3.Selection<any>, legend: ILegend): void {
        let legendMargins = legend.getMargins(),
            legendOrientation = legend.getOrientation();

        chartArea.style({
            "margin-left": isLeft(legendOrientation)
                ? legendMargins.width + "px"
                : null,
            "margin-top": isTop(legendOrientation)
                ? legendMargins.height + "px"
                : null,
        });
    }
}
