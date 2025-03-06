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
// powerbi.visuals
import powerbi from "powerbi-visuals-api";
import ISelectionId = powerbi.visuals.ISelectionId;

// powerbi.extensibility.utils.type
import { pixelConverter as PixelConverter } from "powerbi-visuals-utils-typeutils";

// powerbi.extensibility.utils.formatting
import * as formatting from "powerbi-visuals-utils-formattingutils";

// powerbi.extensibility.utils.formatting
import TextProperties = formatting.interfaces.TextProperties;
import DisplayUnitSystemType = formatting.displayUnitSystemType.DisplayUnitSystemType;
import ValueFormatterOptions = formatting.valueFormatter.ValueFormatterOptions;
import font = formatting.font;
import numberFormat = formatting.formattingService.numberFormat;
import formattingService = formatting.formattingService.formattingService;
import textMeasurementService = formatting.textMeasurementService;
import valueFormatter = formatting.valueFormatter;

// powerbi.extensibility.utils.svg
import * as svg from "powerbi-visuals-utils-svgutils";
import ClassAndSelector = svg.CssConstants.ClassAndSelector;
import createClassAndSelector = svg.CssConstants.createClassAndSelector;

import { Selection, BaseType } from "d3-selection";

import {
    LabelFormattedTextOptions,
    LabelEnabledDataPoint,
    VisualDataLabelsSettings,
    DrawDefaultLabelsProps,
    DataLabelObject,
    PointLabelPosition,
    PointDataLabelsSettings,
    VisualDataLabelsSettingsOptions,
    IColumnFormatterCacheManager
} from "./dataLabelInterfaces";

import DataLabelManager from "./dataLabelManager";

export const maxLabelWidth: number = 50;
export const defaultLabelDensity: string = "50";
export const DefaultDy: string = "-0.15em";
export const DefaultFontSizeInPt = 9;

export const StandardFontFamily = font.Family.regular.css;
export const LabelTextProperties: TextProperties = {
    fontFamily: font.Family.regularSecondary.css,
    fontSize: PixelConverter.fromPoint(DefaultFontSizeInPt),
    fontWeight: "normal",
};

export const defaultLabelColor = "#777777";
export const defaultInsideLabelColor = "#ffffff";
export const hundredPercentFormat = "0.00 %;-0.00 %;0.00 %";

export const defaultLabelPrecision: number = undefined;
const defaultCountLabelPrecision: number = 0;

const labelGraphicsContextClass: ClassAndSelector = createClassAndSelector("labels");
const linesGraphicsContextClass: ClassAndSelector = createClassAndSelector("lines");
const labelsClass: ClassAndSelector = createClassAndSelector("data-labels");
const lineClass: ClassAndSelector = createClassAndSelector("line-label");

const DimmedOpacity = 0.4;
const DefaultOpacity = 1.0;

interface SelectLabelsProps {
    filteredData: LabelEnabledDataPoint[];
    context: Selection<any, any, any, any>;
    isDonut?: boolean;
    hasAnimation?: boolean;
    animationDuration?: number;
}

function getFillOpacity(selected: boolean, highlight: boolean, hasSelection: boolean, hasPartialHighlights: boolean): number {
    if ((hasPartialHighlights && !highlight) || (hasSelection && !selected)) {
        return DimmedOpacity;
    }

    return DefaultOpacity;
}

