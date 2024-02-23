import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckBox, LabelPosition, SelectorSize } from '.';

export default {
  title: 'Toggle Switch',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Toggle Switch</h1>
              <p>
                Toggle switches (ToggleSwitch) give people a way to select one
                or more items from a group, or switch between two mutually
                exclusive options (checked or unchecked, on or off). To use a
                toggle switch, simply add the <b>toggle</b> prop to a{' '}
                <b>Checkbox</b>
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
} as ComponentMeta<typeof CheckBox>;

const Toggle_Switch_Story: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox checked={true} {...args} />
);

export const Toggle_Switch = Toggle_Switch_Story.bind({});

const checkBoxArgs: Object = {
  allowDisabledFocus: false,
  ariaLabel: 'Label',
  classNames: 'my-toggle-class',
  configContextProps: {
    noDisabledContext: false,
    noSizeContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-toggle-theme-container',
  disabled: false,
  name: 'myToggleName',
  value: 'label',
  label: 'Label',
  labelPosition: LabelPosition.End,
  id: 'myToggleId',
  defaultChecked: false,
  size: SelectorSize.Medium,
  toggle: false,
};

Toggle_Switch.args = {
  ...checkBoxArgs,
  toggle: true,
};
