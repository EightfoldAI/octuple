import React from 'react';
import { ButtonSize, PrimaryButton } from '../Button';
import { BaseTooltip } from './BaseTooltip/BaseTooltip';
import { TooltipTheme } from './Tooltip.types';

export default {
    title: 'Tooltip',
    component: BaseTooltip,
};

export const Base = () => (
    <>
        <BaseTooltip content={'Light tooltip'}>
            <PrimaryButton
                ariaLabel="Primary Button"
                onClick={_alertClicked}
                size={ButtonSize.Large}
                text="Primary Button"
            />
        </BaseTooltip>

        <BaseTooltip content={'Dark tooltip'} theme={TooltipTheme.dark}>
            <PrimaryButton
                ariaLabel="Primary Button"
                onClick={_alertClicked}
                size={ButtonSize.Large}
                text="Primary Button"
            />
        </BaseTooltip>
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
