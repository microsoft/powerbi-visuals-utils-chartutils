# Axis Helper
> The ```Axis Helper``` provides functions in order to simplify manipulations with axis.

The ```powerbi.extensibility.utils.chart.axis``` module provides the following functions:

* [getRecommendedNumberOfTicksForXAxis](#getRecommendedNumberOfTicksForXAxis)
* [getRecommendedNumberOfTicksForYAxis](#getRecommendedNumberOfTicksForYAxis)
* [getBestNumberOfTicks](#getBestNumberOfTicks)
* [hasNonIntegerData](#hasNonIntegerData)
* [getTickLabelMargins](#getTickLabelMargins)
* [isOrdinal](#isOrdinal)
* [isDateTime](#isDateTime)
* [getCategoryThickness](#getCategoryThickness)
* [invertOrdinalScale](#invertOrdinalScale)
* [findClosestXAxisIndex](#findClosestXAxisIndex)
* [diffScaled](#diffScaled)
* [createDomain](#createDomain)
* [getCategoryValueType](#getCategoryValueType)
* [createAxis](#createAxis)
* [createFormatter](#createFormatter)
* [applyCustomizedDomain](#applyCustomizedDomain)
* [combineDomain](#combineDomain)
* [powerOfTen](#powerOfTen)


## getRecommendedNumberOfTicksForXAxis

This function return recommended amount of ticks according to width of chart.

```typescript
function getRecommendedNumberOfTicksForXAxis(availableWidth: number): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getRecommendedNumberOfTicksForXAxis(1024);

// returns: 8
```

## getRecommendedNumberOfTicksForYAxis

This function return recommended amount of ticks according to height of chart.

```typescript
function getRecommendedNumberOfTicksForYAxis(availableWidth: number) 

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getRecommendedNumberOfTicksForYAxis(100);

// returns: 3
```

## getBestNumberOfTicks

Get the best number of ticks based on minimum value, maximum value, measure metadata and max tick count;

```typescript function getBestNumberOfTicks(min: number,
        max: number,
        valuesMetadata: DataViewMetadataColumn[],
        maxTickCount: number,
        isDateTime?: boolean): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getBestNumberOfTicks("Power BI", "Power");

// returns: true
```

## contains

This function checks if a string contains a specified substring.

```typescript
function contains(source: string, substring: string): boolean;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.contains("Microsoft Power BI Visuals", "Power BI");

// returns: true
```

## getTickLabelMargins

Checks if a string is null or undefined or empty.

```typescript
function getTickLabelMargins( viewport: IViewport,
            yMarginLimit: number,
            textWidthMeasurer: ITextAsSVGMeasurer,
            textHeightMeasurer: ITextAsSVGMeasurer,
            axes: CartesianAxisProperties,
            bottomMarginLimit: number,
            properties: TextProperties,
            scrollbarVisible?: boolean,
            showOnRight?: boolean,
            renderXAxis?: boolean,
            renderY1Axis?: boolean,
            renderY2Axis?: boolean): TickLabelMargins;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getTickLabelMargins( plotArea,
                marginLimits.left,
                TextMeasurementService.measureSvgTextWidth,
                TextMeasurementService.estimateSvgTextHeight,
                axes,
                marginLimits.bottom,
                textProperties,
                /*scrolling*/ false,
                showY1OnRight,
                renderXAxis,
                renderY1Axis,
                renderY2Axis);

// returns: true
```

## isOrdinal

Checks if a string is null or undefined or empty.

```typescript
function isOrdinal( type: ValueTypeDescriptor): boolean;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.isOrdinal(type: ValueTypeDescriptor): boolean;

// returns: true
```

## isDateTime

Checks if a string is null or undefined or empty.

```typescript
function isDateTime(type: ValueTypeDescriptor): boolean;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.isDateTime(type: ValueTypeDescriptor): boolean;

// returns: true
```

## getCategoryThickness

Uses the D3 scale to get the actual category thickness.

```typescript
function getCategoryThickness(scale: any): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getCategoryThickness(scale: any): number {
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

// returns: true
```

## invertOrdinalScale

 Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
 Otherwise, it returns the greatest item in scale.domain() that's <= x.

```typescript
function invertOrdinalScale(scale: d3.scale.Ordinal<any, any>, x: number) ;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
 	var domain: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var pixelSpan: number = 100;
	var ordinalScale: D3.Scale.OrdinalScale = axisHelper.createOrdinalScale(pixelSpan, domain, 0.4);
    var invertedValue = axisHelper.invertOrdinalScale(ordinalScale, 49);

// returns: 4
```

## findClosestXAxisIndex

 Inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
 Otherwise, it returns the greatest item in scale.domain() that's <= x.

```typescript
function findClosestXAxisIndex(categoryValue: number, categoryAxisValues: AxisHelperCategoryDataPoint[]): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
		 /**
         * Finds the index of the category of the given x coordinate given.
         * pointX is in non-scaled screen-space, and offsetX is in render-space.
         * offsetX does not need any scaling adjustment.
         * @param {number} pointX The mouse coordinate in screen-space, without scaling applied
         * @param {number} offsetX Any left offset in d3.scale render-space
         * @return {number}
         */
        private findIndex(pointX: number, offsetX?: number): number {
            // we are using mouse coordinates that do not know about any potential CSS transform scale
            let xScale = this.scaleDetector.getScale().x;
            if (!Double.equalWithPrecision(xScale, 1.0, 0.00001)) {
                pointX = pointX / xScale;
            }
            if (offsetX) {
                pointX += offsetX;
            }

            let index = axisHelper.invertScale(this.xAxisProperties.scale, pointX);
            if (this.data.isScalar) {
                // When we have scalar data the inverted scale produces a category value, so we need to search for the closest index.
                index = axisHelper.findClosestXAxisIndex(index, this.data.categoryData);
            }

            return index;
        }

```

## diffScaled

 scale(value1) - scale(value2) with zero checking and min(+/-1, result)

```typescript
function diffScaled(scale: d3.scale.Linear<any, any>, value1: any, value2: any): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
 var scale: D3.Scale.GenericQuantitativeScale<any>;

            beforeEach(() => {
                var range = [0, 999];
                var domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 999];
                scale = d3.scale.linear()
                    .range(range)
                    .domain(domain);
            });
  return axisHelper.diffScaled(scale, 0, 0));

  // returns: 0
```


## createDomain

Create domain of values for axis

```typescript
function createDomain(data: any[], axisType: ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: NumberRange): number[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
  var cartesianSeries = [
                {data: [{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,}, {categoryValue: 9,value: 9,categoryIndex: 1,seriesIndex: 0,
                        }, {categoryValue: 15,value: 6,categoryIndex: 2,seriesIndex: 0,
                        }, {categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,}]
                },
            ];
            var cartesianSeriesWithHighlights = [
                {data: [{categoryValue: 7,value: 3,categoryIndex: 0,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 2,seriesIndex: 0,}, 
                		{categoryValue: 9,value: 9,categoryIndex: 2,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 15,value: 6,categoryIndex: 3,seriesIndex: 0,}, 
                		{categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,highlight: true,}]
                },
            ];

                var domain = axisHelper.createDomain(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);

// domain  = [0, 1, 2, 3];
```

## getCategoryValueType

 Gets the ValueType of a category column, defaults to Text if the type is not present.

```typescript
function getCategoryValueType(data: any[], axisType: ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: NumberRange): number[];
```

### Example

```typescript

import axisHelper = powerbi.extensibility.utils.chart.axis;
  var cartesianSeries = [
                {data: [{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,}, {categoryValue: 9,value: 9,categoryIndex: 1,seriesIndex: 0,
                        }, {categoryValue: 15,value: 6,categoryIndex: 2,seriesIndex: 0,
                        }, {categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,}]
                },
            ];
            var cartesianSeriesWithHighlights = [
                {data: [{categoryValue: 7,value: 3,categoryIndex: 0,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 2,seriesIndex: 0,}, 
                		{categoryValue: 9,value: 9,categoryIndex: 2,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 15,value: 6,categoryIndex: 3,seriesIndex: 0,}, 
                		{categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,highlight: true,}]
                },
            ];

                var domain = axisHelper.getCategoryValueType(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);

// domain  = [0, 1, 2, 3];
```

## createAxis

Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
 @param options The properties used to create the axis.

```typescript
function createAxis(options: CreateAxisOptions): IAxisProperties;
```
### Example

```typescript

import axisHelper = powerbi.extensibility.utils.chart.axis;
  var cartesianSeries = [
                {data: [{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,}, {categoryValue: 9,value: 9,categoryIndex: 1,seriesIndex: 0,
                        }, {categoryValue: 15,value: 6,categoryIndex: 2,seriesIndex: 0,
                        }, {categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,}]
                },
            ];
            var cartesianSeriesWithHighlights = [
                {data: [{categoryValue: 7,value: 3,categoryIndex: 0,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 0,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 1,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 7,value: 11,categoryIndex: 2,seriesIndex: 0,}, 
                		{categoryValue: 9,value: 9,categoryIndex: 2,seriesIndex: 0,highlight: true,}, 
                		{categoryValue: 15,value: 6,categoryIndex: 3,seriesIndex: 0,}, 
                		{categoryValue: 22,value: 7,categoryIndex: 3,seriesIndex: 0,highlight: true,}]
                },
            ];

                var domain = axisHelper.getCategoryValueType(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);

// domain  = [0, 1, 2, 3];
```

## createFormatter

--
```typescript
function createFormatter(scaleDomain: any[],dataDomain: any[],dataType,isScalar: boolean,formatString: string,bestTickCount: number,tickValues: any[],getValueFn: any,useTickIntervalForDisplayUnits: boolean = false,axisDisplayUnits?: number,axisPrecision?: number): IValueFormatter
```

### Example

```typescript

import axisHelper = powerbi.extensibility.utils.chart.axis;
   let formatter = AxisHelper.createFormatter(
                scaleDomain,
                dataDomain,
                dataType,
                isScalar,
                formatString,
                bestTickCount,
                tickValues,
                getValueFn,
                useTickIntervalForDisplayUnits,
                axisDisplayUnits,
                axisPrecision);

```


## applyCustomizedDomain

Set customized domain, but don't change when nothing is set

```typescript
function applyCustomizedDomain(customizedDomain, forcedDomain: any[]): any[];
```

### Example

```typescript

import axisHelper = powerbi.extensibility.utils.chart.axis;
   var customizedDomain = [undefined, 20];
            var existingDomain = [0, 10];
            var newDomain = axisHelper.applyCustomizedDomain(customizedDomain, existingDomain);

// return {0:0, 1:20}


```

## combineDomain

Combine the forced domain with the actual domain if one of the values was set.
The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.

```typescript
function combineDomain(forcedDomain: any[], domain: any[], ensureDomain?: NumberRange): any[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
 
 			var forcedYDomain = this.valueAxisProperties ? [this.valueAxisProperties['secStart'], this.valueAxisProperties['secEnd']] : null;
            let xDomain = [minX, maxX];
            let combinedXDomain = AxisHelper.combineDomain(forcedYDomain, xDomain, ensureXDomain);

```

## powerOfTen

Indicates whether the number is power of 10.

```typescript
function  powerOfTen(d: any): boolean;
```

### Example 

```typescript
export function powerOfTen(d: any): boolean {
        let value = Math.abs(d);
        // formula log2(Y)/log2(10) = log10(Y)
        // because double issues this won't return exact value
        // we need to ceil it to nearest number.
        let log10: number = Math.log(value) / Math.LN10;
        log10 = Math.ceil(log10 - 1e-12);

        return value / Math.pow(10, log10) === 1;
    }

```