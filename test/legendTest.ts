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

/// <reference path="_references.ts" />

module powerbi.extensibility.utils.chart.legend.test {
    // powerbi.extensibility.visual
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;

    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;

    // powerbi.extensibility.utils.color
    import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;

    // powerbi.extensibility.utils.svg
    import Rect = powerbi.extensibility.utils.svg.Rect;
    import flushAllD3Transitions = powerbi.extensibility.utils.svg.flushAllD3Transitions;

    // powerbi.extensibility.utils.interactivity
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import createInteractivityService = powerbi.extensibility.utils.interactivity.createInteractivityService;

    // powerbi.extensibility.utils.formatting
    import stringExtensions = powerbi.extensibility.utils.formatting.stringExtensions;

    // powerbi.extensibility.utils.test
    import DefaultWaitForRender = powerbi.extensibility.utils.test.DefaultWaitForRender;
    import testDom = powerbi.extensibility.utils.test.helpers.testDom;
    import createVisualHost = powerbi.extensibility.utils.test.mocks.createVisualHost;
    import createSelectionId = powerbi.extensibility.utils.test.mocks.createSelectionId;
    import createColorPalette = powerbi.extensibility.utils.test.mocks.createColorPalette;
    import ClickEventType = powerbi.extensibility.utils.test.helpers.ClickEventType;

    // powerbi.extensibility.utils.chart
    import LegendData = powerbi.extensibility.utils.chart.legend.data;
    import createLegend = powerbi.extensibility.utils.chart.legend.createLegend;
    import LegendIcon = powerbi.extensibility.utils.chart.legend.LegendIcon;
    import legendProps = powerbi.extensibility.utils.chart.legend.legendProps;
    import legendPosition = powerbi.extensibility.utils.chart.legend.position;
    import LegendPosition = powerbi.extensibility.utils.chart.legend.LegendPosition;
    import assertColorsMatch = powerbi.extensibility.utils.chart.test.helpers.assertColorsMatch;
    import isInRange = powerbi.extensibility.utils.chart.test.helpers.isInRange;
    import findElementTitle = powerbi.extensibility.utils.chart.test.helpers.findElementTitle;
    import MockBehavior = powerbi.extensibility.utils.chart.test.mocks.MockBehavior;

