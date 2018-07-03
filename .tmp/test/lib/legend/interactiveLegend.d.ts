import powerbi from "powerbi-visuals-tools";
import { ILegend, LegendData, LegendPosition } from "./legendInterfaces";
export declare class InteractiveLegend implements ILegend {
    private static LegendHeight;
    private static LegendContainerClass;
    private static LegendContainerSelector;
    private static LegendTitleClass;
    private static LegendItem;
    private static legendPlaceSelector;
    private static legendIconClass;
    private static legendColorCss;
    private static legendItemNameClass;
    private static legendItemMeasureClass;
    private legendContainerParent;
    private legendContainerDiv;
    constructor(element: HTMLElement);
    getMargins(): powerbi.IViewport;
    drawLegend(legendData: LegendData): void;
    reset(): void;
    isVisible(): boolean;
    /**
     * Not supported
     */
    changeOrientation(orientation: LegendPosition): void;
    getOrientation(): LegendPosition;
    /**
     * Draw the legend title
     */
    private drawTitle;
    /**
     * Draw the legend items
     */
    private drawLegendItems;
    /**
     * Ensure legend table is created and set horizontal pan gestures on it
     */
    private ensureLegendTableCreated;
    /**
     * Set Horizontal Pan gesture for the legend
     */
    private setPanGestureOnLegend;
}
