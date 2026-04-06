'use client';

import React, {
  createRef,
  FC,
  Ref,
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import shallowEqual from 'shallowequal';
import { FormItemInputContext } from '../Form/Context';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import {
  DirectionType,
  SizeContext,
  Size,
  OcThemeName,
} from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import SliderContext, { SliderContextProps } from './Context';
import Marks from './Marks';
import Steps from './Steps';
import {
  LARGE_MARKER_OFFSET,
  LARGE_THUMB_DIAMETER,
  LARGE_THUMB_RADIUS,
  Marker,
  MEDIUM_MARKER_OFFSET,
  MEDIUM_THUMB_DIAMETER,
  MEDIUM_THUMB_RADIUS,
  SliderMarker,
  SliderProps,
  SliderSize,
  SliderTrackStatus,
  SMALL_MARKER_OFFSET,
  SMALL_THUMB_DIAMETER,
  SMALL_THUMB_RADIUS,
  THUMB_TOOLTIP_Y_OFFSET,
} from './Slider.types';
import { Tooltip, TooltipTheme } from '../Tooltip';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import useOffset from './Hooks/useOffset';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';

import styles from './slider.module.scss';
import themedComponentStyles from './slider.theme.module.scss';

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
      activeDotStyle,
      allowDisabledFocus = false,
      ariaLabel,
      autoFocus = false,
      classNames,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
        noThemeContext: false,
      },
      containerClassNames,
      disabled = false,
      dots = false,
      dotClassNames,
      dotStyle,
      formItemInput = false,
      hideMax = false,
      hideMin = false,
      hideRail = false,
      hideThumb = false,
      hideTrack = false,
      hideValue = false,
      id,
      included = true,
      labelPosition = 'bottom',
      marks,
      min = 0,
      minLabel,
      minLabelStyle,
      max = 100,
      maxLabel,
      maxLabelStyle,
      name,
      onChange,
      railBorder = true,
      readOnly = false,
      showLabels = true,
      showMarkers = false,
      size = SliderSize.Medium,
      step = 1,
      theme,
      themeContainerId,
      tooltipContent,
      tooltipProps,
      trackBorder = true,
      trackStatus,
      type = 'default',
      value,
      valueLabel,
      visibleDots,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const htmlDir: string = useCanvasDirection();

    const mergedMin: number = useMemo(() => (isFinite(min) ? min : 0), [min]);
    const mergedMax: number = useMemo(() => (isFinite(max) ? max : 100), [max]);
    const mergedStep: number = useMemo(
      () => (step !== null && step <= 0 ? 1 : step === null ? 1 : step),
      [step]
    );

    const isRange: boolean = Array.isArray(value);
    const [values, setValues] = useState<number[]>(
      Array.isArray(value) ? value.sort(asc) : [value]
    );

    useEffect(() => {
      if (value !== values) {
        setValues(Array.isArray(value) ? value.sort(asc) : [value]);
      }
    }, [value]);

    const sliderRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const railRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const sliderLabelsRef: React.MutableRefObject<HTMLInputElement> =
      useRef<HTMLInputElement>(null);
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
      [...Array(Math.floor((mergedMax - mergedMin) / mergedStep) + 1)].map(
        (_, index) => ({
          value: mergedMin + mergedStep * index,
        })
      )
    );

    const markerSegmentRefs: React.MutableRefObject<
      RefObject<HTMLDivElement>[]
    > = useRef<RefObject<HTMLDivElement>[]>([]);
    markerSegmentRefs.current = markers
      .filter((marker: SliderMarker) => Number.isInteger(marker.value))
      .map(
        (_, i) => markerSegmentRefs.current?.[i] ?? createRef<HTMLDivElement>()
      );

    const visibleSegments: number[] = markers
      ?.filter((mark: SliderMarker) => Number.isInteger(mark.value))
      .map((mark: SliderMarker) => Math.floor(mark.value));

    // Then we hide the last segment because visually we only need n - 1 mapped markers to generate the visible segments.
    visibleSegments?.pop();

    const { isFormItemInput } = useContext(FormItemInputContext);
    const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize: SliderSize | Size = configContextProps.noSizeContext
      ? size
      : contextuallySized || size;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

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
      const markerPct: number = valueToPercent(
        markerValue,
        mergedMin,
        mergedMax
      );
      const segmentRangeOffset: number = 1;
      return isRange
        ? markerPct >=
            valueToPercent(Math.floor(values[0]), mergedMin, mergedMax) -
              segmentRangeOffset &&
            markerPct <=
              valueToPercent(Math.ceil(values[1]), mergedMin, mergedMax) -
                segmentRangeOffset
        : markerPct <=
            valueToPercent(values[0], mergedMin, mergedMax) -
              segmentRangeOffset;
    };

    const thumbGeometry = (): {
      diameter: number;
      radius: number;
      showMarkerOffset: number;
    } => {
      switch (mergedSize) {
        case SliderSize.Large:
          return {
            diameter: LARGE_THUMB_DIAMETER,
            radius: LARGE_THUMB_RADIUS,
            showMarkerOffset: LARGE_MARKER_OFFSET,
          };
        case SliderSize.Medium:
          return {
            diameter: MEDIUM_THUMB_DIAMETER,
            radius: MEDIUM_THUMB_RADIUS,
            showMarkerOffset: MEDIUM_MARKER_OFFSET,
          };
        case SliderSize.Small:
          return {
            diameter: SMALL_THUMB_DIAMETER,
            radius: SMALL_THUMB_RADIUS,
            showMarkerOffset: SMALL_MARKER_OFFSET,
          };
        case SliderSize.Flex:
          if (largeScreenActive) {
            return {
              diameter: SMALL_THUMB_DIAMETER,
              radius: SMALL_THUMB_RADIUS,
              showMarkerOffset: SMALL_MARKER_OFFSET,
            };
          } else if (mediumScreenActive) {
            return {
              diameter: MEDIUM_THUMB_DIAMETER,
              radius: MEDIUM_THUMB_RADIUS,
              showMarkerOffset: MEDIUM_MARKER_OFFSET,
            };
          } else if (smallScreenActive) {
            return {
              diameter: MEDIUM_THUMB_DIAMETER,
              radius: MEDIUM_THUMB_RADIUS,
              showMarkerOffset: MEDIUM_MARKER_OFFSET,
            };
          } else if (xSmallScreenActive) {
            return {
              diameter: LARGE_THUMB_DIAMETER,
              radius: LARGE_THUMB_RADIUS,
              showMarkerOffset: LARGE_MARKER_OFFSET,
            };
          }
        default:
          return {
            diameter: MEDIUM_THUMB_DIAMETER,
            radius: MEDIUM_THUMB_RADIUS,
            showMarkerOffset: MEDIUM_MARKER_OFFSET,
          };
      }
    };

    const getValueOffset = (
      val: number,
      thumbDiameter: number,
      thumbRadius: number
    ): number => {
      const inputWidth = sliderRef.current?.offsetWidth || 0;
      return Math.floor(
        ((val - mergedMin) / (mergedMax - mergedMin)) *
          (inputWidth - thumbDiameter) +
          thumbRadius
      );
    };

    const updateLayout = (): void => {
      const inputWidth: number = sliderRef.current?.offsetWidth || 0;

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
        : lowerThumbOffset - thumbRadius;

      // The below calculation is as follows:
      // First we get the left position of the segment.
      // Then we get the width rounded to the lowest possible even number with a 2px spacer to account for borders.
      if (showMarkers) {
        markerSegmentRefs.current?.forEach(
          (ref: React.RefObject<HTMLDivElement>, i: number) => {
            if (ref.current) {
              if (htmlDir === 'rtl') {
                ref.current.style.right = `${getValueOffset(
                  visibleSegments[i],
                  thumbDiameter,
                  thumbRadius
                )}px`;
              } else {
                ref.current.style.left = `${getValueOffset(
                  visibleSegments[i],
                  thumbDiameter,
                  thumbRadius
                )}px`;
              }
              ref.current.style.width = `${
                2 *
                  Math.round(
                    Math.floor(
                      (inputWidth - thumbDiameter * 2) /
                        visibleSegments.length -
                        1
                    ) / 2
                  ) -
                trackBorderOffset
              }px`;
            }
          }
        );
      }

      if (!isRange) {
        const lowerLabelOffset: number = Math.floor(
          lowerLabelRef.current?.offsetWidth / 2 - sliderRef.current?.offsetLeft
        );
        const showMarkerOffest: number =
          showMarkers === true ? thumbGeometry().showMarkerOffset : 0;

        if (htmlDir === 'rtl') {
          lowerLabelRef.current.style.right = `${Math.floor(
            lowerThumbOffset - lowerLabelOffset - showMarkerOffest
          )}px`;
          lowerLabelRef.current.style.left = 'unset';
        } else {
          lowerLabelRef.current.style.left = `${Math.floor(
            lowerThumbOffset - lowerLabelOffset - showMarkerOffest
          )}px`;
          lowerLabelRef.current.style.right = 'unset';
        }
      } else {
        if (labelPosition === 'inline') {
          const sliderLabelsOffset: number = Math.floor(
            sliderLabelsRef.current.offsetWidth / 2
          );

          if (htmlDir === 'rtl') {
            sliderLabelsRef.current.style.marginRight = `-${sliderLabelsOffset}px`;
            sliderLabelsRef.current.style.marginLeft = 'unset';
          } else {
            sliderLabelsRef.current.style.marginLeft = `-${sliderLabelsOffset}px`;
            sliderLabelsRef.current.style.marginRight = 'unset';
          }
        }
      }

      // Hide the min/max markers if the value labels would collide.
      // Range labels are centered, ignore when isRange and only
      // allow when labelPosition is 'bottom'.
      if (!isRange && labelPosition === 'bottom') {
        let showMaxLabel: boolean;
        let showMinLabel: boolean;

        // TODO: Need to investigate why `showMaxLabel` and `showMinLabel`
        // calculations need to be duped depending on canvas direction.
        // Moving these into a shared expression also doesn't work.
        if (htmlDir === 'rtl') {
          showMaxLabel =
            (showLabels && hideMin && hideMax && hideValue) ||
            (showLabels &&
              lowerThumbOffset <
                minLabelRef.current.offsetLeft -
                  lowerLabelRef.current.offsetWidth / 2 -
                  thumbRadius);
          maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

          showMinLabel =
            (showLabels && hideMin && hideMax && hideValue) ||
            (showLabels &&
              lowerThumbOffset >
                maxLabelRef.current.offsetLeft +
                  maxLabelRef.current.offsetWidth +
                  lowerLabelRef.current.offsetWidth / 2 -
                  thumbRadius);
          minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';
        } else {
          showMaxLabel =
            (showLabels && hideMin && hideMax && hideValue) ||
            (showLabels &&
              lowerThumbOffset <
                maxLabelRef.current.offsetLeft -
                  lowerLabelRef.current.offsetWidth / 2 -
                  thumbRadius);
          maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

          showMinLabel =
            (showLabels && hideMin && hideMax && hideValue) ||
            (showLabels &&
              lowerThumbOffset >
                minLabelRef.current.offsetLeft +
                  minLabelRef.current.offsetWidth +
                  lowerLabelRef.current.offsetWidth / 2 +
                  thumbRadius);
          minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';
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
      trackRef.current.style.width = `${Math.floor(rangeWidth)}px`;
    };

    const [formatValue] = useOffset(mergedMin, mergedMax, mergedStep, markers);

    const rawValues = useMemo(() => {
      const valueList =
        value === null || value === undefined
          ? []
          : Array.isArray(value)
          ? value
          : [value];

      const [val0 = mergedMin] = valueList;
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
              returnValues[returnValues.length - 1] ?? mergedMin
            );
          }
        }
        returnValues.sort((a, b) => a - b);
      }

      returnValues.forEach((val: number, index: number) => {
        returnValues[index] = formatValue(val);
      });

      return returnValues;
    }, [value, isRange, mergedMin, formatValue]);

    const rawValuesRef: React.MutableRefObject<number[]> = useRef(rawValues);
    rawValuesRef.current = rawValues;

    const markList: SliderMarker[] = useMemo<SliderMarker[]>(() => {
      const keys: string[] = Object.keys(marks || {});

      return keys
        .map((key) => {
          const mark: React.ReactNode | Marker = marks[key];
          const markObj: SliderMarker = {
            value: Number(key),
          };

          if (
            mark &&
            typeof mark === 'object' &&
            !React.isValidElement(mark) &&
            ('label' in mark || 'style' in mark)
          ) {
            markObj.style = mark.style;
            markObj.label = mark.label;
          } else {
            markObj.label = mark;
          }

          return markObj;
        })
        .filter(({ label }) => label || typeof label === 'number')
        .sort((a, b) => a.value - b.value);
    }, [marks]);

    const sortedCacheValues = useMemo(
      () => [...rawValues].sort((a, b) => a - b),
      [rawValues]
    );

    // Provide range values with included [min, max]
    // Used by Mark & Dot.
    const [includedStart, includedEnd] = useMemo(() => {
      if (!isRange) {
        return [mergedMin, sortedCacheValues[0]];
      }

      return [
        sortedCacheValues[0],
        sortedCacheValues[sortedCacheValues.length - 1],
      ];
    }, [sortedCacheValues, isRange, mergedMin]);

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
      if (!readOnly && !disabled) {
        let valueIndex: number = 0;
        let valueDist: number = mergedMax - mergedMin;

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

    const onSliderHitTargetClick = (
      event: React.MouseEvent<HTMLDivElement>
    ): void => {
      event.preventDefault();

      onSliderMouseDown(event);
    };

    const onSliderMouseDown = (
      event: React.MouseEvent<HTMLDivElement>
    ): void => {
      event.preventDefault();

      const { width, left, right } = sliderRef.current.getBoundingClientRect();
      const { clientX } = event;

      let percent: number;
      if (htmlDir === 'rtl') {
        percent = (right - clientX) / width;
      } else {
        percent = (clientX - left) / width;
      }

      // Limit the number of decimal places to the step.
      const getStepDecimal = (num: number) =>
        (String(num).split('.')[1] || '').length;
      const maxDecimalMapToStep: number = Math.max(getStepDecimal(step));

      const nextValue: number = mergedMin + percent * (mergedMax - mergedMin);
      changeToCloseValue(
        formatValue(Number(nextValue.toFixed(maxDecimalMapToStep)))
      );
    };

    const handleChange = (newVal: number, index: number): void => {
      const newValues = [...values];

      newValues.splice(index, 1, newVal);
      newValues.sort(asc);
      setValues(newValues);
      onChange?.(isRange ? [...newValues] : newValues[0]);
    };

    const getTooltipContentByValue = (value: number): React.ReactNode => {
      let content: React.ReactNode = '';
      if (isRange) {
        if (value === values[0] && tooltipContent) {
          content = (tooltipContent as any)[0]
            ? (tooltipContent as any)[0]
            : '';
        } else if (value === values[1] && tooltipContent) {
          content = (tooltipContent as any)[1]
            ? (tooltipContent as any)[1]
            : '';
        }
      } else {
        content = tooltipContent;
      }
      return content;
    };

    const getTooltipStyles = (
      direction: string,
      styles: React.CSSProperties,
      value: number
    ): React.CSSProperties => {
      let style: React.CSSProperties;
      if (direction === 'rtl') {
        style = {
          marginLeft: !showMarkers
            ? `-${getValueOffset(
                value,
                thumbGeometry().diameter,
                thumbGeometry().radius
              )}px`
            : `calc(calc(${getValueOffset(
                value,
                thumbGeometry().diameter,
                thumbGeometry().radius
              )}px - 4px) * -1)`,
          ...styles,
        };
      } else {
        style = {
          marginLeft: !showMarkers
            ? `${getValueOffset(
                value,
                thumbGeometry().diameter,
                thumbGeometry().radius
              )}px`
            : `calc(${getValueOffset(
                value,
                thumbGeometry().diameter,
                thumbGeometry().radius
              )}px - 4px)`,
          ...styles,
        };
      }
      return style;
    };

    // Set width of the range to decrease from the left side
    // Update markers when shown
    useLayoutEffect(() => {
      updateLayout();
    }, [labelPosition, showLabels, showMarkers, value, values]);

    const context: SliderContextProps = useMemo<SliderContextProps>(
      () => ({
        direction: htmlDir as DirectionType,
        disabled: mergedDisabled,
        included,
        includedEnd,
        includedStart,
        max: mergedMax,
        min: mergedMin,
        readOnly,
        step: mergedStep,
      }),
      [
        htmlDir,
        mergedDisabled,
        included,
        includedEnd,
        includedStart,
        mergedMax,
        mergedMin,
        readOnly,
        mergedStep,
      ]
    );

    return (
      <SliderContext.Provider value={context}>
        <ResizeObserver onResize={updateLayout}>
          <ThemeContextProvider
            componentClassName={themedComponentStyles.theme}
            containerId={themeContainerId}
            theme={mergedTheme}
          >
            <div
              {...rest}
              className={mergeClasses(
                styles.sliderContainer,
                {
                  [styles.sliderSmall]:
                    mergedSize === SliderSize.Flex && largeScreenActive,
                },
                {
                  [styles.sliderMedium]:
                    mergedSize === SliderSize.Flex && mediumScreenActive,
                },
                {
                  [styles.sliderMedium]:
                    mergedSize === SliderSize.Flex && smallScreenActive,
                },
                {
                  [styles.sliderLarge]:
                    mergedSize === SliderSize.Flex && xSmallScreenActive,
                },
                { [styles.sliderLarge]: mergedSize === SliderSize.Large },
                { [styles.sliderMedium]: mergedSize === SliderSize.Medium },
                { [styles.sliderSmall]: mergedSize === SliderSize.Small },
                {
                  [styles.sliderDisabled]: allowDisabledFocus || mergedDisabled,
                  [themedComponentStyles.theme]: mergedTheme,
                  [styles.sliderReadonly]: !!readOnly,
                  [styles.sliderContainerInline]: labelPosition === 'inline',
                  [styles.sliderContainerRtl]: htmlDir === 'rtl',
                  [styles.showMarkers]: !!showMarkers,
                  ['in-form-item']: mergedFormItemInput,
                },
                containerClassNames
              )}
            >
              <div
                ref={minLabelRef}
                className={mergeClasses(
                  styles.extremityLabel,
                  styles.minLabel,
                  {
                    [styles.minLabelTextOnly]: hideMin && !!minLabel,
                    [styles.extremityRangeLabel]: isRange,
                    [styles.extremityLabelInline]: labelPosition === 'inline',
                    [styles.labelVisible]: showLabels,
                  }
                )}
                style={minLabelStyle}
              >
                {!!minLabel && minLabel} {!hideMin && mergedMin}
              </div>
              <div
                ref={sliderRef}
                className={mergeClasses(styles.slider, classNames)}
              >
                <div
                  className={styles.sliderHitTarget}
                  onClick={
                    !allowDisabledFocus && !readOnly
                      ? onSliderHitTargetClick
                      : null
                  }
                />
                <div
                  ref={railRef}
                  className={mergeClasses([
                    styles.sliderRail,
                    {
                      [styles.railBorderHidden]: !railBorder,
                    },
                    {
                      [styles.data]: type === 'data',
                    },
                    {
                      [styles.sliderRailOpacity]: !!hideRail || !!showMarkers,
                    },
                  ])}
                  onMouseDown={
                    !allowDisabledFocus && !readOnly ? onSliderMouseDown : null
                  }
                />
                <div
                  ref={trackRef}
                  className={mergeClasses([
                    styles.sliderTrack,
                    {
                      [styles.trackBorderHidden]: !trackBorder,
                    },
                    {
                      [styles.success]:
                        !!trackStatus &&
                        trackStatus === SliderTrackStatus.Success,
                    },
                    {
                      [styles.warning]:
                        !!trackStatus &&
                        trackStatus === SliderTrackStatus.Warning,
                    },
                    {
                      [styles.error]:
                        !!trackStatus &&
                        trackStatus === SliderTrackStatus.Error,
                    },
                    {
                      [styles.sliderTrackOpacity]:
                        !!hideTrack || !!showMarkers || !included,
                    },
                  ])}
                  onMouseDown={
                    !allowDisabledFocus && !readOnly ? onSliderMouseDown : null
                  }
                />
                {!!showMarkers && (
                  <div className={styles.railMarkerSegments}>
                    {markers
                      .filter((marker: SliderMarker) =>
                        Number.isInteger(marker.value)
                      )
                      .map((mark: SliderMarker, index: number) => {
                        let railMarkerSegment: JSX.Element;
                        if (index <= visibleSegments.length - 1) {
                          railMarkerSegment = (
                            <div
                              className={mergeClasses(
                                styles.railMarkerSegment,
                                {
                                  [styles.railMarkerSegmentBorderHidden]:
                                    (!trackBorder &&
                                      isMarkerSegmentActive(mark.value)) ||
                                    (!railBorder &&
                                      !isMarkerSegmentActive(mark.value)),
                                  [styles.data]: type === 'data',
                                  [styles.active]:
                                    !hideTrack &&
                                    isMarkerSegmentActive(mark.value),
                                  [styles.success]:
                                    isMarkerSegmentActive(mark.value) &&
                                    !!trackStatus &&
                                    trackStatus === SliderTrackStatus.Success,
                                  [styles.warning]:
                                    isMarkerSegmentActive(mark.value) &&
                                    !!trackStatus &&
                                    trackStatus === SliderTrackStatus.Warning,
                                  [styles.error]:
                                    isMarkerSegmentActive(mark.value) &&
                                    !!trackStatus &&
                                    trackStatus === SliderTrackStatus.Error,
                                  [styles.railMarkerSegmentOpacity]:
                                    (!!hideRail &&
                                      !!hideTrack &&
                                      isMarkerSegmentActive(mark.value)) ||
                                    (!!hideRail &&
                                      !isMarkerSegmentActive(mark.value)),
                                }
                              )}
                              key={index}
                              onMouseDown={
                                !allowDisabledFocus && !readOnly
                                  ? onSliderMouseDown
                                  : null
                              }
                              ref={markerSegmentRefs.current[index]}
                            />
                          );
                        }
                        return railMarkerSegment;
                      })}
                  </div>
                )}
                <Steps
                  activeStyle={activeDotStyle}
                  dots={dots}
                  classNames={dotClassNames}
                  marks={markList}
                  style={dotStyle}
                  trackStatus={trackStatus}
                  type={type}
                  visibleDots={visibleDots}
                />
                <Marks
                  marks={markList}
                  onClick={(value: number) => {
                    if (!allowDisabledFocus && !readOnly) {
                      changeToCloseValue(formatValue(value));
                    }
                  }}
                />
                {values.map((val: number, index: number) => (
                  <Tooltip
                    classNames={mergeClasses([
                      styles.sliderTooltip,
                      tooltipProps?.classNames,
                    ])}
                    wrapperClassNames={
                      mergedDisabled ? styles.hideSliderTooltip : ''
                    }
                    closeOnReferenceClick={false}
                    content={getTooltipContentByValue(val)}
                    key={`value-tooltip-${index}`}
                    offset={thumbGeometry().diameter + THUMB_TOOLTIP_Y_OFFSET}
                    placement={'top'}
                    portal
                    portalRoot={sliderRef.current}
                    preventTouchMoveDefault={false}
                    theme={TooltipTheme.dark}
                    {...tooltipProps}
                    tooltipStyle={getTooltipStyles(
                      htmlDir,
                      tooltipProps?.style,
                      val
                    )}
                  >
                    <input
                      ref={ref}
                      aria-disabled={mergedDisabled}
                      aria-label={ariaLabel}
                      autoFocus={autoFocus && index === 0}
                      className={mergeClasses([
                        styles.thumb,
                        {
                          [styles.thumbHidden]: hideThumb,
                        },
                      ])}
                      id={getIdentifier(id, index)}
                      key={index}
                      disabled={!allowDisabledFocus && mergedDisabled}
                      onChange={
                        !allowDisabledFocus && !readOnly
                          ? (event: React.ChangeEvent<HTMLInputElement>) =>
                              handleChange(+event.target.value, index)
                          : null
                      }
                      min={mergedMin}
                      max={mergedMax}
                      name={getIdentifier(name, index)}
                      type="range"
                      readOnly={readOnly}
                      step={mergedStep}
                      tabIndex={readOnly ? -1 : undefined}
                      value={val}
                    />
                  </Tooltip>
                ))}
              </div>
              <div
                ref={maxLabelRef}
                className={mergeClasses(
                  styles.extremityLabel,
                  styles.maxLabel,
                  {
                    [styles.maxLabelTextOnly]: hideMax && !!maxLabel,
                    [styles.extremityRangeLabel]: isRange,
                    [styles.extremityLabelInline]: labelPosition === 'inline',
                    [styles.labelVisible]: showLabels,
                  }
                )}
                style={maxLabelStyle}
              >
                {!!maxLabel && maxLabel} {!hideMax && mergedMax}
              </div>
              <div
                ref={sliderLabelsRef}
                className={mergeClasses(
                  styles.sliderLabels,
                  { [styles.sliderRangeLabels]: isRange },
                  { [styles.labelVisible]: showLabels }
                )}
              >
                <div className={styles.sliderValue} ref={lowerLabelRef}>
                  {!hideValue && htmlDir === 'rtl' && <span>{values[0]}</span>}{' '}
                  {!!valueLabel && (
                    <span>{isRange ? valueLabel[0] : valueLabel}</span>
                  )}{' '}
                  {!hideValue && htmlDir !== 'rtl' && <span>{values[0]}</span>}
                </div>
                {isRange && (
                  <div className={styles.sliderValue} ref={upperLabelRef}>
                    {!hideValue && (
                      <span className={styles.sliderLabelSpacer}>-</span>
                    )}
                    {hideValue && !!valueLabel[1] && (
                      <span className={styles.sliderLabelSpacer}>-</span>
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
          </ThemeContextProvider>
        </ResizeObserver>
      </SliderContext.Provider>
    );
  }
);
