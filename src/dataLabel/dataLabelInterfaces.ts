/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.utils.chart.dataLabel {
    // powerbi.extensibility.utils.svg
    import IPoint = powerbi.extensibility.utils.svg.shapes.IPoint;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import IRect = powerbi.extensibility.utils.svg.IRect;

    // powerbi.extensibility.utils.formatting
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;

    /** Defines possible content positions.  */
    export enum ContentPositions {

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
        All =
        TopLeft |
        TopCenter |
        TopRight |
        MiddleLeft |
        MiddleCenter |
        MiddleRight |
        BottomLeft |
        BottomCenter |
        BottomRight |
        InsideCenter |
        InsideBase |
        InsideEnd |
        OutsideBase |
        OutsideEnd,
    }

    /**
     * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
     * and starting/ending side of the rectangle.
     */
    export enum RectOrientation {
        /** Rectangle with no specific orientation. */
        None,

        /** Vertical rectangle with base at the bottom. */
        VerticalBottomTop,

        /** Vertical rectangle with base at the top. */
        VerticalTopBottom,

        /** Horizontal rectangle with base at the left. */
        HorizontalLeftRight,

        /** Horizontal rectangle with base at the right. */
        HorizontalRightLeft,
    }

    /**
     * Defines if panel elements are allowed to be positioned
     * outside of the panel boundaries.
     */
    export enum OutsidePlacement {
        /** Elements can be positioned outside of the panel. */
        Allowed,

        /** Elements can not be positioned outside of the panel. */
        Disallowed,

        /** Elements can be partially outside of the panel. */
        Partial
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
        callout?: { start: IPoint; end: IPoint; };

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

    export module labelStyle {
        export const category: string = "Category";
        export const data: string = "Data";
        export const both: string = "Both";
    }

    export enum PointLabelPosition {
        Above,
        Below,
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
        instances: VisualObjectInstance[];
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
        // for collistion detection use
        labelX?: number;
        labelY?: number;
        // for overriding color from label settings
        labelFill?: string;
        // for display units and precision
        labeltext?: string;
        // taken from column metadata
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

    export interface DataLabelObject extends DataViewObject {
        show: boolean;
        color: Fill;
        labelDisplayUnits: number;
        labelPrecision?: number;
        labelPosition: any;
        fontSize?: number;
        showAll?: boolean;
        showSeries?: boolean;
        labelDensity?: string;
        labelStyle?: any;
    }
}
