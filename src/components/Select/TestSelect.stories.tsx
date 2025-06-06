import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './';
import { SelectSize } from './Select.types';

export default {
  title: 'Tests/Select Focus Behavior',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Test stories for validating the focus behavior of Select components. When the dropdown opens, it should automatically focus on the first element.',
      },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

// Basic Select component with options
export const BasicSelect = Template.bind({});
BasicSelect.args = {
  placeholder: 'Basic Select',
  options: [
    { text: 'Apple', value: 'apple' },
    { text: 'Banana', value: 'banana' },
    { text: 'Cherry', value: 'cherry' },
    { text: 'Date', value: 'date' },
    { text: 'Elderberry', value: 'elderberry' },
  ],
  size: SelectSize.Medium,
};
BasicSelect.parameters = {
  docs: {
    description: {
      story:
        'Basic Select component. When clicked, the dropdown should open and focus on the first option (Apple).',
    },
  },
};

// Filterable Select component
export const FilterableSelect = Template.bind({});
FilterableSelect.args = {
  placeholder: 'Filterable Select',
  filterable: true,
  options: [
    { text: 'Red', value: 'red' },
    { text: 'Green', value: 'green' },
    { text: 'Blue', value: 'blue' },
    { text: 'Yellow', value: 'yellow' },
    { text: 'Purple', value: 'purple' },
  ],
  size: SelectSize.Medium,
};
FilterableSelect.parameters = {
  docs: {
    description: {
      story:
        'Filterable Select component. When clicked, the dropdown should open and focus on the first option (Red). You can type to filter options.',
    },
  },
};

// Multiple Select component
export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  placeholder: 'Multiple Select',
  multiple: true,
  options: [
    { text: 'Cat', value: 'cat' },
    { text: 'Dog', value: 'dog' },
    { text: 'Fish', value: 'fish' },
    { text: 'Bird', value: 'bird' },
    { text: 'Hamster', value: 'hamster' },
  ],
  size: SelectSize.Medium,
};
MultipleSelect.parameters = {
  docs: {
    description: {
      story:
        'Multiple Select component. When clicked, the dropdown should open and focus on the first option (Cat). You can select multiple options.',
    },
  },
};

// Multiple Filterable Select component
export const MultipleFilterableSelect = Template.bind({});
MultipleFilterableSelect.args = {
  placeholder: 'Multiple Filterable Select',
  multiple: true,
  filterable: true,
  options: [
    { text: 'JavaScript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },
    { text: 'Python', value: 'py' },
    { text: 'Java', value: 'java' },
    { text: 'C#', value: 'csharp' },
  ],
  size: SelectSize.Medium,
};
MultipleFilterableSelect.parameters = {
  docs: {
    description: {
      story:
        'Multiple Filterable Select component. When clicked, the dropdown should open and focus on the first option (JavaScript). You can select multiple options and filter by typing.',
    },
  },
};

// Test with different sizes
export const SmallSelect = Template.bind({});
SmallSelect.args = {
  placeholder: 'Small Select',
  options: [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
  ],
  size: SelectSize.Small,
};

export const LargeSelect = Template.bind({});
LargeSelect.args = {
  placeholder: 'Large Select',
  options: [
    { text: 'Option A', value: 'optionA' },
    { text: 'Option B', value: 'optionB' },
    { text: 'Option C', value: 'optionC' },
  ],
  size: SelectSize.Large,
};
