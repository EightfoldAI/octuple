import React from 'react';
import {
    ButtonSize,
    DefaultButton,
    PrimaryButton,
    SecondaryButton,
} from './index';
import { IconName } from '../Icon/index';

export default {
    title: 'Button',
    component: PrimaryButton,
};

export const Primary = () => (
    <>
        <h2>Primary</h2>
        <p>Default Flex</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            text="Primary Button"
        />
        <p>Text only</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <p>Icon only</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <p>Text + Icon</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <p>Disruptive</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            disruptive
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
    </>
);

export const Secondary = () => (
    <>
        <p>Secondary</p>
        <p>Text only</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <p>Icon only</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <p>Text + Icon</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <p>Disruptive</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            disruptive
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
    </>
);

export const Default = () => (
    <>
        <p>Default Button</p>
        <p>Text only</p>
        <DefaultButton
            ariaLabel="Default Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <p>Icon only</p>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <p>Text + Icon</p>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
    </>
);

function _alertClicked(): void {
    alert('Clicked');
}
