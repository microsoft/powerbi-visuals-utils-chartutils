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

import {
    ScaleLinear,
    ScaleOrdinal,
    ScaleBand,
    ScaleLogarithmic,
    scaleLinear,
    scaleLog,
    scaleBand,
    scalePoint,
    ScalePoint,
    NumberValue,
} from "d3-scale";

import {
    Axis,
    AxisScale,
    axisLeft,
    axisBottom,
    axisTop,
    axisRight,
    AxisDomain
} from "d3-axis";

import {
    min,
    max,
    bisect
} from "d3-array";

import powerbi from "powerbi-visuals-api";

// powerbi.extensibility.utils.type
import { double as Double, valueType } from "powerbi-visuals-utils-typeutils";
import ValueType = valueType.ValueType;
import {
    AxisHelperCategoryDataPoint,
    AxisHelperSeries,
    AxisOrientation,
    CartesianAxisProperties,
    CreateAxisOptions,
    CreateFormatterOptions,
    CreateScaleOptions,
    CreateScaleResult,
    CreateStackedAxisOptions,
    GetBestNumberOfTicksOptions,
    GetTickLabelMarginsOptions,
    IAxisProperties,
    IMargin,
} from "./axisInterfaces";

// powerbi.extensibility.utils.formatting
import {
    valueFormatter as vf, wordBreaker, dateTimeSequence, formattingService,
} from "powerbi-visuals-utils-formattingutils";
import DateTimeSequence = dateTimeSequence.DateTimeSequence;

import IValueFormatter = vf.IValueFormatter;
import valueFormatter = vf;
import ValueFormatterOptions = vf.ValueFormatterOptions;
import numberFormat = formattingService.numberFormat;

import * as axisScale from "./axisScale";
import * as axisStyle from "./axisStyle";


const XLabelMaxAllowedOverflow = 35;
const TextHeightConstant = 10;
const MinTickCount = 2;
const DefaultBestTickCount = 3;
const ScalarTickLabelPadding = 3;

const TickLabelPadding: number = 2;
const MinOrdinalRectThickness: number = 20;

/**
 * Default ranges are for when we have a field chosen for the axis,
 * but no values are returned by the query.
 */
export const emptyDomain = [0, 0];

export const stackedAxisPadding = 5;

export function getRecommendedNumberOfTicksForXAxis(availableWidth: number) {
    if (availableWidth < 300) {
        return 3;
    }

    if (availableWidth < 500) {
        return 5;
    }

    return 8;
}

export function getRecommendedNumberOfTicksForYAxis(availableWidth: number) {
    if (availableWidth < 150) {
        return 3;
    }

    if (availableWidth < 300) {
        return 5;
    }

    return 8;
}

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
export function getBestNumberOfTicks(options: GetBestNumberOfTicksOptions): number {
    const {min, max, valuesMetadata, maxTickCount, isDateTime} = options;

    if (isNaN(min) || isNaN(max)) {
        return DefaultBestTickCount;
    }

    if (maxTickCount <= 1 || (max <= 1 && min >= -1)) {
        return maxTickCount;
    }

    if (min === max) {
        // datetime needs to only show one tick value in this case so formatting works correctly
        if (isDateTime) {
            return 1;
        }

        return DefaultBestTickCount;
    }

    if (hasNonIntegerData(valuesMetadata)) {
        return maxTickCount;
    }

    // e.g. 5 - 2 + 1 = 4, => [2,3,4,5]
    return Math.min(max - min + 1, maxTickCount);
}

export function hasNonIntegerData(valuesMetadata: powerbi.DataViewMetadataColumn[]): boolean {
    for (let i = 0, len = valuesMetadata.length; i < len; i++) {
        const currentMetadata: powerbi.DataViewMetadataColumn = valuesMetadata[i];

        if (currentMetadata && currentMetadata.type && !currentMetadata.type.integer) {
            return true;
        }
    }

    return false;
}

export function getRecommendedTickValues(maxTicks: number,
    scale: ScaleLinear<number, number> | ScaleOrdinal<any, any>,
    axisType: ValueType,
    isScalar: boolean,
    minTickInterval?: number): string[] | number[] {

    if (!isScalar || isOrdinalScale(scale)) {
        return getRecommendedTickValuesForAnOrdinalRange(maxTicks, scale.domain());
    }
    else if (isDateTime(axisType)) {
        return getRecommendedTickValuesForADateTimeRange(maxTicks, (scale as ScaleLinear<number, number>).domain());
    }

    return getRecommendedTickValuesForAQuantitativeRange(maxTicks, (scale as ScaleLinear<number, number>), minTickInterval);
}

export function getRecommendedTickValuesForAnOrdinalRange(maxTicks: number, labels: string[]): string[] {
    const tickLabels: string[] = [];

    // return no ticks in this case
    if (maxTicks <= 0)
        return tickLabels;

    const len = labels.length;
    if (maxTicks > len)
        return labels;

    for (let i = 0, step = Math.ceil(len / maxTicks); i < len; i += step) {
        tickLabels.push(labels[i]);
    }
    return tickLabels;
}

export function getRecommendedTickValuesForAQuantitativeRange(maxTicks: number, scale: ScaleLinear<any, any>, minInterval?: number): number[] {
    let tickLabels: number[] = [];

    // if maxticks is zero return none
    if (maxTicks === 0)
        return tickLabels;

    const quantitiveScale = scale;
    if (quantitiveScale.ticks) {
        tickLabels = quantitiveScale.ticks(maxTicks);
        if (tickLabels.length > maxTicks && maxTicks > 1)
            tickLabels = quantitiveScale.ticks(maxTicks - 1);
        if (tickLabels.length < MinTickCount) {
            tickLabels = quantitiveScale.ticks(maxTicks + 1);
        }
        tickLabels = createTrueZeroTickLabel(tickLabels);

        if (minInterval && tickLabels.length > 1) {
            let tickInterval = tickLabels[1] - tickLabels[0];
            while (tickInterval > 0 && tickInterval < minInterval) {
                for (let i = 1; i < tickLabels.length; i++) {
                    tickLabels.splice(i, 1);
                }

                tickInterval = tickInterval * 2;
            }
            // keep at least two labels - the loop above may trim all but one if we have odd # of tick labels and dynamic range < minInterval
            if (tickLabels.length === 1) {
                tickLabels.push(tickLabels[0] + minInterval);
            }
        }
        return tickLabels;
    }

    return tickLabels;
}

