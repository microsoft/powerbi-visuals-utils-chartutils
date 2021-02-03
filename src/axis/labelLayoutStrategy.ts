import {
    select,
    Selection
} from "d3-selection";

import {
    textMeasurementService,
    interfaces,
    textUtil,
    wordBreaker
} from "powerbi-visuals-utils-formattingutils";

import ITextAsSVGMeasurer = interfaces.ITextAsSVGMeasurer;
import TextProperties = interfaces.TextProperties;

import {
    IAxisProperties,
    IMargin
} from "./axisInterfaces";

const LeftPadding = 10;

export function willLabelsFit(
    axisProperties: IAxisProperties,
    availableWidth: number,
    textMeasurer: ITextAsSVGMeasurer,
    properties: TextProperties): boolean {

    let labels = axisProperties.values;
    if (labels.length === 0)
        return false;

    let labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
        ? axisProperties.xLabelMaxWidth
        : availableWidth / labels.length;

    return !labels.some(d => {
        properties.text = d;
        return textMeasurer(properties) > labelMaxWidth;
    });
}

export function willLabelsWordBreak(
    axisProperties: IAxisProperties,
    margin: IMargin,
    availableWidth: number,
    textWidthMeasurer: ITextAsSVGMeasurer,
    textHeightMeasurer: ITextAsSVGMeasurer,
    textTruncator: (properties: TextProperties, maxWidth: number) => string,
    properties: TextProperties) {

    let labels = axisProperties.values;
    let labelMaxWidth = axisProperties.xLabelMaxWidth !== undefined
        ? axisProperties.xLabelMaxWidth
        : availableWidth / labels.length;
    let maxRotatedLength = margin.bottom / DefaultRotation.sine;
    let height = textHeightMeasurer(properties);
    let maxNumLines = Math.max(1, Math.floor(margin.bottom / height));

    if (labels.length === 0)
        return false;

    // If no break character and exceeds max width, word breaking will not work, return false
    let mustRotate = labels.some(label => {
        // Detect must rotate and return immediately
        properties.text = label;
        return !wordBreaker.hasBreakers(label) && textWidthMeasurer(properties) > labelMaxWidth;
    });

    if (mustRotate) {
        return false;
    }

    let moreWordBreakChars = labels.filter((label, index: number) => {
        // ...otherwise compare rotation versus word breaking
        let allowedLengthProjectedOnXAxis =
            // Left margin is the width of Y axis.
            margin.left
            // There could be a padding before the first category.
            + axisProperties.outerPadding
            // Align the rotated text's top right corner to the middle of the corresponding category first.
            + axisProperties.categoryThickness * (index + 0.5)
            // Subtracting the left padding space from the allowed length
            - LeftPadding;

        let allowedLength = allowedLengthProjectedOnXAxis / DefaultRotation.cosine;
        let rotatedLength = Math.min(allowedLength, maxRotatedLength);

        // Which shows more characters? Rotated or maxNumLines truncated to labelMaxWidth?
        let wordBreakChars = wordBreaker.splitByWidth(
            label,
            properties,
            textWidthMeasurer,
            labelMaxWidth,
            maxNumLines,
            textTruncator).join(" ");

        properties.text = label;
        let rotateChars = textTruncator(properties, rotatedLength);

        // prefer word break (>=) as it takes up less plot area
        return textUtil.removeEllipses(wordBreakChars).length >= textUtil.removeEllipses(rotateChars).length;
    });

    // prefer word break (>=) as it takes up less plot area
    return moreWordBreakChars.length >= Math.floor(labels.length / 2);
}

export const DefaultRotation = {
    sine: Math.sin(Math.PI * (35 / 180)),
    cosine: Math.cos(Math.PI * (35 / 180)),
    tangent: Math.tan(Math.PI * (35 / 180)),
    transform: "rotate(-35)",
    dy: "-0.5em",
};

export const DefaultRotationWithScrollbar = {
    sine: Math.sin(Math.PI * (90 / 180)),
    cosine: Math.cos(Math.PI * (90 / 180)),
    tangent: Math.tan(Math.PI * (90 / 180)),
    transform: "rotate(-90)",
    dy: "-0.8em",
};

