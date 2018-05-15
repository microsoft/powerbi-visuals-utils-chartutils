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
export var LegendIcon;
(function (LegendIcon) {
    LegendIcon[LegendIcon["Box"] = 0] = "Box";
    LegendIcon[LegendIcon["Circle"] = 1] = "Circle";
    LegendIcon[LegendIcon["Line"] = 2] = "Line";
})(LegendIcon || (LegendIcon = {}));
export var LegendPosition;
(function (LegendPosition) {
    LegendPosition[LegendPosition["Top"] = 0] = "Top";
    LegendPosition[LegendPosition["Bottom"] = 1] = "Bottom";
    LegendPosition[LegendPosition["Right"] = 2] = "Right";
    LegendPosition[LegendPosition["Left"] = 3] = "Left";
    LegendPosition[LegendPosition["None"] = 4] = "None";
    LegendPosition[LegendPosition["TopCenter"] = 5] = "TopCenter";
    LegendPosition[LegendPosition["BottomCenter"] = 6] = "BottomCenter";
    LegendPosition[LegendPosition["RightCenter"] = 7] = "RightCenter";
    LegendPosition[LegendPosition["LeftCenter"] = 8] = "LeftCenter";
})(LegendPosition || (LegendPosition = {}));
export const legendProps = {
    show: "show",
    position: "position",
    titleText: "titleText",
    showTitle: "showTitle",
    labelColor: "labelColor",
    fontSize: "fontSize",
};
//# sourceMappingURL=legendInterfaces.js.map