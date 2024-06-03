import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ProgressSize,
  ProgressStepsProps,
  ProgressVariant,
} from './Progress.types';
import { MAX_PERCENT } from './Internal/Common';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { mergeClasses } from '../../shared/utilities';

import styles from './progress.module.scss';

const STEP_ITEM_MARGIN_OFFSET: number = 4;

const Steps: FC<ProgressStepsProps> = (props) => {
  const {
    bordered,
    children,
    direction: directionConfig,
    maxLabelRef,
    minLabelRef,
    percent = 0,
    pillBordered,
    showLabels,
    showValueLabel,
    size,
    steps,
    stepWidth,
    strokeColor,
    strokeWidth,
    trailColor = null as any,
    valueLabelRef,
    variant,
  } = props;
  const [calculatedWidth, setCalculatedWidth] = useState<string>('0');
  const current: number = Math.round(steps * (percent / MAX_PERCENT));
  const styledSteps: React.ReactNode[] = new Array(steps);
  const flexContainerRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const progressBgRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  const getStrokeHeight = (): number => {
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

  for (let i: number = 0; i < steps; ++i) {
    const color: string = Array.isArray(strokeColor)
      ? strokeColor[i]
      : strokeColor;
    styledSteps[i] = (
      <div
        ref={i <= current - 1 ? progressBgRef : undefined}
        key={i}
        className={mergeClasses([
          styles.progressStepsItem,
          { [styles.bordered]: !!bordered },
          {
            [styles.progressStepsItemActive]: i <= current - 1,
          },
        ])}
        style={{
          background: i <= current - 1 ? color : trailColor,
          borderColor: bordered
            ? i <= current - 1
              ? color
              : trailColor
            : 'transparent',
          width: stepWidth ? stepWidth : calculatedWidth,
          height: strokeWidth || getStrokeHeight(),
        }}
      />
    );
  }

  useEffect(() => {
    // Early exit if there is stepWidth via props.
    if (stepWidth > 0) {
      return;
    }

    const flexContainerWidth: number =
      flexContainerRef.current?.offsetWidth || 0;
    const itemWidth: number = Math.round(
      Math.floor(flexContainerWidth / steps) -
        STEP_ITEM_MARGIN_OFFSET +
        Math.ceil(STEP_ITEM_MARGIN_OFFSET / steps)
    );

    // Calculates the percent width of each item
    setCalculatedWidth(`${(itemWidth / flexContainerWidth) * MAX_PERCENT}%`);
  }, [steps]);

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
  };

  useLayoutEffect(() => {
    updateLayout();
  }, [showLabels, showValueLabel]);

  return (
    <ResizeObserver onResize={updateLayout}>
      <div
        ref={flexContainerRef}
        className={mergeClasses([
          styles.progressStepsOuter,
          { [styles.progressStepsOuterPill]: variant === ProgressVariant.Pill },
          { [styles.progressStepsOuterPillBordered]: !!pillBordered },
        ])}
      >
        {styledSteps}
      </div>
      {children}
    </ResizeObserver>
  );
};

export default Steps;
