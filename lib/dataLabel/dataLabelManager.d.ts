/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import { IRect } from "powerbi-visuals-utils-svgutils";
import { IDataLabelSettings, IDataLabelInfo, LabelEnabledDataPoint } from "./dataLabelInterfaces";
/**
* Arranges label elements using the anchor point or rectangle. Collisions
* between elements can be automatically detected and as a result elements
* can be repositioned or get hidden.
*/
export declare class DataLabelManager {
    static DefaultAnchorMargin: number;
    static DefaultMaximumMovingDistance: number;
    static DefaultMinimumMovingDistance: number;
    static InflateAmount: number;
    movingStep: number;
    hideOverlapped: boolean;
    private defaultDataLabelSettings;
    readonly defaultSettings: IDataLabelSettings;
    /** Arranges the lables position and visibility*/
    hideCollidedLabels(viewport: powerbi.IViewport, data: any[], layout: any, addTransform?: boolean, hideCollidedLabels?: boolean): LabelEnabledDataPoint[];
    /**
     * Merges the label element info with the panel element info and returns correct label info.
     * @param source The label info.
     */
    getLabelInfo(source: IDataLabelInfo): IDataLabelInfo;
    /**
    * (Private) Calculates element position using anchor point..
    */
    private calculateContentPositionFromPoint(anchorPoint, contentPosition, contentSize, offset);
    /** (Private) Calculates element position using anchor rect. */
    private calculateContentPositionFromRect(anchorRect, anchorRectOrientation, contentPosition, contentSize, offset);
    /** (Private) Calculates element inside center position using anchor rect. */
    private handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
    /** (Private) Calculates element inside end position using anchor rect. */
    private handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
    /** (Private) Calculates element inside base position using anchor rect. */
    private handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
    /** (Private) Calculates element outside end position using anchor rect. */
    private handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
    /** (Private) Calculates element outside base position using anchor rect. */
    private handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
    /**  (Private) Calculates element position. */
    private calculateContentPosition(anchoredElementInfo, contentPosition, contentSize, offset);
    /** (Private) Check for collisions. */
    private hasCollisions(arrangeGrid, info, position, size);
    static isValid(rect: IRect): boolean;
}
