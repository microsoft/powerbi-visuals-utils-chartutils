# DataLabelManager
> The ```DataLabelManager``` helps to create and maintain labels. It arranges label elements using the anchor point or rectangle. Collisions between elements can be automatically detected and as a result elements can be repositioned or get hidden.

The ```powerbi.extensibility.utils.chart.dataLabel.DataLabelManager``` class provides the following methods:

* [hideCollidedLabels](#hidecollidedlabels)
* [IsValid](#isvalid)

## hideCollidedLabels

This method arranges the lables position and visibility on the canvas according to labels sizes and overlapping.

```typescript
function hideCollidedLabels(
    viewport: IViewport, 
    data: any[],
    layout: any,
    addTransform: boolean = false
): LabelEnabledDataPoint[];
```

### Example

```typescript
let dataLabelManager = new DataLabelManager();
let filteredData = dataLabelManager.hideCollidedLabels(this.viewport, values, labelLayout, true);
```

## IsValid

This static method checks if provided rectangle is valid(has positive width and height).

```typescript
function isValid(rect: IRect): boolean;
```

### Example

```typescript
let rectangle = {
    left: 150,
    top: 130,
    width: 120,
    height: 110
};

DataLabelManager.isValid(rectangle);

// returns: true
```
