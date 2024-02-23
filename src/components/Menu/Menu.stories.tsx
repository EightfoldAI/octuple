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
  <Menu
    {...args}
    items={[
      {
        iconProps: {
          path: IconName.mdiCalendar,
        },
        text: 'Date',
        value: 'menu 1',
        counter: '8',
        secondaryButtonProps: {
          iconProps: {
            path: IconName.mdiTrashCan,
          },
          onClick: () => {
            console.log('Delete clicked');
          },
        },
      },
      {
        text: 'Disabled button',
        value: 'menu 2',
        disabled: true,
        subText: 'This is a sub text',
      },
      {
        iconProps: {
          path: IconName.mdiCalendar,
        },
        text: 'Date',
        value: 'menu 3',
        counter: '8',
      },
      {
        text: 'Button',
        value: 'menu 4',
      },
      {
        iconProps: {
          path: IconName.mdiCalendar,
        },
        text: 'Date',
        value: 'menu 5',
        counter: '8',
      },
      {
        text: 'Button',
        value: 'menu 6',
      },
    ]}
    onChange={(item) => {
      args.onChange(item);
      console.log(item);
    }}
  />
);

const LinkOverlay = (args: any) => (
  <Menu
    {...args}
    items={[
      {
        type: MenuItemType.link,
        text: 'Twitter link',
        href: 'https://twitter.com',
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
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'menu 1',
          counter: '8',
        },
        {
          text: 'Disabled button',
          value: 'menu 2',
          disabled: true,
        },
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'menu 3',
          counter: '8',
        },
        {
          text: 'Button',
          value: 'menu 4',
        },
        {
          type: MenuItemType.subHeader,
          text: 'Sub header',
        },
        {
          type: MenuItemType.link,
          text: 'Twitter link',
          href: 'https://twitter.com',
          target: '_blank',
        },
        {
          type: MenuItemType.link,
          text: 'Facebook link',
          href: 'https://facebook.com',
          target: '_blank',
        },
        {
          type: MenuItemType.subHeader,
          text: 'Menu type custom',
        },
        {
          type: MenuItemType.custom,
          render: ({ onChange, ...rest }) => (
            <RadioGroup
              {...rest}
              {...{
                ariaLabel: 'Radio Group',
                value: 'Radio1',
                items: [1, 2, 3].map((i) => ({
                  value: `Radio${i}`,
                  label: `Radio${i}`,
                  name: 'group',
                  id: `oea2exk-${i}`,
                })),
                layout: 'vertical',
              }}
              onChange={onChange}
              size={menuSizeToSelectorSizeSizeMap.get(args.size)}
            />
          ),
        },
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'menu 5',
          counter: '8',
        },
        {
          text: 'Button',
          value: 'menu 6',
        },
      ]}
      onChange={(item) => {
        args.onChange(item);
        console.log(item);
      }}
    />
  );
};

const Basic_Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown initialFocus overlay={BasicOverlay(args)}>
    <Button text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown initialFocus overlay={LinkOverlay(args)}>
    <Button text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Header_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown initialFocus overlay={BasicOverlay(args)}>
    <Button text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Sub_Header_Story: ComponentStory<typeof Menu> = (args) => (
  // When hosting selectors, do not close dropdown on click :)
  <Dropdown
    closeOnDropdownClick={false}
    initialFocus
    overlay={SubHeaderOverlay(args)}
  >
    <Button text={'Menu dropdown'} />
  </Dropdown>
);

const Cascading_Menu_Story: ComponentStory<typeof Menu> = (args) => {
  const htmlDir = useCanvasDirection();

  return (
    <CascadingMenu
      {...args}
      items={[
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Button',
          value: 'menu 1',
          counter: '8',
          secondaryButtonProps: {
            iconProps: {
              path: IconName.mdiTrashCan,
            },
            onClick: () => {
              console.log('Delete clicked');
            },
          },
        },
        {
          text: 'Disabled button',
          value: 'menu 2',
          disabled: true,
          subText: 'This is a sub text',
        },
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'menu 3',
          counter: '8',
        },
        {
          alignIcon: MenuItemIconAlign.Right,
          iconProps: {
            path:
              htmlDir === 'rtl'
                ? IconName.mdiChevronLeft
                : IconName.mdiChevronRight,
          },
          dropdownMenuItems: [
            {
              text: 'Button',
              value: 'subMenuA 1',
            },
            {
              text: 'Button',
              value: 'subMenuA 1',
            },
            {
              text: 'Button',
              value: 'subMenuA 1',
            },
            {
              alignIcon: MenuItemIconAlign.Right,
              iconProps: {
                path:
                  htmlDir === 'rtl'
                    ? IconName.mdiChevronLeft
                    : IconName.mdiChevronRight,
              },
              dropdownMenuItems: [
                {
                  type: MenuItemType.subHeader,
                  text: 'Sub header',
                },
                {
                  type: MenuItemType.custom,
                  render: ({ onChange, ...rest }) => (
                    <RadioGroup
                      {...rest}
                      {...{
                        ariaLabel: 'Radio Group',
                        value: 'Radio1',
                        items: [1, 2, 3].map((i) => ({
                          value: `Radio${i}`,
                          label: `Radio${i}`,
                          name: 'group',
                          id: `oea2exk-${i}`,
                        })),
                        layout: 'vertical',
                      }}
                      onChange={onChange}
                      size={menuSizeToSelectorSizeSizeMap.get(args.size)}
                    />
                  ),
                },
              ],
              text: 'Sub menu',
              value: 'subMenuA 2',
            },
          ],
          text: 'Sub menu',
          value: 'menu 4',
          dropdownMenuProps: {
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
          },
        },
        {
          text: 'Button',
          value: 'menu 6',
        },
        {
          text: 'Button',
          value: 'menu 7',
        },
        {
          type: MenuItemType.subHeader,
          text: 'Sub header',
        },
        {
          type: MenuItemType.link,
          text: 'Twitter link',
          href: 'https://twitter.com',
          target: '_blank',
        },
        {
          type: MenuItemType.link,
          text: 'Facebook link',
          href: 'https://facebook.com',
          target: '_blank',
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
