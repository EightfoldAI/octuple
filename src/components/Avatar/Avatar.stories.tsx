import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconName } from '../Icon';
import {
  Avatar,
  AvatarProps,
  getStatusItemSizeAndPadding,
  StatusItemIconAlign,
  StatusItemsPosition,
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

const Avatar_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

const Avatar_Round_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar popupProps={{ content: 'A popup' }} {...args} />
);

const Avatar_Fallback_Theme_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} theme="green" />
);

const Avatar_Fallback_Hashing_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} hashingFunction={() => 3} />
);

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
        outlineOffset: '1px',
        outlineWidth: '2px',
      },
      statusItems: {
        [StatusItemsPosition.Bottom]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--green-background2-color)',
          color: 'var(--green-secondary-color)',
          wrapperStyle: { padding: '2px' },
          path: IconName.mdiHome,
          size: '6px',
        },
        [StatusItemsPosition.TopRight]: {
          ...statusItemProps,
          ariaLabel: 'Pencil icon',
          backgroundColor: 'var(--green-background2-color)',
          color: 'var(--green-secondary-color)',
          wrapperStyle: { padding: '2px' },
          path: IconName.mdiPencil,
          size: '6px',
          text: '20',
        },
      },
    },
    {
      children: 'AB',
      fontSize: '48px',
      hashingFunction: () => 0,
      outline: {
        outlineColor: 'var(--blue-tertiary-color)',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineWidth: '4px',
      },
      statusItems: {
        [StatusItemsPosition.TopRight]: {
          ...statusItemProps,
          ariaLabel: 'Pencil icon',
          backgroundColor: 'var(--red-background2-color)',
          color: 'var(--red-secondary-color)',
          onClick: () => alert('Clicked pencil icon'),
          outline: {
            outlineColor: 'var(--red-tertiary-color)',
            outlineOffset: '0px',
            outlineStyle: 'solid',
            outlineWidth: '2px',
          },
        },
        [StatusItemsPosition.Bottom]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--grey-background1-color)',
          color: 'var(--grey-secondary-color)',
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
          backgroundColor: 'var(--blue-background2-color)',
          onClick: () => alert('Clicked magnify icon'),
          path: IconName.mdiMagnify,
        },
        [StatusItemsPosition.TopLeft]: {
          ...statusItemProps,
          ariaLabel: 'Clock icon',
          backgroundColor: 'var(--red-background3-color)',
          onClick: () => alert('Clicked clock icon'),
          path: IconName.mdiClock,
          text: '3000',
        },
        [StatusItemsPosition.Top]: {
          ...statusItemProps,
          backgroundColor: 'var(--red-background3-color)',
          path: IconName.mdiBell,
          text: '4',
          textMaxLength: 2,
        },
        [StatusItemsPosition.Right]: {
          ...statusItemProps,
          backgroundColor: 'var(--blue-background2-color)',
          path: IconName.mdiCalendar,
          text: '20',
          alignIcon: StatusItemIconAlign.Left,
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

const Avatar_Tooltip_Story: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} theme="red" />
);

export const Avatar_Default = Avatar_Story.bind({});
export const Avatar_Icon = Avatar_Story.bind({});
export const Avatar_Round = Avatar_Round_Story.bind({});
export const Avatar_Round_Icon = Avatar_Story.bind({});
export const Avatar_Fallback_Theme = Avatar_Fallback_Theme_Story.bind({});
export const Avatar_Fallback_Hashing = Avatar_Fallback_Hashing_Story.bind({});
export const Avatar_StatusItem = Avatar_StatusItem_Story.bind({});
export const Avatar_Tooltip = Avatar_Tooltip_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Avatar_Default',
  'Avatar_Icon',
  'Avatar_Round',
  'Avatar_Round_Icon',
  'Avatar_Fallback_Theme',
  'Avatar_Fallback_Hashing',
  'Avatar_StatusItem',
  'Avatar_Tooltip',
];

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
    backgroundColor: 'var(--accent-background2-color)',
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
    backgroundColor: 'var(--accent-background2-color)',
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
