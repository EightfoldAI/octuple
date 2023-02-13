import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon, IconName } from '../Icon';
import { Link } from './';

export default {
  title: 'Link',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Link</h1>
              <p>
                Links lead to another part of an app, other pages, or help
                articles. They can also be used to initiate commands.
              </p>
              <h2>Content</h2>
              <ul>
                <li>
                  People should be able to accurately predict the result of
                  selecting a link based on its link text and optional tooltip.
                </li>
                <li>
                  Use descriptive, actionable link text when possible. Avoid
                  using URLs as link text.
                </li>
                <li>
                  Don't use if the action is destructive or irreversible. Links
                  aren't appropriate for commands with significant consequences.
                </li>
                <li>
                  Keep discrete links far enough apart that people can
                  differentiate between them and easily select each one.
                </li>
                <li>
                  Use sentence-style capitalization—only capitalize the first
                  word.
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
    variant: {
      options: ['default', 'primary', 'secondary', 'neutral', 'disruptive'],
      control: { type: 'inline' },
    },
    onClick: {
      action: 'click',
    },
  },
} as ComponentMeta<typeof Link>;

const Link_Story: ComponentStory<typeof Link> = (args) => {
  // Prevents :visited from persisting
  const testAnchor = (): string => {
    return `#${Math.floor(Math.random() * 1000)}-eftestanchor`;
  };
  return <Link {...args} href={testAnchor()} />;
};

export const Default = Link_Story.bind({});
export const Primary = Link_Story.bind({});
export const Secondary = Link_Story.bind({});
export const Neutral = Link_Story.bind({});
export const Disruptive = Link_Story.bind({});
export const Primary_Underline = Link_Story.bind({});
export const Secondary_Underline = Link_Story.bind({});
export const Neutral_Underline = Link_Story.bind({});
export const Disruptive_Underline = Link_Story.bind({});
export const Default_Disabled = Link_Story.bind({});
export const Primary_Disabled = Link_Story.bind({});
export const Secondary_Disabled = Link_Story.bind({});
export const Neutral_Disabled = Link_Story.bind({});
export const Disruptive_Disabled = Link_Story.bind({});

const linkArgs: Object = {
  classNames: 'my-link-class',
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Default
    </span>
  ),
  fullWidth: true,
  target: '_self',
  variant: 'default',
};

Default.args = {
  ...linkArgs,
};

Primary.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Primary
    </span>
  ),
  fullWidth: false,
  variant: 'primary',
};

Neutral.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Neutral
    </span>
  ),
  fullWidth: false,
  variant: 'neutral',
};

Secondary.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Secondary
    </span>
  ),
  fullWidth: false,
  variant: 'secondary',
};

Disruptive.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Disruptive
    </span>
  ),
  fullWidth: false,
  variant: 'disruptive',
};

Primary_Underline.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Primary
    </span>
  ),
  fullWidth: false,
  underline: true,
  variant: 'primary',
};

Neutral_Underline.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Neutral
    </span>
  ),
  fullWidth: false,
  underline: true,
  variant: 'neutral',
};

Secondary_Underline.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Secondary
    </span>
  ),
  fullWidth: false,
  underline: true,
  variant: 'secondary',
};

Disruptive_Underline.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Disruptive
    </span>
  ),
  fullWidth: false,
  underline: true,
  variant: 'disruptive',
};

Default_Disabled.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Default
    </span>
  ),
  disabled: true,
  fullWidth: false,
};

Primary_Disabled.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Primary
    </span>
  ),
  disabled: true,
  fullWidth: false,
  variant: 'primary',
};

Neutral_Disabled.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Neutral
    </span>
  ),
  disabled: true,
  fullWidth: false,
  variant: 'neutral',
};

Secondary_Disabled.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Secondary
    </span>
  ),
  disabled: true,
  fullWidth: false,
  variant: 'secondary',
};

Disruptive_Disabled.args = {
  ...linkArgs,
  children: (
    <span
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Icon path={IconName.mdiBookmark} />
      Disruptive
    </span>
  ),
  disabled: true,
  fullWidth: false,
  variant: 'disruptive',
};
