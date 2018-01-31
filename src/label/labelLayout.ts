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

/* tslint:disable:max-file-line-count */
/* Do not copy this TSLint exclusion onto additional files. */
namespace powerbi.extensibility.utils.chart.label  {

    import IPoint = powerbi.extensibility.utils.svg.shapes.IPoint;
    import IRect = powerbi.extensibility.utils.svg.IRect;
    import ISize = powerbi.extensibility.utils.svg.shapes.ISize;
    import Rect = powerbi.extensibility.utils.svg.shapes.Rect;
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import Double = powerbi.extensibility.utils.type.Double;
    import shapes = powerbi.extensibility.utils.svg.shapes;
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

    import ISelectionId = powerbi.visuals.ISelectionId;

    export enum LabelOrientation {
        Vertical = 0,
        Horizontal = 1,
    }

    export interface LabelParentPolygon {
        /** The point this data label belongs to */
        polygon: powerbi.extensibility.utils.svg.shapes.IPolygon;
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
        point: IPoint;

        /** The radius of the point to be added to the offset (for circular geometry) */
        radius: number;

        /** Valid positions to place the label ordered by preference */
        validPositions: NewPointLabelPosition[];
    }

    export interface LabelDataPoint {
        // Layout members; used by the layout system to position labels

        /** The measured size of the text */
        textSize: ISize;

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
        identity: ISelectionId;

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
        textSize: ISize;

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
        identity: ISelectionId;

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
        labelSize?: ISize;
    }

    export interface LabelDataPointGroup<TLabelDataPoint> {
        labelDataPoints: TLabelDataPoint;
        maxNumberOfLabels: number;
        labelOrientation?: LabelOrientation;
    }

    export interface Label extends SelectableDataPoint {
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

    export interface LabelOld extends SelectableDataPoint {
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
        private viewport: IViewport;
        private cellSize: ISize;
        private columnCount: number;
        private rowCount: number;

        /**
         * A multiplier applied to the largest width height to attempt to balance # of
         * labels in each cell and number of cells each label belongs to
         */
        private static cellSizeMultiplier = 2;

