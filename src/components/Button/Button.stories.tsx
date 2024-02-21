import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Button,
  ButtonIconAlign,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from './';
import { IconName } from '../Icon';
import { NudgeAnimation } from './Nudge';

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
                Buttons give people a way to trigger an action. They're
                typically found in forms, dialog panels, and dialogs. Some
                buttons are specialized for particular tasks, such as
                navigation, repeated actions, or presenting menus.
              </p>
              <h2>Best practices</h2>
              <h3>Layout</h3>
              <ul>
                <li>
                  There are four button sizes that may be specified via the{' '}
                  <b>size</b> prop and the <b>size</b>: <b>ButtonSize.Flex</b>,{' '}
                  <b>ButtonSize.Large</b>, <b>ButtonSize.Medium</b>,{' '}
                  <b>ButtonSize.Small</b>. <b>medium</b> is the default and flex
                  resizes the button automatically with the viewport. To prevent
                  this responsive behavior, give the button a size other than
                  flex.
                </li>
                <li>
                  For dialog boxes and panels, where people are moving through a
                  sequence of screens, right-align buttons with the container.
                </li>
                <li>
                  For single-page forms and focused tasks, left-align buttons
                  with the container.
                </li>
                <li>
                  Always place the primary button on the left, the secondary
                  button just to the right of it.
                </li>
                <li>
                  Show only one primary button that inherits theme color at rest
                  state. If there are more than two buttons with equal priority,
                  all buttons should have neutral backgrounds.
                </li>
                <li>
                  Don't use a button to navigate to another place; use a link
                  instead. The exception is in a wizard where "Back" and "Next"
                  buttons may be used.
                </li>
                <li>
                  Don't place the default focus on a button that destroys data.
                  Instead, place the default focus on the button that performs
                  the "safe act" and retains the content (such as "Save") or
                  cancels the action (such as "Cancel").
                </li>
              </ul>
              <h3>Content</h3>
              <ul>
                <li>
                  Use sentence-style capitalization—only capitalize the first
                  word.
                </li>
                <li>
                  Make sure it's clear what will happen when people interact
                  with the button. Be concise; usually a single verb is best.
                  Include a noun if there is any room for interpretation about
                  what the verb means. For example, "Delete folder" or "Create
                  account".
                </li>
              </ul>
              <h3>Toggle Button</h3>
              <p>
                A toggle button may be used to show or hide something and/or
                toggle its own icon.
              </p>
              <p>
                Toggle buttons require the <b>toggle</b> and <b>checked</b>{' '}
                attributes
              </p>
              <h3>Split Button</h3>
              <p>
                A split button enables someone to take one of several related
                actions, one being dominant and rest being displayed in a menu.
              </p>
              <p>
                Split buttons require the <b>onContextMenu</b>, <b>split</b>{' '}
                attributes in addition to <b>splitButtonChecked</b>.
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
      options: [ButtonShape.Rectangle, ButtonShape.Pill, ButtonShape.Round],
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
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
      ],
      control: 'select',
    },
    variant: {
      options: [
        ButtonVariant.Default,
        ButtonVariant.Neutral,
        ButtonVariant.Primary,
        ButtonVariant.Secondary,
        ButtonVariant.SystemUI,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Button_Story: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Primary = Button_Story.bind({});
export const Counter = Button_Story.bind({});
export const Secondary = Button_Story.bind({});
export const Default = Button_Story.bind({});
export const Neutral = Button_Story.bind({});
export const System_UI = Button_Story.bind({});
export const Toggle = Button_Story.bind({});
export const Toggle_With_Counter = Button_Story.bind({});
export const Split = Button_Story.bind({});
export const Split_With_Counter = Button_Story.bind({});
export const Floating_Button = Button_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Primary',
  'Counter',
  'Secondary',
  'Default',
  'Neutral',
  'System_UI',
  'Toggle',
  'Toggle_With_Counter',
  'Split',
  'Split_With_Counter',
  'Floating_Button',
];

const buttonArgs: Object = {
  alignIcon: ButtonIconAlign.Left,
  alignText: ButtonTextAlign.Center,
  allowDisabledFocus: false,
  ariaLabel: 'Button',
  badgeProps: null,
  buttonWidth: ButtonWidth.fitContent,
  checked: false,
  classNames: 'my-btn-class',
  'data-test-id': 'my-btn-test-id',
  counter: 0,
  disabled: false,
  disruptive: false,
  dropShadow: false,
  floatingButtonProps: {
    enabled: false,
  },
  configContextProps: {
    noDisabledContext: false,
    noGradientContext: false,
    noSizeContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-button-theme-container',
  gradient: false,
  nudgeProps: null,
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
  loading: false,
  shape: ButtonShape.Pill,
  size: ButtonSize.Medium,
  split: false,
  splitButtonChecked: false,
  style: {},
  text: 'Button',
  toggle: false,
  variant: ButtonVariant.Default,
};

Primary.args = {
  ...buttonArgs,
  ariaLabel: 'Primary Button',
  text: 'Primary Button',
  variant: ButtonVariant.Primary,
};

Counter.args = {
  ...buttonArgs,
  ariaLabel: 'Primary Button',
  counter: '8',
  text: 'Primary Button',
  variant: ButtonVariant.Primary,
};

Secondary.args = {
  ...buttonArgs,
  ariaLabel: 'Secondary Button',
  text: 'Secondary Button',
  variant: ButtonVariant.Secondary,
};

System_UI.args = {
  ...buttonArgs,
  ariaLabel: 'System UI Button',
  text: 'System UI Button',
  transparent: false,
  variant: ButtonVariant.SystemUI,
};

Default.args = {
  ...buttonArgs,
  ariaLabel: 'Default Button',
  text: 'Default Button',
  variant: ButtonVariant.Default,
};

Neutral.args = {
  ...buttonArgs,
  ariaLabel: 'Neutral Button',
  text: 'Neutral Button',
  variant: ButtonVariant.Neutral,
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
  variant: ButtonVariant.Primary,
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
  variant: ButtonVariant.Primary,
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
  variant: ButtonVariant.Primary,
};

Split_With_Counter.args = {
  ...buttonArgs,
  ariaLabel: 'Split Button',
  counter: '8',
  iconProps: null,
  split: true,
  splitButtonChecked: false,
  text: 'Split Button',
  variant: ButtonVariant.Primary,
};

Floating_Button.args = {
  ...buttonArgs,
  floatingButtonProps: {
    enabled: true,
  },
  nudgeProps: {
    animation: NudgeAnimation.Background,
    delay: 5000,
    enabled: true,
    iterations: 5,
  },
  shape: ButtonShape.Round,
  text: null,
  variant: ButtonVariant.Primary,
};
