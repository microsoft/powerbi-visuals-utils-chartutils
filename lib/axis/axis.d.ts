/// <reference types="powerbi-visuals-tools" />
import { Selection } from "d3-selection";
import { scale } from "d3-scale";
import * as d3svg from "d3-svg";
import powerbi from "powerbi-visuals-tools";
import { valueType } from "powerbi-visuals-utils-typeutils";
import ValueType = valueType.ValueType;
import { AxisHelperCategoryDataPoint, AxisHelperSeries, CartesianAxisProperties, CreateAxisOptions, CreateScaleResult, CreateStackedAxisOptions, IAxisProperties, IMargin, TickLabelMargins } from "./axisInterfaces";
import { valueFormatter as vf, textMeasurementService as tms } from "powerbi-visuals-utils-formattingutils";
import ITextAsSVGMeasurer = tms.ITextAsSVGMeasurer;
import TextProperties = tms.TextProperties;
import IValueFormatter = vf.IValueFormatter;
/**
 * Default ranges are for when we have a field chosen for the axis,
 * but no values are returned by the query.
 */
export declare const emptyDomain: number[];
export declare const stackedAxisPadding = 5;
export declare function getRecommendedNumberOfTicksForXAxis(availableWidth: number): 3 | 5 | 8;
export declare function getRecommendedNumberOfTicksForYAxis(availableWidth: number): 3 | 5 | 8;
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
export declare function getBestNumberOfTicks(min: number, max: number, valuesMetadata: powerbi.DataViewMetadataColumn[], maxTickCount: number, isDateTime?: boolean): number;
export declare function hasNonIntegerData(valuesMetadata: powerbi.DataViewMetadataColumn[]): boolean;
export declare function getRecommendedTickValues(maxTicks: number, scale: scale.Linear<number, number> | scale.Ordinal<any, any>, axisType: ValueType, isScalar: boolean, minTickInterval?: number): any[];
export declare function getRecommendedTickValuesForAnOrdinalRange(maxTicks: number, labels: string[]): string[];
export declare function getRecommendedTickValuesForAQuantitativeRange(maxTicks: number, scale: scale.Linear<any, any>, minInterval?: number): number[];
export declare function getMargin(availableWidth: number, availableHeight: number, xMargin: number, yMargin: number): IMargin;
export declare function getTickLabelMargins(viewport: powerbi.IViewport, yMarginLimit: number, textWidthMeasurer: ITextAsSVGMeasurer, textHeightMeasurer: ITextAsSVGMeasurer, axes: CartesianAxisProperties, bottomMarginLimit: number, properties: TextProperties, scrollbarVisible?: boolean, showOnRight?: boolean, renderXAxis?: boolean, renderY1Axis?: boolean, renderY2Axis?: boolean): TickLabelMargins;
export declare function columnDataTypeHasValue(dataType: powerbi.ValueTypeDescriptor): boolean;
export declare function createOrdinalType(): ValueType;
export declare function isOrdinal(dataType: powerbi.ValueTypeDescriptor): boolean;
export declare function isOrdinalScale(scale: any): scale is scale.Ordinal<any, any>;
export declare function isDateTime(dataType: powerbi.ValueTypeDescriptor): boolean;
export declare function invertScale(scale: any, x: any): any;
export declare function extent(scale: any): number[];
/**
 * Uses the D3 scale to get the actual category thickness.
 * @return The difference between the 1st and 2nd items in the range if there are 2 or more items in the range.
 * Otherwise, the length of the entire range.
 */
export declare function getCategoryThickness(scale: any): number;
/**
 * Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
 * Otherwise, it returns the greatest item in scale.domain() that's <= x.
 */
export declare function invertOrdinalScale(scale: scale.Ordinal<any, any>, x: number): any;
export declare function findClosestXAxisIndex(categoryValue: number, categoryAxisValues: AxisHelperCategoryDataPoint[]): number;
export declare function lookupOrdinalIndex(scale: scale.Ordinal<any, any>, pixelValue: number): number;
/** scale(value1) - scale(value2) with zero checking and min(+/-1, result) */
export declare function diffScaled(scale: scale.Linear<any, any>, value1: any, value2: any): number;
export declare function createDomain(data: any[], axisType: powerbi.ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: powerbi.NumberRange): number[];
export declare function ensureValuesInRange(values: number[], min: number, max: number): number[];
/**
 * Gets the ValueType of a category column, defaults to Text if the type is not present.
 */