export function updateLabelSettingsFromLabelsObject(labelsObj: DataLabelObject, labelSettings: VisualDataLabelsSettings): void {
    if (!labelsObj) {
        return;
    }
    if (labelsObj.show !== undefined) {
        labelSettings.show = labelsObj.show;
    }

    if (labelsObj.showSeries !== undefined) {
        labelSettings.show = labelsObj.showSeries;
    }

    if (labelsObj.color !== undefined) {
        labelSettings.labelColor = labelsObj.color.solid.color;
    }

    if (labelsObj.labelDisplayUnits !== undefined) {
        labelSettings.displayUnits = labelsObj.labelDisplayUnits;
    }

    if (labelsObj.labelPrecision !== undefined) {
        labelSettings.precision = (labelsObj.labelPrecision >= 0)
            ? labelsObj.labelPrecision
            : defaultLabelPrecision;
    }

    if (labelsObj.fontSize !== undefined) {
        labelSettings.fontSize = labelsObj.fontSize;
    }

    if (labelsObj.showAll !== undefined) {
        labelSettings.showLabelPerSeries = labelsObj.showAll;
    }

    if (labelsObj.labelStyle !== undefined) {
        labelSettings.labelStyle = labelsObj.labelStyle;
    }

    if (labelsObj.labelPosition) {
        labelSettings.position = labelsObj.labelPosition;
    }
}

