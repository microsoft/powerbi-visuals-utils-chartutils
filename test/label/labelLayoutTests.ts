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

import union from "lodash.union";

import {
    shapesInterfaces,
    IRect
} from "powerbi-visuals-utils-svgutils";

import { assertColorsMatch } from "./../helpers/helpers";

import * as DataLabelRectPositioner from "../../src/label/dataLabelRectPositioner";
import * as DataLabelPointPositioner from "../../src/label/dataLabelPointPositioner";

import {
    Label,
    LabelOld,
    LabelDataPoint,
    LabelDataPointGroup,
    LabelDataPointOld,
    LabelDataPointLayoutInfo,
    LabelLayout,
    LabelOrientation,
    LabelParentRect,
    LabelParentPoint,
} from "../../src/label/labelLayout";

import * as LabelUtils from "../../src/label/labelUtils";

let testOutsideFillColor = "#000000";
let testInsideFillColor = "#FFFFFF";

describe("LabelLayout tests", () => {

    let labelLayout: LabelLayout;
    let viewport = { width: 500, height: 500 };

    beforeEach(() => {
        labelLayout = new LabelLayout({
            startingOffset: 5,
            maximumOffset: 20,
            horizontalPadding: 2,
            verticalPadding: 2
        });
    });

    it("Label is correctly laid out", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels.length).toBe(1);
        expect(labels[0].boundingBox).toEqual(createRect(105, 85, 40, 10));
        expect(labels[0].isVisible).toBe(true);
    });

    it("Label has correct text", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels[0].text).toBe("text");
    });

    it("Label uses outside fill color", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        assertColorsMatch(labels[0].fontProperties.color, testOutsideFillColor);
    });

    it("Label uses inside fill color", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [4], // RectLabelPosition.InsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels[0].fontProperties.color).toBe(testInsideFillColor);
    });

    it("Layout changes position of overlapping labels", () => {
        let labelDataPoints = [
            createLabelDataPoint("tex0", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16, 4], // 16 - RectLabelPosition.OutsideEnd, 4 - RectLabelPosition.InsideEnd
            }),
            createLabelDataPoint("tex1", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16, 4], // 16 - RectLabelPosition.OutsideEnd, 4 - RectLabelPosition.InsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels.length).toBe(2);
        expect(labels[0].boundingBox).toEqual(createRect(105, 85, 40, 10));
        expect(labels[0].isVisible).toBe(true);
        assertColorsMatch(labels[0].fontProperties.color, testOutsideFillColor);
        expect(labels[1].boundingBox).toEqual(createRect(105, 105, 40, 10));
        expect(labels[1].isVisible).toBe(true);
        expect(labels[1].fontProperties.color).toBe(testInsideFillColor);
    });

    it("Layout changes offset when no other valid positions change", () => {
        let labelDataPoints = [
            createLabelDataPoint("tex0", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
            createLabelDataPoint("tex0", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels.length).toBe(2);
        expect(labels[0].boundingBox).toEqual(createRect(105, 85, 40, 10));
        expect(labels[0].isVisible).toBe(true);
        expect(labels[1].boundingBox).toEqual(createRect(105, 73, 40, 10));
        expect(labels[1].isVisible).toBe(true);
    });

    it("Layout culls labels when offset gets too large", () => {
        let labelDataPoints = [
            createLabelDataPoint("tex0", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
            createLabelDataPoint("tex1", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
            createLabelDataPoint("tex2", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels.length).toBe(2);
    });
});

describe("label has correct orientation", () => {
    let labelLayout: LabelLayout;
    let viewport = { width: 500, height: 500 };
    beforeEach(() => {
        labelLayout = new LabelLayout({
            startingOffset: 5,
            maximumOffset: 20,
            horizontalPadding: 2,
            verticalPadding: 2
        });
    });

    it("Default Orientation", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        // If don't have orientation it will use default orientation, horizontal.
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length }], viewport);
        expect(labels[0].labelOrientation).toBeUndefined();
        expect(labels[0].boundingBox.height).toBe(10);
        expect(labels[0].boundingBox.width).toBe(40);
    });

    it("Vertical Orientation", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        // If orientation is vertical, switch label height and width.
        let labels = labelLayout.layout([{
            labelDataPoints,
            maxNumberOfLabels: labelDataPoints.length,
            labelOrientation: LabelOrientation.Vertical
        }], viewport);

        expect(labels[0].labelOrientation).toBe(0 /* Vertical */);
        expect(labels[0].boundingBox.height).toBe(40);
        expect(labels[0].boundingBox.width).toBe(10);
    });

    it("Horizontal Orientation", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        // If orientation is vertical, switch label height and width.
        let labels = labelLayout.layout([{ labelDataPoints: labelDataPoints, maxNumberOfLabels: labelDataPoints.length, labelOrientation: LabelOrientation.Horizontal }], viewport);
        expect(labels[0].labelOrientation).toBe(1 /* Horizontal */);
        expect(labels[0].boundingBox.height).toBe(10);
        expect(labels[0].boundingBox.width).toBe(40);
    });

});

