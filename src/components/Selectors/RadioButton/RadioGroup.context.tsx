import React, { createContext, useState } from 'react';
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
    const [currentGroupValue, setCurrentGroupValue] =
        useState<RadioButtonValue>(value);

    const onGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentGroupValue(e.target.value);
        onChange?.(e);
    };

    return (
        <RadioGroupContext.Provider
            value={{ onChange: onGroupChange, value: currentGroupValue }}
        >
            {children}
        </RadioGroupContext.Provider>
    );
};

const useRadioGroup = () => React.useContext(RadioGroupContext);

export { RadioGroupProvider, useRadioGroup };
