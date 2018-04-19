import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import IInteractivityService = interactivityService.IInteractivityService;
import { ILegend, LegendPosition } from "./legendInterfaces";
import { Selection } from "d3-selection";
export declare function createLegend(legendParentElement: HTMLElement, interactive: boolean, interactivityService: IInteractivityService, isScrollable?: boolean, legendPosition?: LegendPosition): ILegend;
export declare function isLeft(orientation: LegendPosition): boolean;
export declare function isTop(orientation: LegendPosition): boolean;
export declare function positionChartArea(chartArea: Selection<any>, legend: ILegend): void;
