import React, { FC } from 'react';
import styles from './matchScore.module.scss';
import { classNames } from '../../shared/utilities';
import { MatchScoreProps } from './MatchScore.types';

export const MatchScore: FC<MatchScoreProps> = ({
    className,
    score = 0,
    total = 5,
    hideLabel = false,
}) => {
    const absTotal = Math.abs(total);
    const matchScoreClasses = classNames(className, styles.matchScoreContainer);
    return (
        <div className={matchScoreClasses}>
            {getArrayOfSize(Math.min(Math.floor(score), absTotal)).map(() => (
                <MatchScoreCircle fill="full" />
            ))}
            {Math.floor(score) !== score && <MatchScoreCircle fill="half" />}
            {getArrayOfSize(Math.max(Math.floor(absTotal - score), 0)).map(
                () => (
                    <MatchScoreCircle />
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

const MatchScoreCircle = ({
    fill = 'empty',
}: {
    fill?: 'empty' | 'full' | 'half';
}) => (
    <div
        className={`${styles.matchScoreCircle} ${
            fill === 'full' ? styles.full : ''
        }  ${fill === 'half' ? styles.half : ''}`}
    />
);
