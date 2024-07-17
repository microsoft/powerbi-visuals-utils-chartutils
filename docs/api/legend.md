# Legend service
The ```Legend``` service provides helper interfaces for creating and managing PBI legends for Custom visuals

The ```powerbi.visuals``` module provides the following functions and interfaces:

* [createLegend](#createLegend)
* [ILegend](#ILegend)
* [drawLegend](#drawLegend)

## createLegend
This helper function simplifies PowerBI Custom Visual legends creation.

```typescript
function createLegend(legendParentElement: HTMLElement,          // top visual element, container in which legend will be created
        isScrollable: boolean = false,                      // indicates that legend could be scrollable or not
        legendPosition: LegendPosition = LegendPosition.Top // Position of the legend inside of legendParentElement container
        ): ILegend;
```
### Example

```typescript
        public init(options: VisualConstructorOptions) {
            this.visualInitOptions = options;
            this.layers = [];

            var element = this.element = options.element;
            var viewport = this.currentViewport = options.viewport;
            var hostServices = options.host;

            //... some other init calls

            this.legend = createLegend(
                element,
                true);
        }
```

## ILegend
This Interface implements all methods necessary for legend creation

```typescript
export interface ILegend {
        getMargins(): IViewport;
        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;   // processing legend orientation
        getOrientation(): LegendPosition;                       // get information about current legend orientation
        drawLegend(data: LegendData, viewport: IViewport);      // all legend rendering code is placing here
        /**
         * Reset the legend by clearing it
         */
        reset(): void;}
```

### drawLegend

This function measures the height of the text with the given SVG text properties.

```typescript
function drawLegend(data: LegendData, viewport: IViewport): void;
```

### Example

```typescript
private renderLegend(): void {
            if (!this.isInteractive) {
                let legendObjectProperties = this.data.legendObjectProperties;
                if (legendObjectProperties) {
                    let legendData = this.data.legendData;
                    LegendData.update(legendData, legendObjectProperties);
                    let position = <string>legendObjectProperties[legendProps.position];
                    if (position)
                        this.legend.changeOrientation(LegendPosition[position]);

                    this.legend.drawLegend(legendData, this.parentViewport);
                } else {
                    this.legend.changeOrientation(LegendPosition.Top);
                    this.legend.drawLegend({ dataPoints: [] }, this.parentViewport);
                }
            }
        }
```

