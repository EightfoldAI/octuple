import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { List } from '../List';
import { IconName } from '../Icon';
import { Accordion, AccordionProps, AccordionSize, AccordionShape } from './';

export default {
  title: 'Accordion',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Accordion</h1>
              <p>
                Accordions display a list of high-level options that can
                expand/collapse to reveal more information.
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
    shape: {
      options: [AccordionShape.Pill, AccordionShape.Rectangle],
      control: { type: 'radio' },
    },
    size: {
      options: [AccordionSize.Medium, AccordionSize.Large],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Accordion>;

const listItems: AccordionProps[] = [
  {
    iconProps: {
      color: 'green',
      path: IconName.mdiCheckCircleOutline,
    },
    badgeProps: {
      children: 2,
    },
    summary: 'Notification testing',
    children:
      'Icons are optional for accordions. The body area in the expanded view is like a modal or a slide-in panel. You can put any smaller components inside to build a layout.',
    id: '1',
  },
  {
    iconProps: {
      color: 'green',
      path: IconName.mdiCheckCircleOutline,
    },
    badgeProps: {
      children: 12,
    },
    summary: 'Notification testing',
    children:
      'Icons are optional for accordions. The body area in the expanded view is like a modal or a slide-in panel. You can put any smaller components inside to build a layout.',
    id: '2',
  },
];

const Single_Story: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

const List_Story: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Single = Single_Story.bind({});
export const List_Vertical = List_Story.bind({});
export const List_Horizontal = List_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Single',
  'List_Vertical',
  'List_Horizontal',
];

Single.args = {
  children: (
    <>
      <div style={{ height: 'auto' }}>
        Icons are optional for accordions. The body area in the expanded view is
        like a modal or a slide-in panel. You can put any smaller components
        inside to build a layout.
      </div>
    </>
  ),
  id: 'myAccordionId',
  expandButtonProps: null,
  expandIconProps: {
    path: IconName.mdiChevronDown,
  },
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  gradient: false,
  summary: 'Accordion Header',
  iconProps: {
    color: 'green',
    path: IconName.mdiCheckCircleOutline,
  },
  badgeProps: {
    children: 2,
  },
  bordered: true,
  shape: AccordionShape.Pill,
  size: AccordionSize.Large,
  expanded: false,
  disabled: false,
};

const listArgs: Object = {
  items: listItems,
  footer: (
    <>
      <div style={{ paddingLeft: '16px' }}>
        <h3>Footer</h3>
      </div>
    </>
  ),
  layout: 'vertical',
  renderItem: (item: AccordionProps) => <Accordion {...item} />,
  header: (
    <>
      <div style={{ paddingLeft: '16px' }}>
        <h2>Header</h2>
      </div>
    </>
  ),
  classNames: 'my-list-class',
  style: {},
  itemClassNames: 'my-list-item-class',
  itemStyle: {
    padding: '8px 16px',
  },
  listType: 'ul',
};

List_Vertical.args = {
  ...listArgs,
};

List_Horizontal.args = {
  ...listArgs,
  layout: 'horizontal',
  itemStyle: {
    padding: '8px',
  },
};
