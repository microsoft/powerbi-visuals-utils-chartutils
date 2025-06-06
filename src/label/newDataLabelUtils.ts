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
import { interrupt } from "d3-transition";

import { pixelConverter } from "powerbi-visuals-utils-typeutils";
import { CssConstants } from "powerbi-visuals-utils-svgutils";

import {
    LabelOld,
    LabelOrientation,
} from "./labelLayout";

import { CartesianChartType } from "./labelUtils";

export const DefaultLabelFontSizeInPt = 9;
export const startingLabelOffset = 8;
export const maxLabelOffset = 8;

export const horizontalLabelBackgroundPadding = 4;
export const verticalLabelBackgroundPadding = 2;

const labelsClass: CssConstants.ClassAndSelector = CssConstants.createClassAndSelector("label");

function getLabelX(label: LabelOld) {
    const isVertical = label.labelOrientation === LabelOrientation.Vertical;
    const orientationOffset = isVertical ? label.boundingBox.width : (label.boundingBox.width / 2);
    const backgroundOffset = label.hasBackground && isVertical ? horizontalLabelBackgroundPadding : 0;
    return label.boundingBox.left + orientationOffset - backgroundOffset;
}

function getLabelY(label: LabelOld) {
    const isVertical = label.labelOrientation === LabelOrientation.Vertical;
    const orientationOffset = isVertical ? (label.boundingBox.height / 2) : label.boundingBox.height;
    const backgroundOffset = label.hasBackground && !isVertical ? verticalLabelBackgroundPadding : 0;
    return label.boundingBox.top + orientationOffset - backgroundOffset;
}

function labelKeyFunction(label: LabelOld, index: number): string | number {
    if (label.key) {
        return label.key;
    }
    return index;
}

export function drawDefaultLabels(
    context: Selection<any, any, any, any>,
    dataLabels: LabelOld[],
    numeric: boolean = false,
    hasTooltip: boolean = false
): Selection<any, any, any, any> {
    const labels: Selection<any, any, any, any> = context
        .selectAll(labelsClass.selectorName)
        .data(dataLabels, labelKeyFunction);

    labels
        .exit()
        .remove();


    const dy: string = numeric
        ? undefined
        : "-0.15em";

    const mergedLabels = labels.enter()
        .append("text")
        .classed(labelsClass.className, true)
        .merge(labels);

    interrupt(mergedLabels.node())

    mergedLabels
        .text((label: LabelOld) => label.text)
        .attr("transform", (d: LabelOld) => {
            const translate = "translate(" + getLabelX(d) + "," + getLabelY(d) + ")";
            return (d.labelOrientation === LabelOrientation.Vertical) ? (translate + "rotate(-90)") : translate;
        })
        .attr("dy", dy)
        .style("fill", (d: LabelOld) => d.fill)
        .style("font-size", (d: LabelOld) => pixelConverter.fromPoint(d.fontSize || DefaultLabelFontSizeInPt))
        .style("font-family", (d: LabelOld) => d.fontFamily ? d.fontFamily : undefined)
        .style("text-anchor", (d: LabelOld) => d.textAnchor)
        .style("font-weight", (d: LabelOld) => d.fontWeight)
        .style("font-style", (d: LabelOld) => d.fontStyle)
        .style("text-decoration", (d: LabelOld) => d.textDecoration)

    if (hasTooltip) {
        labels.append("title").text((d: LabelOld) => d.tooltip);
        labels.style("pointer-events", "all");
    }

    return mergedLabels;
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

export const dataLabelLayoutStartingOffset: number = 2;
export const dataLabelLayoutOffsetIterationDelta: number = 6;
export const dataLabelLayoutMaximumOffset: number = dataLabelLayoutStartingOffset + (2 * dataLabelLayoutOffsetIterationDelta);

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
                maximumOffset: maxLabelOffset,
                startingOffset: startingLabelOffset,
                attemptToMoveLabelsIntoViewport: true,
            };
    }
}

export function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number {
    if (labelDensity == null || labelDensity === 0) {
        return minimumLabelsToRender;
    }
    const parsedAndNormalizedDensity = labelDensity / 100;
    const maxNumberForViewport = Math.ceil(viewportWidth / estimatedLabelWidth);
    if (parsedAndNormalizedDensity === 1) {
        return maxNumberForViewport;
    }
    return minimumLabelsToRender + Math.floor(parsedAndNormalizedDensity * (maxNumberForViewport - minimumLabelsToRender));
}
