import React, { FC } from 'react';
import { ButtonSize, DefaultButton, PrimaryButton } from '../Button';
import { registerTheme } from './styleGenerator';

export default {
    title: 'Theme',
};

export const Base = () => {
    registerTheme({
        primaryColor: 'blue',
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
