import React, { FC, Ref } from 'react';
import styles from './matchScore.module.scss';
import { mergeClasses } from '../../shared/utilities';
import { FillType, MatchScoreProps } from './MatchScore.types';
import { Atom } from '../Atom';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

export const MatchScore: FC<MatchScoreProps> = React.forwardRef(
    (
        {
            ariaLabel = 'score',
            classNames,
            hideLabel = false,
            hideValues = false,
            label,
            score = 0,
            total = 5,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const htmlDir: string = useCanvasDirection();

        const absTotal: number = Math.abs(total);
        const absScore: number = Math.round(score);
        const fullCircles: number = Math.trunc(Math.round(score * 2.0) / 2.0);
        const halfCircle: number = Math.trunc(
            Math.ceil(score - fullCircles - 0.25)
        );
        const emptyCircles: number = total - fullCircles - halfCircle;
        const matchScoreLabelClasses: string = mergeClasses(styles.label);

        return (
            <Atom<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
                of="div"
                {...rest}
                ref={ref}
                classes={[
                    classNames,
                    styles.matchScoreContainer,
                    { [styles.matchScoreContainerRtl]: htmlDir === 'rtl' },
                ]}
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
                        {label} {!hideValues && absScore + '/' + absTotal}
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
