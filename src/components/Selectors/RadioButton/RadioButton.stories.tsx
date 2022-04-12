import React, { useState } from 'react';
import { RadioButton, RadioGroup } from '../index';
import { SelectorSize } from '../Selectors.types';
import { OcThemeNames } from '../../ConfigProvider';

export default {
    title: 'Radio Button',
    component: RadioButton,
};

export const Radio = () => {
    const [radioButtons, setRadioButtons] = useState({
        default: true,
        label: true,
        sizes: {
            small: true,
            medium: true,
            large: true,
        },
        colors: {
            red: true,
            orange: true,
            yellow: true,
            green: true,
            bluegreen: true,
            blue: true,
            violet: true,
            grey: true,
        },
    });

    const themes: OcThemeNames[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'bluegreen',
        'blue',
        'violet',
        'grey',
    ];

    const updateRadioButton = (
        radioButtonType: string,
        radioButtonStyle: string = ''
    ) => {
        let radios = { ...radioButtons };
        if (radioButtonStyle === '')
            radios[radioButtonType] = !radios[radioButtonType];
        else
            radios[radioButtonType][radioButtonStyle] =
                !radios[radioButtonType][radioButtonStyle];
        setRadioButtons(radios);
    };

    const updateRadioButtonGroup = (index: number) => {
        let group = [...radioGroupItems];
        group[index].checked = true;
        group.forEach((item, idx) => {
            if (index !== idx) item.checked = false;
        });
        setRadioGroupItems(group);
    };

    const [radioGroupItems, setRadioGroupItems] = useState([
        {
            ariaLabel: 'button1',
            checked: true,
            id: 1,
            name: 'group',
            value: 'First',
            onClick: () => {
                updateRadioButtonGroup(0);
            },
        },
        {
            ariaLabel: 'button2',
            checked: false,
            id: 2,
            name: 'group',
            value: 'Second',
            onClick: () => {
                updateRadioButtonGroup(1);
            },
        },
        {
            ariaLabel: 'button3',
            checked: false,
            id: 3,
            name: 'group',
            value: 'Third',
            onClick: () => {
                updateRadioButtonGroup(2);
            },
        },
    ]);

    return (
        <>
            <h1>Radio Buttons</h1>
            <h2>Default Radio Button</h2>
            <RadioButton
                checked={radioButtons.default}
                onClick={() => {
                    updateRadioButton('default');
                }}
            />
            <h2>Label Radio Button</h2>
            <RadioButton
                checked={radioButtons.label}
                onClick={() => {
                    updateRadioButton('label');
                }}
                value="Label"
            />
            <h2>Radio Button Sizes</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                }}
            >
                <RadioButton
                    checked={radioButtons.sizes.small}
                    onClick={() => {
                        updateRadioButton('sizes', SelectorSize.Small);
                    }}
                    size={SelectorSize.Small}
                />
                <RadioButton
                    checked={radioButtons.sizes.medium}
                    onClick={() => {
                        updateRadioButton('sizes', SelectorSize.Medium);
                    }}
                    size={SelectorSize.Medium}
                />
                <RadioButton
                    checked={radioButtons.sizes.large}
                    onClick={() => {
                        updateRadioButton('sizes', SelectorSize.Large);
                    }}
                    size={SelectorSize.Large}
                />
            </div>
            <h2>Radio Button Colors</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <RadioButton
                        checked={radioButtons.colors[theme]}
                        color={theme}
                        onClick={() => {
                            updateRadioButton('colors', theme);
                        }}
                        size={SelectorSize.Medium}
                    />
                ))}
            </div>
            <h2>Radio Button Groups</h2>
            <RadioGroup items={radioGroupItems} />
        </>
    );
};
