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

module powerbi.extensibility.utils.chart.label {
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    import createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

    export module NewDataLabelUtils {
        export const DefaultLabelFontSizeInPt = 9;
        export let startingLabelOffset = 8;
        export let maxLabelOffset = 8;

        export const horizontalLabelBackgroundPadding = 4;
        export const verticalLabelBackgroundPadding = 2;

        let labelsClass: ClassAndSelector = createClassAndSelector("label");

        function getLabelX(label: LabelOld) {
            let isVertical = label.labelOrientation === LabelOrientation.Vertical;
            let orientationOffset = isVertical ? label.boundingBox.width : (label.boundingBox.width / 2);
            let backgroundOffset = label.hasBackground && isVertical ? horizontalLabelBackgroundPadding : 0;
            return label.boundingBox.left + orientationOffset - backgroundOffset;
        }

        function getLabelY(label: LabelOld) {
            let isVertical = label.labelOrientation === LabelOrientation.Vertical;
            let orientationOffset = isVertical ? (label.boundingBox.height / 2) : label.boundingBox.height;
            let backgroundOffset = label.hasBackground && !isVertical ? verticalLabelBackgroundPadding : 0;
            return label.boundingBox.top + orientationOffset - backgroundOffset;
        }

        function labelKeyFunction(label: LabelOld, index: number): any {
            if (label.key) {
                return label.key;
            }

            return index;
        }

        export function drawDefaultLabels(context: d3.Selection<any>, dataLabels: LabelOld[], numeric: boolean = false, twoRows: boolean = false, hasTooltip: boolean = false): d3.selection.Update<any> {
            let labels = context.selectAll(labelsClass.selectorName)
                .data(dataLabels, labelKeyFunction);
            labels.enter()
                .append("text")
                .classed(labelsClass.className, true);

            let labelAttr = {
                transform: (d: LabelOld) => {
                    let translate = "translate(" + getLabelX(d) + "," + getLabelY(d) + ")";
                    return (d.labelOrientation === LabelOrientation.Vertical) ? (translate + "rotate(-90)") : translate;
                },
                dy: "-0.15em",
            };
            if (numeric) { // For numeric labels, we use a tighter bounding box, so remove the dy because it doesn't need to be centered
                labelAttr.dy = undefined;
            }

            labels
                .interrupt()
                .text((d: LabelOld) => d.text)
                .attr(labelAttr)
                .style({
                    "fill": (d: LabelOld) => d.fill,
                    "font-size": (d: LabelOld) => PixelConverter.fromPoint(d.fontSize || DefaultLabelFontSizeInPt),
                    "font-family": (d: LabelOld) => d.fontFamily ? d.fontFamily : undefined,
                    "text-anchor": (d: LabelOld) => d.textAnchor,
                });
            labels.exit()
                .remove();

            if (hasTooltip) {
                labels.append("title").text((d: LabelOld) => d.tooltip);
                labels.style("pointer-events", "all");
            }

            return labels;
        }

        export interface DataLabelLayoutOptions {
            /** The amount of offset to start with when the data label is not centered */
            startingOffset: number;
            /** Maximum distance labels will be offset by */
            maximumOffset: number;
            /** The amount to increase the offset each attempt while laying out labels */
            offsetIterationDelta?: number;
            /** Horizontal padding used for checking whether a label is inside a parent shape */
            horizontalPadding?: number;
            /** Vertical padding used for checking whether a label is inside a parent shape */
            verticalPadding?: number;
            /** Should we draw reference lines in case the label offset is greater then the default */
            allowLeaderLines?: boolean;
            /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
            attemptToMoveLabelsIntoViewport?: boolean;
        }

        export let dataLabelLayoutStartingOffset: number = 2;
        export let dataLabelLayoutOffsetIterationDelta: number = 6;
        export let dataLabelLayoutMaximumOffset: number = dataLabelLayoutStartingOffset + (2 * dataLabelLayoutOffsetIterationDelta);

        export function getDataLabelLayoutOptions(chartType: CartesianChartType): DataLabelLayoutOptions {
            switch (chartType) {
                case CartesianChartType.Scatter:
                    return {
                        maximumOffset: dataLabelLayoutMaximumOffset,
                        startingOffset: dataLabelLayoutStartingOffset,
                        offsetIterationDelta: dataLabelLayoutOffsetIterationDelta,
                        allowLeaderLines: true,
                        attemptToMoveLabelsIntoViewport: true,
                    };
                default:
                    return {
                        maximumOffset: NewDataLabelUtils.maxLabelOffset,
                        startingOffset: NewDataLabelUtils.startingLabelOffset,
                        attemptToMoveLabelsIntoViewport: true,
                    };
            }
        }

        export function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number {
            if (labelDensity == null || labelDensity === 0) {
                return minimumLabelsToRender;
            }
            let parsedAndNormalizedDensity = labelDensity / 100;
            let maxNumberForViewport = Math.ceil(viewportWidth / estimatedLabelWidth);
            if (parsedAndNormalizedDensity === 1) {
                return maxNumberForViewport;
            }
            return minimumLabelsToRender + Math.floor(parsedAndNormalizedDensity * (maxNumberForViewport - minimumLabelsToRender));
        }
    }
}
