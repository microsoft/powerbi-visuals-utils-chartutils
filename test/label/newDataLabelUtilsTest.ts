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

namespace powerbi.extensibility.utils.chart.label.utils.test {
    import AxisHelper = powerbi.extensibility.utils.chart.axis;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import LabelDataPointParentType = powerbi.extensibility.utils.chart.label.LabelDataPointParentType;
    import LabelLayout = powerbi.extensibility.utils.chart.label.LabelLayout;
    import LabelOrientation = powerbi.extensibility.utils.chart.label.LabelOrientation;
    import LabelParentRect = powerbi.extensibility.utils.chart.label.LabelParentRect;
    import LabelParentPoint = powerbi.extensibility.utils.chart.label.LabelDataPoint;
    import DataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;
    import NewDataLabelUtils = powerbi.extensibility.utils.chart.label.NewDataLabelUtils;
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import VisualDataLabelsSettings = powerbi.extensibility.utils.chart.dataLabel.VisualDataLabelsSettings;

    import dataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;
    import LabelDataPoint = powerbi.extensibility.utils.chart.label.LabelDataPoint;
    import LabelUtils = powerbi.extensibility.utils.chart.label.LabelUtils;
    import chartLabel = powerbi.extensibility.utils.chart.label;

    let testOutsideFillColor = "#000000";
    let testInsideFillColor = "#FFFFFF";
    const DefaultWaitForRender: number = 500;

