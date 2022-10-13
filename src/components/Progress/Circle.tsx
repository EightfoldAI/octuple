import React, { FC } from 'react';
import OcCircle, { VIEW_BOX_SIZE } from './Internal/OcCircle';
import { CircleProps } from './Progress.types';
import { getSuccessPercent, validProgress } from './Utils';
import { mergeClasses } from '../../shared/utilities';

import styles from './progress.module.scss';

function getPercentage({ percent, success }: CircleProps) {
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
    return [successColor || 'var(--success-color)', strokeColor || null!];
}

const Circle: FC<CircleProps> = (props) => {
    const {
        children,
        gapDegree,
        gapPosition,
        strokeLinecap = 'butt',
        strokeWidth = VIEW_BOX_SIZE / 1.6,
        success,
        trailColor = null as any,
        type,
        width,
    } = props;

    const circleSize = width || 120;
    const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.15 + 4,
    } as React.CSSProperties;
    const circleWidth = strokeWidth || 4;
    const gapPos =
        gapPosition || (type === 'dashboard' && 'bottom') || undefined;

    const getGapDegree = () => {
        // Support gapDeg = 0 when type = 'dashboard'
        if (gapDegree || gapDegree === 0) {
            return gapDegree;
        }
        if (type === 'dashboard') {
            return 75;
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
