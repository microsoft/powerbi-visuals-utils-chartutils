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

import powerbi from "powerbi-visuals-api";

import {
    shapes,
    shapesInterfaces,
    IRect,
} from "powerbi-visuals-utils-svgutils";

import { FontProperties, inherit } from "./fontProperties";
import * as LabelUtils from "./labelUtils";
import * as Units from "./units";

import * as DataLabelRectPositioner from "./dataLabelRectPositioner";
import * as DataLabelPointPositioner from "./dataLabelPointPositioner";

import { ISelectableDataPoint } from "../legend/legendInterfaces";

export enum LabelOrientation {
    Vertical = 0,
    Horizontal = 1,
}

export interface LabelParentPolygon {
    /** The point this data label belongs to */
    polygon: shapesInterfaces.IPolygon;
    /** Valid positions to place the label ordered by preference */
    validPositions: NewPointLabelPosition[];
}
/**
 * Defines possible data label positions relative to rectangles
 */
export const enum RectLabelPosition {

    /** Position is not defined. */
    None = 0,

    /** Content is placed inside the parent rectangle in the center. */
    InsideCenter = 1,

    /** Content is placed inside the parent rectangle at the base. */
    InsideBase = 2,

    /** Content is placed inside the parent rectangle at the end. */
    InsideEnd = 4,

    /** Content is placed outside the parent rectangle at the base. */
    OutsideBase = 8,

    /** Content is placed outside the parent rectangle at the end. */
    OutsideEnd = 16,

    /** Content overflows from the inside of the parent rectangle in the center. */
    OverflowInsideCenter = 32,

    /** Content overflows from the inside of the parent rectangle at the base. */
    OverflowInsideBase = 64,

    /** Content overflows from the inside of the parent rectangle at the end. */
    OverflowInsideEnd = 128,

    /** Content supports all possible positions. */
    All =
    InsideCenter |
    InsideBase |
    InsideEnd |
    OutsideBase |
    OutsideEnd |
    OverflowInsideCenter |
    OverflowInsideBase |
    OverflowInsideEnd,

    /** Content supports positions inside the rectangle */
    InsideAll =
    InsideCenter |
    InsideBase |
    InsideEnd,

    /** Content supports overflow positions */
    OverflowAll =
    OverflowInsideCenter |
    OverflowInsideBase |
    OverflowInsideEnd,
}

/**
 * Defines possible data label positions relative to points or circles
 */
export const enum NewPointLabelPosition {
    /** Position is not defined. */
    None = 0,

    Above = 1 << 0,

    Below = 1 << 1,

    Left = 1 << 2,

    Right = 1 << 3,

    BelowRight = 1 << 4,

    BelowLeft = 1 << 5,

    AboveRight = 1 << 6,

    AboveLeft = 1 << 7,

    Center = 1 << 8,

    All =
    Above |
    Below |
    Left |
    Right |
    BelowRight |
    BelowLeft |
    AboveRight |
    AboveLeft |
    Center,
}

/**
 * Rectangle orientation, defined by vertical vs horizontal and which direction
 * the "base" is at.
 */
export const enum NewRectOrientation {
    /** Rectangle with no specific orientation. */
    None,

    /** Vertical rectangle with base at the bottom. */
    VerticalBottomBased,

    /** Vertical rectangle with base at the top. */
    VerticalTopBased,

    /** Horizontal rectangle with base at the left. */
    HorizontalLeftBased,

    /** Horizontal rectangle with base at the right. */
    HorizontalRightBased,
}

export const enum LabelDataPointParentType {
    /* parent shape of data label is a point*/
    Point,

    /* parent shape of data label is a rectangle*/
    Rectangle,

    /* parent shape of data label is a polygon*/
    Polygon
}

export interface LabelParentRect {
    /** The rectangle this data label belongs to */
    rect: IRect;

    /** The orientation of the parent rectangle */
    orientation: NewRectOrientation;

    /** Valid positions to place the label ordered by preference */
    validPositions: RectLabelPosition[];
}

export interface LabelParentPoint {
    /** The point this data label belongs to */
    point: shapesInterfaces.IPoint;

    /** The radius of the point to be added to the offset (for circular geometry) */
    radius: number;

    /** Valid positions to place the label ordered by preference */
    validPositions: NewPointLabelPosition[];
}

export interface LabelDataPoint {
    // Layout members; used by the layout system to position labels

    /** The measured size of the text */
    textSize: shapesInterfaces.ISize;

    /** Is data label preferred? Preferred labels will be rendered first */
    isPreferred: boolean;

    /** Whether the parent type is a rectangle, point or polygon */
    parentType: LabelDataPointParentType;

