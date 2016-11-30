# Legend service
> The ```Legend``` provides some special capabilities in order to create and manipulate charts legend.

The ```powerbi.visuals``` module provides the following functions and interfaces:

* [createLegend](#createLegend)
* [ILegend](#ILegend)
* [drawLegend](#drawLegend)

## createLegend
This function is to simplify visual legend creation.

```typescript
function createLegend(legendParentElement: JQuery,
        interactive: boolean,
        interactivityService: IInteractivityService,
        isScrollable: boolean = false,
        legendPosition: LegendPosition = LegendPosition.Top): ILegend;
```

### Example

```typescript
        public init(options: VisualInitOptions) {
            this.visualInitOptions = options;
            this.layers = [];

            var element = this.element = options.element;
            var viewport = this.currentViewport = options.viewport;
            var hostServices = options.host;
            
            //... some other init calls

            if (this.behavior) {
                this.interactivityService = createInteractivityService(hostServices);
            }
            this.legend = createLegend(
                element,
                options.interactivity && options.interactivity.isInteractiveLegend,
                this.interactivityService,
                true);
        }
```

## ILegend
This Interface implements all methods necessary for legend creation

```typescript
export interface ILegend {
        getMargins(): IViewport;
        isVisible(): boolean;
        changeOrientation(orientation: LegendPosition): void;
        getOrientation(): LegendPosition;
        drawLegend(data: LegendData, viewport: IViewport);
        /**
         * Reset the legend by clearing it
         */
        reset(): void;}
    ```

## drawLegend

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

