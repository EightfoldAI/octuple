import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconName, IconSize } from '../Icon';
import { Avatar, AvatarProps, StatusIconsPosition } from './';
import { Stack } from '../Stack';

export default {
  title: 'Avatar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Avatar</h1>
              <p>
                Avatars may be used to represent people or objects and supports
                images, Icons, or characters.
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
    type: {
      options: ['round', 'square'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Avatar>;

const imageProps = {
  src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  alt: 'random profile image',
};

const Avatar_Default_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Avatar_Default = Avatar_Default_Story.bind({});

const Avatar_Icon_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Avatar_Icon = Avatar_Icon_Story.bind({});

const Avatar_Round_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Avatar_Round = Avatar_Round_Story.bind({});

const Avatar_Round_Icon_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Avatar_Round_Icon = Avatar_Round_Icon_Story.bind({});

const Avatar_Fallback_Theme_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} theme="green" />
);

export const Avatar_Fallback_Theme = Avatar_Fallback_Theme_Story.bind({});

const Avatar_Fallback_Hashing_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} hashingFunction={() => 3} />
);

export const Avatar_Fallback_Hashing = Avatar_Fallback_Hashing_Story.bind({});

const Avatar_StatusIcon_Story: ComponentStory<typeof Avatar> = (args) => {
  const statusIconProps = {
    path: IconName.mdiPencil,
    size: IconSize.XSmall,
    type: 'round',
    backgroundColor: 'var(--blue-color-100)',
    padding: '6px',
  };

  const examples: AvatarProps[] = [
    {
      statusIcons: {
        [StatusIconsPosition.TopRight]: statusIconProps,
        [StatusIconsPosition.Bottom]: {
          ...statusIconProps,
          path: IconName.mdiClock,
        },
      },
      hashingFunction: () => 0,
      children: 'AB',
      fontSize: '48px',
    },
    {
      statusIcons: {
        [StatusIconsPosition.BottomRight]: statusIconProps,
        [StatusIconsPosition.BottomLeft]: {
          ...statusIconProps,
          path: IconName.mdiClock,
        },
      },
      iconProps: {
        path: IconName.mdiAccount,
        size: '80px',
      },
      style: {
        backgroundColor: 'var(--blue-color-50)',
      },
    },
    {
      statusIcons: {
        [StatusIconsPosition.Left]: {
          ...statusIconProps,
          backgroundColor: 'var(--blue-color-20)',
          path: IconName.mdiMagnify,
        },
        [StatusIconsPosition.TopLeft]: {
          ...statusIconProps,
          backgroundColor: 'var(--red-color-30)',
          path: IconName.mdiClock,
        },
        [StatusIconsPosition.Top]: {
          ...statusIconProps,
          backgroundColor: 'var(--red-color-30)',
          path: IconName.mdiBell,
        },
        [StatusIconsPosition.Right]: {
          ...statusIconProps,
          backgroundColor: 'var(--blue-color-20)',
          path: IconName.mdiCalendar,
        },
      },
      src: imageProps.src,
      alt: imageProps.alt,
    },
  ];

  return (
    <Stack direction="vertical" flexGap="l">
      {examples.map((value: AvatarProps, index) => {
        return <Avatar key={index} {...args} {...value} />;
      })}
    </Stack>
  );
};

export const Avatar_StatusIcon = Avatar_StatusIcon_Story.bind({});

const avatarArgs: Object = {
  children: 'JD',
  classNames: 'my-avatar-class',
  'data-test-id': 'my-avatar-test-id',
  size: '40px',
  type: 'square',
  style: {},
  fontSize: '18px',
};

Avatar_Default.args = {
  ...avatarArgs,
  src: imageProps.src,
  alt: imageProps.alt,
};

Avatar_StatusIcon.args = {
  ...avatarArgs,
  type: 'round',
  size: '100px',
};

Avatar_Icon.args = {
  ...avatarArgs,
  iconProps: {
    path: IconName.mdiBell,
  },
  style: {
    backgroundColor: 'var(--accent-color-20)',
  },
};

Avatar_Round.args = {
  ...avatarArgs,
  src: imageProps.src,
  alt: imageProps.alt,
  type: 'round',
};

Avatar_Round_Icon.args = {
  ...avatarArgs,
  iconProps: {
    path: IconName.mdiBell,
  },
  style: {
    backgroundColor: 'var(--accent-color-20)',
  },
  type: 'round',
};

Avatar_Fallback_Theme.args = {
  ...avatarArgs,
  children: 'AB',
  type: 'round',
};

Avatar_Fallback_Hashing.args = {
  ...avatarArgs,
  children: 'HF',
  type: 'round',
};
