import React from 'react';
import Mark from './Mark';
import { MarksProps } from '../Slider.types';

import styles from '../slider.module.scss';

export default function Marks(props: MarksProps) {
    const { marks, onClick } = props;

    // Don't render mark if empty.
    if (!marks.length) {
        return null;
    }

    return (
        <div className={styles.sliderMark}>
            {marks.map(({ value, style, label }) => (
                <Mark key={value} style={style} value={value} onClick={onClick}>
                    {label}
                </Mark>
            ))}
        </div>
    );
}
