import * as React from 'react';
import { SliderMarker } from '../Slider.types';

/** Format the value in the range of [min, max] */
type FormatRangeValue = (value: number) => number;

/** Format value align with step */
type FormatStepValue = (value: number) => number;

/** Format value align with step & marks */
type FormatValue = (value: number) => number;

type OffsetMode = 'unit' | 'dist';

type OffsetValue = (
    values: number[],
    offset: number | 'min' | 'max',
    valueIndex: number,
    mode?: OffsetMode
) => number;

export type OffsetValues = (
    values: number[],
    offset: number | 'min' | 'max',
    valueIndex: number,
    mode?: OffsetMode
) => {
    value: number;
    values: number[];
};

export default function useOffset(
    min: number,
    max: number,
    step: number,
    markers: SliderMarker[]
): [FormatValue, OffsetValues] {
    const formatRangeValue: FormatRangeValue = React.useCallback(
        (val) => {
            let formatNextValue: number = isFinite(val) ? val : min;
            formatNextValue = Math.min(max, val);
            formatNextValue = Math.max(min, formatNextValue);

            return formatNextValue;
        },
        [min, max]
    );

    const formatStepValue: FormatStepValue = React.useCallback(
        (val) => {
            if (step !== null) {
                const stepValue: number =
                    min +
                    Math.round((formatRangeValue(val) - min) / step) * step;

                // Limit the number of decimal places.
                const getDecimal = (num: number) =>
                    (String(num).split('.')[1] || '').length;
                const maxDecimal: number = Math.max(
                    getDecimal(step),
                    getDecimal(max),
                    getDecimal(min)
                );
                const fixedValue: number = Number(
                    stepValue.toFixed(maxDecimal)
                );

                return min <= fixedValue && fixedValue <= max
                    ? fixedValue
                    : null;
            }
            return null;
        },
        [step, min, max, formatRangeValue]
    );

    const formatValue: FormatValue = React.useCallback(
        (val) => {
            const formatNextValue: number = formatRangeValue(val);

            // List align values.
            const alignValues: number[] = markers.map((mark) => mark.value);
            if (step !== null) {
                alignValues.push(formatStepValue(val));
            }

            alignValues.push(min, max);

            // Align with marks.
            let closeValue: number = alignValues[0];
            let closeDist: number = max - min;

            alignValues.forEach((alignValue) => {
                const dist: number = Math.abs(formatNextValue - alignValue);
                if (dist <= closeDist) {
                    closeValue = alignValue;
                    closeDist = dist;
                }
            });

            return closeValue;
        },
        [min, max, markers, step, formatRangeValue, formatStepValue]
    );

    const offsetValue: OffsetValue = (
        values,
        offset,
        valueIndex,
        mode = 'unit'
    ) => {
        if (typeof offset === 'number') {
            let nextValue: number;
            const originValue: number = values[valueIndex];

            // Only used for `dist` mode.
            const targetDistValue: number = originValue + offset;

            // Compare next step value & mark value which is best match.
            let potentialValues: number[] = [];
            markers.forEach((mark) => {
                potentialValues.push(mark.value);
            });

            potentialValues.push(min, max);

            // In case origin value is align with mark but not with step.
            potentialValues.push(formatStepValue(originValue));

            // Put offset step value.
            const sign = offset > 0 ? 1 : -1;

            if (mode === 'unit') {
                potentialValues.push(
                    formatStepValue(originValue + sign * step)
                );
            } else {
                potentialValues.push(formatStepValue(targetDistValue));
            }

            // Find closest one.
            potentialValues = potentialValues
                .filter((val) => val !== null)
                // Remove reverse value.
                .filter((val) =>
                    offset < 0 ? val <= originValue : val >= originValue
                );

            if (mode === 'unit') {
                // `unit` mode can not contain itself.
                potentialValues = potentialValues.filter(
                    (val) => val !== originValue
                );
            }

            const compareValue: number =
                mode === 'unit' ? originValue : targetDistValue;

            nextValue = potentialValues[0];
            let valueDist: number = Math.abs(nextValue - compareValue);

            potentialValues.forEach((potentialValue) => {
                const dist: number = Math.abs(potentialValue - compareValue);
                if (dist < valueDist) {
                    nextValue = potentialValue;
                    valueDist = dist;
                }
            });

            // Out of range handled.
            if (nextValue === undefined) {
                return offset < 0 ? min : max;
            }

            // `dist` mode
            if (mode === 'dist') {
                return nextValue;
            }

            // `unit` mode may need another round.
            if (Math.abs(offset) > 1) {
                const cloneValues: number[] = [...values];
                cloneValues[valueIndex] = nextValue;

                return offsetValue(
                    cloneValues,
                    offset - sign,
                    valueIndex,
                    mode
                );
            }

            return nextValue;
        } else if (offset === 'min') {
            return min;
        } else if (offset === 'max') {
            return max;
        }
        return null;
    };

    const offsetValues: OffsetValues = (
        values,
        offset,
        valueIndex,
        mode = 'unit'
    ) => {
        const nextValues: number[] = values.map(formatValue);
        const nextValue: number = offsetValue(
            nextValues,
            offset,
            valueIndex,
            mode
        );
        nextValues[valueIndex] = nextValue;

        return {
            value: nextValues[valueIndex],
            values: nextValues,
        };
    };

    return [formatValue, offsetValues];
}
