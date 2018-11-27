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

import { LegendDataPoint } from "../legendInterfaces";
import { LegendBehavior } from "./legendBehavior";

// Interactivity utils
import { interactivityBaseService } from "powerbi-visuals-utils-interactivityutils";
import IInteractiveBehavior = interactivityBaseService.IInteractiveBehavior;

export default class OpacityLegendBehavior extends LegendBehavior implements IInteractiveBehavior {
    public static dimmedOpacity: number = 0.4;
    public static defaultOpacity: number = 1;
    public renderSelection(hasSelection: boolean): void {
        if (hasSelection) {
            this.legendIcons.style(
                "fill", (d: LegendDataPoint) => {
                    return d.color;
                })
                .style(
                    "fill-opacity", (d: LegendDataPoint) => {
                        if (!d.selected) {
                            return OpacityLegendBehavior.dimmedOpacity;
                        }
                        else {
                            return OpacityLegendBehavior.defaultOpacity;
                        }
                    });
        }
        else {
            this.legendIcons.style(
                "fill", (d: LegendDataPoint) => {
                    return d.color;
                })
                .style("fill-opacity", OpacityLegendBehavior.defaultOpacity);
        }
    }
}
