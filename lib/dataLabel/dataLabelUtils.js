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
// powerbi.extensibility.utils.type
import { pixelConverter as PixelConverter } from "powerbi-visuals-utils-typeutils";
// powerbi.extensibility.utils.formatting
import * as formatting from "powerbi-visuals-utils-formattingutils";
var font = formatting.font;
var numberFormat = formatting.formattingService.numberFormat;
var formattingService = formatting.formattingService.formattingService;
var textMeasurementService = formatting.textMeasurementService.textMeasurementService;
var valueFormatter = formatting.valueFormatter.valueFormatter;
var DisplayUnitSystemType = formatting.displayUnitSystemType.DisplayUnitSystemType;
// powerbi.extensibility.utils.svg
import * as svg from "powerbi-visuals-utils-svgutils";
var createClassAndSelector = svg.CssConstants.createClassAndSelector;
import * as dataLabelInterfaces from "./dataLabelInterfaces";
import { DataLabelManager } from "./dataLabelManager";
export const maxLabelWidth = 50;
export const defaultLabelDensity = "50";
export const DefaultDy = "-0.15em";
export const DefaultFontSizeInPt = 9;
export const StandardFontFamily = font.Family.regular.css;
export const LabelTextProperties = {
    fontFamily: font.Family.regularSecondary.css,
    fontSize: PixelConverter.fromPoint(DefaultFontSizeInPt),
    fontWeight: "normal",
};
export const defaultLabelColor = "#777777";
export const defaultInsideLabelColor = "#ffffff";
export const hundredPercentFormat = "0.00 %;-0.00 %;0.00 %";
export const defaultLabelPrecision = undefined;
const defaultCountLabelPrecision = 0;
const labelGraphicsContextClass = createClassAndSelector("labels");
const linesGraphicsContextClass = createClassAndSelector("lines");
const labelsClass = createClassAndSelector("data-labels");
const lineClass = createClassAndSelector("line-label");
const DimmedOpacity = 0.4;
const DefaultOpacity = 1.0;
function getFillOpacity(selected, highlight, hasSelection, hasPartialHighlights) {
    if ((hasPartialHighlights && !highlight) || (hasSelection && !selected)) {
        return DimmedOpacity;
    }
    return DefaultOpacity;
}
export function updateLabelSettingsFromLabelsObject(labelsObj, labelSettings) {
    if (labelsObj) {
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
}
export function getDefaultLabelSettings(show = false, labelColor, fontSize) {
    return {
        show: show,
        position: dataLabelInterfaces.PointLabelPosition.Above,
        displayUnits: 0,
        precision: defaultLabelPrecision,
        labelColor: labelColor || defaultLabelColor,
        fontSize: fontSize || DefaultFontSizeInPt,
    };
}
export function getDefaultColumnLabelSettings(isLabelPositionInside) {
    let labelSettings = getDefaultLabelSettings(false, undefined);
    labelSettings.position = null;
    labelSettings.labelColor = undefined;
    return labelSettings;
}
export function getDefaultPointLabelSettings() {
    return {
        show: false,
        position: dataLabelInterfaces.PointLabelPosition.Above,
        displayUnits: 0,
        precision: defaultLabelPrecision,
        labelColor: defaultLabelColor,
        fontSize: DefaultFontSizeInPt,
    };
}
export function getLabelPrecision(precision, format) {
    if (precision !== defaultLabelPrecision) {
        return precision;
    }
    if (format === "g" || format === "G") {
        return;
    }
    if (format) {
        // Calculate precision from positive format by default
        let positiveFormat = numberFormat.getComponents(format).positive, formatMetadata = numberFormat.getCustomFormatMetadata(positiveFormat, true /*calculatePrecision*/);
        if (formatMetadata.hasDots) {
            return formatMetadata.precision;
        }
    }
    // For count fields we do not want a precision by default
    return defaultCountLabelPrecision;
}
export function drawDefaultLabelsForDataPointChart(data, context, layout, viewport, isAnimator = false, animationDuration, hasSelection, hideCollidedLabels = true) {
    // Hide and reposition labels that overlap
    let dataLabelManager = new DataLabelManager();
    let filteredData = dataLabelManager.hideCollidedLabels(viewport, data, layout, false, hideCollidedLabels);
    let hasAnimation = isAnimator && !!animationDuration;
    let labels = selectLabels(filteredData, context, false, hasAnimation);
    if (!labels) {
        return;
    }
    if (hasAnimation) {
        labels
            .text((d) => d.labeltext)
            .transition()
            .duration(animationDuration)
            .style(layout.style)
            .style("opacity", (hasSelection ? (d) => getFillOpacity(d.selected, false, hasSelection, false) : 1))
            .attr("x", (d) => d.labelX)
            .attr("y", (d) => d.labelY);
        labels
            .exit()
            .transition()
            .duration(animationDuration)
            .style("opacity", 0) // fade out labels that are removed
            .remove();
    }
    else {
        labels
            .attr("x", (d) => d.labelX)
            .attr("y", (d) => d.labelY)
            .text((d) => d.labeltext)
            .style(layout.style);
        labels
            .exit()
            .remove();
    }
    return labels;
}
function selectLabels(filteredData, context, isDonut = false, forAnimation = false) {
    // Check for a case where resizing leaves no labels - then we need to remove the labels "g"
    if (filteredData.length === 0) {
        cleanDataLabels(context, true);
        return null;
    }
    if (context.select(labelGraphicsContextClass.selectorName).empty()) {
        context.append("g").classed(labelGraphicsContextClass.className, true);
    }
    // line chart ViewModel has a special "key" property for point identification since the "identity" field is set to the series identity
    let hasKey = filteredData[0].key != null;
    let hasDataPointIdentity = filteredData[0].identity != null;
    let getIdentifier = hasKey ?
        (d) => d.key
        : hasDataPointIdentity ?
            (d) => d.identity.getKey()
            : undefined;
    let labels = isDonut ?
        context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData, (d) => d.data.identity.getKey())
        : getIdentifier != null ?
            context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData, getIdentifier)
            : context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData);
    let newLabels = labels.enter()
        .append("text")
        .classed(labelsClass.className, true);
    if (forAnimation) {
        newLabels.style("opacity", 0);
    }
    return labels;
}
export function cleanDataLabels(context, removeLines = false) {
    let empty = [], labels = context.selectAll(labelsClass.selectorName).data(empty);
    labels
        .exit()
        .remove();
    context
        .selectAll(labelGraphicsContextClass.selectorName)
        .remove();
    if (removeLines) {
        let lines = context
            .selectAll(lineClass.selectorName)
            .data(empty);
        lines
            .exit()
            .remove();
        context
            .selectAll(linesGraphicsContextClass.selectorName)
            .remove();
    }
}
export function setHighlightedLabelsOpacity(context, hasSelection, hasHighlights) {
    context
        .selectAll(labelsClass.selectorName)
        .style("fill-opacity", (d) => {
        let labelOpacity = getFillOpacity(d.selected, d.highlight, !d.highlight && hasSelection, !d.selected && hasHighlights) < 1 ? 0 : 1;
        return labelOpacity;
    });
}
export function getLabelFormattedText(options) {
    let properties = {
        text: options.formatter
            ? options.formatter.format(options.label)
            : formattingService.formatValue(options.label, options.format),
        fontFamily: LabelTextProperties.fontFamily,
        fontSize: PixelConverter.fromPoint(options.fontSize),
        fontWeight: LabelTextProperties.fontWeight,
    };
    return textMeasurementService.getTailoredTextOrDefault(properties, options.maxWidth
        ? options.maxWidth
        : maxLabelWidth);
}
export function enumerateDataLabels(options) {
    if (!options.dataLabelsSettings) {
        return;
    }
    let instance = {
        objectName: "labels",
        selector: options.selector,
        properties: {},
    };
    if (options.show && options.selector) {
        instance.properties["showSeries"] = options.dataLabelsSettings.show;
    }
    else if (options.show) {
        instance.properties["show"] = options.dataLabelsSettings.show;
    }
    instance.properties["color"] = options.dataLabelsSettings.labelColor || defaultLabelColor;
    if (options.displayUnits) {
        instance.properties["labelDisplayUnits"] = options.dataLabelsSettings.displayUnits;
    }
    if (options.precision) {
        let precision = options.dataLabelsSettings.precision;
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
        let lineChartSettings = options.dataLabelsSettings;
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
export function enumerateCategoryLabels(enumeration, dataLabelsSettings, withFill, isShowCategory = false, fontSize) {
    let labelSettings = (dataLabelsSettings)
        ? dataLabelsSettings
        : getDefaultPointLabelSettings();
    let instance = {
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
function getDisplayUnitValueFromAxisFormatter(axisFormatter, labelSettings) {
    if (axisFormatter && axisFormatter.displayUnit && labelSettings.displayUnits === 0) {
        return axisFormatter.displayUnit.value;
    }
    return null;
}
export function createColumnFormatterCacheManager() {
    return {
        cache: { defaultFormatter: null },
        getOrCreate(formatString, labelSetting, value2) {
            if (formatString) {
                let cacheKeyObject = {
                    formatString: formatString,
                    displayUnits: labelSetting.displayUnits,
                    precision: getLabelPrecision(labelSetting.precision, formatString),
                    value2: value2
                };
                let cacheKey = JSON.stringify(cacheKeyObject);
                if (!this.cache[cacheKey]) {
                    this.cache[cacheKey] = valueFormatter.create(getOptionsForLabelFormatter(labelSetting, formatString, value2, cacheKeyObject.precision));
                }
                return this.cache[cacheKey];
            }
            if (!this.cache.defaultFormatter) {
                this.cache.defaultFormatter = valueFormatter.create(getOptionsForLabelFormatter(labelSetting, formatString, value2, labelSetting.precision));
            }
            return this.cache.defaultFormatter;
        }
    };
}
export function getOptionsForLabelFormatter(labelSetting, formatString, value2, precision) {
    return {
        displayUnitSystemType: DisplayUnitSystemType.DataLabels,
        format: formatString,
        precision: precision,
        value: labelSetting.displayUnits,
        value2: value2,
        allowFormatBeautification: true,
    };
}
export function isTextWidthOverflows(textWidth, maxTextWidth) {
    return textWidth > maxTextWidth;
}
export function isTextHeightOverflows(textHeight, innerChordLength) {
    return textHeight > innerChordLength;
}
//# sourceMappingURL=dataLabelUtils.js.map