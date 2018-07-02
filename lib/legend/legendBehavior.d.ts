import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import IInteractiveBehavior = interactivityService.IInteractiveBehavior;
import ISelectionHandler = interactivityService.ISelectionHandler;
export interface LegendBehaviorOptions {
    legendItems: d3.Selection<any, any, any, any>;
    legendIcons: d3.Selection<any, any, any, any>;
    clearCatcher: d3.Selection<any, any, any, any>;
}
export declare class LegendBehavior implements IInteractiveBehavior {
    static dimmedLegendColor: string;
    private legendIcons;
    bindEvents(options: LegendBehaviorOptions, selectionHandler: ISelectionHandler): void;
    renderSelection(hasSelection: boolean): void;
}