/**
 * Round out very small zero tick values (e.g. -1e-33 becomes 0).
 *
 * @param ticks Array of numbers (from d3.scale.ticks([maxTicks])).
 * @param epsilon Max ratio of calculated tick interval which we will recognize as zero.
 *
 * e.g.
 *     ticks = [-2, -1, 1e-10, 3, 4]; epsilon = 1e-5;
 *     closeZero = 1e-5 * | 2 - 1 | = 1e-5
 *     // Tick values <= 1e-5 replaced with 0
 *     return [-2, -1, 0, 3, 4];
 */
function createTrueZeroTickLabel(ticks: number[], epsilon: number = 1e-5): number[] {
    if (!ticks || ticks.length < 2)
        return ticks;

    const closeZero = epsilon * Math.abs(ticks[1] - ticks[0]);

    return ticks.map((tick) => Math.abs(tick) <= closeZero ? 0 : tick);
}

function getRecommendedTickValuesForADateTimeRange(maxTicks: number, dataDomain: number[]): number[] {
    let tickLabels: number[] = [];

    if (dataDomain[0] === 0 && dataDomain[1] === 0)
        return [];

    const dateTimeTickLabels = DateTimeSequence.CALCULATE(new Date(dataDomain[0]), new Date(dataDomain[1]), maxTicks).sequence;

    tickLabels = dateTimeTickLabels.map(d => d.getTime());
    tickLabels = ensureValuesInRange(tickLabels, dataDomain[0], dataDomain[1]);

    return tickLabels;
}

