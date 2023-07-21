import React, { FC } from 'react';
import OcCircle, { VIEW_BOX_SIZE } from './Internal/OcCircle';
import { CircleProps } from './Progress.types';
import { getSuccessPercent, validProgress } from './Utils';
import { mergeClasses } from '../../shared/utilities';

import styles from './progress.module.scss';

const DEFAULT_CIRCLE_SIZE: number = 120;
const DEFAULT_GAP_DEGREE: number = 75;
const DEFAULT_STROKE_WIDTH_DIVISOR: number = 1.6;
const FAlLBACK_STROKE_WIDTH: number = 4;
const FONT_SIZE_FLOAT: number = 0.15;

function getPercentage({ percent, success }: CircleProps): number[] {
  const realSuccessPercent = validProgress(getSuccessPercent({ success }));
  return [
    realSuccessPercent,
    validProgress(validProgress(percent) - realSuccessPercent),
  ];
}

function getStrokeColor({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<string, string>)[] {
  const { strokeColor: successColor } = success;
  return [
    successColor || 'var(--progress-success-background-color)',
    strokeColor || null!,
  ];
}

const Circle: FC<CircleProps> = (props) => {
  const {
    bordered,
    children,
    gapDegree,
    gapPosition,
    strokeLinecap = 'butt',
    strokeWidth = VIEW_BOX_SIZE / DEFAULT_STROKE_WIDTH_DIVISOR,
    success,
    trailColor = null,
    type,
    width,
  } = props;

  const circleSize: number = width || DEFAULT_CIRCLE_SIZE;
  const circleStyle: React.CSSProperties = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * FONT_SIZE_FLOAT + FAlLBACK_STROKE_WIDTH,
  };
  const circleWidth: number = strokeWidth || FAlLBACK_STROKE_WIDTH;
  const gapPos: 'top' | 'bottom' | 'left' | 'right' =
    gapPosition || (type === 'dashboard' && 'bottom') || undefined;

  const getGapDegree = (): number => {
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return DEFAULT_GAP_DEGREE;
    }
    return undefined;
  };

  const isGradient: boolean =
    Object.prototype.toString.call(props.strokeColor) === '[object Object]';
  const strokeColor: (string | Record<string, string>)[] = getStrokeColor({
    success,
    strokeColor: props.strokeColor,
  });

  const wrapperClassNames: string = mergeClasses([
    styles.progressInner,
    { [styles.progressCircleGradient]: isGradient },
  ]);

  return (
    <div className={wrapperClassNames} style={circleStyle}>
      <OcCircle
        bordered={bordered}
        gapDegree={getGapDegree()}
        gapPosition={gapPos}
        percent={getPercentage(props)}
        strokeColor={strokeColor}
        strokeLinecap={strokeLinecap}
        strokeWidth={circleWidth}
        trailColor={trailColor}
        trailWidth={circleWidth}
      />
      {children}
    </div>
  );
};

export default Circle;
