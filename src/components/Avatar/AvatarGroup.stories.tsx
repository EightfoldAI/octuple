import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar, AvatarGroup, AvatarGroupStyle } from '.';
import { Tooltip, TooltipSize, TooltipTheme } from '../Tooltip';

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
  randomiseTheme: true,
}));

const Basic_Story: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup
    {...args}
    maxProps={{
      count: 4,
    }}
  >
    <Avatar
      alt={imageProps.alt}
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      src={imageProps.src}
      size={args.size}
      theme={'blue'}
      type={args.type}
    />
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      size={args.size}
      theme={'green'}
      type={args.type}
    >
      AB
    </Avatar>
    <Tooltip content="User profile">
      <Avatar
        fontSize={args.fontSize}
        hashingFunction={() => 3}
        size={args.size}
        theme={'redOrange'}
        type={args.type}
      >
        CD
      </Avatar>
    </Tooltip>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      size={args.size}
      theme={'blueViolet'}
      type={args.type}
    >
      EF
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      size={args.size}
      theme={'yellowGreen'}
      type={args.type}
    >
      GH
    </Avatar>
    <Avatar
      fontSize={args.fontSize}
      hashingFunction={() => 3}
      size={args.size}
      theme={'violetRed'}
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
    avatarListProps={{
      items: sampleList,
      renderItem: (item: User) => (
        <Avatar
          alt={item.alt}
          classNames={item.classNames}
          data-test-id={item['data-test-id']}
          fontSize={args.fontSize}
          hashingFunction={() => 3}
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
  groupStyle: AvatarGroupStyle.Spaced,
};

List_Group.args = {
  ...avatarGroupArgs,
};

List_Group_Spaced.args = {
  ...avatarGroupArgs,
  groupStyle: AvatarGroupStyle.Spaced,
};
