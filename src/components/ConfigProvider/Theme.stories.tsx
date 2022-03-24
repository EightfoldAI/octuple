import React, { FC } from 'react';
import { ButtonSize, DefaultButton, PrimaryButton } from '../Button';
import { Theme } from '.';
import { registerTheme } from './styleGenerator';

export default {
    title: 'Theme',
};

export const Base = () => {
    registerTheme('oc', {
        name: 'custom',
        primaryColor: '#146DA6',
        secondaryColor: 'blue',
    });
    return (
        <div>
            <PrimaryButton
                ariaLabel="Primary Button"
                onClick={_alertClicked}
                size={ButtonSize.Large}
                text="Primary Button"
            />
        </div>
    );
};

function _alertClicked(): void {}
