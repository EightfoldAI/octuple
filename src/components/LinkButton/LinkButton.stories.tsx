import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  BaseLinkButton,
  LinkButtonIconAlign,
  LinkButtonShape,
  LinkButtonSize,
  LinkButtonTextAlign,
  LinkButtonWidth,
  DefaultLinkButton,
  NeutralLinkButton,
  PrimaryLinkButton,
  SecondaryLinkButton,
  SystemUILinkButton,
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
  },
} as ComponentMeta<typeof BaseLinkButton>;

const Primary_Link_Button_Story: ComponentStory<typeof PrimaryLinkButton> = (
  args
) => <PrimaryLinkButton {...args} />;

export const Primary = Primary_Link_Button_Story.bind({});
export const Counter = Primary_Link_Button_Story.bind({});

const Secondary_Link_Button_Story: ComponentStory<
  typeof SecondaryLinkButton
> = (args) => <SecondaryLinkButton {...args} />;

export const Secondary = Secondary_Link_Button_Story.bind({});

const Default_Link_Button_Story: ComponentStory<typeof DefaultLinkButton> = (
  args
) => <DefaultLinkButton {...args} />;

export const Default = Default_Link_Button_Story.bind({});

const Neutral_Link_Button_Story: ComponentStory<typeof NeutralLinkButton> = (
  args
) => <NeutralLinkButton {...args} />;

export const Neutral = Neutral_Link_Button_Story.bind({});

const System_UI_Link_Button_Story: ComponentStory<typeof SystemUILinkButton> = (
  args
) => <SystemUILinkButton {...args} />;

export const System_UI = System_UI_Link_Button_Story.bind({});

const Floating_Link_Button_Story: ComponentStory<typeof PrimaryLinkButton> = (
  args
) => <PrimaryLinkButton {...args} />;

export const Floating = Floating_Link_Button_Story.bind({});

const linkButtonArgs: Object = {
  alignIcon: LinkButtonIconAlign.Left,
  alignText: LinkButtonTextAlign.Center,
  allowDisabledFocus: false,
  ariaLabel: 'Link button',
  linkButtonWidth: LinkButtonWidth.fitContent,
  classNames: 'my-link-btn-class',
  'data-testid': 'my-link-btn-test-id',
  disabled: false,
  disruptive: false,
  dropShadow: false,
  floatingLinkButtonProps: {
    enabled: false,
  },
  nudgeProps: null,
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
  role: 'link',
  shape: LinkButtonShape.Pill,
  size: LinkButtonSize.Medium,
  style: {},
  target: '_blank',
  text: 'Link button',
  counter: 0,
  loading: false,
};

Primary.args = {
  ...linkButtonArgs,
  ariaLabel: 'Primary LinkButton',
  text: 'Primary LinkButton',
};

Counter.args = {
  ...linkButtonArgs,
  ariaLabel: 'Primary LinkButton',
  counter: '8',
  text: 'Primary LinkButton',
};

Secondary.args = {
  ...linkButtonArgs,
  ariaLabel: 'Secondary LinkButton',
  text: 'Secondary LinkButton',
};

System_UI.args = {
  ...linkButtonArgs,
  ariaLabel: 'System UI LinkButton',
  text: 'System UI LinkButton',
  transparent: false,
};

Default.args = {
  ...linkButtonArgs,
  ariaLabel: 'Default LinkButton',
  text: 'Default LinkButton',
};

Neutral.args = {
  ...linkButtonArgs,
  ariaLabel: 'Neutral LinkButton',
  text: 'Neutral LinkButton',
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
};
