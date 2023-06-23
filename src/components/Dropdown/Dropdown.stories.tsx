import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  ButtonIconAlign,
  ButtonTextAlign,
  ButtonWidth,
  DefaultButton,
} from '../Button';
import { Icon, IconName } from '../Icon';
import { Dropdown } from './';
import { List } from '../List';
import { Stack } from '../Stack';

export default {
  title: 'Dropdown',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Dropdown</h1>
              <p>
                A dropdown is a list in which the selected item is always
                visible while other items are visible on demand by clicking a
                dropdown button. Dropdowns are typically used for forms.
              </p>
              <h2>Best practices</h2>
              <h3>Layout</h3>
              <ul>
                <li>
                  Use a dropdown when there are multiple choices that can be
                  collapsed under one title, if the list of items is too long,
                  or when space is constrained.
                </li>
                <li>
                  Use a dropdown when the selected option is more important than
                  the alternatives (in contrast to radio buttons where all the
                  choices are visible, putting equal emphasis on all options).
                </li>
              </ul>
              <h3>Content</h3>
              <ul>
                <li>
                  Use sentence-style capitalization—only capitalize the first
                  word.
                </li>
                <li>
                  The dropdown trigger element should describe what can be found
                  in the list of options.
                </li>
                <li>
                  Use shortened statements or single words as list options.
                </li>
                <li>
                  If there isn't a default option, use "Select an option" as
                  placeholder text.
                </li>
                <li>If "None" is an option, include it.</li>
                <li>
                  Write the choices using parallel construction. For example,
                  start with the same part of speech or verb tense.
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
    trigger: {
      options: ['click', 'hover', 'contextmenu'],
      control: { type: 'radio' },
    },
    placement: {
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
    positionStrategy: {
      options: ['absolute', 'fixed'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Dropdown>;

interface User {
  name: string;
  icon: IconName;
}

const sampleList: User[] = [1, 2, 3, 4, 5].map((i) => ({
  name: `User profile ${i}`,
  icon: IconName.mdiAccount,
}));

const Overlay = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <DefaultButton
        text={item.name}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        iconProps={{
          path: item.icon,
        }}
        role="menuitem"
        style={{
          margin: '4px 0',
        }}
      />
    )}
    role="menu"
  />
);

const Dropdown_Button_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      {...args}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <DefaultButton
        alignIcon={ButtonIconAlign.Right}
        text={'Click button start'}
        iconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
        id="octuple-dropdown-button-id"
      />
    </Dropdown>
  );
};

const Dropdown_IconButton_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      {...args}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <DefaultButton
        iconProps={{
          path: IconName.mdiAccount,
        }}
        prefixIconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
      />
    </Dropdown>
  );
};

const Dropdown_Div_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      {...args}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <div style={{ display: 'flex' }}>
        <code>HTMLDivElement</code>
        <Icon path={IconName.mdiChevronDown} rotate={visible ? 180 : 0} />
      </div>
    </Dropdown>
  );
};

const Dropdown_External_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Stack direction="horizontal" flexGap="xxl">
      <DefaultButton
        alignIcon={ButtonIconAlign.Right}
        checked={visible}
        onClick={() => setVisibility(!visible)}
        text={'External Control'}
        toggle
      />
      <Dropdown
        {...args}
        visible={visible}
        onVisibleChange={(isVisible) => setVisibility(isVisible)}
      >
        <DefaultButton
          alignIcon={ButtonIconAlign.Right}
          text={'Click button start'}
          iconProps={{
            path: IconName.mdiChevronDown,
            rotate: visible ? 180 : 0,
          }}
        />
      </Dropdown>
    </Stack>
  );
};

export const Dropdown_Button = Dropdown_Button_Story.bind({});
export const Dropdown_IconButton = Dropdown_IconButton_Story.bind({});
export const Dropdown_Div = Dropdown_Div_Story.bind({});
export const Dropdown_External = Dropdown_External_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Dropdown_Button',
  'Dropdown_IconButton',
  'Dropdown_Div',
  'Dropdown_External',
];

const dropdownArgs: Object = {
  trigger: 'click',
  classNames: 'my-dropdown-class',
  style: {},
  dropdownClassNames: 'my-dropdown-class',
  dropdownStyle: {},
  placement: 'bottom-start',
  overlay: Overlay(),
  offset: 0,
  positionStrategy: 'absolute',
  disabled: false,
  closeOnDropdownClick: true,
  portal: false,
};

Dropdown_Button.args = {
  ...dropdownArgs,
};

Dropdown_Div.args = {
  ...dropdownArgs,
};

Dropdown_IconButton.args = {
  ...dropdownArgs,
};

Dropdown_External.args = {
  ...dropdownArgs,
};
