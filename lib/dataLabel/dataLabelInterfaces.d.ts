/// <reference types="powerbi-visuals-tools" />
import { shapesInterfaces, IRect } from "powerbi-visuals-utils-svgutils";
import IPoint = shapesInterfaces.IPoint;
import ISize = shapesInterfaces.ISize;
import { valueFormatter } from "powerbi-visuals-utils-formattingutils";
import IValueFormatter = valueFormatter.IValueFormatter;
/** Defines possible content positions.  */
export declare enum ContentPositions {
    /** Content position is not defined. */
    None = 0,
    /** Content aligned top left. */
    TopLeft = 1,
    /** Content aligned top center. */
    TopCenter = 2,
    /** Content aligned top right. */
    TopRight = 4,
    /** Content aligned middle left. */
    MiddleLeft = 8,
    /** Content aligned middle center. */
    MiddleCenter = 16,
    /** Content aligned middle right. */
    MiddleRight = 32,
    /** Content aligned bottom left. */
    BottomLeft = 64,
    /** Content aligned bottom center. */
    BottomCenter = 128,
    /** Content aligned bottom right. */
    BottomRight = 256,
    /** Content is placed inside the bounding rectangle in the center. */
    InsideCenter = 512,
    /** Content is placed inside the bounding rectangle at the base. */
    InsideBase = 1024,
    /** Content is placed inside the bounding rectangle at the end. */
    InsideEnd = 2048,
    /** Content is placed outside the bounding rectangle at the base. */
    OutsideBase = 4096,
    /** Content is placed outside the bounding rectangle at the end. */
    OutsideEnd = 8192,
    /** Content supports all possible positions. */
    All = 16383,
}
/**
 * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
 * and starting/ending side of the rectangle.
 */
export declare enum RectOrientation {
    /** Rectangle with no specific orientation. */
    None = 0,
    /** Vertical rectangle with base at the bottom. */
    VerticalBottomTop = 1,
    /** Vertical rectangle with base at the top. */
    VerticalTopBottom = 2,
    /** Horizontal rectangle with base at the left. */
    HorizontalLeftRight = 3,
    /** Horizontal rectangle with base at the right. */
    HorizontalRightLeft = 4,
}
/**
 * Defines if panel elements are allowed to be positioned
 * outside of the panel boundaries.
 */
export declare enum OutsidePlacement {
    /** Elements can be positioned outside of the panel. */
    Allowed = 0,
    /** Elements can not be positioned outside of the panel. */
    Disallowed = 1,
    /** Elements can be partially outside of the panel. */
    Partial = 2,
}
/**
 * Defines an interface for information needed for default label positioning. Used in DataLabelsPanel.
 * Note the question marks: none of the elements are mandatory.
 */
export interface IDataLabelSettings {
    /** Distance from the anchor point. */
    anchorMargin?: number;
    /** Orientation of the anchor rectangle. */
    anchorRectOrientation?: RectOrientation;
    /** Preferable position for the label.  */
    contentPosition?: ContentPositions;
    /** Defines the rules if the elements can be positioned outside panel bounds. */
    outsidePlacement?: OutsidePlacement;
    /** Defines the valid positions if repositionOverlapped is true. */
    validContentPositions?: ContentPositions;
    /** Defines maximum moving distance to reposition an element. */
    minimumMovingDistance?: number;
    /** Defines minimum moving distance to reposition an element. */
    maximumMovingDistance?: number;
    /** Opacity effect of the label. Use it for dimming.  */
    opacity?: number;
}
/**
 * Defines an interface for information needed for label positioning.
 * None of the elements are mandatory, but at least anchorPoint OR anchorRect is needed.
 */
export interface IDataLabelInfo extends IDataLabelSettings {
    /** The point to which label is anchored.  */
    anchorPoint?: IPoint;
    /** The rectangle to which label is anchored. */
    anchorRect?: IRect;
    /** Disable label rendering and processing. */
    hideLabel?: boolean;
    /**
     * Defines the visibility rank. This will not be processed by arrange phase,
     * but can be used for preprocessing the hideLabel value.
     */
    visibilityRank?: number;
    /** Defines the starting offset from AnchorRect. */
    offset?: number;
    /** Defines the callout line data. It is calculated and used during processing. */
    callout?: {
        start: IPoint;
        end: IPoint;
    };
    /** Source of the label. */
    source?: any;
    size?: ISize;
}
/**  Interface for label rendering. */
export interface IDataLabelRenderer {
    renderLabelArray(labels: IArrangeGridElementInfo[]): void;
}
/** Interface used in internal arrange structures. */
export interface IArrangeGridElementInfo {
    element: IDataLabelInfo;
    rect: IRect;
}
export declare module labelStyle {
    const category: string;
    const data: string;
    const both: string;
}
export declare enum PointLabelPosition {
    Above = 0,
    Below = 1,
}
export interface PointDataLabelsSettings extends VisualDataLabelsSettings {
    position: PointLabelPosition;
}
export interface LabelFormattedTextOptions {
    label: any;
    maxWidth?: number;
    format?: string;
    formatter?: IValueFormatter;
    fontSize?: number;
}
export interface VisualDataLabelsSettings {
    show: boolean;
    showLabelPerSeries?: boolean;
    isSeriesExpanded?: boolean;
    displayUnits?: number;
    showCategory?: boolean;
    position?: any;
    precision?: number;
    labelColor: string;
    categoryLabelColor?: string;
    fontSize?: number;
    labelStyle?: any;
}
/**
 * Options for setting the labels card on the property pane
 */
export interface VisualDataLabelsSettingsOptions {
    show: boolean;
    instances: powerbi.VisualObjectInstance[];
    dataLabelsSettings: VisualDataLabelsSettings;
    displayUnits?: boolean;
    precision?: boolean;
    position?: boolean;
    positionObject?: string[];
    selector?: powerbi.data.Selector;
    fontSize?: boolean;
    showAll?: boolean;
    labelDensity?: boolean;
    labelStyle?: boolean;
}
export interface LabelEnabledDataPoint {
    labelX?: number;
    labelY?: number;
    labelFill?: string;
    labeltext?: string;
    labelFormatString?: string;
    isLabelInside?: boolean;
    labelFontSize?: number;
}
export interface IColumnFormatterCache {
    [column: string]: IValueFormatter;
    defaultFormatter?: IValueFormatter;
}
export interface IColumnFormatterCacheManager {
    cache: IColumnFormatterCache;
    getOrCreate: (formatString: string, labelSetting: VisualDataLabelsSettings, value2?: number) => IValueFormatter;
}
export interface LabelPosition {
    y: (d: any, i: number) => number;
    x: (d: any, i: number) => number;
}
export interface ILabelLayout {
    labelText: (d: any) => string;
    labelLayout: LabelPosition;
    filter: (d: any) => boolean;
    style: {};
}
export interface DataLabelObject extends powerbi.DataViewObject {
    show: boolean;
    color: powerbi.Fill;
    labelDisplayUnits: number;
    labelPrecision?: number;
    labelPosition: any;
    fontSize?: number;
    showAll?: boolean;
    showSeries?: boolean;
    labelDensity?: string;
    labelStyle?: any;
}