export declare function getCategoryValueType(metadataColumn: powerbi.DataViewMetadataColumn, isScalar?: boolean): ValueType;
/**
 * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
 * @param options The properties used to create the axis.
 */
export declare function createAxis(options: CreateAxisOptions): IAxisProperties;
/**
 * Creates a D3 axis for stacked axis usage. `options.innerTickSize` and `options.outerTickSize` will be defaulted to 0 if not set.
 * `options.orientation` will be defaulted to "bottom" if not specified.
 */
export declare function createStackedAxis(options: CreateStackedAxisOptions): d3svg.Axis;
export declare function createScale(options: CreateAxisOptions): CreateScaleResult;
export declare function normalizeInfinityInScale(scale: scale.Linear<any, any>): void;
export declare function createFormatter(scaleDomain: any[], dataDomain: any[], dataType: any, isScalar: boolean, formatString: string, bestTickCount: number, tickValues: any[], getValueFn: any, useTickIntervalForDisplayUnits?: boolean, axisDisplayUnits?: number, axisPrecision?: number): IValueFormatter;
export declare function calculateAxisPrecision(tickValue0: number, tickValue1: number, axisDisplayUnits: number, formatString?: string): number;
export declare function getMinTickValueInterval(formatString: string, columnType: ValueType, is100Pct?: boolean): number;
/**
 * Creates a [min,max] from your Cartiesian data values.
 *
 * @param data The series array of CartesianDataPoints.
 * @param includeZero Columns and bars includeZero, line and scatter do not.
 */
export declare function createValueDomain(data: AxisHelperSeries[], includeZero: boolean): number[];
export declare module LabelLayoutStrategy {
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
    function rotate(labelSelection: Selection<any>, maxBottomMargin: number, textTruncator: (properties: TextProperties, maxWidth: number) => string, textProperties: TextProperties, needRotate: boolean, needEllipsis: boolean, axisProperties: IAxisProperties, margin: IMargin, scrollbarVisible: boolean): void;
    function wordBreak(text: Selection<any, any, any, any>, axisProperties: IAxisProperties, maxHeight: number): void;
    function clip(text: Selection<any, any, any, any>, availableWidth: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void): void;
}
export declare function createOrdinalScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio?: number, innerPaddingRatio?: number, useRangePoints?: boolean): scale.Ordinal<any, any>;
export declare function isLogScalePossible(domain: any[], axisType?: ValueType): boolean;
export declare function createNumericalScale(axisScaleType: string, pixelSpan: number, dataDomain: any[], dataType: ValueType, outerPadding?: number, niceCount?: number, shouldClamp?: boolean): scale.Linear<any, any>;
export declare function createLinearScale(pixelSpan: number, dataDomain: any[], outerPadding?: number, niceCount?: number, shouldClamp?: boolean): scale.Linear<any, any>;
export declare function getRangeForColumn(sizeColumn: powerbi.DataViewValueColumn): powerbi.NumberRange;
/**
 * Set customized domain, but don't change when nothing is set
 */
export declare function applyCustomizedDomain(customizedDomain: any, forcedDomain: any[]): any[];
/**
 * Combine the forced domain with the actual domain if one of the values was set.
 * The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.
 */
export declare function combineDomain(forcedDomain: any[], domain: any[], ensureDomain?: powerbi.NumberRange): any[];
export declare function createAxisLabel(properties: powerbi.DataViewObject, label: string, unitType: string, y2?: boolean): string;
export declare function scaleShouldClamp(combinedDomain: any[], domain: any[]): boolean;
export declare function normalizeNonFiniteNumber(value: powerbi.PrimitiveValue): number;
/**
 * Indicates whether the number is power of 10.
 */
export declare function powerOfTen(d: any): boolean;
