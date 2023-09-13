import React, { FC, Ref, useRef } from 'react';
import Circle from './Circle';
import Line from './Line';
import Steps from './Steps';
import {
  ProgressProps,
  ProgressSize,
  ProgressStatuses,
  ProgressVariant,
  StringGradients,
} from './Progress.types';
import { getSuccessPercent, validProgress } from './Utils';
import { MAX_PERCENT } from './Internal/Common';
import { DirectionType } from '../ConfigProvider';
import { Icon, IconName, IconSize } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses, omit } from '../../shared/utilities';

import styles from './progress.module.scss';

const Progress: FC<ProgressProps> = React.forwardRef(
  (props: ProgressProps, ref: Ref<HTMLDivElement>) => {
    const {
      bordered = true,
      classNames,
      hideMax = false,
      hideMin = false,
      maxLabel,
      minLabel,
      percent = 0,
      pillBordered = true,
      showLabels = true,
      showPercentSymbol = true,
      showSuccessLabel = false,
      showValueLabel = false,
      size = ProgressSize.Medium,
      steps,
      stepWidth,
      strokeColor,
      successLabel,
      type = 'line',
      variant = ProgressVariant.Default,
      width,
      ...rest
    } = props;

    const htmlDir: string = useCanvasDirection();

    const maxLabelRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);
    const minLabelRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);
    const successLabelRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);
    const valueLabelRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);

    const getPercentNumber = (): number => {
      const successPercent = getSuccessPercent(props);
      return parseInt(
        successPercent !== undefined
          ? successPercent.toString()
          : percent.toString(),
        10
      );
    };

    const getProgressStatus = ():
      | 'success'
      | 'normal'
      | 'exception'
      | 'active' => {
      const { status } = props;
      if (
        ProgressStatuses.indexOf(status!) < 0 &&
        getPercentNumber() >= MAX_PERCENT
      ) {
        return 'success';
      }
      return status || 'normal';
    };

    const renderProcessInfo = (
      progressStatus: typeof ProgressStatuses[number]
    ): JSX.Element => {
      const { format } = props;
      const successPercent = getSuccessPercent(props);
      if (!showLabels) {
        return null;
      }
      let text;
      const textFormatter =
        format ||
        ((percentNumber) =>
          showPercentSymbol ? `${percentNumber}%` : percentNumber);
      const isLineType: boolean = type === 'line';
      if (
        format ||
        (progressStatus !== 'exception' && progressStatus !== 'success')
      ) {
        text = textFormatter(
          validProgress(percent),
          validProgress(successPercent)
        );
      } else if (progressStatus === 'exception') {
        text = isLineType ? (
          <Icon
            classNames={styles.progressIcon}
            color={'var(--progress-error-text-color)'}
            path={IconName.mdiCloseCircleOutline}
            size={
              size !== ProgressSize.Medium ? IconSize.XSmall : IconSize.Small
            }
          />
        ) : (
          <Icon
            classNames={styles.progressIcon}
            color={'var(--progress-error-text-color)'}
            path={IconName.mdiClose}
            size={
              size !== ProgressSize.Medium ? IconSize.Small : IconSize.Large
            }
            style={{ display: 'inline-flex' }}
          />
        );
      } else if (progressStatus === 'success') {
        text = isLineType ? (
          <Icon
            classNames={styles.progressIcon}
            color={'var(--progress-success-text-color)'}
            path={IconName.mdiCheckCircleOutline}
            size={
              size !== ProgressSize.Medium ? IconSize.XSmall : IconSize.Small
            }
          />
        ) : (
          <Icon
            classNames={styles.progressIcon}
            color={'var(--progress-success-text-color)'}
            path={IconName.mdiCheck}
            size={
              size !== ProgressSize.Medium ? IconSize.Small : IconSize.Large
            }
            style={{ display: 'inline-flex' }}
          />
        );
      }
      return (
        <>
          {type === 'line' && (
            <div className={styles.progressTextWrapper}>
              <span
                className={mergeClasses([
                  styles.extremityLabel,
                  styles.minLabel,
                  styles.progressText,
                ])}
                ref={minLabelRef}
                title={minLabelRef.current?.innerText}
              >
                {!hideMin && !showValueLabel && text}
                {!hideMin &&
                  !minLabel &&
                  showValueLabel &&
                  (showPercentSymbol ? '0%' : '0')}
                {!hideMin && minLabel && showValueLabel && minLabel}
              </span>
              <span
                className={mergeClasses([
                  styles.extremityLabel,
                  styles.maxLabel,
                  styles.progressText,
                ])}
                ref={maxLabelRef}
                title={maxLabelRef.current?.innerText}
              >
                {!hideMax && !maxLabel && (showPercentSymbol ? '100%' : '100')}
                {!hideMax && maxLabel && maxLabel}
              </span>
              <span
                className={mergeClasses([
                  styles.valueLabel,
                  styles.progressText,
                ])}
                ref={valueLabelRef}
                title={valueLabelRef.current?.innerText}
              >
                {showValueLabel && text}
              </span>
              <span
                className={mergeClasses([
                  styles.valueLabel,
                  styles.progressText,
                ])}
                ref={successLabelRef}
                title={successLabelRef.current?.innerText}
              >
                {showSuccessLabel &&
                  !successLabel &&
                  (showPercentSymbol
                    ? `${successPercent}%`
                    : `${successPercent}`)}
                {showSuccessLabel && successLabel && successLabel}
              </span>
            </div>
          )}
          {type !== 'line' && (
            <span
              className={styles.progressText}
              title={typeof text === 'string' ? text : undefined}
            >
              {text}
            </span>
          )}
        </>
      );
    };

    const progressStatus: 'success' | 'normal' | 'exception' | 'active' =
      getProgressStatus();
    const progressInfo: JSX.Element = renderProcessInfo(progressStatus);
    const strokeColorNotArray:
      | string
      | ({
          direction?: string;
        } & StringGradients) = Array.isArray(strokeColor)
      ? strokeColor[0]
      : strokeColor;
    const strokeColorNotGradient: string | string[] =
      typeof strokeColor === 'string' || Array.isArray(strokeColor)
        ? strokeColor
        : undefined;

    let progress;

    const progressClassNames: string = mergeClasses([
      styles.progress,
      (styles as any)[
        `progress-${
          (type === 'dashboard' && 'circle') || (steps && 'steps') || type
        }`
      ],
      (styles as any)[`progress-status-${progressStatus}`],
      { [styles.progressSmall]: size === ProgressSize.Small },
      { [styles.progressRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    if (type === 'line') {
      progress = steps ? (
        <Steps
          {...props}
          bordered={bordered}
          direction={htmlDir as DirectionType}
          maxLabelRef={maxLabelRef}
          minLabelRef={minLabelRef}
          showLabels={showLabels}
          showValueLabel={showValueLabel}
          steps={steps}
          strokeColor={strokeColorNotGradient}
          valueLabelRef={valueLabelRef}
        >
          {progressInfo}
        </Steps>
      ) : (
        <Line
          {...props}
          bordered={bordered}
          direction={htmlDir as DirectionType}
          maxLabelRef={maxLabelRef}
          minLabelRef={minLabelRef}
          showLabels={showLabels}
          showSuccessLabel={showSuccessLabel}
          showValueLabel={showValueLabel}
          strokeColor={strokeColorNotArray}
          successLabelRef={successLabelRef}
          valueLabelRef={valueLabelRef}
        >
          {progressInfo}
        </Line>
      );
    } else if (type === 'circle' || type === 'dashboard') {
      progress = (
        <Circle
          {...props}
          bordered={bordered}
          strokeColor={strokeColorNotArray}
          progressStatus={progressStatus}
        />
      );

      return (
        <div className={progressClassNames} style={{ width: width }}>
          <div
            ref={ref}
            style={{ width: width }}
            {...omit(rest, [
              'gapDegree',
              'gapPosition',
              'format',
              'status',
              'strokeLinecap',
              'strokeWidth',
              'success',
              'trailColor',
            ])}
            className={!!bordered ? styles.bordered : ''}
          >
            {progress}
          </div>
          {progressInfo}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={{ width: width }}
        {...omit(rest, [
          'gapDegree',
          'gapPosition',
          'format',
          'status',
          'strokeLinecap',
          'strokeWidth',
          'success',
          'trailColor',
        ])}
        className={progressClassNames}
      >
        {progress}
      </div>
    );
  }
);

export default Progress;
