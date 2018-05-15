import { interactivityService } from "powerbi-visuals-utils-interactivityutils";
import IInteractiveBehavior = interactivityService.IInteractiveBehavior;
import ISelectionHandler = interactivityService.ISelectionHandler;
import { Selection } from "d3-selection";
export interface LegendBehaviorOptions {
    legendItems: Selection<any>;
    legendIcons: Selection<any>;
    clearCatcher: Selection<any>;
}
export declare class LegendBehavior implements IInteractiveBehavior {
    static dimmedLegendColor: string;
    private legendIcons;
    bindEvents(options: LegendBehaviorOptions, selectionHandler: ISelectionHandler): void;
    renderSelection(hasSelection: boolean): void;
}
