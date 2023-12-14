import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import {
  CheckBox,
  CheckBoxGroup,
  CheckboxValueType,
  LabelAlign,
  LabelPosition,
  SelectorSize,
  SelectorVariant,
  SelectorWidth,
} from './';

export default {
  title: 'Check Box',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Check Box</h1>
              <p>
                Check boxes (CheckBox) give people a way to select one or more
                items from a group, or switch between two mutually exclusive
                options (checked or unchecked, on or off).
              </p>
              <h2>Best practices</h2>
              <h3>Layout</h3>
              <ul>
                <li>
                  Use a single check box when there's only one selection to make
                  or choice to confirm. Selecting a blank check box selects it.
                  Selecting it again clears the check box.
                </li>
                <li>
                  Use multiple check boxes when one or more options can be
                  selected from a group. Unlike radio buttons, selecting one
                  check box will not clear another check box.
                </li>
              </ul>
              <h3>Content</h3>
              <ul>
                <li>
                  Separate two groups of check boxes with headings rather than
                  positioning them one after the other.
                </li>
                <li>
                  Use sentence-style capitalization—only capitalize the first
                  word.
                </li>
                <li>
                  Don't use end punctuation (unless the check box label
                  absolutely requires multiple sentences).
                </li>
                <li>
                  Use a sentence fragment for the label, rather than a full
                  sentence.
                </li>
                <li>
                  Make it easy for people to understand what will happen if they
                  select or clear a check box.
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
    checked: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    onChange: {
      action: 'change',
    },
    labelPosition: {
      options: [LabelPosition.End, LabelPosition.Start],
      control: { type: 'inline-radio' },
    },
    labelAlign: {
      options: [LabelAlign.Start, LabelAlign.Center, LabelAlign.End],
      control: { type: 'inline-radio' },
    },
    layout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
    size: {
      options: [
        SelectorSize.Flex,
        SelectorSize.Large,
        SelectorSize.Medium,
        SelectorSize.Small,
      ],
      control: { type: 'radio' },
    },
    variant: {
      options: [SelectorVariant.Default, SelectorVariant.Pill],
      control: { type: 'inline-radio' },
    },
    selectorWidth: {
      options: [SelectorWidth.fitContent, SelectorWidth.fill],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof CheckBox>;

const CheckBox_Story: ComponentStory<typeof CheckBox> = (args) => {
  const [_, updateArgs] = useArgs();
  const onSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      ...args,
      checked: event.currentTarget.checked,
      indeterminate: false,
    });
  };
  return <CheckBox {...args} onChange={onSelectionChange} />;
};

const CheckBox_Long_text_Story: ComponentStory<typeof CheckBox> = (args) => {
  const [_, updateArgs] = useArgs();
  const onSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      ...args,
      checked: event.currentTarget.checked,
      indeterminate: false,
    });
  };
  return (
    <div style={{ width: 200 }}>
      <CheckBox {...args} onChange={onSelectionChange} />
    </div>
  );
};

const CheckBoxGroup_Story: ComponentStory<typeof CheckBoxGroup> = (args) => {
  const [selected, setSelected] = useState<CheckboxValueType[]>([]);
  return (
    <CheckBoxGroup
      {...args}
      value={selected}
      onChange={(newSelected) => {
        args.onChange(newSelected);
        setSelected([...newSelected]);
      }}
    />
  );
};

export const Check_Box = CheckBox_Story.bind({});
export const Check_Box_Pill = CheckBox_Story.bind({});
export const Check_Box_Long_Text = CheckBox_Long_text_Story.bind({});
export const Check_Box_Group = CheckBoxGroup_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Check_Box',
  'Check_Box_Pill',
  'Check_Box_Long_Text',
  'Check_Box_Group',
];

const checkBoxArgs: Object = {
  allowDisabledFocus: false,
  ariaLabel: 'Label',
  checked: true,
  classNames: 'my-checkbox-class',
  disabled: false,
  indeterminate: false,
  name: 'myCheckBoxName',
  value: 'label',
  label: 'Label',
  labelPosition: LabelPosition.End,
  labelAlign: LabelAlign.Center,
  id: 'myCheckBoxId',
  defaultChecked: false,
  selectorWidth: SelectorWidth.fitContent,
  size: SelectorSize.Medium,
  toggle: false,
  variant: SelectorVariant.Default,
};

Check_Box.args = {
  ...checkBoxArgs,
};

Check_Box_Pill.args = {
  ...checkBoxArgs,
  variant: SelectorVariant.Pill,
};

Check_Box_Long_Text.args = {
  ...checkBoxArgs,
  label:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
};

Check_Box_Group.args = {
  allowDisabledFocus: false,
  value: ['First'],
  defaultChecked: ['First'],
  disabled: false,
  items: [
    {
      name: 'group',
      value: 'First',
      label: 'First',
      id: 'test-1',
    },
    {
      name: 'group',
      value: 'Second',
      label: 'Second',
      id: 'test-2',
    },
    {
      name: 'group',
      value: 'Third',
      label: 'Third',
      id: 'test-3',
    },
  ],
  layout: 'vertical',
  selectorWidth: SelectorWidth.fitContent,
  size: SelectorSize.Medium,
  variant: SelectorVariant.Default,
};
