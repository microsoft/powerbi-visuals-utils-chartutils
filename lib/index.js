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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var axis;
                (function (axis) {
                    var scale;
                    (function (scale) {
                        scale.linear = "linear";
                        scale.log = "log";
                    })(scale = axis.scale || (axis.scale = {}));
                })(axis = chart.axis || (chart.axis = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var axis;
                (function (axis) {
                    var style;
                    (function (style) {
                        style.showBoth = "showBoth";
                        style.showTitleOnly = "showTitleOnly";
                        style.showUnitOnly = "showUnitOnly";
                    })(style = axis.style || (axis.style = {}));
                })(axis = chart.axis || (chart.axis = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var axis;
                (function (axis) {
                    var AxisOrientation;
                    (function (AxisOrientation) {
                        // Names of these enums match the values passed into axis.orient([orientation])
                        AxisOrientation[AxisOrientation["top"] = 0] = "top";
                        AxisOrientation[AxisOrientation["bottom"] = 1] = "bottom";
                        AxisOrientation[AxisOrientation["left"] = 2] = "left";
                        AxisOrientation[AxisOrientation["right"] = 3] = "right";
                    })(AxisOrientation = axis.AxisOrientation || (axis.AxisOrientation = {}));
                })(axis = chart.axis || (chart.axis = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var axis;
                (function (axis_1) {
                    // powerbi.extensibility.utils.type
                    var ValueType = powerbi.extensibility.utils.type.ValueType;
                    var Double = powerbi.extensibility.utils.type.Double;
                    // powerbi.extensibility.utils.formatting
                    var DateTimeSequence = powerbi.extensibility.utils.formatting.DateTimeSequence;
                    var wordBreaker = powerbi.extensibility.utils.formatting.wordBreaker;
                    var valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
                    var numberFormat = powerbi.extensibility.utils.formatting.numberFormat;
                    var textUtil = powerbi.extensibility.utils.formatting.textUtil;
                    var textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
                    // powerbi.extensibility.utils.chart
                    var axisScale = powerbi.extensibility.utils.chart.axis.scale;
                    var axisStyle = powerbi.extensibility.utils.chart.axis.style;
                    var XLabelMaxAllowedOverflow = 35;
                    var TextHeightConstant = 10;
                    var MinTickCount = 2;
                    var DefaultBestTickCount = 3;
                    var LeftPadding = 10;
                    var ScalarTickLabelPadding = 3;
                    var TickLabelPadding = 2;
                    var MinOrdinalRectThickness = 20;
                    var InnerPaddingRatio = 0.2;
                    /**
                     * Default ranges are for when we have a field chosen for the axis,
                     * but no values are returned by the query.
                     */
                    axis_1.emptyDomain = [0, 0];
                    axis_1.stackedAxisPadding = 5;
                    function getRecommendedNumberOfTicksForXAxis(availableWidth) {
                        if (availableWidth < 300) {
                            return 3;
                        }
                        if (availableWidth < 500) {
                            return 5;
                        }
                        return 8;
                    }
                    axis_1.getRecommendedNumberOfTicksForXAxis = getRecommendedNumberOfTicksForXAxis;
                    function getRecommendedNumberOfTicksForYAxis(availableWidth) {
                        if (availableWidth < 150) {
                            return 3;
                        }
                        if (availableWidth < 300) {
                            return 5;
                        }
                        return 8;
                    }
                    axis_1.getRecommendedNumberOfTicksForYAxis = getRecommendedNumberOfTicksForYAxis;
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
                    function getBestNumberOfTicks(min, max, valuesMetadata, maxTickCount, isDateTime) {
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
                    axis_1.getBestNumberOfTicks = getBestNumberOfTicks;
                    function hasNonIntegerData(valuesMetadata) {
                        for (var i = 0, len = valuesMetadata.length; i < len; i++) {
                            var currentMetadata = valuesMetadata[i];
                            if (currentMetadata && currentMetadata.type && !currentMetadata.type.integer) {
                                return true;
                            }
                        }
                        return false;
                    }
                    axis_1.hasNonIntegerData = hasNonIntegerData;
                    function getRecommendedTickValues(maxTicks, scale, axisType, isScalar, minTickInterval) {
                        if (!isScalar || isOrdinalScale(scale)) {
                            return getRecommendedTickValuesForAnOrdinalRange(maxTicks, scale.domain());
                        }
                        else if (isDateTime(axisType)) {
                            return getRecommendedTickValuesForADateTimeRange(maxTicks, scale.domain());
                        }
                        return getRecommendedTickValuesForAQuantitativeRange(maxTicks, scale, minTickInterval);
                    }
                    axis_1.getRecommendedTickValues = getRecommendedTickValues;
                    function getRecommendedTickValuesForAnOrdinalRange(maxTicks, labels) {
                        var tickLabels = [];
                        // return no ticks in this case
                        if (maxTicks <= 0)
                            return tickLabels;
                        var len = labels.length;
                        if (maxTicks > len)
                            return labels;
                        for (var i = 0, step = Math.ceil(len / maxTicks); i < len; i += step) {
                            tickLabels.push(labels[i]);
                        }
                        return tickLabels;
                    }
                    axis_1.getRecommendedTickValuesForAnOrdinalRange = getRecommendedTickValuesForAnOrdinalRange;
                    function getRecommendedTickValuesForAQuantitativeRange(maxTicks, scale, minInterval) {
                        var tickLabels = [];
                        // if maxticks is zero return none
                        if (maxTicks === 0)
                            return tickLabels;
                        var quantitiveScale = scale;
                        if (quantitiveScale.ticks) {
                            tickLabels = quantitiveScale.ticks(maxTicks);
                            if (tickLabels.length > maxTicks && maxTicks > 1)
                                tickLabels = quantitiveScale.ticks(maxTicks - 1);
                            if (tickLabels.length < MinTickCount) {
                                tickLabels = quantitiveScale.ticks(maxTicks + 1);
                            }
                            tickLabels = createTrueZeroTickLabel(tickLabels);
                            if (minInterval && tickLabels.length > 1) {
                                var tickInterval = tickLabels[1] - tickLabels[0];
                                while (tickInterval > 0 && tickInterval < minInterval) {
                                    for (var i = 1; i < tickLabels.length; i++) {
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
                    axis_1.getRecommendedTickValuesForAQuantitativeRange = getRecommendedTickValuesForAQuantitativeRange;
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
                    function createTrueZeroTickLabel(ticks, epsilon) {
                        if (epsilon === void 0) { epsilon = 1e-5; }
                        if (!ticks || ticks.length < 2)
                            return ticks;
                        var closeZero = epsilon * Math.abs(ticks[1] - ticks[0]);
                        return ticks.map(function (tick) { return Math.abs(tick) <= closeZero ? 0 : tick; });
                    }
                    function getRecommendedTickValuesForADateTimeRange(maxTicks, dataDomain) {
                        var tickLabels = [];
                        if (dataDomain[0] === 0 && dataDomain[1] === 0)
                            return [];
                        var dateTimeTickLabels = DateTimeSequence.calculate(new Date(dataDomain[0]), new Date(dataDomain[1]), maxTicks).sequence;
                        tickLabels = dateTimeTickLabels.map(function (d) { return d.getTime(); });
                        tickLabels = ensureValuesInRange(tickLabels, dataDomain[0], dataDomain[1]);
                        return tickLabels;
                    }
                    function normalizeLinearDomain(domain) {
                        if (isNaN(domain.min) || isNaN(domain.max)) {
                            domain.min = axis_1.emptyDomain[0];
                            domain.max = axis_1.emptyDomain[1];
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
                    function getMargin(availableWidth, availableHeight, xMargin, yMargin) {
                        return {
                            top: 20,
                            right: 30,
                            bottom: 40,
                            left: 30
                        };
                    }
                    axis_1.getMargin = getMargin;
                    // TODO: Put the parameters into one object
                    function getTickLabelMargins(viewport, yMarginLimit, textWidthMeasurer, textHeightMeasurer, axes, bottomMarginLimit, properties, scrollbarVisible, showOnRight, renderXAxis, renderY1Axis, renderY2Axis) {
                        var xAxisProperties = axes.x;
                        var y1AxisProperties = axes.y1;
                        var y2AxisProperties = axes.y2;
                        var xLabels = xAxisProperties.values;
                        var y1Labels = y1AxisProperties.values;
                        var leftOverflow = 0;
                        var rightOverflow = 0;
                        var maxWidthY1 = 0;
                        var maxWidthY2 = 0;
                        var xMax = 0; // bottom margin
                        var ordinalLabelOffset = xAxisProperties.categoryThickness ? xAxisProperties.categoryThickness / 2 : 0;
                        var scaleIsOrdinal = isOrdinalScale(xAxisProperties.scale);
                        var hasHierarchy = !arrayIsEmpty(axes.xStack);
                        var xLabelOuterPadding = 0;
                        if (xAxisProperties.outerPadding !== undefined) {
                            xLabelOuterPadding = xAxisProperties.outerPadding;
                        }
                        else if (xAxisProperties.xLabelMaxWidth !== undefined) {
                            xLabelOuterPadding = Math.max(0, (viewport.width - xAxisProperties.xLabelMaxWidth * xLabels.length) / 2);
                        }
                        var textHeight;
                        var rotation;
                        if (scrollbarVisible || hasHierarchy)
                            rotation = LabelLayoutStrategy.DefaultRotationWithScrollbar;
                        else
                            rotation = LabelLayoutStrategy.DefaultRotation;
                        if (renderY1Axis) {
                            for (var i = 0, len = y1Labels.length; i < len; i++) {
                                properties.text = y1Labels[i];
                                maxWidthY1 = Math.max(maxWidthY1, textWidthMeasurer(properties));
                            }
                        }
                        if (y2AxisProperties && renderY2Axis) {
                            var y2Labels = y2AxisProperties.values;
                            for (var i = 0, len = y2Labels.length; i < len; i++) {
                                properties.text = y2Labels[i];
                                maxWidthY2 = Math.max(maxWidthY2, textWidthMeasurer(properties));
                            }
                        }
                        textHeight = textHeightMeasurer(properties);
                        var maxNumLines = Math.floor(bottomMarginLimit / textHeight);
                        var xScale = xAxisProperties.scale;
                        var xDomain = xScale.domain();
                        if (renderXAxis && xLabels.length > 0) {
                            for (var i = 0, len = xLabels.length; i < len; i++) {
                                // find the max height of the x-labels, perhaps rotated or wrapped
                                var height = void 0;
                                properties.text = xLabels[i];
                                var width = textWidthMeasurer(properties);
                                if (xAxisProperties.willLabelsWordBreak) {
                                    // Split label and count rows
                                    var wordBreaks = wordBreaker.splitByWidth(properties.text, properties, textWidthMeasurer, xAxisProperties.xLabelMaxWidth, maxNumLines);
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
                                        var xPos = xScale(xDomain[0]);
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
                                        var xPos = xScale(xDomain[1]);
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
                        var rightMargin = 0, leftMargin = 0, bottomMargin = Math.min(Math.ceil(xMax), bottomMarginLimit);
                        if (showOnRight) {
                            leftMargin = Math.min(Math.max(leftOverflow, maxWidthY2), yMarginLimit);
                            rightMargin = Math.min(Math.max(rightOverflow, maxWidthY1), yMarginLimit);
                        }
                        else {
                            leftMargin = Math.min(Math.max(leftOverflow, maxWidthY1), yMarginLimit);
                            rightMargin = Math.min(Math.max(rightOverflow, maxWidthY2), yMarginLimit);
                        }
                        if (hasHierarchy) {
                            bottomMargin += (textHeight + axis_1.stackedAxisPadding) * (axes.xStack.length - 1);
                        }
                        return {
                            xMax: Math.ceil(bottomMargin),
                            yLeft: Math.ceil(leftMargin),
                            yRight: Math.ceil(rightMargin),
                            stackHeight: textHeight + axis_1.stackedAxisPadding,
                        };
                    }
                    axis_1.getTickLabelMargins = getTickLabelMargins;
                    function columnDataTypeHasValue(dataType) {
                        return dataType && (dataType.bool || dataType.numeric || dataType.text || dataType.dateTime);
                    }
                    axis_1.columnDataTypeHasValue = columnDataTypeHasValue;
                    function createOrdinalType() {
                        return ValueType.fromDescriptor({ text: true });
                    }
                    axis_1.createOrdinalType = createOrdinalType;
                    function isOrdinal(dataType) {
                        return !!(dataType && (dataType.text || dataType.bool || (dataType.misc && dataType.misc.barcode) || (dataType.geography && dataType.geography.postalCode)));
                    }
                    axis_1.isOrdinal = isOrdinal;
                    function isOrdinalScale(scale) {
                        return typeof scale.rangePoints === "function";
                    }
                    axis_1.isOrdinalScale = isOrdinalScale;
                    function isDateTime(dataType) {
                        return !!(dataType && dataType.dateTime);
                    }
                    axis_1.isDateTime = isDateTime;
                    function invertScale(scale, x) {
                        if (isOrdinalScale(scale)) {
                            return invertOrdinalScale(scale, x);
                        }
                        return scale.invert(x);
                    }
                    axis_1.invertScale = invertScale;
                    function extent(scale) {
                        if (isOrdinalScale(scale)) {
                            return scale.rangeExtent();
                        }
                        return scale.range();
                    }
                    axis_1.extent = extent;
                    /**
                     * Uses the D3 scale to get the actual category thickness.
                     * @return The difference between the 1st and 2nd items in the range if there are 2 or more items in the range.
                     * Otherwise, the length of the entire range.
                     */
                    function getCategoryThickness(scale) {
                        var leftEdges = scale.range();
                        if (leftEdges.length < 2) {
                            // We have 1 item if we don't have 2 edges. If we have 1 item, just use the entire axis length as the thickness.
                            if (isOrdinalScale(scale)) {
                                // We should only hit this if we have an ordinal scale. Other scales should always have 2 items in their range.
                                var rangeExtent = scale.rangeExtent();
                                return rangeExtent[1] - rangeExtent[0];
                            }
                        }
                        return leftEdges[1] - leftEdges[0];
                    }
                    axis_1.getCategoryThickness = getCategoryThickness;
                    /**
                     * Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
                     * Otherwise, it returns the greatest item in scale.domain() that's <= x.
                     */
                    function invertOrdinalScale(scale, x) {
                        var leftEdges = scale.range();
                        if (leftEdges.length < 2) {
                            return 0;
                        }
                        var width = scale.rangeBand();
                        var halfInnerPadding = (leftEdges[1] - leftEdges[0] - width) / 2;
                        var range = scale.range();
                        var domain = scale.domain();
                        // If x is less than the range, just return the 1st item in the domain
                        if (range[0] > x) {
                            return domain[0];
                        }
                        // d3.bisect returns the index at which we can insert something so that everything before it is lesser and everything after it is greater.
                        // The leftEdges don't include the inner padding, so we need to shift x over by halfInnerPadding to account it.
                        // We want index - 1 since that's the greatest value less than x, meaning that's the band we're in.
                        // Use that index to find the right value in the domain.
                        return domain[d3.bisect(range, x + halfInnerPadding) - 1];
                    }
                    axis_1.invertOrdinalScale = invertOrdinalScale;
                    function findClosestXAxisIndex(categoryValue, categoryAxisValues) {
                        var closestValueIndex = -1, minDistance = Number.MAX_VALUE;
                        for (var i in categoryAxisValues) {
                            var distance = Math.abs(categoryValue - categoryAxisValues[i].categoryValue);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestValueIndex = parseInt(i, 10);
                            }
                        }
                        return closestValueIndex;
                    }
                    axis_1.findClosestXAxisIndex = findClosestXAxisIndex;
                    function lookupOrdinalIndex(scale, pixelValue) {
                        var closestValueIndex = -1;
                        var minDistance = Number.MAX_VALUE;
                        var domain = scale.domain();
                        if (domain.length < 2) {
                            return 0;
                        }
                        var halfWidth = (scale(1) - scale(0)) / 2;
                        for (var idx in domain) {
                            var leftEdgeInPixels = scale(idx);
                            var midPoint = leftEdgeInPixels + halfWidth;
                            var distance = Math.abs(pixelValue - midPoint);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestValueIndex = parseInt(idx, 10);
                            }
                        }
                        return closestValueIndex;
                    }
                    axis_1.lookupOrdinalIndex = lookupOrdinalIndex;
                    /** scale(value1) - scale(value2) with zero checking and min(+/-1, result) */
                    function diffScaled(scale, value1, value2) {
                        var value = scale(value1) - scale(value2);
                        if (value === 0) {
                            return 0;
                        }
                        if (value < 0) {
                            return Math.min(value, -1);
                        }
                        return Math.max(value, 1);
                    }
                    axis_1.diffScaled = diffScaled;
                    function createDomain(data, axisType, isScalar, forcedScalarDomain, ensureDomain) {
                        if (isScalar && !isOrdinal(axisType)) {
                            var userMin = void 0, userMax = void 0;
                            if (forcedScalarDomain && forcedScalarDomain.length === 2) {
                                userMin = forcedScalarDomain[0];
                                userMax = forcedScalarDomain[1];
                            }
                            return createScalarDomain(data, userMin, userMax, axisType, ensureDomain);
                        }
                        return createOrdinalDomain(data);
                    }
                    axis_1.createDomain = createDomain;
                    function ensureValuesInRange(values, min, max) {
                        var filteredValues = values.filter(function (v) { return v >= min && v <= max; });
                        if (filteredValues.length < 2) {
                            filteredValues = [min, max];
                        }
                        return filteredValues;
                    }
                    axis_1.ensureValuesInRange = ensureValuesInRange;
                    /**
                     * Gets the ValueType of a category column, defaults to Text if the type is not present.
                     */
                    function getCategoryValueType(metadataColumn, isScalar) {
                        if (metadataColumn && columnDataTypeHasValue(metadataColumn.type)) {
                            return metadataColumn.type;
                        }
                        if (isScalar) {
                            return ValueType.fromDescriptor({ numeric: true });
                        }
                        return ValueType.fromDescriptor({ text: true });
                    }
                    axis_1.getCategoryValueType = getCategoryValueType;
                    /**
                     * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
                     * @param options The properties used to create the axis.
                     */
                    function createAxis(options) {
                        var pixelSpan = options.pixelSpan, dataDomain = options.dataDomain, metaDataColumn = options.metaDataColumn, formatString = options.formatString, outerPadding = options.outerPadding || 0, isCategoryAxis = !!options.isCategoryAxis, isScalar = !!options.isScalar, isVertical = !!options.isVertical, useTickIntervalForDisplayUnits = !!options.useTickIntervalForDisplayUnits, // DEPRECATE: same meaning as isScalar?
                        getValueFn = options.getValueFn, categoryThickness = options.categoryThickness, axisDisplayUnits = options.axisDisplayUnits, axisPrecision = options.axisPrecision, is100Pct = !!options.is100Pct, disableNice = options.disableNice;
                        var dataType = getCategoryValueType(metaDataColumn, isScalar);
                        // Create the Scale
                        var scaleResult = createScale(options);
                        var scale = scaleResult.scale;
                        var bestTickCount = scaleResult.bestTickCount;
                        var scaleDomain = scale.domain();
                        var isLogScaleAllowed = isLogScalePossible(dataDomain, dataType);
                        // fix categoryThickness if scalar and the domain was adjusted when making the scale "nice"
                        if (categoryThickness && isScalar && dataDomain && dataDomain.length === 2) {
                            var oldSpan = dataDomain[1] - dataDomain[0];
                            var newSpan = scaleDomain[1] - scaleDomain[0];
                            if (oldSpan > 0 && newSpan > 0) {
                                categoryThickness = categoryThickness * oldSpan / newSpan;
                            }
                        }
                        // Prepare Tick Values for formatting
                        var tickValues;
                        if (isScalar && bestTickCount === 1 && !arrayIsEmpty(dataDomain)) {
                            tickValues = [dataDomain[0]];
                        }
                        else {
                            var minTickInterval = isScalar ? getMinTickValueInterval(formatString, dataType, is100Pct) : undefined;
                            tickValues = getRecommendedTickValues(bestTickCount, scale, dataType, isScalar, minTickInterval);
                        }
                        if (options.scaleType && options.scaleType === axisScale.log && isLogScaleAllowed) {
                            tickValues = tickValues.filter(function (d) { return powerOfTen(d); });
                        }
                        var formatter = createFormatter(scaleDomain, dataDomain, dataType, isScalar, formatString, bestTickCount, tickValues, getValueFn, useTickIntervalForDisplayUnits, axisDisplayUnits, axisPrecision);
                        // sets default orientation only, cartesianChart will fix y2 for comboChart
                        // tickSize(pixelSpan) is used to create gridLines
                        var axis = d3.svg.axis()
                            .scale(scale)
                            .tickSize(6, 0)
                            .orient(isVertical ? "left" : "bottom")
                            .ticks(bestTickCount)
                            .tickValues(tickValues);
                        var formattedTickValues = [];
                        if (metaDataColumn)
                            formattedTickValues = formatAxisTickValues(axis, tickValues, formatter, dataType, getValueFn);
                        var xLabelMaxWidth;
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
                    axis_1.createAxis = createAxis;
                    /**
                     * Creates a D3 axis for stacked axis usage. `options.innerTickSize` and `options.outerTickSize` will be defaulted to 0 if not set.
                     * `options.orientation` will be defaulted to "bottom" if not specified.
                     */
                    function createStackedAxis(options) {
                        var axis = options.axis;
                        var orientation = options.orient != null ? axis_1.AxisOrientation[options.orient] : axis_1.AxisOrientation[axis_1.AxisOrientation.bottom];
                        return d3.svg.axis()
                            .scale(options.scale)
                            .tickSize(options.innerTickSize || 0, options.outerTickSize || 0)
                            .orient(orientation)
                            .ticks(axis.ticks())
                            .tickValues(axis.tickValues())
                            .tickFormat(options.tickFormat);
                    }
                    axis_1.createStackedAxis = createStackedAxis;
                    function getScalarLabelMaxWidth(scale, tickValues) {
                        // find the distance between two ticks. scalar ticks can be anywhere, such as:
                        // |---50----------100--------|
                        if (scale && !arrayIsEmpty(tickValues)) {
                            return Math.abs(scale(tickValues[1]) - scale(tickValues[0]));
                        }
                        return 1;
                    }
                    function createScale(options) {
                        var pixelSpan = options.pixelSpan, dataDomain = options.dataDomain, metaDataColumn = options.metaDataColumn, outerPadding = options.outerPadding || 0, isScalar = !!options.isScalar, isVertical = !!options.isVertical, forcedTickCount = options.forcedTickCount, categoryThickness = options.categoryThickness, shouldClamp = !!options.shouldClamp, maxTickCount = options.maxTickCount, disableNice = options.disableNice, disableNiceOnlyForScale = options.disableNiceOnlyForScale;
                        var dataType = getCategoryValueType(metaDataColumn, isScalar);
                        var maxTicks = isVertical ? getRecommendedNumberOfTicksForYAxis(pixelSpan) : getRecommendedNumberOfTicksForXAxis(pixelSpan);
                        if (maxTickCount &&
                            maxTicks > maxTickCount)
                            maxTicks = maxTickCount;
                        var scalarDomain = dataDomain ? dataDomain.slice() : null;
                        var bestTickCount = maxTicks;
                        if (disableNice) {
                            bestTickCount = null;
                        }
                        var scale;
                        var usingDefaultDomain = false;
                        if (dataDomain == null || (dataDomain.length === 2 && dataDomain[0] == null && dataDomain[1] == null) || (dataDomain.length !== 2 && isScalar)) {
                            usingDefaultDomain = true;
                            if (dataType.dateTime || !isOrdinal(dataType))
                                dataDomain = axis_1.emptyDomain;
                            else
                                dataDomain = [];
                            if (isOrdinal(dataType)) {
                                scale = createOrdinalScale(pixelSpan, dataDomain, categoryThickness ? outerPadding / categoryThickness : 0);
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
                                var normalizedRange = normalizeLinearDomain({ min: dataDomain[0], max: dataDomain[dataDomain.length - 1] });
                                scalarDomain = [normalizedRange.min, normalizedRange.max];
                            }
                            if (isScalar && dataType.numeric && !dataType.dateTime) {
                                if (scalarDomain && scalarDomain.length === 2 && scalarDomain[0] === 0 && scalarDomain[1] === 0 && options.zeroScalarDomain) {
                                    scalarDomain[0] = options.zeroScalarDomain[0];
                                    scalarDomain[1] = options.zeroScalarDomain[1];
                                }
                                var bestTickCountForNumericalScale = bestTickCount;
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
                                scale = createOrdinalScale(pixelSpan, scalarDomain, categoryThickness ? outerPadding / categoryThickness : 0);
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
                    axis_1.createScale = createScale;
                    function normalizeInfinityInScale(scale) {
                        // When large values (eg Number.MAX_VALUE) are involved, a call to scale.nice occasionally
                        // results in infinite values being included in the domain. To correct for that, we need to
                        // re-normalize the domain now to not include infinities.
                        var scaledDomain = scale.domain();
                        for (var i = 0, len = scaledDomain.length; i < len; ++i) {
                            if (scaledDomain[i] === Number.POSITIVE_INFINITY) {
                                scaledDomain[i] = Number.MAX_VALUE;
                            }
                            else if (scaledDomain[i] === Number.NEGATIVE_INFINITY) {
                                scaledDomain[i] = -Number.MAX_VALUE;
                            }
                        }
                        scale.domain(scaledDomain);
                    }
                    axis_1.normalizeInfinityInScale = normalizeInfinityInScale;
                    function createFormatter(scaleDomain, dataDomain, dataType, isScalar, formatString, bestTickCount, tickValues, getValueFn, useTickIntervalForDisplayUnits, axisDisplayUnits, axisPrecision) {
                        if (useTickIntervalForDisplayUnits === void 0) { useTickIntervalForDisplayUnits = false; }
                        var formatter;
                        if (dataType.dateTime) {
                            if (isScalar) {
                                var value = new Date(scaleDomain[0]);
                                var value2 = new Date(scaleDomain[1]);
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
                                var value1 = axisDisplayUnits ? axisDisplayUnits : tickValues[1] - tickValues[0];
                                var options = {
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
                    axis_1.createFormatter = createFormatter;
                    // returns # of decimal places necessary to distinguish between tick mark values
                    function calculateAxisPrecision(tickValue0, tickValue1, axisDisplayUnits, formatString) {
                        if (!axisDisplayUnits) {
                            var displayUnitSystem = valueFormatter.createDisplayUnitSystem();
                            displayUnitSystem.update(tickValue1 - tickValue0);
                            axisDisplayUnits = displayUnitSystem.displayUnit && displayUnitSystem.displayUnit.value || 1;
                        }
                        var value0 = (tickValue0 || 0) / axisDisplayUnits;
                        var value1 = (tickValue1 || 0) / axisDisplayUnits;
                        if (formatString) {
                            var partsPerScale = numberFormat.getCustomFormatMetadata(formatString, false, false, true).partsPerScale;
                            value0 *= partsPerScale;
                            value1 *= partsPerScale;
                        }
                        return Math.max(calculateAxisPrecisionForValue(value0), calculateAxisPrecisionForValue(value1));
                    }
                    axis_1.calculateAxisPrecision = calculateAxisPrecision;
                    function calculateAxisPrecisionForValue(value) {
                        if (value === 0)
                            return 0;
                        if (value < 0)
                            value = -value;
                        // calculate place of of the most significant decimal digit.
                        // 1 means tens digit
                        // 0 means the ones digit
                        // -1 means tenths digit
                        var mostSignificantDigit = Math.floor(Double.log10(value));
                        // rounding in various calculations can introduce extraneous amounts of precision in the number
                        // no need in an axis label to allow more than this number of digits as the *difference* between
                        // ticks
                        var MaxDigits = 5;
                        if (mostSignificantDigit >= 0) {
                            // value has an integer part but may also have a fraction part. get the number of significant
                            // digits in the integer part then see how many that leaves us for the fractional part
                            var integerSignificantDigits = mostSignificantDigit + 1;
                            var maxFractionDigits = MaxDigits - integerSignificantDigits;
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
                            var rescaledValue = value / Double.pow10(mostSignificantDigit + 1);
                            // get the actual number of significant digits respecting the maximum
                            var fractionSignificantDigits = numberOfDecimalPlaces(rescaledValue, MaxDigits);
                            // this is the number of zeroes that are required due to the true scale of the decimal fraction
                            var fractionScaleDigits = -mostSignificantDigit - 1;
                            // number of decimal places is the number of zeros plus the limited number of significant digits
                            return fractionScaleDigits + fractionSignificantDigits;
                        }
                    }
                    // if we're limiting the decimal places to maxDecimalPlaces, how many decimal places do
                    // we actually need to avoid trailing zeroes? for example, if the value is 1.500001 and
                    // we want a maximum of three decimal places, the number rounded to three places is 1.500
                    // so only one decimal place is necessary.
                    function numberOfDecimalPlaces(value, maxDecimalPlaces) {
                        var formattedValue = value.toFixed(maxDecimalPlaces);
                        var decimalPoint = formattedValue.indexOf(".");
                        if (decimalPoint !== -1) {
                            for (var i = formattedValue.length; i-- > decimalPoint;) {
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
                        var formattedTickValues = [];
                        if (!getValueFn)
                            getValueFn = function (data) { return data; };
                        if (formatter) {
                            axis.tickFormat(function (d) { return formatter.format(getValueFn(d, dataType)); });
                            formattedTickValues = tickValues.map(function (d) { return formatter.format(getValueFn(d, dataType)); });
                        }
                        else {
                            formattedTickValues = tickValues.map(function (d) { return getValueFn(d, dataType); });
                        }
                        return formattedTickValues;
                    }
                    function getMinTickValueInterval(formatString, columnType, is100Pct) {
                        var isCustomFormat = formatString && !numberFormat.isStandardFormat(formatString);
                        if (isCustomFormat) {
                            var precision = numberFormat.getCustomFormatMetadata(formatString, true /*calculatePrecision*/).precision;
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
                    axis_1.getMinTickValueInterval = getMinTickValueInterval;
                    function createScalarDomain(data, userMin, userMax, axisType, ensureDomain) {
                        if (data.length === 0) {
                            return null;
                        }
                        var defaultMinX = d3.min(data, function (kv) { return d3.min(kv.data, function (d) { return d && d.categoryValue; }); });
                        var defaultMaxX = d3.max(data, function (kv) { return d3.max(kv.data, function (d) { return d && d.categoryValue; }); });
                        return combineDomain([userMin, userMax], [defaultMinX, defaultMaxX], ensureDomain);
                    }
                    /**
                     * Creates a [min,max] from your Cartiesian data values.
                     *
                     * @param data The series array of CartesianDataPoints.
                     * @param includeZero Columns and bars includeZero, line and scatter do not.
                     */
                    function createValueDomain(data, includeZero) {
                        if (data.length === 0)
                            return null;
                        var minY = d3.min(data, function (kv) { return d3.min(kv.data, function (d) { return d && d.value; }); });
                        var maxY = d3.max(data, function (kv) { return d3.max(kv.data, function (d) { return d && d.value; }); });
                        if (includeZero) {
                            return [Math.min(minY, 0), Math.max(maxY, 0)];
                        }
                        return [minY, maxY];
                    }
                    axis_1.createValueDomain = createValueDomain;
                    function createOrdinalDomain(data) {
                        if (arrayIsEmpty(data)) {
                            return [];
                        }
                        // each series shares the same categories for oridinal axes (even if a series has some nulls)
                        var domain = [];
                        var firstSeries = data[0];
                        for (var _i = 0, _a = firstSeries.data; _i < _a.length; _i++) {
                            var dp = _a[_i];
                            if (!dp.highlight) {
                                domain.push(dp.categoryIndex);
                            }
                        }
                        return domain;
                    }
                    var LabelLayoutStrategy;
                    (function (LabelLayoutStrategy) {
                        function willLabelsFit(axisProperties, availableWidth, textMeasurer, properties) {
                            var labels = axisProperties.values;
                            if (labels.length === 0)
                                return false;
                            var labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
                                ? axisProperties.xLabelMaxWidth
                                : availableWidth / labels.length;
                            return !labels.some(function (d) {
                                properties.text = d;
                                return textMeasurer(properties) > labelMaxWidth;
                            });
                        }
                        LabelLayoutStrategy.willLabelsFit = willLabelsFit;
                        function willLabelsWordBreak(axisProperties, margin, availableWidth, textWidthMeasurer, textHeightMeasurer, textTruncator, properties) {
                            var labels = axisProperties.values;
                            var labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
                                ? axisProperties.xLabelMaxWidth
                                : availableWidth / labels.length;
                            var maxRotatedLength = margin.bottom / LabelLayoutStrategy.DefaultRotation.sine;
                            var height = textHeightMeasurer(properties);
                            var maxNumLines = Math.max(1, Math.floor(margin.bottom / height));
                            if (labels.length === 0)
                                return false;
                            // If no break character and exceeds max width, word breaking will not work, return false
                            var mustRotate = labels.some(function (label) {
                                // Detect must rotate and return immediately
                                properties.text = label;
                                return !wordBreaker.hasBreakers(label) && textWidthMeasurer(properties) > labelMaxWidth;
                            });
                            if (mustRotate) {
                                return false;
                            }
                            var moreWordBreakChars = labels.filter(function (label, index) {
                                // ...otherwise compare rotation versus word breaking
                                var allowedLengthProjectedOnXAxis = 
                                // Left margin is the width of Y axis.
                                margin.left
                                    + axisProperties.outerPadding
                                    + axisProperties.categoryThickness * (index + 0.5)
                                    - LeftPadding;
                                var allowedLength = allowedLengthProjectedOnXAxis / LabelLayoutStrategy.DefaultRotation.cosine;
                                var rotatedLength = Math.min(allowedLength, maxRotatedLength);
                                // Which shows more characters? Rotated or maxNumLines truncated to labelMaxWidth?
                                var wordBreakChars = wordBreaker.splitByWidth(label, properties, textWidthMeasurer, labelMaxWidth, maxNumLines, textTruncator).join(" ");
                                properties.text = label;
                                var rotateChars = textTruncator(properties, rotatedLength);
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
                            var rotatedLength;
                            var defaultRotation;
                            var tickSize = axisProperties.axis.tickSize();
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
                                var axisLabel = d3.select(this);
                                var labelText = axisLabel.text();
                                textProperties.text = labelText;
                                if (needRotate) {
                                    var textContentIndex = axisProperties.values.indexOf(this.textContent);
                                    var allowedLengthProjectedOnXAxis = 
                                    // Left margin is the width of Y axis.
                                    margin.left
                                        + axisProperties.outerPadding
                                        + axisProperties.categoryThickness * (textContentIndex + 0.5);
                                    // Subtracting the left padding space from the allowed length.
                                    if (!scrollbarVisible)
                                        allowedLengthProjectedOnXAxis -= LeftPadding;
                                    // Truncate if scrollbar is visible or rotatedLength exceeds allowedLength
                                    var allowedLength = allowedLengthProjectedOnXAxis / defaultRotation.cosine;
                                    if (scrollbarVisible || needEllipsis || (allowedLength < rotatedLength)) {
                                        labelText = textTruncator(textProperties, Math.min(allowedLength, rotatedLength));
                                        axisLabel.text(labelText);
                                    }
                                    // NOTE: see note above - rotation only lines up with default d3 tickSize(6,0)
                                    // TODO don't do these rotations if we already did them
                                    axisLabel.style("text-anchor", "end")
                                        .attr({
                                        "dx": "-0.5em",
                                        "dy": defaultRotation.dy,
                                        "transform": defaultRotation.transform
                                    });
                                }
                                else {
                                    var maxLabelWidth = !arrayIsEmpty(axisProperties.xLabelMaxWidths) ? axisProperties.xLabelMaxWidths[datum] : axisProperties.xLabelMaxWidth;
                                    var newLabelText = textTruncator(textProperties, maxLabelWidth);
                                    if (newLabelText !== labelText)
                                        axisLabel.text(newLabelText);
                                    // TODO don't do these rotations if we already did them
                                    axisLabel.style("text-anchor", "middle")
                                        .attr({
                                        "dx": "0em",
                                        "dy": "1em",
                                        "transform": "rotate(0)"
                                    });
                                }
                            });
                        }
                        LabelLayoutStrategy.rotate = rotate;
                        function wordBreak(text, axisProperties, maxHeight) {
                            var allowedLength = axisProperties.xLabelMaxWidth;
                            text.each(function () {
                                var node = d3.select(this);
                                // Reset style of text node
                                node
                                    .style("text-anchor", "middle")
                                    .attr({
                                    "dx": "0em",
                                    "dy": "1em",
                                    "transform": "rotate(0)"
                                });
                                textMeasurementService.wordBreak(this, allowedLength, maxHeight);
                            });
                        }
                        LabelLayoutStrategy.wordBreak = wordBreak;
                        function clip(text, availableWidth, svgEllipsis) {
                            if (text.size() === 0) {
                                return;
                            }
                            text.each(function () {
                                var text = d3.select(this);
                                svgEllipsis(text[0][0], availableWidth);
                            });
                        }
                        LabelLayoutStrategy.clip = clip;
                    })(LabelLayoutStrategy = axis_1.LabelLayoutStrategy || (axis_1.LabelLayoutStrategy = {}));
                    function createOrdinalScale(pixelSpan, dataDomain, outerPaddingRatio) {
                        if (outerPaddingRatio === void 0) { outerPaddingRatio = 0; }
                        return d3.scale.ordinal()
                            .rangeBands([0, pixelSpan], InnerPaddingRatio, outerPaddingRatio)
                            .domain(dataDomain);
                    }
                    axis_1.createOrdinalScale = createOrdinalScale;
                    function isLogScalePossible(domain, axisType) {
                        if (domain == null) {
                            return false;
                        }
                        if (isDateTime(axisType)) {
                            return false;
                        }
                        return (domain[0] > 0 && domain[1] > 0) || (domain[0] < 0 && domain[1] < 0); // doman must exclude 0
                    }
                    axis_1.isLogScalePossible = isLogScalePossible;
                    // this function can return different scales e.g. log, linear
                    // NOTE: export only for testing, do not access directly
                    function createNumericalScale(axisScaleType, pixelSpan, dataDomain, dataType, outerPadding, niceCount, shouldClamp) {
                        if (outerPadding === void 0) { outerPadding = 0; }
                        if (axisScaleType === axisScale.log && isLogScalePossible(dataDomain, dataType)) {
                            return createLogScale(pixelSpan, dataDomain, outerPadding, niceCount);
                        }
                        return createLinearScale(pixelSpan, dataDomain, outerPadding, niceCount, shouldClamp);
                    }
                    axis_1.createNumericalScale = createNumericalScale;
                    function createLogScale(pixelSpan, dataDomain, outerPadding, niceCount) {
                        if (outerPadding === void 0) { outerPadding = 0; }
                        var scale = d3.scale.log()
                            .range([outerPadding, pixelSpan - outerPadding])
                            .domain([dataDomain[0], dataDomain[1]])
                            .clamp(true);
                        if (niceCount) {
                            scale.nice(niceCount);
                        }
                        return scale;
                    }
                    // NOTE: export only for testing, do not access directly
                    function createLinearScale(pixelSpan, dataDomain, outerPadding, niceCount, shouldClamp) {
                        if (outerPadding === void 0) { outerPadding = 0; }
                        var scale = d3.scale.linear()
                            .range([outerPadding, pixelSpan - outerPadding])
                            .domain([dataDomain[0], dataDomain[1]])
                            .clamp(shouldClamp);
                        // .nice(undefined) still modifies the scale boundaries, and for datetime this messes things up.
                        // we use millisecond ticks since epoch for datetime, so we don't want any "nice" with numbers like 17398203392.
                        if (niceCount) {
                            scale.nice(niceCount);
                        }
                        return scale;
                    }
                    axis_1.createLinearScale = createLinearScale;
                    function getRangeForColumn(sizeColumn) {
                        var result = {};
                        if (sizeColumn) {
                            result.min = (sizeColumn.min == null
                                ? sizeColumn.minLocal == null ? d3.min(sizeColumn.values) : sizeColumn.minLocal
                                : sizeColumn.min);
                            result.max = (sizeColumn.max == null
                                ? sizeColumn.maxLocal == null ? d3.max(sizeColumn.values) : sizeColumn.maxLocal
                                : sizeColumn.max);
                        }
                        return result;
                    }
                    axis_1.getRangeForColumn = getRangeForColumn;
                    /**
                     * Set customized domain, but don't change when nothing is set
                     */
                    function applyCustomizedDomain(customizedDomain, forcedDomain) {
                        var domain = [undefined, undefined];
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
                    axis_1.applyCustomizedDomain = applyCustomizedDomain;
                    /**
                     * Combine the forced domain with the actual domain if one of the values was set.
                     * The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.
                     */
                    function combineDomain(forcedDomain, domain, ensureDomain) {
                        var combinedDomain = domain ? [domain[0], domain[1]] : [];
                        if (ensureDomain) {
                            if (combinedDomain[0] == null || ensureDomain.min < combinedDomain[0])
                                combinedDomain[0] = ensureDomain.min;
                            if (combinedDomain[1] == null || ensureDomain.max > combinedDomain[1])
                                combinedDomain[1] = ensureDomain.max;
                        }
                        var domainBeforeForced = [combinedDomain[0], combinedDomain[1]];
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
                    axis_1.combineDomain = combineDomain;
                    function createAxisLabel(properties, label, unitType, y2) {
                        if (y2 === void 0) { y2 = false; }
                        var propertyName = y2 ? "secAxisStyle" : "axisStyle";
                        if (!properties || !properties[propertyName]) {
                            return label;
                        }
                        var modifiedLabel;
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
                    axis_1.createAxisLabel = createAxisLabel;
                    function scaleShouldClamp(combinedDomain, domain) {
                        if (!combinedDomain || !domain || combinedDomain.length < 2 || domain.length < 2) {
                            return false;
                        }
                        // when the start or end is different, clamp it
                        return combinedDomain[0] !== domain[0] || combinedDomain[1] !== domain[1];
                    }
                    axis_1.scaleShouldClamp = scaleShouldClamp;
                    function normalizeNonFiniteNumber(value) {
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
                    axis_1.normalizeNonFiniteNumber = normalizeNonFiniteNumber;
                    /**
                     * Indicates whether the number is power of 10.
                     */
                    function powerOfTen(d) {
                        var value = Math.abs(d);
                        // formula log2(Y)/log2(10) = log10(Y)
                        // because double issues this won't return exact value
                        // we need to ceil it to nearest number.
                        var log10 = Math.log(value) / Math.LN10;
                        log10 = Math.ceil(log10 - 1e-12);
                        return value / Math.pow(10, log10) === 1;
                    }
                    axis_1.powerOfTen = powerOfTen;
                    function arrayIsEmpty(array) {
                        return !(array && array.length);
                    }
                })(axis = chart.axis || (chart.axis = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    var LegendIcon;
                    (function (LegendIcon) {
                        LegendIcon[LegendIcon["Box"] = 0] = "Box";
                        LegendIcon[LegendIcon["Circle"] = 1] = "Circle";
                        LegendIcon[LegendIcon["Line"] = 2] = "Line";
                    })(LegendIcon = legend.LegendIcon || (legend.LegendIcon = {}));
                    var LegendPosition;
                    (function (LegendPosition) {
                        LegendPosition[LegendPosition["Top"] = 0] = "Top";
                        LegendPosition[LegendPosition["Bottom"] = 1] = "Bottom";
                        LegendPosition[LegendPosition["Right"] = 2] = "Right";
                        LegendPosition[LegendPosition["Left"] = 3] = "Left";
                        LegendPosition[LegendPosition["None"] = 4] = "None";
                        LegendPosition[LegendPosition["TopCenter"] = 5] = "TopCenter";
                        LegendPosition[LegendPosition["BottomCenter"] = 6] = "BottomCenter";
                        LegendPosition[LegendPosition["RightCenter"] = 7] = "RightCenter";
                        LegendPosition[LegendPosition["LeftCenter"] = 8] = "LeftCenter";
                    })(LegendPosition = legend.LegendPosition || (legend.LegendPosition = {}));
                    legend.legendProps = {
                        show: "show",
                        position: "position",
                        titleText: "titleText",
                        showTitle: "showTitle",
                        labelColor: "labelColor",
                        fontSize: "fontSize",
                    };
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    var interactivityUtils = powerbi.extensibility.utils.interactivity.interactivityUtils;
                    var LegendBehavior = (function () {
                        function LegendBehavior() {
                        }
                        LegendBehavior.prototype.bindEvents = function (options, selectionHandler) {
                            var legendItems = options.legendItems;
                            this.legendIcons = options.legendIcons;
                            var clearCatcher = options.clearCatcher;
                            interactivityUtils.registerStandardSelectionHandler(legendItems, selectionHandler);
                            clearCatcher.on("click", function () {
                                selectionHandler.handleClearSelection();
                            });
                        };
                        LegendBehavior.prototype.renderSelection = function (hasSelection) {
                            if (hasSelection) {
                                this.legendIcons.style({
                                    "fill": function (d) {
                                        if (!d.selected) {
                                            return LegendBehavior.dimmedLegendColor;
                                        }
                                        else {
                                            return d.color;
                                        }
                                    }
                                });
                            }
                            else {
                                this.legendIcons.style({
                                    "fill": function (d) {
                                        return d.color;
                                    }
                                });
                            }
                        };
                        return LegendBehavior;
                    }());
                    LegendBehavior.dimmedLegendColor = "#A6A6A6";
                    legend.LegendBehavior = LegendBehavior;
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    var position;
                    (function (position) {
                        position.top = "Top";
                        position.bottom = "Bottom";
                        position.left = "Left";
                        position.right = "Right";
                        position.topCenter = "TopCenter";
                        position.bottomCenter = "BottomCenter";
                        position.leftCenter = "LeftCenter";
                        position.rightCenter = "RightCenter";
                    })(position = legend.position || (legend.position = {}));
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend_1) {
                    function createLegend(legendParentElement, interactive, interactivityService, isScrollable, legendPosition) {
                        if (isScrollable === void 0) { isScrollable = false; }
                        if (legendPosition === void 0) { legendPosition = legend_1.LegendPosition.Top; }
                        if (interactive) {
                            return new legend_1.InteractiveLegend(legendParentElement);
                        }
                        return new legend_1.SVGLegend(legendParentElement, legendPosition, interactivityService, isScrollable);
                    }
                    legend_1.createLegend = createLegend;
                    function isLeft(orientation) {
                        switch (orientation) {
                            case legend_1.LegendPosition.Left:
                            case legend_1.LegendPosition.LeftCenter:
                                return true;
                            default:
                                return false;
                        }
                    }
                    legend_1.isLeft = isLeft;
                    function isTop(orientation) {
                        switch (orientation) {
                            case legend_1.LegendPosition.Top:
                            case legend_1.LegendPosition.TopCenter:
                                return true;
                            default:
                                return false;
                        }
                    }
                    legend_1.isTop = isTop;
                    function positionChartArea(chartArea, legend) {
                        var legendMargins = legend.getMargins(), legendOrientation = legend.getOrientation();
                        chartArea.style({
                            "margin-left": isLeft(legendOrientation)
                                ? legendMargins.width + "px"
                                : null,
                            "margin-top": isTop(legendOrientation)
                                ? legendMargins.height + "px"
                                : null,
                        });
                    }
                    legend_1.positionChartArea = positionChartArea;
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    var data;
                    (function (data) {
                        data.DefaultLegendLabelFillColor = "#666666";
                        function update(legendData, legendObject) {
                            if (legendObject[legend.legendProps.show] == null) {
                                legendObject[legend.legendProps.show] = true;
                            }
                            if (legendObject[legend.legendProps.show] === false) {
                                legendData.dataPoints = [];
                            }
                            if (legendObject[legend.legendProps.show] === true && legendObject[legend.legendProps.position] == null) {
                                legendObject[legend.legendProps.position] = legend.position.top;
                            }
                            if (legendObject[legend.legendProps.fontSize] !== undefined) {
                                legendData.fontSize = legendObject[legend.legendProps.fontSize];
                            }
                            if (legendObject[legend.legendProps.labelColor] !== undefined) {
                                var fillColor = legendObject[legend.legendProps.labelColor];
                                if (fillColor != null) {
                                    legendData.labelColor = fillColor.solid.color;
                                }
                            }
                            if (legendObject[legend.legendProps.showTitle] === false) {
                                legendData.title = "";
                            }
                            else if (legendObject[legend.legendProps.titleText] !== undefined) {
                                legendData.title = legendObject[legend.legendProps.titleText];
                            }
                        }
                        data.update = update;
                    })(data = legend.data || (legend.data = {}));
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    // powerbi.extensibility.utils.formatting
                    var textUtil = powerbi.extensibility.utils.formatting.textUtil;
                    // powerbi.extensibility.utils.svg
                    var translateXWithPixels = powerbi.extensibility.utils.svg.translateXWithPixels;
                    var InteractiveLegend = (function () {
                        function InteractiveLegend(element) {
                            this.legendContainerParent = d3.select(element);
                        }
                        InteractiveLegend.prototype.getMargins = function () {
                            return {
                                height: InteractiveLegend.LegendHeight,
                                width: 0
                            };
                        };
                        InteractiveLegend.prototype.drawLegend = function (legendData) {
                            var data = legendData.dataPoints;
                            if (data.length < 1) {
                                return;
                            }
                            var legendContainerDiv = this.legendContainerParent.select(InteractiveLegend.LegendContainerSelector);
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
                        };
                        InteractiveLegend.prototype.reset = function () {
                            if (this.legendContainerDiv) {
                                this.legendContainerDiv.remove();
                                this.legendContainerDiv = null;
                            }
                        };
                        InteractiveLegend.prototype.isVisible = function () {
                            return true;
                        };
                        /**
                         * Not supported
                         */
                        InteractiveLegend.prototype.changeOrientation = function (orientation) { };
                        InteractiveLegend.prototype.getOrientation = function () {
                            return legend.LegendPosition.Top;
                        };
                        /**
                         * Draw the legend title
                         */
                        InteractiveLegend.prototype.drawTitle = function (data) {
                            var titleDiv = this.legendContainerDiv.selectAll("div." + InteractiveLegend.LegendTitleClass), item = titleDiv.data([data[0]]);
                            // Enter
                            var itemEnter = item.enter(), titleDivEnter = itemEnter
                                .append("div")
                                .attr("class", InteractiveLegend.LegendTitleClass);
                            titleDivEnter
                                .filter(function (d) { return d.iconOnlyOnLabel; })
                                .append("span")
                                .attr("class", InteractiveLegend.legendIconClass)
                                .html(InteractiveLegend.legendPlaceSelector);
                            titleDivEnter.append("span");
                            // Update
                            item.filter(function (d) { return d.iconOnlyOnLabel; })
                                .select("span." + InteractiveLegend.legendIconClass)
                                .style(InteractiveLegend.legendColorCss, function (d) { return d.color; });
                            item.select("span:last-child").text(function (d) { return d.category; });
                        };
                        /**
                         * Draw the legend items
                         */
                        InteractiveLegend.prototype.drawLegendItems = function (data) {
                            // Add Mesaures - the items of the category in the legend
                            this.ensureLegendTableCreated();
                            var dataPointsMatrix = [data];
                            var legendItemsContainer = this.legendContainerDiv
                                .select("tbody")
                                .selectAll("tr")
                                .data(dataPointsMatrix);
                            // Enter
                            var legendItemsEnter = legendItemsContainer.enter(), rowEnter = legendItemsEnter.append("tr");
                            var cellEnter = rowEnter
                                .selectAll("td")
                                .data(function (d) { return d; }, function (d) { return d.label; })
                                .enter()
                                .append("td")
                                .attr("class", InteractiveLegend.LegendItem);
                            var cellSpanEnter = cellEnter.append("span");
                            cellSpanEnter.filter(function (d) { return !d.iconOnlyOnLabel; })
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
                            var legendCells = legendItemsContainer
                                .selectAll("td")
                                .data(function (d) { return d; }, function (d) { return d.label; });
                            legendCells
                                .select("span." + InteractiveLegend.legendItemNameClass)
                                .html(function (d) { return textUtil.removeBreakingSpaces(d.label); });
                            legendCells
                                .select("span." + InteractiveLegend.legendItemMeasureClass)
                                .html(function (d) { return "&nbsp;" + d.measure; });
                            legendCells
                                .select("span." + InteractiveLegend.legendIconClass)
                                .style("color", function (d) { return d.color; });
                            // Exit
                            legendCells
                                .exit()
                                .remove();
                        };
                        /**
                         * Ensure legend table is created and set horizontal pan gestures on it
                         */
                        InteractiveLegend.prototype.ensureLegendTableCreated = function () {
                            if (this.legendContainerDiv.select("div table").empty()) {
                                var legendTable = this.legendContainerDiv
                                    .append("div")
                                    .append("table");
                                legendTable.style("table-layout", "fixed").append("tbody");
                                // Setup Pan Gestures of the legend
                                this.setPanGestureOnLegend(legendTable);
                            }
                        };
                        /**
                         * Set Horizontal Pan gesture for the legend
                         */
                        InteractiveLegend.prototype.setPanGestureOnLegend = function (legendTable) {
                            var parentNode = this.legendContainerParent.node();
                            var viewportWidth = parentNode.getBoundingClientRect().width;
                            var xscale = d3.scale.linear()
                                .domain([0, viewportWidth])
                                .range([0, viewportWidth]);
                            var zoom = d3.behavior.zoom()
                                .scaleExtent([1, 1]) // disable scaling
                                .x(xscale)
                                .on("zoom", function () {
                                // horizontal pan is valid only in case the legend items width are bigger than the viewport width
                                if ($(legendTable[0]).width() > viewportWidth) {
                                    var t = zoom.translate();
                                    var tx_1 = t[0];
                                    var ty = t[1];
                                    tx_1 = Math.min(tx_1, 0);
                                    tx_1 = Math.max(tx_1, viewportWidth - $(legendTable[0]).width());
                                    zoom.translate([tx_1, ty]);
                                    legendTable.style("-ms-transform", function () {
                                        return translateXWithPixels(tx_1);
                                    });
                                    legendTable.style("-webkit-transform", function () {
                                        return translateXWithPixels(tx_1);
                                    });
                                    legendTable.style("transform", function () {
                                        return translateXWithPixels(tx_1);
                                    });
                                }
                            });
                            if (this.legendContainerDiv) {
                                this.legendContainerDiv.call(zoom);
                            }
                            else {
                                legendTable.call(zoom);
                            }
                        };
                        return InteractiveLegend;
                    }());
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
                    legend.InteractiveLegend = InteractiveLegend;
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var legend;
                (function (legend) {
                    var textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
                    var font = powerbi.extensibility.utils.formatting.font;
                    // powerbi.extensibility.utils.type
                    var PixelConverter = powerbi.extensibility.utils.type.PixelConverter;
                    var Prototype = powerbi.extensibility.utils.type.Prototype;
                    var createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;
                    var translate = powerbi.extensibility.utils.svg.translate;
                    var createArrow = powerbi.extensibility.utils.svg.createArrow;
                    var appendClearCatcher = powerbi.extensibility.utils.interactivity.appendClearCatcher;
                    var dataHasSelection = powerbi.extensibility.utils.interactivity.dataHasSelection;
                    var SVGLegend = (function () {
                        function SVGLegend(element, legendPosition, interactivityService, isScrollable) {
                            this.legendDataStartIndex = 0;
                            this.arrowPosWindow = 1;
                            this.lastCalculatedWidth = 0;
                            this.visibleLegendWidth = 0;
                            this.visibleLegendHeight = 0;
                            this.legendFontSizeMarginDifference = 0;
                            this.legendFontSizeMarginValue = 0;
                            this.svg = d3.select(element)
                                .append("svg")
                                .style("position", "absolute");
                            this.svg.style("display", "inherit");
                            this.svg.classed("legend", true);
                            if (interactivityService) {
                                this.clearCatcher = appendClearCatcher(this.svg);
                            }
                            this.group = this.svg
                                .append("g")
                                .attr("id", "legendGroup");
                            this.interactivityService = interactivityService;
                            this.isScrollable = isScrollable;
                            this.element = element;
                            this.changeOrientation(legendPosition);
                            this.parentViewport = { height: 0, width: 0 };
                            this.calculateViewport();
                            this.updateLayout();
                        }
                        SVGLegend.prototype.updateLayout = function () {
                            var legendViewport = this.viewport;
                            var orientation = this.orientation;
                            this.svg.attr({
                                "height": legendViewport.height || (orientation === legend.LegendPosition.None ? 0 : this.parentViewport.height),
                                "width": legendViewport.width || (orientation === legend.LegendPosition.None ? 0 : this.parentViewport.width)
                            });
                            var isRight = orientation === legend.LegendPosition.Right || orientation === legend.LegendPosition.RightCenter, isBottom = orientation === legend.LegendPosition.Bottom || orientation === legend.LegendPosition.BottomCenter;
                            this.svg.style({
                                "margin-left": isRight ? (this.parentViewport.width - legendViewport.width) + "px" : null,
                                "margin-top": isBottom ? (this.parentViewport.height - legendViewport.height) + "px" : null,
                            });
                        };
                        SVGLegend.prototype.calculateViewport = function () {
                            switch (this.orientation) {
                                case legend.LegendPosition.Top:
                                case legend.LegendPosition.Bottom:
                                case legend.LegendPosition.TopCenter:
                                case legend.LegendPosition.BottomCenter:
                                    var pixelHeight = PixelConverter.fromPointToPixel(this.data && this.data.fontSize
                                        ? this.data.fontSize
                                        : SVGLegend.DefaultFontSizeInPt);
                                    var fontHeightSize = SVGLegend.TopLegendHeight + (pixelHeight - SVGLegend.DefaultFontSizeInPt);
                                    this.viewport = { height: fontHeightSize, width: 0 };
                                    return;
                                case legend.LegendPosition.Right:
                                case legend.LegendPosition.Left:
                                case legend.LegendPosition.RightCenter:
                                case legend.LegendPosition.LeftCenter:
                                    var width = this.lastCalculatedWidth
                                        ? this.lastCalculatedWidth
                                        : this.parentViewport.width * SVGLegend.LegendMaxWidthFactor;
                                    this.viewport = { height: 0, width: width };
                                    return;
                                case legend.LegendPosition.None:
                                    this.viewport = { height: 0, width: 0 };
                            }
                        };
                        SVGLegend.prototype.getMargins = function () {
                            return this.viewport;
                        };
                        SVGLegend.prototype.isVisible = function () {
                            return this.orientation !== legend.LegendPosition.None;
                        };
                        SVGLegend.prototype.changeOrientation = function (orientation) {
                            if (orientation) {
                                this.orientation = orientation;
                            }
                            else {
                                this.orientation = legend.LegendPosition.Top;
                            }
                            this.svg.attr("orientation", orientation);
                        };
                        SVGLegend.prototype.getOrientation = function () {
                            return this.orientation;
                        };
                        SVGLegend.prototype.drawLegend = function (data, viewport) {
                            // clone because we modify legend item label with ellipsis if it is truncated
                            var clonedData = Prototype.inherit(data), newDataPoints = [];
                            for (var _i = 0, _a = data.dataPoints; _i < _a.length; _i++) {
                                var dp = _a[_i];
                                newDataPoints.push(Prototype.inherit(dp));
                            }
                            clonedData.dataPoints = newDataPoints;
                            this.setTooltipToLegendItems(clonedData);
                            this.drawLegendInternal(clonedData, viewport, true /* perform auto width */);
                        };
                        SVGLegend.prototype.drawLegendInternal = function (data, viewport, autoWidth) {
                            this.parentViewport = viewport;
                            this.data = data;
                            if (this.interactivityService)
                                this.interactivityService.applySelectionStateToData(data.dataPoints);
                            if (data.dataPoints.length === 0) {
                                this.changeOrientation(legend.LegendPosition.None);
                            }
                            if (this.getOrientation() === legend.LegendPosition.None) {
                                data.dataPoints = [];
                            }
                            // Adding back the workaround for Legend Left/Right position for Map
                            var mapControls = this.element.getElementsByClassName("mapControl");
                            if (mapControls.length > 0 && !this.isTopOrBottom(this.orientation)) {
                                for (var i = 0; i < mapControls.length; ++i) {
                                    var element = mapControls[i];
                                    element.style.display = "inline-block";
                                }
                            }
                            this.calculateViewport();
                            var layout = this.calculateLayout(data, autoWidth);
                            var titleLayout = layout.title;
                            var titleData = titleLayout ? [titleLayout] : [];
                            var hasSelection = this.interactivityService && dataHasSelection(data.dataPoints);
                            var group = this.group;
                            // transform the wrapping group if position is centered
                            if (this.isCentered(this.orientation)) {
                                var centerOffset = 0;
                                if (this.isTopOrBottom(this.orientation)) {
                                    centerOffset = Math.max(0, (this.parentViewport.width - this.visibleLegendWidth) / 2);
                                    group.attr("transform", translate(centerOffset, 0));
                                }
                                else {
                                    centerOffset = Math.max((this.parentViewport.height - this.visibleLegendHeight) / 2);
                                    group.attr("transform", translate(0, centerOffset));
                                }
                            }
                            else {
                                group.attr("transform", null);
                            }
                            var legendTitle = group
                                .selectAll(SVGLegend.LegendTitle.selectorName)
                                .data(titleData);
                            legendTitle.enter()
                                .append("text")
                                .classed(SVGLegend.LegendTitle.className, true);
                            legendTitle
                                .style({
                                "fill": data.labelColor,
                                "font-size": PixelConverter.fromPoint(data.fontSize),
                                "font-family": SVGLegend.DefaultTitleFontFamily
                            })
                                .text(function (d) { return d.text; })
                                .attr({
                                "x": function (d) { return d.x; },
                                "y": function (d) { return d.y; }
                            })
                                .append("title")
                                .text(data.title);
                            legendTitle
                                .exit()
                                .remove();
                            var virtualizedDataPoints = data.dataPoints.slice(this.legendDataStartIndex, this.legendDataStartIndex + layout.numberOfItems);
                            var iconRadius = textMeasurementService.estimateSvgTextHeight(SVGLegend.getTextProperties(false, "", this.data.fontSize)) / SVGLegend.LegendIconRadiusFactor;
                            iconRadius = (this.legendFontSizeMarginValue > SVGLegend.DefaultTextMargin) && iconRadius > SVGLegend.LegendIconRadius
                                ? iconRadius :
                                SVGLegend.LegendIconRadius;
                            var legendItems = group
                                .selectAll(SVGLegend.LegendItem.selectorName)
                                .data(virtualizedDataPoints, function (d) {
                                return d.identity.getKey() + (d.layerNumber != null ? d.layerNumber : "");
                            });
                            var itemsEnter = legendItems.enter()
                                .append("g")
                                .classed(SVGLegend.LegendItem.className, true);
                            itemsEnter
                                .append("circle")
                                .classed(SVGLegend.LegendIcon.className, true);
                            itemsEnter
                                .append("text")
                                .classed(SVGLegend.LegendText.className, true);
                            itemsEnter
                                .append("title")
                                .text(function (d) { return d.tooltip; });
                            legendItems
                                .select(SVGLegend.LegendIcon.selectorName)
                                .attr({
                                "cx": function (d, i) { return d.glyphPosition.x; },
                                "cy": function (d) { return d.glyphPosition.y; },
                                "r": iconRadius,
                            })
                                .style({
                                "fill": function (d) {
                                    if (hasSelection && !d.selected)
                                        return legend.LegendBehavior.dimmedLegendColor;
                                    else
                                        return d.color;
                                }
                            });
                            legendItems
                                .select("title")
                                .text(function (d) { return d.tooltip; });
                            legendItems
                                .select(SVGLegend.LegendText.selectorName)
                                .attr({
                                "x": function (d) { return d.textPosition.x; },
                                "y": function (d) { return d.textPosition.y; },
                            })
                                .text(function (d) { return d.label; })
                                .style({
                                "fill": data.labelColor,
                                "font-size": PixelConverter.fromPoint(data.fontSize)
                            });
                            if (this.interactivityService) {
                                var iconsSelection = legendItems.select(SVGLegend.LegendIcon.selectorName);
                                var behaviorOptions = {
                                    legendItems: legendItems,
                                    legendIcons: iconsSelection,
                                    clearCatcher: this.clearCatcher,
                                };
                                this.interactivityService.bind(data.dataPoints, new legend.LegendBehavior(), behaviorOptions, { isLegend: true });
                            }
                            legendItems.exit().remove();
                            this.drawNavigationArrows(layout.navigationArrows);
                            this.updateLayout();
                        };
                        SVGLegend.prototype.normalizePosition = function (points) {
                            if (this.legendDataStartIndex >= points.length) {
                                this.legendDataStartIndex = points.length - 1;
                            }
                            if (this.legendDataStartIndex < 0) {
                                this.legendDataStartIndex = 0;
                            }
                        };
                        SVGLegend.prototype.calculateTitleLayout = function (title) {
                            var width = 0, hasTitle = !!title;
                            if (hasTitle) {
                                var isHorizontal = this.isTopOrBottom(this.orientation), maxMeasureLength = void 0;
                                var textProperties = SVGLegend.getTextProperties(true, title, this.data.fontSize);
                                var text = title;
                                width = textMeasurementService.measureSvgTextWidth(textProperties);
                                if (isHorizontal) {
                                    width += SVGLegend.TitlePadding;
                                }
                                else {
                                    text = textMeasurementService.getTailoredTextOrDefault(textProperties, this.viewport.width);
                                }
                                return {
                                    x: 0,
                                    y: 0,
                                    text: text,
                                    width: width,
                                    height: textMeasurementService.estimateSvgTextHeight(textProperties)
                                };
                            }
                            return null;
                        };
                        /** Performs layout offline for optimal perfomance */
                        SVGLegend.prototype.calculateLayout = function (data, autoWidth) {
                            var dataPoints = data.dataPoints;
                            if (data.dataPoints.length === 0) {
                                return {
                                    numberOfItems: 0,
                                    title: null,
                                    navigationArrows: []
                                };
                            }
                            this.legendFontSizeMarginValue = PixelConverter.fromPointToPixel(this.data && this.data.fontSize !== undefined ? this.data.fontSize : SVGLegend.DefaultFontSizeInPt);
                            this.legendFontSizeMarginDifference = (this.legendFontSizeMarginValue - SVGLegend.DefaultTextMargin);
                            this.normalizePosition(dataPoints);
                            if (this.legendDataStartIndex < dataPoints.length) {
                                dataPoints = dataPoints.slice(this.legendDataStartIndex);
                            }
                            var title = this.calculateTitleLayout(data.title);
                            var navArrows;
                            var numberOfItems;
                            if (this.isTopOrBottom(this.orientation)) {
                                navArrows = this.isScrollable ? this.calculateHorizontalNavigationArrowsLayout(title) : [];
                                numberOfItems = this.calculateHorizontalLayout(dataPoints, title, navArrows);
                            }
                            else {
                                navArrows = this.isScrollable ? this.calculateVerticalNavigationArrowsLayout(title) : [];
                                numberOfItems = this.calculateVerticalLayout(dataPoints, title, navArrows, autoWidth);
                            }
                            return {
                                numberOfItems: numberOfItems,
                                title: title,
                                navigationArrows: navArrows
                            };
                        };
                        SVGLegend.prototype.updateNavigationArrowLayout = function (navigationArrows, remainingDataLength, visibleDataLength) {
                            if (this.legendDataStartIndex === 0) {
                                navigationArrows.shift();
                            }
                            var lastWindow = this.arrowPosWindow;
                            this.arrowPosWindow = visibleDataLength;
                            if (navigationArrows && navigationArrows.length > 0 && this.arrowPosWindow === remainingDataLength) {
                                this.arrowPosWindow = lastWindow;
                                navigationArrows.length = navigationArrows.length - 1;
                            }
                        };
                        SVGLegend.prototype.calculateHorizontalNavigationArrowsLayout = function (title) {
                            var height = SVGLegend.LegendArrowHeight;
                            var width = SVGLegend.LegendArrowWidth;
                            var translateY = (this.viewport.height / 2) - (height / 2);
                            var data = [];
                            var rightShift = title ? title.x + title.width : 0;
                            var arrowLeft = createArrow(width, height, 180 /*angle*/);
                            var arrowRight = createArrow(width, height, 0 /*angle*/);
                            data.push({
                                x: rightShift,
                                y: translateY,
                                path: arrowLeft.path,
                                rotateTransform: arrowLeft.transform,
                                dataType: 1 /* Decrease */
                            });
                            data.push({
                                x: this.parentViewport.width - width,
                                y: translateY,
                                path: arrowRight.path,
                                rotateTransform: arrowRight.transform,
                                dataType: 0 /* Increase */
                            });
                            return data;
                        };
                        SVGLegend.prototype.calculateVerticalNavigationArrowsLayout = function (title) {
                            var height = SVGLegend.LegendArrowHeight;
                            var width = SVGLegend.LegendArrowWidth;
                            var verticalCenter = this.viewport.height / 2;
                            var data = [];
                            var rightShift = verticalCenter + height / 2;
                            var arrowTop = createArrow(width, height, 270 /*angle*/);
                            var arrowBottom = createArrow(width, height, 90 /*angle*/);
                            var titleHeight = title ? title.height : 0;
                            data.push({
                                x: rightShift,
                                y: width + titleHeight,
                                path: arrowTop.path,
                                rotateTransform: arrowTop.transform,
                                dataType: 1 /* Decrease */
                            });
                            data.push({
                                x: rightShift,
                                y: this.parentViewport.height - height,
                                path: arrowBottom.path,
                                rotateTransform: arrowBottom.transform,
                                dataType: 0 /* Increase */
                            });
                            return data;
                        };
                        /**
                         * Calculates the widths for each horizontal legend item.
                         */
                        SVGLegend.calculateHorizontalLegendItemsWidths = function (dataPoints, availableWidth, iconPadding, fontSize) {
                            var dataPointsLength = dataPoints.length;
                            // Set the maximum amount of space available to each item. They can use less, but can't go over this number.
                            var maxItemWidth = dataPointsLength > 0 ? availableWidth / dataPointsLength | 0 : 0;
                            var maxItemTextWidth = maxItemWidth - iconPadding;
                            // Makes sure the amount of space available to each item is at least SVGLegend.MaxTextLength wide.
                            // If you had many items and/or a narrow amount of available width, the availableTextWidthPerItem would be small, essentially making everything ellipsis.
                            // This prevents that from happening by giving each item at least SVGLegend.MaxTextLength of space.
                            if (maxItemTextWidth < SVGLegend.MaxTextLength) {
                                maxItemTextWidth = SVGLegend.MaxTextLength;
                                maxItemWidth = maxItemTextWidth + iconPadding;
                            }
                            // Make sure the availableWidthPerItem is less than the availableWidth. This lets the long text properly add ellipsis when we're displaying one item at a time.
                            if (maxItemWidth > availableWidth) {
                                maxItemWidth = availableWidth;
                                maxItemTextWidth = maxItemWidth - iconPadding;
                            }
                            var occupiedWidth = 0;
                            var legendItems = [];
                            // Add legend items until we can't fit any more (the last one doesn't fit) or we've added all of them
                            for (var _i = 0, dataPoints_1 = dataPoints; _i < dataPoints_1.length; _i++) {
                                var dataPoint = dataPoints_1[_i];
                                var textProperties = SVGLegend.getTextProperties(false, dataPoint.label, fontSize);
                                var itemTextWidth = textMeasurementService.measureSvgTextWidth(textProperties);
                                var desiredWidth = itemTextWidth + iconPadding;
                                var overMaxWidth = desiredWidth > maxItemWidth;
                                var actualWidth = overMaxWidth ? maxItemWidth : desiredWidth;
                                occupiedWidth += actualWidth;
                                if (occupiedWidth >= availableWidth) {
                                    // Always add at least 1 element
                                    if (legendItems.length === 0) {
                                        legendItems.push({
                                            dataPoint: dataPoint,
                                            textProperties: textProperties,
                                            desiredWidth: desiredWidth,
                                            desiredOverMaxWidth: true,
                                            width: desiredWidth
                                        });
                                        // Set the width to the amount of space we actually have
                                        occupiedWidth = availableWidth;
                                    }
                                    else {
                                        // Subtract the width from what was just added since it won't fit
                                        occupiedWidth -= actualWidth;
                                    }
                                    break;
                                }
                                legendItems.push({
                                    dataPoint: dataPoint,
                                    textProperties: textProperties,
                                    desiredWidth: desiredWidth,
                                    desiredOverMaxWidth: overMaxWidth,
                                    width: desiredWidth
                                });
                            }
                            // If there are items at max width, evenly redistribute the extra space to them
                            var itemsOverMax = legendItems.filter(function (li) { return li.desiredOverMaxWidth; });
                            var numItemsOverMax = itemsOverMax.length;
                            if (numItemsOverMax > 0) {
                                var extraWidth = availableWidth - occupiedWidth;
                                for (var _a = 0, itemsOverMax_1 = itemsOverMax; _a < itemsOverMax_1.length; _a++) {
                                    var item = itemsOverMax_1[_a];
                                    // Divvy up the extra space and add it to the max
                                    // We need to do this calculation in every loop since the remainingWidth may not be changed by the same amount every time
                                    var extraWidthPerItem = extraWidth / numItemsOverMax;
                                    var newMaxItemWidth = maxItemWidth + extraWidthPerItem;
                                    var usedExtraWidth = void 0;
                                    if (item.desiredWidth <= newMaxItemWidth) {
                                        // If the item doesn't need all the extra space, it's not at max anymore
                                        item.desiredOverMaxWidth = false;
                                        usedExtraWidth = item.desiredWidth - maxItemWidth;
                                    }
                                    else {
                                        // Otherwise the item is taking up all the extra space so update the actual width to indicate that
                                        item.width = newMaxItemWidth;
                                        usedExtraWidth = newMaxItemWidth - maxItemWidth;
                                    }
                                    extraWidth -= usedExtraWidth;
                                    numItemsOverMax--;
                                }
                            }
                            return legendItems;
                        };
                        SVGLegend.prototype.calculateHorizontalLayout = function (dataPoints, title, navigationArrows) {
                            // calculate the text shift
                            var HorizontalTextShift = 4 + SVGLegend.LegendIconRadius;
                            // check if we need more space for the margin, or use the default text padding
                            var fontSizeBiggerThanDefault = this.legendFontSizeMarginDifference > 0;
                            var fontSizeMargin = fontSizeBiggerThanDefault ? SVGLegend.TextAndIconPadding + this.legendFontSizeMarginDifference : SVGLegend.TextAndIconPadding;
                            var fixedTextShift = (fontSizeMargin / (SVGLegend.LegendIconRadiusFactor / 2)) + HorizontalTextShift;
                            var occupiedWidth = 0;
                            // calculate the size of the space for both sides of the radius
                            var iconTotalItemPadding = SVGLegend.LegendIconRadius * 2 + fontSizeMargin * 1.5;
                            var numberOfItems = dataPoints.length;
                            // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
                            var defaultTextProperties = SVGLegend.getTextProperties(false, "", this.data.fontSize);
                            var verticalCenter = this.viewport.height / 2;
                            var textYCoordinate = verticalCenter + textMeasurementService.estimateSvgTextHeight(defaultTextProperties) / 2
                                - textMeasurementService.estimateSvgTextBaselineDelta(defaultTextProperties);
                            if (title) {
                                occupiedWidth += title.width;
                                // get the Y coordinate which is the middle of the container + the middle of the text height - the delta of the text
                                title.y = verticalCenter + title.height / 2 - textMeasurementService.estimateSvgTextBaselineDelta(SVGLegend.getTextProperties(true, title.text, this.data.fontSize));
                            }
                            // if an arrow should be added, we add space for it
                            if (this.legendDataStartIndex > 0) {
                                occupiedWidth += SVGLegend.LegendArrowOffset;
                            }
                            // Calculate the width for each of the legend items
                            var dataPointsLength = dataPoints.length;
                            var availableWidth = this.parentViewport.width - occupiedWidth;
                            var legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(dataPoints, availableWidth, iconTotalItemPadding, this.data.fontSize);
                            numberOfItems = legendItems.length;
                            // If we can't show all the legend items, subtract the "next" arrow space from the available space and re-run the width calculations
                            if (numberOfItems !== dataPointsLength) {
                                availableWidth -= SVGLegend.LegendArrowOffset;
                                legendItems = SVGLegend.calculateHorizontalLegendItemsWidths(dataPoints, availableWidth, iconTotalItemPadding, this.data.fontSize);
                                numberOfItems = legendItems.length;
                            }
                            for (var _i = 0, legendItems_1 = legendItems; _i < legendItems_1.length; _i++) {
                                var legendItem = legendItems_1[_i];
                                var dataPoint = legendItem.dataPoint;
                                dataPoint.glyphPosition = {
                                    // the space taken so far + the radius + the margin / radiusFactor to prevent huge spaces
                                    x: occupiedWidth + SVGLegend.LegendIconRadius + (this.legendFontSizeMarginDifference / SVGLegend.LegendIconRadiusFactor),
                                    // The middle of the container but a bit lower due to text not being in the middle (qP for example making middle between q and P)
                                    y: (this.viewport.height * SVGLegend.LegendIconYRatio),
                                };
                                dataPoint.textPosition = {
                                    x: occupiedWidth + fixedTextShift,
                                    y: textYCoordinate,
                                };
                                // If we're over the max width, process it so it fits
                                if (legendItem.desiredOverMaxWidth) {
                                    var textWidth = legendItem.width - iconTotalItemPadding;
                                    var text = textMeasurementService.getTailoredTextOrDefault(legendItem.textProperties, textWidth);
                                    dataPoint.label = text;
                                }
                                occupiedWidth += legendItem.width;
                            }
                            this.visibleLegendWidth = occupiedWidth;
                            this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);
                            return numberOfItems;
                        };
                        SVGLegend.prototype.calculateVerticalLayout = function (dataPoints, title, navigationArrows, autoWidth) {
                            var _this = this;
                            // check if we need more space for the margin, or use the default text padding
                            var fontSizeBiggerThenDefault = this.legendFontSizeMarginDifference > 0;
                            var fontFactor = fontSizeBiggerThenDefault ? this.legendFontSizeMarginDifference : 0;
                            // calculate the size needed after font size change
                            var verticalLegendHeight = 20 + fontFactor;
                            var spaceNeededByTitle = 15 + fontFactor;
                            var extraShiftForTextAlignmentToIcon = 4 + fontFactor;
                            var totalSpaceOccupiedThusFar = verticalLegendHeight;
                            // the default space for text and icon radius + the margin after the font size change
                            var fixedHorizontalIconShift = SVGLegend.TextAndIconPadding + SVGLegend.LegendIconRadius + (this.legendFontSizeMarginDifference / SVGLegend.LegendIconRadiusFactor);
                            var fixedHorizontalTextShift = fixedHorizontalIconShift * 2;
                            // check how much space is needed
                            var maxHorizontalSpaceAvaliable = autoWidth
                                ? this.parentViewport.width * SVGLegend.LegendMaxWidthFactor
                                    - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth
                                : this.lastCalculatedWidth
                                    - fixedHorizontalTextShift - SVGLegend.LegendEdgeMariginWidth;
                            var numberOfItems = dataPoints.length;
                            var maxHorizontalSpaceUsed = 0;
                            var parentHeight = this.parentViewport.height;
                            if (title) {
                                totalSpaceOccupiedThusFar += spaceNeededByTitle;
                                title.x = SVGLegend.TextAndIconPadding;
                                title.y = spaceNeededByTitle;
                                maxHorizontalSpaceUsed = title.width || 0;
                            }
                            // if an arrow should be added, we add space for it
                            if (this.legendDataStartIndex > 0)
                                totalSpaceOccupiedThusFar += SVGLegend.LegendArrowOffset;
                            var dataPointsLength = dataPoints.length;
                            for (var i = 0; i < dataPointsLength; i++) {
                                var dp = dataPoints[i];
                                var textProperties = SVGLegend.getTextProperties(false, dp.label, this.data.fontSize);
                                dp.glyphPosition = {
                                    x: fixedHorizontalIconShift,
                                    y: (totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon) - textMeasurementService.estimateSvgTextBaselineDelta(textProperties)
                                };
                                dp.textPosition = {
                                    x: fixedHorizontalTextShift,
                                    y: totalSpaceOccupiedThusFar + extraShiftForTextAlignmentToIcon
                                };
                                // TODO: [PERF] Get rid of this extra measurement, and modify
                                // getTailoredTextToReturnWidth + Text
                                var width = textMeasurementService.measureSvgTextWidth(textProperties);
                                if (width > maxHorizontalSpaceUsed) {
                                    maxHorizontalSpaceUsed = width;
                                }
                                if (width > maxHorizontalSpaceAvaliable) {
                                    var text = textMeasurementService.getTailoredTextOrDefault(textProperties, maxHorizontalSpaceAvaliable);
                                    dp.label = text;
                                }
                                totalSpaceOccupiedThusFar += verticalLegendHeight;
                                if (totalSpaceOccupiedThusFar > parentHeight) {
                                    numberOfItems = i;
                                    break;
                                }
                            }
                            if (autoWidth) {
                                if (maxHorizontalSpaceUsed < maxHorizontalSpaceAvaliable) {
                                    this.lastCalculatedWidth = this.viewport.width = Math.ceil(maxHorizontalSpaceUsed + fixedHorizontalTextShift + SVGLegend.LegendEdgeMariginWidth);
                                }
                                else {
                                    this.lastCalculatedWidth = this.viewport.width = Math.ceil(this.parentViewport.width * SVGLegend.LegendMaxWidthFactor);
                                }
                            }
                            else {
                                this.viewport.width = this.lastCalculatedWidth;
                            }
                            this.visibleLegendHeight = totalSpaceOccupiedThusFar;
                            navigationArrows.forEach(function (d) { return d.x = _this.lastCalculatedWidth / 2; });
                            this.updateNavigationArrowLayout(navigationArrows, dataPointsLength, numberOfItems);
                            return numberOfItems;
                        };
                        SVGLegend.prototype.drawNavigationArrows = function (layout) {
                            var _this = this;
                            var arrows = this.group.selectAll(SVGLegend.NavigationArrow.selectorName)
                                .data(layout);
                            arrows
                                .enter()
                                .append("g")
                                .on("click", function (d) {
                                var pos = _this.legendDataStartIndex;
                                _this.legendDataStartIndex = d.dataType === 0 /* Increase */
                                    ? pos + _this.arrowPosWindow : pos - _this.arrowPosWindow;
                                _this.drawLegendInternal(_this.data, _this.parentViewport, false);
                            })
                                .classed(SVGLegend.NavigationArrow.className, true)
                                .append("path");
                            arrows
                                .attr("transform", function (d) { return translate(d.x, d.y); })
                                .select("path")
                                .attr({
                                "d": function (d) { return d.path; },
                                "transform": function (d) { return d.rotateTransform; }
                            });
                            arrows
                                .exit()
                                .remove();
                        };
                        SVGLegend.prototype.isTopOrBottom = function (orientation) {
                            switch (orientation) {
                                case legend.LegendPosition.Top:
                                case legend.LegendPosition.Bottom:
                                case legend.LegendPosition.BottomCenter:
                                case legend.LegendPosition.TopCenter:
                                    return true;
                                default:
                                    return false;
                            }
                        };
                        SVGLegend.prototype.isCentered = function (orientation) {
                            switch (orientation) {
                                case legend.LegendPosition.BottomCenter:
                                case legend.LegendPosition.LeftCenter:
                                case legend.LegendPosition.RightCenter:
                                case legend.LegendPosition.TopCenter:
                                    return true;
                                default:
                                    return false;
                            }
                        };
                        SVGLegend.prototype.reset = function () { };
                        SVGLegend.getTextProperties = function (isTitle, text, fontSize) {
                            return {
                                text: text,
                                fontFamily: isTitle
                                    ? SVGLegend.DefaultTitleFontFamily
                                    : SVGLegend.DefaultFontFamily,
                                fontSize: PixelConverter.fromPoint(fontSize || SVGLegend.DefaultFontSizeInPt)
                            };
                        };
                        SVGLegend.prototype.setTooltipToLegendItems = function (data) {
                            // we save the values to tooltip before cut
                            for (var _i = 0, _a = data.dataPoints; _i < _a.length; _i++) {
                                var dataPoint = _a[_i];
                                dataPoint.tooltip = dataPoint.label;
                            }
                        };
                        return SVGLegend;
                    }());
                    SVGLegend.DefaultFontSizeInPt = 8;
                    SVGLegend.LegendIconRadius = 5;
                    SVGLegend.LegendIconRadiusFactor = 5;
                    SVGLegend.MaxTextLength = 60;
                    SVGLegend.TextAndIconPadding = 5;
                    SVGLegend.TitlePadding = 15;
                    SVGLegend.LegendEdgeMariginWidth = 10;
                    SVGLegend.LegendMaxWidthFactor = 0.3;
                    SVGLegend.TopLegendHeight = 24;
                    SVGLegend.DefaultTextMargin = PixelConverter.fromPointToPixel(SVGLegend.DefaultFontSizeInPt);
                    SVGLegend.LegendIconYRatio = 0.52;
                    // Navigation Arrow constants
                    SVGLegend.LegendArrowOffset = 10;
                    SVGLegend.LegendArrowHeight = 15;
                    SVGLegend.LegendArrowWidth = 7.5;
                    SVGLegend.DefaultFontFamily = font.Family.regular.css;
                    SVGLegend.DefaultTitleFontFamily = font.Family.semibold.css;
                    SVGLegend.LegendItem = createClassAndSelector("legendItem");
                    SVGLegend.LegendText = createClassAndSelector("legendText");
                    SVGLegend.LegendIcon = createClassAndSelector("legendIcon");
                    SVGLegend.LegendTitle = createClassAndSelector("legendTitle");
                    SVGLegend.NavigationArrow = createClassAndSelector("navArrow");
                    legend.SVGLegend = SVGLegend;
                })(legend = chart.legend || (chart.legend = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var dataLabel;
                (function (dataLabel) {
                    /** Defines possible content positions.  */
                    var ContentPositions;
                    (function (ContentPositions) {
                        /** Content position is not defined. */
                        ContentPositions[ContentPositions["None"] = 0] = "None";
                        /** Content aligned top left. */
                        ContentPositions[ContentPositions["TopLeft"] = 1] = "TopLeft";
                        /** Content aligned top center. */
                        ContentPositions[ContentPositions["TopCenter"] = 2] = "TopCenter";
                        /** Content aligned top right. */
                        ContentPositions[ContentPositions["TopRight"] = 4] = "TopRight";
                        /** Content aligned middle left. */
                        ContentPositions[ContentPositions["MiddleLeft"] = 8] = "MiddleLeft";
                        /** Content aligned middle center. */
                        ContentPositions[ContentPositions["MiddleCenter"] = 16] = "MiddleCenter";
                        /** Content aligned middle right. */
                        ContentPositions[ContentPositions["MiddleRight"] = 32] = "MiddleRight";
                        /** Content aligned bottom left. */
                        ContentPositions[ContentPositions["BottomLeft"] = 64] = "BottomLeft";
                        /** Content aligned bottom center. */
                        ContentPositions[ContentPositions["BottomCenter"] = 128] = "BottomCenter";
                        /** Content aligned bottom right. */
                        ContentPositions[ContentPositions["BottomRight"] = 256] = "BottomRight";
                        /** Content is placed inside the bounding rectangle in the center. */
                        ContentPositions[ContentPositions["InsideCenter"] = 512] = "InsideCenter";
                        /** Content is placed inside the bounding rectangle at the base. */
                        ContentPositions[ContentPositions["InsideBase"] = 1024] = "InsideBase";
                        /** Content is placed inside the bounding rectangle at the end. */
                        ContentPositions[ContentPositions["InsideEnd"] = 2048] = "InsideEnd";
                        /** Content is placed outside the bounding rectangle at the base. */
                        ContentPositions[ContentPositions["OutsideBase"] = 4096] = "OutsideBase";
                        /** Content is placed outside the bounding rectangle at the end. */
                        ContentPositions[ContentPositions["OutsideEnd"] = 8192] = "OutsideEnd";
                        /** Content supports all possible positions. */
                        ContentPositions[ContentPositions["All"] = 16383] = "All";
                    })(ContentPositions = dataLabel.ContentPositions || (dataLabel.ContentPositions = {}));
                    /**
                     * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
                     * and starting/ending side of the rectangle.
                     */
                    var RectOrientation;
                    (function (RectOrientation) {
                        /** Rectangle with no specific orientation. */
                        RectOrientation[RectOrientation["None"] = 0] = "None";
                        /** Vertical rectangle with base at the bottom. */
                        RectOrientation[RectOrientation["VerticalBottomTop"] = 1] = "VerticalBottomTop";
                        /** Vertical rectangle with base at the top. */
                        RectOrientation[RectOrientation["VerticalTopBottom"] = 2] = "VerticalTopBottom";
                        /** Horizontal rectangle with base at the left. */
                        RectOrientation[RectOrientation["HorizontalLeftRight"] = 3] = "HorizontalLeftRight";
                        /** Horizontal rectangle with base at the right. */
                        RectOrientation[RectOrientation["HorizontalRightLeft"] = 4] = "HorizontalRightLeft";
                    })(RectOrientation = dataLabel.RectOrientation || (dataLabel.RectOrientation = {}));
                    /**
                     * Defines if panel elements are allowed to be positioned
                     * outside of the panel boundaries.
                     */
                    var OutsidePlacement;
                    (function (OutsidePlacement) {
                        /** Elements can be positioned outside of the panel. */
                        OutsidePlacement[OutsidePlacement["Allowed"] = 0] = "Allowed";
                        /** Elements can not be positioned outside of the panel. */
                        OutsidePlacement[OutsidePlacement["Disallowed"] = 1] = "Disallowed";
                        /** Elements can be partially outside of the panel. */
                        OutsidePlacement[OutsidePlacement["Partial"] = 2] = "Partial";
                    })(OutsidePlacement = dataLabel.OutsidePlacement || (dataLabel.OutsidePlacement = {}));
                    var labelStyle;
                    (function (labelStyle) {
                        labelStyle.category = "Category";
                        labelStyle.data = "Data";
                        labelStyle.both = "Both";
                    })(labelStyle = dataLabel.labelStyle || (dataLabel.labelStyle = {}));
                    var PointLabelPosition;
                    (function (PointLabelPosition) {
                        PointLabelPosition[PointLabelPosition["Above"] = 0] = "Above";
                        PointLabelPosition[PointLabelPosition["Below"] = 1] = "Below";
                    })(PointLabelPosition = dataLabel.PointLabelPosition || (dataLabel.PointLabelPosition = {}));
                })(dataLabel = chart.dataLabel || (chart.dataLabel = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var dataLabel;
                (function (dataLabel) {
                    var locationConverter;
                    (function (locationConverter) {
                        function topInside(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0,
                                top: rect.top + offset,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.topInside = topInside;
                        function bottomInside(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0,
                                top: (rect.top + rect.height) - size.height - offset,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.bottomInside = bottomInside;
                        function rightInside(size, rect, offset) {
                            return {
                                left: (rect.left + rect.width) - size.width - offset,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.rightInside = rightInside;
                        function leftInside(size, rect, offset) {
                            return {
                                left: rect.left + offset,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.leftInside = leftInside;
                        function topOutside(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0,
                                top: rect.top - size.height - offset,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.topOutside = topOutside;
                        function bottomOutside(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0,
                                top: (rect.top + rect.height) + offset,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.bottomOutside = bottomOutside;
                        function rightOutside(size, rect, offset) {
                            return {
                                left: (rect.left + rect.width) + offset,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.rightOutside = rightOutside;
                        function leftOutside(size, rect, offset) {
                            return {
                                left: rect.left - size.width - offset,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.leftOutside = leftOutside;
                        function middleHorizontal(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0 + offset,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.middleHorizontal = middleHorizontal;
                        function middleVertical(size, rect, offset) {
                            return {
                                left: rect.left + rect.width / 2.0 - size.width / 2.0,
                                top: rect.top + rect.height / 2.0 - size.height / 2.0 + offset,
                                width: size.width,
                                height: size.height
                            };
                        }
                        locationConverter.middleVertical = middleVertical;
                    })(locationConverter = dataLabel.locationConverter || (dataLabel.locationConverter = {}));
                })(dataLabel = chart.dataLabel || (chart.dataLabel = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var dataLabel;
                (function (dataLabel) {
                    var Rect = powerbi.extensibility.utils.svg.shapes.Rect;
                    // powerbi.extensibility.utils.type
                    var Double = powerbi.extensibility.utils.type.Double;
                    /**
                    * Arranges label elements using the anchor point or rectangle. Collisions
                    * between elements can be automatically detected and as a result elements
                    * can be repositioned or get hidden.
                    */
                    var DataLabelManager = (function () {
                        function DataLabelManager() {
                            this.movingStep = 3;
                            this.hideOverlapped = true;
                            // The global settings for all labels.
                            // They can be oweridden by each label we add into the panel, because contains same properties.
                            this.defaultDataLabelSettings = {
                                anchorMargin: DataLabelManager.DefaultAnchorMargin,
                                anchorRectOrientation: dataLabel.RectOrientation.None,
                                contentPosition: dataLabel.ContentPositions.BottomCenter,
                                outsidePlacement: dataLabel.OutsidePlacement.Disallowed,
                                maximumMovingDistance: DataLabelManager.DefaultMaximumMovingDistance,
                                minimumMovingDistance: DataLabelManager.DefaultMinimumMovingDistance,
                                validContentPositions: dataLabel.ContentPositions.BottomCenter,
                                opacity: 1
                            };
                        }
                        Object.defineProperty(DataLabelManager.prototype, "defaultSettings", {
                            get: function () {
                                return this.defaultDataLabelSettings;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        /** Arranges the lables position and visibility*/
                        DataLabelManager.prototype.hideCollidedLabels = function (viewport, data, layout, addTransform, hideCollidedLabels) {
                            if (addTransform === void 0) { addTransform = false; }
                            if (hideCollidedLabels === void 0) { hideCollidedLabels = true; }
                            // Split size into a grid
                            var arrangeGrid = new dataLabel.DataLabelArrangeGrid(viewport, data, layout);
                            var filteredData = [];
                            var transform = { x: 0, y: 0 };
                            if (addTransform) {
                                transform.x = viewport.width / 2;
                                transform.y = viewport.height / 2;
                            }
                            for (var i = 0, len = data.length; i < len; i++) {
                                // Filter unwanted data points
                                if (!layout.filter(data[i])) {
                                    continue;
                                }
                                // Set default values where properties values are undefined
                                var info = this.getLabelInfo(data[i]);
                                info.anchorPoint = {
                                    x: layout.labelLayout.x(data[i]) + transform.x,
                                    y: layout.labelLayout.y(data[i]) + transform.y,
                                };
                                var position = this.calculateContentPosition(info, info.contentPosition, data[i].size, info.anchorMargin);
                                if (DataLabelManager.isValid(position) && (!this.hasCollisions(arrangeGrid, info, position, viewport) || !hideCollidedLabels)) {
                                    data[i].labelX = position.left - transform.x;
                                    data[i].labelY = position.top - transform.y;
                                    // Keep track of all panel elements positions.
                                    arrangeGrid.add(info, position);
                                    // Save all data points to display
                                    filteredData.push(data[i]);
                                }
                            }
                            return filteredData;
                        };
                        /**
                         * Merges the label element info with the panel element info and returns correct label info.
                         * @param source The label info.
                         */
                        DataLabelManager.prototype.getLabelInfo = function (source) {
                            var settings = this.defaultDataLabelSettings;
                            source.anchorMargin = source.anchorMargin !== undefined
                                ? source.anchorMargin
                                : settings.anchorMargin;
                            source.anchorRectOrientation = source.anchorRectOrientation !== undefined
                                ? source.anchorRectOrientation
                                : settings.anchorRectOrientation;
                            source.contentPosition = source.contentPosition !== undefined
                                ? source.contentPosition
                                : settings.contentPosition;
                            source.maximumMovingDistance = source.maximumMovingDistance !== undefined
                                ? source.maximumMovingDistance
                                : settings.maximumMovingDistance;
                            source.minimumMovingDistance = source.minimumMovingDistance !== undefined
                                ? source.minimumMovingDistance
                                : settings.minimumMovingDistance;
                            source.outsidePlacement = source.outsidePlacement !== undefined
                                ? source.outsidePlacement
                                : settings.outsidePlacement;
                            source.validContentPositions = source.validContentPositions !== undefined
                                ? source.validContentPositions
                                : settings.validContentPositions;
                            source.opacity = source.opacity !== undefined
                                ? source.opacity
                                : settings.opacity;
                            source.maximumMovingDistance += source.anchorMargin;
                            return source;
                        };
                        /**
                        * (Private) Calculates element position using anchor point..
                        */
                        DataLabelManager.prototype.calculateContentPositionFromPoint = function (anchorPoint, contentPosition, contentSize, offset) {
                            var position = { x: 0, y: 0 };
                            if (anchorPoint) {
                                if (anchorPoint.x !== undefined && isFinite(anchorPoint.x)) {
                                    position.x = anchorPoint.x;
                                    switch (contentPosition) {
                                        // D3 positions the label in the middle by default.
                                        // The algorithem asumed the label was positioned in right so this is why we add/substract half width
                                        case dataLabel.ContentPositions.TopLeft:
                                        case dataLabel.ContentPositions.MiddleLeft:
                                        case dataLabel.ContentPositions.BottomLeft:
                                            position.x -= contentSize.width / 2.0;
                                            break;
                                        case dataLabel.ContentPositions.TopRight:
                                        case dataLabel.ContentPositions.MiddleRight:
                                        case dataLabel.ContentPositions.BottomRight:
                                            position.x += contentSize.width / 2.0;
                                            break;
                                    }
                                }
                                if (anchorPoint.y !== undefined && isFinite(anchorPoint.y)) {
                                    position.y = anchorPoint.y;
                                    switch (contentPosition) {
                                        case dataLabel.ContentPositions.MiddleLeft:
                                        case dataLabel.ContentPositions.MiddleCenter:
                                        case dataLabel.ContentPositions.MiddleRight:
                                            position.y -= contentSize.height / 2.0;
                                            break;
                                        case dataLabel.ContentPositions.TopRight:
                                        case dataLabel.ContentPositions.TopLeft:
                                        case dataLabel.ContentPositions.TopCenter:
                                            position.y -= contentSize.height;
                                            break;
                                    }
                                }
                                if (offset !== undefined && isFinite(offset)) {
                                    switch (contentPosition) {
                                        case dataLabel.ContentPositions.TopLeft:
                                            position.x -= offset;
                                            position.y -= offset;
                                            break;
                                        case dataLabel.ContentPositions.MiddleLeft:
                                            position.x -= offset;
                                            break;
                                        case dataLabel.ContentPositions.BottomLeft:
                                            position.x -= offset;
                                            position.y += offset;
                                            break;
                                        case dataLabel.ContentPositions.TopCenter:
                                            position.y -= offset;
                                            break;
                                        case dataLabel.ContentPositions.MiddleCenter:
                                            // Offset is not applied
                                            break;
                                        case dataLabel.ContentPositions.BottomCenter:
                                            position.y += offset;
                                            break;
                                        case dataLabel.ContentPositions.TopRight:
                                            position.x += offset;
                                            position.y -= offset;
                                            break;
                                        case dataLabel.ContentPositions.MiddleRight:
                                            position.x += offset;
                                            break;
                                        case dataLabel.ContentPositions.BottomRight:
                                            position.x += offset;
                                            position.y += offset;
                                            break;
                                    }
                                }
                            }
                            return {
                                left: position.x,
                                top: position.y,
                                width: contentSize.width,
                                height: contentSize.height
                            };
                        };
                        /** (Private) Calculates element position using anchor rect. */
                        DataLabelManager.prototype.calculateContentPositionFromRect = function (anchorRect, anchorRectOrientation, contentPosition, contentSize, offset) {
                            switch (contentPosition) {
                                case dataLabel.ContentPositions.InsideCenter:
                                    return this.handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                                case dataLabel.ContentPositions.InsideEnd:
                                    return this.handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                                case dataLabel.ContentPositions.InsideBase:
                                    return this.handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
                                case dataLabel.ContentPositions.OutsideEnd:
                                    return this.handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
                                case dataLabel.ContentPositions.OutsideBase:
                                    return this.handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
                            }
                            return { left: 0, top: 0, width: -1, height: -1 };
                        };
                        /** (Private) Calculates element inside center position using anchor rect. */
                        DataLabelManager.prototype.handleInsideCenterPosition = function (anchorRectOrientation, contentSize, anchorRect, offset) {
                            switch (anchorRectOrientation) {
                                case dataLabel.RectOrientation.VerticalBottomTop:
                                case dataLabel.RectOrientation.VerticalTopBottom:
                                    return dataLabel.locationConverter.middleVertical(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalLeftRight:
                                case dataLabel.RectOrientation.HorizontalRightLeft:
                                default:
                                    return dataLabel.locationConverter.middleHorizontal(contentSize, anchorRect, offset);
                            }
                        };
                        /** (Private) Calculates element inside end position using anchor rect. */
                        DataLabelManager.prototype.handleInsideEndPosition = function (anchorRectOrientation, contentSize, anchorRect, offset) {
                            switch (anchorRectOrientation) {
                                case dataLabel.RectOrientation.VerticalBottomTop:
                                    return dataLabel.locationConverter.topInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.VerticalTopBottom:
                                    return dataLabel.locationConverter.bottomInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalRightLeft:
                                    return dataLabel.locationConverter.leftInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalLeftRight:
                                default:
                                    return dataLabel.locationConverter.rightInside(contentSize, anchorRect, offset);
                            }
                        };
                        /** (Private) Calculates element inside base position using anchor rect. */
                        DataLabelManager.prototype.handleInsideBasePosition = function (anchorRectOrientation, contentSize, anchorRect, offset) {
                            switch (anchorRectOrientation) {
                                case dataLabel.RectOrientation.VerticalBottomTop:
                                    return dataLabel.locationConverter.bottomInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.VerticalTopBottom:
                                    return dataLabel.locationConverter.topInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalRightLeft:
                                    return dataLabel.locationConverter.rightInside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalLeftRight:
                                default:
                                    return dataLabel.locationConverter.leftInside(contentSize, anchorRect, offset);
                            }
                        };
                        /** (Private) Calculates element outside end position using anchor rect. */
                        DataLabelManager.prototype.handleOutsideEndPosition = function (anchorRectOrientation, contentSize, anchorRect, offset) {
                            switch (anchorRectOrientation) {
                                case dataLabel.RectOrientation.VerticalBottomTop:
                                    return dataLabel.locationConverter.topOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.VerticalTopBottom:
                                    return dataLabel.locationConverter.bottomOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalRightLeft:
                                    return dataLabel.locationConverter.leftOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalLeftRight:
                                default:
                                    return dataLabel.locationConverter.rightOutside(contentSize, anchorRect, offset);
                            }
                        };
                        /** (Private) Calculates element outside base position using anchor rect. */
                        DataLabelManager.prototype.handleOutsideBasePosition = function (anchorRectOrientation, contentSize, anchorRect, offset) {
                            switch (anchorRectOrientation) {
                                case dataLabel.RectOrientation.VerticalBottomTop:
                                    return dataLabel.locationConverter.bottomOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.VerticalTopBottom:
                                    return dataLabel.locationConverter.topOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalRightLeft:
                                    return dataLabel.locationConverter.rightOutside(contentSize, anchorRect, offset);
                                case dataLabel.RectOrientation.HorizontalLeftRight:
                                default:
                                    return dataLabel.locationConverter.leftOutside(contentSize, anchorRect, offset);
                            }
                        };
                        /**  (Private) Calculates element position. */
                        DataLabelManager.prototype.calculateContentPosition = function (anchoredElementInfo, contentPosition, contentSize, offset) {
                            if (contentPosition !== dataLabel.ContentPositions.InsideEnd &&
                                contentPosition !== dataLabel.ContentPositions.InsideCenter &&
                                contentPosition !== dataLabel.ContentPositions.InsideBase &&
                                contentPosition !== dataLabel.ContentPositions.OutsideBase &&
                                contentPosition !== dataLabel.ContentPositions.OutsideEnd) {
                                // Determine position using anchor point.
                                return this.calculateContentPositionFromPoint(anchoredElementInfo.anchorPoint, contentPosition, contentSize, offset);
                            }
                            // Determine position using anchor rectangle.
                            return this.calculateContentPositionFromRect(anchoredElementInfo.anchorRect, anchoredElementInfo.anchorRectOrientation, contentPosition, contentSize, offset);
                        };
                        /** (Private) Check for collisions. */
                        DataLabelManager.prototype.hasCollisions = function (arrangeGrid, info, position, size) {
                            if (arrangeGrid.hasConflict(position)) {
                                return true;
                            }
                            // Since we divide the height by 2 we add it back to the top of the view port so labels won't be cut off
                            var intersection = { left: 0, top: position.height / 2, width: size.width, height: size.height };
                            intersection = Rect.inflate(intersection, { left: DataLabelManager.InflateAmount, top: 0, right: DataLabelManager.InflateAmount, bottom: 0 });
                            intersection = Rect.intersect(intersection, position);
                            if (Rect.isEmpty(intersection)) {
                                // Empty rectangle means there is a collision
                                return true;
                            }
                            switch (info.outsidePlacement) {
                                // D3 positions the label in the middle by default.
                                // The algorithem asumed the label was positioned in right so this is why we devide by 2 or 4
                                case dataLabel.OutsidePlacement.Disallowed:
                                    return Double.lessWithPrecision(intersection.width, position.width) ||
                                        Double.lessWithPrecision(intersection.height, position.height / 2);
                                case dataLabel.OutsidePlacement.Partial:
                                    return Double.lessWithPrecision(intersection.width, position.width / 2) ||
                                        Double.lessWithPrecision(intersection.height, position.height / 4);
                            }
                            return false;
                        };
                        DataLabelManager.isValid = function (rect) {
                            return !Rect.isEmpty(rect) && (rect.width > 0 && rect.height > 0);
                        };
                        return DataLabelManager;
                    }());
                    DataLabelManager.DefaultAnchorMargin = 0; // For future use
                    DataLabelManager.DefaultMaximumMovingDistance = 12;
                    DataLabelManager.DefaultMinimumMovingDistance = 3;
                    DataLabelManager.InflateAmount = 5;
                    dataLabel.DataLabelManager = DataLabelManager;
                })(dataLabel = chart.dataLabel || (chart.dataLabel = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var chart;
            (function (chart) {
                var dataLabel;
                (function (dataLabel) {
                    var Rect = powerbi.extensibility.utils.svg.shapes.Rect;
                    // powerbi.extensibility.utils.type
                    var Prototype = powerbi.extensibility.utils.type.Prototype;
                    var textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
                    /**
                     * Utility class to speed up the conflict detection by collecting the arranged items in the DataLabelsPanel.
                     */
                    var DataLabelArrangeGrid = (function () {
                        /**
                         * Creates new ArrangeGrid.
                         * @param size The available size
                         */
                        function DataLabelArrangeGrid(size, elements, layout) {
                            this.grid = [];
                            if (size.width === 0 || size.height === 0) {
                                this.cellSize = size;
                                this.rowCount = this.colCount = 0;
                            }
                            var baseProperties = {
                                fontFamily: dataLabel.utils.LabelTextProperties.fontFamily,
                                fontSize: dataLabel.utils.LabelTextProperties.fontSize,
                                fontWeight: dataLabel.utils.LabelTextProperties.fontWeight,
                            };
                            // sets the cell size to be twice of the Max with and Max height of the elements
                            this.cellSize = { width: 0, height: 0 };
                            for (var i = 0, len = elements.length; i < len; i++) {
                                var child = elements[i];
                                // Fill label field
                                child.labeltext = layout.labelText(child);
                                var properties = Prototype.inherit(baseProperties);
                                properties.text = child.labeltext;
                                properties.fontSize = child.data
                                    ? child.data.labelFontSize
                                    : child.labelFontSize
                                        ? child.labelFontSize
                                        : dataLabel.utils.LabelTextProperties.fontSize;
                                child.size = {
                                    width: textMeasurementService.measureSvgTextWidth(properties),
                                    height: textMeasurementService.estimateSvgTextHeight(properties),
                                };
                                var w = child.size.width * 2, h = child.size.height * 2;
                                if (w > this.cellSize.width) {
                                    this.cellSize.width = w;
                                }
                                if (h > this.cellSize.height) {
                                    this.cellSize.height = h;
                                }
                            }
                            if (this.cellSize.width === 0) {
                                this.cellSize.width = size.width;
                            }
                            if (this.cellSize.height === 0) {
                                this.cellSize.height = size.height;
                            }
                            this.colCount = this.getGridRowColCount(this.cellSize.width, size.width, DataLabelArrangeGrid.ARRANGEGRID_MIN_COUNT, DataLabelArrangeGrid.ARRANGEGRID_MAX_COUNT);
                            this.rowCount = this.getGridRowColCount(this.cellSize.height, size.height, DataLabelArrangeGrid.ARRANGEGRID_MIN_COUNT, DataLabelArrangeGrid.ARRANGEGRID_MAX_COUNT);
                            this.cellSize.width = size.width / this.colCount;
                            this.cellSize.height = size.height / this.rowCount;
                            var grid = this.grid;
                            for (var x = 0; x < this.colCount; x++) {
                                grid[x] = [];
                                for (var y = 0; y < this.rowCount; y++) {
                                    grid[x][y] = [];
                                }
                            }
                        }
                        /**
                         * Register a new label element.
                         * @param element The label element to register.
                         * @param rect The label element position rectangle.
                         */
                        DataLabelArrangeGrid.prototype.add = function (element, rect) {
                            var indexRect = this.getGridIndexRect(rect), grid = this.grid;
                            for (var x = indexRect.left; x < indexRect.right; x++) {
                                for (var y = indexRect.top; y < indexRect.bottom; y++) {
                                    grid[x][y].push({ element: element, rect: rect });
                                }
                            }
                        };
                        /**
                         * Checks for conflict of given rectangle in registered elements.
                         * @param rect The rectengle to check.
                         * @return True if conflict is detected.
                         */
                        DataLabelArrangeGrid.prototype.hasConflict = function (rect) {
                            var indexRect = this.getGridIndexRect(rect), grid = this.grid, isIntersecting = Rect.isIntersecting;
                            for (var x = indexRect.left; x < indexRect.right; x++) {
                                for (var y = indexRect.top; y < indexRect.bottom; y++) {
                                    for (var z = 0; z < grid[x][y].length; z++) {
                                        var item = grid[x][y][z];
                                        if (isIntersecting(item.rect, rect)) {
                                            return true;
                                        }
                                    }
                                }
                            }
                            return false;
                        };
                        /**
                         * Calculates the number of rows or columns in a grid
                         * @param step is the largest label size (width or height)
                         * @param length is the grid size (width or height)
                         * @param minCount is the minimum allowed size
                         * @param maxCount is the maximum allowed size
                         * @return the number of grid rows or columns
                         */
                        DataLabelArrangeGrid.prototype.getGridRowColCount = function (step, length, minCount, maxCount) {
                            return Math.min(Math.max(Math.ceil(length / step), minCount), maxCount);
                        };
                        /**
                         * Returns the grid index of a given recangle
                         * @param rect The rectengle to check.
                         * @return grid index as a thickness object.
                         */
                        DataLabelArrangeGrid.prototype.getGridIndexRect = function (rect) {
                            var restrict = function (n, min, max) { return Math.min(Math.max(n, min), max); };
                            return {
                                left: restrict(Math.floor(rect.left / this.cellSize.width), 0, this.colCount),
                                top: restrict(Math.floor(rect.top / this.cellSize.height), 0, this.rowCount),
                                right: restrict(Math.ceil((rect.left + rect.width) / this.cellSize.width), 0, this.colCount),
                                bottom: restrict(Math.ceil((rect.top + rect.height) / this.cellSize.height), 0, this.rowCount)
                            };
                        };
                        return DataLabelArrangeGrid;
                    }());
                    DataLabelArrangeGrid.ARRANGEGRID_MIN_COUNT = 1;
                    DataLabelArrangeGrid.ARRANGEGRID_MAX_COUNT = 100;
                    dataLabel.DataLabelArrangeGrid = DataLabelArrangeGrid;
                })(dataLabel = chart.dataLabel || (chart.dataLabel = {}));
            })(chart = utils.chart || (utils.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils_1) {
            var chart;
            (function (chart) {
                var dataLabel;
                (function (dataLabel) {
                    var utils;
                    (function (utils) {
                        var font = powerbi.extensibility.utils.formatting.font;
                        var numberFormat = powerbi.extensibility.utils.formatting.numberFormat;
                        var formattingService = powerbi.extensibility.utils.formatting.formattingService;
                        var textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
                        var valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
                        var DisplayUnitSystemType = powerbi.extensibility.utils.formatting.DisplayUnitSystemType;
                        // powerbi.extensibility.utils.type
                        var PixelConverter = powerbi.extensibility.utils.type.PixelConverter;
                        var createClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;
                        utils.maxLabelWidth = 50;
                        utils.defaultLabelDensity = "50";
                        utils.DefaultDy = "-0.15em";
                        utils.DefaultFontSizeInPt = 9;
                        utils.StandardFontFamily = font.Family.regular.css;
                        utils.LabelTextProperties = {
                            fontFamily: font.Family.regularSecondary.css,
                            fontSize: PixelConverter.fromPoint(utils.DefaultFontSizeInPt),
                            fontWeight: "normal",
                        };
                        utils.defaultLabelColor = "#777777";
                        utils.defaultInsideLabelColor = "#ffffff";
                        utils.hundredPercentFormat = "0.00 %;-0.00 %;0.00 %";
                        utils.defaultLabelPrecision = undefined;
                        var defaultCountLabelPrecision = 0;
                        var labelGraphicsContextClass = createClassAndSelector("labels");
                        var linesGraphicsContextClass = createClassAndSelector("lines");
                        var labelsClass = createClassAndSelector("data-labels");
                        var lineClass = createClassAndSelector("line-label");
                        var DimmedOpacity = 0.4;
                        var DefaultOpacity = 1.0;
                        function getFillOpacity(selected, highlight, hasSelection, hasPartialHighlights) {
                            if ((hasPartialHighlights && !highlight) || (hasSelection && !selected)) {
                                return DimmedOpacity;
                            }
                            return DefaultOpacity;
                        }
                        function updateLabelSettingsFromLabelsObject(labelsObj, labelSettings) {
                            if (labelsObj) {
                                if (labelsObj.show !== undefined) {
                                    labelSettings.show = labelsObj.show;
                                }
                                if (labelsObj.showSeries !== undefined) {
                                    labelSettings.show = labelsObj.showSeries;
                                }
                                if (labelsObj.color !== undefined) {
                                    labelSettings.labelColor = labelsObj.color.solid.color;
                                }
                                if (labelsObj.labelDisplayUnits !== undefined) {
                                    labelSettings.displayUnits = labelsObj.labelDisplayUnits;
                                }
                                if (labelsObj.labelPrecision !== undefined) {
                                    labelSettings.precision = (labelsObj.labelPrecision >= 0)
                                        ? labelsObj.labelPrecision
                                        : utils.defaultLabelPrecision;
                                }
                                if (labelsObj.fontSize !== undefined) {
                                    labelSettings.fontSize = labelsObj.fontSize;
                                }
                                if (labelsObj.showAll !== undefined) {
                                    labelSettings.showLabelPerSeries = labelsObj.showAll;
                                }
                                if (labelsObj.labelStyle !== undefined) {
                                    labelSettings.labelStyle = labelsObj.labelStyle;
                                }
                                if (labelsObj.labelPosition) {
                                    labelSettings.position = labelsObj.labelPosition;
                                }
                            }
                        }
                        utils.updateLabelSettingsFromLabelsObject = updateLabelSettingsFromLabelsObject;
                        function getDefaultLabelSettings(show, labelColor, fontSize) {
                            if (show === void 0) { show = false; }
                            return {
                                show: show,
                                position: dataLabel.PointLabelPosition.Above,
                                displayUnits: 0,
                                precision: utils.defaultLabelPrecision,
                                labelColor: labelColor || utils.defaultLabelColor,
                                fontSize: fontSize || utils.DefaultFontSizeInPt,
                            };
                        }
                        utils.getDefaultLabelSettings = getDefaultLabelSettings;
                        function getDefaultColumnLabelSettings(isLabelPositionInside) {
                            var labelSettings = getDefaultLabelSettings(false, undefined);
                            labelSettings.position = null;
                            labelSettings.labelColor = undefined;
                            return labelSettings;
                        }
                        utils.getDefaultColumnLabelSettings = getDefaultColumnLabelSettings;
                        function getDefaultPointLabelSettings() {
                            return {
                                show: false,
                                position: dataLabel.PointLabelPosition.Above,
                                displayUnits: 0,
                                precision: utils.defaultLabelPrecision,
                                labelColor: utils.defaultLabelColor,
                                fontSize: utils.DefaultFontSizeInPt,
                            };
                        }
                        utils.getDefaultPointLabelSettings = getDefaultPointLabelSettings;
                        function getLabelPrecision(precision, format) {
                            if (precision !== utils.defaultLabelPrecision) {
                                return precision;
                            }
                            if (format === "g" || format === "G") {
                                return;
                            }
                            if (format) {
                                // Calculate precision from positive format by default
                                var positiveFormat = numberFormat.getComponents(format).positive, formatMetadata = numberFormat.getCustomFormatMetadata(positiveFormat, true /*calculatePrecision*/);
                                if (formatMetadata.hasDots) {
                                    return formatMetadata.precision;
                                }
                            }
                            // For count fields we do not want a precision by default
                            return defaultCountLabelPrecision;
                        }
                        utils.getLabelPrecision = getLabelPrecision;
                        function drawDefaultLabelsForDataPointChart(data, context, layout, viewport, isAnimator, animationDuration, hasSelection, hideCollidedLabels) {
                            if (isAnimator === void 0) { isAnimator = false; }
                            if (hideCollidedLabels === void 0) { hideCollidedLabels = true; }
                            // Hide and reposition labels that overlap
                            var dataLabelManager = new dataLabel.DataLabelManager();
                            var filteredData = dataLabelManager.hideCollidedLabels(viewport, data, layout, false, hideCollidedLabels);
                            var hasAnimation = isAnimator && !!animationDuration;
                            var labels = selectLabels(filteredData, context, false, hasAnimation);
                            if (!labels) {
                                return;
                            }
                            if (hasAnimation) {
                                labels
                                    .text(function (d) { return d.labeltext; })
                                    .transition()
                                    .duration(animationDuration)
                                    .style(layout.style)
                                    .style("opacity", (hasSelection ? function (d) { return getFillOpacity(d.selected, false, hasSelection, false); } : 1))
                                    .attr({
                                    x: function (d) { return d.labelX; },
                                    y: function (d) { return d.labelY; }
                                });
                                labels
                                    .exit()
                                    .transition()
                                    .duration(animationDuration)
                                    .style("opacity", 0) // fade out labels that are removed
                                    .remove();
                            }
                            else {
                                labels
                                    .attr({ x: function (d) { return d.labelX; }, y: function (d) { return d.labelY; } })
                                    .text(function (d) { return d.labeltext; })
                                    .style(layout.style);
                                labels
                                    .exit()
                                    .remove();
                            }
                            return labels;
                        }
                        utils.drawDefaultLabelsForDataPointChart = drawDefaultLabelsForDataPointChart;
                        function selectLabels(filteredData, context, isDonut, forAnimation) {
                            if (isDonut === void 0) { isDonut = false; }
                            if (forAnimation === void 0) { forAnimation = false; }
                            // Check for a case where resizing leaves no labels - then we need to remove the labels "g"
                            if (filteredData.length === 0) {
                                cleanDataLabels(context, true);
                                return null;
                            }
                            if (context.select(labelGraphicsContextClass.selectorName).empty()) {
                                context.append("g").classed(labelGraphicsContextClass.className, true);
                            }
                            // line chart ViewModel has a special "key" property for point identification since the "identity" field is set to the series identity
                            var hasKey = filteredData[0].key != null;
                            var hasDataPointIdentity = filteredData[0].identity != null;
                            var getIdentifier = hasKey ?
                                function (d) { return d.key; }
                                : hasDataPointIdentity ?
                                    function (d) { return d.identity.getKey(); }
                                    : undefined;
                            var labels = isDonut ?
                                context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData, function (d) { return d.data.identity.getKey(); })
                                : getIdentifier != null ?
                                    context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData, getIdentifier)
                                    : context.select(labelGraphicsContextClass.selectorName).selectAll(labelsClass.selectorName).data(filteredData);
                            var newLabels = labels.enter()
                                .append("text")
                                .classed(labelsClass.className, true);
                            if (forAnimation) {
                                newLabels.style("opacity", 0);
                            }
                            return labels;
                        }
                        function cleanDataLabels(context, removeLines) {
                            if (removeLines === void 0) { removeLines = false; }
                            var empty = [], labels = context.selectAll(labelsClass.selectorName).data(empty);
                            labels
                                .exit()
                                .remove();
                            context
                                .selectAll(labelGraphicsContextClass.selectorName)
                                .remove();
                            if (removeLines) {
                                var lines = context
                                    .selectAll(lineClass.selectorName)
                                    .data(empty);
                                lines
                                    .exit()
                                    .remove();
                                context
                                    .selectAll(linesGraphicsContextClass.selectorName)
                                    .remove();
                            }
                        }
                        utils.cleanDataLabels = cleanDataLabels;
                        function setHighlightedLabelsOpacity(context, hasSelection, hasHighlights) {
                            context
                                .selectAll(labelsClass.selectorName)
                                .style("fill-opacity", function (d) {
                                var labelOpacity = getFillOpacity(d.selected, d.highlight, !d.highlight && hasSelection, !d.selected && hasHighlights) < 1 ? 0 : 1;
                                return labelOpacity;
                            });
                        }
                        utils.setHighlightedLabelsOpacity = setHighlightedLabelsOpacity;
                        function getLabelFormattedText(options) {
                            var properties = {
                                text: options.formatter
                                    ? options.formatter.format(options.label)
                                    : formattingService.formatValue(options.label, options.format),
                                fontFamily: utils.LabelTextProperties.fontFamily,
                                fontSize: PixelConverter.fromPoint(options.fontSize),
                                fontWeight: utils.LabelTextProperties.fontWeight,
                            };
                            return textMeasurementService.getTailoredTextOrDefault(properties, options.maxWidth
                                ? options.maxWidth
                                : utils.maxLabelWidth);
                        }
                        utils.getLabelFormattedText = getLabelFormattedText;
                        function enumerateDataLabels(options) {
                            if (!options.dataLabelsSettings) {
                                return;
                            }
                            var instance = {
                                objectName: "labels",
                                selector: options.selector,
                                properties: {},
                            };
                            if (options.show && options.selector) {
                                instance.properties["showSeries"] = options.dataLabelsSettings.show;
                            }
                            else if (options.show) {
                                instance.properties["show"] = options.dataLabelsSettings.show;
                            }
                            instance.properties["color"] = options.dataLabelsSettings.labelColor || utils.defaultLabelColor;
                            if (options.displayUnits) {
                                instance.properties["labelDisplayUnits"] = options.dataLabelsSettings.displayUnits;
                            }
                            if (options.precision) {
                                var precision = options.dataLabelsSettings.precision;
                                instance.properties["labelPrecision"] = precision === utils.defaultLabelPrecision ? null : precision;
                            }
                            if (options.position) {
                                instance.properties["labelPosition"] = options.dataLabelsSettings.position;
                                if (options.positionObject) {
                                    instance.validValues = { "labelPosition": options.positionObject };
                                }
                            }
                            if (options.labelStyle) {
                                instance.properties["labelStyle"] = options.dataLabelsSettings.labelStyle;
                            }
                            if (options.fontSize) {
                                instance.properties["fontSize"] = options.dataLabelsSettings.fontSize;
                            }
                            if (options.labelDensity) {
                                var lineChartSettings = options.dataLabelsSettings;
                                if (lineChartSettings) {
                                    instance.properties["labelDensity"] = lineChartSettings.labelDensity;
                                }
                            }
                            // Keep show all as the last property of the instance.
                            if (options.showAll) {
                                instance.properties["showAll"] = options.dataLabelsSettings.showLabelPerSeries;
                            }
                            options.instances.push(instance);
                            return instance;
                        }
                        utils.enumerateDataLabels = enumerateDataLabels;
                        function enumerateCategoryLabels(enumeration, dataLabelsSettings, withFill, isShowCategory, fontSize) {
                            if (isShowCategory === void 0) { isShowCategory = false; }
                            var labelSettings = (dataLabelsSettings)
                                ? dataLabelsSettings
                                : getDefaultPointLabelSettings();
                            var instance = {
                                objectName: "categoryLabels",
                                selector: null,
                                properties: {
                                    show: isShowCategory
                                        ? labelSettings.showCategory
                                        : labelSettings.show,
                                    fontSize: dataLabelsSettings ? dataLabelsSettings.fontSize : utils.DefaultFontSizeInPt,
                                },
                            };
                            if (withFill) {
                                instance.properties["color"] = labelSettings.categoryLabelColor
                                    ? labelSettings.categoryLabelColor
                                    : labelSettings.labelColor;
                            }
                            if (fontSize) {
                                instance.properties["fontSize"] = fontSize;
                            }
                            enumeration.instances.push(instance);
                        }
                        utils.enumerateCategoryLabels = enumerateCategoryLabels;
                        function getDisplayUnitValueFromAxisFormatter(axisFormatter, labelSettings) {
                            if (axisFormatter && axisFormatter.displayUnit && labelSettings.displayUnits === 0) {
                                return axisFormatter.displayUnit.value;
                            }
                            return null;
                        }
                        function createColumnFormatterCacheManager() {
                            return {
                                cache: { defaultFormatter: null },
                                getOrCreate: function (formatString, labelSetting, value2) {
                                    if (formatString) {
                                        var cacheKeyObject = {
                                            formatString: formatString,
                                            displayUnits: labelSetting.displayUnits,
                                            precision: getLabelPrecision(labelSetting.precision, formatString),
                                            value2: value2
                                        };
                                        var cacheKey = JSON.stringify(cacheKeyObject);
                                        if (!this.cache[cacheKey]) {
                                            this.cache[cacheKey] = valueFormatter.create(getOptionsForLabelFormatter(labelSetting, formatString, value2, cacheKeyObject.precision));
                                        }
                                        return this.cache[cacheKey];
                                    }
                                    if (!this.cache.defaultFormatter) {
                                        this.cache.defaultFormatter = valueFormatter.create(getOptionsForLabelFormatter(labelSetting, formatString, value2, labelSetting.precision));
                                    }
                                    return this.cache.defaultFormatter;
                                }
                            };
                        }
                        utils.createColumnFormatterCacheManager = createColumnFormatterCacheManager;
                        function getOptionsForLabelFormatter(labelSetting, formatString, value2, precision) {
                            return {
                                displayUnitSystemType: DisplayUnitSystemType.DataLabels,
                                format: formatString,
                                precision: precision,
                                value: labelSetting.displayUnits,
                                value2: value2,
                                allowFormatBeautification: true,
                            };
                        }
                        utils.getOptionsForLabelFormatter = getOptionsForLabelFormatter;
                        function isTextWidthOverflows(textWidth, maxTextWidth) {
                            return textWidth > maxTextWidth;
                        }
                        utils.isTextWidthOverflows = isTextWidthOverflows;
                        function isTextHeightOverflows(textHeight, innerChordLength) {
                            return textHeight > innerChordLength;
                        }
                        utils.isTextHeightOverflows = isTextHeightOverflows;
                    })(utils = dataLabel.utils || (dataLabel.utils = {}));
                })(dataLabel = chart.dataLabel || (chart.dataLabel = {}));
            })(chart = utils_1.chart || (utils_1.chart = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
