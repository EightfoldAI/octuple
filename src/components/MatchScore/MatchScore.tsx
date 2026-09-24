'use client';

import React, { FC, Ref, useContext } from 'react';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { Atom } from '../Atom';
import { FillType, MatchScoreProps } from './MatchScore.types';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';

import styles from './matchScore.module.scss';
import themedComponentStyles from './matchScore.theme.module.scss';

const DEFAULT_SCORE = 0;
const DEFAULT_TOTAL = 5;

export const MatchScore: FC<MatchScoreProps> = React.forwardRef(
  (
    {
      ariaLabel = 'score',
      classNames,
      configContextProps = {
        noThemeContext: false,
      },
      hideLabel = false,
      hideValues = false,
      label,
      score = DEFAULT_SCORE,
      theme,
      themeContainerId,
      total = DEFAULT_TOTAL,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    const safeTotal: number = Number.isFinite(total) ? total : DEFAULT_TOTAL;
    const absTotal: number = Math.trunc(Math.abs(safeTotal));
    const safeScore: number = Number.isFinite(score) ? score : DEFAULT_SCORE;
    const clampedScore: number = Math.max(0, Math.min(safeScore, absTotal));
    const displayScore: number = Math.round(clampedScore);
    const fullCircles: number = Math.trunc(
      Math.round(clampedScore * 2.0) / 2.0
    );
    const halfCircle: number = Math.trunc(
      Math.ceil(clampedScore - fullCircles - 0.25)
    );
    const emptyCircles: number = absTotal - fullCircles - halfCircle;
    const matchScoreLabelClasses: string = mergeClasses(styles.label);

    return (
      <ThemeContextProvider
        componentClassName={themedComponentStyles.theme}
        containerId={themeContainerId}
        theme={mergedTheme}
      >
        <Atom<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
          of="div"
          {...rest}
          ref={ref}
          classes={[
            classNames,
            styles.matchScoreContainer,
            { [themedComponentStyles.theme]: mergedTheme },
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
              {label} {!hideValues && displayScore + '/' + absTotal}
            </p>
          )}
        </Atom>
      </ThemeContextProvider>
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