describe("DataLabelRectPositioner tests", () => {
    let parentRect = createRect(0, 0, 100, 50);
    let offset = 5;
    let vbLabelDataPoint = createLabelDataPoint("text", true, {
        orientation: 1, // RectOrientation.VerticalBottomBased
        rect: parentRect,
        validPositions: [],
    });
    let vtLabelDataPoint = createLabelDataPoint("text", true, {
        orientation: 2, // RectOrientation.VerticalTopBased
        rect: parentRect,
        validPositions: [],
    });
    let hlLabelDataPoint = createLabelDataPoint("text", true, {
        orientation: 3, // RectOrientation.HorizontalLeftBased
        rect: parentRect,
        validPositions: [],
    });
    let hrLabelDataPoint = createLabelDataPoint("text", true, {
        orientation: 4, // RectOrientation.HorizontalRightBased
        rect: parentRect,
        validPositions: [],
    });

    let vbLabelDataPointLayOutInfo: LabelDataPointLayoutInfo = { labelDataPoint: vbLabelDataPoint, labelSize: vbLabelDataPoint.textSize };
    let vtLabelDataPointLayOutInfo: LabelDataPointLayoutInfo = { labelDataPoint: vtLabelDataPoint, labelSize: vtLabelDataPoint.textSize };
    let hlLabelDataPointLayOutInfo: LabelDataPointLayoutInfo = { labelDataPoint: hlLabelDataPoint, labelSize: hlLabelDataPoint.textSize };
    let hrLabelDataPointLayOutInfo: LabelDataPointLayoutInfo = { labelDataPoint: hrLabelDataPoint, labelSize: hrLabelDataPoint.textSize };

    let topInside = createRect(30, 5, 40, 10);
    let bottomInside = createRect(30, 35, 40, 10);
    let leftInside = createRect(5, 20, 40, 10);
    let rightInside = createRect(55, 20, 40, 10);
    let topOutside = createRect(30, -15, 40, 10);
    let bottomOutside = createRect(30, 55, 40, 10);
    let leftOutside = createRect(-45, 20, 40, 10);
    let rightOutside = createRect(105, 20, 40, 10);
    let middleHorizontal = createRect(35, 20, 40, 10);
    let middleVertical = createRect(30, 25, 40, 10);

    it("Inside / Overflow center positioning", () => {
        let positions = [1, 32]; // 1 - RectLabelPosition.InsideCenter, 32 - RectLabelPosition.OverflowInsideCenter
        for (const position of positions) {
            expect(DataLabelRectPositioner.getLabelRect(vbLabelDataPointLayOutInfo, position, offset)).toEqual(middleVertical);
            expect(DataLabelRectPositioner.getLabelRect(vtLabelDataPointLayOutInfo, position, offset)).toEqual(middleVertical);
            expect(DataLabelRectPositioner.getLabelRect(hlLabelDataPointLayOutInfo, position, offset)).toEqual(middleHorizontal);
            expect(DataLabelRectPositioner.getLabelRect(hrLabelDataPointLayOutInfo, position, offset)).toEqual(middleHorizontal);
        }
    });

    it("Inside / Overflow base positioning", () => {
        let positions = [2, 64]; // 1 - RectLabelPosition.Base, 32 - RectLabelPosition.OverflowInsideBase
        for (const position of positions) {
            expect(DataLabelRectPositioner.getLabelRect(vbLabelDataPointLayOutInfo, position, offset)).toEqual(bottomInside);
            expect(DataLabelRectPositioner.getLabelRect(vtLabelDataPointLayOutInfo, position, offset)).toEqual(topInside);
            expect(DataLabelRectPositioner.getLabelRect(hlLabelDataPointLayOutInfo, position, offset)).toEqual(leftInside);
            expect(DataLabelRectPositioner.getLabelRect(hrLabelDataPointLayOutInfo, position, offset)).toEqual(rightInside);
        }
    });

    it("Inside / Overflow end positioning", () => {
        let positions = [4, 128]; // 1 - RectLabelPosition.End, 32 - RectLabelPosition.OverflowInsideEnd
        for (const position of positions) {
            expect(DataLabelRectPositioner.getLabelRect(vbLabelDataPointLayOutInfo, position, offset)).toEqual(topInside);
            expect(DataLabelRectPositioner.getLabelRect(vtLabelDataPointLayOutInfo, position, offset)).toEqual(bottomInside);
            expect(DataLabelRectPositioner.getLabelRect(hlLabelDataPointLayOutInfo, position, offset)).toEqual(rightInside);
            expect(DataLabelRectPositioner.getLabelRect(hrLabelDataPointLayOutInfo, position, offset)).toEqual(leftInside);
        }
    });

    it("Outside end positioning", () => {
        let position = 16; // RectLabelPosition.OutsideEnd
        expect(DataLabelRectPositioner.getLabelRect(vbLabelDataPointLayOutInfo, position, offset)).toEqual(topOutside);
        expect(DataLabelRectPositioner.getLabelRect(vtLabelDataPointLayOutInfo, position, offset)).toEqual(bottomOutside);
        expect(DataLabelRectPositioner.getLabelRect(hlLabelDataPointLayOutInfo, position, offset)).toEqual(rightOutside);
        expect(DataLabelRectPositioner.getLabelRect(hrLabelDataPointLayOutInfo, position, offset)).toEqual(leftOutside);
    });

    it("Outside base positioning", () => {
        let position = 8; // RectLabelPosition.OutsideBase
        expect(DataLabelRectPositioner.getLabelRect(vbLabelDataPointLayOutInfo, position, offset)).toEqual(bottomOutside);
        expect(DataLabelRectPositioner.getLabelRect(vtLabelDataPointLayOutInfo, position, offset)).toEqual(topOutside);
        expect(DataLabelRectPositioner.getLabelRect(hlLabelDataPointLayOutInfo, position, offset)).toEqual(leftOutside);
        expect(DataLabelRectPositioner.getLabelRect(hrLabelDataPointLayOutInfo, position, offset)).toEqual(rightOutside);
    });

    describe("isValidLabelOverflowing tests", () => {
        const overflowBothSides = createRect(-10, -10, 100, 50);
        let fullyContained = [
            leftInside,
            rightInside,
        ];
        let notContained = [
            topOutside,
            leftOutside,
            overflowBothSides,
        ];

        // intercection percentage should be >= LabelOverflowingConsts.minIntersectionRatio
        let hIntercectValid = [
            createRect(-30, 0, 100, 50), // 70 %
            createRect(60, 0, 100, 50), // 40 %
        ];
        let vIntercectValid = [
            createRect(0, 40, 100, 50), // 20 %
            createRect(0, 48, 60, 10), // 20 %
        ];
        let intercectTooLittle = [
            createRect(-81, 0, 100, 50), // 19 %
            createRect(90, 0, 100, 50), // 10 %
            createRect(0, 49, 60, 10), // 10 %
        ];

        // parent / rect ratio should be > LabelOverflowingConsts.parentToLabelOverflowRatioThreshold
        const threshold = DataLabelRectPositioner.LabelOverflowingConsts.parentToLabelOverflowRatioThreshold;
        const okProduct = 1 / (2 * threshold);
        const badProduct = 1 / threshold;
        let hOverflowRatioValid = [
            createRect(40, 0, parentRect.width * okProduct, 40),
            createRect(0, 0, parentRect.width * okProduct, 40),
        ];
        let vOverflowRatioValid = [
            createRect(0, 0, 100, parentRect.height * okProduct),
        ];

        let overflowRatioTooSmall = [
            createRect(0, 0, parentRect.width * badProduct, 40),
            createRect(0, 0, 70, parentRect.height * badProduct),
        ];

        it("valid label overflowing", () => {
            let rectangles = union(fullyContained, hIntercectValid, vIntercectValid, hOverflowRatioValid, vOverflowRatioValid);
            testLabelOverflowing(/* isValid */ true, rectangles, vbLabelDataPoint, /* hasMultiplyDataSeries */ false);
        });

        it("invalid label overflowing", () => {
            let rectangles = union(notContained, intercectTooLittle, overflowRatioTooSmall);
            testLabelOverflowing(/* isValid */ false, rectangles, vbLabelDataPoint, /* hasMultiplyDataSeries */ false);
        });

        describe("HasMultiplyDataSeries", () => {
            let horizontalOverflow = union(hOverflowRatioValid, hIntercectValid); // horizontal
            let verticalOverflow = union(vOverflowRatioValid, vIntercectValid); // vertical

            it("valid - parent orientation: vertical", () => {
                let rectangles = union(fullyContained, horizontalOverflow);

                testLabelOverflowing(/* isValid */ true, rectangles, vbLabelDataPoint, /* hasMultiplyDataSeries */ true);
                testLabelOverflowing(/* isValid */ true, rectangles, vtLabelDataPoint, /* hasMultiplyDataSeries */ true);
            });

            it("valid - parent orientation: horizontal", () => {
                let rectangles = union(fullyContained, verticalOverflow);

                testLabelOverflowing(/* isValid */ true, rectangles, hlLabelDataPoint, /* hasMultiplyDataSeries */ true);
                testLabelOverflowing(/* isValid */ true, rectangles, hrLabelDataPoint, /* hasMultiplyDataSeries */ true);
            });

            it("invalid - parent orientation: vertical", () => {
                let rectangles = union(notContained, verticalOverflow);
                testLabelOverflowing(/* isValid */ false, rectangles, vbLabelDataPoint, /* hasMultiplyDataSeries */ true);
                testLabelOverflowing(/* isValid */ false, rectangles, vtLabelDataPoint, /* hasMultiplyDataSeries */ true);
            });

            it("invalid - parent orientation: horizontal", () => {
                let rectangles = union(notContained, horizontalOverflow);
                testLabelOverflowing(/* isValid */ false, rectangles, hlLabelDataPoint, /* hasMultiplyDataSeries */ true);
                testLabelOverflowing(/* isValid */ false, rectangles, hrLabelDataPoint, /* hasMultiplyDataSeries */ true);
            });
        });

        function testLabelOverflowing(isValid: boolean, rectangles: IRect[], labelDataPoint: LabelDataPoint, hasMultiplyDataSeries: boolean): void {
            for (const rect of rectangles) {
                expect(DataLabelRectPositioner.isValidLabelOverflowing(rect, labelDataPoint, hasMultiplyDataSeries))
                    .toBe(isValid, `Testing rect: ${JSON.stringify(rect)}`);
            }
        }
    });
});

