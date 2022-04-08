import React, { FC } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonWidth,
    DefaultButton,
    NeutralButton,
    PrimaryButton,
    SecondaryButton,
} from './index';
import { IconName } from '../Icon';
import { useBoolean } from '../../hooks/useBoolean';

interface ToggleButtonExampleProps {
    // These are set based on the toggle shown (not needed in real code)
    checked?: boolean;
}

export default {
    title: 'Button',
    component: PrimaryButton,
};

export const Primary = () => (
    <>
        <h1>Primary</h1>
        <h2>Default Flex</h2>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            text="Primary Button"
        />
        <br />
        <br />
        <h2>Default Flex (Fill)</h2>
        <div style={{ width: '50%' }}>
            <PrimaryButton
                ariaLabel="Primary Button"
                buttonWidth={ButtonWidth.fill}
                icon={IconName.mdiCardsHeart}
                onClick={_alertClicked}
                text="Primary Button"
            />
        </div>
        <br />
        <h2>Text only</h2>
        <PrimaryButton
            ariaLabel="Primary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <br />
        <br />
        <h2>Text only (Pill)</h2>
        <PrimaryButton
            ariaLabel="Primary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            shape={ButtonShape.Pill}
            text="Primary Button"
        />
        <br />
        <br />
        <h2>Icon only</h2>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <h2>Text + Icon</h2>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <br />
        <br />
        <h2>Disruptive</h2>
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
        <h1>Secondary</h1>
        <h2>Text only</h2>
        <SecondaryButton
            ariaLabel="Secondary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
        <h2>Text only (Pill)</h2>
        <SecondaryButton
            ariaLabel="Secondary Button"
            onClick={_alertClicked}
            shape={ButtonShape.Pill}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
        <h2>Icon only</h2>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <h2>Text + Icon</h2>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
        <h2>Disruptive</h2>
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
        <h1>Default Button</h1>
        <h2>Text only</h2>
        <DefaultButton
            ariaLabel="Default Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <br />
        <br />
        <h2>Text only (Pill)</h2>
        <DefaultButton
            ariaLabel="Default Button"
            dropShadow
            onClick={_alertClicked}
            shape={ButtonShape.Pill}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <br />
        <br />
        <h2>Icon only</h2>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <h2>Text + Icon</h2>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <br />
        <br />
        <h2>Disruptive</h2>
        <DefaultButton
            ariaLabel="Default Button"
            disruptive
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
    </>
);

export const Neutral = () => (
    <>
        <h1>Neutral Button</h1>
        <h2>Text only</h2>
        <NeutralButton
            ariaLabel="Neutral Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Neutral Button"
        />
        <br />
        <br />
        <h2>Text only (Pill)</h2>
        <NeutralButton
            ariaLabel="Neutral Button"
            dropShadow
            onClick={_alertClicked}
            shape={ButtonShape.Pill}
            size={ButtonSize.Large}
            text="Neutral Button"
        />
        <br />
        <br />
        <h2>Icon only</h2>
        <NeutralButton
            ariaLabel="Neutral Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <h2>Text + Icon</h2>
        <NeutralButton
            ariaLabel="Neutral Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Neutral Button"
        />
    </>
);

export const Toggle: FC<ToggleButtonExampleProps> = ({ checked }) => {
    const [skill1Added, { toggle: set1Added }] = useBoolean(false);
    const [skill2Added, { toggle: set2Added }] = useBoolean(false);
    const [skill3Added, { toggle: set3Added }] = useBoolean(false);
    const [skill4Added, { toggle: set4Added }] = useBoolean(false);
    return (
        <>
            <h1>Toggle With Text + Icon</h1>
            <h2>
                Note: Toggle buttons require the <code>toggle</code> attribute
                in addition to <code>checked</code>.
            </h2>
            <span style={{ marginRight: 16 }}>
                <PrimaryButton
                    ariaLabel="Primary Button"
                    checked={skill1Added || checked}
                    icon={skill1Added ? IconName.mdiMinus : IconName.mdiPlus}
                    onClick={set1Added}
                    size={ButtonSize.Medium}
                    text="Primary Button"
                    toggle
                />
            </span>
            <span style={{ marginRight: 16 }}>
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    checked={skill2Added || checked}
                    icon={skill2Added ? IconName.mdiMinus : IconName.mdiPlus}
                    onClick={set2Added}
                    size={ButtonSize.Medium}
                    text="Secondary Button"
                    toggle
                />
            </span>
            <span>
                <DefaultButton
                    ariaLabel="Default Button"
                    checked={skill3Added || checked}
                    icon={skill3Added ? IconName.mdiMinus : IconName.mdiPlus}
                    onClick={set3Added}
                    size={ButtonSize.Medium}
                    text="Default Button"
                    toggle
                />
            </span>
            <span>
                <NeutralButton
                    ariaLabel="Neutral Button"
                    checked={skill4Added || checked}
                    icon={skill4Added ? IconName.mdiMinus : IconName.mdiPlus}
                    onClick={set4Added}
                    size={ButtonSize.Medium}
                    text="Neutral Button"
                    toggle
                />
            </span>
        </>
    );
};

function _alertClicked(): void {
    alert('Clicked');
}
