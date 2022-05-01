import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { SliderProps } from './Slider.types';

import styles from './slider.module.scss';

export const Slider: FC<SliderProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    disabled = false,
    id,
    name,
    min = 0,
    max = 100,
    showValue = true,
    value,
}) => {
    const [val, setVal] = useState(value);
    const valRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        () => Math.round((val / max) * 100),
        [val, max]
    );

    function containerClasses(): string {
        let classes = [styles.sliderContainer];
        if (disabled) {
            classes.push(styles.sliderDisabled);
        }
        return classes.join(' ');
    }

    useEffect(() => {
        if (valRef.current) {
            const percent = getPercent();

            if (range.current) {
                range.current.style.left = '0';
                range.current.style.width = `${percent}%`;
            }
        }
    }, [getPercent]);

    return (
        <div className={containerClasses()}>
            <div className={styles.slider}>
                <div className={styles.sliderTrack} />
                <div ref={range} className={styles.sliderRange} />
                <input
                    aria-label={ariaLabel}
                    aria-disabled={allowDisabledFocus}
                    autoFocus={autoFocus}
                    className={styles.thumb}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={(event) => {
                        setVal(+event.target.value);
                    }}
                    min={min}
                    max={max}
                    ref={valRef}
                    type="range"
                    value={val}
                />
            </div>
            {showValue && <div className={styles.sliderValue}>{val}</div>}
        </div>
    );
};
