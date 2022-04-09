import React from 'react';
import { IconName } from '../../Icon';
import { TextInput, TextInputShape, TextInputWidth } from '../index';

export default {
    title: 'Text Input',
    component: TextInput,
};

export const Input = () => (
    <>
        <h1>Text Inputs</h1>
        <p>Text Input Stretch (Rectangle)</p>
        <TextInput label="Label" inputWidth={TextInputWidth.fill} />
        <br />
        <br />
        <p>Text Input with Icon and Icon Button (Rectangle)</p>
        <TextInput
            iconProps={{ path: IconName.mdiCardsHeart, color: 'red' }}
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
        <p>Text Input with Image Icon (Rectangle)</p>
        <TextInput
            label="Label"
            iconProps={{
                imageSrc:
                    "data:image/svg+xml;utf8,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='24' height='24' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_1119_3672' transform='scale(0.00568182)'/%3E%3C/pattern%3E%3Cimage id='image0_1119_3672' width='176' height='176' xlink:href='data:image/png;base64,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'/%3E%3C/defs%3E%3C/svg%3E%0A",
            }}
        />
        <br />
        <br />
        <p>Text Input with Icon Button (Rectangle)</p>
        <TextInput
            iconButtonProps={{
                icon: IconName.mdiFilterOutline,
                onClick: _alertClicked,
            }}
            label="Label"
        />
        <br />
        <br />
        <p>Text Input with Icon and Icon Button (Rectangle)</p>
        <TextInput
            iconProps={{ path: IconName.mdiMap }}
            iconButtonProps={{
                icon: IconName.mdiFilterOutline,
                onClick: _alertClicked,
            }}
            label="Label"
        />
        <br />
        <br />
        <p>Text Input Stretch (Pill)</p>
        <TextInput
            label="Label"
            shape={TextInputShape.Pill}
            inputWidth={TextInputWidth.fill}
        />
        <br />
        <br />
        <p>Text Input with Icon (Pill)</p>
        <TextInput
            iconProps={{ path: IconName.mdiCardsHeart, color: 'red' }}
            label="Label"
            shape={TextInputShape.Pill}
        />
        <br />
        <br />
        <p>Text Input with Image Icon (Pill)</p>
        <TextInput
            label="Label"
            iconProps={{
                imageSrc:
                    "data:image/svg+xml;utf8,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='24' height='24' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_1119_3672' transform='scale(0.00568182)'/%3E%3C/pattern%3E%3Cimage id='image0_1119_3672' width='176' height='176' xlink:href='data:image/png;base64,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'/%3E%3C/defs%3E%3C/svg%3E%0A",
            }}
            shape={TextInputShape.Pill}
        />
        <br />
        <br />
        <p>Text Input with Icon Button (Pill)</p>
        <TextInput
            iconButtonProps={{
                icon: IconName.mdiFilterOutline,
                onClick: _alertClicked,
            }}
            label="Label"
            shape={TextInputShape.Pill}
        />
        <br />
        <br />
        <p>Text Input with Icon and Icon Button (Pill)</p>
        <TextInput
            iconProps={{ path: IconName.mdiMap }}
            iconButtonProps={{
                icon: IconName.mdiFilterOutline,
                onClick: _alertClicked,
            }}
            label="Label"
            shape={TextInputShape.Pill}
        />
        <br />
        <br />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