    describe("LabelUtilsTests", () => {
        it("getLabelFormattedText does not truncate text", () => {
            let absurdlyLongLabel = "10.0000000000000000000000000000000000000000000000000";
            let needBalue = "10.00...";
            expect(dataLabelUtils.getLabelFormattedText({ label: absurdlyLongLabel })).toEqual(needBalue);
        });

        describe("Formatting", () => {
            let labelSettings: VisualDataLabelsSettings;

            beforeEach(() => {
                labelSettings = dataLabelUtils.getDefaultLabelSettings();
            });

            describe("display units", () => {
                it("Auto", () => {
                    let value: number = 2000000;
                    labelSettings.displayUnits = 0;
                    labelSettings.precision = 0;
                    let value2 = 1000000;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings, value2);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("2M");
                });

                it("None", () => {
                    let value: number = 20000;
                    labelSettings.displayUnits = 10;
                    labelSettings.precision = 0;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("20000");
                });

                it("K", () => {
                    let value: number = 20000;
                    labelSettings.displayUnits = 10000;
                    labelSettings.precision = 0;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("20K");
                });

                it("M", () => {
                    let value: number = 200000;
                    labelSettings.displayUnits = 1000000;
                    labelSettings.precision = 1;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("0.2M");
                });

                it("B", () => {
                    let value: number = 200000000000;
                    labelSettings.displayUnits = 1000000000;
                    labelSettings.precision = 0;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("200bn");
                });

                it("T", () => {
                    let value: number = 200000000000;
                    labelSettings.displayUnits = 1000000000000;
                    labelSettings.precision = 1;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("0.2T");
                });

                it("change labelSetting", () => {
                    let value: number = 200000000000; // 200 000 000 000
                    labelSettings.displayUnits = 1000000000000; // 1 000 000 000 000
                    labelSettings.precision = 1;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate(null, labelSettings);
                    formatter.format(value);
                    labelSettings.displayUnits = 1000000000;
                    labelSettings.precision = 0;
                    let formatter2 = formattersCache.getOrCreate(null, labelSettings);
                    let formattedValue = formatter2.format(value);
                    expect(formattedValue).toBe("200bn");
                });
            });

            describe("precision", () => {
                it("#0", () => {
                    let value: number = 2000;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate("#0", labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("2000");
                });

                it("#0.00", () => {
                    let value: number = 2000;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate("#0.00", labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("2000.00");
                });

                it("0.#### $;-0.#### $;0 $", () => {
                    let value: number = -2000.123456;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate("#.#### $;-#.#### $;0 $", labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("-2000.1235 $");
                });

                it("forced in label settings", () => {
                    let value: number = 2000.123456;
                    labelSettings.precision = 2;
                    let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                    let formatter = formattersCache.getOrCreate("0.0000", labelSettings);
                    let formattedValue = formatter.format(value);
                    expect(formattedValue).toBe("2000.12");
                });

                // Currency general format is implemented as 15 optional decimal places. Labels were interpreting these
                // as forced precision. Fix is that precision is left undefined so that other formatting logic determines
                // the decimal places needed. In summary that logic is
                //      - when the number is unscaled because no units are applied, the optional precision in the
                //        ... format string is displayed and
                //      - when it is scaled by units, MaxScaledDecimalPlaces=2 decimal places are shown.
                describe("Optional precision isn't forced", () => {
                    it("Unscaled 1", () => {
                        let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                        let formatter = formattersCache.getOrCreate(null, labelSettings);

                        expect(formatter.format(500)).toBe("500");
                        expect(formatter.format(500.12345)).toBe("500.12345");
                    });

                    it("Unscaled 2", () => {
                        labelSettings.displayUnits = 100000;
                        let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                        let formatter = formattersCache.getOrCreate(null, labelSettings);
                        expect(formatter.format(500000)).toBe("500K");
                        expect(formatter.format(500123.45)).toBe("500.12K");
                    });
                });
            });

            it("multiple formats", () => {
                let formatCol1 = "#,0.0";
                let formatCol2 = "$#,0.0";
                let value: number = 1545;
                labelSettings.displayUnits = null;
                labelSettings.precision = 1;

                let formattersCache = dataLabelUtils.createColumnFormatterCacheManager();
                let formatter1 = formattersCache.getOrCreate(formatCol1, labelSettings);
                let formattedValue = formatter1.format(value);

                expect(formattedValue).toBe("1,545.0");

                let formatter2 = formattersCache.getOrCreate(formatCol2, labelSettings);
                formattedValue = formatter2.format(value);

                expect(formattedValue).toBe("$1,545.0");
            });
        });
    });

    describe("Label DOM validation", () => {
        let element: JQuery;
        let viewport: powerbi.IViewport;
        let labelRegion: d3.Selection<any>;
        let backgroundRegion: d3.Selection<any>;
        let labelLayout: LabelLayout;

        beforeEach(() => {
            powerbi.extensibility.utils.test.mocks.createLocale();
            element = powerbi.extensibility.utils.test.helpers.testDom("500", "500");
            viewport = {
                height: element.height(),
                width: element.width()
            };
            labelRegion = d3.select("body")
                .append("svg")
                .style("position", "absolute")
                .append("g")
                .classed(LabelUtils.labelGraphicsContextClass.className, true);
            backgroundRegion = d3.select("svg")
                .append("g")
                .classed(LabelUtils.labelBackgroundGraphicsContextClass.className, true);

            labelLayout = new LabelLayout({
                startingOffset: 5,
                maximumOffset: 20,
                horizontalPadding: 2,
                verticalPadding: 2
            });

        });

        afterEach(() => {
            $(".label").remove();
            $("rect").remove();
        });

        it("Label horizontal", (done) => {
            let labelDataPoints = [
                createLabelDataPoint({
                    text: "text",
                    isParentRect: true,
                    parentRect: {
                        orientation: 1, // NewRectOrientation.VerticalBottomBased
                        rect: createRect(100, 100, 50, 100),
                        validPositions: [16], // RectLabelPosition.OutsideEnd
                    }
                }),
            ];

            let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
            LabelUtils.drawDefaultLabels(labelRegion, labels, false);
            setTimeout(() => {
                expect($(".label").length).toBe(1);
                let transform = $(".label").attr("transform");
                let rotateAngle = getAngle(transform);
                expect(rotateAngle).toBe(0);
                done();
            }, DefaultWaitForRender);
        });

        it("Label vertical", (done) => {

            let labelDataPoints = [
                createLabelDataPoint({
                    text: "text",
                    isParentRect: true,
                    parentRect: {
                        orientation: 1,
                        rect: createRect(100, 100, 50, 100),
                        validPositions: [16], // RectLabelPosition.OutsideEnd
                    }
                }),
            ];

            let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length, labelOrientation: LabelOrientation.Vertical }], viewport);
            LabelUtils.drawDefaultLabels(labelRegion, labels, false);
            setTimeout(() => {
                expect($(".label").length).toBe(1);
                let transform = $(".label").attr("transform");
                let rotateAngle = getAngle(transform);
                expect(rotateAngle).toBe(-90);
                done();
            }, DefaultWaitForRender);
        });
    });

    function getAngle(transform: string): number {
        let rotateBegin: number = transform.indexOf("rotate");
        if (rotateBegin >= 0) {
            let rotateString = transform.substring(rotateBegin);
            if (rotateString) {
                if (rotateString) {
                    // 7 refers to the length of "rotate("
                    let angle: number = +rotateString.substring(7, rotateString.length - 1);
                    return angle;
                }
            }
        }
        return 0;
    }

    interface CreateLabelDataPointOptions {
        text: string;
        isParentRect?: boolean;
        parentRect?: LabelParentRect;
        parentPoint?: LabelParentPoint;
        enableBackground?: boolean;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }

    function createLabelDataPoint(options: CreateLabelDataPointOptions): LabelDataPoint {
        return <LabelDataPoint>{
            text: options.text,
            textSize: {
                width: options.text.length * 10,
                height: 10
            },
            isPreferred: true,
            insideFill: testInsideFillColor,
            outsideFill: testOutsideFillColor,
            parentType: !!options.isParentRect ? 1 : 0, // LabelDataPointParentType.Rectangle = 1, Point = 0
            parentShape: options.isParentRect ? options.parentRect : options.parentPoint,
            identity: null,
            fontProperties: LabelUtils.defaultFontProperties,
            hasBackground: options.enableBackground,
            backgroundColor: options.backgroundColor,
            backgroundTransparency: options.backgroundTransparency,
        };
    }

    function createRect(left: number, top: number, width: number, height: number): IRect {
        return {
            left: left,
            top: top,
            width: width,
            height: height,
        };
    }
}