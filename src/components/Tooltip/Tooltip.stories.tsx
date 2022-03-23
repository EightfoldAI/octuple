import React, { FC } from 'react';
import { ButtonSize, PrimaryButton } from '../Button';
import { Tooltip, TooltipTheme } from './';

export default {
    title: 'Tooltip',
    component: Tooltip,
};

const Wrapper: FC = ({ children }) => (
    <div
        style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '8px',
            flexWrap: 'wrap',
        }}
    >
        {children}
    </div>
);

export const Base = () => (
    <>
        <Wrapper>
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
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Dark tooltip'} placement={'top'}>
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
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Dark tooltip'} placement={'right'}>
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
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Dark tooltip'} placement={'left'}>
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
        </Wrapper>
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
