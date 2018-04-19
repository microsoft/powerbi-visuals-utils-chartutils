import { shapesInterfaces, IRect } from "powerbi-visuals-utils-svgutils";
import ISize = shapesInterfaces.ISize;
export declare function topInside(size: ISize, rect: IRect, offset: number): IRect;
export declare function bottomInside(size: ISize, rect: IRect, offset: number): IRect;
export declare function rightInside(size: ISize, rect: IRect, offset: number): IRect;
export declare function leftInside(size: ISize, rect: IRect, offset: number): IRect;
export declare function topOutside(size: ISize, rect: IRect, offset: number): IRect;
export declare function bottomOutside(size: ISize, rect: IRect, offset: number): IRect;
export declare function rightOutside(size: ISize, rect: IRect, offset: number): IRect;
export declare function leftOutside(size: ISize, rect: IRect, offset: number): IRect;
export declare function middleHorizontal(size: ISize, rect: IRect, offset: number): IRect;
export declare function middleVertical(size: ISize, rect: IRect, offset: number): IRect;
