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
/** Defines possible content positions.  */
export var ContentPositions;
(function (ContentPositions) {
    /** Content position is not defined. */
    ContentPositions[ContentPositions["None"] = 0] = "None";
    /** Content aligned top left. */
    ContentPositions[ContentPositions["TopLeft"] = 1] = "TopLeft";
    /** Content aligned top center. */
    ContentPositions[ContentPositions["TopCenter"] = 2] = "TopCenter";
    /** Content aligned top right. */
    ContentPositions[ContentPositions["TopRight"] = 4] = "TopRight";
    /** Content aligned middle left. */
    ContentPositions[ContentPositions["MiddleLeft"] = 8] = "MiddleLeft";
    /** Content aligned middle center. */
    ContentPositions[ContentPositions["MiddleCenter"] = 16] = "MiddleCenter";
    /** Content aligned middle right. */
    ContentPositions[ContentPositions["MiddleRight"] = 32] = "MiddleRight";
    /** Content aligned bottom left. */
    ContentPositions[ContentPositions["BottomLeft"] = 64] = "BottomLeft";
    /** Content aligned bottom center. */
    ContentPositions[ContentPositions["BottomCenter"] = 128] = "BottomCenter";
    /** Content aligned bottom right. */
    ContentPositions[ContentPositions["BottomRight"] = 256] = "BottomRight";
    /** Content is placed inside the bounding rectangle in the center. */
    ContentPositions[ContentPositions["InsideCenter"] = 512] = "InsideCenter";
    /** Content is placed inside the bounding rectangle at the base. */
    ContentPositions[ContentPositions["InsideBase"] = 1024] = "InsideBase";
    /** Content is placed inside the bounding rectangle at the end. */
    ContentPositions[ContentPositions["InsideEnd"] = 2048] = "InsideEnd";
    /** Content is placed outside the bounding rectangle at the base. */
    ContentPositions[ContentPositions["OutsideBase"] = 4096] = "OutsideBase";
    /** Content is placed outside the bounding rectangle at the end. */
    ContentPositions[ContentPositions["OutsideEnd"] = 8192] = "OutsideEnd";
    /** Content supports all possible positions. */
    ContentPositions[ContentPositions["All"] = 16383] = "All";
})(ContentPositions || (ContentPositions = {}));
/**
 * Rectangle orientation. Rectangle orientation is used to define vertical or horizontal orientation
 * and starting/ending side of the rectangle.
 */
export var RectOrientation;
(function (RectOrientation) {
    /** Rectangle with no specific orientation. */
    RectOrientation[RectOrientation["None"] = 0] = "None";
    /** Vertical rectangle with base at the bottom. */
    RectOrientation[RectOrientation["VerticalBottomTop"] = 1] = "VerticalBottomTop";
    /** Vertical rectangle with base at the top. */
    RectOrientation[RectOrientation["VerticalTopBottom"] = 2] = "VerticalTopBottom";
    /** Horizontal rectangle with base at the left. */
    RectOrientation[RectOrientation["HorizontalLeftRight"] = 3] = "HorizontalLeftRight";
    /** Horizontal rectangle with base at the right. */
    RectOrientation[RectOrientation["HorizontalRightLeft"] = 4] = "HorizontalRightLeft";
})(RectOrientation || (RectOrientation = {}));
/**
 * Defines if panel elements are allowed to be positioned
 * outside of the panel boundaries.
 */
export var OutsidePlacement;
(function (OutsidePlacement) {
    /** Elements can be positioned outside of the panel. */
    OutsidePlacement[OutsidePlacement["Allowed"] = 0] = "Allowed";
    /** Elements can not be positioned outside of the panel. */
    OutsidePlacement[OutsidePlacement["Disallowed"] = 1] = "Disallowed";
    /** Elements can be partially outside of the panel. */
    OutsidePlacement[OutsidePlacement["Partial"] = 2] = "Partial";
})(OutsidePlacement || (OutsidePlacement = {}));
export var labelStyle;
(function (labelStyle) {
    labelStyle.category = "Category";
    labelStyle.data = "Data";
    labelStyle.both = "Both";
})(labelStyle || (labelStyle = {}));
export var PointLabelPosition;
(function (PointLabelPosition) {
    PointLabelPosition[PointLabelPosition["Above"] = 0] = "Above";
    PointLabelPosition[PointLabelPosition["Below"] = 1] = "Below";
})(PointLabelPosition || (PointLabelPosition = {}));
//# sourceMappingURL=dataLabelInterfaces.js.map