    /** The parent geometry for the data label */
    parentShape: LabelParentRect | LabelParentPoint | LabelParentPolygon;

    /** Whether or not the label has a background */
    hasBackground?: boolean;

    // Rendering members that are simply passed through to the label for rendering purposes

    /** Text to be displayed in the label */
    text: string;

    /** A text that represent the label tooltip */
    tooltip?: string;

    /** Color to use for the data label if drawn inside */
    insideFill: string;

    /** Color to use for the data label if drawn outside */
    outsideFill: string;

    /** The identity of the data point associated with the data label */
    identity: powerbi.visuals.ISelectionId;

    /** The key of the data point associated with the data label (used if identity is not unique to each expected label) */
    key?: string;

    /** The font properties of the data point associated with the data label */
    fontProperties: FontProperties;

    /** Second row of text to be displayed in the label, for additional information */
    secondRowText?: string;

    /** The calculated weight of the data point associated with the data label */
    weight?: number;

    backgroundColor?: string;

    backgroundTransparency?: number;
}

export interface LabelDataPointOld {
    // Layout members; used by the layout system to position labels

    /** The measured size of the text */
    textSize: shapesInterfaces.ISize;

    /** Is data label preferred? Preferred labels will be rendered first */
    isPreferred: boolean;

    /** Whether the parent type is a rectangle, point or polygon */
    parentType: LabelDataPointParentType;

    /** The parent geometry for the data label */
    parentShape: LabelParentRect | LabelParentPoint | LabelParentPolygon;

    /** Whether or not the label has a background */
    hasBackground?: boolean;

    // Rendering members that are simply passed through to the label for rendering purposes

    /** Text to be displayed in the label */
    text: string;

    /** A text that represent the label tooltip */
    tooltip?: string;

    /** Color to use for the data label if drawn inside */
    insideFill: string;

    /** Color to use for the data label if drawn outside */
    outsideFill: string;

    /** The identity of the data point associated with the data label */
    identity: powerbi.visuals.ISelectionId;

    /** The key of the data point associated with the data label (used if identity is not unique to each expected label) */
    key?: string;

    /** The font size of the data point associated with the data label */
    fontSize?: number;

    /** The font family of the data point associated with the data label */
    fontFamily?: number;

    /** Second row of text to be displayed in the label, for additional information */
    secondRowText?: string;

    /** The calculated weight of the data point associated with the data label */
    weight?: number;

    backgroundColor?: string;

    backgroundTransparency?: number;
}

export interface LabelDataPointLayoutInfo {
    labelDataPoint: LabelDataPoint;

    /** Whether or not the data label has been rendered */
    hasBeenRendered?: boolean;

    /** Size of the label adjusted for the background, if necessary */
    labelSize?: shapesInterfaces.ISize;
}

export interface LabelDataPointGroup<TLabelDataPoint> {
    labelDataPoints: TLabelDataPoint;
    maxNumberOfLabels: number;
    labelOrientation?: LabelOrientation;
}

export interface Label extends ISelectableDataPoint {
    /** Text to be displayed in the label */
    text: string;

    /** Second row of text to be displayed in the label */
    secondRowText?: string;

    /** The bounding box for the label */
    boundingBox: IRect;

    /** Whether or not the data label should be rendered */
    isVisible: boolean;

    /** A unique key for data points (used if key cannot be obtained from the identity) */
    key?: string;

    /** The font properties of the data label */
    fontProperties: FontProperties;

    /** A text anchor used to override the default label text-anchor (middle) */
    textAnchor?: string;

    /** points for reference line rendering */
    leaderLinePoints?: number[][];

    /** Whether or not the label has a background (and text position needs to be adjusted to take that into account) */
    hasBackground: boolean;

    /** A text that represent the label tooltip */
    tooltip?: string;

    /** The orientation for label, vertical or horizontal */
    labelOrientation?: LabelOrientation;

    backgroundColor?: string;

    backgroundTransparency?: number;
}

export interface LabelOld extends ISelectableDataPoint{
    /** Text to be displayed in the label */
    text: string;

    /** Second row of text to be displayed in the label */
    secondRowText?: string;

    /** The bounding box for the label */
    boundingBox: IRect;

    /** Whether or not the data label should be rendered */
    isVisible: boolean;

    /** The fill color of the data label */
    fill: string;

    /** A unique key for data points (used if key cannot be obtained from the identity) */
    key?: string;

    /** The text size of the data label */
    fontSize?: number;

    /** The font family of the data label */
    fontFamily?: string;

    /** A text anchor used to override the default label text-anchor (middle) */
    textAnchor?: string;