function normalizeLinearDomain(domain: powerbi.NumberRange): powerbi.NumberRange {
    if (isNaN(domain.min) || isNaN(domain.max)) {
        domain.min = emptyDomain[0];
        domain.max = emptyDomain[1];
    }
    else if (domain.min === domain.max) {
        // d3 linear scale will give zero tickValues if max === min, so extend a little
        domain.min = domain.min < 0 ? domain.min * 1.2 : domain.min * 0.8;
        domain.max = domain.max < 0 ? domain.max * 0.8 : domain.max * 1.2;
    }
    else {
        // Check that min is very small and is a negligable portion of the whole domain.
        // (fix floating pt precision bugs)
        // sometimes highlight value math causes small negative numbers which makes the axis add
        // a large tick interval instead of just rendering at zero.
        if (Math.abs(domain.min) < 0.0001 && domain.min / (domain.max - domain.min) < 0.0001) {
            domain.min = 0;
        }
    }

    return domain;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function getMargin(availableWidth: number, availableHeight: number, xMargin: number, yMargin: number): IMargin {
    return {
        top: 20,
        right: 30,
        bottom: 40,
        left: 30
    };
}

/* eslint-disable-next-line max-lines-per-function*/
export function getTickLabelMargins(options: GetTickLabelMarginsOptions): IMargin {
    const {
        viewport,
        yMarginLimit,
        textWidthMeasurer,
        textHeightMeasurer, 
        axes,
        bottomMarginLimit,
        properties,
        scrollbarVisible,
        showOnRight,
        renderXAxis,
        renderY1Axis,
        renderY2Axis
    } = options;

    const xAxisProperties: IAxisProperties = axes.x;
    const y1AxisProperties: IAxisProperties = axes.y1;
    const y2AxisProperties: IAxisProperties = axes.y2;

    const xLabels = xAxisProperties.values;
    const y1Labels = y1AxisProperties.values;

    let leftOverflow = 0;
    let rightOverflow = 0;
    let maxWidthY1 = 0;
    let maxWidthY2 = 0;
    let xMax = 0; // bottom margin
    const ordinalLabelOffset = xAxisProperties.categoryThickness ? xAxisProperties.categoryThickness / 2 : 0;
    const scaleIsOrdinal = isOrdinalScale(xAxisProperties.scale);

    const hasHierarchy = !arrayIsEmpty(axes.xStack);

    let xLabelOuterPadding = 0;
    if (xAxisProperties.outerPadding !== undefined) {
        xLabelOuterPadding = xAxisProperties.outerPadding;
    }
    else if (xAxisProperties.xLabelMaxWidth !== undefined) {
        xLabelOuterPadding = Math.max(0, (viewport.width - xAxisProperties.xLabelMaxWidth * xLabels.length) / 2);
    }

    let rotation;
    if (scrollbarVisible || hasHierarchy)
        rotation = LabelLayoutStrategy.DefaultRotationWithScrollbar;
    else
        rotation = LabelLayoutStrategy.DefaultRotation;

    if (renderY1Axis) {
        for (let i = 0, len = y1Labels.length; i < len; i++) {
            properties.text = y1Labels[i];
            
            maxWidthY1 = Math.max(maxWidthY1, textWidthMeasurer(properties));
        }
    }

    if (y2AxisProperties && renderY2Axis) {
        const y2Labels = y2AxisProperties.values;
        for (let i = 0, len = y2Labels.length; i < len; i++) {
            properties.text = y2Labels[i];
            maxWidthY2 = Math.max(maxWidthY2, textWidthMeasurer(properties));
        }
    }

    const textHeight = textHeightMeasurer(properties);
    const maxNumLines = Math.floor(bottomMarginLimit / textHeight);
    const xScale = xAxisProperties.scale;
    const xDomain = xScale.domain();
    if (renderXAxis && xLabels.length > 0) {
        for (let i = 0, len = xLabels.length; i < len; i++) {
            // find the max height of the x-labels, perhaps rotated or wrapped
            let height: number;
            properties.text = xLabels[i];
            let width = textWidthMeasurer(properties);
            if (xAxisProperties.willLabelsWordBreak) {
                // Split label and count rows
                const wordBreaks = wordBreaker.splitByWidth(properties.text, properties, textWidthMeasurer, xAxisProperties.xLabelMaxWidth, maxNumLines);
                height = wordBreaks.length * textHeight;
                // word wrapping will truncate at xLabelMaxWidth
                width = xAxisProperties.xLabelMaxWidth;
            }
            else if (!xAxisProperties.willLabelsFit && scaleIsOrdinal) {
                height = width * rotation.sine;
                width = width * rotation.cosine;
            }
            else {
                height = TextHeightConstant;
            }

            // calculate left and right overflow due to wide X labels
            // (Note: no right overflow when rotated)
            if (i === 0) {
                if (scaleIsOrdinal) {
                    if (!xAxisProperties.willLabelsFit /*rotated text*/)
                        leftOverflow = width - ordinalLabelOffset - xLabelOuterPadding;
                    else
                        leftOverflow = (width / 2) - ordinalLabelOffset - xLabelOuterPadding;
                    leftOverflow = Math.max(leftOverflow, 0);
                }
                else if (xDomain.length > 1) {
                    // Scalar - do some math
                    const xPos = xScale(xDomain[0]);
                    // xPos already incorporates xLabelOuterPadding, don't subtract it twice
                    leftOverflow = (width / 2) - xPos;
                    leftOverflow = Math.max(leftOverflow, 0);
                }
            } else if (i === len - 1) {
                if (scaleIsOrdinal) {
                    // if we are rotating text (!willLabelsFit) there won't be any right overflow
                    if (xAxisProperties.willLabelsFit || xAxisProperties.willLabelsWordBreak) {
                        // assume this label is placed near the edge
                        rightOverflow = (width / 2) - ordinalLabelOffset - xLabelOuterPadding;
                        rightOverflow = Math.max(rightOverflow, 0);
                    }
                }
                else if (xDomain.length > 1) {
                    // Scalar - do some math
                    const xPos = xScale(xDomain[1]);
                    // xPos already incorporates xLabelOuterPadding, don't subtract it twice
                    rightOverflow = (width / 2) - (viewport.width - xPos);
                    rightOverflow = Math.max(rightOverflow, 0);
                }
            }

            xMax = Math.max(xMax, height);
        }
        // trim any actual overflow to the limit
        leftOverflow = Math.min(leftOverflow, XLabelMaxAllowedOverflow);
        rightOverflow = Math.min(rightOverflow, XLabelMaxAllowedOverflow);
    }

    let rightMargin = 0,
        leftMargin = 0,
        bottomMargin = Math.min(Math.ceil(xMax), bottomMarginLimit);

    if (showOnRight) {
        leftMargin = Math.min(Math.max(leftOverflow, maxWidthY2), yMarginLimit);
        rightMargin = Math.min(Math.max(rightOverflow, maxWidthY1), yMarginLimit);
    }
    else {
        leftMargin = Math.min(Math.max(leftOverflow, maxWidthY1), yMarginLimit);
        rightMargin = Math.min(Math.max(rightOverflow, maxWidthY2), yMarginLimit);
    }

    if (hasHierarchy) {
        bottomMargin += (textHeight + stackedAxisPadding) * (axes.xStack.length - 1);
    }

    return {
        top: Math.ceil(bottomMargin),
        left: Math.ceil(leftMargin),
        right: Math.ceil(rightMargin),
        bottom: textHeight + stackedAxisPadding,
    };
}

export function columnDataTypeHasValue(dataType: powerbi.ValueTypeDescriptor) {
    return dataType && (dataType.bool || dataType.numeric || dataType.text || dataType.dateTime);
}

export function createOrdinalType(): ValueType {
    return ValueType.fromDescriptor({ text: true });
}

export function isOrdinal(dataType: powerbi.ValueTypeDescriptor): boolean {
    return !!(dataType && (dataType.text || dataType.bool || (dataType.misc && dataType.misc.barcode) || (dataType.geography && dataType.geography.postalCode)));
}

export function isOrdinalScale(scale: any): scale is ScaleOrdinal<string | number, number> | ScaleBand<string | number> | ScalePoint<string | number> {
    return typeof scale.bandwidth === "function";
}

export function isDateTime(dataType: powerbi.ValueTypeDescriptor): boolean {
    return !!(dataType && dataType.dateTime);
}

export function invertScale(scale: any, x: number) {
    if (isOrdinalScale(scale)) {
        return invertOrdinalScale(scale as ScaleBand<any>, x);
    }

    return scale.invert(x);
}

export function extent(
    scale: ScaleBand<any> |
        ScaleOrdinal<any, any> |
        ScalePoint<any> |
        ScaleLinear<any, any> |
        ScaleLogarithmic<any, any> |
        ScaleBand<any>
): number[] {
    const range = (<any>scale).range();
    return [range[0], range[range.length - 1]];
}

/**
 * Uses the D3 scale to get the actual category thickness.
 * @return The difference between the 1st and 2nd items in the range if there are 2 or more items in the range.
 * Otherwise, the length of the entire range.
 */
export function getCategoryThickness(scale: any): number {
    const leftEdges = scale.range();

    if (leftEdges.length < 2) {
        // We have 1 item if we don't have 2 edges. If we have 1 item, just use the entire axis length as the thickness.
        if (isOrdinalScale(scale)) {
            // We should only hit this if we have an ordinal scale. Other scales should always have 2 items in their range.
            const rangeExtent = (scale as ScaleOrdinal<any, any>).range();
            return rangeExtent[1] - rangeExtent[0];
        }
    }

    return leftEdges[1] - leftEdges[0];
}

/**
 * Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
 * Otherwise, it returns the greatest item in scale.domain() that's <= x.
 */
export function invertOrdinalScale(scale: ScaleBand<any>, x: number) {
    const domain = scale.domain();
    const range = domain.map(d => scale(d));

    if (range.length < 2) {
        return 0;
    }

    // If x is less than the range, just return the 1st item in the domain
    if (range[0] > x) {
        return domain[0];
    }

    const halfInnerPadding = 0;
    // d3.bisect returns the index at which we can insert something so that everything before it is lesser and everything after it is greater.
    // The leftEdges don't include the inner padding, so we need to shift x over by halfInnerPadding to account it.
    // We want index - 1 since that's the greatest value less than x, meaning that's the band we're in.
    // Use that index to find the right value in the domain.
    return domain[bisect(range, x + halfInnerPadding) - 1];
}

export function findClosestXAxisIndex(categoryValue: number, categoryAxisValues: AxisHelperCategoryDataPoint[]): number {
    let closestValueIndex: number = -1,
        minDistance = Number.MAX_VALUE;

    for (const i in categoryAxisValues) {
        const distance = Math.abs(categoryValue - categoryAxisValues[i].categoryValue);

        if (distance < minDistance) {
            minDistance = distance;
            closestValueIndex = parseInt(i, 10);
        }
    }

    return closestValueIndex;
}

export function lookupOrdinalIndex(scale: ScaleOrdinal<any, any>, pixelValue: number): number {
    let closestValueIndex: number = -1;
    let minDistance = Number.MAX_VALUE;
    const domain = scale.domain();

    if (domain.length < 2) {
        return 0;
    }

    const halfWidth = (scale(1) - scale(0)) / 2;

    for (const idx in domain) {
        const leftEdgeInPixels = scale(idx);
        const midPoint = leftEdgeInPixels + halfWidth;
        const distance = Math.abs(pixelValue - midPoint);

        if (distance < minDistance) {
            minDistance = distance;
            closestValueIndex = parseInt(idx, 10);
        }
    }

    return closestValueIndex;
}

/** scale(value1) - scale(value2) with zero checking and min(+/-1, result) */
export function diffScaled(
    scale: ScaleLinear<any, any>,
    value1: NumberValue,
    value2: NumberValue
): number {

    const value: number = scale(value1) - scale(value2);
    if (value === 0) {
        return 0;
    }

    if (value < 0) {
        return Math.min(value, -1);
    }

    return Math.max(value, 1);
}

export function createDomain(data: AxisHelperSeries[], axisType: powerbi.ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: powerbi.DataViewPropertyValue[], ensureDomain?: powerbi.NumberRange): number[] {
    if (isScalar && !isOrdinal(axisType)) {
        let userMin, userMax;
        if (forcedScalarDomain?.length === 2) {
            userMin = forcedScalarDomain[0];
            userMax = forcedScalarDomain[1];
        }

        return createScalarDomain(data, userMin, userMax, axisType, ensureDomain);
    }

    return createOrdinalDomain(data);
}

export function ensureValuesInRange(values: number[], min: number, max: number): number[] {
    let filteredValues = values.filter(v => v >= min && v <= max);
    if (filteredValues.length < 2) {
        filteredValues = [min, max];
    }

    return filteredValues;
}

/**
 * Gets the ValueType of a category column, defaults to Text if the type is not present.
 */
export function getCategoryValueType(metadataColumn: powerbi.DataViewMetadataColumn, isScalar?: boolean): ValueType {
    if (metadataColumn && columnDataTypeHasValue(metadataColumn.type)) {
        return <ValueType>metadataColumn.type;
    }

    if (isScalar) {
        return ValueType.fromDescriptor({ numeric: true });
    }

    return ValueType.fromDescriptor({ text: true });
}

/**
 * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
 * @param options The properties used to create the axis.
 */
export function createAxis(options: CreateAxisOptions): IAxisProperties {
    const {
        pixelSpan,
        dataDomain,
        metaDataColumn,
        formatString,
        outerPadding = 0,
        isCategoryAxis,
        isScalar,
        isVertical,
        useTickIntervalForDisplayUnits,
        getValueFn,
        axisDisplayUnits,
        axisPrecision,
        is100Pct,
        categoryThickness: initialCategoryThickness,
        scaleType
    } = options;

    const dataType: ValueType = getCategoryValueType(metaDataColumn, isScalar);

    // Create the Scale
    const scaleResult: CreateScaleResult = createScale(options);
    const { scale, bestTickCount, usingDefaultDomain } = scaleResult;
    const scaleDomain = scale.domain();
    const isLogScaleAllowed = isLogScalePossible(dataDomain, dataType);

    // Adjust category thickness if scalar and domain was adjusted
    let categoryThickness = initialCategoryThickness;
    if (categoryThickness && isScalar && dataDomain?.length === 2) {
        const oldSpan = dataDomain[1] - dataDomain[0];
        const newSpan = scaleDomain[1] - scaleDomain[0];
        if (oldSpan > 0 && newSpan > 0) {
            categoryThickness = categoryThickness * oldSpan / newSpan;
        }
    }

    // Get tick values
    let tickValues: number[];
    if (isScalar && bestTickCount === 1 && !arrayIsEmpty(dataDomain)) {
        tickValues = [dataDomain[0]];
    } else {
        const minTickInterval = isScalar ? getMinTickValueInterval(formatString, dataType, is100Pct) : undefined;
        tickValues = getRecommendedTickValues(bestTickCount, scale, dataType, isScalar, minTickInterval) as number[];
    }

    if (scaleType === axisScale.log && isLogScaleAllowed) {
        tickValues = tickValues.filter(powerOfTen);
    }

    const formatter = createFormatter({
        scaleDomain,
        dataDomain,
        dataType,
        isScalar,
        formatString,
        bestTickCount,
        tickValues,
        useTickIntervalForDisplayUnits,
        axisDisplayUnits,
        axisPrecision
    });

    const axisFunction = isVertical ? axisLeft : axisBottom;
    const axis = axisFunction(scale)
        .tickSize(6)
        .ticks(bestTickCount)
        .tickValues(tickValues);

    const formattedTickValues = metaDataColumn 
        ? formatAxisTickValues(axis, tickValues, formatter, dataType, getValueFn)
        : [];

    // Calculate label width
    let xLabelMaxWidth;
    if (!isScalar && categoryThickness) {
        xLabelMaxWidth = Math.max(1, categoryThickness - TickLabelPadding * 2);
    } else {
        xLabelMaxWidth = tickValues.length > 1 
            ? getScalarLabelMaxWidth(scale, tickValues) 
            : pixelSpan;
        xLabelMaxWidth -= ScalarTickLabelPadding * 2;
    }

    return {
        scale,
        axis,
        formatter,
        values: formattedTickValues,
        axisType: dataType,
        axisLabel: null,
        isCategoryAxis,
        xLabelMaxWidth,
        categoryThickness,
        outerPadding,
        usingDefaultDomain,
        isLogScaleAllowed,
        dataDomain,
    };
}

/**
 * Creates a D3 axis for stacked axis usage. `options.innerTickSize` and `options.outerTickSize` will be defaulted to 0 if not set.
 * `options.orientation` will be defaulted to "bottom" if not specified.
 */
export function createStackedAxis(options: CreateStackedAxisOptions): Axis<NumberValue> {
    const axis = options.axis;
    const orientation = options.orient;

    let axisFunction: <Domain extends AxisDomain>(scale: AxisScale<Domain>)=> Axis<Domain>;
// TODO: possible breaking changes
    switch (orientation) {
        case AxisOrientation.bottom:
            axisFunction = axisBottom;
            break;
        case AxisOrientation.top:
            axisFunction = axisTop;
            break;
        case AxisOrientation.left:
            axisFunction = axisLeft;
            break;
        case AxisOrientation.right:
            axisFunction = axisRight;
    }

    return axisFunction(options.scale)
        .tickSizeInner(options.innerTickSize || 0)
        .tickSizeOuter(options.outerTickSize || 0)
        .ticks(axis.tickValues())
        .tickValues(axis.tickValues())
        .tickFormat(options.tickFormat);
}

function getScalarLabelMaxWidth(scale: ScaleLinear<any, any>, tickValues: NumberValue[]): number {
    // find the distance between two ticks. scalar ticks can be anywhere, such as:
    // |---50----------100--------|
    if (scale && !arrayIsEmpty(tickValues)) {
        return Math.abs(scale(tickValues[1]) - scale(tickValues[0]));
    }

    return 1;
}

export function createScale(options: CreateScaleOptions): CreateScaleResult {
    const {
        pixelSpan,
        metaDataColumn,
        outerPadding = 0,
        isScalar = false,
        isVertical = false,
        forcedTickCount,
        categoryThickness,
        shouldClamp = false,
        maxTickCount,
        disableNice,
        disableNiceOnlyForScale,
        innerPadding,
        useRangePoints,
        scaleType,
        zeroScalarDomain
    } = options;
    let dataDomain = options.dataDomain;

    const dataType: ValueType = getCategoryValueType(metaDataColumn, isScalar);

    // Calculate max ticks based on pixel span and orientation
    let maxTicks = isVertical ? 
        getRecommendedNumberOfTicksForYAxis(pixelSpan) : 
        getRecommendedNumberOfTicksForXAxis(pixelSpan);

    if (maxTickCount && maxTicks > maxTickCount) {
        maxTicks = maxTickCount;
    }

    let scalarDomain = dataDomain ? dataDomain.slice() : null;
    let bestTickCount = disableNice ? null : maxTicks;
    let scale: ScaleOrdinal<any, any> | ScaleLinear<any, any> | ScalePoint<any> | ScaleBand<any>;
    let usingDefaultDomain = false;

    // Handle empty or invalid domain
    if (dataDomain == null || 
        (dataDomain.length === 2 && dataDomain[0] == null && dataDomain[1] == null) || 
        (dataDomain.length !== 2 && isScalar)
    ) {
        usingDefaultDomain = true;
        dataDomain = (dataType.dateTime || !isOrdinal(dataType)) ? emptyDomain : [];

        scale = isOrdinal(dataType) ?
            createOrdinalScale(
                pixelSpan, 
                dataDomain, 
                categoryThickness ? outerPadding / categoryThickness : 0,
                innerPadding,
                useRangePoints
            ) :
            createNumericalScale(
                scaleType,
                pixelSpan,
                dataDomain,
                dataType,
                outerPadding,
                bestTickCount,
                shouldClamp
            );
    }
    else {
        // Handle scalar domain
        if (isScalar && dataDomain.length > 0) {
            if (!disableNice) {
                bestTickCount = forcedTickCount !== undefined
                    ? (maxTicks !== 0 ? forcedTickCount : 0)
                    : getBestNumberOfTicks({
                        min: dataDomain[0], 
                        max: dataDomain[dataDomain.length - 1], 
                        valuesMetadata: [metaDataColumn], 
                        maxTickCount: maxTicks, 
                        isDateTime: dataType.dateTime
                    });
            }
            const normalizedRange = normalizeLinearDomain({ 
                min: dataDomain[0], 
                max: dataDomain[dataDomain.length - 1] 
            });
            scalarDomain = [normalizedRange.min, normalizedRange.max];
        }

        // Create appropriate scale based on data type
        if (isScalar && dataType.numeric && !dataType.dateTime) {
            if (
                scalarDomain?.length === 2 && 
                scalarDomain[0] === 0 && 
                scalarDomain[1] === 0 && 
                zeroScalarDomain
            ) {
                scalarDomain[0] = zeroScalarDomain[0];
                scalarDomain[1] = zeroScalarDomain[1];
            }

            const bestTickCountForNumericalScale = disableNiceOnlyForScale ? null : bestTickCount;
            scale = createNumericalScale(
                scaleType,
                pixelSpan,
                scalarDomain,
                dataType,
                outerPadding,
                bestTickCountForNumericalScale,
                shouldClamp
            );
        }
        else if (isScalar && dataType.dateTime) {
            // Use of a linear scale, instead of a D3.time.scale, is intentional since we want
            // to control the formatting of the time values, since d3's implementation isn't
            // in accordance to our design.
            //     scalarDomain: should already be in long-int time (via category.values[0].getTime())
            scale = createLinearScale(pixelSpan, scalarDomain, outerPadding, null, shouldClamp); // DO NOT PASS TICKCOUNT
        }
        else if (dataType.text || dataType || dataType.numeric || dataType.bool) {
            scale = createOrdinalScale(
                pixelSpan,
                scalarDomain,
                categoryThickness ? outerPadding / categoryThickness : 0,
                innerPadding,
                useRangePoints
            );
            bestTickCount = maxTicks === 0 ? 0 : Math.min(
                scalarDomain.length,
                (pixelSpan - outerPadding * 2) / MinOrdinalRectThickness
            );
        }
    }

    // vertical ordinal axis (e.g. categorical bar chart) does not need to reverse
    if (isVertical && isScalar) {
        scale.range(scale.range().reverse());
    }

    normalizeInfinityInScale(scale as ScaleLinear<any, any>);

    return {
        scale: scale as ScaleLinear<any, any, never>,
        bestTickCount,
        usingDefaultDomain,
    };
}

export function normalizeInfinityInScale(scale: ScaleLinear<any, any>): void {
    // When large values (eg Number.MAX_VALUE) are involved, a call to scale.nice occasionally
    // results in infinite values being included in the domain. To correct for that, we need to
    // re-normalize the domain now to not include infinities.
    const scaledDomain = scale.domain();
    for (let i = 0, len = scaledDomain.length; i < len; ++i) {
        if (scaledDomain[i] === Number.POSITIVE_INFINITY) {
            scaledDomain[i] = Number.MAX_VALUE;
        }
        else if (scaledDomain[i] === Number.NEGATIVE_INFINITY) {
            scaledDomain[i] = -Number.MAX_VALUE;
        }
    }

    scale.domain(scaledDomain);
}

export function createFormatter(options: CreateFormatterOptions): IValueFormatter {
    const {
        scaleDomain,
        dataDomain,
        dataType,
        isScalar,
        formatString,
        bestTickCount,
        tickValues,
        useTickIntervalForDisplayUnits,
        axisDisplayUnits,
        axisPrecision
    } = options;

    if (dataType?.dateTime) {
        return createDateTimeFormatter(scaleDomain, dataDomain, isScalar, formatString, bestTickCount);
    }

    return createNumericFormatter(
        isScalar,
        formatString,
        tickValues,
        useTickIntervalForDisplayUnits,
        axisDisplayUnits,
        axisPrecision
    );
}

function createDateTimeFormatter(
    scaleDomain: any[],
    dataDomain: any[],
    isScalar: boolean,
    formatString: string,
    bestTickCount: number
): IValueFormatter {
    if (!isScalar) {
        return valueFormatter.createDefaultFormatter(formatString, true);
    }

    let value = new Date(scaleDomain[0]);
    let value2 = new Date(scaleDomain[1]);

    // datetime with only one value needs to pass the same value
    // (from the original dataDomain value, not the adjusted scaleDomain)
    // so formatting works correctly.
    if (bestTickCount === 1) {
        value = value2 = new Date(dataDomain[0]);
    }
    
    // this will ignore the formatString and create one based on the smallest non-zero portion of the values supplied.
    return valueFormatter.create({
        format: formatString,
        value,
        value2,
        tickCount: bestTickCount,
    });
}

function createNumericFormatter(
    isScalar: boolean,
    formatString: string,
    tickValues: number[],
    useTickIntervalForDisplayUnits: boolean,
    axisDisplayUnits?: number,
    axisPrecision?: number
): IValueFormatter {
    if (!useTickIntervalForDisplayUnits || !isScalar || tickValues.length <= 1) {
        return valueFormatter.createDefaultFormatter(formatString, true);
    }

    const value1 = axisDisplayUnits ? axisDisplayUnits : tickValues[1] - tickValues[0];

    const options: ValueFormatterOptions = {
        format: formatString,
        value: value1,
        value2: 0, // force tickInterval or display unit to be used
        allowFormatBeautification: true,
    };

    if (axisPrecision) {
        options.precision = axisPrecision;
    } else {
        options.precision = calculateAxisPrecision(tickValues[0], tickValues[1], axisDisplayUnits, formatString);
    }

    return valueFormatter.create(options);
}

// returns # of decimal places necessary to distinguish between tick mark values
export function calculateAxisPrecision(tickValue0: number, tickValue1: number, axisDisplayUnits: number, formatString?: string): number {
    if (!axisDisplayUnits) {
        const displayUnitSystem = valueFormatter.createDisplayUnitSystem();
        displayUnitSystem.update(tickValue1 - tickValue0);
        axisDisplayUnits = displayUnitSystem.displayUnit && displayUnitSystem.displayUnit.value || 1;
    }

    let value0 = (tickValue0 || 0) / axisDisplayUnits;
    let value1 = (tickValue1 || 0) / axisDisplayUnits;

    if (formatString) {
        const partsPerScale = numberFormat.getCustomFormatMetadata(formatString, false, false, true).partsPerScale;
        value0 *= partsPerScale;
        value1 *= partsPerScale;
    }

    return Math.max(calculateAxisPrecisionForValue(value0), calculateAxisPrecisionForValue(value1));
}

function calculateAxisPrecisionForValue(value: number): number {
    if (value === 0)
        return 0;
    if (value < 0)
        value = -value;

    // calculate place of of the most significant decimal digit.
    // 1 means tens digit
    // 0 means the ones digit
    // -1 means tenths digit
    const mostSignificantDigit = Math.floor(Double.log10(value));

    // rounding in various calculations can introduce extraneous amounts of precision in the number
    // no need in an axis label to allow more than this number of digits as the *difference* between
    // ticks
    const MaxDigits = 5;

    if (mostSignificantDigit >= 0) {
        // value has an integer part but may also have a fraction part. get the number of significant
        // digits in the integer part then see how many that leaves us for the fractional part
        const integerSignificantDigits = mostSignificantDigit + 1;
        const maxFractionDigits = MaxDigits - integerSignificantDigits;
        if (maxFractionDigits <= 0) {
            // the value's integer part has at least MaxDigits of precision
            // so there aren't any left for the fractional part
            return 0;
        }

        return numberOfDecimalPlaces(value, maxFractionDigits);
    }
    else {
        // the interval has no integer part - it is a pure decimal fraction. we want the number
        // of decimal places we have to allow so the precision doesn't exceed MaxDigits.

        // knowing where there most significant digit is in the fraction, we can scale
        // the number to the range [0.1, 1)
        const rescaledValue = value / Double.pow10(mostSignificantDigit + 1);

        // get the actual number of significant digits respecting the maximum
        const fractionSignificantDigits = numberOfDecimalPlaces(rescaledValue, MaxDigits);

        // this is the number of zeroes that are required due to the true scale of the decimal fraction
        const fractionScaleDigits = -mostSignificantDigit - 1;

        // number of decimal places is the number of zeros plus the limited number of significant digits
        return fractionScaleDigits + fractionSignificantDigits;
    }
}

// if we're limiting the decimal places to maxDecimalPlaces, how many decimal places do
// we actually need to avoid trailing zeroes? for example, if the value is 1.500001 and
// we want a maximum of three decimal places, the number rounded to three places is 1.500
// so only one decimal place is necessary.
function numberOfDecimalPlaces(value: number, maxDecimalPlaces: number): number {
    const formattedValue = value.toFixed(maxDecimalPlaces);
    const decimalPoint = formattedValue.indexOf(".");

    if (decimalPoint !== -1) {
        for (let i = formattedValue.length; i-- > decimalPoint;) {
            if (formattedValue[i] !== "0") {
                return i - decimalPoint;
            }
        }
    }

    return 0;
}

/**
 * Format the linear tick labels or the category labels.
 */
function formatAxisTickValues(
    axis: Axis<any>,
    tickValues: number[],
    formatter: IValueFormatter,
    dataType: ValueType,
    getValueFn: (index: number, dataType: ValueType) => any = data => data
) {
    if (formatter) {
        axis.tickFormat(d => formatter.format(getValueFn(d, dataType)));
        return tickValues.map(d => formatter.format(getValueFn(d, dataType)));
    }
    return tickValues.map((d) => getValueFn(d, dataType));
}

export function getMinTickValueInterval(formatString: string, columnType: ValueType, is100Pct?: boolean): number {
    const isCustomFormat = formatString && !numberFormat.isStandardFormat(formatString);
    if (isCustomFormat) {
        let precision = numberFormat.getCustomFormatMetadata(formatString, true /*calculatePrecision*/).precision;
        if (formatString.indexOf("%") > -1)
            precision += 2; // percent values are multiplied by 100 during formatting
        return Math.pow(10, -precision);
    }
    else if (is100Pct) {
        return 0.01;
    }
    else if (columnType.integer) {
        return 1;
    }

    return 0;
}

function createScalarDomain(data: AxisHelperSeries[], userMin: powerbi.DataViewPropertyValue, userMax: powerbi.DataViewPropertyValue, axisType: powerbi.ValueTypeDescriptor, ensureDomain?: powerbi.NumberRange): number[] {
    if (data.length === 0) {
        return null;
    }

    const defaultMinX = <number>min(data, (kv) => { return min(kv.data, d => { return d && d.categoryValue; }); });
    const defaultMaxX = <number>max(data, (kv) => { return max(kv.data, d => { return d && d.categoryValue; }); });

    return combineDomain([userMin, userMax], [defaultMinX, defaultMaxX], ensureDomain);
}

/**
 * Creates a [min,max] from your Cartiesian data values.
 *
 * @param data The series array of CartesianDataPoints.
 * @param includeZero Columns and bars includeZero, line and scatter do not.
 */
export function createValueDomain(data: AxisHelperSeries[], includeZero: boolean): number[] {
    if (data.length === 0)
        return null;

    const minY = <number>min(data, (kv) => { return min(kv.data, d => { return d && d.value; }); });
    const maxY = <number>max(data, (kv) => { return max(kv.data, d => { return d && d.value; }); });

    if (includeZero) {
        return [Math.min(minY, 0), Math.max(maxY, 0)];
    }

    return [minY, maxY];
}

function createOrdinalDomain(data: AxisHelperSeries[]): number[] {
    if (arrayIsEmpty(data)) {
        return [];
    }

    // each series shares the same categories for oridinal axes (even if a series has some nulls)
    const domain = [];
    const firstSeries = data[0];
    for (const dp of firstSeries.data) {
        if (!dp.highlight) {
            domain.push(dp.categoryIndex);
        }
    }

    return domain;
}

import * as LabelLayoutStrategy from "./labelLayoutStrategy";

export {
    LabelLayoutStrategy
};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function createPointScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio: number = 0): ScalePoint<any> {
    return scalePoint()
        .range([0, pixelSpan])
        .padding(outerPaddingRatio)
        /* Avoid using rangeRoundBands here as it is adding some extra padding to the axis*/
        .domain(dataDomain);
}

