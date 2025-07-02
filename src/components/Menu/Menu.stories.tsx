import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Menu,
  MenuItemIconAlign,
  MenuItemType,
  MenuSize,
  MenuVariant,
} from './';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { RadioGroup } from '../RadioButton';
import { IconName } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { SelectorSize } from '../CheckBox';
import { CascadingMenu } from './CascadingMenu';
import { ConfigProvider } from '../ConfigProvider';

export default {
  title: 'Menu',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Menu</h1>
              <p>
                A Menu is a component that offers a grouped list of choices to
                the person using the app.
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
    variant: {
      options: [
        MenuVariant.neutral,
        MenuVariant.primary,
        MenuVariant.disruptive,
      ],
      control: { type: 'radio' },
    },
    size: {
      options: [MenuSize.small, MenuSize.medium, MenuSize.large],
      control: { type: 'radio' },
    },
    onChange: {
      action: 'click',
    },
  },
} as ComponentMeta<typeof Menu>;

const BasicOverlay = (args: any) => (
  <ConfigProvider themeOptions={{ name: 'blue' }}>
    <Menu
      {...args}
      items={[
        {
          text: 'First Menu Item',
          value: 'menu 1',
        },
        {
          text: 'Second Menu Item',
          value: 'menu 2',
        },
        {
          text: 'Third Menu Item',
          value: 'menu 3',
        },
        {
          text: 'Fourth Menu Item',
          value: 'menu 4',
        },
        {
          text: 'Fifth Menu Item',
          value: 'menu 5',
        },
        {
          text: 'Sixth Menu Item',
          value: 'menu 6',
        },
      ]}
      onChange={(item, e) => {
        e?.stopPropagation();
        args.onChange(item, e);
        console.log(item, e);
      }}
    />
  </ConfigProvider>
);

const LinkOverlay = (args: any) => (
  <Menu
    {...args}
    items={[
      {
        type: MenuItemType.link,
        text: 'X link',
        href: 'https://x.com',
        target: '_blank',
      },
      {
        type: MenuItemType.link,
        text: 'Facebook link',
        href: 'https://facebook.com',
        target: '_blank',
      },
      {
        type: MenuItemType.link,
        text: 'Facebook link',
        subText: 'This is a sub text',
        href: 'https://facebook.com',
        target: '_blank',
      },
    ]}
    onChange={(item) => {
      args.onChange(item);
      console.log(item);
    }}
  />
);

const menuSizeToSelectorSizeSizeMap = new Map<MenuSize, SelectorSize>([
  [MenuSize.large, SelectorSize.Large],
  [MenuSize.medium, SelectorSize.Medium],
  [MenuSize.small, SelectorSize.Small],
]);

const SubHeaderOverlay = (args: any) => {
  return (
    <Menu
      {...args}
      items={[
        {
          text: 'First Menu Item',
          value: 'menu 1',
        },
        {
          text: 'Second Menu Item',
          value: 'menu 2',
        },
        {
          text: 'Third Menu Item',
          value: 'menu 3',
        },
        {
          text: 'Fourth Menu Item',
          value: 'menu 4',
        },
        {
          text: 'Fifth Menu Item',
          value: 'menu 5',
        },
        {
          text: 'Sixth Menu Item',
          value: 'menu 6',
        },
      ]}
      onChange={(item, e) => {
        e?.stopPropagation();
        args.onChange(item, e);
        console.log(item, e);
      }}
    />
  );
};

const Basic_Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <div
    onClick={() => {
      console.log('Click event bubbled to parent');
    }}
  >
    <Dropdown initialFocus overlay={BasicOverlay(args)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  </div>
);

const Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <div
    onClick={() => {
      console.log('Click event bubbled to parent');
    }}
  >
    <Dropdown initialFocus overlay={LinkOverlay(args)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  </div>
);

const Menu_Header_Story: ComponentStory<typeof Menu> = (args) => (
  <div
    onClick={() => {
      console.log('Click event bubbled to parent');
    }}
  >
    <Dropdown initialFocus overlay={BasicOverlay(args)}>
      <Button text={'Menu dropdown'} />
    </Dropdown>
  </div>
);

const Menu_Sub_Header_Story: ComponentStory<typeof Menu> = (args) => (
  // When hosting selectors, do not close dropdown on click :)
  <div
    onClick={() => {
      console.log('Click event bubbled to parent');
    }}
  >
    <Dropdown
      closeOnDropdownClick={false}
      initialFocus
      overlay={SubHeaderOverlay(args)}
    >
      <Button text={'Menu dropdown'} />
    </Dropdown>
  </div>
);

const Cascading_Menu_Story: ComponentStory<typeof Menu> = (args) => {
  const htmlDir = useCanvasDirection();

  return (
    <CascadingMenu
      {...args}
      items={[
        {
          text: 'First Menu Item',
          value: 'menu 1',
        },
        {
          text: 'Second Menu Item',
          value: 'menu 2',
        },
        {
          text: 'Third Menu Item',
          value: 'menu 3',
        },
        {
          text: 'Fourth Menu Item',
          value: 'menu 4',
        },
        {
          text: 'Fifth Menu Item',
          value: 'menu 5',
        },
        {
          text: 'Sixth Menu Item',
          value: 'menu 6',
        },
      ]}
      onChange={(item) => {
        args.onChange(item);
        console.log(item);
      }}
    >
      <Button text={'Cascading menu'} />
    </CascadingMenu>
  );
};

export const Basic_Menu = Basic_Menu_Story.bind({});
export const Link_Menu = Menu_Story.bind({});
export const Menu_Header = Menu_Header_Story.bind({});
export const Menu_Sub_Header = Menu_Sub_Header_Story.bind({});
export const Menu_Footer = Menu_Header_Story.bind({});
export const Cascading_Menu = Cascading_Menu_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic_Menu',
  'Link_Menu',
  'Menu_Header',
  'Menu_Sub_Header',
  'Menu_Footer',
  'Cascading_Menu',
];

const menuArgs: object = {
  variant: MenuVariant.neutral,
  size: MenuSize.medium,
  classNames: 'my-menu-class',
  style: {},
  itemClassNames: 'my-menu-item-class',
  itemStyle: {},
  listType: 'ul',
  role: 'list',
  itemProps: { role: 'listitem' },
  applyCyclicNavigation: false,
};

Basic_Menu.args = {
  ...menuArgs,
};

Link_Menu.args = {
  ...menuArgs,
};

Menu_Header.args = {
  header: 'Header',
  ...menuArgs,
};

Menu_Sub_Header.args = {
  header: 'Header',
  ...menuArgs,
};

Menu_Footer.args = {
  header: 'Header',
  ...menuArgs,
  cancelButtonProps: {
    ariaLabel: 'Cancel',
    classNames: 'my-cancel-btn-class',
    'data-test-id': 'my-cancel-btn-test-id',
    iconProps: null,
    id: 'myCancelButton',
    text: 'Cancel',
  },
  okButtonProps: {
    ariaLabel: 'Accept',
    classNames: 'my-accept-btn-class',
    'data-test-id': 'my-accept-btn-test-id',
    iconProps: null,
    id: 'myAcceptButton',
    text: 'Accept',
  },
};

Cascading_Menu.args = {
  header: 'Header',
  ...menuArgs,
};
