import React from 'react';
import { ButtonSize, PrimaryButton } from '../Button';
import { Tooltip, TooltipTheme } from './';

export default {
    title: 'Tooltip',
    component: Tooltip,
};

export const Base = () => (
    <>
        <div>
            <Tooltip content={'Light tooltip'}>
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>

            <Tooltip content={'Dark tooltip'} theme={TooltipTheme.dark}>
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
        </div>
        <div>
            <Tooltip
                content={'Dark tooltip'}
                placement={'top'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'top'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
        </div>
        <div>
            <Tooltip
                content={'Dark tooltip'}
                placement={'right'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'right'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
        </div>

        <div>
            <Tooltip
                content={'Dark tooltip'}
                placement={'left'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
            <Tooltip
                content={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }
                placement={'left'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={_alertClicked}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
            </Tooltip>
        </div>
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
