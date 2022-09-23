import React, {
    createRef,
    FC,
    Ref,
    RefObject,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import shallowEqual from 'shallowequal';
import { FormItemInputContext } from '../Form/Context';
import { SizeContext, Size } from '../ConfigProvider';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { mergeClasses } from '../../shared/utilities';
import { SliderMarker, SliderProps, SliderSize } from './Slider.types';
import useOffset from './Hooks/useOffset';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './slider.module.scss';

const largeThumbDiameter: number = +styles.largeThumbDiameter;
const largeThumbRadius: number = largeThumbDiameter / 2;

const mediumThumbDiameter: number = +styles.mediumThumbDiameter;
const mediumThumbRadius: number = mediumThumbDiameter / 2;

const smallThumbDiameter: number = +styles.smallThumbDiameter;
const smallThumbRadius: number = smallThumbDiameter / 2;

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

export const Slider: FC<SliderProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            disabled = false,
            formItemInput = false,
            hideMax = false,
            hideMin = false,
            hideValue = false,
            id,
            min = 0,
            minLabel,
            max = 100,
            maxLabel,
            name,
            onChange,
            showLabels = true,
            showMarkers = false,
            size = SliderSize.Medium,
            step = 1,
            value,
            valueLabel,
            ...rest
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const htmlDir: string = useCanvasDirection();

        const isRange: boolean = Array.isArray(value);
        const [values, setValues] = useState<number[]>(
            Array.isArray(value) ? value.sort(asc) : [value]
        );
        const containerRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);
        const railRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);
        const lowerLabelRef: React.MutableRefObject<HTMLInputElement> =
            useRef<HTMLInputElement>(null);
        const upperLabelRef: React.MutableRefObject<HTMLInputElement> =
            useRef<HTMLInputElement>(null);
        const trackRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);
        const minLabelRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);
        const maxLabelRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);
        let [markers, setMarkers] = useState<SliderMarker[]>(
            [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
                value: min + step * index,
            }))
        );
        const markerSegmentRefs: React.MutableRefObject<
            RefObject<HTMLDivElement>[]
        > = useRef<RefObject<HTMLDivElement>[]>(null);
        markerSegmentRefs.current = markers.map(
            (_, i) =>
                markerSegmentRefs.current?.[i] ?? createRef<HTMLDivElement>()
        );

        const { isFormItemInput } = useContext(FormItemInputContext);
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize: SliderSize | Size = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

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

        const isMarkerSegmentActive = (markerValue: number): boolean => {
            const markerPct = valueToPercent(markerValue, min, max);
            const segmentRangeOffset: number = 1;
            return isRange
                ? markerPct >=
                      valueToPercent(values[0], min, max) -
                          segmentRangeOffset &&
                      markerPct <=
                          valueToPercent(values[1], min, max) -
                              segmentRangeOffset
                : markerPct <=
                      valueToPercent(values[0], min, max) - segmentRangeOffset;
        };

        const thumbGeometry = (): {
            diameter: number;
            radius: number;
        } => {
            switch (mergedSize) {
                case SliderSize.Large:
                    return {
                        diameter: largeThumbDiameter,
                        radius: largeThumbRadius,
                    };
                case SliderSize.Medium:
                    return {
                        diameter: mediumThumbDiameter,
                        radius: mediumThumbRadius,
                    };
                case SliderSize.Small:
                    return {
                        diameter: smallThumbDiameter,
                        radius: smallThumbRadius,
                    };
                case SliderSize.Flex:
                    if (largeScreenActive) {
                        return {
                            diameter: smallThumbDiameter,
                            radius: smallThumbRadius,
                        };
                    } else if (mediumScreenActive) {
                        return {
                            diameter: mediumThumbDiameter,
                            radius: mediumThumbRadius,
                        };
                    } else if (smallScreenActive) {
                        return {
                            diameter: mediumThumbDiameter,
                            radius: mediumThumbRadius,
                        };
                    } else if (xSmallScreenActive) {
                        return {
                            diameter: largeThumbDiameter,
                            radius: largeThumbRadius,
                        };
                    }
                default:
                    return {
                        diameter: mediumThumbDiameter,
                        radius: mediumThumbRadius,
                    };
            }
        };

        const getValueOffset = (
            val: number,
            thumbDiameter: number,
            thumbRadius: number
        ): number => {
            const inputWidth = containerRef.current?.offsetWidth || 0;
            return (
                ((val - min) / (max - min)) * (inputWidth - thumbDiameter) +
                thumbRadius
            );
        };

        const updateLayout = (): void => {
            const inputWidth: number = containerRef.current?.offsetWidth || 0;

            // Early exit if there is no ref available yet. The DOM has yet to initialize
            // and its not possible to calculate positions.
            if (!railRef.current) {
                return;
            }

            const thumbDiameter: number = thumbGeometry().diameter;
            const thumbRadius: number = thumbGeometry().radius;
            const trackBorderOffset: number = 2;
            const lowerThumbOffset: number = getValueOffset(
                values[0],
                thumbDiameter,
                thumbRadius
            );
            const upperThumbOffset: number = getValueOffset(
                values[1],
                thumbDiameter,
                thumbRadius
            );
            const rangeWidth: number = isRange
                ? upperThumbOffset - lowerThumbOffset
                : lowerThumbOffset;

            // The below calculation is as follows:
            // First we get the left position of the segment.
            // Then we get the width rounded to the lowest possible even number with a 2px spacer to account for borders.
            // Then we hide the last segment because visually we only need n - 1 markers to generate the visible segments.
            if (showMarkers) {
                markerSegmentRefs.current?.forEach(
                    (ref: React.RefObject<HTMLDivElement>, i: number) => {
                        if (ref.current) {
                            if (htmlDir === 'rtl') {
                                ref.current.style.right = `${getValueOffset(
                                    markers[i].value,
                                    thumbDiameter,
                                    thumbRadius
                                )}px`;
                            } else {
                                ref.current.style.left = `${getValueOffset(
                                    markers[i].value,
                                    thumbDiameter,
                                    thumbRadius
                                )}px`;
                            }
                            ref.current.style.width = `${
                                2 *
                                    Math.round(
                                        Math.floor(
                                            (inputWidth - thumbDiameter * 2) /
                                                (markers.length - 1)
                                        ) / 2
                                    ) -
                                trackBorderOffset
                            }px`;
                        }
                    }
                );
            }

            // Hide the min/max markers if the value labels would collide.
            // Range labels are centered, ignore when isRange.
            if (!isRange) {
                const lowerThumbOffset: number = getValueOffset(
                    values[0],
                    thumbDiameter,
                    thumbRadius
                );
                const lowerLabelOffset: number =
                    lowerLabelRef.current.offsetWidth / 2;
                let showMaxLabel: boolean;
                let showMinLabel: boolean;

                // TODO: Need to investigate why `showMaxLabel` and `showMinLabel`
                // calculations need to be duped depending on canvas direction.
                // Moving these into a shared expression also doesn't work.
                if (htmlDir === 'rtl') {
                    showMaxLabel =
                        showLabels &&
                        lowerThumbOffset <
                            minLabelRef.current.getBoundingClientRect().left -
                                lowerLabelRef.current.offsetWidth / 2 -
                                thumbRadius;
                    maxLabelRef.current.style.opacity = showMaxLabel
                        ? '1'
                        : '0';

                    showMinLabel =
                        showLabels &&
                        lowerThumbOffset >
                            maxLabelRef.current.getBoundingClientRect().right +
                                lowerLabelRef.current.offsetWidth / 2 -
                                thumbRadius;
                    minLabelRef.current.style.opacity = showMinLabel
                        ? '1'
                        : '0';

                    lowerLabelRef.current.style.right = `${
                        lowerThumbOffset - lowerLabelOffset
                    }px`;
                    lowerLabelRef.current.style.left = 'unset';
                } else {
                    showMaxLabel =
                        showLabels &&
                        lowerThumbOffset <
                            maxLabelRef.current.getBoundingClientRect().left -
                                lowerLabelRef.current.offsetWidth / 2 -
                                thumbRadius;
                    maxLabelRef.current.style.opacity = showMaxLabel
                        ? '1'
                        : '0';

                    showMinLabel =
                        showLabels &&
                        lowerThumbOffset >
                            minLabelRef.current.getBoundingClientRect().right +
                                lowerLabelRef.current.offsetWidth / 2 -
                                thumbRadius;
                    minLabelRef.current.style.opacity = showMinLabel
                        ? '1'
                        : '0';

                    lowerLabelRef.current.style.left = `${
                        lowerThumbOffset - lowerLabelOffset
                    }px`;
                    lowerLabelRef.current.style.right = 'unset';
                }
            }

            if (htmlDir === 'rtl') {
                trackRef.current.style.right = isRange
                    ? `${lowerThumbOffset}px`
                    : `${thumbRadius}px`;
            } else {
                trackRef.current.style.left = isRange
                    ? `${lowerThumbOffset}px`
                    : `${thumbRadius}px`;
            }
            trackRef.current.style.width = `${rangeWidth}px`;
        };

        const [formatValue] = useOffset(min, max, step, markers);

        const rawValues = React.useMemo(() => {
            const valueList =
                value === null || value === undefined
                    ? []
                    : Array.isArray(value)
                    ? value
                    : [value];

            const [val0 = min] = valueList;
            let returnValues: number[] = value === null ? [] : [val0];

            // Format as range
            if (isRange) {
                returnValues = [...valueList];

                // When value is `undefined`, fill values.
                if (value === undefined) {
                    const pointCount = 2;
                    returnValues = returnValues.slice(0, pointCount);

                    while (returnValues.length < pointCount) {
                        returnValues.push(
                            returnValues[returnValues.length - 1] ?? min
                        );
                    }
                }
                returnValues.sort((a, b) => a - b);
            }

            returnValues.forEach((val: number, index: number) => {
                returnValues[index] = formatValue(val);
            });

            return returnValues;
        }, [value, isRange, min, formatValue]);

        const rawValuesRef: React.MutableRefObject<number[]> =
            React.useRef(rawValues);
        rawValuesRef.current = rawValues;

        const getTriggerValue = (triggerValues: number[]) =>
            isRange ? triggerValues : triggerValues[0];

        const triggerChange = (nextValues: number[]) => {
            const cloneNextValues = [...nextValues].sort((a, b) => a - b);

            if (!shallowEqual(cloneNextValues, rawValuesRef.current)) {
                onChange?.(getTriggerValue(cloneNextValues));
            }

            setValues(cloneNextValues);
        };

        const changeToCloseValue = (newValue: number) => {
            if (!disabled) {
                let valueIndex: number = 0;
                let valueDist: number = max - min;

                rawValues.forEach((val: number, index: number) => {
                    const dist: number = Math.abs(newValue - val);
                    if (dist <= valueDist) {
                        valueDist = dist;
                        valueIndex = index;
                    }
                });

                const cloneNextValues = [...rawValues];

                cloneNextValues[valueIndex] = newValue;

                if (isRange && !rawValues.length) {
                    cloneNextValues.push(newValue);
                }

                triggerChange(cloneNextValues);
            }
        };

        const onSliderMouseDown = (
            event: React.MouseEvent<HTMLDivElement>
        ): void => {
            event.preventDefault();

            const { width, left, right } =
                containerRef.current.getBoundingClientRect();
            const { clientX } = event;

            let percent: number;
            if (htmlDir === 'rtl') {
                percent = (right - clientX) / width;
            } else {
                percent = (clientX - left) / width;
            }

            const nextValue: number = min + percent * (max - min);
            changeToCloseValue(formatValue(nextValue));
        };

        const handleChange = (newVal: number, index: number): void => {
            const newValues = [...values];
            newValues.splice(index, 1, newVal);
            newValues.sort(asc);
            setValues(newValues);
            onChange?.(isRange ? [...newValues] : newValues[0]);
        };

        // Set width of the range to decrease from the left side
        // Update markers when shown
        useLayoutEffect(() => {
            updateLayout();
        }, [values, showMarkers]);

        return (
            <ResizeObserver onResize={updateLayout}>
                <div
                    ref={containerRef}
                    {...rest}
                    className={mergeClasses(
                        styles.sliderContainer,
                        {
                            [styles.sliderSmall]:
                                mergedSize === SliderSize.Flex &&
                                largeScreenActive,
                        },
                        {
                            [styles.sliderMedium]:
                                mergedSize === SliderSize.Flex &&
                                mediumScreenActive,
                        },
                        {
                            [styles.sliderMedium]:
                                mergedSize === SliderSize.Flex &&
                                smallScreenActive,
                        },
                        {
                            [styles.sliderLarge]:
                                mergedSize === SliderSize.Flex &&
                                xSmallScreenActive,
                        },
                        {
                            [styles.sliderLarge]:
                                mergedSize === SliderSize.Large,
                        },
                        {
                            [styles.sliderMedium]:
                                mergedSize === SliderSize.Medium,
                        },
                        {
                            [styles.sliderSmall]:
                                mergedSize === SliderSize.Small,
                        },
                        {
                            [styles.sliderDisabled]:
                                allowDisabledFocus || mergedDisabled,
                        },
                        { [styles.sliderContainerRtl]: htmlDir === 'rtl' },
                        { [styles.showMarkers]: !!showMarkers },
                        { ['in-form-item']: mergedFormItemInput }
                    )}
                >
                    <div className={mergeClasses(styles.slider, classNames)}>
                        <div
                            ref={railRef}
                            className={mergeClasses(styles.sliderRail, {
                                [styles.sliderRailOpacity]: showMarkers,
                            })}
                            onMouseDown={onSliderMouseDown}
                        />
                        <div
                            ref={trackRef}
                            className={mergeClasses(styles.sliderTrack, {
                                [styles.sliderTrackOpacity]: showMarkers,
                            })}
                            onMouseDown={onSliderMouseDown}
                        />
                        {!!showMarkers && (
                            <div className={styles.railMarkerSegments}>
                                {markers.map(
                                    (mark: SliderMarker, index: number) => {
                                        return (
                                            <div
                                                className={mergeClasses(
                                                    styles.railMarkerSegment,
                                                    {
                                                        [styles.active]:
                                                            isMarkerSegmentActive(
                                                                mark.value
                                                            ),
                                                    },
                                                    {
                                                        [styles.railMarkerSegmentHidden]:
                                                            index ===
                                                            markers.length - 1,
                                                    }
                                                )}
                                                key={index}
                                                onMouseDown={onSliderMouseDown}
                                                ref={
                                                    markerSegmentRefs.current[
                                                        index
                                                    ]
                                                }
                                            />
                                        );
                                    }
                                )}
                            </div>
                        )}
                        {values.map((val: number, index: number) => (
                            <input
                                ref={ref}
                                aria-disabled={mergedDisabled}
                                aria-label={ariaLabel}
                                autoFocus={autoFocus && index === 0}
                                className={styles.thumb}
                                id={getIdentifier(id, index)}
                                key={index}
                                disabled={!allowDisabledFocus && mergedDisabled}
                                onChange={
                                    !allowDisabledFocus
                                        ? (
                                              event: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                              handleChange(
                                                  +event.target.value,
                                                  index
                                              )
                                        : null
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
                    <div
                        ref={minLabelRef}
                        className={mergeClasses(
                            styles.extremityLabel,
                            styles.minLabel,
                            { [styles.extremityRangeLabel]: isRange }
                        )}
                    >
                        {!!minLabel && minLabel} {!hideMin && min}
                    </div>
                    <div
                        ref={maxLabelRef}
                        className={mergeClasses(
                            styles.extremityLabel,
                            styles.maxLabel,
                            { [styles.extremityRangeLabel]: isRange }
                        )}
                    >
                        {!!maxLabel && maxLabel} {!hideMax && max}
                    </div>
                    <div
                        className={mergeClasses(
                            styles.sliderLabels,
                            { [styles.sliderRangeLabels]: isRange },
                            { [styles.labelVisible]: showLabels }
                        )}
                    >
                        <div className={styles.sliderValue} ref={lowerLabelRef}>
                            {!hideValue && htmlDir === 'rtl' && (
                                <span>{values[0]}</span>
                            )}{' '}
                            {!!valueLabel && (
                                <span>
                                    {isRange ? valueLabel[0] : valueLabel}
                                </span>
                            )}{' '}
                            {!hideValue && htmlDir !== 'rtl' && (
                                <span>{values[0]}</span>
                            )}
                        </div>
                        {isRange && (
                            <div
                                className={styles.sliderValue}
                                ref={upperLabelRef}
                            >
                                {!hideValue && (
                                    <span className={styles.sliderLabelSpacer}>
                                        -
                                    </span>
                                )}
                                {hideValue && !!valueLabel[1] && (
                                    <span className={styles.sliderLabelSpacer}>
                                        -
                                    </span>
                                )}
                                {!hideValue && htmlDir === 'rtl' && (
                                    <span>{values[1]}</span>
                                )}{' '}
                                {!!valueLabel && <span>{valueLabel[1]}</span>}{' '}
                                {!hideValue && htmlDir !== 'rtl' && (
                                    <span>{values[1]}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </ResizeObserver>
        );
    }
);
