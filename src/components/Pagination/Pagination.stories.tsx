import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination, PaginationLayoutOptions } from './index';

export default {
  title: 'Pagination',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Pagination</h1>
              <p>
                If you have too much data to display in one page, use
                pagination.
              </p>
              <p>
                The total number of pages is a required prop as it's used to
                determine the visibility of the paginaiton and its elements. Be
                sure to track the total number of pages at any given time and
                send this information dynamically to the component.
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
    layout: {
      options: [
        PaginationLayoutOptions.Total,
        PaginationLayoutOptions.Sizes,
        PaginationLayoutOptions.Previous,
        PaginationLayoutOptions.Pager,
        PaginationLayoutOptions.Next,
        PaginationLayoutOptions.Jumper,
        PaginationLayoutOptions.NoLast,
      ],
      control: { type: 'check' },
    },
    onCurrentChange: {
      action: 'onCurrentChange',
    },
  },
} as ComponentMeta<typeof Pagination>;

const Basic_Few_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Basic_Few = Basic_Few_Story.bind({});

const Basic_Many_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Basic_Many = Basic_Many_Story.bind({});

const Dots_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Dots = Dots_Story.bind({});

const Total_Item_Count_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Total_Item_Count = Total_Item_Count_Story.bind({});

const Change_Page_Size_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Change_Page_Size = Change_Page_Size_Story.bind({});

const Jump_To_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Jump_To = Jump_To_Story.bind({});

const All_Combined_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const All_Combined = All_Combined_Story.bind({});

const Simplified_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Simplified = Simplified_Story.bind({});

const paginationArgs: Object = {
  classNames: 'my-pagination-class',
  currentPage: 1,
  dots: false,
  layout: [
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
  ],
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50, 100],
  restrictPageSizesPropToSizesLayout: false,
  hideWhenSinglePage: false,
  total: 50,
  'data-test-id': 'myPaginationTestId',
};

Basic_Few.args = {
  ...paginationArgs,
};

Basic_Many.args = {
  ...paginationArgs,
  total: 1000,
};

Dots.args = {
  ...paginationArgs,
  dots: true,
};

Total_Item_Count.args = {
  ...paginationArgs,
  layout: [
    PaginationLayoutOptions.Total,
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
  ],
  total: 1000,
};

Change_Page_Size.args = {
  ...paginationArgs,
  layout: [
    PaginationLayoutOptions.Sizes,
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
  ],
  pageSizes: [100, 200, 300, 400],
  pageSize: 1000,
  total: 1000,
};

Jump_To.args = {
  ...paginationArgs,
  currentPage: 5,
  layout: [
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
    PaginationLayoutOptions.Jumper,
  ],
  pageSize: 100,
  total: 1000,
};

All_Combined.args = {
  ...paginationArgs,
  currentPage: 4,
  layout: [
    PaginationLayoutOptions.Total,
    PaginationLayoutOptions.Sizes,
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
    PaginationLayoutOptions.Jumper,
  ],
  pageSize: 100,
  pageSizes: [100, 200, 300, 400],
  total: 400,
};

Simplified.args = {
  ...paginationArgs,
  layout: [
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
    PaginationLayoutOptions.Simplified,
  ],
};
