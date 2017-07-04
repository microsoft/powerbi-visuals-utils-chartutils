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

/// <reference path="../_references.ts" />

module powerbi.extensibility.utils.chart.dataLabel.utils.test {
    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import PrimitiveType = powerbi.extensibility.utils.type.PrimitiveType;

    // powerbi.extensibility.utils.chart
    import assertColorsMatch = powerbi.extensibility.utils.chart.test.helpers.assertColorsMatch;
    import dataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;

    describe("dataLabel.utils", () => {
        afterEach(() => {
            $(".data-labels").remove();
        });

        describe("dataLabel.utils tests", () => {

            it("display units formatting values : Auto", () => {
                let value: number = 2000000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 0;
                labelSettings.precision = 0;

                let value2 = 1000000,
                    formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings, value2),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("2M");
            });

            it("display units formatting values : None", () => {
                let value: number = 20000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 10;
                labelSettings.precision = 0;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("20000");
            });

            it("display units formatting values : K", () => {
                let value: number = 20000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 10000;
                labelSettings.precision = 0;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("20K");
            });

            it("display units formatting values : M", () => {
                let value: number = 200000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 1000000;
                labelSettings.precision = 1;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("0.2M");
            });

            it("display units formatting values : B", () => {
                let value: number = 200000000000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 1000000000;
                labelSettings.precision = 0;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("200bn");
            });

            it("display units formatting values : T", () => {
                let value: number = 200000000000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = 1000000000000;
                labelSettings.precision = 1;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate(null, labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("0.2T");
            });

            it("precision formatting using format string #0", () => {
                let value: number = 2000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings(),
                    formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate("#0", labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("2000");
            });

            it("precision formatting using format string #0.00", () => {
                let value: number = 2000,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings(),
                    formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate("#0.00", labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("2000.00");
            });

            it("precision formatting using format string 0.#### $;-0.#### $;0 $", () => {
                let value: number = -2000.123456,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings(),
                    formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate("#.#### $;-#.#### $;0 $", labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("-2000.1235 $");
            });

            it("precision formatting using forced precision", () => {
                let value: number = 2000.123456,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.precision = 2;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter = formattersCache.getOrCreate("0.0000", labelSettings),
                    formattedValue = formatter.format(value);

                expect(formattedValue).toBe("2000.12");
            });

            it("label formatting - multiple formats", () => {
                let formatCol1 = "#,0.0",
                    formatCol2 = "$#,0.0",
                    value: number = 1545,
                    labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();

                labelSettings.displayUnits = null;
                labelSettings.precision = 1;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager(),
                    formatter1 = formattersCache.getOrCreate(formatCol1, labelSettings),
                    formattedValue = formatter1.format(value);

                expect(formattedValue).toBe("1,545.0");

                let formatter2 = formattersCache.getOrCreate(formatCol2, labelSettings);
                formattedValue = formatter2.format(value);

                expect(formattedValue).toBe("$1,545.0");
            });
        });

        describe("Test enumerateDataLabels", () => {
            it("showAll should always be the last property when exists", () => {
                const labelSettings: VisualDataLabelsSettings = dataLabelUtils.getDefaultLabelSettings();
                const options: VisualDataLabelsSettingsOptions = {
                    dataLabelsSettings: labelSettings,
                    displayUnits: true,
                    instances: [],
                    fontSize: true,
                    labelDensity: true,
                    labelStyle: true,
                    position: true,
                    positionObject: [],
                    precision: true,
                    selector: null,
                    show: true,
                    showAll: true,
                };

                dataLabelUtils.enumerateDataLabels(options);

                expect(options.instances.length).toBe(1);

                const properties: DataViewPropertyValue = options.instances[0].properties;
                const propArray: string[] = Object.keys(properties);
                expect(propArray[propArray.length - 1]).toBe("showAll");
            });
        });

        describe("Test enumerateCategoryLabels", () => {
            function getEnumerationObject(): VisualObjectInstanceEnumerationObject {
                return { instances: [] };
            }

            it("test default values", () => {
                let labelSettings = dataLabelUtils.getDefaultPointLabelSettings();

                let enumerationWithColor = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationWithColor, labelSettings, true);
                let objectsWithColor = enumerationWithColor.instances;

                let enumerationNoColor = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationNoColor, labelSettings, false);
                let objectsNoColor = enumerationNoColor.instances;

                labelSettings.showCategory = true;
                let enumerationCategoryLabels = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationCategoryLabels, labelSettings, false, true);
                let objectsCategoryLabels = enumerationCategoryLabels.instances;

                expect(objectsWithColor[0].properties["show"]).toBe(false);
                expect(objectsNoColor[0].properties["show"]).toBe(false);
                expect(objectsCategoryLabels[0].properties["show"]).toBe(true);

                expect(objectsWithColor[0].properties["color"]).toBe(labelSettings.labelColor);
                expect(objectsNoColor[0].properties["color"]).toBeUndefined();
            });

            it("test custom values", () => {
                let labelSettings = dataLabelUtils.getDefaultPointLabelSettings();
                labelSettings.show = true;
                labelSettings.labelColor = "#FF0000";

                let enumerationWithColor = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationWithColor, labelSettings, true);
                let objectsWithColor = enumerationWithColor.instances;

                expect(objectsWithColor[0].properties["show"]).toBe(true);
                assertColorsMatch(
                    <string>objectsWithColor[0].properties["color"],
                    labelSettings.labelColor);

                labelSettings.categoryLabelColor = "#222222";
                enumerationWithColor = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationWithColor, labelSettings, true);
                objectsWithColor = enumerationWithColor.instances;

                assertColorsMatch(<string>objectsWithColor[0].properties["color"], labelSettings.categoryLabelColor);
            });

            it("test null values", () => {
                let labelSettings = dataLabelUtils.getDefaultPointLabelSettings();

                let enumerationWithColor = getEnumerationObject();
                dataLabelUtils.enumerateCategoryLabels(enumerationWithColor, null, true);
                let objectsWithColor = enumerationWithColor.instances;

                expect(objectsWithColor[0].properties["show"]).toBe(labelSettings.show);
                expect(objectsWithColor[0].properties["color"]).toBe(labelSettings.labelColor);
            });
        });
    });
}