    /** The font weight of the data label */
    fontWeight?: string;

    /** The font style of the data label */
    fontStyle?: string;

    /** The text decoration of the data label */
    textDecoration?: string;

    /** points for reference line rendering */
    leaderLinePoints?: number[][];

    /** Whether or not the label has a background (and text position needs to be adjusted to take that into account) */
    hasBackground: boolean;

    /** A text that represent the label tooltip */
    tooltip?: string;

    /** The orientation for label, vertical or horizontal */
    labelOrientation?: LabelOrientation;

    backgroundColor?: string;

    backgroundTransparency?: number;
}

export interface GridSubsection {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

export class LabelArrangeGrid {
    private grid: IRect[][][];
    private viewport: powerbi.IViewport;
    private cellSize: shapesInterfaces.ISize;
    private columnCount: number;
    private rowCount: number;

    /**
     * A multiplier applied to the largest width height to attempt to balance # of
     * labels in each cell and number of cells each label belongs to
     */
    private static cellSizeMultiplier = 2;

    constructor(
        labelDataPointGroups: LabelDataPointGroup<LabelDataPointLayoutInfo[]>[],
        viewport: powerbi.IViewport
    ) {
        this.viewport = viewport;
        let maxLabelWidth = 0;
        let maxLabelHeight = 0;
        for (const labelDataPointsGroup of labelDataPointGroups) {
            for (const labelDataPoint of labelDataPointsGroup.labelDataPoints) {
                const dataLabelSize: shapesInterfaces.ISize = labelDataPoint.labelSize;
                if (dataLabelSize.width > maxLabelWidth) {
                    maxLabelWidth = dataLabelSize.width;
                }
                if (dataLabelSize.height > maxLabelHeight) {
                    maxLabelHeight = dataLabelSize.height;
                }
            }
        }

        if (maxLabelWidth === 0) {
            maxLabelWidth = viewport.width;
        }
        if (maxLabelHeight === 0) {
            maxLabelHeight = viewport.height;
        }
        const cellSize = this.cellSize = { width: maxLabelWidth * LabelArrangeGrid.cellSizeMultiplier, height: maxLabelHeight * LabelArrangeGrid.cellSizeMultiplier };
        this.columnCount = LabelArrangeGrid.getCellCount(cellSize.width, viewport.width, 1, 100);
        this.rowCount = LabelArrangeGrid.getCellCount(cellSize.height, viewport.height, 1, 100);
        const grid: IRect[][][] = [];
        for (let i = 0, ilen = this.columnCount; i < ilen; i++) {
            grid[i] = [];
            for (let j = 0, jlen = this.rowCount; j < jlen; j++) {
                grid[i][j] = [];
            }
        }
        this.grid = grid;
    }

    /**
     * Add a rectangle to check collision against
     */
    public add(rect: IRect): void {
        const containingIndexRect = this.getContainingGridSubsection(rect);

        for (let x = containingIndexRect.xMin; x < containingIndexRect.xMax; x++) {
            for (let y = containingIndexRect.yMin; y < containingIndexRect.yMax; y++) {
                this.grid[x][y].push(rect);
            }
        }
    }

    /**
     * Check whether the rect conflicts with the grid, either bleeding outside the
     * viewport or colliding with another rect added to the grid.
     */
    public hasConflict(rect: IRect): boolean {
        if (!this.isWithinGridViewport(rect)) {
            return true;
        }

        return this.hasCollision(rect);
    }

    /**
     * Attempt to position the given rect within the viewport.  Returns
     * the adjusted rectangle or null if the rectangle couldn't fit,
     * conflicts with the viewport, or is too far outside the viewport
     */
    public tryPositionInViewport(rect: IRect): IRect {
        // If it's too far outside the viewport, return null
        if (!this.isCloseToGridViewport(rect)) {
            return;
        }

        if (!this.isWithinGridViewport(rect)) {
            rect = this.tryMoveInsideViewport(rect);
        }

        if (rect && !this.hasCollision(rect)) {
            return rect;
        }
    }