export function createOrdinalScale(pixelSpan: number, dataDomain: any[], outerPaddingRatio: number = 0, innerPaddingRatio: number = 0.2, useRangePoints: boolean = false): ScaleOrdinal<any, any> | ScalePoint<any> {
    if (useRangePoints) {
        return scalePoint()
            .rangeRound([0, pixelSpan])
            .padding(innerPaddingRatio)
            /* Avoid using rangeRoundBands here as it is adding some extra padding to the axis*/
            .domain(dataDomain);
    }
    return scaleBand()
        .range([0, pixelSpan])
        .paddingInner(innerPaddingRatio)
        .paddingOuter(outerPaddingRatio)
        /* Avoid using rangeRoundBands here as it is adding some extra padding to the axis*/
        .domain(dataDomain);
}

export function isLogScalePossible(domain: any[], axisType?: ValueType): boolean {
    if (domain == null) {
        return false;
    }

    if (isDateTime(axisType)) {
        return false;
    }

    return (domain[0] > 0 && domain[1] > 0) || (domain[0] < 0 && domain[1] < 0); // doman must exclude 0
}

// this function can return different scales e.g. log, linear
// NOTE: export only for testing, do not access directly
export function createNumericalScale(
    axisScaleType: string,
    pixelSpan: number,
    dataDomain: any[],
    dataType: ValueType,
    outerPadding: number = 0,
    niceCount?: number,
    shouldClamp?: boolean): ScaleLinear<any, any> {

    if (axisScaleType === axisScale.log && isLogScalePossible(dataDomain, dataType)) {
        return createLogScale(pixelSpan, dataDomain, outerPadding, niceCount);
    }

    return createLinearScale(pixelSpan, dataDomain, outerPadding, niceCount, shouldClamp);
}

