import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import { mergeClasses } from '../../shared/utilities';
import styles from './slider.module.scss';
import { SliderMarker, SliderProps } from './Slider.types';

const thumbDiameter: number = +styles.thumbDiameter;
const markerWidth: number = +styles.markerWidth;

function asc(a: number, b: number) {
    return a - b;
}

export function valueToPercent(value: number, min: number, max: number) {
    return ((value - min) * 100) / (max - min);
}

export const Slider: FC<SliderProps> = ({
    ariaLabel,
    autoFocus = false,
    className,
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
    const isRange = Array.isArray(value);
    const [values, setValues] = useState(isRange ? value.sort(asc) : [value]);
    const railRef = useRef<HTMLDivElement>(null);
    const lowerLabelRef = useRef<HTMLInputElement>(null);
    const upperLabelRef = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    let [showMinLabel, setShowMinLabel] = useState(showLabels);
    let [showMaxLabel, setShowMaxLabel] = useState(showLabels);
    let [markers, setMarkers] = useState<SliderMarker[]>([]);

    function getIdentifier(baseString: string, index: number): string {
        if (!baseString) {
            return '';
        }
        const idTokens: Array<string | number> = [baseString];
        if (isRange) {
            idTokens.push(index);
        }
        return idTokens.join('-');
    }

    function handleChange(newVal: number, index: number) {
        const newValues = [...values];
        newValues.splice(index, 1, newVal);
        newValues.sort(asc);
        setValues(newValues);
        onChange?.(isRange ? [...newValues] : newValues[0]);
    }

    function isMarkerActive(markerValue: number): boolean {
        const markerPct = valueToPercent(markerValue, min, max);
        return isRange
            ? markerPct >= valueToPercent(values[0], min, max) &&
                  markerPct <= valueToPercent(values[1], min, max)
            : markerPct <= valueToPercent(values[0], min, max);
    }

    const getValueOffset = (
        val: number,
        valDiameter: number,
        inputWidth: number
    ): number => {
        const valRadius = valDiameter / 2;
        return (
            ((val - min) / (max - min)) * (inputWidth - valDiameter) + valRadius
        );
    };

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
                              offset: `${getValueOffset(
                                  markVal,
                                  markerWidth,
                                  inputWidth
                              )}px`,
                          };
                      }
                  )
        );

        // Early exit if there is no ref available yet. The DOM has yet to initialize
        // and its not possible to calculate positions.
        if (!railRef.current) {
            return;
        }

        const lowerThumbOffset = getValueOffset(
            values[0],
            thumbDiameter,
            inputWidth
        );
        const upperThumbOffset = getValueOffset(
            values[1],
            thumbDiameter,
            inputWidth
        );
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
            <div className={mergeClasses(styles.slider, className)}>
                <div ref={railRef} className={styles.sliderRail} />
                <div ref={trackRef} className={styles.sliderTrack} />
                {markers.map((mark, index) => {
                    // Omitting the first and last marker based on design.
                    const isVisuallyHidden =
                        index === 0 || index === markers.length - 1;

                    const style = { left: mark.offset };
                    return isVisuallyHidden ? undefined : (
                        <div
                            key={index}
                            className={mergeClasses(styles.railMarker, {
                                [styles.active]: isMarkerActive(mark.value),
                            })}
                            style={style}
                        />
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
