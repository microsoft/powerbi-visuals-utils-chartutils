import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import IInteractivityService = interactivityService.IInteractivityService;
import { ILegend, LegendPosition } from "./legendInterfaces";
export declare function createLegend(legendParentElement: HTMLElement, interactive: boolean, interactivityService: IInteractivityService, isScrollable?: boolean, legendPosition?: LegendPosition): ILegend;
export declare function isLeft(orientation: LegendPosition): boolean;
export declare function isTop(orientation: LegendPosition): boolean;
export declare function positionChartArea(chartArea: d3.Selection<any, any, any, any>, legend: ILegend): void;
