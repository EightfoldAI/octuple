import React, { FC, useLayoutEffect, useRef } from 'react';
import { LineProps, ProgressSize, ProgressVariant } from './Progress.types';
import type { ProgressGradient, StringGradients } from './Progress.types';
import { getSuccessPercent, validProgress } from './Utils';
import type { DirectionType } from '../ConfigProvider';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { mergeClasses } from '../../shared/utilities';

import styles from './progress.module.scss';

/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "75%": "#009900",
 *     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *     "25%": "#66FF00",
 *     "100%": "#ffffff"
 *   }
 */
export const sortGradient = (gradients: StringGradients) => {
  let tempArr: any[] = [];
  Object.keys(gradients).forEach((key) => {
    const formattedKey = parseFloat(key.replace(/%/g, ''));
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
};

/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */
export const handleGradient = (
  strokeColor: ProgressGradient,
  directionConfig?: DirectionType
) => {
  const {
    from = 'var(--progress-complete-background-color)',
    to = 'var(--progress-complete-background-color)',
    direction = directionConfig === 'rtl' ? 'to left' : 'to right',
    ...rest
  } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients);
    return {
      backgroundImage: `linear-gradient(${direction}, ${sortedGradients})`,
    };
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
};

const Line: FC<LineProps> = (props) => {
  const {
    bordered,
    children,
    direction: directionConfig,
    maxLabelRef,
    minLabelRef,
    percent,
    pillBordered,
    showLabels,
    showSuccessLabel,
    showValueLabel,
    size,
    strokeColor,
    strokeLinecap = 'round',
    strokeWidth,
    success,
    successLabelRef,
    trailColor = null,
    valueLabelRef,
    variant,
  } = props;

  const progressBgRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const successSegmentRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : {
          background: typeof strokeColor === 'string' && strokeColor,
        };

  const borderRadius =
    strokeLinecap === 'square' || strokeLinecap === 'butt' ? 0 : undefined;
  const trailStyle = {
    background: trailColor || undefined,
    borderRadius,
  };

  const getPercentHeight = (): number => {
    let height: number = 6;
    if (size === ProgressSize.Large) {
      height = 12;
    } else if (size === ProgressSize.Medium) {
      height = 6;
    } else if (size === ProgressSize.Small) {
      height = 4;
    }
    return height;
  };

  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth || getPercentHeight(),
    borderRadius,
    ...backgroundProps,
  };

  const successPercent = getSuccessPercent(props);

  const successPercentStyle = {
    width: `${validProgress(successPercent)}%`,
    height: strokeWidth || getPercentHeight(),
    borderRadius,
    background: success?.strokeColor,
  };

  const successSegment =
    successPercent !== undefined ? (
      <div
        ref={successSegmentRef}
        className={styles.progressSuccessBg}
        style={successPercentStyle}
      />
    ) : null;

  const updateLayout = (): void => {
    // Early exit if there is no ref available yet. The DOM has yet to initialize
    // and its not possible to calculate positions.
    if (!valueLabelRef?.current || !showValueLabel) {
      return;
    }

    // Hide the min/max labels if the value labels would collide.
    let progressBarOffset: number;
    const valueLabelOffset: number = valueLabelRef.current.offsetWidth;

    let showMaxLabel: boolean;
    let showMinLabel: boolean;

    if (directionConfig === 'rtl') {
      progressBarOffset = progressBgRef.current.offsetWidth;

      showMaxLabel =
        showLabels &&
        valueLabelRef.current.getBoundingClientRect().left >
          maxLabelRef.current.getBoundingClientRect().right;
      maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

      showMinLabel =
        showLabels &&
        valueLabelRef.current.getBoundingClientRect().left + valueLabelOffset <
          minLabelRef.current.getBoundingClientRect().left;
      minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';

      valueLabelRef.current.style.right = `${
        progressBarOffset - valueLabelOffset / 2
      }px`;
      valueLabelRef.current.style.left = 'unset';
    } else {
      progressBarOffset = progressBgRef.current.getBoundingClientRect().right;
      showMaxLabel =
        showLabels &&
        valueLabelRef.current.getBoundingClientRect().left + valueLabelOffset <
          maxLabelRef.current.getBoundingClientRect().left;
      maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

      showMinLabel =
        showLabels &&
        valueLabelRef.current.getBoundingClientRect().left >
          minLabelRef.current.getBoundingClientRect().right;
      minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';

      valueLabelRef.current.style.left = `${
        progressBarOffset - valueLabelOffset
      }px`;
      valueLabelRef.current.style.right = 'unset';
    }

    if (!successLabelRef?.current || !showSuccessLabel) {
      return;
    }

    let successBarOffset: number;
    const successLabelOffset: number = successLabelRef.current.offsetWidth;

    let showValLabel: boolean;

    if (directionConfig === 'rtl') {
      successBarOffset = successSegmentRef.current.offsetWidth;

      showMaxLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left >
          maxLabelRef.current.getBoundingClientRect().right;
      maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

      showMinLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left +
          valueLabelOffset <
          minLabelRef.current.getBoundingClientRect().left;
      minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';

      showValLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left >
          valueLabelRef.current.getBoundingClientRect().right;
      valueLabelRef.current.style.opacity = showValLabel ? '1' : '0';

      successLabelRef.current.style.right = `${
        successBarOffset - successLabelOffset / 2
      }px`;
      successLabelRef.current.style.left = 'unset';
    } else {
      successBarOffset =
        successSegmentRef.current.getBoundingClientRect().right;
      showMaxLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left +
          successLabelOffset <
          maxLabelRef.current.getBoundingClientRect().left;
      maxLabelRef.current.style.opacity = showMaxLabel ? '1' : '0';

      showMinLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left >
          minLabelRef.current.getBoundingClientRect().right;
      minLabelRef.current.style.opacity = showMinLabel ? '1' : '0';

      showValLabel =
        showLabels &&
        successLabelRef.current.getBoundingClientRect().left +
          successLabelOffset <
          valueLabelRef.current.getBoundingClientRect().left;
      valueLabelRef.current.style.opacity = showValLabel ? '1' : '0';

      successLabelRef.current.style.left = `${
        successBarOffset - successLabelOffset
      }px`;
      successLabelRef.current.style.right = 'unset';
    }
  };

  useLayoutEffect(() => {
    updateLayout();
  }, [showLabels, showValueLabel, success]);

  return (
    <ResizeObserver onResize={updateLayout}>
      <div
        className={mergeClasses([
          styles.progressOuter,
          { [styles.progressOuterPill]: variant === ProgressVariant.Pill },
          { [styles.progressOuterPillBordered]: !!pillBordered },
        ])}
      >
        <div
          className={mergeClasses([
            styles.progressInner,
            { [styles.bordered]: !!bordered },
          ])}
          style={trailStyle}
        >
          <div
            ref={progressBgRef}
            className={styles.progressBg}
            style={percentStyle}
          />
          {successSegment}
        </div>
      </div>
      {children}
    </ResizeObserver>
  );
};

export default Line;