export function getDefaultLabelSettings(show: boolean = false, labelColor?: string, fontSize?: number): VisualDataLabelsSettings {
    return {
        show: show,
        position: PointLabelPosition.Above,
        displayUnits: 0,
        precision: defaultLabelPrecision,
        labelColor: labelColor || defaultLabelColor,
        fontSize: fontSize || DefaultFontSizeInPt,
    };
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function getDefaultColumnLabelSettings(isLabelPositionInside: boolean): VisualDataLabelsSettings {
    const labelSettings = getDefaultLabelSettings(false, undefined);

    labelSettings.position = null;
    labelSettings.labelColor = undefined;

    return labelSettings;
}

export function getDefaultPointLabelSettings(): PointDataLabelsSettings {
    return {
        show: false,
        position: PointLabelPosition.Above,
        displayUnits: 0,
        precision: defaultLabelPrecision,
        labelColor: defaultLabelColor,
        fontSize: DefaultFontSizeInPt,
    };
}

export function getLabelPrecision(precision: number, format: string): number {
    if (precision !== defaultLabelPrecision) {
        return precision;
    }

    if (format === "g" || format === "G") {
        return;
    }

    if (format) {
        // Calculate precision from positive format by default
        const positiveFormat = numberFormat.getComponents(format).positive,
            formatMetadata = numberFormat.getCustomFormatMetadata(positiveFormat, true /*calculatePrecision*/);

        if (formatMetadata.hasDots) {
            return formatMetadata.precision;
        }
    }

    // For count fields we do not want a precision by default
    return defaultCountLabelPrecision;
}

export function drawDefaultLabelsForDataPointChart({ // TODO: Test with Adilet / Iulia
    data,
    context,
    layout,
    viewport,
    isAnimator,
    animationDuration,
    hasSelection,
    hideCollidedLabels = true
}: DrawDefaultLabelsProps ): Selection<any, any, any, any> {

    // Hide and reposition labels that overlap
    const dataLabelManager = new DataLabelManager();
    const filteredData = dataLabelManager.hideCollidedLabels(viewport, data, layout, false, hideCollidedLabels);
    const hasAnimation: boolean = isAnimator && !!animationDuration;
    const selectedLabels: Selection<BaseType, any, BaseType, any> = selectLabels({filteredData, context, hasAnimation, animationDuration});
    if (!selectedLabels) {
        return;
    }

    // Draw default labels
    selectedLabels
        .text((d: LabelEnabledDataPoint) => d.labeltext)
        .attr("x", (d: LabelEnabledDataPoint) => d.labelX)
        .attr("y", (d: LabelEnabledDataPoint) => d.labelY)

    if (hasAnimation) {
        // Add opacity animation
        selectedLabels
            .transition("")
            .duration(animationDuration)
            .style("opacity", hasSelection ? (d => getFillOpacity(d.selected, false, hasSelection, false))() : 1)
    } else {
        // Set opacity to default
        selectedLabels
            .style(layout.style.toString());
    }
    if (layout?.style) {
        Object.keys(layout.style).forEach(style => selectedLabels.style(style, layout.style[style]));
    }

    return selectedLabels;
}

function selectLabels({
    filteredData, 
    context, 
    isDonut, 
    hasAnimation, 
    animationDuration
}: SelectLabelsProps): Selection<BaseType, any, BaseType, any> {
    // Guard for a case where resizing leaves no labels - then we need to remove the labels "g"
    if (!filteredData.length) {
        cleanDataLabels(context, true);
        return null;
    }

    if (context.select(labelGraphicsContextClass.selectorName).empty()) {
        context.append("g").classed(labelGraphicsContextClass.className, true);
    }

    // line chart ViewModel has a special "key" property for point identification since the "identity" field is set to the series identity
    const hasKey: boolean = (<any>filteredData)[0].key != null;
    const hasDataPointIdentity: boolean = (<any>filteredData)[0].identity != null;
    let getIdentifier;
    switch (true) {
        case hasKey:
            getIdentifier = (d: any) => d.key;
            break;
        case hasDataPointIdentity:
            getIdentifier = d => (d.identity as ISelectionId).getKey();
            break;
        case isDonut: 
            getIdentifier = d => d.data.identity.getKey();
            break;
    }

    const labels: Selection<any, any, any, any> = context
        .select(labelGraphicsContextClass.selectorName)
        .selectAll(labelsClass.selectorName)
        .data(filteredData, getIdentifier)

    if (hasAnimation) {
        labels
            .exit()
            .transition()
            .duration(animationDuration)
            .style("opacity", 0) // fade out labels that are removed
            .remove();
    } else {
        labels.exit().remove();
    }

    const allLabels = labels.enter()
        .append("text")
        .classed(labelsClass.className, true)
        .merge(labels);

    if (hasAnimation) {
        allLabels.style("opacity", 0);
    }

    return allLabels;
}

export function cleanDataLabels(
    context: Selection<any, any, any, any>,
    removeLines: boolean = false
): void {
    const emptyData = []
    const labels = context.selectAll(labelsClass.selectorName).data(emptyData);

    labels
        .exit()
        .remove();

    context
        .selectAll(labelGraphicsContextClass.selectorName)
        .remove();

    if (removeLines) {
        const lines = context
            .selectAll(lineClass.selectorName)
            .data(emptyData);

        lines
            .exit()
            .remove();

        context
            .selectAll(linesGraphicsContextClass.selectorName)
            .remove();
    }
}

export function setHighlightedLabelsOpacity(context: Selection<any, any, any, any>, hasSelection: boolean, hasHighlights: boolean) {
    context
        .selectAll(labelsClass.selectorName)
        .style("fill-opacity", (d: any) => {
            const fillOpacity =getFillOpacity(
                d.selected,
                d.highlight,
                !d.highlight && hasSelection,
                !d.selected && hasHighlights
            )
            const labelOpacity = fillOpacity < 1 ? 0 : 1;

            return labelOpacity;
        });
}

export function getLabelFormattedText(options: LabelFormattedTextOptions): string {
    const properties: TextProperties = {
        text: options.formatter?.format(options.label) || formattingService.formatValue(options.label, options.format),
        fontFamily: LabelTextProperties.fontFamily,
        fontSize: PixelConverter.fromPoint(options.fontSize),
        fontWeight: LabelTextProperties.fontWeight,
    };

    return textMeasurementService.getTailoredTextOrDefault(
        properties,
        options.maxWidth ?? maxLabelWidth
    );
}

export function enumerateDataLabels(
    options: VisualDataLabelsSettingsOptions): powerbi.VisualObjectInstance {

    if (!options.dataLabelsSettings) {
        return;
    }

    const instance: powerbi.VisualObjectInstance = {
        objectName: "labels",
        selector: options.selector,
        properties: {},
    };

    if (options.show && options.selector) {
        instance.properties["showSeries"] = options.dataLabelsSettings.show;
    } else if (options.show) {
        instance.properties["show"] = options.dataLabelsSettings.show;
    }

    instance.properties["color"] = options.dataLabelsSettings.labelColor || defaultLabelColor;

    if (options.displayUnits) {
        instance.properties["labelDisplayUnits"] = options.dataLabelsSettings.displayUnits;
    }

    if (options.precision) {
        const precision = options.dataLabelsSettings.precision;
        instance.properties["labelPrecision"] = precision === defaultLabelPrecision ? null : precision;
    }

    if (options.position) {
        instance.properties["labelPosition"] = options.dataLabelsSettings.position;
        if (options.positionObject) {

            instance.validValues = { "labelPosition": options.positionObject };
        }
    }
    if (options.labelStyle) {
        instance.properties["labelStyle"] = options.dataLabelsSettings.labelStyle;
    }

    if (options.fontSize) {
        instance.properties["fontSize"] = options.dataLabelsSettings.fontSize;
    }

    if (options.labelDensity) {
        const lineChartSettings = <any>options.dataLabelsSettings;

        if (lineChartSettings) {
            instance.properties["labelDensity"] = lineChartSettings.labelDensity;
        }
    }

    // Keep show all as the last property of the instance.
    if (options.showAll) {
        instance.properties["showAll"] = options.dataLabelsSettings.showLabelPerSeries;
    }

    options.instances.push(instance);

    return instance;
}

export function enumerateCategoryLabels(
    enumeration: powerbi.VisualObjectInstanceEnumerationObject,
    dataLabelsSettings: VisualDataLabelsSettings,
    withFill: boolean,
    isShowCategory: boolean = false,
    fontSize?: number
): void {

    const labelSettings = (dataLabelsSettings)
        ? dataLabelsSettings
        : getDefaultPointLabelSettings();

    const instance: powerbi.VisualObjectInstance = {
        objectName: "categoryLabels",
        selector: null,
        properties: {
            show: isShowCategory
                ? labelSettings.showCategory
                : labelSettings.show,
            fontSize: dataLabelsSettings ? dataLabelsSettings.fontSize : DefaultFontSizeInPt,
        },
    };

    if (withFill) {
        instance.properties["color"] = labelSettings.categoryLabelColor
            ? labelSettings.categoryLabelColor
            : labelSettings.labelColor;
    }

    if (fontSize) {
        instance.properties["fontSize"] = fontSize;
    }

    enumeration.instances.push(instance);
}

export function createColumnFormatterCacheManager(): IColumnFormatterCacheManager {
    return {
        cache: { defaultFormatter: null },
        getOrCreate(formatString: string, labelSetting: VisualDataLabelsSettings, value2?: number) {
            if (formatString) {
                const cacheKeyObject = {
                    formatString: formatString,
                    displayUnits: labelSetting.displayUnits,
                    precision: getLabelPrecision(labelSetting.precision, formatString),
                    value2: value2
                };

                const cacheKey = JSON.stringify(cacheKeyObject);

                if (!this.cache[cacheKey]) {
                    this.cache[cacheKey] = valueFormatter.create(getOptionsForLabelFormatter(
                        labelSetting,
                        formatString,
                        value2,
                        cacheKeyObject.precision));
                }

                return this.cache[cacheKey];
            }

            if (!this.cache.defaultFormatter) {
                this.cache.defaultFormatter = valueFormatter.create(getOptionsForLabelFormatter(
                    labelSetting,
                    formatString,
                    value2,
                    labelSetting.precision));
            }

            return this.cache.defaultFormatter;
        }
    };
}

export function getOptionsForLabelFormatter(
    labelSetting: VisualDataLabelsSettings,
    formatString: string,
    value2?: number,
    precision?: number
): ValueFormatterOptions {

    return {
        displayUnitSystemType: DisplayUnitSystemType.DataLabels,
        format: formatString,
        precision: precision,
        value: labelSetting.displayUnits,
        value2: value2,
        allowFormatBeautification: true,
    };
}

export function isTextWidthOverflows(textWidth, maxTextWidth): boolean {
    return textWidth > maxTextWidth;
}

export function isTextHeightOverflows(textHeight, innerChordLength): boolean {
    return textHeight > innerChordLength;
}
