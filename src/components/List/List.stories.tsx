import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from './';

export default {
  title: 'List',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>List</h1>
              <p>
                A list provides a base component for rendering sets of items.
                It's agnostic of layout, and selection management.
              </p>
              <h2>Best practices</h2>
              <h3>Content</h3>
              <ul>
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
    layout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof List>;

interface User {
  name: string;
  summary: string;
  img: string;
}

const sampleList: User[] = [1, 2, 3, 4, 5].map((i) => ({
  name: `User ${i}`,
  summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  img: '',
}));

const Vertical_Story: ComponentStory<typeof List> = (args) => (
  <List {...args} />
);

export const Vertical = Vertical_Story.bind({});

const Horizontal_Story: ComponentStory<typeof List> = (args) => (
  <List {...args} />
);

export const Horizontal = Horizontal_Story.bind({});

const listArgs: Object = {
  items: sampleList,
  footer: (
    <div style={{ paddingLeft: '16px' }}>
      <h3>Footer</h3>
    </div>
  ),
  layout: 'vertical',
  renderItem: (item: User) => (
    <div>
      <p>{item.name}</p>
      <div>{item.summary}</div>
    </div>
  ),
  header: (
    <div style={{ paddingLeft: '16px' }}>
      <h2>Header</h2>
    </div>
  ),
  classNames: 'my-list-class',
  style: {},
  itemClassNames: 'my-list-item-class',
  itemStyle: { padding: '8px 16px' },
  listType: 'ul',
  role: '',
};

Vertical.args = {
  ...listArgs,
};

Horizontal.args = {
  ...listArgs,
  layout: 'horizontal',
};
