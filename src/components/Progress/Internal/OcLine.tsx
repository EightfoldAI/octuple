import React, { FC } from 'react';
import type { BaseStrokeColorType, OcProgressProps } from './OcProgress.types';
import { MAX_PERCENT, useTransitionDuration } from './Common';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../progress.module.scss';

const OcLine: FC<OcProgressProps> = ({
  classNames,
  percent = 0,
  strokeColor = 'var(--progress-complete-background-color)',
  strokeLinecap = 'round',
  strokeWidth = 1,
  style,
  trailColor = 'var(--progress-incomplete-background-color)',
  trailWidth = 1,
  transition,
  ...rest
}) => {
  const percentList: number[] = Array.isArray(percent) ? percent : [percent];
  const strokeColorList: BaseStrokeColorType[] = Array.isArray(strokeColor)
    ? strokeColor
    : [strokeColor];
  const paths: SVGPathElement[] = useTransitionDuration();
  const center: number = strokeWidth / 2;
  const right: number = MAX_PERCENT - strokeWidth / 2;
  const pathString: string = `M ${
    strokeLinecap === 'round' ? center : 0
  },${center}
         L ${strokeLinecap === 'round' ? right : MAX_PERCENT},${center}`;
  const viewBoxString: string = `0 0 100 ${strokeWidth}`;

  let stackPtg: number = 0;

  return (
    <svg
      className={mergeClasses([styles.progressLine, classNames])}
      viewBox={viewBoxString}
      preserveAspectRatio="none"
      style={style}
      {...rest}
    >
      <path
        className={'progress-line-trail'}
        d={pathString}
        strokeLinecap={strokeLinecap}
        stroke={trailColor}
        strokeWidth={trailWidth || strokeWidth}
        fillOpacity="0"
      />
      {percentList.map((ptg, index) => {
        let dashPercent = 1;
        switch (strokeLinecap) {
          case 'round':
            dashPercent = 1 - strokeWidth / MAX_PERCENT;
            break;
          case 'square':
            dashPercent = 1 - strokeWidth / 2 / MAX_PERCENT;
            break;
          default:
            dashPercent = 1;
            break;
        }
        const pathStyle = {
          strokeDasharray: `${ptg * dashPercent}px, 100px`,
          strokeDashoffset: `-${stackPtg}px`,
          transition:
            transition ||
            'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
        };
        const color =
          strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        stackPtg += ptg;
        return (
          <path
            key={index}
            className={'progress-line-path'}
            d={pathString}
            strokeLinecap={strokeLinecap}
            stroke={color as string}
            strokeWidth={strokeWidth}
            fillOpacity="0"
            ref={(elem) => {
              // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
              // React will call the ref callback with the DOM element when the component mounts,
              // and call it with `null` when it unmounts.
              // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.

              paths[index] = elem;
            }}
            style={pathStyle}
          />
        );
      })}
    </svg>
  );
};

export default OcLine;
