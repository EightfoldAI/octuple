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
            marginBottom: '16px',
            justifyContent: 'space-around',
        }}
    >
        {children}
    </div>
);

export const Base = () => (
    <div style={{ margin: 'auto', maxWidth: '60%', marginTop: '50px' }}>
        <Wrapper>
            <Tooltip content={'Light tooltip'}>
                <PrimaryButton
                    ariaLabel="Light bottom"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light bottom"
                />
            </Tooltip>
            <Tooltip content={'Dark tooltip'} theme={TooltipTheme.dark}>
                <PrimaryButton
                    ariaLabel="Dark bottom"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark bottom"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Light tooltip'} placement={'top'}>
                <PrimaryButton
                    ariaLabel="Light top"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light top"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'top'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Dark top"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark top"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Light tooltip'} placement={'right'}>
                <PrimaryButton
                    ariaLabel="Light right"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light right"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'right'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Dark right"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark right"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip
                content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                placement={'left'}
            >
                <PrimaryButton
                    ariaLabel="Light left"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light left"
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
                    ariaLabel="Dark left"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark left"
                />
            </Tooltip>
        </Wrapper>
    </div>
);

function _alertClicked(): void {}
