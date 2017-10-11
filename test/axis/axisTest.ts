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

module powerbi.extensibility.utils.chart.axis.test {
    // d3
    import OrdinalScale = d3.scale.Ordinal;

    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import PrimitiveType = powerbi.extensibility.utils.type.PrimitiveType;

    // powerbi.extensibility.utils.formatting
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;

    // powerbi.extensibility.utils.chart
    import axis = powerbi.extensibility.utils.chart.axis;
    import axisScale = powerbi.extensibility.utils.chart.axis.scale;
    import axisPropertiesBuilder = powerbi.extensibility.utils.chart.axis.test.helper.axisPropertiesBuilder;
    import isInRange = powerbi.extensibility.utils.chart.test.helpers.isInRange;
    import AxisTickLabelBuilder = powerbi.extensibility.utils.chart.axis.test.helper.AxisTickLabelBuilder;

    describe("axis", () => {
        it("powerOfTen test", () => {
            let powersOf10: number[] = [-10000, 1000000000, 10, 100000000000],
                length: number = powersOf10.length,
                numbers: number[] = [2, 5, 2345, 12445067, 122334551, 90, 50, -50, 200, -1223333212, -122333442111],
                powers: number[] = powersOf10.filter((value: number) => axis.powerOfTen(value)),
                notPowers: number[] = numbers.filter((value: number) => axis.powerOfTen(value));

            expect(powers.length).toBe(length);
            expect(notPowers.length).toBe(0);
        });

        describe("invertOrdinalScale", () => {
            let domain: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                pixelSpan: number = 100;

            it("in middle", () => {
                let ordinalScale: OrdinalScale<any, any> = axis.createOrdinalScale(pixelSpan, domain, 0.4);

                let invertedValue = axis.invertOrdinalScale(ordinalScale, 49);
                expect(invertedValue).toBe(4);

                invertedValue = axis.invertOrdinalScale(ordinalScale, 50);
                expect(invertedValue).toBe(5);

                invertedValue = axis.invertOrdinalScale(ordinalScale, 51);
                expect(invertedValue).toBe(5);

                ordinalScale = axis.createOrdinalScale(pixelSpan, domain, 0); // zero

                invertedValue = axis.invertOrdinalScale(ordinalScale, 49);
                expect(invertedValue).toBe(4);

                invertedValue = axis.invertOrdinalScale(ordinalScale, 50);
                expect(invertedValue).toBe(5);

                invertedValue = axis.invertOrdinalScale(ordinalScale, 51);
                expect(invertedValue).toBe(5);
            });

            it("at start", () => {
                let ordinalScale: OrdinalScale<any, any> = axis.createOrdinalScale(pixelSpan, domain, 0.4);
                let invertedValue = axis.invertOrdinalScale(ordinalScale, 0);
                expect(invertedValue).toBe(0);
            });

            it("at end", () => {
                let ordinalScale: OrdinalScale<any, any> = axis.createOrdinalScale(pixelSpan, domain, 0.4);
                let invertedValue = axis.invertOrdinalScale(ordinalScale, 99);
                expect(invertedValue).toBe(9);
            });

            it("at before start", () => {
                let ordinalScale: OrdinalScale<any, any> = axis.createOrdinalScale(pixelSpan, domain, 0.4);
                let invertedValue = axis.invertOrdinalScale(ordinalScale, -45);
                expect(invertedValue).toBe(0);
            });

            it("at after end", () => {
                let ordinalScale: OrdinalScale<any, any> = axis.createOrdinalScale(pixelSpan, domain, 0.4);
                let invertedValue = axis.invertOrdinalScale(ordinalScale, 1222);
                expect(invertedValue).toBe(9);
            });
        });

        describe("createDomain", () => {
            let cartesianSeries = [
                {
                    data: [
                        {
                            categoryValue: 7,
                            value: 11,
                            categoryIndex: 0,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 9,
                            value: 9,
                            categoryIndex: 1,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 15,
                            value: 6,
                            categoryIndex: 2,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 22,
                            value: 7,
                            categoryIndex: 3,
                            seriesIndex: 0,
                        }
                    ]
                },
            ];
            let cartesianSeriesWithHighlights = [
                {
                    data: [
                        {
                            categoryValue: 7,
                            value: 3,
                            categoryIndex: 0,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 7,
                            value: 11,
                            categoryIndex: 0,
                            seriesIndex: 0,
                            highlight: true,
                        }, {
                            categoryValue: 7,
                            value: 11,
                            categoryIndex: 1,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 7,
                            value: 11,
                            categoryIndex: 1,
                            seriesIndex: 0,
                            highlight: true,
                        }, {
                            categoryValue: 7,
                            value: 11,
                            categoryIndex: 2,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 9,
                            value: 9,
                            categoryIndex: 2,
                            seriesIndex: 0,
                            highlight: true,
                        }, {
                            categoryValue: 15,
                            value: 6,
                            categoryIndex: 3,
                            seriesIndex: 0,
                        }, {
                            categoryValue: 22,
                            value: 7,
                            categoryIndex: 3,
                            seriesIndex: 0,
                            highlight: true,
                        }
                    ]
                },
            ];

            it("ordinal - text", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);
                expect(domain).toEqual([0, 1, 2, 3]);
            });

            it("ordinal - with highlights", () => {
                let domain = axis.createDomain(cartesianSeriesWithHighlights, ValueType.fromDescriptor({ text: true }), false, []);
                expect(domain).toEqual([0, 1, 2, 3]);
            });

            it("scalar - two values", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [5, 20]);
                expect(domain).toEqual([5, 20]);
            });

