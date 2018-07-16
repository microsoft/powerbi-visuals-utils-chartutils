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

module powerbi.extensibility.utils.chart.legend {
    // powerbi.extensibility.utils.svg
    import Point = powerbi.extensibility.utils.svg.Point;

    // powerbi.extensibility.utils.interactivity
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;

    export enum LegendIcon {
        Box,
        Circle,
        Line
    }

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

    export interface LegendDataPoint extends SelectableDataPoint, LegendPosition2D {
        label: string;
        color: string;
        icon: LegendIcon;
        category?: string;
        measure?: any;
        iconOnlyOnLabel?: boolean;
        tooltip?: string;
        layerNumber?: number;
    }

    export interface LegendData {
        title?: string;
        dataPoints: LegendDataPoint[];
        grouped?: boolean;
        labelColor?: string;
        fontSize?: number;
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
        getMargins(): IViewport;

        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        drawLegend(data: LegendData, viewport: IViewport);
        /**
         * Reset the legend by clearing it
         */
        reset(): void;
    }
}
