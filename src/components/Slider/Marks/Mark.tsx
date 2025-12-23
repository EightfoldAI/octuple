import React from 'react';
import SliderContext from '../Context';
import { MarkProps } from '../Slider.types';
import { getDirectionStyle } from '../Util';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../slider.module.scss';

export default function Mark(props: MarkProps) {
  const { children, classNames, onClick, style, value } = props;
  const {
    direction,
    disabled,
    included,
    includedEnd,
    includedStart,
    min,
    max,
    readOnly,
  } = React.useContext(SliderContext);

  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      className={mergeClasses([
        styles.sliderMarkText,
        {
          [styles.sliderMarkTextActive]:
            included && includedStart <= value && value <= includedEnd,
        },
        classNames,
      ])}
      style={{
        ...positionStyle,
        ...style,
      }}
      tabIndex={readOnly || disabled ? -1 : undefined}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        onClick?.(value);
      }}
    >
      {children}
    </span>
  );
}
