import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { SliderProps } from './Slider.types';

import styles from './slider.module.scss';

export const Slider: FC<SliderProps> = ({ value, min = 0, max = 100 }) => {
    const [val, setVal] = useState(value);
    const valRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        () => Math.round((val / max) * 100),
        [val, max]
    );

    useEffect(() => {
        if (valRef.current) {
            const percent = getPercent();

            if (range.current) {
                range.current.style.left = `0`;
                range.current.style.width = `${percent}%`;
            }
        }
    }, [getPercent]);

    return (
        <div className={styles.sliderContainer}>
            <input
                type="range"
                min={min}
                max={max}
                value={val}
                ref={valRef}
                onChange={(event) => {
                    setVal(+event.target.value);
                }}
                className={styles.thumb}
            />

            <div className={styles.slider}>
                <div className={styles.sliderTrack} />
                <div ref={range} className={styles.sliderRange} />
                <div className={styles.sliderValue}>{val}</div>
            </div>
        </div>
    );
};
