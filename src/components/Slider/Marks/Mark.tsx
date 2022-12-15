import React from 'react';
import SliderContext from '../Context';
import { MarkProps } from '../Slider.types';
import { getDirectionStyle } from '../Util';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../slider.module.scss';

export default function Mark(props: MarkProps) {
  const { style, children, value, onClick } = props;
  const { direction, included, includedEnd, includedStart, min, max } =
    React.useContext(SliderContext);

  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      className={mergeClasses([
        styles.sliderMarkText,
        {
          [styles.sliderMarkTextActive]:
            included && includedStart <= value && value <= includedEnd,
        },
      ])}
      style={{
        ...positionStyle,
        ...style,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </span>
  );
}
