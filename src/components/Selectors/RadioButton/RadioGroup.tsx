import React, { FC, useState, useEffect } from 'react';
import { RadioButtonProps } from '../index';
import { RadioButton } from './RadioButton';

export const RadioGroup: FC<RadioButtonProps> = ({
    defaultSelected = false,
    items,
    onChange,
}) => {
    const [radioGroupItems, setRadioGroupItems] = useState(items);
    const updateRadioGroup = (index: number) => {
        let group = [...radioGroupItems];
        group[index].checked = true;
        group.forEach((item, idx) => {
            if (index !== idx) item.checked = false;
        });
        setRadioGroupItems(group);
    };

    const renderRadioGroup = () =>
        radioGroupItems.map((item, index) => {
            return (
                <RadioButton
                    ariaLabel={item.ariaLabel ? item.ariaLabel : ''}
                    checked={item.checked ? item.checked : defaultSelected}
                    color={item.color ? item.color : ''}
                    id={item.id ? item.id : ''}
                    index={index}
                    forRadioGroup={true}
                    key={index}
                    name={item.name}
                    value={item.value}
                    onChange={onChange}
                    updateRadioGroup={() => updateRadioGroup(index)}
                />
            );
        });
    return <div>{renderRadioGroup()}</div>;
};
