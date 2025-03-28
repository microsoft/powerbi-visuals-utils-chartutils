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

// powerbi.extensibility.utils.svg.shapes
import { shapesInterfaces, IRect, shapes } from "powerbi-visuals-utils-svgutils";

import ISize = shapesInterfaces.ISize;
import IThickness = shapesInterfaces.IThickness;

// powerbi.extensibility.utils.type
import { prototype as Prototype } from "powerbi-visuals-utils-typeutils";

// powerbi.extensibility.utils.formatting
import { textMeasurementService,
        interfaces } from "powerbi-visuals-utils-formattingutils";
import TextProperties = interfaces.TextProperties;

import { IArrangeGridElementInfo, ILabelLayout, IDataLabelInfo, DataPointLabels } from "./dataLabelInterfaces";

import { LabelTextProperties } from "./dataLabelUtils";
/**
 * Utility class to speed up the conflict detection by collecting the arranged items in the DataLabelsPanel.
 */
export default class DataLabelArrangeGrid {

    private grid: Array<Array<Array<IArrangeGridElementInfo>>> = [];
    // size of a grid cell
    private cellSize: ISize;
    private rowCount: number;
    private colCount: number;

    private static ARRANGEGRID_MIN_COUNT = 1;
    private static ARRANGEGRID_MAX_COUNT = 100;

    /**
     * Creates new ArrangeGrid.
     * @param size The available size
     */
    constructor(size: ISize, elements: DataPointLabels[], layout: ILabelLayout) {
        if (size.width === 0 || size.height === 0) {
            this.initializeEmptyGrid(size);
            return;
        }

        const baseProperties = this.createBaseTextProperties();
        this.initializeCellSize();
        this.calculateMaxLabelSizes(elements, layout, baseProperties);
        this.adjustEmptyCellSizes(size);
        this.calculateGridDimensions(size);
        this.initializeGrid();
    }

    private initializeEmptyGrid(size: ISize): void {
        this.cellSize = size;
        this.rowCount = this.colCount = 0;
    }

    private createBaseTextProperties(): TextProperties {
        return {
            fontFamily: LabelTextProperties.fontFamily,
            fontSize: LabelTextProperties.fontSize,
            fontWeight: LabelTextProperties.fontWeight,
        };
    }

    private initializeCellSize(): void {
        this.cellSize = { width: 0, height: 0 };
    }

    private calculateMaxLabelSizes(elements: DataPointLabels[], layout: ILabelLayout, baseProperties: TextProperties): void {
        for (const child of elements) {
            child.labeltext = layout.labelText(child);

            const properties = Prototype.inherit(baseProperties);
            properties.text = child.labeltext;
            properties.fontSize = this.getFontSize(child);

            child.size = this.measureTextSize(properties);

            this.updateMaxCellSize(child.size);
        }
    }

    private getFontSize(child: DataPointLabels): string {
        if (child.data?.labelFontSize) {
            return child.data.labelFontSize.toString();
        }
        if (child.labelFontSize) {
            return child.labelFontSize.toString();
        }
        return LabelTextProperties.fontSize;
    }

    private measureTextSize(properties: TextProperties): ISize {
        return {
            width: textMeasurementService.measureSvgTextWidth(properties),
            height: textMeasurementService.estimateSvgTextHeight(properties)
        };
    }

    private updateMaxCellSize(size: ISize): void {
        const width = size.width * 2;
        const height = size.height * 2;

        if (width > this.cellSize.width) {
            this.cellSize.width = width;
        }
        if (height > this.cellSize.height) {
            this.cellSize.height = height;
        }
    }

    private adjustEmptyCellSizes(size: ISize): void {
        if (this.cellSize.width === 0) {
            this.cellSize.width = size.width;
        }
        if (this.cellSize.height === 0) {
            this.cellSize.height = size.height;
        }
    }

    private calculateGridDimensions(size: ISize): void {
        this.colCount = this.getGridRowColCount(
            this.cellSize.width,
            size.width,
            DataLabelArrangeGrid.ARRANGEGRID_MIN_COUNT,
            DataLabelArrangeGrid.ARRANGEGRID_MAX_COUNT
        );

        this.rowCount = this.getGridRowColCount(
            this.cellSize.height,
            size.height,
            DataLabelArrangeGrid.ARRANGEGRID_MIN_COUNT,
            DataLabelArrangeGrid.ARRANGEGRID_MAX_COUNT
        );

        this.cellSize.width = size.width / this.colCount;
        this.cellSize.height = size.height / this.rowCount;
    }

    private initializeGrid(): void {
        for (let x = 0; x < this.colCount; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.rowCount; y++) {
                this.grid[x][y] = [];
            }
        }
    }

    /**
     * Register a new label element.
     * @param element The label element to register.
     * @param rect The label element position rectangle.
     */
    public add(element: IDataLabelInfo, rect: IRect): void {
        const indexRect = this.getGridIndexRect(rect);
        const grid = this.grid;

        for (let x = indexRect.left; x < indexRect.right; x++) {
            const column = grid[x];
            for (let y = indexRect.top; y < indexRect.bottom; y++) {
                column[y].push({ element, rect });
            }
        }
    }

    /**
     * Checks for conflict of given rectangle in registered elements.
     * @param rect The rectengle to check.
     * @return True if conflict is detected.
     */
    public hasConflict(rect: IRect): boolean {
        const indexRect = this.getGridIndexRect(rect);
        const grid = this.grid;

        for (let x = indexRect.left; x < indexRect.right; x++) {
            const column = grid[x];
            for (let y = indexRect.top; y < indexRect.bottom; y++) {
                const cell = column[y];
                if (cell.some(item => shapes.isIntersecting(item.rect, rect))) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Calculates the number of rows or columns in a grid
     * @param step is the largest label size (width or height)
     * @param length is the grid size (width or height)
     * @param minCount is the minimum allowed size
     * @param maxCount is the maximum allowed size
     * @return the number of grid rows or columns
     */
    private getGridRowColCount(step: number, length: number, minCount: number, maxCount: number): number {
        return Math.min(Math.max(Math.ceil(length / step), minCount), maxCount);
    }

    /**
     * Returns the grid index of a given recangle
     * @param rect The rectengle to check.
     * @return grid index as a thickness object.
     */
    private getGridIndexRect(rect: IRect): IThickness {
        const restrict = (n, min, max) => Math.min(Math.max(n, min), max);

        return {
            left: restrict(Math.floor(rect.left / this.cellSize.width), 0, this.colCount),
            top: restrict(Math.floor(rect.top / this.cellSize.height), 0, this.rowCount),
            right: restrict(Math.ceil((rect.left + rect.width) / this.cellSize.width), 0, this.colCount),
            bottom: restrict(Math.ceil((rect.top + rect.height) / this.cellSize.height), 0, this.rowCount)
        };
    }
}
