import React from 'react';
import { InputWidth, TextArea } from '../index';

export default {
    title: 'Text Area',
    component: TextArea,
};

export const Area = () => (
    <>
        <h1>Text Areas</h1>
        <h2>Text Area No Expand Stretch (Rectangle)</h2>
        <TextArea label="Label" inputWidth={InputWidth.fill} />
        <br />
        <br />
        <h2>Text Area No Expand With Icon Button (Rectangle)</h2>
        <TextArea
            label="Label"
            labelIconButtonProps={{
                show: true,
                toolTipContent: 'A tooltip',
                toolTipPlacement: 'top',
                onClick: _alertClicked,
            }}
        />
        <br />
        <br />
        <h2>Text Area with expand (Rectangle)</h2>
        <TextArea label="Label" enableExpand={true} />
        <br />
        <br />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
