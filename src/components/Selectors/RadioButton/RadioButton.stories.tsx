import React from 'react';
import { RadioButton, RadioGroup } from '../index';
import { RadioButtonChecked } from '../Selectors.types';

export default {
    title: 'Radio Button',
    component: RadioButton,
};

export const Radio = () => {
    const radioGroupItems = [1, 2, 3].map((i) => ({
        value: `Radio${i}`,
        name: 'group',
        id: `oea2exk-${i}`,
    }));

    return (
        <>
            <h1>Radio Buttons</h1>
            <h2>Default Radio Button</h2>
            <RadioButton checked={true} id="asdfasdf" />
            <h2>Label Radio Button</h2>
            <RadioButton checked={true} value="Label" id="zxcvzxcv" />
            <h2>Radio Button Groups</h2>
            <RadioGroup
                onChange={_radioClicked}
                activeRadioButton={'Radio1'}
                radioGroupItems={radioGroupItems}
            />
        </>
    );
};

function _radioClicked(radio: RadioButtonChecked): void {
    console.log(radio);
}
