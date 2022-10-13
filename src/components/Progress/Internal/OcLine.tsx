import React, { FC } from 'react';
import type { OcProgressProps } from './OcProgress.types';
import { useTransitionDuration, defaultProps } from './Common';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../progress.module.scss';

const OcLine: FC<OcProgressProps> = ({
    classNames,
    percent,
    strokeColor,
    strokeLinecap,
    strokeWidth,
    style,
    trailColor,
    trailWidth,
    transition,
    ...rest
}) => {
    // eslint-disable-next-line no-param-reassign
    delete rest.gapPosition;

    const percentList = Array.isArray(percent) ? percent : [percent];
    const strokeColorList = Array.isArray(strokeColor)
        ? strokeColor
        : [strokeColor];

    const paths = useTransitionDuration();

    const center = strokeWidth / 2;
    const right = 100 - strokeWidth / 2;
    const pathString = `M ${strokeLinecap === 'round' ? center : 0},${center}
         L ${strokeLinecap === 'round' ? right : 100},${center}`;
    const viewBoxString = `0 0 100 ${strokeWidth}`;
    let stackPtg = 0;
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
                        dashPercent = 1 - strokeWidth / 100;
                        break;
                    case 'square':
                        dashPercent = 1 - strokeWidth / 2 / 100;
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
                    strokeColorList[index] ||
                    strokeColorList[strokeColorList.length - 1];
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

OcLine.defaultProps = defaultProps;

export default OcLine;