describe("DataLabelPointPositioner tests", () => {
    let offset = 5;
    let pointLabelDataPoint = createLabelDataPoint("text", false, null, {
        point: createPoint(50, 50),
        radius: 5,
        validPositions: [],
    });
    it("Above positioning", () => {
        // 1 - PointLabelPosition.Above
        expect(DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 1, offset)).toEqual(createRect(30, 30, 40, 10));
    });

    it("Below positioning", () => {
        // 2 - PointLabelPosition.Below
        expect(DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 2, offset)).toEqual(createRect(30, 60, 40, 10));
    });

    it("Left positioning", () => {
        // 4 - PointLabelPosition.Left
        expect(DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 4, offset)).toEqual(createRect(0, 45, 40, 10));
    });

    it("Right positioning", () => {
        // 8 - PointLabelPosition.Right
        expect(DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 8, offset)).toEqual(createRect(60, 45, 40, 10));
    });

    it("Center positioning", () => {
        // 256 - PointLabelPosition.Center
        expect(DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 256, offset)).toEqual(createRect(30, 45, 40, 10));
    });

    it("Above Left positioning", () => {
        // 128 - PointLabelPosition.AboveLeft
        let labelRect = DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 128, offset);
        expect(labelRect.left).toBeCloseTo(1, 0);
        expect(labelRect.top).toBeCloseTo(35, 0);
        expect(labelRect.width).toBe(40);
        expect(labelRect.height).toBe(10);
    });

    it("Below Left positioning", () => {
        // 32 - PointLabelPosition.BelowLeft
        let labelRect = DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 32, offset);
        expect(labelRect.left).toBeCloseTo(1, 0);
        expect(labelRect.top).toBeCloseTo(55, 0);
        expect(labelRect.width).toBe(40);
        expect(labelRect.height).toBe(10);
    });

    it("Above Right positioning", () => {
        // 64 - PointLabelPosition.AboveRight
        let labelRect = DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 64, offset);
        expect(labelRect.left).toBeCloseTo(59, 0);
        expect(labelRect.top).toBeCloseTo(35, 0);
        expect(labelRect.width).toBe(40);
        expect(labelRect.height).toBe(10);
    });

    it("Below Right positioning", () => {
        // 16 - PointLabelPosition.BelowRight
        let labelRect = DataLabelPointPositioner.getLabelRect(pointLabelDataPoint.textSize, <LabelParentPoint>pointLabelDataPoint.parentShape, 16, offset);
        expect(labelRect.left).toBeCloseTo(59, 0);
        expect(labelRect.top).toBeCloseTo(55, 0);
        expect(labelRect.width).toBe(40);
        expect(labelRect.height).toBe(10);
    });
});

