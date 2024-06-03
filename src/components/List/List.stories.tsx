import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from './';
import { Stack } from '../Stack';
import { Button } from '../Button';

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

const sampleList: User[] = [0, 1, 2, 3, 4].map((i) => ({
  name: `User ${i}`,
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  img: '',
}));

const List_Story: ComponentStory<typeof List> = (args) => <List {...args} />;

const Update_List_Story: ComponentStory<typeof List> = (args) => {
  const [list, setSampleList] = useState<User[]>(sampleList);
  const addItem = (i: number) => {
    setSampleList((prevSampleList) => [
      ...prevSampleList,
      {
        name: `User ${i}`,
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        img: '',
      },
    ]);
  };
  const removeItem = () => {
    setSampleList((prevSampleList) => prevSampleList.slice(0, -1));
  };
  return (
    <Stack direction="vertical" flexGap="xl" fullWidth>
      <Stack direction="horizontal" flexGap="s">
        <Button onClick={() => addItem(list.length)} text="Add item" />
        <Button
          disabled={list.length === 0}
          onClick={() => removeItem()}
          text="Remove item"
        />
      </Stack>
      <List {...args} items={list} />
    </Stack>
  );
};

export const Vertical = List_Story.bind({});
export const Horizontal = List_Story.bind({});
export const Update = Update_List_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Vertical', 'Horizontal', 'Update'];

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
  classNames: 'my-ref-class',
  style: {},
  itemClassNames: 'my-list-item-class',
  itemStyle: { padding: '8px 16px' },
  listClassNames: 'my-list-class',
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

Update.args = {
  ...listArgs,
};
