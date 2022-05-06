import React, { FC } from 'react';
import { RadioButtonProps } from '../';
import { RadioGroupProvider } from './RadioGroup.context';
export const RadioGroup: FC<RadioButtonProps> = (props) => {
    const { activeRadioButton, onChange, children } = props;

    return (
        <RadioGroupProvider
            onChange={onChange}
            activeRadioButton={activeRadioButton}
        >
            <div>{children}</div>
        </RadioGroupProvider>
    );
};