        constructor(labelDataPointGroups: LabelDataPointGroup<LabelDataPointLayoutInfo[]>[], viewport: IViewport) {
            this.viewport = viewport;
            let maxLabelWidth = 0;
            let maxLabelHeight = 0;
            for (let labelDataPointsGroup of labelDataPointGroups) {
                for (let labelDataPoint of labelDataPointsGroup.labelDataPoints) {
                    let dataLabelSize: ISize = labelDataPoint.labelSize;
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
            let cellSize = this.cellSize = { width: maxLabelWidth * LabelArrangeGrid.cellSizeMultiplier, height: maxLabelHeight * LabelArrangeGrid.cellSizeMultiplier };
            this.columnCount = LabelArrangeGrid.getCellCount(cellSize.width, viewport.width, 1, 100);
            this.rowCount = LabelArrangeGrid.getCellCount(cellSize.height, viewport.height, 1, 100);
            let grid: IRect[][][] = [];
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
            let containingIndexRect = this.getContainingGridSubsection(rect);

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
            let containingIndexRect = this.getContainingGridSubsection(rect);
            let grid = this.grid;
            let isIntersecting = shapes.Rect.isIntersecting;
            for (let x = containingIndexRect.xMin; x < containingIndexRect.xMax; x++) {
                for (let y = containingIndexRect.yMin; y < containingIndexRect.yMax; y++) {
                    for (let currentGridRect of grid[x][y]) {
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
            let result: IRect = Rect.clone(rect);
            let viewport = this.viewport;

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
        public layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[], viewport: IViewport): Label[];
        public layout(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[], viewport: IViewport): LabelOld[];
        public layout(arg0: LabelDataPointGroup<LabelDataPoint[]>[] | LabelDataPointGroup<LabelDataPointOld[]>[], viewport: IViewport): Label[] | LabelOld[] {
            let labelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[];

            if (this.isOldLabelDataPointGroups(arg0)) {
                labelDataPointsGroups = this.upgradeToNewLabelDataPointsGroups(arg0);
            } else {
                labelDataPointsGroups = arg0;
            }

            // Clear data labels for a new layout
            let labelDataPointsGroupsLayoutInfo: LabelDataPointGroup<LabelDataPointLayoutInfo[]>[] = [];
            for (let labelDataPointsGroup of labelDataPointsGroups) {
                let labelDataPointsLayoutInfo: LabelDataPointLayoutInfo[] = _.map(labelDataPointsGroup.labelDataPoints, (labelDataPoint) => ({ labelDataPoint: labelDataPoint }));
                let labelGroupOrientation = labelDataPointsGroup.labelOrientation;
                for (let labelDataPointLayoutInfo of labelDataPointsLayoutInfo) {
                    let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
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
            let grid = new LabelArrangeGrid(labelDataPointsGroupsLayoutInfo, viewport);

            const hasMultipleDataSeries = labelDataPointsGroupsLayoutInfo.length > 1;

            // Iterates on every series
            for (let labelDataPointsGroupLayoutInfo of labelDataPointsGroupsLayoutInfo) {
                let maxLabelsToRender = labelDataPointsGroupLayoutInfo.maxNumberOfLabels;
                // NOTE: we create a copy and modify the copy to keep track of preferred vs. non-preferred labels.
                let labelDataPointsLayoutInfo = _.clone(labelDataPointsGroupLayoutInfo.labelDataPoints);
                let preferredLabels: LabelDataPointLayoutInfo[] = [];
                let labelGroupOrientation = labelDataPointsGroupLayoutInfo.labelOrientation;
                // Exclude preferred labels
                for (let j = labelDataPointsLayoutInfo.length - 1, localMax = maxLabelsToRender; j >= 0 && localMax > 0; j--) {
                    let labelDataPoint = labelDataPointsLayoutInfo[j].labelDataPoint;
                    if (labelDataPoint.isPreferred) {
                        preferredLabels.unshift(labelDataPointsLayoutInfo.splice(j, 1)[0]);
                        localMax--;
                    }
                }

                // First iterate all the preferred labels
                if (preferredLabels.length > 0) {
                    let positionedLabels = this.positionDataLabels(preferredLabels, viewport, grid, maxLabelsToRender, labelGroupOrientation, hasMultipleDataSeries);
                    maxLabelsToRender -= positionedLabels.length;
                    resultingDataLabels = resultingDataLabels.concat(positionedLabels);
                }

                // While there are invisible not preferred labels and label distance is less than the max
                // allowed distance
                if (labelDataPointsLayoutInfo.length > 0) {
                    let labels = this.positionDataLabels(labelDataPointsLayoutInfo, viewport, grid, maxLabelsToRender, labelGroupOrientation, hasMultipleDataSeries);
                    resultingDataLabels = resultingDataLabels.concat(labels);
                }
                // TODO: Add reference lines if we want them
            }

            let filtedResultingDataLabels = _.filter(resultingDataLabels, (d: Label) => d.isVisible);

            return this.isOldLabelDataPointGroups(arg0) ? LabelUtils.downgradeToOldLabels(filtedResultingDataLabels) : filtedResultingDataLabels;
        }

        private positionDataLabels(labelDataPointsLayoutInfo: LabelDataPointLayoutInfo[], viewport: IViewport, grid: LabelArrangeGrid, maxLabelsToRender: number, labelOrientation: LabelOrientation, hasMultipleDataSeries: boolean): Label[] {
            let resultingDataLabels: Label[] = [];
            let offsetDelta = this.offsetIterationDelta;
            let currentOffset = this.startingOffset;
            let currentCenteredOffset = 0;
            let drawLeaderLinesOnIteration: boolean;
            let labelsRendered: number = 0;

            while (currentOffset <= this.maximumOffset && labelsRendered < maxLabelsToRender) {
                drawLeaderLinesOnIteration = this.allowLeaderLines && currentOffset > this.startingOffset;
                for (let labelDataPointLayoutInfo of labelDataPointsLayoutInfo) {
                    let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
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
            let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
            let tryPosition = (position: RectLabelPosition, adjustForViewport: boolean) => {
                const isInsidePosition = !!(position & RectLabelPosition.InsideAll);
                const isOverflowPosition = !!(position & RectLabelPosition.OverflowAll);
                const canFitWithinParent = DataLabelRectPositioner.canFitWithinParent(labelDataPointLayoutInfo, this.horizontalPadding, this.verticalPadding);
                if ((isInsidePosition || isOverflowPosition) && !canFitWithinParent) {
                    // Inside and Overflow positioning require that at least one of width or height will fit
                    return;
                }

                let resultingBoundingBox = LabelLayout.tryPositionRect(grid, position, labelDataPointLayoutInfo, currentLabelOffset, currentCenteredLabelOffset, adjustForViewport);
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
                        fontProperties: FontProperties.inherit(labelDataPoint.fontProperties, { color: isInsidePosition ? labelDataPoint.insideFill : labelDataPoint.outsideFill }),
                        selected: false,
                        hasBackground: !!labelDataPoint.hasBackground,
                        labelOrientation: labelOrientation,
                        backgroundColor: labelDataPoint.backgroundColor,
                        backgroundTransparency: labelDataPoint.backgroundTransparency,
                    };
                }
            };

            // Iterate over all positions that are valid for the data point
            for (let position of (<LabelParentRect>labelDataPoint.parentShape).validPositions) {
                let label = tryPosition(position, false /* adjustForViewport */);
                if (label)
                    return label;
            }
            // If no position has been found and the option is enabled, try any outside positions while moving the label inside the viewport
            if (this.attemptToMoveLabelsIntoViewport) {
                for (let position of (<LabelParentRect>labelDataPoint.parentShape).validPositions) {
                    let label = tryPosition(position, true /* adjustForViewport */);
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
            const isCenterPosition = _.includes([RectLabelPosition.InsideCenter, RectLabelPosition.OverflowInsideCenter], position);
            if (isCenterPosition) {
                offsetForPosition = centerOffset;
            }
            let labelRect = DataLabelRectPositioner.getLabelRect(labelDataPointLayoutInfo, position, offsetForPosition);
            let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
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
            let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
            let tryPosition = (position: NewPointLabelPosition, parentShape: LabelParentPoint, adjustForViewport: boolean) => {
                let resultingBoundingBox = LabelLayout.tryPositionPoint(grid, position, labelDataPointLayoutInfo, currentLabelOffset, adjustForViewport);
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
                        fontProperties: FontProperties.inherit(labelDataPoint.fontProperties,
                            // If we ever support "inside" for point-based labels, this needs to be updated
                            { color: position === NewPointLabelPosition.Center ? labelDataPoint.insideFill : labelDataPoint.outsideFill }),
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
            let parentShape = (<LabelParentPoint>labelDataPoint.parentShape);
            let validPositions = parentShape.validPositions;
            for (let position of validPositions) {
                let label = tryPosition(position, parentShape, false /* adjustForViewport */);
                if (label)
                    return label;
            }
            // Attempt to position at the most preferred position by simply moving it inside the viewport
            if (this.attemptToMoveLabelsIntoViewport && !_.isEmpty(validPositions)) {
                let label = tryPosition(validPositions[0], parentShape, true /* adjustForViewport */);
                if (label)
                    return label;
            }
            return null;
        }

        private static tryPositionPoint(grid: LabelArrangeGrid, position: NewPointLabelPosition, labelDataPointLayoutInfo: LabelDataPointLayoutInfo, offset: number, adjustForViewport: boolean): IRect {
            let labelRect = DataLabelPointPositioner.getLabelRect(labelDataPointLayoutInfo.labelSize, <LabelParentPoint>labelDataPointLayoutInfo.labelDataPoint.parentShape, position, offset);

            if (!grid.hasConflict(labelRect)) {
                return labelRect;
            }
            if (adjustForViewport) {
                return grid.tryPositionInViewport(labelRect);
            }

            return null;
        }

        private isOldLabelDataPoint(labelDataPoint: LabelDataPoint | LabelDataPointOld): labelDataPoint is LabelDataPointOld {
            let newLabelDataPoint = <LabelDataPoint>labelDataPoint;
            return !newLabelDataPoint.fontProperties;
        }

        private isOldLabelDataPointGroups(labelDataPointGroups: LabelDataPointGroup<LabelDataPoint[]>[] | LabelDataPointGroup<LabelDataPointOld[]>[]): labelDataPointGroups is LabelDataPointGroup<LabelDataPointOld[]>[] {
            let newLabelDataPointGroups = <LabelDataPointGroup<LabelDataPoint[]>[]>labelDataPointGroups;
            if (newLabelDataPointGroups.length !== 0) {
                let labelDataPointGroup = _.find(newLabelDataPointGroups, (labelDataPointGroup) => !_.isEmpty(labelDataPointGroup.labelDataPoints));
                if (labelDataPointGroup) {
                    let labelDataPoint = labelDataPointGroup.labelDataPoints[0];
                    return this.isOldLabelDataPoint(labelDataPoint);
                }
            }
            return false;
        }

        public upgradeToNewLabelDataPointsGroups(labelDataPointsGroups: LabelDataPointGroup<LabelDataPointOld[]>[]): LabelDataPointGroup<LabelDataPoint[]>[] {
            let newLabelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[] = [];
            for (let labelDataPointsGroup of labelDataPointsGroups) {
                let newLabelDataPointsGroup: LabelDataPointGroup<LabelDataPoint[]>;
                newLabelDataPointsGroup = {
                    labelOrientation: labelDataPointsGroup.labelOrientation,
                    maxNumberOfLabels: labelDataPointsGroup.maxNumberOfLabels,
                    labelDataPoints: []
                };
                _.map(labelDataPointsGroup.labelDataPoints, (labelDataPoint) => {
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
                        fontProperties: FontProperties.inherit(LabelUtils.defaultFontProperties, { size: labelDataPoint.fontSize ? Units.FontSize.createFromPt(labelDataPoint.fontSize) : undefined }),
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

    /**
     * (Private) Contains methods for calculating the bounding box of a data label
     */
    export module DataLabelRectPositioner {

        export namespace LabelOverflowingConsts {
            export const equalityPrecision = 0.09; // one decimal point
            export const minIntersectionRatio = 0.2;
            export const parentToLabelOverflowRatioThreshold = 1 / 50;
        }

        export function getLabelRect(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, position: RectLabelPosition, offset: number): IRect {
            let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
            let parentRect: LabelParentRect = <LabelParentRect>labelDataPoint.parentShape;
            if (parentRect != null) {
                // Each combination of position and orientation results in a different actual positioning, which is then called.
                switch (position) {
                    case RectLabelPosition.InsideCenter:
                    case RectLabelPosition.OverflowInsideCenter:
                        switch (parentRect.orientation) {
                            case NewRectOrientation.VerticalBottomBased:
                            case NewRectOrientation.VerticalTopBased:
                                return DataLabelRectPositioner.middleVertical(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalLeftBased:
                            case NewRectOrientation.HorizontalRightBased:
                                return DataLabelRectPositioner.middleHorizontal(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.None:
                            // TODO: which of the above cases should we default to for rects with no orientation?
                        }
                    case RectLabelPosition.InsideBase:
                    case RectLabelPosition.OverflowInsideBase:
                        switch (parentRect.orientation) {
                            case NewRectOrientation.VerticalBottomBased:
                                return DataLabelRectPositioner.bottomInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.VerticalTopBased:
                                return DataLabelRectPositioner.topInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalLeftBased:
                                return DataLabelRectPositioner.leftInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalRightBased:
                                return DataLabelRectPositioner.rightInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.None:
                            // TODO: which of the above cases should we default to for rects with no orientation?
                        }
                    case RectLabelPosition.InsideEnd:
                    case RectLabelPosition.OverflowInsideEnd:
                        switch (parentRect.orientation) {
                            case NewRectOrientation.VerticalBottomBased:
                                return DataLabelRectPositioner.topInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.VerticalTopBased:
                                return DataLabelRectPositioner.bottomInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalLeftBased:
                                return DataLabelRectPositioner.rightInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalRightBased:
                                return DataLabelRectPositioner.leftInside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.None:
                            // TODO: which of the above cases should we default to for rects with no orientation?
                        }
                    case RectLabelPosition.OutsideBase:
                        switch (parentRect.orientation) {
                            case NewRectOrientation.VerticalBottomBased:
                                return DataLabelRectPositioner.bottomOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.VerticalTopBased:
                                return DataLabelRectPositioner.topOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalLeftBased:
                                return DataLabelRectPositioner.leftOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalRightBased:
                                return DataLabelRectPositioner.rightOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.None:
                            // TODO: which of the above cases should we default to for rects with no orientation?
                        }
                    case RectLabelPosition.OutsideEnd:
                        switch (parentRect.orientation) {
                            case NewRectOrientation.VerticalBottomBased:
                                return DataLabelRectPositioner.topOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.VerticalTopBased:
                                return DataLabelRectPositioner.bottomOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalLeftBased:
                                return DataLabelRectPositioner.rightOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.HorizontalRightBased:
                                return DataLabelRectPositioner.leftOutside(labelDataPointLayoutInfo.labelSize, parentRect.rect, offset);
                            case NewRectOrientation.None:
                            // TODO: which of the above cases should we default to for rects with no orientation?
                        }
                }
            }
            else {
                // TODO: Data labels for non-rectangular visuals (line chart)
            }
            return null;
        }

        export function canFitWithinParent(labelDataPointLayoutInfo: LabelDataPointLayoutInfo, horizontalPadding: number, verticalPadding: number): boolean {
            let labelDataPoint = labelDataPointLayoutInfo.labelDataPoint;
            return (labelDataPointLayoutInfo.labelSize.width + 2 * horizontalPadding < (<LabelParentRect>labelDataPoint.parentShape).rect.width) ||
                (labelDataPointLayoutInfo.labelSize.height + 2 * verticalPadding < (<LabelParentRect>labelDataPoint.parentShape).rect.height);
        }

        export function isLabelWithinParent(labelRect: IRect, labelPoint: LabelDataPoint, horizontalPadding: number, verticalPadding: number): boolean {
            let parentRect = (<LabelParentRect>labelPoint.parentShape).rect;
            let labelRectWithPadding = shapes.Rect.inflate(labelRect, { left: horizontalPadding, right: horizontalPadding, top: verticalPadding, bottom: verticalPadding });
            return shapes.Rect.containsPoint(parentRect, {
                x: labelRectWithPadding.left,
                y: labelRectWithPadding.top,
            }) && shapes.Rect.containsPoint(parentRect, {
                x: labelRectWithPadding.left + labelRectWithPadding.width,
                y: labelRectWithPadding.top + labelRectWithPadding.height,
            });
        }

        export function isValidLabelOverflowing(labelRect: IRect, labelPoint: LabelDataPoint, hasMultipleDataSeries: boolean): boolean {
            const parentRect = (<LabelParentRect>labelPoint.parentShape).rect;

            if (!shapes.Rect.isIntersecting(labelRect, parentRect)) {
                return false; // label isn't overflowing from within parent
            }

            const intersection = shapes.Rect.intersect(labelRect, parentRect);
            const precision = LabelOverflowingConsts.equalityPrecision;
            const isLabelContainedVertically =
                Double.equalWithPrecision(intersection.top, labelRect.top, precision) &&
                Double.equalWithPrecision(intersection.height, labelRect.height, precision);
            const isLabelContainedHorizontally =
                Double.equalWithPrecision(intersection.left, labelRect.left, precision) &&
                Double.equalWithPrecision(intersection.width, labelRect.width, precision);

            const isParentOrientVertically =
                _.includes([NewRectOrientation.VerticalBottomBased, NewRectOrientation.VerticalTopBased],
                    (<LabelParentRect>labelPoint.parentShape).orientation);

            if (!isLabelContainedHorizontally && !isLabelContainedVertically ||
                (hasMultipleDataSeries &&
                    (isParentOrientVertically && !isLabelContainedVertically ||
                        !isParentOrientVertically && !isLabelContainedHorizontally)
                )) {
                // Our overflowing definition require that at least one label's rectangle dimension (width / height) to be contained in parent rectangle.
                // Furthermore, if we have multiple data series the contained dimention should be respective with the parent's orientation.
                // To avoid data labels collisions from one series to another which appears inside the same bar.
                return false;
            } else if (isLabelContainedHorizontally && isLabelContainedVertically) {
                return true; // null-overflowing, label is fully contained.
            }

            // Our overflowing definition require that the label and parent "will touch each other enough", this is defined by the ratio of their intersection
            // (touching) against each of them, we look at the maximal intersection ratio which means that at least one of them is 'touched' enought by the other.
            const labelAndParentIntersectEnough = maximalIntersectionRatio(labelRect, parentRect) >= LabelOverflowingConsts.minIntersectionRatio;

            // Our overflowing definition require that the overflowing dimensions will not be too big in comparison to the same dimension of parent.
            // this is done to avoid situationion where the parent is barely visible or that label text is very long.
            let labelOverflowIsValid = false;
            const parentToLabelOverflowRatioThreshold = LabelOverflowingConsts.parentToLabelOverflowRatioThreshold;
            if (isLabelContainedVertically) {
                labelOverflowIsValid = parentRect.width === 0 || (parentRect.width / labelRect.width) > parentToLabelOverflowRatioThreshold;
            } else if (isLabelContainedHorizontally) {
                labelOverflowIsValid = parentRect.height === 0 || (parentRect.height / labelRect.height) > parentToLabelOverflowRatioThreshold;
            }

            return labelAndParentIntersectEnough && labelOverflowIsValid;
        }

        export function maximalIntersectionRatio(labelRect: IRect, parentRect: IRect): number {
            const parentRectArea = parentRect.width * parentRect.height;
            const labelPointArea = labelRect.width * labelRect.height;

            const maxArea = Math.max(parentRectArea, labelPointArea);
            if (maxArea === 0 ) {
                return 0;
            }

            const minArea = Math.min(parentRectArea, labelPointArea);
            const minimalAreaNotZero = (minArea !== 0) ? minArea : maxArea;

            const intersectionRect = shapes.Rect.intersect(parentRect, labelRect);
            const intersectionRectArea = intersectionRect.width * intersectionRect.height;

            // Dividing by the minimal area yields the maximal intersection ratio
            return intersectionRectArea / minimalAreaNotZero;
        }

        export function topInside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
                top: parentRect.top + offset,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function bottomInside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
                top: (parentRect.top + parentRect.height) - offset - labelSize.height,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function rightInside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: (parentRect.left + parentRect.width) - labelSize.width - offset,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function leftInside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + offset,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function topOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
                top: parentRect.top - labelSize.height - offset,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function bottomOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
                top: (parentRect.top + parentRect.height) + offset,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function rightOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: (parentRect.left + parentRect.width) + offset,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function leftOutside(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left - labelSize.width - offset,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function middleHorizontal(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0 + offset,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function middleVertical(labelSize: ISize, parentRect: IRect, offset: number): IRect {
            return {
                left: parentRect.left + parentRect.width / 2.0 - labelSize.width / 2.0,
                top: parentRect.top + parentRect.height / 2.0 - labelSize.height / 2.0 + offset,
                width: labelSize.width,
                height: labelSize.height
            };
        }
    }

    export module DataLabelPointPositioner {
        export const cos45 = Math.cos(45);
        export const sin45 = Math.sin(45);

        export function getLabelRect(labelSize: ISize, parentPoint: LabelParentPoint, position: NewPointLabelPosition, offset: number): IRect {
            switch (position) {
                case NewPointLabelPosition.Above: {
                    return DataLabelPointPositioner.above(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.Below: {
                    return DataLabelPointPositioner.below(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.Left: {
                    return DataLabelPointPositioner.left(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.Right: {
                    return DataLabelPointPositioner.right(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.BelowLeft: {
                    return DataLabelPointPositioner.belowLeft(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.BelowRight: {
                    return DataLabelPointPositioner.belowRight(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.AboveLeft: {
                    return DataLabelPointPositioner.aboveLeft(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.AboveRight: {
                    return DataLabelPointPositioner.aboveRight(labelSize, parentPoint.point, parentPoint.radius + offset);
                }
                case NewPointLabelPosition.Center: {
                    return DataLabelPointPositioner.center(labelSize, parentPoint.point);
                }
            }
            return null;
        }

        export function above(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x - (labelSize.width / 2),
                top: parentPoint.y - offset - labelSize.height,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function below(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x - (labelSize.width / 2),
                top: parentPoint.y + offset,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function left(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x - offset - labelSize.width,
                top: parentPoint.y - (labelSize.height / 2),
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function right(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x + offset,
                top: parentPoint.y - (labelSize.height / 2),
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function belowLeft(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x - (sin45 * offset) - labelSize.width,
                top: parentPoint.y + (cos45 * offset),
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function belowRight(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x + (sin45 * offset),
                top: parentPoint.y + (cos45 * offset),
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function aboveLeft(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x - (sin45 * offset) - labelSize.width,
                top: parentPoint.y - (cos45 * offset) - labelSize.height,
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function aboveRight(labelSize: ISize, parentPoint: IPoint, offset: number): IRect {
            return {
                left: parentPoint.x + (sin45 * offset),
                top: parentPoint.y - (cos45 * offset) - labelSize.height,
                width: labelSize.width,
                height: labelSize.height
            };
        }
        export function center(labelSize: ISize, parentPoint: IPoint): IRect {
            return {
                left: parentPoint.x - (labelSize.width / 2),
                top: parentPoint.y - (labelSize.height / 2),
                width: labelSize.width,
                height: labelSize.height
            };
        }

        export function getLabelLeaderLineEndingPoint(boundingBox: IRect, position: NewPointLabelPosition, parentShape: LabelParentPoint): number[][] {
            let x = boundingBox.left;
            let y = boundingBox.top;
            switch (position) {
                case NewPointLabelPosition.Above:
                    x += (boundingBox.width / 2);
                    y += boundingBox.height;
                    break;
                case NewPointLabelPosition.Below:
                    x += (boundingBox.width / 2);
                    break;
                case NewPointLabelPosition.Left:
                    x += boundingBox.width;
                    y += ((boundingBox.height * 2) / 3);
                    break;
                case NewPointLabelPosition.Right:
                    y += ((boundingBox.height * 2) / 3);
                    break;
                case NewPointLabelPosition.BelowLeft:
                    x += boundingBox.width;
                    y += (boundingBox.height / 2);
                    break;
                case NewPointLabelPosition.BelowRight:
                    y += (boundingBox.height / 2);
                    break;
                case NewPointLabelPosition.AboveLeft:
                    x += boundingBox.width;
                    y += boundingBox.height;
                    break;
                case NewPointLabelPosition.AboveRight:
                    y += boundingBox.height;
                    break;
            }

            return [[parentShape.point.x, parentShape.point.y], [x, y]];
        }
    }
}
