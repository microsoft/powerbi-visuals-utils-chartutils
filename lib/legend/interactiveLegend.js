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
// powerbi.extensibility.utils.formatting
import { textUtil } from "powerbi-visuals-utils-formattingutils";
import { manipulation } from "powerbi-visuals-utils-svgutils";
import { LegendPosition } from "./legendInterfaces";
import { select, zoom } from "d3-selection";
import { linear } from "d3-scale";
// powerbi.extensibility.utils.svg
var translateXWithPixels = manipulation.translateXWithPixels;
export class InteractiveLegend {
    constructor(element) {
        this.legendContainerParent = select(element);
    }
    getMargins() {
        return {
            height: InteractiveLegend.LegendHeight,
            width: 0
        };
    }
    drawLegend(legendData) {
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
    reset() {
        if (this.legendContainerDiv) {
            this.legendContainerDiv.remove();
            this.legendContainerDiv = null;
        }
    }
    isVisible() {
        return true;
    }
    /**
     * Not supported
     */
    changeOrientation(orientation) { }
    getOrientation() {
        return LegendPosition.Top;
    }
    /**
     * Draw the legend title
     */
    drawTitle(data) {
        let titleDiv = this.legendContainerDiv.selectAll(`div.${InteractiveLegend.LegendTitleClass}`), item = titleDiv.data([data[0]]);
        // Enter
        let itemEnter = item.enter(), titleDivEnter = itemEnter
            .append("div")
            .attr("class", InteractiveLegend.LegendTitleClass);
        titleDivEnter
            .filter((d) => d.iconOnlyOnLabel)
            .append("span")
            .attr("class", InteractiveLegend.legendIconClass)
            .html(InteractiveLegend.legendPlaceSelector);
        titleDivEnter.append("span");
        // Update
        item.filter((d) => d.iconOnlyOnLabel)
            .select("span." + InteractiveLegend.legendIconClass)
            .style(InteractiveLegend.legendColorCss, (d) => d.color);
        item.select("span:last-child").text((d) => d.category);
    }
    /**
     * Draw the legend items
     */
    drawLegendItems(data) {
        // Add Mesaures - the items of the category in the legend
        this.ensureLegendTableCreated();
        let dataPointsMatrix = [data];
        let legendItemsContainer = this.legendContainerDiv
            .select("tbody")
            .selectAll("tr")
            .data(dataPointsMatrix);
        // Enter
        let legendItemsEnter = legendItemsContainer.enter(), rowEnter = legendItemsEnter.append("tr");
        let cellEnter = rowEnter
            .selectAll("td")
            .data((d) => d, (d) => d.label)
            .enter()
            .append("td")
            .attr("class", InteractiveLegend.LegendItem);
        let cellSpanEnter = cellEnter.append("span");
        cellSpanEnter.filter((d) => !d.iconOnlyOnLabel)
            .append("span")
            .html(InteractiveLegend.legendPlaceSelector)
            .attr("class", InteractiveLegend.legendIconClass)
            .attr("white-space", "nowrap")
            .style({
            "font-size": "20px",
            "margin-bottom": "7px"
        });
        cellSpanEnter
            .append("span")
            .attr("class", InteractiveLegend.legendItemNameClass);
        cellSpanEnter
            .append("span")
            .attr("class", InteractiveLegend.legendItemMeasureClass);
        // Update
        let legendCells = legendItemsContainer
            .selectAll("td")
            .data((d) => d, (d) => d.label);
        legendCells
            .select(`span.${InteractiveLegend.legendItemNameClass}`)
            .html((d) => textUtil.removeBreakingSpaces(d.label));
        legendCells
            .select(`span.${InteractiveLegend.legendItemMeasureClass}`)
            .html((d) => `&nbsp;${d.measure}`);
        legendCells
            .select("span." + InteractiveLegend.legendIconClass)
            .style("color", (d) => d.color);
        // Exit
        legendCells
            .exit()
            .remove();
    }
    /**
     * Ensure legend table is created and set horizontal pan gestures on it
     */
    ensureLegendTableCreated() {
        if (this.legendContainerDiv.select("div table").empty()) {
            let legendTable = this.legendContainerDiv
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
    setPanGestureOnLegend(legendTable) {
        let parentNode = this.legendContainerParent.node();
        let viewportWidth = parentNode.getBoundingClientRect().width;
        let xscale = linear()
            .domain([0, viewportWidth])
            .range([0, viewportWidth]);
        let legendZoom = zoom()
            .scaleExtent([1, 1]) // disable scaling
            .x(xscale)
            .on("zoom", () => {
            // horizontal pan is valid only in case the legend items width are bigger than the viewport width
            if ($(legendTable[0]).width() > viewportWidth) {
                let t = legendZoom.translate();
                let tx = t[0];
                let ty = t[1];
                tx = Math.min(tx, 0);
                tx = Math.max(tx, viewportWidth - $(legendTable[0]).width());
                legendZoom.translate([tx, ty]);
                legendTable.style("-ms-transform", () => {
                    return translateXWithPixels(tx);
                });
                legendTable.style("-webkit-transform", () => {
                    return translateXWithPixels(tx);
                });
                legendTable.style("transform", () => {
                    return translateXWithPixels(tx);
                });
            }
        });
        if (this.legendContainerDiv) {
            this.legendContainerDiv.call(legendZoom);
        }
        else {
            legendTable.call(legendZoom);
        }
    }
}
InteractiveLegend.LegendHeight = 70;
InteractiveLegend.LegendContainerClass = "interactive-legend";
InteractiveLegend.LegendContainerSelector = ".interactive-legend";
InteractiveLegend.LegendTitleClass = "title";
InteractiveLegend.LegendItem = "item";
InteractiveLegend.legendPlaceSelector = "\u25CF";
InteractiveLegend.legendIconClass = "icon";
InteractiveLegend.legendColorCss = "color";
InteractiveLegend.legendItemNameClass = "itemName";
InteractiveLegend.legendItemMeasureClass = "itemMeasure";
//# sourceMappingURL=interactiveLegend.js.map