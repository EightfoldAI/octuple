import React from 'react';
import { DirectionType } from '../ConfigProvider';

export interface SliderContextProps {
  direction: DirectionType;
  disabled?: boolean;
  included?: boolean;
  includedEnd: number;
  includedStart: number;
  max: number;
  min: number;
  readOnly?: boolean;
  step: number | null;
}

const SliderContext = React.createContext<SliderContextProps>({
  direction: 'ltr',
  disabled: false,
  includedEnd: 0,
  includedStart: 0,
  max: 0,
  min: 0,
  readOnly: false,
  step: 1,
});

export default SliderContext;