    describe("legend", () => {
        describe("DOM validation", () => {
            let element: JQuery,
                viewport: powerbi.IViewport,
                legend: ILegend,
                interactivityService: IInteractivityService,
                hostServices: IVisualHost,
                legendData: LegendDataPoint[],
                legendTitleClassSelector = ".legendTitle";

            beforeEach(() => {
                element = testDom("500", "500");
                hostServices = createVisualHost();

                interactivityService = createInteractivityService(hostServices);
                legend = createLegend(element.get(0), false, interactivityService, true);

                viewport = {
                    height: element.height(),
                    width: element.width()
                };

                legendData = [
                    {
                        label: "California",
                        color: "#ff0000",
                        icon: LegendIcon.Line,
                        identity: createSelectionIdentity(0),
                        selected: false
                    },
                    {
                        label: "Texas",
                        color: "#0000ff",
                        icon: LegendIcon.Line,
                        identity: createSelectionIdentity(1),
                        selected: false
                    },
                    {
                        label: "Washington",
                        color: "#00ff00",
                        icon: LegendIcon.Line,
                        identity: createSelectionIdentity(2),
                        selected: false
                    }
                ];
            });

            it("legend dom validation one legend item count validation", (done) => {
                legend.drawLegend({
                    dataPoints: [
                        legendData[0],
                    ]
                }, viewport);

                setTimeout(() => {
                    expect($(".legendItem").length).toBe(1);
                    expect($(".legendText").length).toBe(1);
                    expect($(".legendIcon").length).toBe(1);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items count validation", (done) => {
                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendItem").length).toBe(3);
                    expect($(".legendText").length).toBe(3);
                    expect($(".legendIcon").length).toBe(3);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items first item text", (done) => {
                legend.reset();
                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendText").first().text()).toBe("California");
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items last item text", (done) => {
                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendText").last().text()).toBe("Washington");
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items colors count", (done) => {
                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendIcon").length).toBe(3);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items with shared label and color", (done) => {
                let legendData: LegendDataPoint[] = [
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(0), selected: false },
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(1), selected: false },
                    { label: "BREAKPOINT", color: "#00ff00", icon: LegendIcon.Line, identity: createSelectionIdentity(2), selected: false }
                ];

                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendItem").length).toBe(3);
                    expect($(".legendText").length).toBe(3);
                    expect($(".legendIcon").length).toBe(3);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items but two share same identity", (done) => {
                let legendData: LegendDataPoint[] = [
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(0), selected: false },
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(0), selected: false },
                    { label: "BREAKPOINT", color: "#00ff00", icon: LegendIcon.Line, identity: createSelectionIdentity(1), selected: false }
                ];

                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendItem").length).toBe(2);
                    expect($(".legendText").length).toBe(2);
                    expect($(".legendIcon").length).toBe(2);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation three legend items but two share same identity but are on different layers", (done) => {
                let legendData: LegendDataPoint[] = [
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(1), selected: false, layerNumber: 0 },
                    { label: "ACCESS_VIOLA...", color: "#ff0000", icon: LegendIcon.Line, identity: createSelectionIdentity(2), selected: false, layerNumber: 1 },
                    { label: "BREAKPOINT", color: "#00ff00", icon: LegendIcon.Line, identity: createSelectionIdentity(4), selected: false, layerNumber: 0 }
                ];

                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    expect($(".legendItem").length).toBe(3);
                    expect($(".legendText").length).toBe(3);
                    expect($(".legendIcon").length).toBe(3);
                    done();
                }, DefaultWaitForRender);
            });

