import React, { useState } from 'react';
import { RadioButton, RadioGroup } from '../index';
import { OcThemeNames } from '../../ConfigProvider';

export default {
    title: 'Radio Button',
    component: RadioButton,
};

export const Radio = () => {
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

    const radioGroupItems = [
        {
            checked: true,
            name: 'group',
            value: 'First',
        },
        {
            name: 'group',
            value: 'Second',
        },
        {
            name: 'group',
            value: 'Third',
        },
    ];

    return (
        <>
            <h1>Radio Buttons</h1>
            <h2>Default Radio Button</h2>
            <RadioButton checked={true} />
            <h2>Label Radio Button</h2>
            <RadioButton checked={true} value="Label" />
            <h2>Radio Button Colors</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <RadioButton checked={true} color={theme} />
                ))}
            </div>
            <h2>Radio Button Groups</h2>
            <RadioGroup items={radioGroupItems} />
        </>
    );
};