// NOTE: the above rotations are matched to D3 tickSize(6,0) and do not work with other tick sizes.
// we hide these default ticks anyway (on category axes that require rotation), we should make this work
// with any tick size. For now just hardcode a TickSizeZero structure
export const DefaultRotationWithScrollbarTickSizeZero = {
    sine: Math.sin(Math.PI * (90 / 180)),
    cosine: Math.cos(Math.PI * (90 / 180)),
    tangent: Math.tan(Math.PI * (90 / 180)),
    transform: "rotate(-90)",
    dy: "-0.3em",
};

/**
 * Perform rotation and/or truncation of axis tick labels (SVG text) with ellipsis
 */
export function rotate(
    labelSelection: Selection<any, any, any, any>,
    maxBottomMargin: number,
    textTruncator: (properties: TextProperties, maxWidth: number) => string,
    textProperties: TextProperties,
    needRotate: boolean,
    needEllipsis: boolean,
    axisProperties: IAxisProperties,
    margin: IMargin,
    scrollbarVisible: boolean) {

    let rotatedLength;
    let defaultRotation: any;
    let tickSize = axisProperties.axis.tickSize();

    if (scrollbarVisible) {
        if (!tickSize) // zero or undefined
            defaultRotation = DefaultRotationWithScrollbarTickSizeZero;
        else
            defaultRotation = DefaultRotationWithScrollbar;
    }
    else {
        defaultRotation = DefaultRotation;
    }

    if (needRotate) {
        rotatedLength = maxBottomMargin / defaultRotation.sine;
    }

    labelSelection.each(function (datum) {
        let axisLabel = select(this);
        let labelText = axisLabel.text();
        textProperties.text = labelText;
        if (needRotate) {
            let textContentIndex = axisProperties.values.indexOf(this.textContent);
            let allowedLengthProjectedOnXAxis =
                // Left margin is the width of Y axis.
                margin.left
                // There could be a padding before the first category.
                + axisProperties.outerPadding
                // Align the rotated text's top right corner to the middle of the corresponding category first.
                + axisProperties.categoryThickness * (textContentIndex + 0.5);

            // Subtracting the left padding space from the allowed length.
            if (!scrollbarVisible)
                allowedLengthProjectedOnXAxis -= LeftPadding;

            // Truncate if scrollbar is visible or rotatedLength exceeds allowedLength
            let allowedLength = allowedLengthProjectedOnXAxis / defaultRotation.cosine;
            if (scrollbarVisible || needEllipsis || (allowedLength < rotatedLength)) {
                labelText = textTruncator(textProperties, Math.min(allowedLength, rotatedLength));
                axisLabel.text(labelText);
            }

            // NOTE: see note above - rotation only lines up with default d3 tickSize(6,0)
            // TODO don't do these rotations if we already did them
            axisLabel.style("text-anchor", "end")
                .attr("dx", "-0.5em")
                .attr("dy", defaultRotation.dy)
                .attr("transform", defaultRotation.transform);
        } else {
            let maxLabelWidth = !arrayIsEmpty(axisProperties.xLabelMaxWidths) ? axisProperties.xLabelMaxWidths[datum] : axisProperties.xLabelMaxWidth;
            let newLabelText = textTruncator(textProperties, maxLabelWidth);
            if (newLabelText !== labelText)
                axisLabel.text(newLabelText);
            // TODO don't do these rotations if we already did them
            axisLabel.style("text-anchor", "middle")
                .attr("dx", "0em")
                .attr("dy", "1em")
                .attr("transform", "rotate(0)");
        }
    });
}

export function wordBreak(
    text: Selection<any, any, any, any>,
    axisProperties: IAxisProperties,
    maxHeight: number) {

    let allowedLength = axisProperties.xLabelMaxWidth;

    text.each(function () {
        let node = select(this);

        // Reset style of text node
        node
            .style("text-anchor", "middle")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(0)");

        textMeasurementService.wordBreak(this, allowedLength, maxHeight);
    });
}

export function clip(text: Selection<any, any, any, any>, availableWidth: number, svgEllipsis: (textElement: SVGTextElement, maxWidth: number) => void) {
    if (text.size() === 0) {
        return;
    }

    text.each(function () {
        let text = select(this);
        svgEllipsis(text.node() as any, availableWidth);
    });
}

function arrayIsEmpty(array: any[]): boolean {
    return !(array && array.length);
}