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

import powerbi from "powerbi-visuals-api";
import { Point } from "powerbi-visuals-utils-svgutils";
import { interactivitySelectionService } from "powerbi-visuals-utils-interactivityutils";

import SelectableDataPoint = interactivitySelectionService.SelectableDataPoint;

export enum LegendPosition {
    Top,
    Bottom,
    Right,
    Left,
    None,
    TopCenter,
    BottomCenter,
    RightCenter,
    LeftCenter,
}

export interface LegendPosition2D {
    textPosition?: Point;
    glyphPosition?: Point;
}

export enum MarkerShape {
    circle = "circle",
    square = "square",
    longDash = "longDash",
}

export enum LineStyle {
    dashed = "dashed",
    solid = "solid",
    dotted = "dotted",
    dotdash = "dotdash",
    dashdot = "dashdot",
}

export interface LegendDataPoint extends SelectableDataPoint, LegendPosition2D {
    label: string;
    color: string;
    category?: string;
    measure?: any;
    iconOnlyOnLabel?: boolean;
    tooltip?: string;
    layerNumber?: number;
    lineStyle?: LineStyle;
    markerShape?: MarkerShape;
}

export interface LegendData {
    title?: string;
    dataPoints: LegendDataPoint[];
    grouped?: boolean;
    labelColor?: string;
    fontSize?: number;
    fontFamily?: string;
}

export const legendProps = {
    show: "show",
    position: "position",
    titleText: "titleText",
    showTitle: "showTitle",
    labelColor: "labelColor",
    fontSize: "fontSize",
};

export interface ILegend {
    getMargins(): powerbi.IViewport;

    isVisible(): boolean;
    changeOrientation(orientation: LegendPosition): void;
    getOrientation(): LegendPosition;
    drawLegend(data: LegendData, viewport: powerbi.IViewport);
    /**
     * Reset the legend by clearing it
     */
    reset(): void;
}
