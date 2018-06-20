import powerbi from "powerbi-visuals-tools";
import * as formatting from "powerbi-visuals-utils-formattingutils";
import { ILegend, LegendData, LegendDataPoint, LegendPosition } from "./legendInterfaces";
import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import IInteractivityService = interactivityService.IInteractivityService;
import TextProperties = formatting.textMeasurementService.TextProperties;
export interface TitleLayout {
    x: number;
    y: number;
    text: string;
    width: number;
    height: number;
}
export declare const enum NavigationArrowType {
    Increase = 0,
    Decrease = 1
}
export interface NavigationArrow {
    x: number;
    y: number;
    path: string;
    rotateTransform: string;
    dataType: NavigationArrowType;
}
export interface LegendLayout {
    numberOfItems: number;
    title: TitleLayout;
    navigationArrows: NavigationArrow[];
}
export interface LegendItem {
    dataPoint: LegendDataPoint;
    textProperties: TextProperties;
    width: number;
    desiredWidth: number;
    desiredOverMaxWidth: boolean;
}
export declare class SVGLegend implements ILegend {
    private orientation;
    private viewport;
    private parentViewport;
    private svg;
    private group;
    private clearCatcher;
    private element;
    private interactivityService;
    private legendDataStartIndex;
    private arrowPosWindow;
    private data;
    private isScrollable;
    private lastCalculatedWidth;
    private visibleLegendWidth;
    private visibleLegendHeight;
    private legendFontSizeMarginDifference;
    private legendFontSizeMarginValue;
    static DefaultFontSizeInPt: number;
    private static LegendIconRadius;
    private static LegendIconRadiusFactor;
    private static MaxTextLength;
    private static TextAndIconPadding;
    private static TitlePadding;
    private static LegendEdgeMariginWidth;
    private static LegendMaxWidthFactor;
    private static TopLegendHeight;
    private static DefaultTextMargin;
    private static LegendIconYRatio;
    private static LegendArrowOffset;
    private static LegendArrowHeight;
    private static LegendArrowWidth;
    private static DefaultFontFamily;
    private static DefaultTitleFontFamily;
    private static LegendItem;
    private static LegendText;
    private static LegendIcon;
    private static LegendTitle;
    private static NavigationArrow;
    constructor(element: HTMLElement, legendPosition: LegendPosition, interactivityService: IInteractivityService, isScrollable: boolean);
    private updateLayout;
    private calculateViewport;
    getMargins(): powerbi.IViewport;
    isVisible(): boolean;
    changeOrientation(orientation: LegendPosition): void;
    getOrientation(): LegendPosition;
    drawLegend(data: LegendData, viewport: powerbi.IViewport): void;
    drawLegendInternal(data: LegendData, viewport: powerbi.IViewport, autoWidth: boolean): void;
    private normalizePosition;
    private calculateTitleLayout;
    /** Performs layout offline for optimal perfomance */
    private calculateLayout;
    private updateNavigationArrowLayout;
    private calculateHorizontalNavigationArrowsLayout;
    private calculateVerticalNavigationArrowsLayout;
    /**
     * Calculates the widths for each horizontal legend item.
     */
    private static calculateHorizontalLegendItemsWidths;
    private calculateHorizontalLayout;
    private calculateVerticalLayout;
    private drawNavigationArrows;
    private isTopOrBottom;
    private isCentered;
    reset(): void;
    private static getTextProperties;
    private setTooltipToLegendItems;
}
