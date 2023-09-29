import React from 'react';
import SliderContext from '../Context';
import { StepsProps } from '../Slider.types';
import Dot from './Dot';

import styles from '../slider.module.scss';

export default function Steps(props: StepsProps) {
  const {
    activeStyle,
    classNames,
    dots,
    marks,
    style,
    trackStatus,
    type,
    visibleDots,
  } = props;
  const { min, max, step } = React.useContext(SliderContext);

  const stepDots = React.useMemo(() => {
    const dotSet: Set<number> = new Set<number>();

    // Add marks
    if (!visibleDots) {
      marks?.forEach((mark) => {
        dotSet.add(mark.value);
      });
    }

    // Fill dots
    if (dots && step !== null && !visibleDots) {
      let current: number = min;
      while (current <= max) {
        dotSet.add(current);
        current += step;
      }
    }

    // Discreet dots
    if (visibleDots?.length) {
      visibleDots.forEach((dot) => {
        dotSet.add(dot);
      });
    }
    return Array.from(dotSet);
  }, [min, max, step, dots, marks, visibleDots]);

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
