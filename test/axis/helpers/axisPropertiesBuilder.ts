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

/// <reference path="../../_references.ts" />

module powerbi.extensibility.utils.chart.axis.test.helper {
    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;

    // powerbi.extensibility.utils.formatting
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;

    // powerbi.extensibility.utils.chart
    import axis = powerbi.extensibility.utils.chart.axis;
    import IAxisProperties = powerbi.extensibility.utils.chart.axis.IAxisProperties;
    import CreateAxisOptions = powerbi.extensibility.utils.chart.axis.CreateAxisOptions;

    export module axisPropertiesBuilder {
        const dataStrings = ["Sun", "Mon", "Holiday"];

        export const dataNumbers = [47.5, 98.22, 127.3];

        const domainOrdinal3 = [0, 1, 2];

        const domainBoolIndex = [0, 1];

        export const domainNaN = [NaN, NaN];

        const displayName: string = "Column";

        const pixelSpan: number = 100;

        export const dataTime = [
            new Date("10/15/2014"),
            new Date("10/15/2015"),
            new Date("10/15/2016")
        ];

        const metaDataColumnText: DataViewMetadataColumn = {
            displayName: displayName,
            type: ValueType.fromDescriptor({ text: true })
        };

        export const metaDataColumnNumeric: DataViewMetadataColumn = {
            displayName: displayName,
            type: ValueType.fromDescriptor({ numeric: true })
        };

        export const metaDataColumnCurrency: DataViewMetadataColumn = {
            displayName: displayName,
            type: ValueType.fromDescriptor({ numeric: true }),
            objects: { general: { formatString: "$0" } },
        };

        const metaDataColumnBool: DataViewMetadataColumn = {
            displayName: displayName,
            type: ValueType.fromDescriptor({ bool: true })
        };

        const metaDataColumnTime: DataViewMetadataColumn = {
            displayName: displayName,
            type: ValueType.fromDescriptor({ dateTime: true }),
            format: "yyyy/MM/dd",
            objects: { general: { formatString: "yyyy/MM/dd" } },
        };

        const formatStringProp: DataViewObjectPropertyIdentifier = {
            objectName: "general",
            propertyName: "formatString"
        };

        function getValueFnStrings(index): string {
            return dataStrings[index];
        }

        function getValueFnNumbers(index): number {
            return dataNumbers[index];
        }

        function getValueFnBool(d): boolean {
            return d === 0;
        }

        function getValueFnTime(index): Date {
            return new Date(index);
        }

        function getValueFnTimeIndex(index): Date {
            return dataTime[index];
        }

        function createAxisOptions(
            metaDataColumn: DataViewMetadataColumn,
            dataDomain: any[],
            getValueFn?): CreateAxisOptions {
            let axisOptions: CreateAxisOptions = {
                pixelSpan: pixelSpan,
                dataDomain: dataDomain,
                metaDataColumn: metaDataColumn,
                formatString: valueFormatter.getFormatString(metaDataColumn, formatStringProp),
                outerPadding: 0.5,
                isScalar: false,
                isVertical: false, // callers will update this to true if necessary before calling createAxis
                getValueFn: getValueFn,
            };

            return axisOptions;
        }

        function getAxisOptions(
            metaDataColumn: DataViewMetadataColumn,
            domain?: string[],
            getValueFn?: (idx: number) => string): CreateAxisOptions {
            let axisOptions = createAxisOptions(
                metaDataColumn,
                domain ? domain :
                    metaDataColumn ? domainOrdinal3 : [],
                getValueFn ? getValueFn : getValueFnStrings);

            return axisOptions;
        }

        export function buildAxisProperties(dataDomain: any[], metadataColumn?: DataViewMetadataColumn): IAxisProperties {
            let axisOptions = createAxisOptions(metadataColumn ? metadataColumn : metaDataColumnNumeric, dataDomain);
            axisOptions.isScalar = true;
            axisOptions.useTickIntervalForDisplayUnits = true;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesString(): IAxisProperties {
            let axisOptions = getAxisOptions(metaDataColumnText);

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesText(
            metaDataColumn: DataViewMetadataColumn,
            domain?: string[],
            getValueFn?: (idx: number) => string): IAxisProperties {
            let axisOptions = getAxisOptions(metaDataColumn, domain, getValueFn);

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesNumber(): IAxisProperties {
            return axis.createAxis(
                createAxisOptions(
                    metaDataColumnNumeric,
                    domainOrdinal3,
                    getValueFnNumbers));
        }

        export function buildAxisPropertiesBool(): IAxisProperties {
            return axis.createAxis(
                createAxisOptions(
                    metaDataColumnBool,
                    domainBoolIndex,
                    getValueFnBool));
        }

        export function buildAxisPropertiesStringWithCategoryThickness(
            categoryThickness: number = 5): IAxisProperties {
            let axisOptions = createAxisOptions(
                metaDataColumnText,
                domainOrdinal3,
                getValueFnStrings);

            axisOptions.categoryThickness = categoryThickness;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesNumbers(): IAxisProperties {
            let axisOptions = createAxisOptions(
                metaDataColumnNumeric,
                [
                    dataNumbers[0],
                    dataNumbers[2]
                ]);

            axisOptions.isScalar = true;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesNan(): IAxisProperties {
            let axisOptions = createAxisOptions(
                metaDataColumnNumeric,
                domainNaN);

            axisOptions.isVertical = true;
            axisOptions.isScalar = true;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesWithDefinedInnerPadding(): IAxisProperties {
            let axisOptions = getAxisOptions(metaDataColumnText);
            axisOptions.innerPadding = 0.5;
            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesWithRangePointsUsing(): IAxisProperties {
            let axisOptions = getAxisOptions(metaDataColumnText);
            axisOptions.innerPadding = 0.5;
            axisOptions.useRangePoints = true;
            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesNumeric(
            dataDomain: any[],
            categoryThickness?: number,
            pixelSpan?: number,
            isVertical: boolean = true,
            isScalar: boolean = true,
            getValueFn?: (idx: number) => string): IAxisProperties {

            let axisOptions = createAxisOptions(
                metaDataColumnNumeric,
                dataDomain,
                getValueFn);

            if (categoryThickness) {
                axisOptions.categoryThickness = categoryThickness;
            }

            if (pixelSpan) {
                axisOptions.pixelSpan = pixelSpan;
            }

            axisOptions.isVertical = isVertical;
            axisOptions.isScalar = isScalar;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesTime(
            dataDomain: any[],
            isScalar: boolean = true,
            maxTicks?: number): IAxisProperties {
            let axisOptions = createAxisOptions(
                metaDataColumnTime,
                dataDomain,
                getValueFnTime);

            axisOptions.isScalar = isScalar;

            if (maxTicks)
                axisOptions.maxTickCount = maxTicks;

            return axis.createAxis(axisOptions);
        }

        export function buildAxisPropertiesTimeIndex(): IAxisProperties {
            let axisOptions = createAxisOptions(
                metaDataColumnTime,
                domainOrdinal3,
                getValueFnTimeIndex);

            return axis.createAxis(axisOptions);
        }
    }
}
