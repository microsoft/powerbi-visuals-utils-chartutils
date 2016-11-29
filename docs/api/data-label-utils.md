# DataLabelUtils
> The ```DataLabelUtils``` provides utils to manipulate data labels.

The ```powerbi.extensibility.utils.chart.dataLabel.utils``` module provides the following functions, interfaces and classes:

* [getLabelPrecision](#getLabelPrecision)
* [getLabelFormattedText](#getLabelFormattedText)
* [enumerateDataLabels](#enumerateDataLabels)
* [enumerateCategoryLabels](#enumerateCategoryLabels)
* [createColumnFormatterCacheManager](#createColumnFormatterCacheManager)

## getLabelPrecision
Calculates precision from given format

```typescript
function getLabelPrecision(precision: number, format: string): number
```

## getLabelFormattedText
Returns format precision from given format

```typescript
function getLabelFormattedText(options: LabelFormattedTextOptions): string
```

#### Example

```typescript
let options: LabelFormattedTextOptions = {
    text: 'some text',
    fontFamily: 'sans',
    fontSize: '15',
    fontWeight: 'normal',
};

import dataLabelUtils = powerbi.extensibility.utils.chart.dataLabel.utils;

let formattedLabelText = dataLabelUtils.getLabelFormattedText(options);
```

## enumerateDataLabels
Returns VisualObjectInstance for data labels

```typescript
function enumerateDataLabels(options: VisualDataLabelsSettingsOptions): VisualObjectInstance
```

## enumerateCategoryLabels
Adds VisualObjectInstance for Category data labels to enumeration object

```typescript
function enumerateCategoryLabels(
        enumeration: VisualObjectInstanceEnumerationObject,
        dataLabelsSettings: VisualDataLabelsSettings,
        withFill: boolean,
        isShowCategory: boolean = false,
        fontSize?: number): void
```

## createColumnFormatterCacheManager
Returns Cache Manager that provides quick access to formatted labels

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
```typescript
