import React, { FC, useEffect, useState } from 'react';
import { RadioButton, RadioButtonProps } from '../';
import { RadioGroupProvider } from './RadioGroup.context';
import { generateId } from '../../../shared/utilities';

export const RadioGroup: FC<RadioButtonProps> = (props) => {
    let { activeRadioButton, onChange, radioGroupItems } = props;
    const [radioGroupValues, setRadioGroupValues] = useState([]);
    const [radioIndex, setRadioIndex] = useState(0);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        let indexOfRadio = radioIndex;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            if (indexOfRadio + 2 > radioGroupValues.length) indexOfRadio = 0;
            else indexOfRadio++;
            activeRadioButton = radioGroupValues[indexOfRadio];
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            if (indexOfRadio - 1 < 0)
                indexOfRadio = radioGroupValues.length - 1;
            else indexOfRadio--;
            activeRadioButton = radioGroupValues[indexOfRadio];
        }
        setRadioIndex(indexOfRadio);
        const radioOnFocus = document.getElementById(
            `${radioGroupItems[indexOfRadio].id}-custom-radio`
        );
        radioOnFocus.focus();
        radioOnFocus.tabIndex = 0;
        radioGroupItems.forEach((item: RadioButtonProps, idx: number) => {
            if (idx !== indexOfRadio) {
                const currentRadio = document.getElementById(
                    `${item.id}-custom-radio`
                );
                currentRadio.tabIndex = -1;
            }
        });
    };

    const getRadioGroupValues = () => {
        let radioGroupValues: (string | number)[] = [];
        radioGroupItems.map((item: RadioButtonProps) => {
            radioGroupValues.push(item.value);
            item.id = item.id || generateId();
        });
        return radioGroupValues;
    };

    const setActiveRadioButton = (value: string | number) => {
        activeRadioButton = value;
        const index = radioGroupValues.indexOf(activeRadioButton);
        setRadioIndex(index >= 0 ? index : 0);
    };

    useEffect(() => {
        const index = radioGroupValues.indexOf(activeRadioButton);
        setRadioGroupValues(getRadioGroupValues());
        setRadioIndex(index >= 0 ? index : 0);
    }, [activeRadioButton]);

    return (
        <RadioGroupProvider
            onChange={onChange}
            activeRadioButton={radioGroupValues[radioIndex]}
        >
            <div onKeyDown={handleKeyDown}>
                {radioGroupItems.map((item: RadioButtonProps) => (
                    <RadioButton
                        key={item.value}
                        {...item}
                        activeRadioButton={radioGroupValues[radioIndex]}
                        setActiveRadioButton={setActiveRadioButton}
                    />
                ))}
            </div>
        </RadioGroupProvider>
    );
};
