import powerbi from "powerbi-visuals-tools";
import { Point } from "powerbi-visuals-utils-svgutils";
import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import SelectableDataPoint = interactivityService.SelectableDataPoint;
export declare enum LegendIcon {
    Box = 0,
    Circle = 1,
    Line = 2
}
export declare enum LegendPosition {
    Top = 0,
    Bottom = 1,
    Right = 2,
    Left = 3,
    None = 4,
    TopCenter = 5,
    BottomCenter = 6,
    RightCenter = 7,
    LeftCenter = 8
}
export interface LegendPosition2D {
    textPosition?: Point;
    glyphPosition?: Point;
}
export interface LegendDataPoint extends SelectableDataPoint, LegendPosition2D {
    label: string;
    color: string;
    icon: LegendIcon;
    category?: string;
    measure?: any;
    iconOnlyOnLabel?: boolean;
    tooltip?: string;
    layerNumber?: number;
}
export interface LegendData {
    title?: string;
    dataPoints: LegendDataPoint[];
    grouped?: boolean;
    labelColor?: string;
    fontSize?: number;
}
export declare const legendProps: {
    show: string;
    position: string;
    titleText: string;
    showTitle: string;
    labelColor: string;
    fontSize: string;
};
export interface ILegend {
    getMargins(): powerbi.IViewport;
    isVisible(): boolean;
    changeOrientation(orientation: LegendPosition): void;
    getOrientation(): LegendPosition;
    drawLegend(data: LegendData, viewport: powerbi.IViewport): any;
    /**
     * Reset the legend by clearing it
     */
    reset(): void;
}
