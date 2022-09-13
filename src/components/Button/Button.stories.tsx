import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    BaseButton,
    ButtonIconAlign,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    DefaultButton,
    NeutralButton,
    PrimaryButton,
    SecondaryButton,
    SystemUIButton,
} from './';
import { IconName } from '../Icon';

export default {
    title: 'Button',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Buttons</h1>
                            <p>
                                Buttons give people a way to trigger an action.
                                They're typically found in forms, dialog panels,
                                and dialogs. Some buttons are specialized for
                                particular tasks, such as navigation, repeated
                                actions, or presenting menus.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    There are four button sizes that may be
                                    specified via the <b>size</b> prop and the{' '}
                                    <b>size</b>: <b>ButtonSize.Flex</b>,{' '}
                                    <b>ButtonSize.Large</b>,{' '}
                                    <b>ButtonSize.Medium</b>,{' '}
                                    <b>ButtonSize.Small</b>. <b>medium</b> is
                                    the default and flex resizes the button
                                    automatically with the viewport. To prevent
                                    this responsive behavior, give the button a
                                    size other than flex.
                                </li>
                                <li>
                                    For dialog boxes and panels, where people
                                    are moving through a sequence of screens,
                                    right-align buttons with the container.
                                </li>
                                <li>
                                    For single-page forms and focused tasks,
                                    left-align buttons with the container.
                                </li>
                                <li>
                                    Always place the primary button on the left,
                                    the secondary button just to the right of
                                    it.
                                </li>
                                <li>
                                    Show only one primary button that inherits
                                    theme color at rest state. If there are more
                                    than two buttons with equal priority, all
                                    buttons should have neutral backgrounds.
                                </li>
                                <li>
                                    Don't use a button to navigate to another
                                    place; use a link instead. The exception is
                                    in a wizard where "Back" and "Next" buttons
                                    may be used.
                                </li>
                                <li>
                                    Don't place the default focus on a button
                                    that destroys data. Instead, place the
                                    default focus on the button that performs
                                    the "safe act" and retains the content (such
                                    as "Save") or cancels the action (such as
                                    "Cancel").
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                                <li>
                                    Make sure it's clear what will happen when
                                    people interact with the button. Be concise;
                                    usually a single verb is best. Include a
                                    noun if there is any room for interpretation
                                    about what the verb means. For example,
                                    "Delete folder" or "Create account".
                                </li>
                            </ul>
                            <h3>Toggle Button</h3>
                            <p>
                                A toggle button may be used to show or hide
                                something and/or toggle its own icon.
                            </p>
                            <p>
                                Toggle buttons require the <b>toggle</b> and{' '}
                                <b>checked</b> attributes
                            </p>
                            <h3>Split Button</h3>
                            <p>
                                A split button enables someone to take one of
                                several related actions, one being dominant and
                                rest being displayed in a menu.
                            </p>
                            <p>
                                Split buttons require the <b>onContextMenu</b>,{' '}
                                <b>split</b> attributes in addition to{' '}
                                <b>splitButtonChecked</b>.
                            </p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
    argTypes: {
        alignIcon: {
            options: [ButtonIconAlign.Left, ButtonIconAlign.Right],
            control: { type: 'inline-radio' },
        },
        alignText: {
            options: [
                ButtonTextAlign.Center,
                ButtonTextAlign.Left,
                ButtonTextAlign.Right,
            ],
            control: { type: 'radio' },
        },
        buttonWidth: {
            options: [ButtonWidth.fitContent, ButtonWidth.fill],
            control: { type: 'inline-radio' },
        },
        htmlType: {
            options: ['button', 'submit', 'reset'],
            control: { type: 'radio' },
        },
        onClick: {
            action: 'click',
        },
        onContextMenu: {
            action: 'contextmenu',
        },
        shape: {
            options: [
                ButtonShape.Rectangle,
                ButtonShape.Pill,
                ButtonShape.Round,
            ],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [
                ButtonSize.Flex,
                ButtonSize.Large,
                ButtonSize.Medium,
                ButtonSize.Small,
            ],
            control: { type: 'radio' },
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof BaseButton>;

const Primary_Button_Story: ComponentStory<typeof PrimaryButton> = (args) => (
    <PrimaryButton {...args} />
);

export const Primary = Primary_Button_Story.bind({});
export const Counter = Primary_Button_Story.bind({});

const Secondary_Button_Story: ComponentStory<typeof SecondaryButton> = (
    args
) => <SecondaryButton {...args} />;

export const Secondary = Secondary_Button_Story.bind({});

const Default_Button_Story: ComponentStory<typeof DefaultButton> = (args) => (
    <DefaultButton {...args} />
);

export const Default = Default_Button_Story.bind({});

const Neutral_Button_Story: ComponentStory<typeof NeutralButton> = (args) => (
    <NeutralButton {...args} />
);

export const Neutral = Neutral_Button_Story.bind({});

const System_UI_Button_Story: ComponentStory<typeof SystemUIButton> = (
    args
) => <SystemUIButton {...args} />;

export const System_UI = System_UI_Button_Story.bind({});

const Toggle_Button_Story: ComponentStory<typeof PrimaryButton> = (args) => (
    <PrimaryButton {...args} />
);

export const Toggle = Toggle_Button_Story.bind({});
export const Toggle_With_Counter = Toggle_Button_Story.bind({});

const Split_Button_Story: ComponentStory<typeof PrimaryButton> = (args) => (
    <PrimaryButton {...args} />
);

export const Split = Split_Button_Story.bind({});
export const Split_With_Counter = Split_Button_Story.bind({});

const Floating_Button_Story: ComponentStory<typeof PrimaryButton> = (args) => (
    <PrimaryButton {...args} />
);

export const Floating_Button = Floating_Button_Story.bind({});

const buttonArgs: Object = {
    alignIcon: ButtonIconAlign.Left,
    alignText: ButtonTextAlign.Center,
    allowDisabledFocus: false,
    ariaLabel: 'Button',
    buttonWidth: ButtonWidth.fitContent,
    checked: false,
    classNames: 'my-btn-class',
    'data-test-id': 'my-btn-test-id',
    disabled: false,
    disruptive: false,
    dropShadow: false,
    floatingButtonProps: {
        enabled: false,
    },
    htmlType: 'button',
    iconProps: {
        path: IconName.mdiCardsHeart,
        ariaHidden: true,
        classNames: 'my-btn-icon',
        id: 'myButtonIcon',
        role: 'presentation',
        rotate: 0,
        spin: false,
        vertical: false,
        'data-test-id': 'myButtonIconTestId',
    },
    id: 'myButton',
    shape: ButtonShape.Pill,
    size: ButtonSize.Medium,
    split: false,
    splitButtonChecked: false,
    style: {},
    text: 'Button',
    toggle: false,
    counter: 0,
    loading: false,
};

Primary.args = {
    ...buttonArgs,
    ariaLabel: 'Primary Button',
    text: 'Primary Button',
};

Counter.args = {
    ...buttonArgs,
    ariaLabel: 'Primary Button',
    counter: '8',
    text: 'Primary Button',
};

Secondary.args = {
    ...buttonArgs,
    ariaLabel: 'Secondary Button',
    text: 'Secondary Button',
};

System_UI.args = {
    ...buttonArgs,
    ariaLabel: 'System UI Button',
    text: 'System UI Button',
    transparent: false,
};

Default.args = {
    ...buttonArgs,
    ariaLabel: 'Default Button',
    text: 'Default Button',
};

Neutral.args = {
    ...buttonArgs,
    ariaLabel: 'Neutral Button',
    text: 'Neutral Button',
};

Toggle.args = {
    ...buttonArgs,
    alignIcon: ButtonIconAlign.Right,
    ariaLabel: 'Toggle Button',
    checked: false,
    iconProps: {
        path: IconName.mdiChevronDown,
        ariaHidden: true,
        classNames: 'my-btn-icon',
        id: 'myButtonIcon',
        role: 'presentation',
        rotate: 0,
        spin: false,
        vertical: false,
        'data-test-id': 'myButtonIconTestId',
    },
    text: 'Toggle Button',
    toggle: true,
};

Toggle_With_Counter.args = {
    ...buttonArgs,
    alignIcon: ButtonIconAlign.Right,
    ariaLabel: 'Toggle Button',
    checked: false,
    counter: '8',
    iconProps: {
        path: IconName.mdiChevronDown,
        ariaHidden: true,
        classNames: 'my-btn-icon',
        id: 'myButtonIcon',
        role: 'presentation',
        rotate: 0,
        spin: false,
        vertical: false,
        'data-test-id': 'myButtonIconTestId',
    },
    text: 'Toggle Button',
    toggle: true,
};

Split.args = {
    ...buttonArgs,
    ariaLabel: 'Split Button',
    iconProps: null,
    split: true,
    splitButtonChecked: false,
    text: 'Split Button',
    splitButtonProps: {
        iconProps: {
            path: IconName.mdiClockOutline,
        },
    },
};

Split_With_Counter.args = {
    ...buttonArgs,
    ariaLabel: 'Split Button',
    counter: '8',
    iconProps: null,
    split: true,
    splitButtonChecked: false,
    text: 'Split Button',
};

Floating_Button.args = {
    ...buttonArgs,
    floatingButtonProps: {
        enabled: true,
    },
    shape: ButtonShape.Round,
    text: null,
};
