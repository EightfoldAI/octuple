import React, { useState } from 'react';
import { CheckBox, CheckBoxGroup } from '../index';
import { SelectorSize } from '../Selectors.types';
import { OcThemeNames } from '../../ConfigProvider';

export default {
    title: 'Check Box',
    component: CheckBox,
};

export const Box = () => {
    const [checkboxes, setCheckboxes] = useState({
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

    const updateCheckbox = (
        checkboxType: string,
        checkboxStyle: string = ''
    ) => {
        let checks = { ...checkboxes };
        if (checkboxStyle === '') checks[checkboxType] = !checks[checkboxType];
        else
            checks[checkboxType][checkboxStyle] =
                !checks[checkboxType][checkboxStyle];
        setCheckboxes(checks);
    };

    const updateCheckBoxGroup = (index: number) => {
        let group = [...checkboxGroupItems];
        group[index].checked = !group[index].checked;
        setCheckboxGroupItems(group);
    };

    const [checkboxGroupItems, setCheckboxGroupItems] = useState([
        {
            ariaLabel: 'button1',
            checked: true,
            id: 1,
            name: 'group',
            value: 'First',
            onClick: () => {
                updateCheckBoxGroup(0);
            },
        },
        {
            ariaLabel: 'button2',
            checked: true,
            id: 2,
            name: 'group',
            value: 'Second',
            onClick: () => {
                updateCheckBoxGroup(1);
            },
        },
        {
            ariaLabel: 'button3',
            checked: true,
            id: 3,
            name: 'group',
            value: 'Third',
            onClick: () => {
                updateCheckBoxGroup(2);
            },
        },
    ]);

    return (
        <>
            <h1>Check Boxes</h1>
            <h2>Default Check Box</h2>
            <CheckBox
                checked={checkboxes.default}
                onClick={() => {
                    updateCheckbox('default');
                }}
                size={SelectorSize.Medium}
            />
            <h2>Label Check Box</h2>
            <CheckBox
                checked={checkboxes.label}
                onClick={() => {
                    updateCheckbox('label');
                }}
                value="Label"
                size={SelectorSize.Medium}
            />
            <h2>Check Box Sizes</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                }}
            >
                <CheckBox
                    checked={checkboxes.sizes.small}
                    onClick={() => {
                        updateCheckbox('sizes', SelectorSize.Small);
                    }}
                    size={SelectorSize.Small}
                />
                <CheckBox
                    checked={checkboxes.sizes.medium}
                    onClick={() => {
                        updateCheckbox('sizes', SelectorSize.Medium);
                    }}
                    size={SelectorSize.Medium}
                />
                <CheckBox
                    checked={checkboxes.sizes.large}
                    onClick={() => {
                        updateCheckbox('sizes', SelectorSize.Large);
                    }}
                    size={SelectorSize.Large}
                />
            </div>
            <h2>Check Box Colors</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <CheckBox
                        checked={checkboxes.colors[theme]}
                        color={theme}
                        onClick={() => {
                            updateCheckbox('colors', theme);
                        }}
                        size={SelectorSize.Medium}
                    />
                ))}
            </div>
            <h2>Check Box Groups</h2>
            <CheckBoxGroup items={checkboxGroupItems} />
        </>
    );
};
