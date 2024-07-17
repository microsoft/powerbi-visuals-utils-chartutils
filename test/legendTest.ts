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

import { select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";

import powerbi from "powerbi-visuals-api";
// powerbi.extensibility.visual
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

// powerbi.extensibility.utils.svg
import { manipulation, Rect } from "powerbi-visuals-utils-svgutils";
import flushAllD3Transitions = manipulation.flushAllD3Transitions;

// powerbi.extensibility.utils.formatting
import { stringExtensions } from "powerbi-visuals-utils-formattingutils";

// powerbi.extensibility.utils.test
import { testDom, createVisualHost, createSelectionId, d3Click } from "powerbi-visuals-utils-testutils";
const DefaultWaitForRender = 10;
// import ClickEventType = powerbi.extensibility.utils.test.helpers.ClickEventType;
enum ClickEventType {
    Default = 0,
    CtrlKey = 1,
    AltKey = 2,
    ShiftKey = 4,
    MetaKey = 8,
}

// powerbi.extensibility.utils.chart
import { createLegend } from "./../src/legend/legend";
import { update } from "./../src/legend/legendData";
import { LegendData, LegendPosition, legendProps, ILegend, LegendDataPoint } from "./../src/legend/legendInterfaces";
import * as legendPosition from "./../src/legend/legendPosition";

import { assertColorsMatch, findElementTitle } from "./helpers/helpers";

let incr: number = 0;

function createSelectionIdentity(key?: number | string): powerbi.visuals.ISelectionId {
    const selId: any = createSelectionId(key as string);
    selId.measures = [incr];
    incr++;
    selId.compareMeasures = (current, others) => {
        return current === others;
    };
    return selId;
}

describe("legend", () => {
    describe("DOM validation", () => {
        let element: HTMLElement,
            viewport: powerbi.IViewport,
            legend: ILegend,
            hostServices: IVisualHost,
            legendData: LegendDataPoint[],
            legendTitleClassSelector = ".legendTitle";

        beforeEach(() => {
            element = testDom("500", "500");
            hostServices = createVisualHost({});

            legend = createLegend(element, true);

            viewport = {
                height: parseFloat(element.getAttribute("height")),
                width: parseFloat(element.getAttribute("width"))
            };

            legendData = [
                {
                    label: "California",
                    color: "#ff0000",
                    identity: createSelectionIdentity(0),
                    selected: false
                },
                {
                    label: "Texas",
                    color: "#0000ff",
                    identity: createSelectionIdentity(1),
                    selected: false
                },
                {
                    label: "Washington",
                    color: "#00ff00",
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
                expect(element.querySelectorAll(".legendItem").length).toBe(1);
                expect(element.querySelectorAll(".legendText").length).toBe(1);
                expect(element.querySelectorAll(".legendIcon").length).toBe(1);
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items count validation", (done) => {
            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendItem").length).toBe(3);
                expect(element.querySelectorAll(".legendText").length).toBe(3);
                expect(element.querySelectorAll(".legendIcon").length).toBe(3);
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items first item text", (done) => {
            legend.reset();
            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelector(".legendText").textContent).toBe("California");
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items last item text", (done) => {
            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendText")[legendData.length - 1].textContent).toBe("Washington");
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items colors count", (done) => {
            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendIcon").length).toBe(3);
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items with shared label and color", (done) => {
            let legendData: LegendDataPoint[] = [
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(0), selected: false },
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(1), selected: false },
                { label: "BREAKPOINT", color: "#00ff00", identity: createSelectionIdentity(2), selected: false }
            ];

            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendItem").length).toBe(3);
                expect(element.querySelectorAll(".legendText").length).toBe(3);
                expect(element.querySelectorAll(".legendIcon").length).toBe(3);
                done();
            }, DefaultWaitForRender);
        });

        xit("legend dom validation three legend items but two share same identity", (done) => {
            let legendData: LegendDataPoint[] = [
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(0), selected: false },
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(0), selected: false },
                { label: "BREAKPOINT", color: "#00ff00", identity: createSelectionIdentity(1), selected: false }
            ];

            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendItem").length).toBe(2);
                expect(element.querySelectorAll(".legendText").length).toBe(2);
                expect(element.querySelectorAll(".legendIcon").length).toBe(2);
                done();
            }, DefaultWaitForRender);
        });

        it("legend dom validation three legend items but two share same identity but are on different layers", (done) => {
            let legendData: LegendDataPoint[] = [
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(1), selected: false, layerNumber: 0 },
                { label: "ACCESS_VIOLA...", color: "#ff0000", identity: createSelectionIdentity(2), selected: false, layerNumber: 1 },
                { label: "BREAKPOINT", color: "#00ff00", identity: createSelectionIdentity(4), selected: false, layerNumber: 0 }
            ];

            legend.drawLegend({ dataPoints: legendData }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendItem").length).toBe(3);
                expect(element.querySelectorAll(".legendText").length).toBe(3);
                expect(element.querySelectorAll(".legendIcon").length).toBe(3);
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
                    { label: "Alaska", color: "#fff000", identity: createSelectionIdentity(2), selected: false },
                    { label: "California", color: "#fff00d", identity: createSelectionIdentity(4), selected: false },
                    { label: "Texas", color: "#fffe00", identity: createSelectionIdentity(8), selected: false },
                    { label: "Washington", color: "#0000dd", identity: createSelectionIdentity(16), selected: false }
                ];
                legend.reset();
                legend.drawLegend({ dataPoints: updatedData }, viewport);
                setTimeout(() => {
                    validateLegendDOM(updatedData);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it("legend defaults", () => {
            let legendArray = getLotsOfLegendData(),
                legendData: LegendData = { dataPoints: legendArray, title: "" },
                props: powerbi.DataViewObject = {};

            update(legendData, props);

            expect(props[legendProps.show]).toBe(true);
            expect(props[legendProps.position]).toEqual(legendPosition.top);
        });

        it("legend with title", () => {
            let legendData = getLotsOfLegendData();
            legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

            flushAllD3Transitions();

            expect(element.querySelectorAll(legendTitleClassSelector).length).toBe(1);
        });

        it("legend title tooltip", () => {
            let legendData = getLotsOfLegendData();
            legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

            flushAllD3Transitions();
            expect(findElementTitle(element.querySelector(legendTitleClassSelector))).toBe("states");
        });

        it("legend truncated title tooltip", () => {
            let legendData = getLotsOfLegendData();
            legend.drawLegend({ dataPoints: legendData, title: "Very Long Legend Header Data" }, viewport);

            flushAllD3Transitions();
            expect(findElementTitle(element.querySelector(legendTitleClassSelector))).toBe("Very Long Legend Header Data");
        });

        it("legend items tooltip", () => {
            let legendData = getLotsOfLegendData();
            legend.drawLegend({ dataPoints: legendData, title: "states" }, viewport);

            flushAllD3Transitions();

            let lenOfLegendOnDom = element.querySelectorAll(".legendItem title").length;
            for (let i = 0; i < lenOfLegendOnDom; i++) {
                expect(element.querySelectorAll(".legendItem title")[i].textContent).toBe(legendData[i].label);
            }
        });

        it("legend truncated items tooltip", () => {
            let legendData = getLotsOfLegendData();
            let originalOrientation = legend.getOrientation();

            legend.changeOrientation(LegendPosition.Left);
            legend.drawLegend({ dataPoints: legendData, title: "states" }, { height: 500, width: 150 });

            flushAllD3Transitions();

            let lenOfLegendOnDom = element.querySelectorAll(".legendItem title").length;
            for (let i = 0; i < lenOfLegendOnDom; i++) {
                let legendItemText = element.querySelectorAll(".legendItem title")[i].textContent;
                expect(legendItemText).toBe(legendData[i].label);
            }

            legend.changeOrientation(originalOrientation);
        });

        it("legend no title", () => {
            let legendData = getLotsOfLegendData();
            legend.drawLegend({ dataPoints: legendData }, viewport);

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendTitle").length).toBe(0);
        });

        it("legend Top & horizontal trim", () => {
            let legendData = getLotsOfLegendData();
            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBeGreaterThan(5);
            expect(element.querySelectorAll(".legendItem").length).toBeLessThan(52);
        });

        it("legend Bottom & horizontal trim", () => {
            let legendData = getLotsOfLegendData();
            legend.changeOrientation(LegendPosition.Bottom);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBeGreaterThan(5);
            expect(element.querySelectorAll(".legendItem").length).toBeLessThan(52);
        });

        it("legend Left & vertical trim", () => {
            let legendData = getLotsOfLegendData();
            legend.changeOrientation(LegendPosition.Left);
            legend.drawLegend({ dataPoints: legendData }, { height: 200, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBeGreaterThan(5);
            expect(element.querySelectorAll(".legendItem").length).toBeLessThan(52);
        });

        it("legend Right & vertical trim", () => {
            let legendData = getLotsOfLegendData();
            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 200, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBeGreaterThan(5);
            expect(element.querySelectorAll(".legendItem").length).toBeLessThan(52);
        });

        it("Intelligent Layout: Low label count should result in longer max-width", () => {
            let legendData = [{
                label: "Really long label, but i have the space to show",
                color: "red",

                // identity: powerbi.visuals.SelectionId.createNull(),
                identity: createSelectionIdentity(1),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBe(1);
            expect(element.querySelector(".legendText").textContent).not.toContain("…");
            expect(element.querySelector(".legendText").textContent).not.toContain("...");
        });

        it("Intelligent Layout: Long label must be cut off", () => {
            let legendData: LegendDataPoint[] = [{
                label: "Really long label, but i haven't the space to show",
                color: "red",

                identity: createSelectionIdentity(1),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Left);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 200 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBe(1);
            expect(element.querySelector(".legendText").textContent).toContain("...");
            expect(element.querySelector(".legendText").textContent.length).toBeGreaterThan(3);
        });

        it("Intelligent Layout: Lots of small labels should get compacted in horizontal layout", () => {
            let legendData = getLotsOfLegendData();
            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData, fontSize: 8 }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".legendItem").length).toBeLessThan(33);
            expect(element.querySelectorAll(".legendItem").length).toBeGreaterThan(20);
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

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: No arrows when you have enough horizontal space ", () => {
            let legendData = [{
                label: "Skywalker",
                color: "red",

                identity: createSelectionIdentity(2),
                selected: false
            }, {
                label: "The End",
                color: "blue",

                identity: createSelectionIdentity(4),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Bottom);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(0);
        });

        it("Intelligent Layout: No arrows when you have enough vertical space ", () => {
            let legendData = [{
                label: "Skywalker",
                color: "red",

                identity: createSelectionIdentity(2),
                selected: false
            }, {
                label: "The End",
                color: "blue",

                identity: createSelectionIdentity(4),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(0);
        });

        it("Intelligent Layout: No arrows when you have enough horizontal space, but appears on resize ", () => {
            let legendData = [{
                label: "Skywalker",
                color: "red",

                identity: createSelectionIdentity(2),
                selected: false
            }, {
                label: "The End",
                color: "blue",

                identity: createSelectionIdentity(4),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(0);

            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 100 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: No arrows when you have enough vertical space, but appears on resize ", () => {
            let legendData = [{
                label: "Skywalker",
                color: "red",

                identity: createSelectionIdentity(2),
                selected: false
            }, {
                label: "The End",
                color: "blue",

                identity: createSelectionIdentity(4),
                selected: false
            }];

            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(0);

            legend.drawLegend({ dataPoints: legendData }, { height: 20, width: 100 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: Only down arrow shown at start ", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: Only down arrow shown at start ", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: Second arrow appears when you page right", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 900 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);

            let elementToClick = element.querySelector(".navArrow");
            d3Click.call(elementToClick, elementToClick, 0, 0);

            expect(element.querySelectorAll(".navArrow").length).toBe(2);
        });

        it("Intelligent Layout: Second arrow appears when you page down", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Left);
            legend.drawLegend({ dataPoints: legendData }, { height: 100, width: 1000 });

            flushAllD3Transitions();

            let elementToClick = element.querySelectorAll(".navArrow");
            expect(elementToClick.length).toBe(1);

            d3Click.call(elementToClick[0], elementToClick[0], 0, 0);

            expect(element.querySelectorAll(".navArrow").length).toBe(2);
        });

        it("Intelligent Layout: Second arrow disappears when you page rigth to last page", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ dataPoints: legendData, fontSize: 8 }, { height: 100, width: 900 });

            flushAllD3Transitions();

            let elementToClick = element.querySelectorAll(".navArrow");
            expect(element.querySelectorAll(".navArrow").length).toBe(1);

            d3Click.call(elementToClick[0], elementToClick[0], 0, 0);

            expect(element.querySelectorAll(".navArrow").length).toBe(2);

            d3Click.call(
                element.querySelectorAll(".navArrow")[element.querySelectorAll(".navArrow").length - 1],
                element.querySelectorAll(".navArrow")[element.querySelectorAll(".navArrow").length - 1],
                0,
                0
            );

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        it("Intelligent Layout: Second arrow disappears when you page down to last page", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Right);
            legend.drawLegend({ dataPoints: legendData }, { height: 500, width: 1000 });

            flushAllD3Transitions();

            expect(element.querySelectorAll(".navArrow").length).toBe(1);

            d3Click.call(element.querySelector(".navArrow"), element.querySelector(".navArrow"), 0, 0);

            expect(element.querySelectorAll(".navArrow").length).toBe(2);

            let elementToClick = element.querySelectorAll(".navArrow")[element.querySelectorAll(".navArrow").length - 1];
            d3Click.call(elementToClick, elementToClick, 0, 0);

            expect(element.querySelectorAll(".navArrow").length).toBe(1);
        });

        xit("Intelligent Layout: Both arrows are Horizontally Centered", () => {
            let legendData = getLotsOfLegendData();

            legend.changeOrientation(LegendPosition.Top);
            legend.drawLegend({ fontSize: 40, dataPoints: legendData }, { height: 500, width: 1000 });

            flushAllD3Transitions();

            let elementToClick = element.querySelector(".navArrow");
            d3Click.call(elementToClick, elementToClick, 0, 0);

            let firstArrowPosition = getPosition(element.querySelector(".navArrow")),
                firstArrowY = firstArrowPosition.top,
                firstArrowHeight = firstArrowPosition.height,
                lastArrowPosition = getPosition(<HTMLElement>element.querySelectorAll(".navArrow")[element.querySelectorAll(".navArrow").length - 1]),
                lastArrowY = lastArrowPosition.top,
                lastArrowHeight = lastArrowPosition.height,
                labelPosition = getPosition(element.querySelector(".legendText")),
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

            let iconPosition = getPosition(element.querySelector(".legendIcon")),
                labelPosition = getPosition(element.querySelector(".legendText")),
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

            let iconPosition = getPosition(element.querySelector(".legendIcon")),
                labelPosition = getPosition(element.querySelector(".legendText")),
                iconY = iconPosition.top,
                iconHeight = iconPosition.height,
                labelY = labelPosition.top,
                labelHeight = labelPosition.height;

            expect(iconY + iconHeight / 2).toBeGreaterThan((labelY * 2 + labelHeight) * 0.4);
            expect(iconY + iconHeight / 2).toBeLessThan((labelY * 2 + labelHeight) * 0.6);
        });

        function validateLegendDOM(expectedData: LegendDataPoint[]): void {
            let len = expectedData.length;
            let labels = element.querySelectorAll(".legendText");

            expect(labels.length).toBe(len);

            let icons = element.querySelectorAll(".legendIcon");

            expect(icons.length).toBe(len);

            for (let i = 0; i < len; ++i) {
                let expectedDatum = expectedData[i];

                expect(labels[i].textContent).toBe(expectedDatum.label);
                assertColorsMatch(select(icons[i]).style("fill"), expectedDatum.color);
            }
        }

        function getPosition(element: HTMLElement): Rect {
            let rect = element.getBoundingClientRect();
            return { left: rect.left, top: rect.top, height: rect.height, width: rect.width };
        }
    });

    describe("SVGLegend DOM", () => {
        let element: HTMLElement,
            legend: ILegend,
            viewport: powerbi.IViewport = {
                height: 100,
                width: 500,
            };

        const dataPoints: LegendDataPoint[] = [
            {
                category: "state",
                label: "Alaska",
                color: "red",

                measure: 0,
                identity: createSelectionIdentity(),
                selected: false
            },
            {
                category: "state",
                label: "California",
                color: "blue",

                measure: 5,
                identity: createSelectionIdentity(),
                selected: false
            },
            {
                category: "state",
                label: "Texas",
                color: "green",

                measure: 10,
                identity: createSelectionIdentity(),
                selected: false
            },
        ];

        beforeEach(() => {
            element = testDom("500", "500");

            legend = createLegend(element, false);
        });

        it("should render 3 legendText elements", (done) => {
            legend.drawLegend({ dataPoints }, viewport);

            setTimeout(() => {
                expect(element.querySelectorAll(".legendText").length).toBe(3);

                done();
            }, DefaultWaitForRender);
        });

        it("should apply fontFamily via CSS for each legendText element", (done) => {
            const fontFamily: string = "Tahoma";

            legend.drawLegend(
                {
                    fontFamily,
                    dataPoints,
                },
                viewport,
            );

            setTimeout(() => {
                element.querySelectorAll(".legendText").forEach((legendTextElement: Element) => {
                    expect(select(legendTextElement).style("font-family")).toBe(fontFamily);
                });

                done();
            }, DefaultWaitForRender);
        });
    });
});

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

    let colors = scaleOrdinal([0, 20]);
    let legendData: LegendDataPoint[] = [];

    for (let i = 0; i < states.length; i++) {
        legendData.push({
            label: states[i],
            color: <any>colors(i.toString()),

            identity: createSelectionIdentity(i),
            selected: false,
        });
    }

    return legendData;
}
