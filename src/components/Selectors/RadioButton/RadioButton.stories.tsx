import React from 'react';
import { RadioButton, RadioGroup } from '../index';

export default {
    title: 'Radio Button',
    component: RadioButton,
};

export const Radio = () => {
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
            <h2>Radio Button Groups</h2>
            <RadioGroup items={radioGroupItems} />
        </>
    );
};
