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
            id: 'test-1',
        },
        {
            checked: true,
            name: 'group',
            value: 'Second',
            id: 'test-2',
        },
        {
            checked: true,
            name: 'group',
            value: 'Third',
            id: 'test-3',
        },
    ];

    return (
        <>
            <h1>Check Boxes</h1>
            <h2>Default Check Box</h2>
            <CheckBox checked={true} id="test-4" />
            <h2>Label Check Box</h2>
            <CheckBox checked={true} value="Label" id="test-5" />
            <h2>Check Box Groups</h2>
            <CheckBoxGroup items={checkboxGroupItems} />
        </>
    );
};
