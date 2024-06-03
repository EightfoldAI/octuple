import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  LinkButton,
  LinkButtonIconAlign,
  LinkButtonShape,
  LinkButtonSize,
  LinkButtonTextAlign,
  LinkButtonVariant,
  LinkButtonWidth,
} from '.';
import { IconName } from '../Icon';
import { NudgeAnimation } from '../Button/Nudge';

export default {
  title: 'Link Button',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Link Buttons</h1>
              <p>
                Link Buttons give people a way to trigger a route or url.
                They're typically found in navigation.
              </p>
              <h2>Best practices</h2>
              <h3>Layout</h3>
              <ul>
                <li>
                  There are four button sizes that may be specified via the{' '}
                  <b>size</b> prop and the <b>size</b>:{' '}
                  <b>LinkButtonSize.Flex</b>, <b>LinkButtonSize.Large</b>,{' '}
                  <b>LinkButtonSize.Medium</b>, <b>LinkButtonSize.Small</b>.{' '}
                  <b>medium</b> is the default and flex resizes the button
                  automatically with the viewport. To prevent this responsive
                  behavior, give the button a size other than flex.
                </li>
                <li>
                  Show only one primary link button that inherits theme color at
                  rest state. If there are more than two link buttons with equal
                  priority, all buttons should have neutral backgrounds.
                </li>
                <li>
                  Don't place the default focus on a link button that destroys
                  data. Instead, place the default focus on the button that
                  performs the "safe act" and retains the content (such as
                  "Save") or cancels the action (such as "Cancel").
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
                  with the link button. Be concise; usually a single verb is
                  best. Include a noun if there is any room for interpretation
                  about what the verb means. For example, "Delete folder" or
                  "Create account".
                </li>
              </ul>
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
      options: [LinkButtonIconAlign.Left, LinkButtonIconAlign.Right],
      control: { type: 'inline-radio' },
    },
    alignText: {
      options: [
        LinkButtonTextAlign.Center,
        LinkButtonTextAlign.Left,
        LinkButtonTextAlign.Right,
      ],
      control: { type: 'radio' },
    },
    linkButtonWidth: {
      options: [LinkButtonWidth.fitContent, LinkButtonWidth.fill],
      control: { type: 'inline-radio' },
    },
    onClick: {
      action: 'click',
    },
    shape: {
      options: [
        LinkButtonShape.Rectangle,
        LinkButtonShape.Pill,
        LinkButtonShape.Round,
      ],
      control: { type: 'inline-radio' },
    },
    size: {
      options: [
        LinkButtonSize.Flex,
        LinkButtonSize.Large,
        LinkButtonSize.Medium,
        LinkButtonSize.Small,
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
        LinkButtonVariant.Default,
        LinkButtonVariant.Neutral,
        LinkButtonVariant.Primary,
        LinkButtonVariant.Secondary,
        LinkButtonVariant.SystemUI,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof LinkButton>;

const Link_Button_Story: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
);

export const Primary = Link_Button_Story.bind({});
export const Counter = Link_Button_Story.bind({});
export const Secondary = Link_Button_Story.bind({});
export const Default = Link_Button_Story.bind({});
export const Neutral = Link_Button_Story.bind({});
export const System_UI = Link_Button_Story.bind({});
export const Floating = Link_Button_Story.bind({});

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
  'Floating',
];

const linkButtonArgs: Object = {
  alignIcon: LinkButtonIconAlign.Left,
  alignText: LinkButtonTextAlign.Center,
  allowDisabledFocus: false,
  ariaLabel: 'Link button',
  classNames: 'my-link-btn-class',
  'data-testid': 'my-link-btn-test-id',
  counter: 0,
  disabled: false,
  disruptive: false,
  dropShadow: false,
  floatingLinkButtonProps: {
    enabled: false,
  },
  configContextProps: {
    noDisabledContext: false,
    noGradientContext: false,
    noSizeContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-linkbutton-theme-container',
  gradient: false,
  href: 'https://eightfold.ai',
  iconProps: {
    path: IconName.mdiCardsHeart,
    ariaHidden: true,
    classNames: 'my-link-btn-icon',
    id: 'myLinkButtonIcon',
    role: 'presentation',
    rotate: 0,
    spin: false,
    vertical: false,
    'data-test-id': 'myLinkButtonIconTestId',
  },
  id: 'myLinkButton',
  linkButtonWidth: LinkButtonWidth.fitContent,
  loading: false,
  nudgeProps: null,
  role: 'link',
  shape: LinkButtonShape.Pill,
  size: LinkButtonSize.Medium,
  style: {},
  target: '_blank',
  text: 'Link button',
  variant: LinkButtonVariant.Default,
};

Primary.args = {
  ...linkButtonArgs,
  ariaLabel: 'Primary LinkButton',
  text: 'Primary LinkButton',
  variant: LinkButtonVariant.Primary,
};

Counter.args = {
  ...linkButtonArgs,
  ariaLabel: 'Primary LinkButton',
  counter: '8',
  text: 'Primary LinkButton',
  variant: LinkButtonVariant.Primary,
};

Secondary.args = {
  ...linkButtonArgs,
  ariaLabel: 'Secondary LinkButton',
  text: 'Secondary LinkButton',
  variant: LinkButtonVariant.Secondary,
};

System_UI.args = {
  ...linkButtonArgs,
  ariaLabel: 'System UI LinkButton',
  text: 'System UI LinkButton',
  transparent: false,
  variant: LinkButtonVariant.SystemUI,
};

Default.args = {
  ...linkButtonArgs,
  ariaLabel: 'Default LinkButton',
  text: 'Default LinkButton',
  variant: LinkButtonVariant.Default,
};

Neutral.args = {
  ...linkButtonArgs,
  ariaLabel: 'Neutral LinkButton',
  text: 'Neutral LinkButton',
  variant: LinkButtonVariant.Neutral,
};

Floating.args = {
  ...linkButtonArgs,
  floatingLinkButtonProps: {
    enabled: true,
  },
  nudgeProps: {
    animation: NudgeAnimation.Background,
    delay: 5000,
    enabled: true,
    iterations: 5,
  },
  shape: LinkButtonShape.Round,
  text: null,
  variant: LinkButtonVariant.Primary,
};
