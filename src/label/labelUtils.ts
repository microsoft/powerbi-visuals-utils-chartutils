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

import { CssConstants } from "powerbi-visuals-utils-svgutils";

import { FontProperties } from "./fontProperties";
import {
    drawDefaultLabels as newDrawDefaultLabels,
    getDataLabelLayoutOptions as newGetDataLabelLayoutOptions,
    getNumberOfLabelsToRender as newGetNumberOfLabelsToRender } from "./newDataLabelUtils";

import {
    DataLabelLayoutOptions,
    Label,
    LabelOld,
    LabelOrientation,
} from "./labelLayout";

export interface VisualDataLabelsSettings {
    show: boolean;
    fontProperties: FontProperties;
    showLabelPerSeries?: boolean;
    labelOrientation?: LabelOrientation;
    isSeriesExpanded?: boolean;
    displayUnits?: number;
    showCategory?: boolean;
    position?: any;
    precision?: number;
    percentagePrecision?: number;
    categoryLabelColor?: string;
    labelStyle?: any;
    minFontSize?: number;
    maxFontSize?: number;
    labelOverflow?: boolean;
    enableBackground?: boolean;
    backgroundColor?: string;
    backgroundTransparency?: number;
}

export interface LabelEnabledDataPoint {
    // for collistion detection use
    labelX?: number;
    labelY?: number;
    // for overriding color from label settings
    labelFill?: string;
    // for display units and precision
    labeltext?: string;
    // taken from column metadata
    labelFormatString?: string;
    isLabelInside?: boolean;
    labelFontSize?: number;
}

export const enum CartesianChartType {
    Line,
    Area,
    StackedArea,
    ClusteredColumn,
    StackedColumn,
    ClusteredBar,
    StackedBar,
    HundredPercentStackedBar,
    HundredPercentStackedColumn,
    RibbonChart,
    Scatter,
    ComboChart,
    DataDot,
    Waterfall,
    LineClusteredColumnCombo,
    LineStackedColumnCombo,
    DataDotClusteredColumnCombo,
    DataDotStackedColumnCombo,
    RealTimeLineChart,
}


export const DefaultFontSizeInPt = 9;

export const horizontalLabelBackgroundPadding = 4;
export const verticalLabelBackgroundPadding = 2;

export let labelGraphicsContextClass: CssConstants.ClassAndSelector = CssConstants.createClassAndSelector("labelGraphicsContext");
export let labelBackgroundGraphicsContextClass: CssConstants.ClassAndSelector = CssConstants.createClassAndSelector("labelBackgroundGraphicsContext");

export function downgradeToOldLabels(labels: Label[]): LabelOld[] {
    if (!labels) return;
    return labels.map((label) => {
        let inheritedLabel: Label = { ...label };
        inheritedLabel.fontProperties = null;
        let oldLabel: LabelOld = <any>inheritedLabel;
        oldLabel.fill = label.fontProperties ? label.fontProperties.color : undefined;
        oldLabel.fontSize = (label.fontProperties && label.fontProperties.size) ? label.fontProperties.size.pt : undefined;
        oldLabel.fontFamily = label.fontProperties ? label.fontProperties.family : undefined;
        return oldLabel;
    });
}

export function drawDefaultLabels(
    context: Selection<any, any, any, any>,
    dataLabels: Label[],
    numeric: boolean = false,
    hasTooltip: boolean = false
): Selection<any, any, any, any> {
    return newDrawDefaultLabels(context, downgradeToOldLabels(dataLabels), numeric, hasTooltip);
}

export function getDataLabelLayoutOptions(chartType: CartesianChartType): DataLabelLayoutOptions {
    return newGetDataLabelLayoutOptions(chartType);
}

export function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number {
    return newGetNumberOfLabelsToRender(viewportWidth, labelDensity, minimumLabelsToRender, estimatedLabelWidth);
}