function createLogScale(pixelSpan: number, dataDomain: Iterable<NumberValue>, outerPadding: number = 0, niceCount?: number): ScaleLogarithmic<number, number, never> {
    const logScale = scaleLog()
        .range([outerPadding, pixelSpan - outerPadding])
        .domain([dataDomain[0], dataDomain[1]])
        .clamp(true);

    if (niceCount) {
        logScale.nice();
    }

    return logScale;
}

// NOTE: export only for testing, do not access directly
export function createLinearScale(pixelSpan: number, dataDomain: Iterable<NumberValue>, outerPadding: number = 0, niceCount?: number, shouldClamp?: boolean): ScaleLinear<number, number, never> {
    const linearScale = scaleLinear()
        .range([outerPadding, pixelSpan - outerPadding])
        .domain([dataDomain[0], dataDomain[1]])
        .clamp(shouldClamp);

    // .nice(undefined) still modifies the scale boundaries, and for datetime this messes things up.
    // we use millisecond ticks since epoch for datetime, so we don't want any "nice" with numbers like 17398203392.
    if (niceCount) {
        linearScale.nice(niceCount);
    }

    return linearScale;
}

export function getRangeForColumn(sizeColumn: powerbi.DataViewValueColumn): powerbi.NumberRange {
    const result: powerbi.NumberRange = {};

    if (sizeColumn) {
        result.min = <number>(sizeColumn.min == null
            ? sizeColumn.minLocal == null ? min(sizeColumn.values as number[]) : sizeColumn.minLocal
            : sizeColumn.min);
        result.max = <number>(sizeColumn.max == null
            ? sizeColumn.maxLocal == null ? max(sizeColumn.values as number[]) : sizeColumn.maxLocal
            : sizeColumn.max);
    }

    return result;
}

