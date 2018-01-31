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

namespace powerbi.extensibility.utils.chart.label  {
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    import createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;
    import FontSize = Units.FontSize;

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

    export module LabelUtils {
        export const DefaultFontSizeInPt = 9;
        export const DefaultLabelFontFamily = Font.Family.regularSecondary.css;

        export const defaultFontProperties: FontProperties = {
            family: DefaultLabelFontFamily,
            size: FontSize.createFromPt(DefaultFontSizeInPt),
            weight: "normal",
        };

        export const horizontalLabelBackgroundPadding = 4;
        export const verticalLabelBackgroundPadding = 2;

        export let labelGraphicsContextClass: ClassAndSelector = createClassAndSelector("labelGraphicsContext");
        export let labelBackgroundGraphicsContextClass: ClassAndSelector = createClassAndSelector("labelBackgroundGraphicsContext");

        export function downgradeToOldLabels(labels: Label[]): LabelOld[] {
            if (!labels) return;
            return _.map(labels, (label) => {
                let inheritedLabel: Label = Prototype.inherit(label);
                inheritedLabel.fontProperties = null;
                let oldLabel: LabelOld = <any>inheritedLabel;
                oldLabel.fill = label.fontProperties ? label.fontProperties.color : undefined;
                oldLabel.fontSize = (label.fontProperties && label.fontProperties.size) ? label.fontProperties.size.pt : undefined;
                oldLabel.fontFamily = label.fontProperties ? label.fontProperties.family : undefined;
                return oldLabel;
            });
        }

        export function drawDefaultLabels(context: d3.Selection<any>, dataLabels: Label[], numeric: boolean = false, twoRows: boolean = false, hasTooltip: boolean = false): d3.selection.Update<any> {
            return NewDataLabelUtils.drawDefaultLabels(context, downgradeToOldLabels(dataLabels), numeric, twoRows, hasTooltip);
        }

        export function getDataLabelLayoutOptions(chartType: CartesianChartType): DataLabelLayoutOptions {
            return NewDataLabelUtils.getDataLabelLayoutOptions(chartType);
        }

        export function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number {
            return NewDataLabelUtils.getNumberOfLabelsToRender(viewportWidth, labelDensity, minimumLabelsToRender, estimatedLabelWidth);
        }
    }
}