            it("scalar - undefined, val", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [undefined, 20]);
                expect(domain).toEqual([7, 20]);
            });

            it("scalar - val, undefined", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [5, undefined]);
                expect(domain).toEqual([5, 22]);
            });

            it("scalar - undefined, undefined", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [undefined, undefined]);
                expect(domain).toEqual([7, 22]);
            });

            it("scalar - null", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, null);
                expect(domain).toEqual([7, 22]);
            });

            // invalid case with min > max, take actual domain
            it("scalar - min > max", () => {
                let domain = axis.createDomain(cartesianSeries, ValueType.fromDescriptor({ numeric: true }), true, [15, 10]);
                expect(domain).toEqual([7, 22]);
            });
        });

        describe("createAxis", () => {
            let dataPercent = [0.0, 0.33, 0.49];

            let formatStringProp: powerbi.DataViewObjectPropertyIdentifier = {
                objectName: "general",
                propertyName: "formatString",
            };

            // TODO: add a getValueFn mock to provide to createAxis so we can test tickValue generation
            it("create ordinal scale - without categoryThickness", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesString();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("Sun");

                // Proves category thickness is not set when not defined
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeUndefined();

                // x label max width is derived from the scale interval
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toBeCloseTo(29.7, 1);
            });

            it("create ordinal scale with defined inner padding", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesWithDefinedInnerPadding();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("Sun");

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();

                // x label max width is derived from the scale interval
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toBeCloseTo(34, 1);
            });

            it("create ordinal scale with defined inner padding and using of RangePoints", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesWithRangePointsUsing();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("Sun");

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();

                // x label max width is derived from the scale interval
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toBeCloseTo(44, 1);
            });

            it("create ordinal scale with linear values", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumber();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("47.50");

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();
            });

            it("create ordinal scale with no categories", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesText(undefined);

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(0);
            });

            it("create ordinal scale with boolean values", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesBool();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();

                // check tick labels values
                expect(axisProperties.values[0]).toBe("True");
                expect(axisProperties.values[1]).toBe("False");
            });

            it("create ordinal scale with category thickness", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesStringWithCategoryThickness(14);

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("Sun");

                // Provides category thickness set when defined
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeDefined();
                expect(categoryThickness).toEqual(14);

                // Provides category thickness used as xLabelMaxWidth when not is scalar
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toEqual(10);
            });

            it("create linear scale", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumbers();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                // Provides category thickness is not set when not defined
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeUndefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[1]).toBe("100.00");

                // Proves label max width is pixelSpan/tickValues when is scalar and category thickness not defined
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toBeGreaterThan(42);
                expect(xLabelMaxWidth).toBeLessThan(45);
            });

            it("create linear scale with NaN domain", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNan();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                // check that we fall back to the empty domain
                let values = <any>axisProperties.values;
                expect(values).toEqual([]);
            });

            it("create value scale - near zero min check", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumeric([-0.000001725, 15]);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[0]).toBe("0.00");
            });

            it("create linear scale with category thickness", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumeric([40, 60], 20, 100, false);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                // Proves category thickness set when defined
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeDefined();
                expect(categoryThickness).toEqual(20);

                // Proves category thickness not considered for label max width when is scalar
                let xLabelMaxWidth = <any>axisProperties.xLabelMaxWidth;
                expect(xLabelMaxWidth).toBeDefined();
                expect(xLabelMaxWidth).toBeGreaterThan(42);
                expect(xLabelMaxWidth).toBeLessThan(45);
            });

            it("create linear scale with category thickness that needs to change", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumeric([2007, 2011], 50, 200, false);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                // category thickness was altered
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeDefined();
                expect(categoryThickness).toBeCloseTo(33.3, 1);
            });

            it("create linear scale with category thickness and zero range (single value)", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesNumeric([9, 9], 50, 200, false);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                // category thickness was altered
                let categoryThickness = <any>axisProperties.categoryThickness;
                expect(categoryThickness).toBeDefined();
                expect(categoryThickness).toBe(50);
            });

            it("create scalar time scale", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesTime([
                    axisPropertiesBuilder.dataTime[0].getTime(),
                    axisPropertiesBuilder.dataTime[2].getTime()]);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[0]).toBe("2015");
            });

            it("create scalar time scale - single day", () => {
                let dateTime = axisPropertiesBuilder.dataTime[0].getTime();

                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesTime([
                    dateTime,
                    dateTime]);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(1);
                expect(values[0]).toBe("Oct 15");
            });

            it("create scalar time scale with max ticks number", () => {

                let dateTime0 = axisPropertiesBuilder.dataTime[0].getTime();
                let dateTime1 = axisPropertiesBuilder.dataTime[1].getTime();

                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesTime([
                    dateTime0,
                    dateTime1],
                /* isScalar */true,
                /* maxTicks */1);

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(1);
            });

            it("create scalar time scale with invalid domains", () => {
                let axisProperties: IAxisProperties[] = [];

                axisProperties[0] = axisPropertiesBuilder.buildAxisPropertiesTime([]);
                axisProperties[1] = axisPropertiesBuilder.buildAxisPropertiesTime(null);
                axisProperties[2] = axisPropertiesBuilder.buildAxisPropertiesTime([undefined, undefined]);

                for (let i = 0, ilen = axisProperties.length; i < ilen; i++) {
                    let props = axisProperties[i];
                    let scale = <any>props.scale;
                    expect(scale).toBeDefined();

                    // Proves scale is linear
                    expect(scale.invert).toBeDefined();

                    // check that we fall back to the empty domain
                    let values = <any>props.values;
                    expect(values).toEqual([]);
                    expect(props.usingDefaultDomain).toBe(true);
                }
            });

            it("create ordinal time scale", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisPropertiesTimeIndex();

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                // Proves scale is ordinal
                expect(scale.invert).toBeUndefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(3);
                expect(values[0]).toBe("2014/10/15");
            });

            it("huge currency values", () => {
                let axisProperties = axisPropertiesBuilder.buildAxisProperties(
                    [0, 600000000000000],
                    axisPropertiesBuilder.metaDataColumnCurrency
                );

                let scale = <any>axisProperties.scale;
                expect(scale).toBeDefined();

                let values = <any>axisProperties.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[0]).toBe("$0T");
                expect(values[1]).toBe("$500T");
            });

            it("create linear percent value scale", () => {
                // Overriding format and leaving only positive format
                let metaDataColumnPercent: powerbi.DataViewMetadataColumn = {
                    displayName: "Column",
                    type: ValueType.fromDescriptor({ numeric: true }),
                    objects: {
                        general: {
                            formatString: "0 %",
                        }
                    }
                };

                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [dataPercent[0], dataPercent[2]],
                    metaDataColumn: metaDataColumnPercent,
                    formatString: valueFormatter.getFormatString(metaDataColumnPercent, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: true,
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();

                // Proves scale is linear
                expect(scale.invert).toBeDefined();

                let values = <any>os.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(2);
                expect(values[1]).toBe("50 %");
            });

            it("create log scale", () => {
                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [axisPropertiesBuilder.dataNumbers[0], axisPropertiesBuilder.dataNumbers[2]],
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: false,
                    scaleType: axisScale.log
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();

                // Proves scale is log
                expect(scale.invert).toBeDefined();

                // Provides category thickness is not set when not defined
                let categoryThickness = <any>os.categoryThickness;
                expect(categoryThickness).toBeUndefined();

                let values = <any>os.values;
                expect(values).toBeDefined();
                // TODO: need to verify updated value here because of changed wrong axis prop from axisScale to scaleType
                expect(values.length).toEqual(3);
                expect(values[1]).toBe("100.00");
            });

            it("create log scale with NaN domain", () => {
                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: axisPropertiesBuilder.domainNaN,
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: true,
                    scaleType: axisScale.log
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();

                // Proves scale is log
                expect(scale.invert).toBeDefined();

                // check that we fall back to the empty domain
                let values = <any>os.values;
                expect(values).toEqual([]);
            });

            it("create log scale with zero domain", () => {
                let domain = [0, 100, 150];
                expect(domain[0]).toBe(0);
                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [domain[0], domain[2]],
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: false,
                    scaleType: axisScale.log
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();

                // Proves scale is log
                expect(scale.invert).toBeDefined();

                // Provides category thickness is not set when not defined
                let categoryThickness = <any>os.categoryThickness;
                expect(categoryThickness).toBeUndefined();

                let values = <any>os.values;
                expect(values).toBeDefined();
                // TODO: need to verify updated values here because of changed wrong axis prop from axisScale to scaleType
                expect(values.length).toEqual(2);
                expect(values[1]).toEqual("100.00");
            });

            it("create log scale - near zero min check", () => {
                let domain = [0.000001725, 5, 15];
                expect(domain[0]).toBeGreaterThan(0);
                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [domain[0], domain[2]],
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: true,
                    scaleType: axisScale.log
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();

                // Proves scale is log
                expect(scale.invert).toBeDefined();

                let values = <any>os.values;
                expect(values).toBeDefined();
                expect(values.length).toEqual(1);
                expect(values[0]).toEqual("10.00");
            });

            it("create scalar axis with linear scale and null domain", () => {
                let os = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: undefined,
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: false,
                    scaleType: axisScale.linear
                });
                let scale = <any>os.scale;
                expect(scale).toBeDefined();
                expect(os.dataDomain).toBeUndefined();
            });

            it("uses a default for [0,0] if given", () => {
                let os00 = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [0, 0],
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: false,
                    scaleType: axisScale.linear
                });

                expect(os00.values).toEqual([]);

                let os12 = axis.createAxis({
                    pixelSpan: 100,
                    dataDomain: [0, 0],
                    zeroScalarDomain: [1, 2],
                    metaDataColumn: axisPropertiesBuilder.metaDataColumnNumeric,
                    formatString: valueFormatter.getFormatString(axisPropertiesBuilder.metaDataColumnNumeric, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: false,
                    scaleType: axisScale.linear
                });

                expect(parseFloat(os12.values[0])).toEqual(1);
                expect(parseFloat(os12.values[os12.values.length - 1])).toEqual(2);
            });
        });

        describe("column type", () => {
            it("createOrdinalType", () => {
                let ordinalType = axis.createOrdinalType();
                expect(axis.isOrdinal(ordinalType)).toBe(true);
                expect(axis.isDateTime(ordinalType)).toBe(false);
            });

            it("isOrdinal not valid for DateTime", () => {
                expect(axis.isOrdinal(ValueType.fromDescriptor({ dateTime: true }))).toBe(false);
            });

            it("isOrdinal valid for bool", () => {
                expect(axis.isOrdinal(ValueType.fromDescriptor({ bool: true }))).toBe(true);
            });

            it("isOrdinal not valid for numeric", () => {
                expect(axis.isOrdinal(ValueType.fromDescriptor({ numeric: true }))).toBe(false);
            });

            it("isOrdinal valid for text", () => {
                expect(axis.isOrdinal(ValueType.fromDescriptor({ text: true }))).toBe(true);
            });

            it("isOrdinal valid for bar code", () => {
                let valueType = ValueType.fromDescriptor({ misc: { barcode: true } });
                expect(axis.isOrdinal(valueType)).toBe(true);
            });

            it("isOrdinal valid for postal code", () => {
                let valueType = ValueType.fromDescriptor({ geography: { postalCode: true } });
                expect(axis.isOrdinal(valueType)).toBe(true);
            });

            it("isDateTime valid for DateTime", () => {
                expect(axis.isDateTime(ValueType.fromDescriptor({ dateTime: true }))).toBe(true);
            });

            it("isDateTime not valid for non-DateTIme", () => {
                expect(axis.isDateTime(ValueType.fromDescriptor({ numeric: true }))).toBe(false);

                expect(axis.isDateTime(ValueType.fromDescriptor({ text: true }))).toBe(false);

                expect(axis.isDateTime(ValueType.fromDescriptor({ bool: true }))).toBe(false);
            });

            it("isDateTime null", () => {
                expect(axis.isDateTime(null)).toBe(false);
            });

            it("isDateTime undefined", () => {
                expect(axis.isDateTime(undefined)).toBe(false);
            });
        });

        describe("get Recommended tick values tests", () => {
            let labels = ["VRooom", "FROM", "1984", "OR", "YEAR", "3000", "?", "?"];

            it("max is half the ticks", () => {
                let expected = ["VRooom", "1984", "YEAR", "?"];
                let actual = axis.getRecommendedTickValuesForAnOrdinalRange(4, labels);
                expect(actual).toEqual(expected);
            });

            it("max is zero ticks", () => {
                let expected = [];
                let actual = axis.getRecommendedTickValuesForAnOrdinalRange(0, labels);
                expect(actual).toEqual(expected);
            });

            it("max is negative ticks", () => {
                let expected = [];
                let actual = axis.getRecommendedTickValuesForAnOrdinalRange(-1, labels);
                expect(actual).toEqual(expected);
            });

            it("max is equal to ticks", () => {
                let expected = labels;
                let actual = axis.getRecommendedTickValuesForAnOrdinalRange(8, labels);
                expect(actual).toEqual(expected);
            });

            it("max is more than ticks", () => {
                let expected = labels;
                let actual = axis.getRecommendedTickValuesForAnOrdinalRange(10, labels);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: ordinal index", () => {
                let expected = [0, 2, 4, 6, 8];
                let scale = axis.createOrdinalScale(400, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.4);
                let actual = axis.getRecommendedTickValues(5, scale, ValueType.fromDescriptor({ text: true }), false);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: ordinal index - zero maxTicks", () => {
                let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let scale = axis.createOrdinalScale(400, vals, 0.4);
                let actual = axis.getRecommendedTickValues(0, scale, ValueType.fromDescriptor({ text: true }), false);
                expect(actual).toEqual([]);
            });

            it("getRecommendedTickValues: ordinal index - maxTicks greater than len", () => {
                let vals = [0, 1, 2, 3, 4];
                let scale = axis.createOrdinalScale(400, vals, 0.4);
                let actual = axis.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ text: true }), false);
                expect(actual).toEqual(vals);
            });

            // linear domains are always [min,max], only two values, and are already D3.nice()
            it("getRecommendedTickValues: scalar numeric - easy", () => {
                let expected = [0, 20, 40, 60, 80, 100];
                let scale = axis.createLinearScale(400, [0, 100]);
                let actual = axis.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: 0 tick count", () => {
                let expected = [];
                let scale = axis.createLinearScale(400, [0, 100]);
                let actual = axis.getRecommendedTickValues(0, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: single value domain returns 0 ticks", () => {
                let expected = [];
                let scale = axis.createLinearScale(400, [1, 1]);
                let actual = axis.getRecommendedTickValues(5, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: positive range", () => {
                let expected = [60, 80, 100];
                let scale = axis.createLinearScale(400, [60, 100]);
                let actual = axis.getRecommendedTickValues(3, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: negative range", () => {
                let expected = [-200, -180, -160, -140, -120, -100];
                let scale = axis.createLinearScale(400, [-200, -100]);
                let actual = axis.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: 0 between min and max", () => {
                let expected = [0, 50, 100];
                let scale = axis.createLinearScale(400, [-20, 100]);
                let actual = axis.getRecommendedTickValues(4, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: very precise decimal values and funny d3 zero tick values", () => {
                // Zero value originally returned from d3 ticks() call is "-1.7763568394002505e-17" (i.e. -1e-33)
                let expected = [-0.15000000000000002, -0.10000000000000002, -0.05000000000000002, 0, 0.04999999999999998, 0.09999999999999998];
                let scale = axis.createLinearScale(400, [-0.150000000000002, .10000000008000006]);
                let actual = axis.getRecommendedTickValues(6, scale, ValueType.fromDescriptor({ numeric: true }), true);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: integer type should not return fractional tick values", () => {
                let expected = [0, 1];
                let scale = axis.createLinearScale(500, [0, 1]);
                let actual = axis.getRecommendedTickValues(8, scale, ValueType.fromDescriptor({ integer: true }), true, 1);
                expect(actual).toEqual(expected);
            });

            it("getRecommendedTickValues: remove ticks that are more precise than the formatString", () => {
                let expected = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
                let scale = axis.createLinearScale(500, [0, 0.5]);
                let actual = axis.getRecommendedTickValues(11, scale, ValueType.fromDescriptor({ numeric: true }), true, 0.1);
                expect(actual).toEqual(expected);
            });

            it("ensureValuesInRange: unsorted tick values", () => {
                let values = [1, 2, 3, 4, 5];
                let actual = axis.ensureValuesInRange(values, 2.2, 5.5);
                expect(actual).toEqual([3, 4, 5]);
            });

            it("ensureValuesInRange: only one value in range", () => {
                let values = [1, 2, 3, 4, 5];
                let actual = axis.ensureValuesInRange(values, 1.5, 2.5);
                expect(actual).toEqual([1.5, 2.5]);
            });

            it("ensureValuesInRange: no value in range", () => {
                let values = [1, 2];
                let actual = axis.ensureValuesInRange(values, 1.25, 1.75);
                expect(actual).toEqual([1.25, 1.75]);
            });
        });

        describe("get best number of ticks tests", () => {
            let dataViewMetadataColumnWithIntegersOnly: DataViewMetadataColumn[] = [
                {
                    displayName: "col1",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ integer: true })
                },
                {
                    displayName: "col2",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ integer: true })
                }
            ];

            let dataViewMetadataColumnWithNonInteger: DataViewMetadataColumn[] = [
                {
                    displayName: "col1",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ integer: true })
                },
                {
                    displayName: "col2",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ numeric: true })
                }
            ];

            it("dataViewMetadataColumn with only integers small range", () => {
                let actual = axis.getBestNumberOfTicks(0, 3, dataViewMetadataColumnWithIntegersOnly, 6);
                expect(actual).toBe(4); // [0,1,2,3]
            });

            it("dataViewMetadataColumn with only integers large range", () => {
                let actual = axis.getBestNumberOfTicks(0, 10, dataViewMetadataColumnWithIntegersOnly, 6);
                expect(actual).toBe(6);
            });

            it("hundred percent dataViewMetadataColumn with only integers", () => {
                let actual = axis.getBestNumberOfTicks(0, 1, dataViewMetadataColumnWithIntegersOnly, 6);
                expect(actual).toBe(6);
            });

            it("dataViewMetadataColumn with non integers", () => {
                let actual = axis.getBestNumberOfTicks(0, 3, dataViewMetadataColumnWithNonInteger, 6);
                expect(actual).toBe(6);
            });

            it("dataViewMetadataColumn with NaN min/max", () => {
                let actual = axis.getBestNumberOfTicks(NaN, 3, dataViewMetadataColumnWithNonInteger, 6);
                expect(actual).toBe(3);
                actual = axis.getBestNumberOfTicks(1, NaN, dataViewMetadataColumnWithNonInteger, 6);
                expect(actual).toBe(3);
                actual = axis.getBestNumberOfTicks(NaN, NaN, dataViewMetadataColumnWithNonInteger, 6);
                expect(actual).toBe(3);
            });

            it("handles fewer than two ticks", () => {
                expect(axis.calculateAxisPrecision(0.25, undefined, 0)).toBe(2);
                expect(axis.calculateAxisPrecision(undefined, 0.25, 0)).toBe(2);
                expect(axis.calculateAxisPrecision(undefined, undefined, 0)).toBe(0);
            });
        });

        describe("createFormatter", () => {
            let measureColumn: DataViewMetadataColumn = {
                displayName: "sales",
                queryName: "selectSales",
                isMeasure: true,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Integer),
                format: "$0",
            };

            let dateColumn: DataViewMetadataColumn = {
                displayName: "date",
                queryName: "selectDate",
                isMeasure: false,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.DateTime),
                format: "MM/dd/yyyy",
            };

            it("createFormatter: value (hundreds)", () => {
                let min = 0,
                    max = 200,
                    value = 100,
                    tickValues = [0, 50, 100, 150, 200];

                expect(axis.createFormatter(
                    [min, max],
                    [min, max],
                    measureColumn.type,
                    true,
                    measureColumn.format,
                    6,
                    tickValues,
                    "getValueFn",
                    true).format(value)).toBe("$100");
            });

            it("createFormatter: value (millions)", () => {
                let min = 0,
                    max = 2e6,
                    tickValues = [0, 0.5e6, 1e6, 1.5e6, 2e6];

                let formatter = axis.createFormatter([min, max], [min, max], measureColumn.type, true, measureColumn.format, 6, tickValues, "getValueFn", true);
                expect(formatter.format(tickValues[0])).toBe("$0.0M");
                expect(formatter.format(tickValues[2])).toBe("$1.0M");
                expect(formatter.format(tickValues[3])).toBe("$1.5M");
            });

            it("createFormatter: value (huge)", () => {
                let min = 0,
                    max = 600000000000000,
                    value = 563732000000000,
                    tickValues = [0, 1e14, 2e14, 2e14, 4e14, 5e14, 6e14];

                // Used to return "5.63732E+14", not the correct currency value
                let expectedValue = "$564T";
                expect(axis.createFormatter([min, max], [min, max], measureColumn.type, true, measureColumn.format, 6, tickValues, "getValueFn", true)
                    .format(value))
                    .toBe(expectedValue);
            });

            it("createFormatter: 100% stacked", () => {
                let min = 0,
                    max = 1,
                    value = 0.5,
                    tickValues = [0, 0.25, 0.5, 0.75, 1];

                expect(axis.createFormatter([min, max], [min, max], measureColumn.type, true, "0%", 6, tickValues, "getValueFn", true)
                    .format(value))
                    .toBe("50%");
            });

            it("createFormatter: dateTime scalar", () => {
                let min = new Date(2014, 6, 14).getTime(),
                    max = new Date(2014, 11, 14).getTime(),
                    value = new Date(2014, 9, 13).getTime();

                expect(axis.createFormatter([min, max], [min, max], dateColumn.type, true, dateColumn.format, 6, [/*not used by datetime*/], "getValueFn", true)
                    .format(new Date(value)))
                    .toBe("Oct 2014");
            });

            it("createFormatter: dateTime ordinal", () => {
                let min = new Date(2014, 6, 14).getTime(),
                    max = new Date(2014, 11, 14).getTime(),
                    value = new Date(2014, 9, 13).getTime();

                expect(axis.createFormatter([min, max], [min, max], dateColumn.type, false, dateColumn.format, 6, [/*not used by datetime*/], "getValueFn", true)
                    .format(new Date(value)))
                    .toBe("10/13/2014");
            });

            it("createFormatter: dateTime scalar - filtered to single value", () => {
                let min = new Date(2014, 6, 14).getTime();

                expect(axis.createFormatter([min, min], [min, min], dateColumn.type, true, dateColumn.format, 6, [/*not used by datetime*/], "getValueFn", true)
                    .format(new Date(min)))
                    .toBe("Jul 14");
            });

            describe("createFormatter: value (detected precision)", () => {
                it("precision(1)", () => {
                    let min = 0,
                        max = 200,
                        value = 1,
                        tickValues = [0, 0.5, 1, 1.5, 2];

                    expect(axis.createFormatter([min, max], [min, max], measureColumn.type, true, measureColumn.format, 6, tickValues, "getValueFn", true)
                        .format(value))
                        .toBe("$1.0");
                });

                it("precision(0)", () => {
                    let min = 0,
                        max = 200,
                        value = 1,
                        tickValues = [0, 1, 2, 3, 4];

                    expect(axis.createFormatter([min, max], [min, max], measureColumn.type, true, measureColumn.format, 6, tickValues, "getValueFn", true)
                        .format(value))
                        .toBe("$1");
                });
            });

            describe("calculateAxisPrecision", () => {
                it("auto display units", () => {
                    // display unit will be 1
                    expect(axis.calculateAxisPrecision(0, 0.25, 0)).toBe(2);
                    expect(axis.calculateAxisPrecision(0, 0.1, 0)).toBe(1);
                    expect(axis.calculateAxisPrecision(0, 1, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 10, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 25, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 100, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 250, 0)).toBe(0);
                    // display unit will be K
                    expect(axis.calculateAxisPrecision(0, 1000, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 2500, 0)).toBe(1);
                    expect(axis.calculateAxisPrecision(0, 10000, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 25000, 0)).toBe(0);
                    // display unit will be M
                    expect(axis.calculateAxisPrecision(0, 100000, 0)).toBe(1);
                    expect(axis.calculateAxisPrecision(0, 250000, 0)).toBe(2);
                    expect(axis.calculateAxisPrecision(0, 1000000, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 2500000, 0)).toBe(1);
                    expect(axis.calculateAxisPrecision(0, 10000000, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 25000000, 0)).toBe(0);
                    // display unit will B
                    expect(axis.calculateAxisPrecision(0, 100000000, 0)).toBe(1);
                });

                // expectation when display units are thousands
                let expectedForThousands = [
                    [10000, 0],
                    [5000, 0],
                    [2500, 1],
                    [1000, 0],
                    [500, 1],
                    [250, 2],
                    [100, 1],
                    [50, 2],
                    [25, 3],
                    [10, 2],
                    [5, 3],
                    [2.5, 4],
                    [1, 3],
                ];

                it("explicit display units", () => {
                    // Defect 7801378:Frown: Line Chart doesn’t display Y-Axis values properly when configured for Display of Billions
                    expect(axis.calculateAxisPrecision(100000000, 200000000, 1000000000, "0")).toBe(1);

                    for (let pair of expectedForThousands) {
                        expect(axis.calculateAxisPrecision(0, pair[0], 1000)).toBe(pair[1]);
                    }
                });

                it("percent", () => {
                    for (let pair of expectedForThousands) {
                        expect(axis.calculateAxisPrecision(0, pair[0] / 100, 1000, "0%")).toBe(pair[1]);
                    }
                });

                it("per mille", () => {
                    for (let pair of expectedForThousands) {
                        expect(axis.calculateAxisPrecision(0, pair[0] / 1000, 1000, "0\u2030")).toBe(pair[1]);
                    }
                });

                it("avoids extraneous precision", () => {
                    expect(axis.calculateAxisPrecision(0, 0.05, 0)).toBe(2);
                    expect(axis.calculateAxisPrecision(0, 0.05000000000000001, 0)).toBe(2);

                    expect(axis.calculateAxisPrecision(0, 0.05, 1)).toBe(2);
                    expect(axis.calculateAxisPrecision(0, 0.05000000000000001, 1)).toBe(2);

                    expect(axis.calculateAxisPrecision(0, 0.05, 1, "0%")).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 0.05000000000000001, 1, "0%")).toBe(0);

                    // 0.05 / 1000 = 0.00005
                    expect(axis.calculateAxisPrecision(0, 0.05, 1000)).toBe(5);
                    expect(axis.calculateAxisPrecision(0, 0.05000000000000001, 1000)).toBe(5);

                    expect(axis.calculateAxisPrecision(0, 500, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 500.0000000000001, 0)).toBe(0);

                    expect(axis.calculateAxisPrecision(0, 500, 1)).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 500.0000000000001, 1)).toBe(0);

                    expect(axis.calculateAxisPrecision(0, 500, 1, "0%")).toBe(0);
                    expect(axis.calculateAxisPrecision(0, 500.0000000000001, 1, "0%")).toBe(0);

                    // 500 / 1000 = 0.5
                    expect(axis.calculateAxisPrecision(0, 500, 1000)).toBe(1);
                    expect(axis.calculateAxisPrecision(0, 500.0000000000001, 1000)).toBe(1);
                });

                it("chooses based on tick values and difference", () => {
                    expect(axis.calculateAxisPrecision(3, 4, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(3.2, 4.2, 0)).toBe(1);
                });

                it("handles negative values too", () => {
                    expect(axis.calculateAxisPrecision(-1, 1, 0)).toBe(0);
                    expect(axis.calculateAxisPrecision(-1, -0.9, 0)).toBe(1);
                    expect(axis.calculateAxisPrecision(-0.5, 0.5, 0)).toBe(1);
                });
            });

            describe("createFormatter: value (specified precision)", () => {
                it("precision(2)", () => {
                    let min = 0,
                        max = 200,
                        value = 1,
                        tickValues = [0, 0.5, 1, 1.5, 2];

                    let specifiedPrecision = 2;
                    expect(axis.createFormatter([min, max], [min, max], measureColumn.type, true, measureColumn.format, 6, tickValues, "getValueFn", true, undefined, specifiedPrecision)
                        .format(value))
                        .toBe("$1.00");
                });
            });
        });

        describe("diffScaled", () => {
            let scale: d3.scale.Linear<number, number>;

            beforeEach(() => {
                let range = [0, 999];
                let domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 999];
                scale = d3.scale.linear()
                    .range(range)
                    .domain(domain);
            });

            it("diffScaled: zero", () => {
                expect(axis.diffScaled(scale, 0, 0)).toBe(0);
            });

            it("diffScaled: small nonzero +ve", () => {
                expect(axis.diffScaled(scale, 0.00000001, 0)).toBe(1);
            });

            it("diffScaled: small nonzero -ve", () => {
                expect(axis.diffScaled(scale, -0.00000001, 0)).toBe(-1);
            });
        });

        describe("getRecommendedNumberOfTicks tests", () => {
            it("getRecommendedNumberOfTicksForXAxis small tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForXAxis(220);
                expect(tickCount).toBe(3);
            });

            it("getRecommendedNumberOfTicksForXAxis median tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForXAxis(480);
                expect(tickCount).toBe(5);
            });

            it("getRecommendedNumberOfTicksForXAxis large tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForXAxis(730);
                expect(tickCount).toBe(8);
            });

            it("getRecommendedNumberOfTicksForYAxis small tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForYAxis(80);
                expect(tickCount).toBe(3);
            });

            it("getRecommendedNumberOfTicksForYAxis median tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForYAxis(230);
                expect(tickCount).toBe(5);
            });

            it("getRecommendedNumberOfTicksForYAxis large tile", () => {
                let tickCount = axis.getRecommendedNumberOfTicksForYAxis(350);
                expect(tickCount).toBe(8);
            });
        });

        describe("margins", () => {
            let axisHelperTickLabelBuilder: AxisTickLabelBuilder = new AxisTickLabelBuilder();

            beforeEach(() => {
                textMeasurementService.removeSpanElement();
            });

            it("Dual y-axes", () => {
                let margins = axisHelperTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, true);

                expect(margins.xMax).toBe(10);
                expect(isInRange(margins.yLeft, 15, 16)).toBe(true);
                expect(isInRange(margins.yRight, 30, 32)).toBe(true);
            });

            it("Hide all axes", () => {
                let margins = axisHelperTickLabelBuilder.buildTickLabelMargins(false, false);

                expect(margins.xMax).toBe(0);
                expect(margins.yLeft).toBe(0);
                expect(margins.yRight).toBe(0);
            });

            it("Disable the secondary axis", () => {
                let margins = axisHelperTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, false);

                expect(margins.xMax).toBe(10);
                expect(isInRange(margins.yLeft, 15, 16)).toBe(true);
                expect(isInRange(margins.yRight, 11, 14)).toBe(true);
            });

            it("Switch the y-axes", () => {
                let margins = axisHelperTickLabelBuilder.buildTickLabelMargins(false, false, true, true, true, true);

                expect(margins.xMax).toBe(10);
                expect(margins.yLeft).toBe(32);
                expect(margins.yRight).toBe(16);
            });

            it("Switch the y-axes, and disable the secondary axis", () => {
                let margins = axisHelperTickLabelBuilder.buildTickLabelMargins(true, false, true, true, true, false);

                expect(margins.xMax).toBe(25);

                // 16 for phantomjs(2.1.1) and 17 for phantomjs(2.0.0)
                expect(isInRange(margins.yLeft, 16, 17)).toBe(true);

                // 11 for Mac OS and 12 for Windows
                expect(isInRange(margins.yRight, 15, 16)).toBe(true);
            });

            it("xOverflowLeft", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["CrazyOutdoorDuneBuggiesWithFluxCapacitors", "Cars", "Trucks", "Boats", "RVs"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, false);

                expect(margins.xMax).toBe(10);
                expect(margins.yLeft).toBe(35);
                expect(margins.yRight).toBe(0);
            });

            it("xOverflowLeft, with rotate", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["CrazyOutdoorDuneBuggiesWithFluxCapacitors", "Cars", "Trucks", "Boats", "RVs"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(true, false, false, true, true, false);

                expect(margins.xMax).toBe(25);
                expect(margins.yLeft).toBe(35);
                expect(margins.yRight).toBe(0);
            });

            it("xOverflowLeft, with rotate, disable both Y axes", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["CrazyOutdoorDuneBuggiesWithFluxCapacitors", "Cars", "Trucks", "Boats", "RVs"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(true, false, false, true, false, false);

                expect(margins.xMax).toBe(25);
                expect(margins.yLeft).toBe(35);
                expect(margins.yRight).toBe(0);
            });

            it("xOverflowRight, disable the secondary axis", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["Cars", "Trucks", "Boats", "RVs", "CrazyOutdoorDuneBuggies"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, false);

                expect(margins.xMax).toBe(10);
                expect(margins.yLeft).toBe(16);
                expect(isInRange(margins.yRight, 33, 37)).toBe(true);
            });

            it("xOverflowRight, line chart, small overhang, disable the secondary axis", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["Cars", "Trucks", "Boats"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, false, null, 10, true);

                expect(margins.xMax).toBe(10);
                expect(margins.yLeft).toBe(16);
                expect(isInRange(margins.yRight, 17, 19)).toBe(true);
            });

            it("xOverflowRight, disable both Y axes", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["Cars", "Trucks", "Boats", "RVs", "CrazyOutdoorDuneBuggies"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, false, false, true, false, false);

                expect(margins.xMax).toBe(10);
                expect(margins.yLeft).toBe(0);
                expect(isInRange(margins.yRight, 33, 37)).toBe(true);
            });

            it("xOverflowRight, with rotate, disable both Y axes", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder(undefined, ["Cars", "Trucks", "Boats", "RVs", "CrazyOutdoorDuneBuggies"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(true, false, false, true, false, false);

                expect(margins.xMax).toBe(25);
                expect(isInRange(margins.yLeft, 2, 3)).toBe(true);
                expect(margins.yRight).toBe(0);
            });

            it("Check bottom margin for word breaking is based on number of text lines shown", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder({ height: 300, width: 150 }, ["Stardust-IPA", "83742123123123 (Jun-14-2011) Robotics", "Q4-was-the-best-ever"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, true, false, true, true, false);
                expect(margins.xMax).toBeGreaterThan(3 * localTickLabelBuilder.getFontSize() - 1);
            });

            it("Scalar axis, overflow right", () => {
                let localTickLabelBuilder = new AxisTickLabelBuilder({ height: 200, width: 200 }, ["Jan 2015", "Feb 2015", "Mar 2015", "April 2015"]);
                let margins = localTickLabelBuilder.buildTickLabelMargins(false, false, false, true, true, false, undefined, undefined, true);
                expect(margins.yRight).toBeGreaterThan(0);
            });
        });

        describe("apply new domain", () => {
            it("Check that customized domain is set on existing domain", () => {
                let customizedDomain = [undefined, 20];
                let existingDomain = [0, 10];
                let newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(0);
                expect(newDomain[1]).toBe(20);

                customizedDomain = [undefined, undefined];
                existingDomain = [0, 10];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(0);
                expect(newDomain[1]).toBe(10);

                customizedDomain = [5, undefined];
                existingDomain = [0, 10];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(5);
                expect(newDomain[1]).toBe(10);

                customizedDomain = [5, 20];
                existingDomain = [0, 10];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(5);
                expect(newDomain[1]).toBe(20);

            });

            it("Check that customized domain is set on null domain", () => {
                let customizedDomain = [undefined, undefined];
                let existingDomain = undefined;
                let newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain).toBeUndefined();

                customizedDomain = [10, 20];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(10);
                expect(newDomain[1]).toBe(20);

                customizedDomain = [undefined, 20];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(undefined);
                expect(newDomain[1]).toBe(20);

                customizedDomain = [10, undefined];
                newDomain = axis.applyCustomizedDomain(customizedDomain, existingDomain);
                expect(newDomain[0]).toBe(10);
                expect(newDomain[1]).toBe(undefined);
            });
        });

        describe("getCategoryThickness", () => {
            it("with a linear scale returns the correct value", () => {
                // Arrange
                let range = [0, 100];
                let domain = [0, 10];
                let scale = d3.scale.linear().domain(domain).range(range);
                let expectedThickness = range[1] - range[0];

                // Act
                let actualThickness = axis.getCategoryThickness(scale);

                // Assert
                expect(actualThickness).toBe(expectedThickness);
            });

            it("with a time scale returns the correct value", () => {
                // Arrange
                let range = [0, 100];
                let domain = [new Date("2014-03-08T12:00:00.000Z"), new Date("2014-03-10T00:00:00.000Z")];
                let scale = d3.time.scale().domain(domain).range(range);
                let expectedThickness = range[1] - range[0];

                // Act
                let actualThickness = axis.getCategoryThickness(scale);

                // Assert
                expect(actualThickness).toBe(expectedThickness);
            });

            it("with an ordinal scale with multiple items returns the correct value", () => {
                // Arrange
                let domain: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                let rangeBand: [number, number] = [0, 100];
                let outerPaddingRatio = 0.5; // Add padding so we know it's taken into account
                let innerPaddingRatio = 0.25;

                let scale = d3.scale
                    .ordinal()
                    .domain(domain)
                    .rangeBands(rangeBand, innerPaddingRatio, outerPaddingRatio);

                // The step size is the expected thickness
                // rangeInterval = step * outerPadding + step * numItems + step * outerPadding
                // rangeInterval = step (2 * outerPadding + numItems)
                // step = rangeInterval / (2 * outerPadding + numItems)
                let rangeInterval = rangeBand[1] - rangeBand[0];

                let expectedThickness = rangeInterval / (2 * outerPaddingRatio + domain.length);

                // Act
                let actualThickness = axis.getCategoryThickness(scale);

                // Assert
                expect(actualThickness).toBeCloseTo(expectedThickness, 0);
            });

            it("with an ordinal scale with a single item returns the correct value", () => {
                // Arrange
                let domain: string[] = ["0"];
                let rangeBand: [number, number] = [0, 100];
                let outerPaddingRatio = 0.5; // Add padding so we know it's taken into account
                let innerPaddingRatio = 0.25;

                let scale = d3.scale
                    .ordinal()
                    .domain(domain)
                    .rangeBands(rangeBand, innerPaddingRatio, outerPaddingRatio);

                let expectedThickness = rangeBand[1] - rangeBand[0]; // A single item should span the entire axis

                // Act
                let actualThickness = axis.getCategoryThickness(scale);

                // Assert
                expect(actualThickness).toBeCloseTo(expectedThickness, 0);
            });
        });

        describe("scale tests", () => {
            describe("isOrdinalScale", () => {
                it("with an ordinal scale returns true", () => {
                    let scale = d3.scale.ordinal();
                    expect(axis.isOrdinalScale(scale)).toBeTruthy();
                });

                it("with a linear (quantitive) scale returns false", () => {
                    let scale = d3.scale.linear();
                    expect(axis.isOrdinalScale(scale)).toBeFalsy();
                });

                it("with a time scale returns false", () => {
                    let scale = d3.time.scale();
                    expect(axis.isOrdinalScale(scale)).toBeFalsy();
                });
            });
        });
    });
}
