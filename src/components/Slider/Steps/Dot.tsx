import React from 'react';
import SliderContext from '../Context';
import { DotProps, SliderTrackColor } from '../Slider.types';
import { getDirectionStyle } from '../Util';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../slider.module.scss';

export default function Dot(props: DotProps) {
  const { activeStyle, classNames, style, trackColor, type, value } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const active: boolean =
    included && includedStart <= value && value <= includedEnd;

  let mergedStyle = {
    ...getDirectionStyle(direction, value, min, max),
    ...(typeof style === 'function' ? style(value) : style),
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
    };
  }

  return (
    <span
      className={mergeClasses([
        styles.sliderDot,
        {
          [styles.data]: type === 'data',
        },
        {
          [styles.green]: !!trackColor && trackColor === SliderTrackColor.Green,
        },
        {
          [styles.orange]:
            !!trackColor && trackColor === SliderTrackColor.Orange,
        },
        {
          [styles.red]: !!trackColor && trackColor === SliderTrackColor.Red,
        },
        { [styles.sliderDotActive]: active },
        classNames,
      ])}
      style={mergedStyle}
    />
  );
}
