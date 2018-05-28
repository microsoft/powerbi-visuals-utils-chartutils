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

import powerbi from "powerbi-visuals-tools";
// powerbi.extensibility.utils.formatting
import { textUtil } from "powerbi-visuals-utils-formattingutils";
import { manipulation } from "powerbi-visuals-utils-svgutils";
import { ILegend, LegendData, LegendDataPoint, LegendPosition, LegendIcon } from "./legendInterfaces";
import { Selection, Update, select, Enter, Zoom, zoom } from "d3-selection";
import { linear, Linear } from "d3-scale";

// powerbi.extensibility.utils.svg
import translateXWithPixels = manipulation.translateXWithPixels;

export class InteractiveLegend implements ILegend {
    private static LegendHeight = 70;
    private static LegendContainerClass = "interactive-legend";
    private static LegendContainerSelector = ".interactive-legend";
    private static LegendTitleClass = "title";
    private static LegendItem = "item";
    private static legendPlaceSelector = "\u25CF";
    private static legendIconClass = "icon";
    private static legendColorCss = "color";
    private static legendItemNameClass = "itemName";
    private static legendItemMeasureClass = "itemMeasure";

    private legendContainerParent: Selection<any>;
    private legendContainerDiv: Selection<any>;

    constructor(element: HTMLElement) {
        this.legendContainerParent = select(element);
    }

    public getMargins(): powerbi.IViewport {
        return {
            height: InteractiveLegend.LegendHeight,
            width: 0
        };
    }

    public drawLegend(legendData: LegendData) {
        let data = legendData.dataPoints;
        if (data.length < 1) {
            return;
        }

        let legendContainerDiv = this.legendContainerParent.select(InteractiveLegend.LegendContainerSelector);

        if (legendContainerDiv.empty()) {
            if (!data.length) {
                return;
            }

            legendContainerDiv = this.legendContainerParent
                .insert("div", ":first-child")
                .style("height", this.getMargins().height)
                .classed(InteractiveLegend.LegendContainerClass, true);
        }

        this.legendContainerDiv = legendContainerDiv;

        // Construct the legend title and items.
        this.drawTitle(data);
        this.drawLegendItems(data);
    }

    public reset(): void {
        if (this.legendContainerDiv) {
            this.legendContainerDiv.remove();
            this.legendContainerDiv = null;
        }
    }

    public isVisible(): boolean {
        return true;
    }

    /**
     * Not supported
     */
    public changeOrientation(orientation: LegendPosition) { }

    public getOrientation(): LegendPosition {
        return LegendPosition.Top;
    }

    /**
     * Draw the legend title
     */
    private drawTitle(data: LegendDataPoint[]): void {
        let titleDiv: Selection<any> = this.legendContainerDiv.selectAll(`div.${InteractiveLegend.LegendTitleClass}`),
            item: Update<any> = titleDiv.data([data[0]]);

        // Enter
        let itemEnter: Enter<any> = item.enter(),
            titleDivEnter: Selection<any> = itemEnter
                .append("div")
                .attr("class", InteractiveLegend.LegendTitleClass);

        titleDivEnter
            .filter((d: LegendDataPoint) => d.iconOnlyOnLabel)
            .append("span")
            .attr("class", InteractiveLegend.legendIconClass)
            .html(InteractiveLegend.legendPlaceSelector);

        titleDivEnter.append("span");

        // Update
        item.filter((d: LegendDataPoint) => d.iconOnlyOnLabel)
            .select("span." + InteractiveLegend.legendIconClass)
            .style(InteractiveLegend.legendColorCss, (d: LegendDataPoint) => d.color);

        item.select("span:last-child").text((d: LegendDataPoint) => d.category);
    }

