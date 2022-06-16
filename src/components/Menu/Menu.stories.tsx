import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from './';
import { IconName } from '../Icon';
import { Dropdown } from '../Dropdown';
import { DefaultButton } from '../Button';

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
} as ComponentMeta<typeof Menu>;

const Overlay = (args: any) => (
  <Menu
    {...args}
    items={[
      {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 1',
      },
    ]}
    onChange={(item) => {
      console.log(item);
    }}
  />
);

const Menu_Story: ComponentStory<typeof Menu> = (args) => (
  <Dropdown overlay={Overlay(args)}>
    <DefaultButton disruptive={args.disruptive} text={'Menu dropdown'} />
  </Dropdown>
);

export const Menus = Menu_Story.bind({});

Menus.args = {
  disruptive: false,
  classNames: 'my-menu-class',
  style: {},
  itemClassNames: 'my-menu-item-class',
  itemStyle: {},
  listType: 'ul',
};
