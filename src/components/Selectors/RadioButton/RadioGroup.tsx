import React, { FC, useEffect, useState } from 'react';
import { RadioButton, RadioButtonProps } from '../';
import { RadioGroupProvider } from './RadioGroup.context';

export const RadioGroup: FC<RadioButtonProps> = (props) => {
    let { activeRadioButton, onChange, radioGroupItems } = props;
    const [radioGroupValues, setRadioGroupValues] = useState([]);
    const [radioIndex, setRadioIndex] = useState(0);
    const [tabClicked, setTabClicked] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        let indexOfRadio = radioIndex;
        if (event.key === 'Tab') setTabClicked(true);
        if (tabClicked) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                if (indexOfRadio + 2 > radioGroupValues.length)
                    indexOfRadio = 0;
                else indexOfRadio++;
                activeRadioButton = radioGroupValues[indexOfRadio];
            }
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                if (indexOfRadio - 1 < 0)
                    indexOfRadio = radioGroupValues.length - 1;
                else indexOfRadio--;
                activeRadioButton = radioGroupValues[indexOfRadio];
            }
        }
        setRadioIndex(indexOfRadio);
    };

    const getRadioGroupValues = () => {
        let radioGroupValues: (string | number)[] = [];
        radioGroupItems.map((item: RadioButtonProps) => {
            radioGroupValues.push(item.value);
        });
        return radioGroupValues;
    };

    useEffect(() => {
        const index = radioGroupValues.indexOf(activeRadioButton);
        setRadioGroupValues(getRadioGroupValues());
        setRadioIndex(index >= 0 ? index : 0);
    }, []);

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
                    />
                ))}
            </div>
        </RadioGroupProvider>
    );
};