            it("legend dom validation incremental build", (done) => {
                // Draw the legend once with the 3 states
                legend.drawLegend({ dataPoints: legendData }, viewport);

                setTimeout(() => {
                    validateLegendDOM(legendData);

                    // Draw the legend against with a new state at the start
                    let updatedData: LegendDataPoint[] = [
                        { label: "Alaska", color: "#fff000", icon: LegendIcon.Box, identity: createSelectionIdentity(2), selected: false },
                        { label: "California", color: "#fff00d", icon: LegendIcon.Box, identity: createSelectionIdentity(4), selected: false },
                        { label: "Texas", color: "#fffe00", icon: LegendIcon.Box, identity: createSelectionIdentity(8), selected: false },
                        { label: "Washington", color: "#0000dd", icon: LegendIcon.Box, identity: createSelectionIdentity(16), selected: false }
                    ];
                    legend.reset();
                    legend.drawLegend({ dataPoints: updatedData }, viewport);
                    setTimeout(() => {
                        validateLegendDOM(updatedData);
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            });

            describe("Legend interactivity tests", () => {
                let icons: JQuery;

                beforeEach(() => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);
                    icons = $(".legendIcon");
                });

                it("Default state", () => {
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#0000ff");
                    assertColorsMatch(icons[2].style.fill, "#00ff00");
                });

                it("Click first legend", () => {
                    icons.first().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#a6a6a6");
                });

                it("Click the last legend item, should just select current and clear others", () => {
                    icons.first().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#a6a6a6");

                    icons.last().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#00ff00");
                });

                it("Control + Click legend item, should multiselect", () => {
                    icons.last().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#00ff00");

                    icons.first().d3Click(0, 0, ClickEventType.CtrlKey);
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#00ff00");
                });

                it("Click the clear catcher should clear the legend selection", () => {
                    icons.first().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                    assertColorsMatch(icons[2].style.fill, "#a6a6a6");

                    $(".clearCatcher").first().d3Click(0, 0);
                    assertColorsMatch(icons[0].style.fill, "#ff0000");
                    assertColorsMatch(icons[1].style.fill, "#0000ff");
                    assertColorsMatch(icons[2].style.fill, "#00ff00");
                });

                describe("with pre-existing selection state", () => {
                    beforeEach(() => {
                        let mockDatapoints = [
                            { label: "California", color: "#ff0000", identity: legendData[0].identity, selected: false },
                            { label: "Texas", color: "#0000ff", identity: legendData[1].identity, selected: false },
                            { label: "Washington", color: "#00ff00", identity: legendData[2].identity, selected: false }
                        ];

                        let mockBehavior = new MockBehavior(mockDatapoints);
                        interactivityService.bind(mockDatapoints, mockBehavior, null);
                        mockBehavior.selectIndex(1);

                        legend.drawLegend({ dataPoints: legendData }, viewport);
                    });

                    it("has correct selection fill", () => {
                        assertColorsMatch(icons[0].style.fill, "#a6a6a6");
                        assertColorsMatch(icons[1].style.fill, "#0000ff");
                        assertColorsMatch(icons[2].style.fill, "#a6a6a6");
                    });

                    it("click selects corresponding item", () => {
                        icons.first().d3Click(0, 0);

                        assertColorsMatch(icons[0].style.fill, "#ff0000");
                        assertColorsMatch(icons[1].style.fill, "#a6a6a6");
                        assertColorsMatch(icons[2].style.fill, "#a6a6a6");
                    });

                    it("ctrl+click adds item to current selection", () => {
                        icons.first().d3Click(0, 0, ClickEventType.CtrlKey);

                        assertColorsMatch(icons[0].style.fill, "#ff0000");
                        assertColorsMatch(icons[1].style.fill, "#0000ff");
                        assertColorsMatch(icons[2].style.fill, "#a6a6a6");
                    });
                });
            });

            it("legend defaults", () => {
                let legendArray = getLotsOfLegendData(),
                    legendData: LegendData = { dataPoints: legendArray, title: "" },
                    props: powerbi.DataViewObject = {};

                LegendData.update(legendData, props);

                expect(props[legendProps.show]).toBe(true);
                expect(props[legendProps.position]).toEqual(legendPosition.top);
            });

            it("legend with title", () => {
                let legendData = getLotsOfLegendData();
                legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

                flushAllD3Transitions();

                expect($(legendTitleClassSelector).length).toBe(1);
            });

            it("legend title tooltip", () => {
                let legendData = getLotsOfLegendData();
                legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

                flushAllD3Transitions();

                expect(findElementTitle($(legendTitleClassSelector))).toBe("states");
            });

            it("legend truncated title tooltip", () => {
                let legendData = getLotsOfLegendData();
                legend.drawLegend({ dataPoints: legendData, title: "Very Long Legend Header Data" }, viewport);

                flushAllD3Transitions();

                expect(findElementTitle($(legendTitleClassSelector))).toBe("Very Long Legend Header Data");
            });

            it("legend items tooltip", () => {
                let legendData = getLotsOfLegendData();
                legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

                flushAllD3Transitions();

                let lenOfLegendOnDom = $(".legendItem title").length;
                for (let i = 0; i < lenOfLegendOnDom; i++) {
                    expect($(".legendItem title").eq(i).text()).toBe(legendData[i].label);
                }
            });

            it("legend truncated items tooltip", () => {
                let legendData = getLotsOfLegendData();
                let originalOrientation = legend.getOrientation();

                legend.changeOrientation(LegendPosition.Left);
                legend.drawLegend({ dataPoints: legendData, title: "states" }, { height: 500, width: 150 });

                flushAllD3Transitions();

                let lenOfLegendOnDom = $(".legendItem title").length;
                for (let i = 0; i < lenOfLegendOnDom; i++) {
                    let legendItemText = $(".legendItem title").eq(i).text();
                    expect(legendItemText).toBe(legendData[i].label);
                }

                legend.changeOrientation(originalOrientation);
            });

            it("legend no title", () => {
                let legendData = getLotsOfLegendData();
                legend.drawLegend({ dataPoints: legendData }, viewport);

                flushAllD3Transitions();

                expect($(".legendTitle").length).toBe(0);
            });

            it("legend Top & horizontal trim", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBeGreaterThan(5);
                expect($(".legendItem").length).toBeLessThan(52);
            });

            it("legend Bottom & horizontal trim", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Bottom);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBeGreaterThan(5);
                expect($(".legendItem").length).toBeLessThan(52);
            });

            it("legend Left & vertical trim", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Left);
                legend.drawLegend({ dataPoints: legendData }, { height: 200, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBeGreaterThan(5);
                expect($(".legendItem").length).toBeLessThan(52);
            });

            it("legend Right & vertical trim", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 200, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBeGreaterThan(5);
                expect($(".legendItem").length).toBeLessThan(52);
            });

            it("Intelligent Layout: Low label count should result in longer max-width", () => {
                let legendData = [{
                    label: "Really long label, but i have the space to show",
                    color: "red",
                    icon: LegendIcon.Line,
                    // identity: powerbi.visuals.SelectionId.createNull(),
                    identity: createSelectionIdentity(1),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBe(1);
                expect($($(".legendText")[0]).text()).not.toContain("…");
                expect($($(".legendText")[0]).text()).not.toContain("...");
            });

            it("Intelligent Layout: Long label must be cut off", () => {
                let legendData: LegendDataPoint[] = [{
                    label: "Really long label, but i haven't the space to show",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(1),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Left);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 200 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBe(1);
                expect($($(".legendText")[0]).text()).toContain("...");
                expect($($(".legendText")[0]).text().length).toBeGreaterThan(3);
            });

            it("Intelligent Layout: Lots of small labels should get compacted in horizontal layout", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData, fontSize: 8 }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".legendItem").length).toBeLessThan(33);
                expect($(".legendItem").length).toBeGreaterThan(20);
            });

            it("Intelligent Layout: If labels in horizontal layout have small widths, width of legend should be small", () => {
                let legendData = getLotsOfLegendData();
                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect(legend.getMargins().width).toBeLessThan(200);
            });

            it("Intelligent Layout: If labels in horizontal layout have large widths, width of legend should be 30% of viewport", () => {
                let legendData = [{
                    label: "I am a really long label, but you should not allow me to take more than 300px",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(1),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect(legend.getMargins().width).toBe(300);
            });

            it("Intelligent Layout: Only right arrow shown at start ", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: No arrows when you have enough horizontal space ", () => {
                let legendData = [{
                    label: "Skywalker",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(2),
                    selected: false
                }, {
                    label: "The End",
                    color: "blue",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(4),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Bottom);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(0);
            });

            it("Intelligent Layout: No arrows when you have enough vertical space ", () => {
                let legendData = [{
                    label: "Skywalker",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(2),
                    selected: false
                }, {
                    label: "The End",
                    color: "blue",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(4),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(0);
            });

            it("Intelligent Layout: No arrows when you have enough horizontal space, but appears on resize ", () => {
                let legendData = [{
                    label: "Skywalker",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(2),
                    selected: false
                }, {
                    label: "The End",
                    color: "blue",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(4),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(0);

                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 100 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: No arrows when you have enough vertical space, but appears on resize ", () => {
                let legendData = [{
                    label: "Skywalker",
                    color: "red",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(2),
                    selected: false
                }, {
                    label: "The End",
                    color: "blue",
                    icon: LegendIcon.Line,
                    identity: createSelectionIdentity(4),
                    selected: false
                }];

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(0);

                legend.drawLegend({ dataPoints: legendData }, { height: 20, width: 100 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: Only down arrow shown at start ", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: Only down arrow shown at start ", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: Second arrow appears when you page right", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 900 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);

                $(".navArrow").first().d3Click(0, 0);

                expect($(".navArrow").length).toBe(2);
            });

            it("Intelligent Layout: Second arrow appears when you page down", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Left);
                legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);

                $(".navArrow").first().d3Click(0, 0);

                expect($(".navArrow").length).toBe(2);
            });

            it("Intelligent Layout: Second arrow disappears when you page rigth to last page", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ dataPoints: legendData, fontSize: 8 }, { height: 100, width: 900 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);

                $(".navArrow").first().d3Click(0, 0);

                expect($(".navArrow").length).toBe(2);

                $(".navArrow").last().d3Click(0, 0);

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: Second arrow disappears when you page down to last page", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Right);
                legend.drawLegend({ dataPoints: legendData }, { height: 500, width: 1000 });

                flushAllD3Transitions();

                expect($(".navArrow").length).toBe(1);

                $(".navArrow").first().d3Click(0, 0);

                expect($(".navArrow").length).toBe(2);

                $(".navArrow").last().d3Click(0, 0);

                expect($(".navArrow").length).toBe(1);
            });

            it("Intelligent Layout: Both arrows are Horizontally Centered", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ fontSize: 40, dataPoints: legendData }, { height: 500, width: 1000 });

                flushAllD3Transitions();

                $(".navArrow").first().d3Click(0, 0);

                let firstArrowPosition = getPosition($(".navArrow").first()[0]),
                    firstArrowY = firstArrowPosition.top,
                    firstArrowHeight = firstArrowPosition.height,
                    lastArrowPosition = getPosition($(".navArrow").last()[0]),
                    lastArrowY = lastArrowPosition.top,
                    lastArrowHeight = lastArrowPosition.height,
                    labelPosition = getPosition($(".legendText").first()[0]),
                    labelY = labelPosition.top,
                    labelHeight = labelPosition.height;

                expect(firstArrowY + firstArrowHeight / 2).toBeGreaterThan((labelY * 2 + labelHeight) * 0.4);
                expect(firstArrowY + firstArrowHeight / 2).toBeLessThan((labelY * 2 + labelHeight) * 0.6);
                expect(lastArrowY + lastArrowHeight / 2).toBeGreaterThan((labelY * 2 + labelHeight) * 0.4);
                expect(lastArrowY + lastArrowHeight / 2).toBeLessThan((labelY * 2 + labelHeight) * 0.6);
            });

            it("Intelligent Layout: Icon Horizontally Centered", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Top);
                legend.drawLegend({ fontSize: 40, dataPoints: legendData }, { height: 500, width: 1000 });

                flushAllD3Transitions();

                let iconPosition = getPosition($(".legendIcon").first()[0]),
                    labelPosition = getPosition($(".legendText").first()[0]),
                    iconY = iconPosition.top,
                    iconHeight = iconPosition.height,
                    labelY = labelPosition.top,
                    labelHeight = labelPosition.height;

                expect(iconY + iconHeight / 2).toBeGreaterThan((labelY * 2 + labelHeight) * 0.4);
                expect(iconY + iconHeight / 2).toBeLessThan((labelY * 2 + labelHeight) * 0.6);
            });

            it("Intelligent Layout: Icon Vertically Centered", () => {
                let legendData = getLotsOfLegendData();

                legend.changeOrientation(LegendPosition.Left);
                legend.drawLegend({ fontSize: 40, dataPoints: legendData }, { height: 500, width: 1000 });

                flushAllD3Transitions();

                let iconPosition = getPosition($(".legendIcon").first()[0]),
                    labelPosition = getPosition($(".legendText").first()[0]),
                    iconY = iconPosition.top,
                    iconHeight = iconPosition.height,
                    labelY = labelPosition.top,
                    labelHeight = labelPosition.height;

                expect(iconY + iconHeight / 2).toBeGreaterThan((labelY * 2 + labelHeight) * 0.4);
                expect(iconY + iconHeight / 2).toBeLessThan((labelY * 2 + labelHeight) * 0.6);
            });

            function validateLegendDOM(expectedData: LegendDataPoint[]): void {
                let len = expectedData.length;
                let labels = $(".legendText");

                expect(labels.length).toBe(len);

                let icons = $(".legendIcon");

                expect(icons.length).toBe(len);

                for (let i = 0; i < len; ++i) {
                    let expectedDatum = expectedData[i];

                    expect($(labels.get(i)).text()).toBe(expectedDatum.label);
                    assertColorsMatch(icons.eq(i).css("fill"), expectedDatum.color);
                }
            }

            function getPosition(element: HTMLElement): Rect {
                let rect = element.getBoundingClientRect();
                return { left: rect.left, top: rect.top, height: rect.height, width: rect.width };
            }
        });

        describe("Mobile: interactive legend DOM validation", () => {
            let element: JQuery,
                viewport: powerbi.IViewport,
                legend: ILegend,
                colorStyle = "color: {0};",
                defaultLegendHeight = 70,
                interactivityService: IInteractivityService;

            let legendData: LegendDataPoint[] = [
                {
                    category: "state",
                    label: "Alaska",
                    color: "red",
                    icon: LegendIcon.Box,
                    measure: 0,
                    identity: createSelectionIdentity(),
                    selected: false
                },
                {
                    category: "state",
                    label: "California",
                    color: "blue",
                    icon: LegendIcon.Box,
                    measure: 5,
                    identity: createSelectionIdentity(),
                    selected: false
                },
                {
                    category: "state",
                    label: "Texas",
                    color: "green",
                    icon: LegendIcon.Box,
                    measure: 10,
                    identity: createSelectionIdentity(),
                    selected: false
                },
            ];

            beforeEach(() => {
                element = testDom("500", "500");
                interactivityService = createInteractivityService(createVisualHost());
                legend = createLegend(element.get(0), true, interactivityService);
            });

            describe("3 item legend", () => {
                it("legend dom validation one legend item count validation", (done) => {
                    legend.drawLegend({
                        dataPoints: [
                            legendData[1],
                        ]
                    }, viewport);

                    setTimeout(() => {
                        expect($(".interactive-legend .title").length).toBe(1);
                        expect($(".interactive-legend .item").length).toBe(1);
                        done();
                    }, DefaultWaitForRender);
                });

                it("legend dom validation three legend items count validation", (done) => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);

                    setTimeout(() => {
                        expect($(".interactive-legend .title").length).toBe(1);
                        expect($(".interactive-legend .item").length).toBe(3);
                        done();
                    }, DefaultWaitForRender);
                });

                it("legend dom validation three legend items first item name and measure", (done) => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);

                    setTimeout(() => {
                        expect($(".interactive-legend .title").text()).toBe(legendData[0].category);
                        expect($(".interactive-legend .item").first().find(".itemName").text().trim()).toBe("Alaska");
                        expect($(".interactive-legend .item").first().find(".itemMeasure").text().trim()).toBe("0");
                        done();
                    }, DefaultWaitForRender);
                });

                it("legend dom validation three legend items last item name and measure", (done) => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);
                    setTimeout(() => {
                        expect($(".interactive-legend .title").text()).toBe(legendData[0].category);
                        expect($(".interactive-legend .item").last().find(".itemName").text().trim()).toBe("Texas");
                        expect($(".interactive-legend .item").last().find(".itemMeasure").text().trim()).toBe("10");
                        done();
                    }, DefaultWaitForRender);
                });

                it("legend dom validation three legend items colors count", (done) => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);

                    setTimeout(() => {
                        expect($(".interactive-legend .icon").length).toBe(3);
                        done();
                    }, DefaultWaitForRender);
                });

                it("legend getHeight empty", () => {
                    expect(legend.getMargins().height).toBe(defaultLegendHeight);
                });

                it("legend getHeight no data", () => {
                    legend.drawLegend({ dataPoints: [] }, viewport);

                    expect(legend.getMargins().height).toBe(defaultLegendHeight);
                });

                it("legend getHeight data", () => {
                    legend.drawLegend({ dataPoints: legendData }, viewport);

                    expect(legend.getMargins().height).toBe(defaultLegendHeight);
                });

                it("legend getHeight one data point", () => {
                    legend.drawLegend({
                        dataPoints: [
                            legendData[0]
                        ]
                    }, viewport);

                    expect(legend.getMargins().height).toBe(defaultLegendHeight);
                });

                it("legend dom validation incremental build", (done) => {
                    // Draw the legend once with the 3 states
                    let initialData: LegendDataPoint[] = legendData;

                    legend.drawLegend({ dataPoints: initialData }, viewport);

                    setTimeout(() => {
                        validateLegendDOM(initialData);

                        // Draw the legend against with a new state at the start
                        let updatedData: LegendDataPoint[] = [
                            legendData[0],
                            legendData[1],
                            legendData[2],
                            {
                                category: "state",
                                label: "Washington",
                                color: "orange",
                                icon: LegendIcon.Box,
                                measure: 15,
                                identity: createSelectionIdentity(2),
                                selected: false
                            }
                        ];
                        legend.reset();
                        legend.drawLegend({ dataPoints: updatedData }, viewport);
                        setTimeout(() => {
                            validateLegendDOM(updatedData);
                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                });

            });

            function validateLegendDOM(expectedData: LegendDataPoint[]): void {
                let len = expectedData.length,
                    items = $(".interactive-legend .item");

                expect($(".interactive-legend .title").length).toBe(1);
                expect(items.length).toBe(len);

                let icons = $(".interactive-legend .icon");
                expect(icons.length).toBe(len);

                // items are returned from the table, first row and then second row.
                // rearrage it to match the way the legend outputs it: by columns.
                let rearrangedItems = [],
                    rearrangedIcons = [];

                for (let i = 0; i < len; i++) {
                    rearrangedItems.push($(items.get(i)));
                    rearrangedIcons.push($(icons.get(i)));
                }

                for (let i = 0; i < len; ++i) {
                    let expectedDatum = expectedData[i],
                        item = rearrangedItems[i],
                        icon = rearrangedIcons[i];

                    expect(item.find(".itemName").text()).toBe(expectedDatum.label);
                    expect(item.find(".itemMeasure").text().trim()).toBe(expectedDatum.measure.toString());

                    let color = icon
                        .attr("style")
                        .substring(icon.attr("style").indexOf("color:"))
                        .trim();

                    expect(color).toBe(stringExtensions.format(colorStyle, expectedDatum.color));
                }
            }
        });
    });

    let incr: number = 0;

    function createSelectionIdentity(key?: number | string): ISelectionId {
        const selId: any = createSelectionId(key as string);
        selId.measures = [incr];
        incr++;
        selId.compareMeasures = (current, others) => {
            return current === others;
        };
        return selId;
    }

    function getLotsOfLegendData(): LegendDataPoint[] {
        let states = [
            "AL", "AK", "AS", "AZ", "AR", "CA", "AL1234567890",
            "CT", "DE", "DC", "FM", "AL1234567890", "GA", "GU", "HI", "ID",
            "IL", "IN", "AL1234567890", "KS", "KY", "LA", "ME", "MH", "MD",
            "MA", "MI", "MN", "MS", "AL1234567890", "MT", "NE", "NV", "NH",
            "NJ", "NM", "NY", "NC", "ND", "MP", "AL1234567890", "OK", "OR",
            "PW", "PA", "PR", "RI", "AL1234567890", "SD", "TN", "TX", "UT",
            "VT", "VI", "VA", "WA", "WV", "WI", "WY", "AL1234567890", "AA",
            "AP"
        ];

        let colors = d3.scale.category20c(),
            legendData: LegendDataPoint[] = [];

        for (let i = 0; i < states.length; i++) {
            legendData.push({
                label: states[i],
                color: colors(i.toString()),
                icon: LegendIcon.Line,
                identity: createSelectionIdentity(i),
                selected: false,
            });
        }

        return legendData;
    }
}