/**
 * Set customized domain, but don't change when nothing is set
 */
export function applyCustomizedDomain(customizedDomain, forcedDomain: any[]): any[] {
    let domain: any[] = [undefined, undefined];

    if (forcedDomain && forcedDomain.length === 2) {
        domain = [forcedDomain[0], forcedDomain[1]];
    }

    if (customizedDomain && customizedDomain.length === 2) {
        if (customizedDomain[0] != null) {
            domain[0] = customizedDomain[0];
        }
        if (customizedDomain[1] != null) {
            domain[1] = customizedDomain[1];
        }
    }

    if (domain[0] == null && domain[1] == null) {
        return forcedDomain; // return untouched object
    }

    // do extra check to see if the user input was valid with the merged axis values.
    if (domain[0] != null && domain[1] != null) {
        if (domain[0] > domain[1]) {
            return forcedDomain;
        }
    }

    return domain;
}

/**
 * Combine the forced domain with the actual domain if one of the values was set.
 * The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.
 */
export function combineDomain(forcedDomain: any[], domain: any[], ensureDomain?: powerbi.NumberRange): any[] {
    let combinedDomain: any[] = domain ? [domain[0], domain[1]] : [];

    if (ensureDomain) {
        if (combinedDomain[0] == null || ensureDomain.min < combinedDomain[0])
            combinedDomain[0] = ensureDomain.min;

        if (combinedDomain[1] == null || ensureDomain.max > combinedDomain[1])
            combinedDomain[1] = ensureDomain.max;
    }

    const domainBeforeForced: any[] = [combinedDomain[0], combinedDomain[1]];

    if (forcedDomain && forcedDomain.length === 2) {
        if (forcedDomain[0] != null) {
            combinedDomain[0] = forcedDomain[0];
        }
        if (forcedDomain[1] != null) {
            combinedDomain[1] = forcedDomain[1];
        }
        if (combinedDomain[0] > combinedDomain[1]) {
            combinedDomain = domainBeforeForced; // this is invalid, so take the original domain considering the values and the reference line
        }
    }
    return combinedDomain;
}

