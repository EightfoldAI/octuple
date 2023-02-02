import React from 'react';
import { DirectionType } from '../ConfigProvider';

export const getOffset = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

export const getDirectionStyle = (
  direction: DirectionType,
  value: number,
  min: number,
  max: number
): React.CSSProperties => {
  const offset: number = getOffset(value, min, max);

  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offset * 100}%`;
      positionStyle.transform = 'translateX(50%)';
      break;

    default:
      positionStyle.left = `${offset * 100}%`;
      positionStyle.transform = 'translateX(-50%)';
      break;
  }

  return positionStyle;
};
