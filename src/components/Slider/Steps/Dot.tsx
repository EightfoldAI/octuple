import React from 'react';
import SliderContext from '../Context';
import { DotProps } from '../Slider.types';
import { getDirectionStyle } from '../Util';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../slider.module.scss';

export default function Dot(props: DotProps) {
  const { activeStyle, style, value } = props;
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
        { [styles.sliderDotActive]: active },
      ])}
      style={mergedStyle}
    />
  );
}
