import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu, MenuItemType, MenuSize, MenuVariant } from './';
import { Dropdown } from '../Dropdown';
import { DefaultButton } from '../Button';
import { RadioGroup } from '../RadioButton';
import { IconName } from '../Icon';
import { SelectorSize } from '../CheckBox/Checkbox.types';

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
        value: 'date 1',
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
        text: 'Thumbs up',
        value: 'date 1',
        disabled: true,
        subText: 'This is a sub text',
      },
      {
        iconProps: {
          path: IconName.mdiCalendar,
        },
        text: 'Date',
        value: 'date 1',
        counter: '8',
      },
      {
        text: 'Thumbs up',
        value: 'date 1',
      },
      {
        iconProps: {
          path: IconName.mdiCalendar,
        },
        text: 'Date',
        value: 'date 1',
        counter: '8',
      },
      {
        text: 'Thumbs up',
        value: 'date 1',
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

const SubHeaderOverlay = (args: any) => {
  const menuSizeToSelectorSizeSizeMap = new Map<MenuSize, SelectorSize>([
    [MenuSize.large, SelectorSize.Large],
    [MenuSize.medium, SelectorSize.Medium],
    [MenuSize.small, SelectorSize.Small],
  ]);

  return (
    <Menu
      {...args}
      items={[
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'date 1',
          counter: '8',
        },
        {
          text: 'Thumbs up',
          value: 'date 1',
          disabled: true,
        },
        {
          iconProps: {
            path: IconName.mdiCalendar,
          },
          text: 'Date',
          value: 'date 1',
          counter: '8',
        },
        {
          text: 'Thumbs up',
          value: 'date 1',
        },
        {
          type: MenuItemType.subHeader,
          text: 'Menu Type links',
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
          render: ({ onChange }) => (
            <RadioGroup
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
          value: 'date 1',
          counter: '8',
        },
        {
          text: 'Thumbs up',
          value: 'date 1',
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
  <Dropdown overlay={BasicOverlay(args)}>
    <DefaultButton text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown overlay={LinkOverlay(args)}>
    <DefaultButton text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Header_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown overlay={BasicOverlay(args)}>
    <DefaultButton text={'Menu dropdown'} />
  </Dropdown>
);

const Menu_Sub_Header_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown overlay={SubHeaderOverlay(args)}>
    <DefaultButton text={'Menu dropdown'} />
  </Dropdown>
);

export const BasicMenu = Basic_Menu_Story.bind({});
export const LinkMenu = Menu_Story.bind({});
export const MenuHeader = Menu_Header_Story.bind({});
export const MenuSubHeader = Menu_Sub_Header_Story.bind({});
export const MenuFooter = Menu_Header_Story.bind({});

const menuArgs: object = {
  variant: MenuVariant.neutral,
  size: MenuSize.large,
  classNames: 'my-menu-class',
  style: {},
  itemClassNames: 'my-menu-item-class',
  itemStyle: {},
  listType: 'ul',
};

BasicMenu.args = {
  ...menuArgs,
};

LinkMenu.args = {
  ...menuArgs,
};

MenuHeader.args = {
  header: 'Header 4 is used here',
  ...menuArgs,
};

MenuSubHeader.args = {
  header: 'Header 4 is used here',
  ...menuArgs,
};

MenuFooter.args = {
  header: 'Header 4 is used here',
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
