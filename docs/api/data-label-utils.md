# DataLabelUtils
> The ```DataLabelUtils``` provides utils to manipulate data labels.

The ```powerbi.extensibility.utils.chart.dataLabel.utils``` module provides the following functions, interfaces and classes:

* [getLabelPrecision](#getlabelprecision)
* [getLabelFormattedText](#getlabelformattedtext)
* [enumerateDataLabels](#enumeratedatalabels)
* [enumerateCategoryLabels](#enumeratecategorylabels)
* [createColumnFormatterCacheManager](#createcolumnformattercachemanager)

## getLabelPrecision
This function calculates precision from given format.

```typescript
function getLabelPrecision(precision: number, format: string): number
```

## getLabelFormattedText

This function returns format precision from given format.

```typescript
function getLabelFormattedText(options: LabelFormattedTextOptions): string
```

#### Example

```typescript
import dataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;

let options: LabelFormattedTextOptions = {
    text: 'some text',
    fontFamily: 'sans',
    fontSize: '15',
    fontWeight: 'normal',
};

dataLabelUtils.getLabelFormattedText(options);
```

## enumerateDataLabels

This function returns VisualObjectInstance for data labels.

```typescript
function enumerateDataLabels(options: VisualDataLabelsSettingsOptions): VisualObjectInstance
```

## enumerateCategoryLabels

This function adds VisualObjectInstance for Category data labels to enumeration object.

```typescript
function enumerateCategoryLabels(
    enumeration: VisualObjectInstanceEnumerationObject,
    dataLabelsSettings: VisualDataLabelsSettings,
    withFill: boolean,
    isShowCategory: boolean = false,
    fontSize?: number): void
```

## createColumnFormatterCacheManager

This function returns Cache Manager that provides quick access to formatted labels

```typescript
function createColumnFormatterCacheManager(): IColumnFormatterCacheManager
```

#### Example

```typescript
import dataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;

let value: number = 200000;

labelSettings.displayUnits = 1000000;
labelSettings.precision = 1;

let formattersCache = DataLabelUtils.createColumnFormatterCacheManager();
let formatter = formattersCache.getOrCreate(null, labelSettings);
let formattedValue = formatter.format(value);

// formattedValue == "0.2M"
```
