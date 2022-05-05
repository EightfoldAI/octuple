import React, { FC, Ref } from 'react';
import styles from './matchScore.module.scss';
import { FillType, MatchScoreProps } from './MatchScore.types';
import { Atom } from '../Atom';

export const MatchScore: FC<MatchScoreProps> = React.forwardRef(
    (
        {
            classNames,
            score = 0,
            total = 5,
            hideLabel = false,
            ariaLabel = 'score',
            ...rest
        },
        ref
    ) => {
        const absTotal: number = Math.abs(total);
        return (
            <Atom<HTMLDivElement>
                {...rest}
                aria-label={ariaLabel}
                of="div"
                ref={ref}
                classes={[classNames, styles.matchScoreContainer]}
            >
                {getArrayOfSize(Math.min(Math.floor(score), absTotal)).map(
                    (_val, index) => (
                        <MatchScoreCircle fill="full" key={index} />
                    )
                )}
                {Math.floor(score) !== score && (
                    <MatchScoreCircle fill="half" />
                )}
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
            </Atom>
        );
    }
);

const getArrayOfSize = (n: number) => Array.from(Array(n));

const MatchScoreCircle = ({ fill = 'empty' }: { fill?: FillType }) => (
    <Atom
        of="div"
        classes={[
            styles.matchScoreCircle,
            { [styles.full]: fill === 'full' },
            { [styles.half]: fill === 'half' },
        ]}
    />
);
