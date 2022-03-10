import React from 'react';
import { ButtonSize, DefaultButton, PrimaryButton, SecondaryButton } from './index';

export default {
    title: 'Button',
    component: PrimaryButton
};

export const Primary = () => (
    <>
        <h2>Primary</h2>
        <p>Text only</p>
        <PrimaryButton ariaLabel='Primary Button' onClick={_alertClicked} size={ButtonSize.Large} text='Primary Button' />
        <p>Icon only</p>
        <PrimaryButton ariaLabel='Primary Button' icon='mdi-upload' onClick={_alertClicked} size={ButtonSize.Large} />
        <p>Text + Icon</p>
        <PrimaryButton ariaLabel='Primary Button' icon='mdi-upload' onClick={_alertClicked} size={ButtonSize.Large} text='Primary Button' />
    </>
);

export const Secondary = () => (
    <>
        <p>Secondary Button</p>
        <SecondaryButton ariaLabel='Secondary Button' onClick={_alertClicked} size={ButtonSize.Large} text='Secondary Button' />
    </>
);

export const Default = () => (
    <>
        <p>Default Button</p>
        <DefaultButton ariaLabel='Default Button' onClick={_alertClicked} size={ButtonSize.Large} text='Default Button' />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
