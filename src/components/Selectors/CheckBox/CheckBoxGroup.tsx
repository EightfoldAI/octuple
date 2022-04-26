import React, { FC } from 'react';
import { CheckBoxProps } from '../index';
import { CheckBox } from './CheckBox';

export const CheckBoxGroup: FC<CheckBoxProps> = ({
    defaultChecked = true,
    items,
    onChange,
}) => {
    return (
        <div>
            {items.map((item, index) => (
                <CheckBox
                    ariaLabel={item.ariaLabel}
                    checked={item.checked ? item.checked : defaultChecked}
                    color={item.color ? item.color : null}
                    id={item.id}
                    key={index}
                    name={item.name}
                    value={item.value}
                    onChange={onChange}
                />
            ))}
        </div>
    );
};
