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

import DataLabelManager from "./../../src/dataLabel/dataLabelManager";
import { IDataLabelSettings, ILabelLayout, IDataLabelInfo } from "./../../src/dataLabel/dataLabelInterfaces";
import { RectOrientation, ContentPositions, OutsidePlacement } from "./../../src/dataLabel/dataLabelInterfaces";
import powerbi from "powerbi-visuals-api";

describe("DataLabelManager", () => {
    describe("Default Settings", () => {
        it("Check default values are true", () => {
            let labelManager: DataLabelManager = new DataLabelManager(),
                defaultSettings: IDataLabelSettings = labelManager.defaultSettings;

            expect(defaultSettings.anchorMargin).toBe(0);
            expect(defaultSettings.anchorRectOrientation).toBe(RectOrientation.None);
            expect(defaultSettings.contentPosition).toBe(ContentPositions.BottomCenter);
            expect(defaultSettings.maximumMovingDistance).toBe(12);
            expect(defaultSettings.minimumMovingDistance).toBe(3);
            expect(defaultSettings.opacity).toBe(1);
            expect(defaultSettings.outsidePlacement).toBe(OutsidePlacement.Disallowed);
            expect(defaultSettings.validContentPositions).toBe(ContentPositions.BottomCenter);
        });
    });

    describe("Get Label info - One value provided", () => {
        let labelManager: DataLabelManager = new DataLabelManager(),
            defaultSettings: IDataLabelSettings = labelManager.defaultSettings;

        it("Get Label info", () => {
            let result: IDataLabelInfo = labelManager.getLabelInfo({ minimumMovingDistance: 10 });

            expect(defaultSettings.minimumMovingDistance).toEqual(3);
            expect(result.minimumMovingDistance).toEqual(10);
        });

        it("Get Label info - all values Provided", () => {
            let result: IDataLabelInfo = labelManager.getLabelInfo({ maximumMovingDistance: 12 });

            expect(defaultSettings.anchorMargin).toEqual(0);
            expect(result.maximumMovingDistance).toEqual(12);
        });

        it("Get Label info - maximumMovingDistance with anchorMargin > 0", () => {
            let result: IDataLabelInfo = labelManager.getLabelInfo({ maximumMovingDistance: 16, anchorMargin: 4 });

            expect(result.anchorMargin).toEqual(4);
            // maximumMovingDistance should be increased with anchorMargin.
            expect(result.maximumMovingDistance).toEqual(16 + 4);
        });

        it("Get Label info - Default value should be taken", () => {
            let result: IDataLabelInfo = labelManager.getLabelInfo({});

            expect(defaultSettings.anchorMargin).toEqual(0);
            expect(result.anchorMargin).toEqual(0);
        });
    });

    describe("It should hide collided labels", () => {
        it("No Input, No Output", () => {
            let labelManager: DataLabelManager = new DataLabelManager(),
                viewPort: powerbi.IViewport = { width: 500, height: 500 },
                labelLayout: ILabelLayout = {
                    filter: () => true,
                    labelLayout: { x: () => 250, y: () => 250 },
                    labelText: () => "",
                    style: null
                },
                data: any[] = [];
            expect(labelManager.hideCollidedLabels(viewPort, data, labelLayout)).toEqual([]);
        });

        it("One non colliding label should be present", () => {
            let labelManager: DataLabelManager = new DataLabelManager(),
                viewPort: powerbi.IViewport = { width: 500, height: 500 },
                labelLayout: ILabelLayout = {
                    filter: () => true,
                    labelLayout: {
                        x: (element) => element.x,
                        y: (element) => element.y
                    },
                    labelText: () => "My-label",
                    style: null
                },
                data: any[] = [
                    { x: 5, y: 100 }
                ];
            let result = labelManager.hideCollidedLabels(viewPort, data, labelLayout);
            expect(result.length).toEqual(1);
        });

        it("Two Identitical labels, 1 should be hidden", () => {
            let labelManager: DataLabelManager = new DataLabelManager(),
                viewPort: powerbi.IViewport = { width: 500, height: 500 },
                labelLayout: ILabelLayout = {
                    filter: () => true,
                    labelLayout: {
                        x: (element) => element.x,
                        y: (element) => element.y
                    },
                    labelText: () => "My-label",
                    style: null
                },
                data: any[] = [
                    { x: 5, y: 100 },
                    { x: 5, y: 100 }
                ];
            let result = labelManager.hideCollidedLabels(viewPort, data, labelLayout, false, true);
            expect(result.length).toEqual(1);
        });
    });

    describe("Is Valid Rect", () => {
        it("Is Valid Rect - Return true", () => {
            expect(DataLabelManager.isValid({
                left: 150,
                top: 130,
                width: 120,
                height: 110
            })).toBe(true);
        });

        it("Is Valid Rect - Negative values", () => {
            expect(DataLabelManager.isValid({
                left: -150,
                top: -130,
                width: -120,
                height: -110
            })).toBe(false);
        });

        it("Is Valid Rect - Empty Rect", () => {
            expect(DataLabelManager.isValid({
                left: 0,
                top: 0,
                width: 0,
                height: 0
            })).toBe(false);
        });

        it("Is Valid Rect - null Rect", () => {
            expect(DataLabelManager.isValid(null)).toBe(false);
        });
    });
});
