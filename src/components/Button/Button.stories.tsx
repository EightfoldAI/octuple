import React, { FC } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    DefaultButton,
    NeutralButton,
    PrimaryButton,
    SecondaryButton,
    TwoStateButton,
} from './index';
import { Dropdown } from '../Dropdown/Dropdown';
import { IconName } from '../Icon';
import { useBoolean } from '../../hooks/useBoolean';

interface ExampleProps {
    checked?: boolean;
}

export default {
    title: 'Button',
    component: PrimaryButton,
};

export const Primary = () => (
    <>
        <h1>Primary</h1>
        <p>Default Flex</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            text="Primary Button"
        />
        <br />
        <br />
        <p>Default Flex (Fill)</p>
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
        <p>Text only</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <br />
        <br />
        <p>Text only (Pill)</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            shape={ButtonShape.Pill}
            text="Primary Button"
        />
        <br />
        <br />
        <p>Icon only</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <p>Text + Icon</p>
        <PrimaryButton
            ariaLabel="Primary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Primary Button"
        />
        <br />
        <br />
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
        <h1>Secondary</h1>
        <p>Text only</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
        <p>Text only (Pill)</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            onClick={_alertClicked}
            shape={ButtonShape.Pill}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
        <p>Icon only</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <p>Text + Icon</p>
        <SecondaryButton
            ariaLabel="Secondary Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Secondary Button"
        />
        <br />
        <br />
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
        <h1>Default Button</h1>
        <p>Text only</p>
        <DefaultButton
            ariaLabel="Default Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <br />
        <br />
        <p>Text only (Pill)</p>
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
        <p>Icon only</p>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <p>Text + Icon</p>
        <DefaultButton
            ariaLabel="Default Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Default Button"
        />
        <br />
        <br />
        <p>Disruptive</p>
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
        <p>Text only</p>
        <NeutralButton
            ariaLabel="Neutral Button"
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Neutral Button"
        />
        <br />
        <br />
        <p>Text only (Pill)</p>
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
        <p>Icon only</p>
        <NeutralButton
            ariaLabel="Neutral Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
        />
        <br />
        <br />
        <p>Text + Icon</p>
        <NeutralButton
            ariaLabel="Neutral Button"
            icon={IconName.mdiCardsHeart}
            onClick={_alertClicked}
            size={ButtonSize.Large}
            text="Neutral Button"
        />
    </>
);

export const Split: FC<ExampleProps> = ({ checked }) => {
    const [menuShown, { toggle: setMenuShown }] = useBoolean(false);
    return (
        <>
            <h1>Split Button</h1>
            <p>
                Note: Split buttons require the <code>onContextMenu</code>,{' '}
                <code>split</code> attributes in addition to{' '}
                <code>splitButtonChecked</code>.
            </p>
            <Dropdown
                overlay={
                    <div>
                        <DefaultButton
                            alignText={ButtonTextAlign.Left}
                            buttonWidth={ButtonWidth.fill}
                        />
                        <DefaultButton
                            alignText={ButtonTextAlign.Left}
                            buttonWidth={ButtonWidth.fill}
                        />
                        <DefaultButton
                            alignText={ButtonTextAlign.Left}
                            buttonWidth={ButtonWidth.fill}
                        />
                    </div>
                }
                trigger="contextmenu"
                onVisibleChange={setMenuShown}
            >
                <PrimaryButton
                    ariaLabel="Split Button"
                    onClick={_alertClicked}
                    onContextMenu={setMenuShown}
                    split
                    splitButtonChecked={menuShown || checked}
                    text="Split Button"
                />
            </Dropdown>
        </>
    );
};

export const Toggle: FC<ExampleProps> = ({ checked }) => {
    const [skill1Added, { toggle: set1Added }] = useBoolean(false);
    const [skill2Added, { toggle: set2Added }] = useBoolean(false);
    const [skill3Added, { toggle: set3Added }] = useBoolean(false);
    const [skill4Added, { toggle: set4Added }] = useBoolean(false);
    return (
        <>
            <h1>Toggle With Text + Icon</h1>
            <p>
                Note: Toggle buttons require the <code>toggle</code> attribute
                in addition to <code>checked</code>.
            </p>
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

export const TwoState: FC<ExampleProps> = ({ checked }) => {
    const [isToggled, { toggle: setToggled }] = useBoolean(false);
    return (
        <>
            <h1>Two State Button</h1>
            <p>
                Note: Like Toggle, Two State buttons require the{' '}
                <code>toggle</code> attribute in addition to{' '}
                <code>checked</code>. Two State button's visual state is
                different than a basic Toggle button.
            </p>
            <TwoStateButton
                ariaLabel="Two State Button"
                checked={isToggled || checked}
                counter={8}
                iconOne={IconName.mdiCardsHeart}
                iconTwo={
                    isToggled ? IconName.mdiChevronUp : IconName.mdiChevronDown
                }
                onClick={setToggled}
                text="Two State Button"
                toggle
            />
        </>
    );
};

function _alertClicked(): void {
    alert('Clicked');
}
