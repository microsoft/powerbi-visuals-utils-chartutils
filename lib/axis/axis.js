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
import { bisect, max, min } from "d3-array";
import { scaleLinear, scaleLog } from "d3-scale";
import * as d3svg from "d3-svg";
import * as d3axis from "d3-axis";
// powerbi.extensibility.utils.type
import { double as Double, valueType } from "powerbi-visuals-utils-typeutils";
var ValueType = valueType.ValueType;
import { AxisOrientation } from "./axisInterfaces";
import * as axisScale from "./axisScale";
import * as axisStyle from "./axisStyle";
// powerbi.extensibility.utils.formatting
import { valueFormatter as vf, textMeasurementService as tms, textUtil, wordBreaker, dateTimeSequence, formattingService } from "powerbi-visuals-utils-formattingutils";
var DateTimeSequence = dateTimeSequence.DateTimeSequence;
var textMeasurementService = tms.textMeasurementService;
var valueFormatter = vf.valueFormatter;
var numberFormat = formattingService.numberFormat;
// powerbi.extensibility.utils.chart
// import axisScale = powerbi.extensibility.utils.chart.axis.scale;
// import axisStyle = powerbi.extensibility.utils.chart.axis.style;
let XLabelMaxAllowedOverflow = 35;
let TextHeightConstant = 10;
let MinTickCount = 2;
let DefaultBestTickCount = 3;
let LeftPadding = 10;
let ScalarTickLabelPadding = 3;
const TickLabelPadding = 2;
const MinOrdinalRectThickness = 20;
/**
 * Default ranges are for when we have a field chosen for the axis,
 * but no values are returned by the query.
 */
