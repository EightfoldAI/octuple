import React, { FC } from 'react';
import { RadioButtonProps } from '../index';
import { SelectorSize } from '../Selectors.types';
import { RadioButton } from './RadioButton';

export const RadioGroup: FC<RadioButtonProps> = ({
    inputType = 'radio',
    items,
}) => {
    return (
        <div>
            {items.map((item) => (
                <RadioButton
                    ariaLabel={item.ariaLabel}
                    checked={item.checked}
                    color={item.color ? item.color : null}
                    id={item.id}
                    inputType={inputType}
                    name={item.name}
                    size={item.size ? item.size : SelectorSize.Medium}
                    value={item.value}
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
};
