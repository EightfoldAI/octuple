import React from 'react';
import { CheckBox, CheckBoxGroup } from '../index';

export default {
    title: 'Check Box',
    component: CheckBox,
};

export const Box = () => {
    const checkboxGroupItems = [
        {
            checked: true,
            name: 'group',
            value: 'First',
        },
        {
            checked: true,
            name: 'group',
            value: 'Second',
        },
        {
            checked: true,
            name: 'group',
            value: 'Third',
        },
    ];

    return (
        <>
            <h1>Check Boxes</h1>
            <h2>Default Check Box</h2>
            <CheckBox checked={true} />
            <h2>Label Check Box</h2>
            <CheckBox checked={true} value="Label" />
            <h2>Check Box Groups</h2>
            <CheckBoxGroup items={checkboxGroupItems} />
        </>
    );
};
