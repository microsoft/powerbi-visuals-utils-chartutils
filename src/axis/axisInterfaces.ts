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

module powerbi.extensibility.utils.chart.axis {
    // powerbi
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

    // powerbi.extensibility.utils.formatting
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;

    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import PrimitiveValue = powerbi.extensibility.utils.type.PrimitiveType;

    export interface IMargin {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }

    export interface CartesianAxisProperties {
        x: IAxisProperties;
        xStack?: IStackedAxisProperties[];
        y1: IAxisProperties;
        y2?: IAxisProperties;
    }

    export interface AxisHelperCategoryDataPoint {
        categoryValue: any;
        value?: any;
        highlight?: boolean;
        categoryIndex?: number;
    }

    export interface AxisHelperSeries {
        data: AxisHelperCategoryDataPoint[];
    }

    export interface IAxisProperties {
        /**
         * The D3 Scale object.
         */
        scale: any;
        /**
         * The D3 Axis object.
         */
        axis: d3.svg.Axis;
        /**
         * An array of the tick values to display for this axis.
         */
        values: any[];
        /**
         * The ValueType of the column used for this axis.
         */
        axisType: ValueType;
        /**
         * A formatter with appropriate properties configured for this field.
         */
        formatter: IValueFormatter;
        /**
         * The axis title label.
         */
        axisLabel: string;
        /**
         * Cartesian axes are either a category or value axis.
         */
        isCategoryAxis: boolean;
        /**
         * (optional) The max width for category tick label values. used for ellipsis truncation / label rotation.
         */
        xLabelMaxWidth?: number;
        /**
         * (optional) The max width for each category tick label values. used for ellipsis truncation / label rotation. Used by hierarchy categories that have varying widths.
         */
        xLabelMaxWidths?: number[];
        /**
         * (optional) The thickness of each category on the axis.
         */
        categoryThickness?: number;
        /**
         * (optional) The outer padding in pixels applied to the D3 scale.
         */
        outerPadding?: number;
        /**
         * (optional) Whether we are using a default domain.
         */
        usingDefaultDomain?: boolean;
        /**
         * (optional) do default d3 axis labels fit?
         */
        willLabelsFit?: boolean;
        /**
         * (optional) word break axis labels
         */
        willLabelsWordBreak?: boolean;
        /**
         * (optional) Whether log scale is possible on the current domain.
         */
        isLogScaleAllowed?: boolean;
        /**
         * (optional) Whether domain contains zero value and log scale is enabled.
         */
        hasDisallowedZeroInDomain?: boolean;
        /**
         *(optional) The original data domain. Linear scales use .nice() to round to cleaner edge values. Keep the original data domain for later.
         */
        dataDomain?: number[];
        /**
         * (optional) The D3 graphics context for this axis
         */
        graphicsContext?: d3.Selection<any>;
    }

    export interface IStackedAxisLineStyleInfo {
        // levelIndex: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        stroke?: string;
        strokeWidth?: number;
    }

    export interface IStackedAxisPlaceholder {
        placeholder: boolean;
    }

    export type IStackedAxisValue = PrimitiveValue | IStackedAxisPlaceholder;

    export interface IStackedAxisProperties extends IAxisProperties {
        /**
         * level 0 is the "leaf" level, closest to the plot area.
         */
        levelIndex: number;
        /**
         * levelSize: height for x-axis (column chart), width for y-axis (bar chart)
         */
        levelSize: number;
        /**
         * arrays that we can use to bind to D3 using .enter.data(arr) for styling the axis ticks
         */
        lineStyleInfo: IStackedAxisLineStyleInfo[][];

        /**
         * Values for the stacked axis
         */
        values: IStackedAxisValue[];

        /**
         * Values adjusted to align with the current viewport
         */
        adjustedValues: IStackedAxisValue[];
    }

    export interface CreateAxisOptions {
        /**
         * The dimension length for the axis, in pixels.
         */
        pixelSpan: number;
        /**
         * The data domain. [min, max] for a scalar axis, or [1...n] index array for ordinal.
         */
        dataDomain: number[];
        /**
         * If the scalar number domain is [0,0] use this one instead
         */
        zeroScalarDomain?: number[];
        /**
         * The DataViewMetadataColumn will be used for dataType and tick value formatting.
         */
        metaDataColumn: DataViewMetadataColumn; // TODO: remove this, we should just be passing in the formatString and the ValueType, not this DataView-specific object
        /**
         * The format string.
         */
        formatString: string;
        /**
         * outerPadding to be applied to the axis.
         */
        outerPadding: number;
        /**
         * Indicates if this is the category axis.
         */
        isCategoryAxis?: boolean;
        /**
         * If true and the dataType is numeric or dateTime,
         * create a linear axis, else create an ordinal axis.
         */
        isScalar?: boolean;
        /**
         * (optional) The scale is inverted for a vertical axis,
         * and different optimizations are made for tick labels.
         */
        isVertical?: boolean;
        /**
         * (optional) For visuals that do not need zero (e.g. column/bar) use tickInterval.
         */
        useTickIntervalForDisplayUnits?: boolean;
        /**
         * (optional) Combo charts can override the tick count to
         * align y1 and y2 grid lines.
         */
        forcedTickCount?: number;
        /**
         * (optional) For scalar axis with scalar keys, the number of ticks should never exceed the number of scalar keys,
         * or labeling will look wierd (i.e. level of detail is Year, but month labels are shown between years)
         */
        maxTickCount?: number;
        /**
         * (optional) Callback for looking up actual values from indices,
         * used when formatting tick labels.
         */
        getValueFn?: (index: number, dataType: ValueType) => any;
        /**
         * (optional) The width/height of each category on the axis.
         */
        categoryThickness?: number;
        /** (optional) the scale type of the axis. e.g. log, linear */
        scaleType?: string;
        /** (optional) user selected display units */
        axisDisplayUnits?: number;
        /** (optional) user selected precision */
        axisPrecision?: number;
        /** (optional) for 100 percent stacked charts, causes formatString override and minTickInterval adjustments */
        is100Pct?: boolean;
        /** (optional) sets clamping on the D3 scale, useful for drawing column chart rectangles as it simplifies the math during layout */
        shouldClamp?: boolean;
        /** (optional) Disable "niceing" for numeric axis. It means that if max value is 172 the axis will show 172 but not rounded to upper value 180 */
        disableNice?: boolean;
        /** (optional) Disable "niceing" for numeric axis. Disabling nice will be applid only when creating scale obj (bestTickCount will be applied to 'ticks' method) */
        disableNiceOnlyForScale?: boolean;
        /** (optional) InnerPadding to be applied to the axis.*/
        innerPadding?: number;
        /** (optioanl) Apply for using of RangePoints function instead of RangeBands inside CreateOrdinal scale function.*/
        useRangePoints?: boolean;
    }

    export enum AxisOrientation {
        // Names of these enums match the values passed into axis.orient([orientation])
        top,
        bottom,
        left,
        right
    }

    export interface CreateStackedAxisOptions {
        axis: d3.svg.Axis;
        scale: d3.scale.Linear<any, any>;
        innerTickSize?: number;
        outerTickSize?: number;
        orient?: AxisOrientation;
        tickFormat: (datumIndex: number) => any;
    }

    export interface CreateScaleResult {
        scale: d3.scale.Linear<any, any>;
        bestTickCount: number;
        usingDefaultDomain?: boolean;
    }

    export interface TickLabelMargins {
        xMax: number;
        yLeft: number;
        yRight: number;
        stackHeight?: number; // the height of each stacked hierarchy level that is not the leaf (the leaf can be rotated 90)
    }
}
