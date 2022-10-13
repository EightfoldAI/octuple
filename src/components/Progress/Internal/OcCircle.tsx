import React, { FC } from 'react';
import { defaultProps, useTransitionDuration } from './Common';
import type { OcProgressProps } from './OcProgress.types';
import useId from './hooks/useId';
import { mergeClasses } from '../../../shared/utilities';
import styles from '../progress.module.scss';

function stripPercentToNumber(percent: string): number {
    return +percent.replace('%', '');
}

function toArray<T>(value: T | T[]): T[] {
    const mergedValue = value ?? [];
    return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

export const VIEW_BOX_SIZE: number = 100;

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
    const offsetDeg: number = (offset / 100) * 360 * ((360 - gapDegree) / 360);
    const positionDeg: number =
        gapDegree === 0
            ? 0
            : {
                  bottom: 0,
                  top: 180,
                  left: 90,
                  right: -90,
              }[gapPosition];

    let strokeDashoffset: number =
        ((100 - percent) / 100) * perimeterWithoutGap;
    // Fix percent accuracy when strokeLinecap is round
    if (strokeLinecap === 'round' && percent !== 100) {
        strokeDashoffset += strokeWidth / 2;
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
    classNames,
    gapDegree = 0,
    gapPosition,
    id,
    percent,
    steps,
    strokeColor,
    strokeLinecap,
    strokeWidth,
    style,
    trailColor,
    trailWidth,
    ...rest
}) => {
    const mergedId: string = useId(id);
    const gradientId: string = `${mergedId}-gradient`;
    const radius: number = VIEW_BOX_SIZE / 2;
    const perimeter: number = Math.PI * 2 * radius;
    const rotateDeg: number = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
    const perimeterWithoutGap: number = perimeter * ((360 - gapDegree) / 360);
    const { count: stepCount, space: stepSpace } =
        typeof steps === 'object' ? steps : { count: steps, space: 2 };

    const circleStyle = getCircleStyle(
        gapDegree,
        gapPosition,
        0,
        100,
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
                    strokeColorList[index] ||
                    strokeColorList[strokeColorList.length - 1];
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
                        cx={VIEW_BOX_SIZE / 2}
                        cy={VIEW_BOX_SIZE / 2}
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
        const current: number = Math.round(stepCount * (percentList[0] / 100));
        const stepPtg: number = 100 / stepCount;

        let stackPtg: number = 0;
        return new Array(stepCount).fill(null).map((_, index) => {
            const color: string | Record<string, string> =
                index <= current - 1 ? strokeColorList[0] : trailColor;
            const stroke: string =
                color && typeof color === 'object'
                    ? `url(#${gradientId})`
                    : undefined;
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
                    100) /
                perimeterWithoutGap;

            return (
                <circle
                    key={index}
                    className={styles.progressCirclePath}
                    r={radius}
                    cx={VIEW_BOX_SIZE / 2}
                    cy={VIEW_BOX_SIZE / 2}
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
            className={mergeClasses([styles.progressCircle, classNames])}
            viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
            style={style}
            id={id}
            {...rest}
        >
            {gradient && (
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                    >
                        {Object.keys(gradient)
                            .sort(
                                (a, b) =>
                                    stripPercentToNumber(a) -
                                    stripPercentToNumber(b)
                            )
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
                    cx={VIEW_BOX_SIZE / 2}
                    cy={VIEW_BOX_SIZE / 2}
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

OcCircle.defaultProps = defaultProps;

export default OcCircle;
