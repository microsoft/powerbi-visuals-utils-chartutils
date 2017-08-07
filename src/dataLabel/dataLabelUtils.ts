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

module powerbi.extensibility.utils.chart.dataLabel.utils {
    // powerbi.visuals
    import ISelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility.utils.formatting
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import font = powerbi.extensibility.utils.formatting.font;
    import numberFormat = powerbi.extensibility.utils.formatting.numberFormat;
    import formattingService = powerbi.extensibility.utils.formatting.formattingService;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import DisplayUnitSystemType = powerbi.extensibility.utils.formatting.DisplayUnitSystemType;
    import ValueFormatterOptions = powerbi.extensibility.utils.formatting.ValueFormatterOptions;

    // powerbi.extensibility.utils.type
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

    // powerbi.extensibility.utils.svg
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    import createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;

    // powerbi.extensibility.utils.interactivity
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;

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

    function getFillOpacity(selected: boolean, highlight: boolean, hasSelection: boolean, hasPartialHighlights: boolean): number {
        if ((hasPartialHighlights && !highlight) || (hasSelection && !selected)) {
            return DimmedOpacity;
        }

        return DefaultOpacity;
    }

    export function updateLabelSettingsFromLabelsObject(labelsObj: DataLabelObject, labelSettings: VisualDataLabelsSettings): void {
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

    export function getDefaultColumnLabelSettings(isLabelPositionInside: boolean): VisualDataLabelsSettings {
        let labelSettings = getDefaultLabelSettings(false, undefined);

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
            let positiveFormat = numberFormat.getComponents(format).positive,
                formatMetadata = numberFormat.getCustomFormatMetadata(positiveFormat, true /*calculatePrecision*/);

            if (formatMetadata.hasDots) {
                return formatMetadata.precision;
            }
        }

        // For count fields we do not want a precision by default
        return defaultCountLabelPrecision;
    }

    export function drawDefaultLabelsForDataPointChart(data: any[], context: d3.Selection<any>, layout: ILabelLayout,
        viewport: IViewport, isAnimator: boolean = false, animationDuration?: number, hasSelection?: boolean, hideCollidedLabels: boolean = true): d3.selection.Update<any> {

        // Hide and reposition labels that overlap
        let dataLabelManager = new DataLabelManager();
        let filteredData = dataLabelManager.hideCollidedLabels(viewport, data, layout, false, hideCollidedLabels);
        let hasAnimation: boolean = isAnimator && !!animationDuration;
        let labels: d3.selection.Update<any> = selectLabels(filteredData, context, false, hasAnimation);

        if (!labels) {
            return;
        }

        if (hasAnimation) {
            labels
                .text((d: LabelEnabledDataPoint) => d.labeltext)
                .transition()
                .duration(animationDuration)
                .style(layout.style as any)
                .style("opacity", (hasSelection ? (d: SelectableDataPoint) => getFillOpacity(d.selected, false, hasSelection, false) : 1) as any)
                .attr({
                    x: (d: LabelEnabledDataPoint) => d.labelX,
                    y: (d: LabelEnabledDataPoint) => d.labelY
                });

            labels
                .exit()
                .transition()
                .duration(animationDuration)
                .style("opacity", 0) // fade out labels that are removed
                .remove();
        }
        else {
            labels
                .attr({ x: (d: LabelEnabledDataPoint) => d.labelX, y: (d: LabelEnabledDataPoint) => d.labelY })
                .text((d: LabelEnabledDataPoint) => d.labeltext)
                .style(layout.style as any);

            labels
                .exit()
                .remove();
        }

        return labels;
    }

    function selectLabels(filteredData: LabelEnabledDataPoint[], context: d3.Selection<any>, isDonut: boolean = false, forAnimation: boolean = false): d3.selection.Update<any> {
        // Check for a case where resizing leaves no labels - then we need to remove the labels "g"
        if (filteredData.length === 0) {
            cleanDataLabels(context, true);
            return null;
        }

        if (context.select(labelGraphicsContextClass.selectorName).empty()) {
            context.append("g").classed(labelGraphicsContextClass.className, true);
        }

        // line chart ViewModel has a special "key" property for point identification since the "identity" field is set to the series identity
        let hasKey: boolean = (<any>filteredData)[0].key != null;
        let hasDataPointIdentity: boolean = (<any>filteredData)[0].identity != null;
        let getIdentifier = hasKey ?
            (d: any) => d.key
            : hasDataPointIdentity ?
                (d: SelectableDataPoint) => (d.identity as ISelectionId).getKey()
                : undefined;

        let labels = isDonut ?
            context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData, (d: any) => d.data.identity.getKey())
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

    export function cleanDataLabels(context: d3.Selection<any>, removeLines: boolean = false): void {
        let empty = [],
            labels = context.selectAll(labelsClass.selectorName).data(empty);

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

    export function setHighlightedLabelsOpacity(context: d3.Selection<any>, hasSelection: boolean, hasHighlights: boolean) {
        context
            .selectAll(labelsClass.selectorName)
            .style("fill-opacity", (d: any) => {
                let labelOpacity = getFillOpacity(
                    d.selected,
                    d.highlight,
                    !d.highlight && hasSelection,
                    !d.selected && hasHighlights) < 1 ? 0 : 1;

                return labelOpacity;
            });
    }

    export function getLabelFormattedText(options: LabelFormattedTextOptions): string {
        let properties: TextProperties = {
            text: options.formatter
                ? options.formatter.format(options.label)
                : formattingService.formatValue(options.label, options.format),
            fontFamily: LabelTextProperties.fontFamily,
            fontSize: PixelConverter.fromPoint(options.fontSize),
            fontWeight: LabelTextProperties.fontWeight,
        };

        return textMeasurementService.getTailoredTextOrDefault(
            properties,
            options.maxWidth
                ? options.maxWidth
                : maxLabelWidth);
    }

    export function enumerateDataLabels(
        options: VisualDataLabelsSettingsOptions): VisualObjectInstance {

        if (!options.dataLabelsSettings) {
            return;
        }

        let instance: VisualObjectInstance = {
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
            let lineChartSettings = <any>options.dataLabelsSettings;

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
        enumeration: VisualObjectInstanceEnumerationObject,
        dataLabelsSettings: VisualDataLabelsSettings,
        withFill: boolean,
        isShowCategory: boolean = false,
        fontSize?: number): void {

        let labelSettings = (dataLabelsSettings)
            ? dataLabelsSettings
            : getDefaultPointLabelSettings();

        let instance: VisualObjectInstance = {
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

    function getDisplayUnitValueFromAxisFormatter(axisFormatter: IValueFormatter, labelSettings: VisualDataLabelsSettings): number {
        if (axisFormatter && axisFormatter.displayUnit && labelSettings.displayUnits === 0) {
            return axisFormatter.displayUnit.value;
        }

        return null;
    }

    export function createColumnFormatterCacheManager(): IColumnFormatterCacheManager {
        return <IColumnFormatterCacheManager>{
            cache: { defaultFormatter: null },
            getOrCreate(formatString: string, labelSetting: VisualDataLabelsSettings, value2?: number) {
                if (formatString) {
                    let cacheKeyObject = {
                        formatString: formatString,
                        displayUnits: labelSetting.displayUnits,
                        precision: getLabelPrecision(labelSetting.precision, formatString),
                        value2: value2
                    };

                    let cacheKey = JSON.stringify(cacheKeyObject);

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
        precision?: number): ValueFormatterOptions {

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
}
