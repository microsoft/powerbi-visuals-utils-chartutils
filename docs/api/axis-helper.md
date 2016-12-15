# Axis Helper
> The ```Axis Helper``` provides functions in order to simplify manipulations with axis.

The ```powerbi.extensibility.utils.chart.axis``` module provides the following functions:

* [getRecommendedNumberOfTicksForXAxis](#getrecommendednumberofticksforxaxis)
* [getRecommendedNumberOfTicksForYAxis](#getrecommendednumberofticksforyaxis)
* [getBestNumberOfTicks](#getbestnumberofticks)
* [getTickLabelMargins](#getticklabelmargins)
* [isOrdinal](#isordinal)
* [isDateTime](#isdatetime)
* [getCategoryThickness](#getcategorythickness)
* [invertOrdinalScale](#invertordinalscale)
* [findClosestXAxisIndex](#findclosestxaxisindex)
* [diffScaled](#diffscaled)
* [createDomain](#createdomain)
* [getCategoryValueType](#getcategoryvaluetype)
* [createAxis](#createaxis)
* [createFormatter](#createformatter)
* [applyCustomizedDomain](#applycustomizeddomain)
* [combineDomain](#combinedomain)
* [powerOfTen](#poweroften)

## getRecommendedNumberOfTicksForXAxis

This function returns recommended amount of ticks according to width of chart.

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

This function returns recommended amount of ticks according to height of chart.

```typescript
function getRecommendedNumberOfTicksForYAxis(availableWidth: number) 
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.getRecommendedNumberOfTicksForYAxis(100);

// returns: 3
```

## getBestNumberOfTicks

Gets the optimal number of ticks based on minimum value, maximum value, measure metadata and max tick count;

```typescript
function getBestNumberOfTicks(min: number, max: number, valuesMetadata: DataViewMetadataColumn[], maxTickCount: number, isDateTime?: boolean): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
  var dataViewMetadataColumnWithIntegersOnly: powerbi.DataViewMetadataColumn[] = [
                {
                    displayName: "col1",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ integer: true })
                },
                {
                    displayName: "col2",
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ integer: true })
                }
            ];
 var actual = AxisHelper.getBestNumberOfTicks(0, 3, dataViewMetadataColumnWithIntegersOnly, 6);
// returns: 4
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

This function returns the margins for tick labels.

```typescript
function getTickLabelMargins(
    viewport: IViewport,
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

axisHelper.getTickLabelMargins(
    plotArea,
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

// returns:  xMax,
             yLeft,
             yRight,
             stackHeigh
```

## isOrdinal

Checks if a string is null or undefined or empty.

```typescript
function isOrdinal(type: ValueTypeDescriptor): boolean;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
let type = ValueType.fromDescriptor({ misc: { barcode: true } });
axisHelper.isOrdinal(type);

// returns: true
```

## isDateTime

Checks if value is of DateTime type.

```typescript
function isDateTime(type: ValueTypeDescriptor): boolean;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

axisHelper.isDateTime(ValueType.fromDescriptor({ dateTime: true }))

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

    let range = [0, 100];
    let domain = [0, 10];
    let scale = d3.scale.linear().domain(domain).range(range);
    let actualThickness = AxisHelper.getCategoryThickness(scale);
```

## invertOrdinalScale

This function inverts the ordinal scale. If x < scale.range()[0], then scale.domain()[0] is returned.
Otherwise, it returns the greatest item in scale.domain() that's <= x.

```typescript
function invertOrdinalScale(scale: d3.scale.Ordinal<any, any>, x: number) ;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

let domain: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    pixelSpan: number = 100,
    ordinalScale: d3.scale.ordinal = axisHelper.createOrdinalScale(pixelSpan, domain, 0.4);

axisHelper.invertOrdinalScale(ordinalScale, 49);

// returns: 4
```

## findClosestXAxisIndex

This function finds and returns the closest x-axis index.

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

This function computes and returns a diff of values in the scale. 

```typescript
function diffScaled(scale: d3.scale.Linear<any, any>, value1: any, value2: any): number;
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

var scale: d3.scale.Linear<number, number>,
    range = [0, 999],
    domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 999];

scale = d3.scale.linear()
    .range(range)
    .domain(domain);

return axisHelper.diffScaled(scale, 0, 0));

// returns: 0
```

## createDomain

This function creates a domain of values for axis.

```typescript
function createDomain(data: any[], axisType: ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: NumberRange): number[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

var cartesianSeries = [
    {
        data: [{ categoryValue: 7, value: 11, categoryIndex: 0, seriesIndex: 0, }, {
            categoryValue: 9, value: 9, categoryIndex: 1, seriesIndex: 0,
        }, {
            categoryValue: 15, value: 6, categoryIndex: 2, seriesIndex: 0,
        }, { categoryValue: 22, value: 7, categoryIndex: 3, seriesIndex: 0, }]
    },
];

var domain = axisHelper.createDomain(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);

// returns: [0, 1, 2, 3]
```

## getCategoryValueType

This function gets the ValueType of a category column, defaults to Text if the type is not present.

```typescript
function getCategoryValueType(data: any[], axisType: ValueTypeDescriptor, isScalar: boolean, forcedScalarDomain: any[], ensureDomain?: NumberRange): number[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

var cartesianSeries = [
    {
        data: [{ categoryValue: 7, value: 11, categoryIndex: 0, seriesIndex: 0, }, {
            categoryValue: 9, value: 9, categoryIndex: 1, seriesIndex: 0,
        }, {
            categoryValue: 15, value: 6, categoryIndex: 2, seriesIndex: 0,
        }, { categoryValue: 22, value: 7, categoryIndex: 3, seriesIndex: 0, }]
    },
];

axisHelper.getCategoryValueType(cartesianSeries, ValueType.fromDescriptor({ text: true }), false, []);

// returns: [0, 1, 2, 3]
```

## createAxis

This function creates a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.

```typescript
function createAxis(options: CreateAxisOptions): IAxisProperties;
```
### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;
import valueFormatter = powerbi.visuals.valueFormatter;

var dataPercent = [0.0, 0.33, 0.49];

            var formatStringProp: powerbi.DataViewObjectPropertyIdentifier = {
                objectName: 'general',
                propertyName: 'formatString',
            };
            let metaDataColumnPercent: powerbi.DataViewMetadataColumn = {
                    displayName: 'Column',
                    type: ValueType.fromDescriptor({ numeric: true }),
                    objects: {
                        general: {
                            formatString: '0 %',
                        }
                    }
                };

                var os = AxisHelper.createAxis({
                    pixelSpan: 100,
                    dataDomain: [dataPercent[0], dataPercent[2]],
                    metaDataColumn: metaDataColumnPercent,
                    formatString: valueFormatter.getFormatString(metaDataColumnPercent, formatStringProp),
                    outerPadding: 0.5,
                    isScalar: true,
                    isVertical: true,
                });
```

## applyCustomizedDomain

This function sets customized domain, but don't change when nothing is set.

```typescript
function applyCustomizedDomain(customizedDomain, forcedDomain: any[]): any[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

let customizedDomain = [undefined, 20],
    existingDomain = [0, 10];

axisHelper.applyCustomizedDomain(customizedDomain, existingDomain);

// returns: {0:0, 1:20}
```

## combineDomain

This function combines the forced domain with the actual domain if one of the values was set.
The forcedDomain is in 1st priority. Extends the domain if the any reference point requires it.

```typescript
function combineDomain(forcedDomain: any[], domain: any[], ensureDomain?: NumberRange): any[];
```

### Example

```typescript
import axisHelper = powerbi.extensibility.utils.chart.axis;

let forcedYDomain = this.valueAxisProperties
    ? [this.valueAxisProperties['secStart'], this.valueAxisProperties['secEnd']]
    : null;

let xDomain = [minX, maxX];

AxisHelper.combineDomain(forcedYDomain, xDomain, ensureXDomain);
```

## powerOfTen

This function indicates whether the number is power of 10.

```typescript
function  powerOfTen(d: any): boolean;
```

### Example 

```typescript
import axis = powerbi.extensibility.utils.chart.axis;

axis.powerOfTen(10);

// returns: true
```
