/// <reference types="d3" />
declare module powerbi.extensibility.utils.chart.axis.scale {
    const linear: string;
    const log: string;
}
declare module powerbi.extensibility.utils.chart.axis.style {
    const showBoth: string;
    const showTitleOnly: string;
    const showUnitOnly: string;
}
declare module powerbi.extensibility.utils.chart.axis {
    interface ValueRange<T> {
        min?: T;
        max?: T;
    }
    /** Defines the acceptable values of a number. */
    type NumberRange = ValueRange<number>;
}
declare module powerbi.extensibility.utils.chart.axis {
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import PrimitiveValue = powerbi.extensibility.utils.type.PrimitiveType;
    interface IMargin {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    interface CartesianAxisProperties {
        x: IAxisProperties;
        xStack?: IStackedAxisProperties[];
        y1: IAxisProperties;
        y2?: IAxisProperties;
    }
    interface AxisHelperCategoryDataPoint {
        categoryValue: any;
        value?: any;
        highlight?: boolean;
        categoryIndex?: number;
    }
    interface AxisHelperSeries {
        data: AxisHelperCategoryDataPoint[];
    }
    interface IAxisProperties {
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
    interface IStackedAxisLineStyleInfo {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        stroke?: string;
        strokeWidth?: number;
    }
    interface IStackedAxisPlaceholder {
        placeholder: boolean;
    }
    type IStackedAxisValue = PrimitiveValue | IStackedAxisPlaceholder;
    interface IStackedAxisProperties extends IAxisProperties {
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
    interface CreateAxisOptions {
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
        metaDataColumn: DataViewMetadataColumn;
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
    enum AxisOrientation {
        top = 0,
        bottom = 1,
        left = 2,
        right = 3,
    }
    interface CreateStackedAxisOptions {
        axis: d3.svg.Axis;
        scale: d3.scale.Linear<any, any>;
        innerTickSize?: number;
        outerTickSize?: number;
        orient?: AxisOrientation;
        tickFormat: (datumIndex: number) => any;
    }
    interface CreateScaleResult {
        scale: d3.scale.Linear<any, any>;
        bestTickCount: number;
        usingDefaultDomain?: boolean;
    }
    interface TickLabelMargins {
        xMax: number;
        yLeft: number;
        yRight: number;
        stackHeight?: number;
    }
}
declare module powerbi.extensibility.utils.chart.axis {
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import ITextAsSVGMeasurer = powerbi.extensibility.utils.formatting.ITextAsSVGMeasurer;
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    /**
     * Default ranges are for when we have a field chosen for the axis,
     * but no values are returned by the query.
     */
    const emptyDomain: number[];
    const stackedAxisPadding = 5;
    function getRecommendedNumberOfTicksForXAxis(availableWidth: number): 3 | 5 | 8;
    function getRecommendedNumberOfTicksForYAxis(availableWidth: number): 3 | 5 | 8;
    /**
     * Get the best number of ticks based on minimum value, maximum value,
     * measure metadata and max tick count.
     *
     * @param min The minimum of the data domain.
     * @param max The maximum of the data domain.
     * @param valuesMetadata The measure metadata array.
     * @param maxTickCount The max count of intervals.
     * @param isDateTime - flag to show single tick when min is equal to max.
     */
    function getBestNumberOfTicks(min: number, max: number, valuesMetadata: DataViewMetadataColumn[], maxTickCount: number, isDateTime?: boolean): number;
    function hasNonIntegerData(valuesMetadata: DataViewMetadataColumn[]): boolean;
    function getRecommendedTickValues(maxTicks: number, scale: d3.scale.Linear<number, number> | d3.scale.Ordinal<any, any>, axisType: ValueType, isScalar: boolean, minTickInterval?: number): any[];
    function getRecommendedTickValuesForAnOrdinalRange(maxTicks: number, labels: string[]): string[];
    function getRecommendedTickValuesForAQuantitativeRange(maxTicks: number, scale: d3.scale.Linear<any, any>, minInterval?: number): number[];
    function getMargin(availableWidth: number, availableHeight: number, xMargin: number, yMargin: number): IMargin;
    function getTickLabelMargins(viewport: IViewport, yMarginLimit: number, textWidthMeasurer: ITextAsSVGMeasurer, textHeightMeasurer: ITextAsSVGMeasurer, axes: CartesianAxisProperties, bottomMarginLimit: number, properties: TextProperties, scrollbarVisible?: boolean, showOnRight?: boolean, renderXAxis?: boolean, renderY1Axis?: boolean, renderY2Axis?: boolean): TickLabelMargins;
    function columnDataTypeHasValue(dataType: ValueTypeDescriptor): boolean;
    function createOrdinalType(): ValueType;
    function isOrdinal(dataType: ValueTypeDescriptor): boolean;
    function isOrdinalScale(scale: any): scale is d3.scale.Ordinal<any, any>;
    function isDateTime(dataType: ValueTypeDescriptor): boolean;
    function invertScale(scale: any, x: any): any;
    function extent(scale: any): number[];
    /**
     * Uses the D3 scale to get the actual category thickness.
     * @return The difference between the 1st and 2nd items in the range if there are 2 or more items in the range.
     * Otherwise, the length of the entire range.
     */
    function getCategoryThickness(scale: any): number;
    /**
     * Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
     * Otherwise, it returns the greatest item in scale.domain() that's <= x.
     */
    function invertOrdinalScale(scale: d3.scale.Ordinal<any, any>, x: number): any;
    function findClosestXAxisIndex(categoryValue: number, categoryAxisValues: AxisHelperCategoryDataPoint[]): number;
    function lookupOrdinalIndex(scale: d3.scale.Ordinal<any, any>, pixelValue: number): number;
    /** scale(value1) - scale(value2) with zero checking and min(+/-1, result) */
    function diffScaled(scale: d3.scale.Linear<any, any>, value1: any, value2: any): number;
    function createDomain(data: any[], axisType: ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: NumberRange): number[];
    function ensureValuesInRange(values: number[], min: number, max: number): number[];
    /**
     * Gets the ValueType of a category column, defaults to Text if the type is not present.
     */
    function getCategoryValueType(metadataColumn: DataViewMetadataColumn, isScalar?: boolean): ValueType;
    /**
     * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
     * @param options The properties used to create the axis.
     */
    function createAxis(options: CreateAxisOptions): IAxisProperties;
    /**
     * Creates a D3 axis for stacked axis usage. `options.innerTickSize` and `options.outerTickSize` will be defaulted to 0 if not set.
     * `options.orientation` will be defaulted to "bottom" if not specified.
     */
    function createStackedAxis(options: CreateStackedAxisOptions): d3.svg.Axis;
    function createScale(options: CreateAxisOptions): CreateScaleResult;
    function normalizeInfinityInScale(scale: d3.scale.Linear<any, any>): void;
    function createFormatter(scaleDomain: any[], dataDomain: any[], dataType: any, isScalar: boolean, formatString: string, bestTickCount: number, tickValues: any[], getValueFn: any, useTickIntervalForDisplayUnits?: boolean, axisDisplayUnits?: number, axisPrecision?: number): IValueFormatter;
    function calculateAxisPrecision(tickValue0: number, tickValue1: number, axisDisplayUnits: number, formatString?: string): number;
    function getMinTickValueInterval(formatString: string, columnType: ValueType, is100Pct?: boolean): number;
    /**
     * Creates a [min,max] from your Cartiesian data values.
     *
     * @param data The series array of CartesianDataPoints.
     * @param includeZero Columns and bars includeZero, line and scatter do not.
     */
    function createValueDomain(data: AxisHelperSeries[], includeZero: boolean): number[];
    module LabelLayoutStrategy {
        function willLabelsFit(axisProperties: IAxisProperties, availableWidth: number, textMeasurer: ITextAsSVGMeasurer, properties: TextProperties): boolean;
        function willLabelsWordBreak(axisProperties: IAxisProperties, margin: IMargin, availableWidth: number, textWidthMeasurer: ITextAsSVGMeasurer, textHeightMeasurer: ITextAsSVGMeasurer, textTruncator: (properties: TextProperties, maxWidth: number) => string, properties: TextProperties): boolean;
        const DefaultRotation: {
            sine: number;
            cosine: number;
            tangent: number;
            transform: string;
            dy: string;
        };
        const DefaultRotationWithScrollbar: {
            sine: number;
            cosine: number;
            tangent: number;
            transform: string;
            dy: string;
        };
        const DefaultRotationWithScrollbarTickSizeZero: {
            sine: number;
            cosine: number;
            tangent: number;
            transform: string;
            dy: string;
        };
        /**
         * Perform rotation and/or truncation of axis tick labels (SVG text) with ellipsis
         */
        function rotate(labelSelection: d3.Selection<any>, maxBottomMargin: number, textTruncator: (properties: TextProperties, maxWidth: number) => string, textProperties: TextProperties, needRotate: boolean, needEllipsis: boolean, axisProperties: IAxisProperties, margin: IMargin, scrollbarVisible: boolean): void;
        function wordBreak(text: d3.Selection<any>, axisProperties: IAxisProperties, maxHeight: number): void;
        function clip(text: d3.Selection<any>, availableWidth: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void): void;
    }
    function createOrdinalScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio?: number, innerPaddingRatio?: number, useRangePoints?: boolean): d3.scale.Ordinal<any, any>;
    function isLogScalePossible(domain: any[], axisType?: ValueType): boolean;
    function createNumericalScale(axisScaleType: string, pixelSpan: number, dataDomain: any[], dataType: ValueType, outerPadding?: number, niceCount?: number, shouldClamp?: boolean): d3.scale.Linear<any, any>;
    function createLinearScale(pixelSpan: number, dataDomain: any[], outerPadding?: number, niceCount?: number, shouldClamp?: boolean): d3.scale.Linear<any, any>;
    function getRangeForColumn(sizeColumn: DataViewValueColumn): NumberRange;
    /**
     * Set customized domain, but don't change when nothing is set
     */
    function applyCustomizedDomain(customizedDomain: any, forcedDomain: any[]): any[];
    /**
     * Combine the forced domain with the actual domain if one of the values was set.
     * The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.
     */
    function combineDomain(forcedDomain: any[], domain: any[], ensureDomain?: NumberRange): any[];
    function createAxisLabel(properties: DataViewObject, label: string, unitType: string, y2?: boolean): string;
    function scaleShouldClamp(combinedDomain: any[], domain: any[]): boolean;
    function normalizeNonFiniteNumber(value: PrimitiveValue): number;
    /**
     * Indicates whether the number is power of 10.
     */
    function powerOfTen(d: any): boolean;
}
declare module powerbi.extensibility.utils.chart.legend {
    import Point = powerbi.extensibility.utils.svg.Point;
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    enum LegendIcon {
        Box = 0,
        Circle = 1,
        Line = 2,
    }
    enum LegendPosition {
        Top = 0,
        Bottom = 1,
        Right = 2,
        Left = 3,
        None = 4,
        TopCenter = 5,
        BottomCenter = 6,
        RightCenter = 7,
        LeftCenter = 8,
    }
    interface LegendPosition2D {
        textPosition?: Point;
        glyphPosition?: Point;
    }
    interface LegendDataPoint extends SelectableDataPoint, LegendPosition2D {
        label: string;
        color: string;
        icon: LegendIcon;
        category?: string;
        measure?: any;
        iconOnlyOnLabel?: boolean;
        tooltip?: string;
        layerNumber?: number;
    }
    interface LegendData {
        title?: string;
        dataPoints: LegendDataPoint[];
        grouped?: boolean;
        labelColor?: string;
        fontSize?: number;
    }
    const legendProps: {
        show: string;
        position: string;
        titleText: string;
        showTitle: string;
        labelColor: string;
        fontSize: string;
    };
    interface ILegend {
        getMargins(): IViewport;
        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        drawLegend(data: LegendData, viewport: IViewport): any;
        /**
         * Reset the legend by clearing it
         */
        reset(): void;
    }
}
declare module powerbi.extensibility.utils.chart.legend {
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import ISelectionHandler = powerbi.extensibility.utils.interactivity.ISelectionHandler;
    interface LegendBehaviorOptions {
        legendItems: d3.Selection<any>;
        legendIcons: d3.Selection<any>;
        clearCatcher: d3.Selection<any>;
    }
    class LegendBehavior implements IInteractiveBehavior {
        static dimmedLegendColor: string;
        private legendIcons;
        bindEvents(options: LegendBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
}
declare module powerbi.extensibility.utils.chart.legend.position {
    const top: string;
    const bottom: string;
    const left: string;
    const right: string;
    const topCenter: string;
    const bottomCenter: string;
    const leftCenter: string;
    const rightCenter: string;
}
declare module powerbi.extensibility.utils.chart.legend {
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    function createLegend(legendParentElement: HTMLElement, interactive: boolean, interactivityService: IInteractivityService, isScrollable?: boolean, legendPosition?: LegendPosition): ILegend;
    function isLeft(orientation: LegendPosition): boolean;
    function isTop(orientation: LegendPosition): boolean;
    function positionChartArea(chartArea: d3.Selection<any>, legend: ILegend): void;
}
declare module powerbi.extensibility.utils.chart.legend.data {
    const DefaultLegendLabelFillColor: string;
    function update(legendData: LegendData, legendObject: DataViewObject): void;
}
declare module powerbi.extensibility.utils.chart.legend {
    class InteractiveLegend implements ILegend {
        private static LegendHeight;
        private static LegendContainerClass;
        private static LegendContainerSelector;
        private static LegendTitleClass;
        private static LegendItem;
        private static legendPlaceSelector;
        private static legendIconClass;
        private static legendColorCss;
        private static legendItemNameClass;
        private static legendItemMeasureClass;
        private legendContainerParent;
        private legendContainerDiv;
        constructor(element: HTMLElement);
        getMargins(): IViewport;
        drawLegend(legendData: LegendData): void;
        reset(): void;
        isVisible(): boolean;
        /**
         * Not supported
         */
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        /**
         * Draw the legend title
         */
        private drawTitle(data);
        /**
         * Draw the legend items
         */
        private drawLegendItems(data);
        /**
         * Ensure legend table is created and set horizontal pan gestures on it
         */
        private ensureLegendTableCreated();
        /**
         * Set Horizontal Pan gesture for the legend
         */
        private setPanGestureOnLegend(legendTable);
    }
}
declare module powerbi.extensibility.utils.chart.legend {
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    class SVGLegend implements ILegend {
        private orientation;
        private viewport;
        private parentViewport;
        private svg;
        private group;
        private clearCatcher;
        private element;
        private interactivityService;
        private legendDataStartIndex;
        private arrowPosWindow;
        private data;
        private isScrollable;
        private lastCalculatedWidth;
        private visibleLegendWidth;
        private visibleLegendHeight;
        private legendFontSizeMarginDifference;
        private legendFontSizeMarginValue;
        static DefaultFontSizeInPt: number;
        private static LegendIconRadius;
        private static LegendIconRadiusFactor;
        private static MaxTextLength;
        private static TextAndIconPadding;
        private static TitlePadding;
        private static LegendEdgeMariginWidth;
        private static LegendMaxWidthFactor;
        private static TopLegendHeight;
        private static DefaultTextMargin;
        private static LegendIconYRatio;
        private static LegendArrowOffset;
        private static LegendArrowHeight;
        private static LegendArrowWidth;
        private static DefaultFontFamily;
        private static DefaultTitleFontFamily;
        private static LegendItem;
        private static LegendText;
        private static LegendIcon;
        private static LegendTitle;
        private static NavigationArrow;
        constructor(element: HTMLElement, legendPosition: LegendPosition, interactivityService: IInteractivityService, isScrollable: boolean);
        private updateLayout();
        private calculateViewport();
        getMargins(): IViewport;
        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        drawLegend(data: LegendData, viewport: IViewport): void;
        drawLegendInternal(data: LegendData, viewport: IViewport, autoWidth: boolean): void;
        private normalizePosition(points);
        private calculateTitleLayout(title);
        /** Performs layout offline for optimal perfomance */
        private calculateLayout(data, autoWidth);
        private updateNavigationArrowLayout(navigationArrows, remainingDataLength, visibleDataLength);
        private calculateHorizontalNavigationArrowsLayout(title);
        private calculateVerticalNavigationArrowsLayout(title);
        /**
         * Calculates the widths for each horizontal legend item.
         */
        private static calculateHorizontalLegendItemsWidths(dataPoints, availableWidth, iconPadding, fontSize);
        private calculateHorizontalLayout(dataPoints, title, navigationArrows);
        private calculateVerticalLayout(dataPoints, title, navigationArrows, autoWidth);
        private drawNavigationArrows(layout);
        private isTopOrBottom(orientation);
        private isCentered(orientation);
        reset(): void;
        private static getTextProperties(isTitle, text?, fontSize?);
        private setTooltipToLegendItems(data);
    }
}
declare module powerbi.extensibility.utils.chart.dataLabel {
    import IPoint = powerbi.extensibility.utils.svg.shapes.IPoint;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    /** Defines possible content positions.  */
    enum ContentPositions {
        /** Content position is not defined. */
        None = 0,
        /** Content aligned top left. */
        TopLeft = 1,
        /** Content aligned top center. */
        TopCenter = 2,
        /** Content aligned top right. */
        TopRight = 4,
        /** Content aligned middle left. */
        MiddleLeft = 8,
        /** Content aligned middle center. */
        MiddleCenter = 16,
        /** Content aligned middle right. */
        MiddleRight = 32,
        /** Content aligned bottom left. */
        BottomLeft = 64,
        /** Content aligned bottom center. */
        BottomCenter = 128,
        /** Content aligned bottom right. */
        BottomRight = 256,
        /** Content is placed inside the bounding rectangle in the center. */
        InsideCenter = 512,
        /** Content is placed inside the bounding rectangle at the base. */
        InsideBase = 1024,
        /** Content is placed inside the bounding rectangle at the end. */
        InsideEnd = 2048,
        /** Content is placed outside the bounding rectangle at the base. */
        OutsideBase = 4096,
        /** Content is placed outside the bounding rectangle at the end. */
        OutsideEnd = 8192,
        /** Content supports all possible positions. */
        All = 16383,
    }
    /**
     * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
     * and starting/ending side of the rectangle.
     */
    enum RectOrientation {
        /** Rectangle with no specific orientation. */
        None = 0,
        /** Vertical rectangle with base at the bottom. */
        VerticalBottomTop = 1,
        /** Vertical rectangle with base at the top. */
        VerticalTopBottom = 2,
        /** Horizontal rectangle with base at the left. */
        HorizontalLeftRight = 3,
        /** Horizontal rectangle with base at the right. */
        HorizontalRightLeft = 4,
    }
    /**
     * Defines if panel elements are allowed to be positioned
     * outside of the panel boundaries.
     */
    enum OutsidePlacement {
        /** Elements can be positioned outside of the panel. */
        Allowed = 0,
        /** Elements can not be positioned outside of the panel. */
        Disallowed = 1,
        /** Elements can be partially outside of the panel. */
        Partial = 2,
    }
    /**
     * Defines an interface for information needed for default label positioning. Used in DataLabelsPanel.
     * Note the question marks: none of the elements are mandatory.
     */
    interface IDataLabelSettings {
        /** Distance from the anchor point. */
        anchorMargin?: number;
        /** Orientation of the anchor rectangle. */
        anchorRectOrientation?: RectOrientation;
        /** Preferable position for the label.  */
        contentPosition?: ContentPositions;
        /** Defines the rules if the elements can be positioned outside panel bounds. */
        outsidePlacement?: OutsidePlacement;
        /** Defines the valid positions if repositionOverlapped is true. */
        validContentPositions?: ContentPositions;
        /** Defines maximum moving distance to reposition an element. */
        minimumMovingDistance?: number;
        /** Defines minimum moving distance to reposition an element. */
        maximumMovingDistance?: number;
        /** Opacity effect of the label. Use it for dimming.  */
        opacity?: number;
    }
    /**
     * Defines an interface for information needed for label positioning.
     * None of the elements are mandatory, but at least anchorPoint OR anchorRect is needed.
     */
    interface IDataLabelInfo extends IDataLabelSettings {
        /** The point to which label is anchored.  */
        anchorPoint?: IPoint;
        /** The rectangle to which label is anchored. */
        anchorRect?: IRect;
        /** Disable label rendering and processing. */
        hideLabel?: boolean;
        /**
         * Defines the visibility rank. This will not be processed by arrange phase,
         * but can be used for preprocessing the hideLabel value.
         */
        visibilityRank?: number;
        /** Defines the starting offset from AnchorRect. */
        offset?: number;
        /** Defines the callout line data. It is calculated and used during processing. */
        callout?: {
            start: IPoint;
            end: IPoint;
        };
        /** Source of the label. */
        source?: any;
        size?: ISize;
    }
    /**  Interface for label rendering. */
    interface IDataLabelRenderer {
        renderLabelArray(labels: IArrangeGridElementInfo[]): void;
    }
    /** Interface used in internal arrange structures. */
    interface IArrangeGridElementInfo {
        element: IDataLabelInfo;
        rect: IRect;
    }
    module labelStyle {
        const category: string;
        const data: string;
        const both: string;
    }
    enum PointLabelPosition {
        Above = 0,
        Below = 1,
    }
    interface PointDataLabelsSettings extends VisualDataLabelsSettings {
        position: PointLabelPosition;
    }
    interface LabelFormattedTextOptions {
        label: any;
        maxWidth?: number;
        format?: string;
        formatter?: IValueFormatter;
        fontSize?: number;
    }
    interface VisualDataLabelsSettings {
        show: boolean;
        showLabelPerSeries?: boolean;
        isSeriesExpanded?: boolean;
        displayUnits?: number;
        showCategory?: boolean;
        position?: any;
        precision?: number;
        labelColor: string;
        categoryLabelColor?: string;
        fontSize?: number;
        labelStyle?: any;
    }
    /**
     * Options for setting the labels card on the property pane
     */
    interface VisualDataLabelsSettingsOptions {
        show: boolean;
        instances: VisualObjectInstance[];
        dataLabelsSettings: VisualDataLabelsSettings;
        displayUnits?: boolean;
        precision?: boolean;
        position?: boolean;
        positionObject?: string[];
        selector?: powerbi.data.Selector;
        fontSize?: boolean;
        showAll?: boolean;
        labelDensity?: boolean;
        labelStyle?: boolean;
    }
    interface LabelEnabledDataPoint {
        labelX?: number;
        labelY?: number;
        labelFill?: string;
        labeltext?: string;
        labelFormatString?: string;
        isLabelInside?: boolean;
        labelFontSize?: number;
    }
    interface IColumnFormatterCache {
        [column: string]: IValueFormatter;
        defaultFormatter?: IValueFormatter;
    }
    interface IColumnFormatterCacheManager {
        cache: IColumnFormatterCache;
        getOrCreate: (formatString: string, labelSetting: VisualDataLabelsSettings, value2?: number) => IValueFormatter;
    }
    interface LabelPosition {
        y: (d: any, i: number) => number;
        x: (d: any, i: number) => number;
    }
    interface ILabelLayout {
        labelText: (d: any) => string;
        labelLayout: LabelPosition;
        filter: (d: any) => boolean;
        style: {};
    }
    interface DataLabelObject extends DataViewObject {
        show: boolean;
        color: Fill;
        labelDisplayUnits: number;
        labelPrecision?: number;
        labelPosition: any;
        fontSize?: number;
        showAll?: boolean;
        showSeries?: boolean;
        labelDensity?: string;
        labelStyle?: any;
    }
}
declare module powerbi.extensibility.utils.chart.dataLabel.locationConverter {
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    function topInside(size: ISize, rect: IRect, offset: number): IRect;
    function bottomInside(size: ISize, rect: IRect, offset: number): IRect;
    function rightInside(size: ISize, rect: IRect, offset: number): IRect;
    function leftInside(size: ISize, rect: IRect, offset: number): IRect;
    function topOutside(size: ISize, rect: IRect, offset: number): IRect;
    function bottomOutside(size: ISize, rect: IRect, offset: number): IRect;
    function rightOutside(size: ISize, rect: IRect, offset: number): IRect;
    function leftOutside(size: ISize, rect: IRect, offset: number): IRect;
    function middleHorizontal(size: ISize, rect: IRect, offset: number): IRect;
    function middleVertical(size: ISize, rect: IRect, offset: number): IRect;
}
declare module powerbi.extensibility.utils.chart.dataLabel {
    import IRect = powerbi.extensibility.utils.svg.IRect;
    /**
    * Arranges label elements using the anchor point or rectangle. Collisions
    * between elements can be automatically detected and as a result elements
    * can be repositioned or get hidden.
    */
    class DataLabelManager {
        static DefaultAnchorMargin: number;
        static DefaultMaximumMovingDistance: number;
        static DefaultMinimumMovingDistance: number;
        static InflateAmount: number;
        movingStep: number;
        hideOverlapped: boolean;
        private defaultDataLabelSettings;
        readonly defaultSettings: IDataLabelSettings;
        /** Arranges the lables position and visibility*/
        hideCollidedLabels(viewport: IViewport, data: any[], layout: any, addTransform?: boolean, hideCollidedLabels?: boolean): LabelEnabledDataPoint[];
        /**
         * Merges the label element info with the panel element info and returns correct label info.
         * @param source The label info.
         */
        getLabelInfo(source: IDataLabelInfo): IDataLabelInfo;
        /**
        * (Private) Calculates element position using anchor point..
        */
        private calculateContentPositionFromPoint(anchorPoint, contentPosition, contentSize, offset);
        /** (Private) Calculates element position using anchor rect. */
        private calculateContentPositionFromRect(anchorRect, anchorRectOrientation, contentPosition, contentSize, offset);
        /** (Private) Calculates element inside center position using anchor rect. */
        private handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element inside end position using anchor rect. */
        private handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element inside base position using anchor rect. */
        private handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element outside end position using anchor rect. */
        private handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /** (Private) Calculates element outside base position using anchor rect. */
        private handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
        /**  (Private) Calculates element position. */
        private calculateContentPosition(anchoredElementInfo, contentPosition, contentSize, offset);
        /** (Private) Check for collisions. */
        private hasCollisions(arrangeGrid, info, position, size);
        static isValid(rect: IRect): boolean;
    }
}
declare module powerbi.extensibility.utils.chart.dataLabel {
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    /**
     * Utility class to speed up the conflict detection by collecting the arranged items in the DataLabelsPanel.
     */
    class DataLabelArrangeGrid {
        private grid;
        private cellSize;
        private rowCount;
        private colCount;
        private static ARRANGEGRID_MIN_COUNT;
        private static ARRANGEGRID_MAX_COUNT;
        /**
         * Creates new ArrangeGrid.
         * @param size The available size
         */
        constructor(size: ISize, elements: any[], layout: ILabelLayout);
        /**
         * Register a new label element.
         * @param element The label element to register.
         * @param rect The label element position rectangle.
         */
        add(element: IDataLabelInfo, rect: IRect): void;
        /**
         * Checks for conflict of given rectangle in registered elements.
         * @param rect The rectengle to check.
         * @return True if conflict is detected.
         */
        hasConflict(rect: IRect): boolean;
        /**
         * Calculates the number of rows or columns in a grid
         * @param step is the largest label size (width or height)
         * @param length is the grid size (width or height)
         * @param minCount is the minimum allowed size
         * @param maxCount is the maximum allowed size
         * @return the number of grid rows or columns
         */
        private getGridRowColCount(step, length, minCount, maxCount);
        /**
         * Returns the grid index of a given recangle
         * @param rect The rectengle to check.
         * @return grid index as a thickness object.
         */
        private getGridIndexRect(rect);
    }
}
declare module powerbi.extensibility.utils.chart.dataLabel.utils {
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import ValueFormatterOptions = powerbi.extensibility.utils.formatting.ValueFormatterOptions;
    const maxLabelWidth: number;
    const defaultLabelDensity: string;
    const DefaultDy: string;
    const DefaultFontSizeInPt = 9;
    const StandardFontFamily: string;
    const LabelTextProperties: TextProperties;
    const defaultLabelColor = "#777777";
    const defaultInsideLabelColor = "#ffffff";
    const hundredPercentFormat = "0.00 %;-0.00 %;0.00 %";
    const defaultLabelPrecision: number;
    function updateLabelSettingsFromLabelsObject(labelsObj: DataLabelObject, labelSettings: VisualDataLabelsSettings): void;
    function getDefaultLabelSettings(show?: boolean, labelColor?: string, fontSize?: number): VisualDataLabelsSettings;
    function getDefaultColumnLabelSettings(isLabelPositionInside: boolean): VisualDataLabelsSettings;
    function getDefaultPointLabelSettings(): PointDataLabelsSettings;
    function getLabelPrecision(precision: number, format: string): number;
    function drawDefaultLabelsForDataPointChart(data: any[], context: d3.Selection<any>, layout: ILabelLayout, viewport: IViewport, isAnimator?: boolean, animationDuration?: number, hasSelection?: boolean, hideCollidedLabels?: boolean): d3.selection.Update<any>;
    function cleanDataLabels(context: d3.Selection<any>, removeLines?: boolean): void;
    function setHighlightedLabelsOpacity(context: d3.Selection<any>, hasSelection: boolean, hasHighlights: boolean): void;
    function getLabelFormattedText(options: LabelFormattedTextOptions): string;
    function enumerateDataLabels(options: VisualDataLabelsSettingsOptions): VisualObjectInstance;
    function enumerateCategoryLabels(enumeration: VisualObjectInstanceEnumerationObject, dataLabelsSettings: VisualDataLabelsSettings, withFill: boolean, isShowCategory?: boolean, fontSize?: number): void;
    function createColumnFormatterCacheManager(): IColumnFormatterCacheManager;
    function getOptionsForLabelFormatter(labelSetting: VisualDataLabelsSettings, formatString: string, value2?: number, precision?: number): ValueFormatterOptions;
    function isTextWidthOverflows(textWidth: any, maxTextWidth: any): boolean;
    function isTextHeightOverflows(textHeight: any, innerChordLength: any): boolean;
}
declare namespace powerbi.extensibility.utils.chart.label {
    module Units {
        class FontSize {
            readonly pt: number;
            readonly px: number;
            static createFromPt(pt: number): FontSize;
            static createFromPx(px: number): FontSize;
            private constructor(pt, px);
        }
    }
}
declare namespace powerbi.extensibility.utils.chart.label {
    import Units = powerbi.extensibility.utils.chart.label.Units;
    interface FontProperties {
        readonly color?: string;
        readonly family?: string;
        readonly lineHeight?: string;
        readonly size?: Units.FontSize;
        readonly style?: string;
        readonly variant?: string;
        readonly weight?: string;
        readonly whiteSpace?: string;
    }
    interface MutableFontProperties {
        color?: string;
        family?: string;
        lineHeight?: string;
        size?: Units.FontSize;
        style?: string;
        variant?: string;
        weight?: string;
        whiteSpace?: string;
    }
    module FontProperties {
        /**
         * Inherits a `FontProperties` object allowing specific properties to be overriden.
         * Typically used for changing values on an existing object as all properties are readonly.
         * @param fontProperties The existing `FontProperties` object
         * @param newFontProperties The properties to override
         * @returns A new object inherited from `fontProperties`.
         */
        function inherit(fontProperties: FontProperties, newFontProperties: FontProperties): FontProperties;
    }
}
declare namespace powerbi.extensibility.utils.chart.label {
    module Font {
        const FamilyDelimiter = ", ";
        class FamilyInfo {
            families: string[];
            constructor(families: string[]);
            /**
             * Gets the font-families joined by FamilyDelimiter.
             */
            readonly family: string;
            /**
            * Gets the font-families joined by FamilyDelimiter.
            */
            getFamily(): string;
            /**
             * Gets the CSS string for the "font-family" CSS attribute.
             */
            readonly css: string;
            /**
             * Gets the CSS string for the "font-family" CSS attribute.
             */
            getCSS(): string;
        }
        let Family: {
            light: FamilyInfo;
            semilight: FamilyInfo;
            regular: FamilyInfo;
            semibold: FamilyInfo;
            bold: FamilyInfo;
            lightSecondary: FamilyInfo;
            regularSecondary: FamilyInfo;
            boldSecondary: FamilyInfo;
            glyphs: FamilyInfo;
        };
    }
}
declare namespace powerbi.extensibility.utils.chart.label {
    module Prototype {
        function inherit<T>(obj: T, extension?: (inherited: T) => void): T;
    }
}
declare namespace powerbi.extensibility.utils.chart.label {
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    interface VisualDataLabelsSettings {
        show: boolean;
        fontProperties: FontProperties;
        showLabelPerSeries?: boolean;
        labelOrientation?: LabelOrientation;
        isSeriesExpanded?: boolean;
        displayUnits?: number;
        showCategory?: boolean;
        position?: any;
        precision?: number;
        percentagePrecision?: number;
        categoryLabelColor?: string;
        labelStyle?: any;
        minFontSize?: number;
        maxFontSize?: number;
        labelOverflow?: boolean;
        enableBackground?: boolean;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }
    interface LabelEnabledDataPoint {
        labelX?: number;
        labelY?: number;
        labelFill?: string;
        labeltext?: string;
        labelFormatString?: string;
        isLabelInside?: boolean;
        labelFontSize?: number;
    }
    const enum CartesianChartType {
        Line = 0,
        Area = 1,
        StackedArea = 2,
        ClusteredColumn = 3,
        StackedColumn = 4,
        ClusteredBar = 5,
        StackedBar = 6,
        HundredPercentStackedBar = 7,
        HundredPercentStackedColumn = 8,
        RibbonChart = 9,
        Scatter = 10,
        ComboChart = 11,
        DataDot = 12,
        Waterfall = 13,
        LineClusteredColumnCombo = 14,
        LineStackedColumnCombo = 15,
        DataDotClusteredColumnCombo = 16,
        DataDotStackedColumnCombo = 17,
        RealTimeLineChart = 18,
    }
    module LabelUtils {
        const DefaultFontSizeInPt = 9;
        const DefaultLabelFontFamily: string;
        const defaultFontProperties: FontProperties;
        const horizontalLabelBackgroundPadding = 4;
        const verticalLabelBackgroundPadding = 2;
        let labelGraphicsContextClass: ClassAndSelector;
        let labelBackgroundGraphicsContextClass: ClassAndSelector;
        function downgradeToOldLabels(labels: Label[]): LabelOld[];
        function drawDefaultLabels(context: d3.Selection<any>, dataLabels: Label[], numeric?: boolean, twoRows?: boolean, hasTooltip?: boolean): d3.selection.Update<any>;
        function getDataLabelLayoutOptions(chartType: CartesianChartType): DataLabelLayoutOptions;
        function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number;
    }
}
declare namespace powerbi.extensibility.utils.chart.label {
    import IPoint = powerbi.extensibility.utils.svg.shapes.IPoint;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import ISelectionId = powerbi.visuals.ISelectionId;
    enum LabelOrientation {
        Vertical = 0,
        Horizontal = 1,
    }
    interface LabelParentPolygon {
        /** The point this data label belongs to */
        polygon: powerbi.extensibility.utils.svg.shapes.IPolygon;
        /** Valid positions to place the label ordered by preference */
        validPositions: NewPointLabelPosition[];
    }
    /**
     * Defines possible data label positions relative to rectangles
     */
    const enum RectLabelPosition {
        /** Position is not defined. */
        None = 0,
        /** Content is placed inside the parent rectangle in the center. */
        InsideCenter = 1,
        /** Content is placed inside the parent rectangle at the base. */
        InsideBase = 2,
        /** Content is placed inside the parent rectangle at the end. */
        InsideEnd = 4,
        /** Content is placed outside the parent rectangle at the base. */
        OutsideBase = 8,
        /** Content is placed outside the parent rectangle at the end. */
        OutsideEnd = 16,
        /** Content overflows from the inside of the parent rectangle in the center. */
        OverflowInsideCenter = 32,
        /** Content overflows from the inside of the parent rectangle at the base. */
        OverflowInsideBase = 64,
        /** Content overflows from the inside of the parent rectangle at the end. */
        OverflowInsideEnd = 128,
        /** Content supports all possible positions. */
        All = 255,
        /** Content supports positions inside the rectangle */
        InsideAll = 7,
        /** Content supports overflow positions */
        OverflowAll = 224,
    }
    /**
     * Defines possible data label positions relative to points or circles
     */
    const enum NewPointLabelPosition {
        /** Position is not defined. */
        None = 0,
        Above = 1,
        Below = 2,
        Left = 4,
        Right = 8,
        BelowRight = 16,
        BelowLeft = 32,
        AboveRight = 64,
        AboveLeft = 128,
        Center = 256,
        All = 511,
    }
    /**
     * Rectangle orientation, defined by vertical vs horizontal and which direction
     * the "base" is at.
     */
    const enum NewRectOrientation {
        /** Rectangle with no specific orientation. */
        None = 0,
        /** Vertical rectangle with base at the bottom. */
        VerticalBottomBased = 1,
        /** Vertical rectangle with base at the top. */
        VerticalTopBased = 2,
        /** Horizontal rectangle with base at the left. */
        HorizontalLeftBased = 3,
        /** Horizontal rectangle with base at the right. */
        HorizontalRightBased = 4,
    }
    const enum LabelDataPointParentType {
        Point = 0,
        Rectangle = 1,
        Polygon = 2,
    }
    interface LabelParentRect {
        /** The rectangle this data label belongs to */
        rect: IRect;
        /** The orientation of the parent rectangle */
        orientation: NewRectOrientation;
        /** Valid positions to place the label ordered by preference */
        validPositions: RectLabelPosition[];
    }
    interface LabelParentPoint {
        /** The point this data label belongs to */
        point: IPoint;
        /** The radius of the point to be added to the offset (for circular geometry) */
        radius: number;
        /** Valid positions to place the label ordered by preference */
        validPositions: NewPointLabelPosition[];
    }
    interface LabelDataPoint {
        /** The measured size of the text */
        textSize: ISize;
        /** Is data label preferred? Preferred labels will be rendered first */
        isPreferred: boolean;
        /** Whether the parent type is a rectangle, point or polygon */
        parentType: LabelDataPointParentType;
        /** The parent geometry for the data label */
        parentShape: LabelParentRect | LabelParentPoint | LabelParentPolygon;
        /** Whether or not the label has a background */
        hasBackground?: boolean;
        /** Text to be displayed in the label */
        text: string;
        /** A text that represent the label tooltip */
        tooltip?: string;
        /** Color to use for the data label if drawn inside */
        insideFill: string;
        /** Color to use for the data label if drawn outside */
        outsideFill: string;
        /** The identity of the data point associated with the data label */
        identity: ISelectionId;
        /** The key of the data point associated with the data label (used if identity is not unique to each expected label) */
        key?: string;
        /** The font properties of the data point associated with the data label */
        fontProperties: FontProperties;
        /** Second row of text to be displayed in the label, for additional information */
        secondRowText?: string;
        /** The calculated weight of the data point associated with the data label */
        weight?: number;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }
    interface LabelDataPointOld {
        /** The measured size of the text */
        textSize: ISize;
        /** Is data label preferred? Preferred labels will be rendered first */
        isPreferred: boolean;
        /** Whether the parent type is a rectangle, point or polygon */
        parentType: LabelDataPointParentType;
        /** The parent geometry for the data label */
        parentShape: LabelParentRect | LabelParentPoint | LabelParentPolygon;
        /** Whether or not the label has a background */
        hasBackground?: boolean;
        /** Text to be displayed in the label */
        text: string;
        /** A text that represent the label tooltip */
        tooltip?: string;
        /** Color to use for the data label if drawn inside */
        insideFill: string;
        /** Color to use for the data label if drawn outside */
        outsideFill: string;
        /** The identity of the data point associated with the data label */
        identity: ISelectionId;
        /** The key of the data point associated with the data label (used if identity is not unique to each expected label) */
        key?: string;
        /** The font size of the data point associated with the data label */
        fontSize?: number;
        /** The font family of the data point associated with the data label */
        fontFamily?: number;
        /** Second row of text to be displayed in the label, for additional information */
        secondRowText?: string;
        /** The calculated weight of the data point associated with the data label */
        weight?: number;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }
    interface LabelDataPointLayoutInfo {
        labelDataPoint: LabelDataPoint;
        /** Whether or not the data label has been rendered */
        hasBeenRendered?: boolean;
        /** Size of the label adjusted for the background, if necessary */
        labelSize?: ISize;
    }
    interface LabelDataPointGroup<TLabelDataPoint> {
        labelDataPoints: TLabelDataPoint;
        maxNumberOfLabels: number;
        labelOrientation?: LabelOrientation;
    }
    interface Label extends SelectableDataPoint {
        /** Text to be displayed in the label */
        text: string;
        /** Second row of text to be displayed in the label */
        secondRowText?: string;
        /** The bounding box for the label */
        boundingBox: IRect;
        /** Whether or not the data label should be rendered */
        isVisible: boolean;
        /** A unique key for data points (used if key cannot be obtained from the identity) */
        key?: string;
        /** The font properties of the data label */
        fontProperties: FontProperties;
        /** A text anchor used to override the default label text-anchor (middle) */
        textAnchor?: string;
        /** points for reference line rendering */
        leaderLinePoints?: number[][];
        /** Whether or not the label has a background (and text position needs to be adjusted to take that into account) */
        hasBackground: boolean;
        /** A text that represent the label tooltip */
        tooltip?: string;
        /** The orientation for label, vertical or horizontal */
        labelOrientation?: LabelOrientation;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }
    interface LabelOld extends SelectableDataPoint {
        /** Text to be displayed in the label */
        text: string;
        /** Second row of text to be displayed in the label */
        secondRowText?: string;
        /** The bounding box for the label */
        boundingBox: IRect;
        /** Whether or not the data label should be rendered */
        isVisible: boolean;
        /** The fill color of the data label */
        fill: string;
        /** A unique key for data points (used if key cannot be obtained from the identity) */
        key?: string;
        /** The text size of the data label */
        fontSize?: number;
        /** The font family of the data label */
        fontFamily?: string;
        /** A text anchor used to override the default label text-anchor (middle) */
        textAnchor?: string;
        /** points for reference line rendering */
        leaderLinePoints?: number[][];
        /** Whether or not the label has a background (and text position needs to be adjusted to take that into account) */
        hasBackground: boolean;
        /** A text that represent the label tooltip */
        tooltip?: string;
        /** The orientation for label, vertical or horizontal */
        labelOrientation?: LabelOrientation;
        backgroundColor?: string;
        backgroundTransparency?: number;
    }
    interface GridSubsection {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
    }
    class LabelArrangeGrid {
        private grid;
        private viewport;
        private cellSize;
        private columnCount;
        private rowCount;
        /**
         * A multiplier applied to the largest width height to attempt to balance # of
         * labels in each cell and number of cells each label belongs to
         */
        private static cellSizeMultiplier;
        constructor(labelDataPointGroups: LabelDataPointGroup<LabelDataPointLayoutInfo[]>[], viewport: IViewport);
        /**
         * Add a rectangle to check collision against
         */
        add(rect: IRect): void;
        /**
         * Check whether the rect conflicts with the grid, either bleeding outside the
         * viewport or colliding with another rect added to the grid.
         */
        hasConflict(rect: IRect): boolean;
        /**
         * Attempt to position the given rect within the viewport.  Returns
         * the adjusted rectangle or null if the rectangle couldn't fit,
         * conflicts with the viewport, or is too far outside the viewport
         */
        tryPositionInViewport(rect: IRect): IRect;
        /**
         * Checks for a collision between the given rect and others in the grid.
         * Returns true if there is a collision.
         */
        private hasCollision(rect);
        /**
         * Check to see if the given rect is inside the grid's viewport
         */
        private isWithinGridViewport(rect);
        /**
         * Checks to see if the rect is close enough to the viewport to be moved inside.
         * "Close" here is determined by the distance between the edge of the viewport
         * and the closest edge of the rect; if that distance is less than the appropriate
         * dimension of the rect, we will reposition the rect.
         */
        private isCloseToGridViewport(rect);
        /**
         * Attempt to move the rect inside the grid's viewport.  Returns the resulting
         * rectangle with the same width/height adjusted to be inside the viewport or
         * null if it couldn't fit regardless.
         */
        private tryMoveInsideViewport(rect);
        private getContainingGridSubsection(rect);
        private static getCellCount(step, length, minCount, maxCount);
        private static bound(value, min, max);
    }
    interface DataLabelLayoutOptions {
        /** The amount of offset to start with when the data label is not centered */
        startingOffset: number;
        /** Maximum distance labels will be offset by */
        maximumOffset: number;
        /** The amount to increase the offset each attempt while laying out labels */
        offsetIterationDelta?: number;
        /** Horizontal padding used for checking whether a label is inside a parent shape */
        horizontalPadding?: number;
        /** Vertical padding used for checking whether a label is inside a parent shape */
        verticalPadding?: number;
        /** Should we draw reference lines in case the label offset is greater then the default */
        allowLeaderLines?: boolean;
        /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
        attemptToMoveLabelsIntoViewport?: boolean;
    }
    class LabelLayout {
        /** Maximum distance labels will be offset by */
        private maximumOffset;
        /** The amount to increase the offset each attempt while laying out labels */
        private offsetIterationDelta;
        /** The amount of offset to start with when the data label is not centered */
        private startingOffset;
        /** Padding used for checking whether a label is inside a parent shape */
        private horizontalPadding;
        /** Padding used for checking whether a label is inside a parent shape */
        private verticalPadding;
        /** Should we draw leader lines in case the label offset is greater then the default */
        private allowLeaderLines;
        /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
        private attemptToMoveLabelsIntoViewport;
        private static defaultOffsetIterationDelta;
        private static defaultHorizontalPadding;
        private static defaultVerticalPadding;
        constructor(options: DataLabelLayoutOptions);
        /**
         * Arrange takes a set of data labels and lays them out in order, assuming that
         * the given array has already been sorted with the most preferred labels at the
         * front, taking into considiration a maximum number of labels that are alowed
         * to display.
         *
         * Details:
         * - We iterate over offsets from the target position, increasing from 0 while
         *      verifiying the maximum number of labels to display hasn't been reached
         * - For each offset, we iterate over each data label
         * - For each data label, we iterate over each position that is valid for
         *     both the specific label and this layout
         * - When a valid position is found, we position the label there and no longer
         *     reposition it.
         * - This prioritizes the earlier labels to be positioned closer to their
         *     target points in the position they prefer.
         * - This prioritizes putting data labels close to a valid position over
         *     placing them at their preferred position (it will place it at a less
         *     preferred position if it will be a smaller offset)
         */
        layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[], viewport: IViewport): Label[];
        layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[], viewport: IViewport): LabelOld[];
        private positionDataLabels(labelDataPointsLayoutInfo, viewport, grid, maxLabelsToRender, labelOrientation, hasMultipleDataSeries);
        private tryPositionForRectPositions(labelDataPointLayoutInfo, grid, currentLabelOffset, currentCenteredLabelOffset, labelOrientation, hasMultipleDataSeries);
        /**
         * Tests a particular position/offset combination for the given data label.
         * If the label can be placed, returns the resulting bounding box for the data
         * label.  If not, returns null.
         */
        private static tryPositionRect(grid, position, labelDataPointLayoutInfo, offset, centerOffset, adjustForViewport);
        private tryPositionForPointPositions(labelDataPointLayoutInfo, grid, currentLabelOffset, drawLeaderLines, labelOrientation);
        private static tryPositionPoint(grid, position, labelDataPointLayoutInfo, offset, adjustForViewport);
        private isOldLabelDataPoint(labelDataPoint);
        private isOldLabelDataPointGroups(labelDataPointGroups);
        upgradeToNewLabelDataPointsGroups(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[]): LabelDataPointGroup<LabelDataPoint[]>[];
    }
    /**
     * (Private) Contains methods for calculating the bounding box of a data label
     */
    module DataLabelRectPositioner {
        namespace LabelOverflowingConsts {
            const equalityPrecision = 0.09;
            const minIntersectionRatio = 0.2;
            const parentToLabelOverflowRatioThreshold: number;
        }
        function getLabelRect(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, position: RectLabelPosition, offset: number): IRect;
        function canFitWithinParent(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, horizontalPadding: number, verticalPadding: number): boolean;
        function isLabelWithinParent(labelRect: IRect, labelPoint: LabelDataPoint, horizontalPadding: number, verticalPadding: number): boolean;
        function isValidLabelOverflowing(labelRect: IRect, labelPoint: LabelDataPoint, hasMultipleDataSeries: boolean): boolean;
        function maximalIntersectionRatio(labelRect: IRect, parentRect: IRect): number;
        function topInside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function bottomInside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function rightInside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function leftInside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function topOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function bottomOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function rightOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function leftOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function middleHorizontal(labelSize: ISize, parentRect: IRect, offset: number): IRect;
        function middleVertical(labelSize: ISize, parentRect: IRect, offset: number): IRect;
    }
    module DataLabelPointPositioner {
        const cos45: number;
        const sin45: number;
        function getLabelRect(labelSize: ISize, parentPoint: LabelParentPoint, position: NewPointLabelPosition, offset: number): IRect;
        function above(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function below(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function left(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function right(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function belowLeft(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function belowRight(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function aboveLeft(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function aboveRight(labelSize: ISize, parentPoint: IPoint, offset: number): IRect;
        function center(labelSize: ISize, parentPoint: IPoint): IRect;
        function getLabelLeaderLineEndingPoint(boundingBox: IRect, position: NewPointLabelPosition, parentShape: LabelParentPoint): number[][];
    }
}
declare module powerbi.extensibility.utils.chart.label {
    module NewDataLabelUtils {
        const DefaultLabelFontSizeInPt = 9;
        let startingLabelOffset: number;
        let maxLabelOffset: number;
        const horizontalLabelBackgroundPadding = 4;
        const verticalLabelBackgroundPadding = 2;
        function drawDefaultLabels(context: d3.Selection<any>, dataLabels: LabelOld[], numeric?: boolean, twoRows?: boolean, hasTooltip?: boolean): d3.selection.Update<any>;
        interface DataLabelLayoutOptions {
            /** The amount of offset to start with when the data label is not centered */
            startingOffset: number;
            /** Maximum distance labels will be offset by */
            maximumOffset: number;
            /** The amount to increase the offset each attempt while laying out labels */
            offsetIterationDelta?: number;
            /** Horizontal padding used for checking whether a label is inside a parent shape */
            horizontalPadding?: number;
            /** Vertical padding used for checking whether a label is inside a parent shape */
            verticalPadding?: number;
            /** Should we draw reference lines in case the label offset is greater then the default */
            allowLeaderLines?: boolean;
            /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
            attemptToMoveLabelsIntoViewport?: boolean;
        }
        let dataLabelLayoutStartingOffset: number;
        let dataLabelLayoutOffsetIterationDelta: number;
        let dataLabelLayoutMaximumOffset: number;
        function getDataLabelLayoutOptions(chartType: CartesianChartType): DataLabelLayoutOptions;
        function getNumberOfLabelsToRender(viewportWidth: number, labelDensity: number, minimumLabelsToRender: number, estimatedLabelWidth: number): number;
    }
}