describe("Label upgrade and downgrade tests", () => {
    let labelLayout: LabelLayout;
    let viewport = { width: 500, height: 500 };
    beforeEach(() => {
        labelLayout = new LabelLayout({
            startingOffset: 5,
            maximumOffset: 20,
            horizontalPadding: 2,
            verticalPadding: 2,
        });
    });

    it("downgrade", () => {
        let labelDataPoints = [
            createLabelDataPoint("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd,
            }),
        ];
        let labels: Label[] = labelLayout.layout([{
            labelDataPoints,
            maxNumberOfLabels: labelDataPoints.length,
        }], viewport);

        let downgradeLabels: LabelOld[] = LabelUtils.downgradeToOldLabels(labels);

        expect(downgradeLabels[0].fill).toBe(labels[0].fontProperties.color);
        expect(downgradeLabels[0].text).toBe(labels[0].text);
        expect(downgradeLabels[0].secondRowText).toBe(labels[0].secondRowText);
        expect(downgradeLabels[0].boundingBox).toBe(labels[0].boundingBox);
        expect(downgradeLabels[0].isVisible).toBe(labels[0].isVisible);
        expect(downgradeLabels[0].key).toBe(labels[0].key);
        expect(downgradeLabels[0].leaderLinePoints).toBe(labels[0].leaderLinePoints);
        expect(downgradeLabels[0].hasBackground).toBe(labels[0].hasBackground);
        expect(downgradeLabels[0].tooltip).toBe(labels[0].tooltip);
        expect(downgradeLabels[0].labelOrientation).toBe(labels[0].labelOrientation);
    });

    it("downgrade", () => {
        let labelDataPointsOld: LabelDataPointOld[] = [
            createLabelDataPointOld("text", true, {
                orientation: 1, // RectOrientation.VerticalBottomBased
                rect: createRect(100, 100, 50, 100),
                validPositions: [16], // RectLabelPosition.OutsideEnd
            }),
        ];
        let newLabelDataPointsGroups: LabelDataPointGroup<LabelDataPoint[]>[] = labelLayout.upgradeToNewLabelDataPointsGroups([{ labelDataPoints: labelDataPointsOld, maxNumberOfLabels: labelDataPointsOld.length }]);

        let upgradeLabelDataPoints = newLabelDataPointsGroups[0].labelDataPoints;
        expect(upgradeLabelDataPoints[0].textSize).toBe(labelDataPointsOld[0].textSize);
        expect(upgradeLabelDataPoints[0].isPreferred).toBe(labelDataPointsOld[0].isPreferred);
        expect(upgradeLabelDataPoints[0].parentType).toBe(labelDataPointsOld[0].parentType);
        expect(upgradeLabelDataPoints[0].parentShape).toBe(labelDataPointsOld[0].parentShape);
        expect(upgradeLabelDataPoints[0].hasBackground).toBe(labelDataPointsOld[0].hasBackground);
        expect(upgradeLabelDataPoints[0].text).toBe(labelDataPointsOld[0].text);
        expect(upgradeLabelDataPoints[0].tooltip).toBe(labelDataPointsOld[0].tooltip);
        expect(upgradeLabelDataPoints[0].insideFill).toBe(labelDataPointsOld[0].insideFill);
        expect(upgradeLabelDataPoints[0].outsideFill).toBe(labelDataPointsOld[0].outsideFill);
        expect(upgradeLabelDataPoints[0].identity).toBe(labelDataPointsOld[0].identity);
        expect(upgradeLabelDataPoints[0].key).toBe(labelDataPointsOld[0].key);
        expect(upgradeLabelDataPoints[0].fontProperties.size.pt).toBe(labelDataPointsOld[0].fontSize);
        expect(upgradeLabelDataPoints[0].secondRowText).toBe(labelDataPointsOld[0].secondRowText);
        expect(upgradeLabelDataPoints[0].weight).toBe(labelDataPointsOld[0].weight);
    });
});