    /**
     * Draw the legend items
     */
    private drawLegendItems(data: LegendDataPoint[]): void {
        // Add Mesaures - the items of the category in the legend
        this.ensureLegendTableCreated();

        let dataPointsMatrix: LegendDataPoint[][] = [data];
        let legendItemsContainer: Update<any> = this.legendContainerDiv
            .select("tbody")
            .selectAll("tr")
            .data(dataPointsMatrix);

        // Enter
        let legendItemsEnter: Enter<any> = legendItemsContainer.enter(),
            rowEnter: Selection<any> = legendItemsEnter.append("tr");

        let cellEnter: Selection<any> = rowEnter
            .selectAll("td")
            .data((d: LegendDataPoint[]) => d, (d: LegendDataPoint) => d.label)
            .enter()
            .append("td")
            .attr("class", InteractiveLegend.LegendItem);

        let cellSpanEnter: Selection<any> = cellEnter.append("span");

        cellSpanEnter.filter((d: LegendDataPoint) => !d.iconOnlyOnLabel)
            .append("span")
            .html(InteractiveLegend.legendPlaceSelector)
            .attr("class", InteractiveLegend.legendIconClass)
            .attr("white-space", "nowrap")
            .style({
                "font-size": "20px", // this creates a circle of 10px
                "margin-bottom": "7px"
            });

        cellSpanEnter
            .append("span")
            .attr("class", InteractiveLegend.legendItemNameClass);

        cellSpanEnter
            .append("span")
            .attr("class", InteractiveLegend.legendItemMeasureClass);

        // Update
        let legendCells: Update<any> = legendItemsContainer
            .selectAll("td")
            .data((d: LegendDataPoint[]) => d, (d: LegendDataPoint) => d.label);

        legendCells
            .select(`span.${InteractiveLegend.legendItemNameClass}`)
            .html((d: LegendDataPoint) => textUtil.removeBreakingSpaces(d.label));

        legendCells
            .select(`span.${InteractiveLegend.legendItemMeasureClass}`)
            .html((d: LegendDataPoint) => `&nbsp;${d.measure}`);

        legendCells
            .select("span." + InteractiveLegend.legendIconClass)
            .style("color", (d: LegendDataPoint) => d.color);

        // Exit
        legendCells
            .exit()
            .remove();
    }

    /**
     * Ensure legend table is created and set horizontal pan gestures on it
     */
    private ensureLegendTableCreated(): void {
        if (this.legendContainerDiv.select("div table").empty()) {
            let legendTable: Selection<any> = this.legendContainerDiv
                .append("div")
                .append("table");

            legendTable.style("table-layout", "fixed").append("tbody");
            // Setup Pan Gestures of the legend
            this.setPanGestureOnLegend(legendTable);
        }
    }

    /**
     * Set Horizontal Pan gesture for the legend
     */
    private setPanGestureOnLegend(legendTable: Selection<any>): void {
        let parentNode = <HTMLElement>this.legendContainerParent.node();
        let viewportWidth: number = parentNode.getBoundingClientRect().width;
        let xscale: Linear<number, number> = linear()
            .domain([0, viewportWidth])
            .range([0, viewportWidth]);

        let legendZoom: Zoom<any> = zoom()
            .scaleExtent([1, 1]) // disable scaling
            .x(xscale)
            .on("zoom", () => {
                // horizontal pan is valid only in case the legend items width are bigger than the viewport width
                if ($(legendTable[0]).width() > viewportWidth) {
                    let t: number[] = legendZoom.translate();
                    let tx: number = t[0];
                    let ty: number = t[1];

                    tx = Math.min(tx, 0);
                    tx = Math.max(tx, viewportWidth - $(legendTable[0]).width());
                    legendZoom.translate([tx, ty]);

                    legendTable.style("-ms-transform", () => { /* IE 9 */
                        return translateXWithPixels(tx);
                    });

                    legendTable.style("-webkit-transform", () => { /* Safari */
                        return translateXWithPixels(tx);
                    });

                    legendTable.style("transform", () => {
                        return translateXWithPixels(tx);
                    });
                }
            });

        if (this.legendContainerDiv) {
            this.legendContainerDiv.call(legendZoom);
        } else {
            legendTable.call(legendZoom);
        }
    }
}
