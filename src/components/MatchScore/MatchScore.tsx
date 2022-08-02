import React, { FC, Ref } from 'react';
import styles from './matchScore.module.scss';
import { mergeClasses } from '../../shared/utilities';
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
        ref: Ref<HTMLDivElement>
    ) => {
        const absTotal: number = Math.abs(total);
        const absScore: number = Math.round(score);
        const fullCircles: number = Math.trunc(Math.round(score * 2.0) / 2.0);
        const halfCircle: number = Math.trunc(
            Math.ceil(score - fullCircles - 0.25)
        );
        const emptyCircles: number = total - fullCircles - halfCircle;
        const matchScoreLabelClasses = mergeClasses(styles.label, 'body2');

        return (
            <Atom<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
                of="div"
                {...rest}
                ref={ref}
                classes={[classNames, styles.matchScoreContainer]}
                aria-label={ariaLabel}
            >
                {/* Full */}
                {getArrayOfSize(fullCircles).map((_val, index) => (
                    <MatchScoreCircle fill="full" key={index} />
                ))}

                {/* Half */}
                {!!halfCircle && <MatchScoreCircle fill="half" />}

                {/* Remaining empty circles */}
                {getArrayOfSize(emptyCircles).map((_val, index) => (
                    <MatchScoreCircle key={index} />
                ))}

                {!hideLabel && (
                    <p className={matchScoreLabelClasses}>
                        {absScore}/{absTotal}
                    </p>
                )}
            </Atom>
        );
    }
);

const getArrayOfSize = (n: number) => Array.from(Array(n));

const MatchScoreCircle = ({ fill = 'empty' }: { fill?: FillType }) => (
    <div
        className={mergeClasses([
            styles.matchScoreCircle,
            { [styles.full]: fill === 'full' },
            { [styles.half]: fill === 'half' },
        ])}
    />
);
