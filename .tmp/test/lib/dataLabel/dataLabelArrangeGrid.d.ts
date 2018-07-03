import { shapesInterfaces, IRect } from "powerbi-visuals-utils-svgutils";
import ISize = shapesInterfaces.ISize;
import { ILabelLayout, IDataLabelInfo } from "./dataLabelInterfaces";
/**
 * Utility class to speed up the conflict detection by collecting the arranged items in the DataLabelsPanel.
 */
export declare class DataLabelArrangeGrid {
    private grid;
    private cellSize;
    private rowCount;
    private colCount;
    private static ARRANGEGRID_MIN_COUNT;
    private static ARRANGEGRID_MAX_COUNT;
    /**
     * Creates new ArrangeGrid.
     * @param size The available size
     */
    constructor(size: ISize, elements: any[], layout: ILabelLayout);
    /**
     * Register a new label element.
     * @param element The label element to register.
     * @param rect The label element position rectangle.
     */
    add(element: IDataLabelInfo, rect: IRect): void;
    /**
     * Checks for conflict of given rectangle in registered elements.
     * @param rect The rectengle to check.
     * @return True if conflict is detected.
     */
    hasConflict(rect: IRect): boolean;
    /**
     * Calculates the number of rows or columns in a grid
     * @param step is the largest label size (width or height)
     * @param length is the grid size (width or height)
     * @param minCount is the minimum allowed size
     * @param maxCount is the maximum allowed size
     * @return the number of grid rows or columns
     */
    private getGridRowColCount;
    /**
     * Returns the grid index of a given recangle
     * @param rect The rectengle to check.
     * @return grid index as a thickness object.
     */
    private getGridIndexRect;
}
