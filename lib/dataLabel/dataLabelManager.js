// powerbi.extensibility.utils.svg
import { shapes } from "powerbi-visuals-utils-svgutils";
var Rect = shapes.Rect;
// powerbi.extensibility.utils.formatting
import { double as Double } from "powerbi-visuals-utils-typeutils";
import { RectOrientation, ContentPositions, OutsidePlacement } from "./dataLabelInterfaces";
import * as locationConverter from "./locationConverter";
import { DataLabelArrangeGrid } from "./dataLabelArrangeGrid";
/**
* Arranges label elements using the anchor point or rectangle. Collisions
* between elements can be automatically detected and as a result elements
* can be repositioned or get hidden.
*/
export class DataLabelManager {
    constructor() {
        this.movingStep = 3;
        this.hideOverlapped = true;
        // The global settings for all labels.
        // They can be oweridden by each label we add into the panel, because contains same properties.
        this.defaultDataLabelSettings = {
            anchorMargin: DataLabelManager.DefaultAnchorMargin,
            anchorRectOrientation: RectOrientation.None,
            contentPosition: ContentPositions.BottomCenter,
            outsidePlacement: OutsidePlacement.Disallowed,
            maximumMovingDistance: DataLabelManager.DefaultMaximumMovingDistance,
            minimumMovingDistance: DataLabelManager.DefaultMinimumMovingDistance,
            validContentPositions: ContentPositions.BottomCenter,
            opacity: 1
        };
    }
    get defaultSettings() {
        return this.defaultDataLabelSettings;
    }
    /** Arranges the lables position and visibility*/
    hideCollidedLabels(viewport, data, layout, addTransform = false, hideCollidedLabels = true) {
        // Split size into a grid
        let arrangeGrid = new DataLabelArrangeGrid(viewport, data, layout);
        let filteredData = [];
        let transform = { x: 0, y: 0 };
        if (addTransform) {
            transform.x = viewport.width / 2;
            transform.y = viewport.height / 2;
        }
        for (let i = 0, len = data.length; i < len; i++) {
            // Filter unwanted data points
            if (!layout.filter(data[i])) {
                continue;
            }
            // Set default values where properties values are undefined
            let info = this.getLabelInfo(data[i]);
            info.anchorPoint = {
                x: layout.labelLayout.x(data[i]) + transform.x,
                y: layout.labelLayout.y(data[i]) + transform.y,
            };
            let position = this.calculateContentPosition(info, info.contentPosition, data[i].size, info.anchorMargin);
            if (DataLabelManager.isValid(position) && (!this.hasCollisions(arrangeGrid, info, position, viewport) || !hideCollidedLabels)) {
                data[i].labelX = position.left - transform.x;
                data[i].labelY = position.top - transform.y;
                // Keep track of all panel elements positions.
                arrangeGrid.add(info, position);
                // Save all data points to display
                filteredData.push(data[i]);
            }
        }
        return filteredData;
    }
    /**
     * Merges the label element info with the panel element info and returns correct label info.
     * @param source The label info.
     */
    getLabelInfo(source) {
        let settings = this.defaultDataLabelSettings;
        source.anchorMargin = source.anchorMargin !== undefined
            ? source.anchorMargin
            : settings.anchorMargin;
        source.anchorRectOrientation = source.anchorRectOrientation !== undefined
            ? source.anchorRectOrientation
            : settings.anchorRectOrientation;
        source.contentPosition = source.contentPosition !== undefined
            ? source.contentPosition
            : settings.contentPosition;
        source.maximumMovingDistance = source.maximumMovingDistance !== undefined
            ? source.maximumMovingDistance
            : settings.maximumMovingDistance;
        source.minimumMovingDistance = source.minimumMovingDistance !== undefined
            ? source.minimumMovingDistance
            : settings.minimumMovingDistance;
        source.outsidePlacement = source.outsidePlacement !== undefined
            ? source.outsidePlacement
            : settings.outsidePlacement;
        source.validContentPositions = source.validContentPositions !== undefined
            ? source.validContentPositions
            : settings.validContentPositions;
        source.opacity = source.opacity !== undefined
            ? source.opacity
            : settings.opacity;
        source.maximumMovingDistance += source.anchorMargin;
        return source;
    }
    /**
    * (Private) Calculates element position using anchor point..
    */
    calculateContentPositionFromPoint(anchorPoint, contentPosition, contentSize, offset) {
        let position = { x: 0, y: 0 };
        if (anchorPoint) {
            if (anchorPoint.x !== undefined && isFinite(anchorPoint.x)) {
                position.x = anchorPoint.x;
                switch (contentPosition) {
                    // D3 positions the label in the middle by default.
                    // The algorithem asumed the label was positioned in right so this is why we add/substract half width
                    case ContentPositions.TopLeft:
                    case ContentPositions.MiddleLeft:
                    case ContentPositions.BottomLeft:
                        position.x -= contentSize.width / 2.0;
                        break;
                    case ContentPositions.TopRight:
                    case ContentPositions.MiddleRight:
                    case ContentPositions.BottomRight:
                        position.x += contentSize.width / 2.0;
                        break;
                }
            }
            if (anchorPoint.y !== undefined && isFinite(anchorPoint.y)) {
                position.y = anchorPoint.y;
                switch (contentPosition) {
                    case ContentPositions.MiddleLeft:
                    case ContentPositions.MiddleCenter:
                    case ContentPositions.MiddleRight:
                        position.y -= contentSize.height / 2.0;
                        break;
                    case ContentPositions.TopRight:
                    case ContentPositions.TopLeft:
                    case ContentPositions.TopCenter:
                        position.y -= contentSize.height;
                        break;
                }
            }
            if (offset !== undefined && isFinite(offset)) {
                switch (contentPosition) {
                    case ContentPositions.TopLeft:
                        position.x -= offset;
                        position.y -= offset;
                        break;
                    case ContentPositions.MiddleLeft:
                        position.x -= offset;
                        break;
                    case ContentPositions.BottomLeft:
                        position.x -= offset;
                        position.y += offset;
                        break;
                    case ContentPositions.TopCenter:
                        position.y -= offset;
                        break;
                    case ContentPositions.MiddleCenter:
                        // Offset is not applied
                        break;
                    case ContentPositions.BottomCenter:
                        position.y += offset;
                        break;
                    case ContentPositions.TopRight:
                        position.x += offset;
                        position.y -= offset;
                        break;
                    case ContentPositions.MiddleRight:
                        position.x += offset;
                        break;
                    case ContentPositions.BottomRight:
                        position.x += offset;
                        position.y += offset;
                        break;
                }
            }
        }
        return {
            left: position.x,
            top: position.y,
            width: contentSize.width,
            height: contentSize.height
        };
    }
    /** (Private) Calculates element position using anchor rect. */
    calculateContentPositionFromRect(anchorRect, anchorRectOrientation, contentPosition, contentSize, offset) {
        switch (contentPosition) {
            case ContentPositions.InsideCenter:
                return this.handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset);
            case ContentPositions.InsideEnd:
                return this.handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
            case ContentPositions.InsideBase:
                return this.handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
            case ContentPositions.OutsideEnd:
                return this.handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset);
            case ContentPositions.OutsideBase:
                return this.handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset);
        }
        return { left: 0, top: 0, width: -1, height: -1 };
    }
    /** (Private) Calculates element inside center position using anchor rect. */
    handleInsideCenterPosition(anchorRectOrientation, contentSize, anchorRect, offset) {
        switch (anchorRectOrientation) {
            case RectOrientation.VerticalBottomTop:
            case RectOrientation.VerticalTopBottom:
                return locationConverter.middleVertical(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalLeftRight:
            case RectOrientation.HorizontalRightLeft:
            default:
                return locationConverter.middleHorizontal(contentSize, anchorRect, offset);
        }
    }
    /** (Private) Calculates element inside end position using anchor rect. */
    handleInsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset) {
        switch (anchorRectOrientation) {
            case RectOrientation.VerticalBottomTop:
                return locationConverter.topInside(contentSize, anchorRect, offset);
            case RectOrientation.VerticalTopBottom:
                return locationConverter.bottomInside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalRightLeft:
                return locationConverter.leftInside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalLeftRight:
            default:
                return locationConverter.rightInside(contentSize, anchorRect, offset);
        }
    }
    /** (Private) Calculates element inside base position using anchor rect. */
    handleInsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset) {
        switch (anchorRectOrientation) {
            case RectOrientation.VerticalBottomTop:
                return locationConverter.bottomInside(contentSize, anchorRect, offset);
            case RectOrientation.VerticalTopBottom:
                return locationConverter.topInside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalRightLeft:
                return locationConverter.rightInside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalLeftRight:
            default:
                return locationConverter.leftInside(contentSize, anchorRect, offset);
        }
    }
    /** (Private) Calculates element outside end position using anchor rect. */
    handleOutsideEndPosition(anchorRectOrientation, contentSize, anchorRect, offset) {
        switch (anchorRectOrientation) {
            case RectOrientation.VerticalBottomTop:
                return locationConverter.topOutside(contentSize, anchorRect, offset);
            case RectOrientation.VerticalTopBottom:
                return locationConverter.bottomOutside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalRightLeft:
                return locationConverter.leftOutside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalLeftRight:
            default:
                return locationConverter.rightOutside(contentSize, anchorRect, offset);
        }
    }
    /** (Private) Calculates element outside base position using anchor rect. */
    handleOutsideBasePosition(anchorRectOrientation, contentSize, anchorRect, offset) {
        switch (anchorRectOrientation) {
            case RectOrientation.VerticalBottomTop:
                return locationConverter.bottomOutside(contentSize, anchorRect, offset);
            case RectOrientation.VerticalTopBottom:
                return locationConverter.topOutside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalRightLeft:
                return locationConverter.rightOutside(contentSize, anchorRect, offset);
            case RectOrientation.HorizontalLeftRight:
            default:
                return locationConverter.leftOutside(contentSize, anchorRect, offset);
        }
    }
    /**  (Private) Calculates element position. */
    calculateContentPosition(anchoredElementInfo, contentPosition, contentSize, offset) {
        if (contentPosition !== ContentPositions.InsideEnd &&
            contentPosition !== ContentPositions.InsideCenter &&
            contentPosition !== ContentPositions.InsideBase &&
            contentPosition !== ContentPositions.OutsideBase &&
            contentPosition !== ContentPositions.OutsideEnd) {
            // Determine position using anchor point.
            return this.calculateContentPositionFromPoint(anchoredElementInfo.anchorPoint, contentPosition, contentSize, offset);
        }
        // Determine position using anchor rectangle.
        return this.calculateContentPositionFromRect(anchoredElementInfo.anchorRect, anchoredElementInfo.anchorRectOrientation, contentPosition, contentSize, offset);
    }
    /** (Private) Check for collisions. */
    hasCollisions(arrangeGrid, info, position, size) {
        if (arrangeGrid.hasConflict(position)) {
            return true;
        }
        // Since we divide the height by 2 we add it back to the top of the view port so labels won't be cut off
        let intersection = { left: 0, top: position.height / 2, width: size.width, height: size.height };
        intersection = Rect.inflate(intersection, { left: DataLabelManager.InflateAmount, top: 0, right: DataLabelManager.InflateAmount, bottom: 0 });
        intersection = Rect.intersect(intersection, position);
        if (Rect.isEmpty(intersection)) {
            // Empty rectangle means there is a collision
            return true;
        }
        switch (info.outsidePlacement) {
            // D3 positions the label in the middle by default.
            // The algorithem asumed the label was positioned in right so this is why we devide by 2 or 4
            case OutsidePlacement.Disallowed:
                return Double.lessWithPrecision(intersection.width, position.width) ||
                    Double.lessWithPrecision(intersection.height, position.height / 2);
            case OutsidePlacement.Partial:
                return Double.lessWithPrecision(intersection.width, position.width / 2) ||
                    Double.lessWithPrecision(intersection.height, position.height / 4);
        }
        return false;
    }
    static isValid(rect) {
        return !Rect.isEmpty(rect) && (rect.width > 0 && rect.height > 0);
    }
}
DataLabelManager.DefaultAnchorMargin = 0; // For future use
DataLabelManager.DefaultMaximumMovingDistance = 12;
DataLabelManager.DefaultMinimumMovingDistance = 3;
DataLabelManager.InflateAmount = 5;
//# sourceMappingURL=dataLabelManager.js.map