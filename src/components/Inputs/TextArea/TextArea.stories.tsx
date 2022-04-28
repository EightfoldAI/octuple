import React from 'react';
import { TextArea, TextInputWidth } from '../index';

export default {
    title: 'Text Area',
    component: TextArea,
};

export const Area = () => (
    <>
        <h1>Text Areas</h1>
        <p>Text Area No Expand Stretch (Rectangle)</p>
        <TextArea label="Label" inputWidth={TextInputWidth.fill} />
        <br />
        <br />
        <p>Text Area No Expand With Icon Button (Rectangle)</p>
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
        <p>Text Area with expand (Rectangle)</p>
        <TextArea label="Label" enableExpand={true} />
        <br />
        <br />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
