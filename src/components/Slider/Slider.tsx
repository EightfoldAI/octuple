import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { mergeClasses, visuallyHidden } from '../../shared/utilities';
import { SliderMarker, SliderProps } from './Slider.types';
import styles from './slider.module.scss';

const thumbDiameter: number = +styles.thumbDiameter;
const thumbRadius = thumbDiameter / 2;

/**
 * For use with Array.sort to sort numbers in ascending order.
 * @param a   The first number for sort comparison.
 * @param b   The  vsecond number for sort comparison.
 * @returns   The difference between the numbers.
 */
function asc(a: number, b: number): number {
    return a - b;
}

/**
 * Provides the percentage representation of the provide value
 * based upon where it sits between the minimum and maximum value.
 *
 * @param value   The value to convert to percentage.
 * @param min     Minimum possible value.
 * @param max     Maximum possible value.
 * @returns       The percentage presentation of the provided value.
 */
export function valueToPercent(
    value: number,
    min: number,
    max: number
): number {
    return ((value - min) * 100) / (max - min);
}

export const Slider: FC<SliderProps> = ({
    ariaLabel,
    autoFocus = false,
    classNames,
    disabled = false,
    id,
    min = 0,
    max = 100,
    name,
    onChange,
    showLabels = true,
    showMarkers = false,
    step = 1,
    value,
}) => {
    const isRange: boolean = Array.isArray(value);
    const [values, setValues] = useState<number[]>(
        Array.isArray(value) ? value.sort(asc) : [value]
    );
    const railRef = useRef<HTMLDivElement>(null);
    const lowerLabelRef = useRef<HTMLInputElement>(null);
    const upperLabelRef = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    let [showMinLabel, setShowMinLabel] = useState<boolean>(showLabels);
    let [showMaxLabel, setShowMaxLabel] = useState<boolean>(showLabels);
    let [markers, setMarkers] = useState<SliderMarker[]>([]);

    const getIdentifier = (baseString: string, index: number): string => {
        if (!baseString) {
            return '';
        }
        const idTokens: Array<string | number> = [baseString];
        if (isRange) {
            idTokens.push(index);
        }
        return idTokens.join('-');
    };

    const isMarkerActive = (markerValue: number): boolean => {
        const markerPct = valueToPercent(markerValue, min, max);
        return isRange
            ? markerPct >= valueToPercent(values[0], min, max) &&
                  markerPct <= valueToPercent(values[1], min, max)
            : markerPct <= valueToPercent(values[0], min, max);
    };

    const getValueOffset = (val: number): number => {
        const inputWidth = railRef.current?.offsetWidth || 0;
        return (
            ((val - min) / (max - min)) * (inputWidth - thumbDiameter) +
            thumbRadius
        );
    };

    const handleChange = (newVal: number, index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1, newVal);
        newValues.sort(asc);
        setValues(newValues);
    };

    useEffect(() => {
        onChange?.(isRange ? [...values] : values[0]);
    }, [values]);

    // Set width of the range to decrease from the left side
    useLayoutEffect(() => {
        const inputWidth = railRef.current?.offsetWidth || 0;

        setMarkers(
            !showMarkers
                ? []
                : [...Array(Math.floor((max - min) / step) + 1)].map(
                      (_, index) => {
                          const markVal = min + step * index;
                          return {
                              value: markVal,
                              offset: `${getValueOffset(markVal)}px`,
                          };
                      }
                  )
        );

        // Early exit if there is no ref available yet. The DOM has yet to initialize
        // and its not possible to calculate positions.
        if (!railRef.current) {
            return;
        }

        const lowerThumbOffset = getValueOffset(values[0]);
        const upperThumbOffset = getValueOffset(values[1]);
        const rangeWidth = isRange
            ? upperThumbOffset - lowerThumbOffset
            : lowerThumbOffset;

        // Hide the min/max markers if the value labels would collide.
        const maxCollisionLabelRef = isRange ? upperLabelRef : lowerLabelRef;
        const maxCollisionThumbOffset = isRange
            ? upperThumbOffset
            : lowerThumbOffset;
        setShowMaxLabel(
            showLabels &&
                inputWidth - maxCollisionThumbOffset >
                    (maxCollisionLabelRef.current?.offsetWidth || 0) + 15
        );
        setShowMinLabel(
            showLabels &&
                lowerThumbOffset > lowerLabelRef.current.offsetWidth + 15
        );

        const lowerLabelOffset = lowerLabelRef.current.offsetWidth / 2;
        lowerLabelRef.current.style.left = `${
            lowerThumbOffset - lowerLabelOffset
        }px`;

        // upper Label/thumb is only used in range mode.
        if (isRange) {
            const upperLabelOffset = upperLabelRef.current.offsetWidth / 2;
            upperLabelRef.current.style.left = `${
                upperThumbOffset - upperLabelOffset
            }px`;
        }

        trackRef.current.style.left = isRange ? `${lowerThumbOffset}px` : '0';
        trackRef.current.style.width = `${rangeWidth}px`;
    }, values);

    return (
        // TODO: implement ResizeObserver to re-render the DOM on resize.
        <div
            className={mergeClasses(styles.sliderContainer, {
                [styles.sliderDisabled]: disabled,
            })}
        >
            <div className={mergeClasses(styles.slider, classNames)}>
                <div ref={railRef} className={styles.sliderRail} />
                <div ref={trackRef} className={styles.sliderTrack} />
                {markers.map((mark, index) => {
                    // Hiding the first and last marker based on design.
                    const isFirstOrLast =
                        index === 0 || index === markers.length - 1;
                    const style = { left: mark.offset };
                    return (
                        !isFirstOrLast && (
                            <div
                                key={index}
                                className={mergeClasses(styles.railMarker, {
                                    [styles.active]: isMarkerActive(mark.value),
                                })}
                                style={style}
                            />
                        )
                    );
                })}
                {values.map((val, index) => (
                    <input
                        aria-label={ariaLabel}
                        autoFocus={autoFocus && index === 0}
                        className={styles.thumb}
                        id={getIdentifier(id, index)}
                        key={index}
                        disabled={disabled}
                        onChange={(event) =>
                            handleChange(+event.target.value, index)
                        }
                        min={min}
                        max={max}
                        name={getIdentifier(name, index)}
                        type="range"
                        step={step}
                        value={val}
                    />
                ))}
            </div>
            <>
                <div
                    className={mergeClasses(styles.sliderValue, {
                        [styles.labelVisible]: showLabels,
                    })}
                    ref={lowerLabelRef}
                >
                    {values[0]}
                </div>
                {isRange && (
                    <div
                        className={mergeClasses(styles.sliderValue, {
                            [styles.labelVisible]: showLabels,
                        })}
                        ref={upperLabelRef}
                    >
                        {values[1]}
                    </div>
                )}
            </>
            <div
                className={mergeClasses(
                    styles.extremityLabel,
                    styles.minLabel,
                    { [styles.labelVisible]: showMinLabel }
                )}
            >
                {min}
            </div>
            <div
                className={mergeClasses(
                    styles.extremityLabel,
                    styles.maxLabel,
                    { [styles.labelVisible]: showMaxLabel }
                )}
            >
                {max}
            </div>
        </div>
    );
};
