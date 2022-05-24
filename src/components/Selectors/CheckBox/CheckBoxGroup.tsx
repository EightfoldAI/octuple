import React, { FC } from 'react';
import { CheckBoxProps } from '../';
import { CheckBox } from './CheckBox';
import { generateId } from '../../../shared/utilities';

export const CheckBoxGroup: FC<CheckBoxProps> = ({
    defaultChecked = true,
    items,
    onChange,
}) => {
    return (
        <>
            {items.map((item, index) => (
                <CheckBox
                    ariaLabel={item.ariaLabel}
                    checked={item.checked ? item.checked : defaultChecked}
                    id={item.id || generateId()}
                    key={index}
                    name={item.name}
                    value={item.value}
                    onChange={onChange}
                />
            ))}
        </>
    );
};
