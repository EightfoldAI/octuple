import React, { createContext, useEffect, useState } from 'react';
import {
  IRadioButtonsContext,
  RadioButtonValue,
  RadioGroupContextProps,
} from './Radio.types';

const RadioGroupContext = createContext<Partial<IRadioButtonsContext>>(null);

const RadioGroupProvider = ({
  children,
  onChange,
  value,
}: RadioGroupContextProps) => {
  return (
    <RadioGroupContext.Provider value={{ onChange, value }}>
      {children}
    </RadioGroupContext.Provider>
  );
};

const useRadioGroup = () => React.useContext(RadioGroupContext);

export { RadioGroupProvider, useRadioGroup };
