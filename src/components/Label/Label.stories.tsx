import React from 'react';
import { Label, LabelSize } from './index';

export default {
    title: 'Label',
    component: Label,
};

export const Sizes = () => (
    <>
        <h1>Labels</h1>
        <p>Large</p>
        <Label
            labelIconButtonProps={{
                show: true,
                toolTipContent: 'A tooltip',
                toolTipPlacement: 'top',
                onClick: () => _alertClicked(),
            }}
            size={LabelSize.Large}
            text="Label"
        />
        <br />
        <br />
        <p>Medium</p>
        <Label
            labelIconButtonProps={{
                show: true,
                toolTipContent: 'A tooltip',
                toolTipPlacement: 'top',
                onClick: () => _alertClicked(),
            }}
            size={LabelSize.Medium}
            text="Label"
        />
        <br />
        <br />
        <p>Small</p>
        <Label
            labelIconButtonProps={{
                show: true,
                toolTipContent: 'A tooltip',
                toolTipPlacement: 'top',
                onClick: () => _alertClicked(),
            }}
            size={LabelSize.Small}
            text="Label"
        />
        <br />
        <br />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
