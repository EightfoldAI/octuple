import React, { createContext, useState } from 'react';
import {
    RadioGroupContextProps,
    IRadioButtonsContext,
    RadioButtonChecked,
    SelectRadioButtonEvent,
} from '../Selectors.types';

const RadioGroupContext = createContext<Partial<IRadioButtonsContext>>({});

const RadioGroupProvider = ({
    children,
    onChange,
    activeRadioButton,
}: RadioGroupContextProps) => {
    const [currentRadioButton, setCurrentRadioButton] =
        useState<RadioButtonChecked>(activeRadioButton);

    const onRadioButtonClick = (
        value: RadioButtonChecked,
        e: SelectRadioButtonEvent
    ) => {
        setCurrentRadioButton(value);
        console.log(value);
        onChange(value, e);
    };

    return (
        <RadioGroupContext.Provider
            value={{ onRadioButtonClick, currentRadioButton }}
        >
            {children}
        </RadioGroupContext.Provider>
    );
};

const useRadioGroup = () => {
    const context = React.useContext(RadioGroupContext);
    if (context === undefined) {
        throw new Error('RadioButton component must be used within RadioGroup');
    }
    return context;
};

export { RadioGroupProvider, useRadioGroup };
