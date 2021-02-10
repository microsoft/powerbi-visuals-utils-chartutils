## 2.6.0
* Removed Jquery
* D3.v6 code refactored
* Packages update
* Added new tests 

## 2.5.0
* Packages update
* Github actions

## 2.4.3
* FIX: navigation arrows not displayed on first visual render

## 2.4.2
* Export as default `DataLabelArrangeGrid`, `DataLabelManager` classes
* Update packages

## 2.4.1
* Packages update
* Removal of LabelLayoutStrategy module definition, now it is imported from a file

## 2.4.0
* Update interactivity utils to 5.5.0
* Update powerbi-visual-api to 2.6
* Update packages to fix vulnerabilities

## 2.3.1
* Fixes measurement of legend items to fit available viewport width
* Supports `fontFamily` for legend component

## 2.3.0
* Update interactivity utils to 5.4.0

## 2.2.1
* FIX: d3 v5 wrong usage in Label Utils

## 2.2.0
* Implements legend marker shapes
* New Label Utils

## 2.1.0
* Update packages to fix vulnerabilities

## 2.0.6
* Added OpacityLegendBehavior for legend

## 1.5.1
* FIX: Was removed a wrong instruction from auto generated code that impacted on tests in visuals

## 1.5.0
* Added two new optional parameters for CreateScale function -- innerPadding and useRangePoint. The first lets set inner padding for scale instead of receive it from constant. The second lets use rangePoint instead of rangeBands function for creation of ordinal scale.

## 1.4.0
* Remove width restriction of title in legend
* Added new option to drawDefaultLabelsForDataPointChart function to control behavior of collided labels

## 1.3.0
* Updated packages

## 1.2.0
* Added 'disableNiceOnlyForScale' to 'CreateAxisOptions' interface
and added verification with this property to createAxis func

## 1.1.0
* Removed `lodash`
* Updated dependencies

## 1.0.1
* Update ChartUtils to use SVG utils version 1.0.0
* Add CHANGELOG