export function createAxisLabel(properties: powerbi.DataViewObject, label: string, unitType: string, y2: boolean = false): string {
    const propertyName = y2 ? "secAxisStyle" : "axisStyle";
    if (!properties || !properties[propertyName]) {
        return label;
    }

    let modifiedLabel;
    if (properties[propertyName] === axisStyle.showBoth) {
        modifiedLabel = label + " (" + unitType + ")";
    }
    else if (properties[propertyName] === axisStyle.showUnitOnly) {
        modifiedLabel = unitType;
    }
    else {
        modifiedLabel = label;
    }

    return modifiedLabel;
}

export function scaleShouldClamp(combinedDomain: any[], domain: any[]): boolean {
    if (!combinedDomain || !domain || combinedDomain.length < 2 || domain.length < 2) {
        return false;
    }

    // when the start or end is different, clamp it
    return combinedDomain[0] !== domain[0] || combinedDomain[1] !== domain[1];
}

export function normalizeNonFiniteNumber(value: powerbi.PrimitiveValue): number {
    if (isNaN(<number>value)) {
        return null;
    }
    else if (value === Number.POSITIVE_INFINITY) {
        return Number.MAX_VALUE;
    }
    else if (value === Number.NEGATIVE_INFINITY) {
        return -Number.MAX_VALUE;
    }

    return <number>value;
}

/**
 * Indicates whether the number is power of 10.
 */
export function powerOfTen(d: any): boolean {
    const value = Math.abs(d);
    // formula log2(Y)/log2(10) = log10(Y)
    // because double issues this won't return exact value
    // we need to ceil it to nearest number.
    let log10: number = Math.log(value) / Math.LN10;
    log10 = Math.ceil(log10 - 1e-12);

    return value / Math.pow(10, log10) === 1;
}

function arrayIsEmpty(array: any[]): boolean {
    return !(array && array.length);
}
