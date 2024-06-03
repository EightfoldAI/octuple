import React, { FC } from 'react';
import { MAX_PERCENT, useTransitionDuration } from './Common';
import type { OcProgressProps } from './OcProgress.types';
import { uniqueId } from '../../../shared/utilities';
import styles from '../progress.module.scss';

function stripPercentToNumber(percent: string): number {
  return +percent.replace('%', '');
}

function toArray<T>(value: T | T[]): T[] {
  const mergedValue: T | T[] = value ?? [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

export const VIEW_BOX_SIZE: number = 100;

const CIRCLE_DEGREE: number = 360;
const FLIP_DEGREE: number = 180;
const ROTATE_RIGHT_ANGLE_DEGREE: number = 90;
const SPLIT_NUMBER: number = 2;
const VIEW_BOX_SIZE_RADIUS: number = VIEW_BOX_SIZE / SPLIT_NUMBER;

const getCircleStyle = (
  gapDegree: number,
  gapPosition: OcProgressProps['gapPosition'] | undefined,
  offset: number,
  percent: number,
  perimeter: number,
  perimeterWithoutGap: number,
  rotateDeg: number,
  strokeColor: string | Record<string, string>,
  strokeLinecap: OcProgressProps['strokeLinecap'],
  strokeWidth: number,
  stepSpace: number = 0
) => {
  const offsetDeg: number =
    (offset / VIEW_BOX_SIZE) *
    CIRCLE_DEGREE *
    ((CIRCLE_DEGREE - gapDegree) / CIRCLE_DEGREE);
  const positionDeg: number =
    gapDegree === 0
      ? 0
      : {
          bottom: 0,
          top: FLIP_DEGREE,
          left: ROTATE_RIGHT_ANGLE_DEGREE,
          right: -ROTATE_RIGHT_ANGLE_DEGREE,
        }[gapPosition];

  let strokeDashoffset: number =
    ((MAX_PERCENT - percent) / MAX_PERCENT) * perimeterWithoutGap;
  // Fix percent accuracy when strokeLinecap is round
  if (strokeLinecap === 'round' && percent !== MAX_PERCENT) {
    strokeDashoffset += strokeWidth / SPLIT_NUMBER;
    // when percent is small enough (<= 1%), keep smallest value to avoid stroke disappearing.
    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }

  return {
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: `${perimeterWithoutGap}px ${perimeter}`,
    strokeDashoffset: strokeDashoffset + stepSpace,
    transform: `rotate(${rotateDeg + offsetDeg + positionDeg}deg)`,
    transformOrigin: '50% 50%',
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
    fillOpacity: 0,
  };
};

const OcCircle: FC<OcProgressProps> = ({
  bordered,
  classNames,
  gapDegree = 0,
  gapPosition = 'bottom',
  id,
  percent = 0,
  steps,
  strokeColor = 'var(--progress-complete-background-color)',
  strokeLinecap = 'butt',
  strokeWidth = 1,
  style,
  trailColor = 'var(--progress-incomplete-background-color)',
  trailWidth = 1,
  ...rest
}) => {
  const mergedId: string = uniqueId(id ? `${id}-` : 'circle-');
  const gradientId: string = `${mergedId}-gradient`;
  const radius: number = VIEW_BOX_SIZE_RADIUS;
  const perimeter: number = Math.PI * SPLIT_NUMBER * radius;
  const rotateDeg: number =
    gapDegree > 0
      ? ROTATE_RIGHT_ANGLE_DEGREE + gapDegree / SPLIT_NUMBER
      : -ROTATE_RIGHT_ANGLE_DEGREE;
  const perimeterWithoutGap: number =
    perimeter * ((CIRCLE_DEGREE - gapDegree) / CIRCLE_DEGREE);
  const { count: stepCount, space: stepSpace } =
    typeof steps === 'object' ? steps : { count: steps, space: SPLIT_NUMBER };

  const circleStyle = getCircleStyle(
    gapDegree,
    gapPosition,
    0,
    MAX_PERCENT,
    perimeter,
    perimeterWithoutGap,
    rotateDeg,
    trailColor,
    strokeLinecap,
    strokeWidth
  );
  const percentList: number[] = toArray(percent);
  const strokeColorList: (string | Record<string, string>)[] =
    toArray(strokeColor);
  const gradient: string | Record<string, string> = strokeColorList.find(
    (color) => color && typeof color === 'object'
  );

  const paths: SVGPathElement[] = useTransitionDuration();

  const getStrokeList = (): JSX.Element[] => {
    let stackPtg: number = 0;
    return percentList
      .map((ptg: number, index: number) => {
        const color: string | Record<string, string> =
          strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        const stroke: string =
          color && typeof color === 'object'
            ? `url(#${gradientId})`
            : undefined;
        const circleStyleForStack = getCircleStyle(
          gapDegree,
          gapPosition,
          stackPtg,
          ptg,
          perimeter,
          perimeterWithoutGap,
          rotateDeg,
          color,
          strokeLinecap,
          strokeWidth
        );
        stackPtg += ptg;
        return (
          <circle
            key={index}
            className={styles.progressCirclePath}
            r={radius}
            cx={VIEW_BOX_SIZE_RADIUS}
            cy={VIEW_BOX_SIZE_RADIUS}
            stroke={stroke}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            opacity={ptg === 0 ? 0 : 1}
            style={circleStyleForStack}
            ref={(elem) => {
              // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
              // React will call the ref callback with the DOM element when the component mounts,
              // and call it with `null` when it unmounts.
              // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.

              paths[index] = elem;
            }}
          />
        );
      })
      .reverse();
  };

  const getStepStrokeList = (): JSX.Element[] => {
    // only show the first percent when pass steps
    const current: number = Math.round(
      stepCount * (percentList[0] / MAX_PERCENT)
    );
    const stepPtg: number = MAX_PERCENT / stepCount;

    let stackPtg: number = 0;
    return new Array(stepCount).fill(null).map((_, index) => {
      const color: string | Record<string, string> =
        index <= current - 1 ? strokeColorList[0] : trailColor;
      const stroke: string =
        color && typeof color === 'object' ? `url(#${gradientId})` : undefined;
      const circleStyleForStack = getCircleStyle(
        gapDegree,
        gapPosition,
        stackPtg,
        stepPtg,
        perimeter,
        perimeterWithoutGap,
        rotateDeg,
        color,
        'butt',
        strokeWidth,
        stepSpace
      );
      stackPtg +=
        ((perimeterWithoutGap -
          circleStyleForStack.strokeDashoffset +
          stepSpace) *
          MAX_PERCENT) /
        perimeterWithoutGap;

      return (
        <circle
          key={index}
          className={styles.progressCirclePath}
          r={radius}
          cx={VIEW_BOX_SIZE_RADIUS}
          cy={VIEW_BOX_SIZE_RADIUS}
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          opacity={1}
          style={circleStyleForStack}
          ref={(elem) => {
            paths[index] = elem;
          }}
        />
      );
    });
  };

  return (
    <svg
      className={styles.progressCircle}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      style={style}
      id={id}
      {...rest}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
            {Object.keys(gradient)
              .sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b))
              .map((key, index) => (
                <stop
                  key={index}
                  offset={key}
                  stopColor={(gradient as any)[key]}
                />
              ))}
          </linearGradient>
        </defs>
      )}
      {!stepCount && (
        <circle
          className={styles.progressCircleTrail}
          r={radius}
          cx={VIEW_BOX_SIZE_RADIUS}
          cy={VIEW_BOX_SIZE_RADIUS}
          stroke={trailColor}
          strokeLinecap={strokeLinecap}
          strokeWidth={trailWidth || strokeWidth}
          style={circleStyle}
        />
      )}
      {stepCount ? getStepStrokeList() : getStrokeList()}
    </svg>
  );
};

export default OcCircle;
