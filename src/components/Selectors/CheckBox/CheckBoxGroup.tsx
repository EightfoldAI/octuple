import React, { FC } from 'react';
import { CheckBoxProps } from '../index';
import { SelectorSize } from '../Selectors.types';
import { CheckBox } from './CheckBox';

export const CheckBoxGroup: FC<CheckBoxProps> = ({
    inputType = 'checkbox',
    items,
}) => {
    return (
        <div>
            {items.map((item) => (
                <CheckBox
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