    /**
     * Checks for a collision between the given rect and others in the grid.
     * Returns true if there is a collision.
     */
    private hasCollision(rect: IRect): boolean {
        const containingIndexRect = this.getContainingGridSubsection(rect);
        const grid = this.grid;
        const isIntersecting = shapes.isIntersecting;
        for (let x = containingIndexRect.xMin; x < containingIndexRect.xMax; x++) {
            for (let y = containingIndexRect.yMin; y < containingIndexRect.yMax; y++) {
                for (const currentGridRect of grid[x][y]) {
                    if (isIntersecting(currentGridRect, rect)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Check to see if the given rect is inside the grid's viewport
     */
    private isWithinGridViewport(rect: IRect): boolean {
        return rect.left >= 0 &&
            rect.top >= 0 &&
            rect.left + rect.width <= this.viewport.width &&
            rect.top + rect.height <= this.viewport.height;
    }

    /**
     * Checks to see if the rect is close enough to the viewport to be moved inside.
     * "Close" here is determined by the distance between the edge of the viewport
     * and the closest edge of the rect; if that distance is less than the appropriate
     * dimension of the rect, we will reposition the rect.
     */
    private isCloseToGridViewport(rect: IRect): boolean {
        return rect.left + rect.width >= 0 - rect.width &&
            rect.top + rect.height >= -rect.height &&
            rect.left <= this.viewport.width + rect.width &&
            rect.top <= this.viewport.height + rect.height;
    }

    /**
     * Attempt to move the rect inside the grid's viewport.  Returns the resulting
     * rectangle with the same width/height adjusted to be inside the viewport or
     * null if it couldn't fit regardless.
     */
    private tryMoveInsideViewport(rect: IRect): IRect {
        const result: IRect = shapes.clone(rect);
        const viewport = this.viewport;

        // Return null if it's too big to fit regardless of positioning
        if (rect.width > viewport.width || rect.height > viewport.height) {
            return;
        }

        // Only one movement should be made in each direction, because we are only moving it inside enough for it to fit; there should be no overshooting.
        // Outside to the left
        if (rect.left < 0) {
            result.left = 0;
        }
        // Outside to the right
        else if (rect.left + rect.width > viewport.width) {
            result.left -= (rect.left + rect.width) - viewport.width;
        }
        // Outside above
        if (rect.top < 0) {
            result.top = 0;
        }
        // Outside below
        else if (rect.top + rect.height > viewport.height) {
            result.top -= (rect.top + rect.height) - viewport.height;
        }

        return result;
    }

    private getContainingGridSubsection(rect: IRect): GridSubsection {
        return {
            xMin: LabelArrangeGrid.bound(Math.floor(rect.left / this.cellSize.width), 0, this.columnCount),
            xMax: LabelArrangeGrid.bound(Math.ceil((rect.left + rect.width) / this.cellSize.width), 0, this.columnCount),
            yMin: LabelArrangeGrid.bound(Math.floor(rect.top / this.cellSize.height), 0, this.rowCount),
            yMax: LabelArrangeGrid.bound(Math.ceil((rect.top + rect.height) / this.cellSize.height), 0, this.rowCount),
        };
    }

    private static getCellCount(step: number, length: number, minCount: number, maxCount: number): number {
        return LabelArrangeGrid.bound(Math.ceil(length / step), minCount, maxCount);
    }

    private static bound(value: number, min: number, max: number): number {
        return Math.max(Math.min(value, max), min);
    }
}

export interface DataLabelLayoutOptions {
    /** The amount of offset to start with when the data label is not centered */
    startingOffset: number;
    /** Maximum distance labels will be offset by */
    maximumOffset: number;
    /** The amount to increase the offset each attempt while laying out labels */
    offsetIterationDelta?: number;
    /** Horizontal padding used for checking whether a label is inside a parent shape */
    horizontalPadding?: number;
    /** Vertical padding used for checking whether a label is inside a parent shape */
    verticalPadding?: number;
    /** Should we draw reference lines in case the label offset is greater then the default */
    allowLeaderLines?: boolean;
    /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
    attemptToMoveLabelsIntoViewport?: boolean;
}

export class LabelLayout {
    /** Maximum distance labels will be offset by */
    private maximumOffset: number;
    /** The amount to increase the offset each attempt while laying out labels */
    private offsetIterationDelta: number;
    /** The amount of offset to start with when the data label is not centered */
    private startingOffset: number;
    /** Padding used for checking whether a label is inside a parent shape */
    private horizontalPadding: number;
    /** Padding used for checking whether a label is inside a parent shape */
    private verticalPadding: number;
    /** Should we draw leader lines in case the label offset is greater then the default */
    private allowLeaderLines: boolean;
    /** Should the layout system attempt to move the label inside the viewport when it outside, but close */
    private attemptToMoveLabelsIntoViewport: boolean;

    // Default values
    private static defaultOffsetIterationDelta = 2;
    private static defaultHorizontalPadding = 2;
    private static defaultVerticalPadding = 2;

    constructor(options: DataLabelLayoutOptions) {
        this.startingOffset = options.startingOffset;
        this.maximumOffset = options.maximumOffset;
        if (options.offsetIterationDelta != null) {
            this.offsetIterationDelta = options.offsetIterationDelta;
        }
        else {
            this.offsetIterationDelta = LabelLayout.defaultOffsetIterationDelta;
        }
        if (options.horizontalPadding != null) {
            this.horizontalPadding = options.horizontalPadding;
        }
        else {
            this.horizontalPadding = LabelLayout.defaultHorizontalPadding;
        }
        if (options.verticalPadding != null) {
            this.verticalPadding = options.verticalPadding;
        }
        else {
            this.verticalPadding = LabelLayout.defaultVerticalPadding;
        }
        this.allowLeaderLines = !!options.allowLeaderLines;
        this.attemptToMoveLabelsIntoViewport = !!options.attemptToMoveLabelsIntoViewport;
    }
    /**
     * Arrange takes a set of data labels and lays them out in order, assuming that
     * the given array has already been sorted with the most preferred labels at the
     * front, taking into considiration a maximum number of labels that are alowed
     * to display.
     *
     * Details:
     * - We iterate over offsets from the target position, increasing from 0 while
     *      verifiying the maximum number of labels to display hasn't been reached
     * - For each offset, we iterate over each data label
     * - For each data label, we iterate over each position that is valid for
     *     both the specific label and this layout
     * - When a valid position is found, we position the label there and no longer
     *     reposition it.
     * - This prioritizes the earlier labels to be positioned closer to their
     *     target points in the position they prefer.
     * - This prioritizes putting data labels close to a valid position over
     *     placing them at their preferred position (it will place it at a less
     *     preferred position if it will be a smaller offset)
     */
    public layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[], viewport: powerbi.IViewport): Label[];
    public layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[], viewport: powerbi.IViewport): LabelOld[];
    public layout(arg0: LabelDataPointGroup<LabelDataPoint[]>[] | LabelDataPointGroup<LabelDataPointOld[]>[], viewport: powerbi.IViewport): Label[] | LabelOld[] {
        let labelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[];

        if (this.isOldLabelDataPointGroups(arg0)) {
            labelDataPointsGroups = this.upgradeToNewLabelDataPointsGroups(arg0);
        } else {
            labelDataPointsGroups = arg0;
        }

        // Clear data labels for a new layout
        const labelDataPointsGroupsLayoutInfo: LabelDataPointGroup<LabelDataPointLayoutInfo[]>[] = [];
        for (const labelDataPointsGroup of labelDataPointsGroups) {
            const labelDataPointsLayoutInfo: LabelDataPointLayoutInfo[] = labelDataPointsGroup.labelDataPoints.map((labelDataPoint) => ({ labelDataPoint: labelDataPoint }));
            const labelGroupOrientation = labelDataPointsGroup.labelOrientation;
            for (const labelDataPointLayoutInfo of labelDataPointsLayoutInfo) {
                const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
                labelDataPointLayoutInfo.hasBeenRendered = false;
                let textWidth = labelDataPoint.textSize.width;
                let textHeight = labelDataPoint.textSize.height;
                if (labelGroupOrientation === LabelOrientation.Vertical) {
                    textWidth = labelDataPoint.textSize.height;
                    textHeight = labelDataPoint.textSize.width;
                }
                if (labelDataPoint.hasBackground) {
                    labelDataPointLayoutInfo.labelSize = {
                        width: textWidth + 2 * LabelUtils.horizontalLabelBackgroundPadding,
                        height: textHeight + 2 * LabelUtils.verticalLabelBackgroundPadding,
                    };
                }
                else {
                    labelDataPointLayoutInfo.labelSize = {
                        width: textWidth,
                        height: textHeight,
                    };
                }
            }
            labelDataPointsGroupsLayoutInfo.push({
                labelDataPoints: labelDataPointsLayoutInfo,
                maxNumberOfLabels: labelDataPointsGroup.maxNumberOfLabels,
                labelOrientation: labelDataPointsGroup.labelOrientation,
            });
        }

        let resultingDataLabels: Label[] = [];
        const grid = new LabelArrangeGrid(labelDataPointsGroupsLayoutInfo, viewport);

        const hasMultipleDataSeries = labelDataPointsGroupsLayoutInfo.length > 1;

        // Iterates on every series
        for (const labelDataPointsGroupLayoutInfo of labelDataPointsGroupsLayoutInfo) {
            let maxLabelsToRender = labelDataPointsGroupLayoutInfo.maxNumberOfLabels;
            // NOTE: we create a copy and modify the copy to keep track of preferred vs. non-preferred labels.
            const labelDataPointsLayoutInfo = [...labelDataPointsGroupLayoutInfo.labelDataPoints];
            const preferredLabels: LabelDataPointLayoutInfo[] = [];
            const labelGroupOrientation = labelDataPointsGroupLayoutInfo.labelOrientation;
            // Exclude preferred labels
            for (let j = labelDataPointsLayoutInfo.length - 1, localMax = maxLabelsToRender; j >= 0 && localMax > 0; j--) {
                const labelDataPoint = labelDataPointsLayoutInfo[j].labelDataPoint;
                if (labelDataPoint.isPreferred) {
                    preferredLabels.unshift(labelDataPointsLayoutInfo.splice(j, 1)[0]);
                    localMax--;
                }
            }

            // First iterate all the preferred labels
            if (preferredLabels.length > 0) {
                const positionedLabels = this.positionDataLabels(preferredLabels, viewport, grid, maxLabelsToRender, labelGroupOrientation, hasMultipleDataSeries);
                maxLabelsToRender -= positionedLabels.length;
                resultingDataLabels = resultingDataLabels.concat(positionedLabels);
            }

            // While there are invisible not preferred labels and label distance is less than the max
            // allowed distance
            if (labelDataPointsLayoutInfo.length > 0) {
                const labels = this.positionDataLabels(labelDataPointsLayoutInfo, viewport, grid, maxLabelsToRender, labelGroupOrientation, hasMultipleDataSeries);
                resultingDataLabels = resultingDataLabels.concat(labels);
            }
            // TODO: Add reference lines if we want them
        }

        const filtedResultingDataLabels = resultingDataLabels.filter((d: Label) => d.isVisible);

        return this.isOldLabelDataPointGroups(arg0) ? LabelUtils.downgradeToOldLabels(filtedResultingDataLabels) : filtedResultingDataLabels;
    }

    private positionDataLabels(
        labelDataPointsLayoutInfo: LabelDataPointLayoutInfo[],
        viewport: powerbi.IViewport,
        grid: LabelArrangeGrid,
        maxLabelsToRender: number,
        labelOrientation: LabelOrientation,
        hasMultipleDataSeries: boolean
    ): Label[] {
        const resultingDataLabels: Label[] = [];
        const offsetDelta = this.offsetIterationDelta;
        let currentOffset = this.startingOffset;
        let currentCenteredOffset = 0;
        let drawLeaderLinesOnIteration: boolean;
        let labelsRendered: number = 0;

        while (currentOffset <= this.maximumOffset && labelsRendered < maxLabelsToRender) {
            drawLeaderLinesOnIteration = this.allowLeaderLines && currentOffset > this.startingOffset;
            for (const labelDataPointLayoutInfo of labelDataPointsLayoutInfo) {
                const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
                if (labelDataPointLayoutInfo.hasBeenRendered) {
                    continue;
                }
                let dataLabel;
                if (labelDataPoint.parentType === LabelDataPointParentType.Rectangle) {
                    dataLabel = this.tryPositionForRectPositions(labelDataPointLayoutInfo, grid, currentOffset, currentCenteredOffset, labelOrientation, hasMultipleDataSeries);
                }
                else {
                    dataLabel = this.tryPositionForPointPositions(labelDataPointLayoutInfo, grid, currentOffset, drawLeaderLinesOnIteration, labelOrientation);
                }

                if (dataLabel) {
                    resultingDataLabels.push(dataLabel);
                    labelsRendered++;
                }
                if (!(labelsRendered < maxLabelsToRender)) {
                    break;
                }
            }
            currentOffset += offsetDelta;
            currentCenteredOffset += offsetDelta;
        }

        return resultingDataLabels;
    }

    private tryPositionForRectPositions(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, grid: LabelArrangeGrid, currentLabelOffset: number, currentCenteredLabelOffset: number, labelOrientation: LabelOrientation, hasMultipleDataSeries: boolean): Label {
        // Function declared and reused to reduce code duplication
        const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
        const tryPosition = (position: RectLabelPosition, adjustForViewport: boolean) => {
            const isInsidePosition = !!(position & RectLabelPosition.InsideAll);
            const isOverflowPosition = !!(position & RectLabelPosition.OverflowAll);
            const canFitWithinParent = DataLabelRectPositioner.canFitWithinParent(labelDataPointLayoutInfo, this.horizontalPadding, this.verticalPadding);
            if ((isInsidePosition || isOverflowPosition) && !canFitWithinParent) {
                // Inside and Overflow positioning require that at least one of width or height will fit
                return;
            }

            const resultingBoundingBox = LabelLayout.tryPositionRect(grid, position, labelDataPointLayoutInfo, currentLabelOffset, currentCenteredLabelOffset, adjustForViewport);
            if (resultingBoundingBox) {
                if (isInsidePosition && !DataLabelRectPositioner.isLabelWithinParent(resultingBoundingBox, labelDataPoint, this.horizontalPadding, this.verticalPadding)) {
                    return;
                }
                if (isOverflowPosition && !DataLabelRectPositioner.isValidLabelOverflowing(resultingBoundingBox, labelDataPoint, hasMultipleDataSeries)) {
                    return;
                }
                grid.add(resultingBoundingBox);
                labelDataPointLayoutInfo.hasBeenRendered = true;
                return <Label>{
                    boundingBox: resultingBoundingBox,
                    text: labelDataPoint.text,
                    tooltip: labelDataPoint.tooltip,
                    isVisible: true,
                    identity: labelDataPoint.identity,
                    key: labelDataPoint.key,
                    fontProperties: inherit(labelDataPoint.fontProperties, { color: isInsidePosition ? labelDataPoint.insideFill : labelDataPoint.outsideFill }),
                    selected: false,
                    hasBackground: !!labelDataPoint.hasBackground,
                    labelOrientation: labelOrientation,
                    backgroundColor: labelDataPoint.backgroundColor,
                    backgroundTransparency: labelDataPoint.backgroundTransparency,
                };
            }
        };

        // Iterate over all positions that are valid for the data point
        for (const position of (<LabelParentRect>labelDataPoint.parentShape).validPositions) {
            const label = tryPosition(position, false /* adjustForViewport */);
            if (label)
                return label;
        }
        // If no position has been found and the option is enabled, try any outside positions while moving the label inside the viewport
        if (this.attemptToMoveLabelsIntoViewport) {
            for (const position of (<LabelParentRect>labelDataPoint.parentShape).validPositions) {
                const label = tryPosition(position, true /* adjustForViewport */);
                if (label)
                    return label;
            }
        }

        return null;
    }

    /**
     * Tests a particular position/offset combination for the given data label.
     * If the label can be placed, returns the resulting bounding box for the data
     * label.  If not, returns null.
     */
    private static tryPositionRect(grid: LabelArrangeGrid, position: RectLabelPosition, labelDataPointLayoutInfo: LabelDataPointLayoutInfo, offset: number, centerOffset: number, adjustForViewport: boolean): IRect {
        let offsetForPosition = offset;

        const isCenterPosition = [
            RectLabelPosition.InsideCenter,
            RectLabelPosition.OverflowInsideCenter
        ].some((rectPosition) => rectPosition === position);

        if (isCenterPosition) {
            offsetForPosition = centerOffset;
        }
        let labelRect = DataLabelRectPositioner.getLabelRect(labelDataPointLayoutInfo, position, offsetForPosition);
        const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
        if (!isCenterPosition || (<LabelParentRect>labelDataPoint.parentShape).orientation === NewRectOrientation.None) {
            if (!grid.hasConflict(labelRect)) {
                return labelRect;
            }
            if (adjustForViewport) {
                return grid.tryPositionInViewport(labelRect);
            }
        }
        else {
            // If the position is centered, attempt to offset in both a positive and negative direction
            if (!grid.hasConflict(labelRect)) {
                return labelRect;
            }
            labelRect = DataLabelRectPositioner.getLabelRect(labelDataPointLayoutInfo, position, -offsetForPosition);
            if (!grid.hasConflict(labelRect)) {
                return labelRect;
            }
        }

        return null;
    }

    private tryPositionForPointPositions(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, grid: LabelArrangeGrid, currentLabelOffset: number, drawLeaderLines: boolean, labelOrientation: LabelOrientation): Label {
        // Function declared and reused to reduce code duplication
        const labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
        const tryPosition = (position: NewPointLabelPosition, parentShape: LabelParentPoint, adjustForViewport: boolean) => {
            const resultingBoundingBox = LabelLayout.tryPositionPoint(grid, position, labelDataPointLayoutInfo, currentLabelOffset, adjustForViewport);
            if (resultingBoundingBox) {
                grid.add(resultingBoundingBox);
                labelDataPointLayoutInfo.hasBeenRendered = true;
                return <Label>{
                    boundingBox: resultingBoundingBox,
                    text: labelDataPoint.text,
                    tooltip: labelDataPoint.tooltip,
                    isVisible: true,
                    isInsideParent: position === NewPointLabelPosition.Center,
                    identity: labelDataPoint.identity,
                    key: labelDataPoint.key,
                    fontProperties: inherit(
                        labelDataPoint.fontProperties,
                        { color: position === NewPointLabelPosition.Center ? labelDataPoint.insideFill : labelDataPoint.outsideFill }
                    ),
                    selected: false,
                    leaderLinePoints: drawLeaderLines ? DataLabelPointPositioner.getLabelLeaderLineEndingPoint(resultingBoundingBox, position, parentShape) : null,
                    hasBackground: !!labelDataPoint.hasBackground,
                    labelOrientation: labelOrientation,
                    backgroundColor: labelDataPoint.backgroundColor,
                    backgroundTransparency: labelDataPoint.backgroundTransparency,
                };
            }
        };

        // Iterate over all positions that are valid for the data point
        const parentShape = (<LabelParentPoint>labelDataPoint.parentShape);
        const validPositions = parentShape.validPositions;
        for (const position of validPositions) {
            const label = tryPosition(position, parentShape, false /* adjustForViewport */);
            if (label)
                return label;
        }
        // Attempt to position at the most preferred position by simply moving it inside the viewport
        if (this.attemptToMoveLabelsIntoViewport && validPositions && validPositions.length) {
            const label = tryPosition(validPositions[0], parentShape, true /* adjustForViewport */);
            if (label)
                return label;
        }
        return null;
    }

    private static tryPositionPoint(grid: LabelArrangeGrid, position: NewPointLabelPosition, labelDataPointLayoutInfo: LabelDataPointLayoutInfo, offset: number, adjustForViewport: boolean): IRect {
        const labelRect = DataLabelPointPositioner.getLabelRect(labelDataPointLayoutInfo.labelSize, <LabelParentPoint>labelDataPointLayoutInfo.labelDataPoint.parentShape, position, offset);

        if (!grid.hasConflict(labelRect)) {
            return labelRect;
        }
        if (adjustForViewport) {
            return grid.tryPositionInViewport(labelRect);
        }

        return null;
    }

    private isOldLabelDataPoint(labelDataPoint: LabelDataPoint | LabelDataPointOld): labelDataPoint is LabelDataPointOld {
        const newLabelDataPoint = <LabelDataPoint>labelDataPoint;
        return !newLabelDataPoint.fontProperties;
    }

    private isOldLabelDataPointGroups(labelDataPointGroups: LabelDataPointGroup<LabelDataPoint[]>[] | LabelDataPointGroup<LabelDataPointOld[]>[]): labelDataPointGroups is LabelDataPointGroup<LabelDataPointOld[]>[] {
        const newLabelDataPointGroups = <LabelDataPointGroup<LabelDataPoint[]>[]>labelDataPointGroups;
        if (newLabelDataPointGroups.length !== 0) {
            const labelDataPointGroup = newLabelDataPointGroups.filter((labelDataPointGroup) => {
                return labelDataPointGroup.labelDataPoints && labelDataPointGroup.labelDataPoints.length;
            })[0];

            if (labelDataPointGroup) {
                const labelDataPoint = labelDataPointGroup.labelDataPoints[0];
                return this.isOldLabelDataPoint(labelDataPoint);
            }
        }
        return false;
    }

    public upgradeToNewLabelDataPointsGroups(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[]): LabelDataPointGroup<LabelDataPoint[]>[] {
        const newLabelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[] = [];
        for (const labelDataPointsGroup of labelDataPointsGroups) {
            const newLabelDataPointsGroup = {
                labelOrientation: labelDataPointsGroup.labelOrientation,
                maxNumberOfLabels: labelDataPointsGroup.maxNumberOfLabels,
                labelDataPoints: []
            };
            labelDataPointsGroup.labelDataPoints.map((labelDataPoint) => {
                newLabelDataPointsGroup.labelDataPoints.push({
                    textSize: labelDataPoint.textSize,
                    isPreferred: labelDataPoint.isPreferred,
                    parentType: labelDataPoint.parentType,
                    parentShape: labelDataPoint.parentShape,
                    hasBackground: labelDataPoint.hasBackground,
                    text: labelDataPoint.text,
                    tooltip: labelDataPoint.tooltip,
                    insideFill: labelDataPoint.insideFill,
                    outsideFill: labelDataPoint.outsideFill,
                    identity: labelDataPoint.identity,
                    key: labelDataPoint.key,
                    fontProperties: {
                        size: labelDataPoint.fontSize
                            ? Units.FontSize.createFromPt(labelDataPoint.fontSize)
                            : undefined
                    },
                    secondRowText: labelDataPoint.secondRowText,
                    weight: labelDataPoint.weight,
                    backgroundColor: labelDataPoint.backgroundColor,
                    backgroundTransparency: labelDataPoint.backgroundTransparency,
                });
            });
            newLabelDataPointsGroups.push(newLabelDataPointsGroup);
        }
        return newLabelDataPointsGroups;
    }
}

