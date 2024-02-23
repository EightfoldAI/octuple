import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PagerSizeOptions, Pagination, PaginationLayoutOptions } from './index';

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
    theme: {
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
      ],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Pagination>;

const Pagination_Story: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Basic_Few = Pagination_Story.bind({});
export const Basic_Many = Pagination_Story.bind({});
export const Dots = Pagination_Story.bind({});
export const Total_Item_Count = Pagination_Story.bind({});
export const Change_Page_Size = Pagination_Story.bind({});
export const Jump_To = Pagination_Story.bind({});
export const All_Combined = Pagination_Story.bind({});
export const Simplified = Pagination_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic_Few',
  'Basic_Many',
  'Dots',
  'Total_Item_Count',
  'Change_Page_Size',
  'Jump_To',
  'All_Combined',
  'Simplified',
];

const paginationArgs: Object = {
  classNames: 'my-pagination-class',
  currentPage: 1,
  dots: false,
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  gradient: false,
  theme: '',
  themeContainerId: 'my-pagination-theme-container',
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
  pagerSize: PagerSizeOptions.Medium,
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
