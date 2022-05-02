import React, { FC } from 'react';
import styles from './matchScore.module.scss';
import { classNames } from '../../shared/utilities';
import { FillType, MatchScoreProps } from './MatchScore.types';

export const MatchScore: FC<MatchScoreProps> = ({
    className,
    score = 0,
    total = 5,
    hideLabel = false,
}) => {
    const absTotal = Math.abs(total);
    const matchScoreClasses = classNames(className, styles.matchScoreContainer);
    return (
        <div
            className={matchScoreClasses}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemax={total}
        >
            {getArrayOfSize(Math.min(Math.floor(score), absTotal)).map(
                (_val, index) => (
                    <MatchScoreCircle fill="full" key={index} />
                )
            )}
            {Math.floor(score) !== score && <MatchScoreCircle fill="half" />}
            {getArrayOfSize(Math.max(Math.floor(absTotal - score), 0)).map(
                (_val, index) => (
                    <MatchScoreCircle key={index} />
                )
            )}
            {!hideLabel && (
                <p className={styles.label}>
                    {score}/{absTotal}
                </p>
            )}
        </div>
    );
};

const getArrayOfSize = (n: number) => Array.from(Array(n));

const MatchScoreCircle = ({ fill = 'empty' }: { fill?: FillType }) => (
    <div
        className={classNames([
            styles.matchScoreCircle,
            { [styles.full]: fill === 'full' },
            { [styles.half]: fill === 'half' },
        ])}
    />
);