function createLabelDataPoint(text: string, isParentRect?: boolean, parentRect?: LabelParentRect, parentPoint?: LabelParentPoint): LabelDataPoint {
    return {
        text: text,
        textSize: {
            width: text.length * 10,
            height: 10
        },
        isPreferred: true,
        insideFill: testInsideFillColor,
        outsideFill: testOutsideFillColor,
        parentType: !!isParentRect ? 1 : 0, // 1 - LabelDataPointParentType.Rectangle, 0 - LabelDataPointParentType.Point,
        parentShape: isParentRect ? parentRect : parentPoint,
        identity: null,
        fontProperties: {},
    };
}

function createLabelDataPointOld(text: string, isParentRect?: boolean, parentRect?: LabelParentRect, parentPoint?: LabelParentPoint): LabelDataPointOld {
    return {
        text: text,
        textSize: {
            width: text.length * 10,
            height: 10
        },
        isPreferred: true,
        insideFill: testInsideFillColor,
        outsideFill: testOutsideFillColor,
        parentType: !!isParentRect ? 1 : 0, // 1 - LabelDataPointParentType.Rectangle, 0 - LabelDataPointParentType.Point,
        parentShape: isParentRect ? parentRect : parentPoint,
        identity: null,
        fontSize: LabelUtils.DefaultFontSizeInPt,
    };
}

function createRect(left: number, top: number, width: number, height: number): IRect {
    return {
        left: left,
        top: top,
        width: width,
        height: height,
    };
}

function createPoint(x: number, y: number): shapesInterfaces.IPoint {
    return { x: x, y: y };
}
