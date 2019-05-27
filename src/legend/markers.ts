import {
    MarkerShape
} from "./legendInterfaces";

export const defaultSize = 5;

export const LegendIconLineTotalWidth: number = 31;

const circlePath = "M 0 0 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0";
const squarePath = "M 0 0 m -5 -5 l 10 0 l 0 10 l -10 0 z";
const longDashPath = "M -" + (LegendIconLineTotalWidth / 2) + " 0 L " + (LegendIconLineTotalWidth / 2) + " 0";

const shapeStroke = 0;
const thickStroke = 2;

export function getPath(shape: string): string {
    switch (shape) {
        case MarkerShape.circle: {
            return circlePath;
        }
        case MarkerShape.square: {
            return squarePath;
        }
        case MarkerShape.longDash: {
            return longDashPath;
        }
        default: {
            return undefined;
        }
    }
}

export function getStrokeWidth(shape: string): number {
    switch (shape) {
        case MarkerShape.longDash: {
            return thickStroke;
        }
        case MarkerShape.circle:
        case MarkerShape.square:
        default: {
            return shapeStroke;
        }
    }
}
