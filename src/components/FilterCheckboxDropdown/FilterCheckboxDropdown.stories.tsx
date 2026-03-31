import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FilterCheckboxDropdown } from '.';
import {
  FilterCheckboxDropdownOption,
  FilterCheckboxDropdownProps,
} from './FilterCheckboxDropdown.types';

const defaultOptions: FilterCheckboxDropdownOption[] = [
  { label: 'Option one', value: 'one' },
  { label: 'Option two', value: 'two' },
  { label: 'Option three', value: 'three' },
  { label: 'Option four', value: 'four' },
];

export default {
  title: 'FilterCheckboxDropdown',
  component: FilterCheckboxDropdown,
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Filter Checkbox Dropdown</h1>
              <p>
                An accessible expandable filter button that shows a floating
                panel of checkboxes. The trigger is a plain{' '}
                <code>&lt;button&gt;</code> with <code>aria-expanded</code> and{' '}
                <code>aria-controls</code>. The panel uses{' '}
                <code>role="group"</code> with a <code>ul</code>/<code>li</code>{' '}
                list of standard checkboxes.
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
    label: { control: 'text' },
    options: { control: 'object' },
    selectedValues: { control: 'object' },
    disabled: { control: 'boolean' },
    placement: {
      options: ['bottom-start', 'bottom', 'bottom-end'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof FilterCheckboxDropdown>;

const Template: ComponentStory<typeof FilterCheckboxDropdown> = (
  args: FilterCheckboxDropdownProps
) => (
  <div style={{ padding: '24px' }}>
    <FilterCheckboxDropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Filter',
  options: defaultOptions,
  disabled: false,
  placement: 'bottom-start',
};