export const emptyDomain = [0, 0];
export const stackedAxisPadding = 5;
export function getRecommendedNumberOfTicksForXAxis(availableWidth) {
    if (availableWidth < 300) {
        return 3;
    }
    if (availableWidth < 500) {
        return 5;
    }
    return 8;
}
export function getRecommendedNumberOfTicksForYAxis(availableWidth) {
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
export function getBestNumberOfTicks(min, max, valuesMetadata, maxTickCount, isDateTime) {
    if (isNaN(min) || isNaN(max)) {
        return DefaultBestTickCount;
    }
    if (maxTickCount <= 1 || (max <= 1 && min >= -1)) {
        return maxTickCount;
    }
    if (min === max) {
        // datetime needs to only show one tick value in this case so formatting works correctly
        if (!!isDateTime) {
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
export function hasNonIntegerData(valuesMetadata) {
    for (let i = 0, len = valuesMetadata.length; i < len; i++) {
        let currentMetadata = valuesMetadata[i];
        if (currentMetadata && currentMetadata.type && !currentMetadata.type.integer) {
            return true;
        }
    }
    return false;
}
export function getRecommendedTickValues(maxTicks, scale, axisType, isScalar, minTickInterval) {
    if (!isScalar || isOrdinalScale(scale)) {
        return getRecommendedTickValuesForAnOrdinalRange(maxTicks, scale.domain());
    }
    else if (isDateTime(axisType)) {
        return getRecommendedTickValuesForADateTimeRange(maxTicks, scale.domain());
    }
    return getRecommendedTickValuesForAQuantitativeRange(maxTicks, scale, minTickInterval);
}
export function getRecommendedTickValuesForAnOrdinalRange(maxTicks, labels) {
    let tickLabels = [];
    // return no ticks in this case
    if (maxTicks <= 0)
        return tickLabels;
    let len = labels.length;
    if (maxTicks > len)
        return labels;
    for (let i = 0, step = Math.ceil(len / maxTicks); i < len; i += step) {
        tickLabels.push(labels[i]);
    }
    return tickLabels;
}
export function getRecommendedTickValuesForAQuantitativeRange(maxTicks, scale, minInterval) {
    let tickLabels = [];
    // if maxticks is zero return none
    if (maxTicks === 0)
        return tickLabels;
    let quantitiveScale = scale;
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
function createTrueZeroTickLabel(ticks, epsilon = 1e-5) {
    if (!ticks || ticks.length < 2)
        return ticks;
    let closeZero = epsilon * Math.abs(ticks[1] - ticks[0]);
    return ticks.map((tick) => Math.abs(tick) <= closeZero ? 0 : tick);
}
function getRecommendedTickValuesForADateTimeRange(maxTicks, dataDomain) {
    let tickLabels = [];
    if (dataDomain[0] === 0 && dataDomain[1] === 0)
        return [];
    let dateTimeTickLabels = DateTimeSequence.calculate(new Date(dataDomain[0]), new Date(dataDomain[1]), maxTicks).sequence;
    tickLabels = dateTimeTickLabels.map(d => d.getTime());
    tickLabels = ensureValuesInRange(tickLabels, dataDomain[0], dataDomain[1]);
    return tickLabels;
}
function normalizeLinearDomain(domain) {
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
export function getMargin(availableWidth, availableHeight, xMargin, yMargin) {
    return {
        top: 20,
        right: 30,
        bottom: 40,
        left: 30
    };
}
// TODO: Put the parameters into one object
export function getTickLabelMargins(viewport, yMarginLimit, textWidthMeasurer, textHeightMeasurer, axes, bottomMarginLimit, properties, scrollbarVisible, showOnRight, renderXAxis, renderY1Axis, renderY2Axis) {
    let xAxisProperties = axes.x;
    let y1AxisProperties = axes.y1;
    let y2AxisProperties = axes.y2;
    let xLabels = xAxisProperties.values;
    let y1Labels = y1AxisProperties.values;
    let leftOverflow = 0;
    let rightOverflow = 0;
    let maxWidthY1 = 0;
    let maxWidthY2 = 0;
    let xMax = 0; // bottom margin
    let ordinalLabelOffset = xAxisProperties.categoryThickness ? xAxisProperties.categoryThickness / 2 : 0;
    let scaleIsOrdinal = isOrdinalScale(xAxisProperties.scale);
    let hasHierarchy = !arrayIsEmpty(axes.xStack);
    let xLabelOuterPadding = 0;
    if (xAxisProperties.outerPadding !== undefined) {
        xLabelOuterPadding = xAxisProperties.outerPadding;
    }
    else if (xAxisProperties.xLabelMaxWidth !== undefined) {
        xLabelOuterPadding = Math.max(0, (viewport.width - xAxisProperties.xLabelMaxWidth * xLabels.length) / 2);
    }
    let textHeight;
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
        let y2Labels = y2AxisProperties.values;
        for (let i = 0, len = y2Labels.length; i < len; i++) {
            properties.text = y2Labels[i];
            maxWidthY2 = Math.max(maxWidthY2, textWidthMeasurer(properties));
        }
    }
    textHeight = textHeightMeasurer(properties);
    let maxNumLines = Math.floor(bottomMarginLimit / textHeight);
    let xScale = xAxisProperties.scale;
    let xDomain = xScale.domain();
    if (renderXAxis && xLabels.length > 0) {
        for (let i = 0, len = xLabels.length; i < len; i++) {
            // find the max height of the x-labels, perhaps rotated or wrapped
            let height;
            properties.text = xLabels[i];
            let width = textWidthMeasurer(properties);
            if (xAxisProperties.willLabelsWordBreak) {
                // Split label and count rows
                let wordBreaks = wordBreaker.splitByWidth(properties.text, properties, textWidthMeasurer, xAxisProperties.xLabelMaxWidth, maxNumLines);
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
                    let xPos = xScale(xDomain[0]);
                    // xPos already incorporates xLabelOuterPadding, don't subtract it twice
                    leftOverflow = (width / 2) - xPos;
                    leftOverflow = Math.max(leftOverflow, 0);
                }
            }
            else if (i === len - 1) {
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
                    let xPos = xScale(xDomain[1]);
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
    let rightMargin = 0, leftMargin = 0, bottomMargin = Math.min(Math.ceil(xMax), bottomMarginLimit);
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
        xMax: Math.ceil(bottomMargin),
        yLeft: Math.ceil(leftMargin),
        yRight: Math.ceil(rightMargin),
        stackHeight: textHeight + stackedAxisPadding,
    };
}
export function columnDataTypeHasValue(dataType) {
    return dataType && (dataType.bool || dataType.numeric || dataType.text || dataType.dateTime);
}
export function createOrdinalType() {
    return ValueType.fromDescriptor({ text: true });
}
export function isOrdinal(dataType) {
    return !!(dataType && (dataType.text || dataType.bool || (dataType.misc && dataType.misc.barcode) || (dataType.geography && dataType.geography.postalCode)));
}
export function isOrdinalScale(scale) {
    return typeof scale.rangePoints === "function";
}
export function isDateTime(dataType) {
    return !!(dataType && dataType.dateTime);
}
export function invertScale(scale, x) {
    if (isOrdinalScale(scale)) {
        return invertOrdinalScale(scale, x);
    }
    return scale.invert(x);
}
export function extent(scale) {
    if (isOrdinalScale(scale)) {
        return scale.rangeExtent();
    }
    return scale.range();
}
/**
 * Uses the D3 scale to get the actual category thickness.
 * @return The difference between the 1st and 2nd items in the range if there are 2 or more items in the range.
 * Otherwise, the length of the entire range.
 */
export function getCategoryThickness(scale) {
    let leftEdges = scale.range();
    if (leftEdges.length < 2) {
        // We have 1 item if we don't have 2 edges. If we have 1 item, just use the entire axis length as the thickness.
        if (isOrdinalScale(scale)) {
            // We should only hit this if we have an ordinal scale. Other scales should always have 2 items in their range.
            let rangeExtent = scale.rangeExtent();
            return rangeExtent[1] - rangeExtent[0];
        }
    }
    return leftEdges[1] - leftEdges[0];
}
/**
 * Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
 * Otherwise, it returns the greatest item in scale.domain() that's <= x.
 */
export function invertOrdinalScale(scale, x) {
    let leftEdges = scale.range();
    if (leftEdges.length < 2) {
        return 0;
    }
    let width = scale.rangeBand();
    let halfInnerPadding = (leftEdges[1] - leftEdges[0] - width) / 2;
    let range = scale.range();
    let domain = scale.domain();
    // If x is less than the range, just return the 1st item in the domain
    if (range[0] > x) {
        return domain[0];
    }
    // d3.bisect returns the index at which we can insert something so that everything before it is lesser and everything after it is greater.
    // The leftEdges don't include the inner padding, so we need to shift x over by halfInnerPadding to account it.
    // We want index - 1 since that's the greatest value less than x, meaning that's the band we're in.
    // Use that index to find the right value in the domain.
    return domain[bisect(range, x + halfInnerPadding) - 1];
}
export function findClosestXAxisIndex(categoryValue, categoryAxisValues) {
    let closestValueIndex = -1, minDistance = Number.MAX_VALUE;
    for (let i in categoryAxisValues) {
        let distance = Math.abs(categoryValue - categoryAxisValues[i].categoryValue);
        if (distance < minDistance) {
            minDistance = distance;
            closestValueIndex = parseInt(i, 10);
        }
    }
    return closestValueIndex;
}
export function lookupOrdinalIndex(scale, pixelValue) {
    let closestValueIndex = -1;
    let minDistance = Number.MAX_VALUE;
    let domain = scale.domain();
    if (domain.length < 2) {
        return 0;
    }
    let halfWidth = (scale(1) - scale(0)) / 2;
    for (let idx in domain) {
        let leftEdgeInPixels = scale(idx);
        let midPoint = leftEdgeInPixels + halfWidth;
        let distance = Math.abs(pixelValue - midPoint);
        if (distance < minDistance) {
            minDistance = distance;
            closestValueIndex = parseInt(idx, 10);
        }
    }
    return closestValueIndex;
}
/** scale(value1) - scale(value2) with zero checking and min(+/-1, result) */
export function diffScaled(scale, value1, value2) {
    let value = scale(value1) - scale(value2);
    if (value === 0) {
        return 0;
    }
    if (value < 0) {
        return Math.min(value, -1);
    }
    return Math.max(value, 1);
}
export function createDomain(data, axisType, isScalar, forcedScalarDomain, ensureDomain) {
    if (isScalar && !isOrdinal(axisType)) {
        let userMin, userMax;
        if (forcedScalarDomain && forcedScalarDomain.length === 2) {
            userMin = forcedScalarDomain[0];
            userMax = forcedScalarDomain[1];
        }
        return createScalarDomain(data, userMin, userMax, axisType, ensureDomain);
    }
    return createOrdinalDomain(data);
}
export function ensureValuesInRange(values, min, max) {
    let filteredValues = values.filter(v => v >= min && v <= max);
    if (filteredValues.length < 2) {
        filteredValues = [min, max];
    }
    return filteredValues;
}
/**
 * Gets the ValueType of a category column, defaults to Text if the type is not present.
 */
export function getCategoryValueType(metadataColumn, isScalar) {
    if (metadataColumn && columnDataTypeHasValue(metadataColumn.type)) {
        return metadataColumn.type;
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
export function createAxis(options) {
    let pixelSpan = options.pixelSpan, dataDomain = options.dataDomain, metaDataColumn = options.metaDataColumn, formatString = options.formatString, outerPadding = options.outerPadding || 0, isCategoryAxis = !!options.isCategoryAxis, isScalar = !!options.isScalar, isVertical = !!options.isVertical, useTickIntervalForDisplayUnits = !!options.useTickIntervalForDisplayUnits, // DEPRECATE: same meaning as isScalar?
    getValueFn = options.getValueFn, categoryThickness = options.categoryThickness, axisDisplayUnits = options.axisDisplayUnits, axisPrecision = options.axisPrecision, is100Pct = !!options.is100Pct, disableNice = options.disableNice;
    let dataType = getCategoryValueType(metaDataColumn, isScalar);
    // Create the Scale
    let scaleResult = createScale(options);
    let scale = scaleResult.scale;
    let bestTickCount = scaleResult.bestTickCount;
    let scaleDomain = scale.domain();
    let isLogScaleAllowed = isLogScalePossible(dataDomain, dataType);
    // fix categoryThickness if scalar and the domain was adjusted when making the scale "nice"
    if (categoryThickness && isScalar && dataDomain && dataDomain.length === 2) {
        let oldSpan = dataDomain[1] - dataDomain[0];
        let newSpan = scaleDomain[1] - scaleDomain[0];
        if (oldSpan > 0 && newSpan > 0) {
            categoryThickness = categoryThickness * oldSpan / newSpan;
        }
    }
    // Prepare Tick Values for formatting
    let tickValues;
    if (isScalar && bestTickCount === 1 && !arrayIsEmpty(dataDomain)) {
        tickValues = [dataDomain[0]];
    }
    else {
        let minTickInterval = isScalar ? getMinTickValueInterval(formatString, dataType, is100Pct) : undefined;
        tickValues = getRecommendedTickValues(bestTickCount, scale, dataType, isScalar, minTickInterval);
    }
    if (options.scaleType && options.scaleType === axisScale.log && isLogScaleAllowed) {
        tickValues = tickValues.filter((d) => { return powerOfTen(d); });
    }
    let formatter = createFormatter(scaleDomain, dataDomain, dataType, isScalar, formatString, bestTickCount, tickValues, getValueFn, useTickIntervalForDisplayUnits, axisDisplayUnits, axisPrecision);
    // sets default orientation only, cartesianChart will fix y2 for comboChart
    // tickSize(pixelSpan) is used to create gridLines
    let axisFunction = isVertical ? d3axis.axisLeft : d3axis.axisBottom;
    let axis = axisFunction()
        .scale(scale)
        .tickSize(6, 0)
        .ticks(bestTickCount)
        .tickValues(tickValues);
    let formattedTickValues = [];
    if (metaDataColumn)
        formattedTickValues = formatAxisTickValues(axis, tickValues, formatter, dataType, getValueFn);
    let xLabelMaxWidth;
    // Use category layout of labels if specified, otherwise use scalar layout of labels
    if (!isScalar && categoryThickness) {
        xLabelMaxWidth = Math.max(1, categoryThickness - TickLabelPadding * 2);
    }
    else {
        // When there are 0 or 1 ticks, then xLabelMaxWidth = pixelSpan
        xLabelMaxWidth = tickValues.length > 1 ? getScalarLabelMaxWidth(scale, tickValues) : pixelSpan;
        xLabelMaxWidth = xLabelMaxWidth - ScalarTickLabelPadding * 2;
    }
    return {
        scale: scale,
        axis: axis,
        formatter: formatter,
        values: formattedTickValues,
        axisType: dataType,
        axisLabel: null,
        isCategoryAxis: isCategoryAxis,
        xLabelMaxWidth: xLabelMaxWidth,
        categoryThickness: categoryThickness,
        outerPadding: outerPadding,
        usingDefaultDomain: scaleResult.usingDefaultDomain,
        isLogScaleAllowed: isLogScaleAllowed,
        dataDomain: dataDomain,
    };
}
/**
 * Creates a D3 axis for stacked axis usage. `options.innerTickSize` and `options.outerTickSize` will be defaulted to 0 if not set.
 * `options.orientation` will be defaulted to "bottom" if not specified.
 */
export function createStackedAxis(options) {
    let axis = options.axis;
    let orientation = options.orient != null ? AxisOrientation[options.orient] : AxisOrientation[AxisOrientation.bottom];
    return d3svg.axis()
        .scale(options.scale)
        .tickSize(options.innerTickSize || 0, options.outerTickSize || 0)
        .orient(orientation)
        .ticks(axis.ticks())
        .tickValues(axis.tickValues())
        .tickFormat(options.tickFormat);
}
function getScalarLabelMaxWidth(scale, tickValues) {
    // find the distance between two ticks. scalar ticks can be anywhere, such as:
    // |---50----------100--------|
    if (scale && !arrayIsEmpty(tickValues)) {
        return Math.abs(scale(tickValues[1]) - scale(tickValues[0]));
    }
    return 1;
}
export function createScale(options) {
    let pixelSpan = options.pixelSpan, dataDomain = options.dataDomain, metaDataColumn = options.metaDataColumn, outerPadding = options.outerPadding || 0, isScalar = !!options.isScalar, isVertical = !!options.isVertical, forcedTickCount = options.forcedTickCount, categoryThickness = options.categoryThickness, shouldClamp = !!options.shouldClamp, maxTickCount = options.maxTickCount, disableNice = options.disableNice, disableNiceOnlyForScale = options.disableNiceOnlyForScale, innerPadding = options.innerPadding, useRangePoint = options.useRangePoints;
    let dataType = getCategoryValueType(metaDataColumn, isScalar);
    let maxTicks = isVertical ? getRecommendedNumberOfTicksForYAxis(pixelSpan) : getRecommendedNumberOfTicksForXAxis(pixelSpan);
    if (maxTickCount &&
        maxTicks > maxTickCount)
        maxTicks = maxTickCount;
    let scalarDomain = dataDomain ? dataDomain.slice() : null;
    let bestTickCount = maxTicks;
    if (disableNice) {
        bestTickCount = null;
    }
    let scale;
    let usingDefaultDomain = false;
    if (dataDomain == null || (dataDomain.length === 2 && dataDomain[0] == null && dataDomain[1] == null) || (dataDomain.length !== 2 && isScalar)) {
        usingDefaultDomain = true;
        if (dataType.dateTime || !isOrdinal(dataType))
            dataDomain = emptyDomain;
        else
            dataDomain = [];
        if (isOrdinal(dataType)) {
            scale = createOrdinalScale(pixelSpan, dataDomain, categoryThickness ? outerPadding / categoryThickness : 0, innerPadding, useRangePoint);
        }
        else {
            scale = createNumericalScale(options.scaleType, pixelSpan, dataDomain, dataType, outerPadding, bestTickCount);
        }
    }
    else {
        if (isScalar && dataDomain.length > 0) {
            if (!disableNice) {
                bestTickCount = forcedTickCount !== undefined
                    ? (maxTicks !== 0 ? forcedTickCount : 0)
                    : getBestNumberOfTicks(dataDomain[0], dataDomain[dataDomain.length - 1], [metaDataColumn], maxTicks, dataType.dateTime);
            }
            let normalizedRange = normalizeLinearDomain({ min: dataDomain[0], max: dataDomain[dataDomain.length - 1] });
            scalarDomain = [normalizedRange.min, normalizedRange.max];
        }
        if (isScalar && dataType.numeric && !dataType.dateTime) {
            if (scalarDomain && scalarDomain.length === 2 && scalarDomain[0] === 0 && scalarDomain[1] === 0 && options.zeroScalarDomain) {
                scalarDomain[0] = options.zeroScalarDomain[0];
                scalarDomain[1] = options.zeroScalarDomain[1];
            }
            let bestTickCountForNumericalScale = bestTickCount;
            if (disableNiceOnlyForScale) {
                bestTickCountForNumericalScale = null;
            }
            scale = createNumericalScale(options.scaleType, pixelSpan, scalarDomain, dataType, outerPadding, bestTickCountForNumericalScale, shouldClamp);
        }
        else if (isScalar && dataType.dateTime) {
            // Use of a linear scale, instead of a D3.time.scale, is intentional since we want
            // to control the formatting of the time values, since d3's implementation isn't
            // in accordance to our design.
            //     scalarDomain: should already be in long-int time (via category.values[0].getTime())
            scale = createLinearScale(pixelSpan, scalarDomain, outerPadding, null, shouldClamp); // DO NOT PASS TICKCOUNT
        }
        else if (dataType.text || dataType.dateTime || dataType.numeric || dataType.bool) {
            scale = createOrdinalScale(pixelSpan, scalarDomain, categoryThickness ? outerPadding / categoryThickness : 0, innerPadding, useRangePoint);
            bestTickCount = maxTicks === 0 ? 0
                : Math.min(scalarDomain.length, (pixelSpan - outerPadding * 2) / MinOrdinalRectThickness);
        }
    }
    // vertical ordinal axis (e.g. categorical bar chart) does not need to reverse
    if (isVertical && isScalar) {
        scale.range(scale.range().reverse());
    }
    normalizeInfinityInScale(scale);
    return {
        scale: scale,
        bestTickCount: bestTickCount,
        usingDefaultDomain: usingDefaultDomain,
    };
}
export function normalizeInfinityInScale(scale) {
    // When large values (eg Number.MAX_VALUE) are involved, a call to scale.nice occasionally
    // results in infinite values being included in the domain. To correct for that, we need to
    // re-normalize the domain now to not include infinities.
    let scaledDomain = scale.domain();
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
export function createFormatter(scaleDomain, dataDomain, dataType, isScalar, formatString, bestTickCount, tickValues, getValueFn, useTickIntervalForDisplayUnits = false, axisDisplayUnits, axisPrecision) {
    let formatter;
    if (dataType.dateTime) {
        if (isScalar) {
            let value = new Date(scaleDomain[0]);
            let value2 = new Date(scaleDomain[1]);
            // datetime with only one value needs to pass the same value
            // (from the original dataDomain value, not the adjusted scaleDomain)
            // so formatting works correctly.
            if (bestTickCount === 1)
                value = value2 = new Date(dataDomain[0]);
            // this will ignore the formatString and create one based on the smallest non-zero portion of the values supplied.
            formatter = valueFormatter.create({
                format: formatString,
                value: value,
                value2: value2,
                tickCount: bestTickCount,
            });
        }
        else {
            // Use the model formatString for ordinal datetime
            formatter = valueFormatter.createDefaultFormatter(formatString, true);
        }
    }
    else {
        if (useTickIntervalForDisplayUnits && isScalar && tickValues.length > 1) {
            let value1 = axisDisplayUnits ? axisDisplayUnits : tickValues[1] - tickValues[0];
            let options = {
                format: formatString,
                value: value1,
                value2: 0,
                allowFormatBeautification: true,
            };
            if (axisPrecision)
                options.precision = axisPrecision;
            else
                options.precision = calculateAxisPrecision(tickValues[0], tickValues[1], axisDisplayUnits, formatString);
            formatter = valueFormatter.create(options);
        }
        else {
            // do not use display units, just the basic value formatter
            // datetime is handled above, so we are ordinal and either boolean, numeric, or text.
            formatter = valueFormatter.createDefaultFormatter(formatString, true);
        }
    }
    return formatter;
}
// returns # of decimal places necessary to distinguish between tick mark values
export function calculateAxisPrecision(tickValue0, tickValue1, axisDisplayUnits, formatString) {
    if (!axisDisplayUnits) {
        let displayUnitSystem = valueFormatter.createDisplayUnitSystem();
        displayUnitSystem.update(tickValue1 - tickValue0);
        axisDisplayUnits = displayUnitSystem.displayUnit && displayUnitSystem.displayUnit.value || 1;
    }
    let value0 = (tickValue0 || 0) / axisDisplayUnits;
    let value1 = (tickValue1 || 0) / axisDisplayUnits;
    if (formatString) {
        let partsPerScale = numberFormat.getCustomFormatMetadata(formatString, false, false, true).partsPerScale;
        value0 *= partsPerScale;
        value1 *= partsPerScale;
    }
    return Math.max(calculateAxisPrecisionForValue(value0), calculateAxisPrecisionForValue(value1));
}
function calculateAxisPrecisionForValue(value) {
    if (value === 0)
        return 0;
    if (value < 0)
        value = -value;
    // calculate place of of the most significant decimal digit.
    // 1 means tens digit
    // 0 means the ones digit
    // -1 means tenths digit
    let mostSignificantDigit = Math.floor(Double.log10(value));
    // rounding in various calculations can introduce extraneous amounts of precision in the number
    // no need in an axis label to allow more than this number of digits as the *difference* between
    // ticks
    let MaxDigits = 5;
    if (mostSignificantDigit >= 0) {
        // value has an integer part but may also have a fraction part. get the number of significant
        // digits in the integer part then see how many that leaves us for the fractional part
        let integerSignificantDigits = mostSignificantDigit + 1;
        let maxFractionDigits = MaxDigits - integerSignificantDigits;
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
        let rescaledValue = value / Double.pow10(mostSignificantDigit + 1);
        // get the actual number of significant digits respecting the maximum
        let fractionSignificantDigits = numberOfDecimalPlaces(rescaledValue, MaxDigits);
        // this is the number of zeroes that are required due to the true scale of the decimal fraction
        let fractionScaleDigits = -mostSignificantDigit - 1;
        // number of decimal places is the number of zeros plus the limited number of significant digits
        return fractionScaleDigits + fractionSignificantDigits;
    }
}
// if we're limiting the decimal places to maxDecimalPlaces, how many decimal places do
// we actually need to avoid trailing zeroes? for example, if the value is 1.500001 and
// we want a maximum of three decimal places, the number rounded to three places is 1.500
// so only one decimal place is necessary.
function numberOfDecimalPlaces(value, maxDecimalPlaces) {
    let formattedValue = value.toFixed(maxDecimalPlaces);
    let decimalPoint = formattedValue.indexOf(".");
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
function formatAxisTickValues(axis, tickValues, formatter, dataType, getValueFn) {
    let formattedTickValues = [];
    if (!getValueFn)
        getValueFn = data => data;
    if (formatter) {
        axis.tickFormat(d => formatter.format(getValueFn(d, dataType)));
        formattedTickValues = tickValues.map(d => formatter.format(getValueFn(d, dataType)));
    }
    else {
        formattedTickValues = tickValues.map((d) => getValueFn(d, dataType));
    }
    return formattedTickValues;
}
export function getMinTickValueInterval(formatString, columnType, is100Pct) {
    let isCustomFormat = formatString && !numberFormat.isStandardFormat(formatString);
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
function createScalarDomain(data, userMin, userMax, axisType, ensureDomain) {
    if (data.length === 0) {
        return null;
    }
    let defaultMinX = min(data, (kv) => { return min(kv.data, d => { return d && d.categoryValue; }); });
    let defaultMaxX = max(data, (kv) => { return max(kv.data, d => { return d && d.categoryValue; }); });
    return combineDomain([userMin, userMax], [defaultMinX, defaultMaxX], ensureDomain);
}
/**
 * Creates a [min,max] from your Cartiesian data values.
 *
 * @param data The series array of CartesianDataPoints.
 * @param includeZero Columns and bars includeZero, line and scatter do not.
 */
export function createValueDomain(data, includeZero) {
    if (data.length === 0)
        return null;
    let minY = min(data, (kv) => { return min(kv.data, d => { return d && d.value; }); });
    let maxY = max(data, (kv) => { return max(kv.data, d => { return d && d.value; }); });
    if (includeZero) {
        return [Math.min(minY, 0), Math.max(maxY, 0)];
    }
    return [minY, maxY];
}
function createOrdinalDomain(data) {
    if (arrayIsEmpty(data)) {
        return [];
    }
    // each series shares the same categories for oridinal axes (even if a series has some nulls)
    let domain = [];
    let firstSeries = data[0];
    for (let dp of firstSeries.data) {
        if (!dp.highlight) {
            domain.push(dp.categoryIndex);
        }
    }
    return domain;
}
export var LabelLayoutStrategy;
(function (LabelLayoutStrategy) {
    function willLabelsFit(axisProperties, availableWidth, textMeasurer, properties) {
        let labels = axisProperties.values;
        if (labels.length === 0)
            return false;
        let labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
            ? axisProperties.xLabelMaxWidth
            : availableWidth / labels.length;
        return !labels.some(d => {
            properties.text = d;
            return textMeasurer(properties) > labelMaxWidth;
        });
    }
    LabelLayoutStrategy.willLabelsFit = willLabelsFit;
    function willLabelsWordBreak(axisProperties, margin, availableWidth, textWidthMeasurer, textHeightMeasurer, textTruncator, properties) {
        let labels = axisProperties.values;
        let labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
            ? axisProperties.xLabelMaxWidth
            : availableWidth / labels.length;
        let maxRotatedLength = margin.bottom / LabelLayoutStrategy.DefaultRotation.sine;
        let height = textHeightMeasurer(properties);
        let maxNumLines = Math.max(1, Math.floor(margin.bottom / height));
        if (labels.length === 0)
            return false;
        // If no break character and exceeds max width, word breaking will not work, return false
        let mustRotate = labels.some(label => {
            // Detect must rotate and return immediately
            properties.text = label;
            return !wordBreaker.hasBreakers(label) && textWidthMeasurer(properties) > labelMaxWidth;
        });
        if (mustRotate) {
            return false;
        }
        let moreWordBreakChars = labels.filter((label, index) => {
            // ...otherwise compare rotation versus word breaking
            let allowedLengthProjectedOnXAxis = 
            // Left margin is the width of Y axis.
            margin.left
                + axisProperties.outerPadding
                + axisProperties.categoryThickness * (index + 0.5)
                - LeftPadding;
            let allowedLength = allowedLengthProjectedOnXAxis / LabelLayoutStrategy.DefaultRotation.cosine;
            let rotatedLength = Math.min(allowedLength, maxRotatedLength);
            // Which shows more characters? Rotated or maxNumLines truncated to labelMaxWidth?
            let wordBreakChars = wordBreaker.splitByWidth(label, properties, textWidthMeasurer, labelMaxWidth, maxNumLines, textTruncator).join(" ");
            properties.text = label;
            let rotateChars = textTruncator(properties, rotatedLength);
            // prefer word break (>=) as it takes up less plot area
            return textUtil.removeEllipses(wordBreakChars).length >= textUtil.removeEllipses(rotateChars).length;
        });
        // prefer word break (>=) as it takes up less plot area
        return moreWordBreakChars.length >= Math.floor(labels.length / 2);
    }
    LabelLayoutStrategy.willLabelsWordBreak = willLabelsWordBreak;
    LabelLayoutStrategy.DefaultRotation = {
        sine: Math.sin(Math.PI * (35 / 180)),
        cosine: Math.cos(Math.PI * (35 / 180)),
        tangent: Math.tan(Math.PI * (35 / 180)),
        transform: "rotate(-35)",
        dy: "-0.5em",
    };
    LabelLayoutStrategy.DefaultRotationWithScrollbar = {
        sine: Math.sin(Math.PI * (90 / 180)),
        cosine: Math.cos(Math.PI * (90 / 180)),
        tangent: Math.tan(Math.PI * (90 / 180)),
        transform: "rotate(-90)",
        dy: "-0.8em",
    };
    // NOTE: the above rotations are matched to D3 tickSize(6,0) and do not work with other tick sizes.
    // we hide these default ticks anyway (on category axes that require rotation), we should make this work
    // with any tick size. For now just hardcode a TickSizeZero structure
    LabelLayoutStrategy.DefaultRotationWithScrollbarTickSizeZero = {
        sine: Math.sin(Math.PI * (90 / 180)),
        cosine: Math.cos(Math.PI * (90 / 180)),
        tangent: Math.tan(Math.PI * (90 / 180)),
        transform: "rotate(-90)",
        dy: "-0.3em",
    };
    /**
     * Perform rotation and/or truncation of axis tick labels (SVG text) with ellipsis
     */
    function rotate(labelSelection, maxBottomMargin, textTruncator, textProperties, needRotate, needEllipsis, axisProperties, margin, scrollbarVisible) {
        let rotatedLength;
        let defaultRotation;
        let tickSize = axisProperties.axis.tickSize();
        if (scrollbarVisible) {
            if (!tickSize)
                defaultRotation = LabelLayoutStrategy.DefaultRotationWithScrollbarTickSizeZero;
            else
                defaultRotation = LabelLayoutStrategy.DefaultRotationWithScrollbar;
        }
        else {
            defaultRotation = LabelLayoutStrategy.DefaultRotation;
        }
        if (needRotate) {
            rotatedLength = maxBottomMargin / defaultRotation.sine;
        }
        labelSelection.each(function (datum) {
            let axisLabel = select(this);
            let labelText = axisLabel.text();
            textProperties.text = labelText;
            if (needRotate) {
                let textContentIndex = axisProperties.values.indexOf(this.textContent);
                let allowedLengthProjectedOnXAxis = 
                // Left margin is the width of Y axis.
                margin.left
                    + axisProperties.outerPadding
                    + axisProperties.categoryThickness * (textContentIndex + 0.5);
                // Subtracting the left padding space from the allowed length.
                if (!scrollbarVisible)
                    allowedLengthProjectedOnXAxis -= LeftPadding;
                // Truncate if scrollbar is visible or rotatedLength exceeds allowedLength
                let allowedLength = allowedLengthProjectedOnXAxis / defaultRotation.cosine;
                if (scrollbarVisible || needEllipsis || (allowedLength < rotatedLength)) {
                    labelText = textTruncator(textProperties, Math.min(allowedLength, rotatedLength));
                    axisLabel.text(labelText);
                }
                // NOTE: see note above - rotation only lines up with default d3 tickSize(6,0)
                // TODO don't do these rotations if we already did them
                axisLabel.style("text-anchor", "end")
                    .attr("dx", "-0.5em")
                    .attr("dy", defaultRotation.dy)
                    .attr("transform", defaultRotation.transform);
            }
            else {
                let maxLabelWidth = !arrayIsEmpty(axisProperties.xLabelMaxWidths) ? axisProperties.xLabelMaxWidths[datum] : axisProperties.xLabelMaxWidth;
                let newLabelText = textTruncator(textProperties, maxLabelWidth);
                if (newLabelText !== labelText)
                    axisLabel.text(newLabelText);
                // TODO don't do these rotations if we already did them
                axisLabel.style("text-anchor", "middle")
                    .attr("dx", "0em")
                    .attr("dy", "1em")
                    .attr("transform", "rotate(0)");
            }
        });
    }
    LabelLayoutStrategy.rotate = rotate;
    function wordBreak(text, axisProperties, maxHeight) {
        let allowedLength = axisProperties.xLabelMaxWidth;
        text.each(function () {
            let node = select(this);
            // Reset style of text node
            node
                .style("text-anchor", "middle")
                .attr("dx", "0em")
                .attr("dy", "1em")
                .attr("transform", "rotate(0)");
            textMeasurementService.wordBreak(this, allowedLength, maxHeight);
        });
    }
    LabelLayoutStrategy.wordBreak = wordBreak;
    function clip(text, availableWidth, svgEllipsis) {
        if (text.size() === 0) {
            return;
        }
        text.each(function () {
            let text = select(this);
            svgEllipsis(text.node(), availableWidth);
        });
    }
    LabelLayoutStrategy.clip = clip;
})(LabelLayoutStrategy || (LabelLayoutStrategy = {}));
export function createOrdinalScale(pixelSpan, dataDomain, outerPaddingRatio = 0, innerPaddingRatio = 0.2, useRangePoints = false) {
    if (useRangePoints === true) {
        return scaleLinear.ordinal()
            .rangePoints([0, pixelSpan], outerPaddingRatio)
            .domain(dataDomain);
    }
    return scaleLinear.ordinal()
        .rangeBands([0, pixelSpan], innerPaddingRatio, outerPaddingRatio)
        .domain(dataDomain);
}
export function isLogScalePossible(domain, axisType) {
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
export function createNumericalScale(axisScaleType, pixelSpan, dataDomain, dataType, outerPadding = 0, niceCount, shouldClamp) {
    if (axisScaleType === axisScale.log && isLogScalePossible(dataDomain, dataType)) {
        return createLogScale(pixelSpan, dataDomain, outerPadding, niceCount);
    }
    return createLinearScale(pixelSpan, dataDomain, outerPadding, niceCount, shouldClamp);
}
function createLogScale(pixelSpan, dataDomain, outerPadding = 0, niceCount) {
    let logScale = scaleLog()
        .range([outerPadding, pixelSpan - outerPadding])
        .domain([dataDomain[0], dataDomain[1]])
        .clamp(true);
    if (niceCount) {
        logScale.nice(niceCount);
    }
    return logScale;
}
// NOTE: export only for testing, do not access directly
export function createLinearScale(pixelSpan, dataDomain, outerPadding = 0, niceCount, shouldClamp) {
    let linearScale = scaleLinear()
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
export function getRangeForColumn(sizeColumn) {
    let result = {};
    if (sizeColumn) {
        result.min = (sizeColumn.min == null
            ? sizeColumn.minLocal == null ? min(sizeColumn.values) : sizeColumn.minLocal
            : sizeColumn.min);
        result.max = (sizeColumn.max == null
            ? sizeColumn.maxLocal == null ? max(sizeColumn.values) : sizeColumn.maxLocal
            : sizeColumn.max);
    }
    return result;
}
/**
 * Set customized domain, but don't change when nothing is set
 */
export function applyCustomizedDomain(customizedDomain, forcedDomain) {
    let domain = [undefined, undefined];
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
export function combineDomain(forcedDomain, domain, ensureDomain) {
    let combinedDomain = domain ? [domain[0], domain[1]] : [];
    if (ensureDomain) {
        if (combinedDomain[0] == null || ensureDomain.min < combinedDomain[0])
            combinedDomain[0] = ensureDomain.min;
        if (combinedDomain[1] == null || ensureDomain.max > combinedDomain[1])
            combinedDomain[1] = ensureDomain.max;
    }
    let domainBeforeForced = [combinedDomain[0], combinedDomain[1]];
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
export function createAxisLabel(properties, label, unitType, y2 = false) {
    let propertyName = y2 ? "secAxisStyle" : "axisStyle";
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
export function scaleShouldClamp(combinedDomain, domain) {
    if (!combinedDomain || !domain || combinedDomain.length < 2 || domain.length < 2) {
        return false;
    }
    // when the start or end is different, clamp it
    return combinedDomain[0] !== domain[0] || combinedDomain[1] !== domain[1];
}
export function normalizeNonFiniteNumber(value) {
    if (isNaN(value)) {
        return null;
    }
    else if (value === Number.POSITIVE_INFINITY) {
        return Number.MAX_VALUE;
    }
    else if (value === Number.NEGATIVE_INFINITY) {
        return -Number.MAX_VALUE;
    }
    return value;
}
/**
 * Indicates whether the number is power of 10.
 */
export function powerOfTen(d) {
    let value = Math.abs(d);
    // formula log2(Y)/log2(10) = log10(Y)
    // because double issues this won't return exact value
    // we need to ceil it to nearest number.
    let log10 = Math.log(value) / Math.LN10;
    log10 = Math.ceil(log10 - 1e-12);
    return value / Math.pow(10, log10) === 1;
}
function arrayIsEmpty(array) {
    return !(array && array.length);
}
//# sourceMappingURL=axis.js.map