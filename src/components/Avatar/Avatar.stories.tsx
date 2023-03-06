import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconName } from '../Icon';
import {
  Avatar,
  AvatarProps,
  StatusItemsPosition,
  getStatusItemSizeAndPadding,
} from './';
import { Stack } from '../Stack';
import { TooltipTheme } from '../Tooltip';

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

const Avatar_StatusItem_Story: ComponentStory<typeof Avatar> = (args) => {
  const avatarSize = 100;
  const [statusItemSize] = getStatusItemSizeAndPadding(avatarSize);
  args.size = `${avatarSize}px`;

  const statusItemProps = {
    backgroundColor: 'var(--blue-color-100)',
    path: IconName.mdiPencil,
    size: `${statusItemSize}px`,
    type: 'round',
  };

  const examples: AvatarProps[] = [
    {
      children: 'A',
      fontSize: '18px',
      hashingFunction: () => 0,
      size: '32px',
      outline: {
        // outlineColor: 'var(--green-color-60)',
        outlineOffset: '1px',
        // outlineStyle: 'solid',
        outlineWidth: '2px',
      },
      statusItems: {
        [StatusItemsPosition.Bottom]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--green-color-20)',
          color: 'var(--green-color-70)',
          wrapperStyle: { padding: '2px' },
          path: IconName.mdiHome,
          size: '6px',
        },
        [StatusItemsPosition.TopRight]: {
          ...statusItemProps,
          ariaLabel: 'Pencil icon',
          backgroundColor: 'var(--green-color-20)',
          color: 'var(--green-color-70)',
          wrapperStyle: { padding: '2px' },
          path: IconName.mdiPencil,
          size: '6px',
        },
      },
    },
    {
      children: 'AB',
      fontSize: '48px',
      hashingFunction: () => 0,
      outline: {
        outlineColor: 'var(--blue-color-60)',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineWidth: '4px',
      },
      statusItems: {
        [StatusItemsPosition.TopRight]: {
          ...statusItemProps,
          ariaLabel: 'Pencil icon',
          backgroundColor: 'var(--red-color-20)',
          color: 'var(--red-color-70)',
          onClick: () => alert('Clicked pencil icon'),
          outline: {
            outlineColor: 'var(--red-color-60)',
            outlineOffset: '0px',
            outlineStyle: 'solid',
            outlineWidth: '2px',
          },
        },
        [StatusItemsPosition.Bottom]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--grey-color-10)',
          color: 'var(--grey-color-70)',
          onClick: () => alert('Clicked clock icon'),
          outline: {},
          path: IconName.mdiClock,
        },
      },
    },
    {
      iconProps: {
        path: IconName.mdiAccount,
        size: '80px',
      },
      style: {
        backgroundColor: 'var(--blue-color-50)',
      },
      statusItems: {
        [StatusItemsPosition.BottomRight]: {
          ...statusItemProps,
          ariaLabel: 'Pencil icon',
          onClick: () => alert('Clicked pencil icon'),
        },
        [StatusItemsPosition.BottomLeft]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          onClick: () => alert('Clicked clock icon'),
          path: IconName.mdiClock,
        },
      },
    },
    {
      alt: imageProps.alt,
      src: imageProps.src,
      statusItems: {
        [StatusItemsPosition.Left]: {
          ...statusItemProps,
          ariaLabel: 'Magnify icon',
          backgroundColor: 'var(--blue-color-20)',
          onClick: () => alert('Clicked magnify icon'),
          path: IconName.mdiMagnify,
        },
        [StatusItemsPosition.TopLeft]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--red-color-30)',
          onClick: () => alert('Clicked clock icon'),
          path: IconName.mdiClock,
        },
        [StatusItemsPosition.Top]: {
          ...statusItemProps,
          backgroundColor: 'var(--red-color-30)',
          path: IconName.mdiBell,
        },
        [StatusItemsPosition.Right]: {
          ...statusItemProps,
          backgroundColor: 'var(--blue-color-20)',
          path: IconName.mdiCalendar,
        },
      },
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

export const Avatar_StatusItem = Avatar_StatusItem_Story.bind({});

const Avatar_Tooltip_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} theme="red" />
);

export const Avatar_Tooltip = Avatar_Tooltip_Story.bind({});

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

Avatar_StatusItem.args = {
  ...avatarArgs,
  type: 'round',
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

Avatar_Tooltip.args = {
  ...avatarArgs,
  children: 'A',
  type: 'round',
  tooltipProps: {
    content: 'Tooltip text',
    theme: TooltipTheme.dark,
  },
};
