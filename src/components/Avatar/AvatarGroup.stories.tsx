import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar, AvatarGroup, AvatarGroupVariant, AvatarPopupProps } from '.';
import { TooltipSize, TooltipTheme } from '../Tooltip';

export default {
  title: 'Avatar Group',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Avatar Group</h1>
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
} as ComponentMeta<typeof AvatarGroup>;

const imageProps = {
  src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  alt: 'random profile image',
};

interface User {
  'data-test-id': string;
  alt: string;
  children: React.ReactNode;
  classNames: string;
  img: string;
  key: string;
  name: string;
  popupProps: AvatarPopupProps;
  randomiseTheme: boolean; // This should be replaced by users profile settings chosen theme.
}

const sampleList: User[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((i) => ({
  'data-test-id': `my-avatar-test-id-${i}`,
  alt: i === 1 ? imageProps.alt : null,
  children: `U${i}`,
  classNames: `my-avatar-class-${i}`,
  img: i === 1 ? imageProps.src : null,
  key: `key-${i}`,
  name: `User ${i}`,
  popupProps: {
    closeOnReferenceClick: false,
    content: `User ${i}`,
    trigger: 'hover',
  },
  randomiseTheme: true,
}));

const Basic_Story: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup
    {...args}
    animateOnHover
    maxProps={{
      count: 4,
      onClick: action('maxcount-click'),
      onKeyDown: action('maxcount-keydown'),
      onMouseEnter: action('maxcount-mouseenter'),
      onMouseLeave: action('maxcount-mouseleave'),
      tabIndex: 0,
      tooltipProps: {
        content: 'User 7, User 8, User 9, User 10',
        theme: TooltipTheme.dark,
      },
    }}
  >
    <Avatar
      alt={imageProps.alt}
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      src={imageProps.src}
      size={args.size}
      tabIndex={0}
      theme={'blue'}
      tooltipProps={{
        content: 'User 1',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    />
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      size={args.size}
      tabIndex={0}
      theme={'green'}
      tooltipProps={{
        content: 'User 2',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    >
      AB
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      size={args.size}
      tabIndex={0}
      theme={'redOrange'}
      tooltipProps={{
        content: 'User 3',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    >
      CD
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      size={args.size}
      tabIndex={0}
      theme={'blueViolet'}
      tooltipProps={{
        content: 'User 4',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    >
      EF
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      size={args.size}
      tabIndex={0}
      theme={'yellowGreen'}
      tooltipProps={{
        content: 'User 5',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    >
      GH
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      onClick={action('avatar-click')}
      onKeyDown={action('avatar-keydown')}
      onMouseEnter={action('avatar-mouseenter')}
      onMouseLeave={action('avatar-mouseleave')}
      size={args.size}
      tabIndex={0}
      theme={'violetRed'}
      tooltipProps={{
        content: 'User 6',
        theme: TooltipTheme.dark,
      }}
      type={args.type}
    >
      IJ
    </Avatar>
  </AvatarGroup>
);

export const Basic = Basic_Story.bind({});

export const Basic_Spaced = Basic_Story.bind({});

const List_Story: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup
    {...args}
    animateOnHover
    avatarListProps={{
      items: sampleList,
      renderItem: (item: User) => (
        <Avatar
          alt={item.alt}
          classNames={item.classNames}
          data-test-id={item['data-test-id']}
          fontSize={args.fontSize}
          hashingFunction={() => 3}
          onClick={action('avatar-click')}
          onKeyDown={action('avatar-keydown')}
          onMouseEnter={action('avatar-mouseenter')}
          onMouseLeave={action('avatar-mouseleave')}
          popupProps={item.popupProps}
          randomiseTheme={item.randomiseTheme}
          size={args.size}
          src={item.img}
          type={args.type}
        >
          {item.children}
        </Avatar>
      ),
    }}
    maxProps={{
      count: 4,
      onClick: action('maxcount-click'),
      onKeyDown: action('maxcount-keydown'),
      onMouseEnter: action('maxcount-mouseenter'),
      onMouseLeave: action('maxcount-mouseleave'),
      tooltipProps: {
        content: 'This is a tooltip.',
        size: TooltipSize.Large,
        theme: TooltipTheme.dark,
      },
    }}
  />
);

export const List_Group = List_Story.bind({});

export const List_Group_Spaced = List_Story.bind({});

const avatarGroupArgs: Object = {
  classNames: 'my-avatar-group-class',
  'data-test-id': 'my-avatar-group-test-id',
  fontSize: '18px',
  maxProps: {},
  size: '40px',
  style: {},
  type: 'round',
};

Basic.args = {
  ...avatarGroupArgs,
};

Basic_Spaced.args = {
  ...avatarGroupArgs,
  groupVariant: AvatarGroupVariant.Spaced,
};

List_Group.args = {
  ...avatarGroupArgs,
};

List_Group_Spaced.args = {
  ...avatarGroupArgs,
  groupVariant: AvatarGroupVariant.Spaced,
};
