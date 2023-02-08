import React from 'react';
import SliderContext from '../Context';
import { StepsProps } from '../Slider.types';
import Dot from './Dot';

import styles from '../slider.module.scss';

export default function Steps(props: StepsProps) {
  const { activeStyle, classNames, dots, marks, style, trackStatus, type } =
    props;
  const { min, max, step } = React.useContext(SliderContext);

  const stepDots = React.useMemo(() => {
    const dotSet: Set<number> = new Set<number>();

    // Add marks
    marks.forEach((mark) => {
      dotSet.add(mark.value);
    });

    // Fill dots
    if (dots && step !== null) {
      let current: number = min;
      while (current <= max) {
        dotSet.add(current);
        current += step;
      }
    }

    return Array.from(dotSet);
  }, [min, max, step, dots, marks]);

  return (
    <div className={styles.sliderStep}>
      {stepDots.map((dotValue: number) => (
        <Dot
          activeStyle={activeStyle}
          classNames={classNames}
          key={dotValue}
          style={style}
          trackStatus={trackStatus}
          type={type}
          value={dotValue}
        />
      ))}
    </div>
  );
}
