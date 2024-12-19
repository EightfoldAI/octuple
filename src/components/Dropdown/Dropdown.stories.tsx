import React, { useEffect, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Button,
  ButtonIconAlign,
  ButtonTextAlign,
  ButtonWidth,
  ButtonVariant,
  TwoStateButton,
} from '../Button';
import { CheckBox } from '../CheckBox';
import { Dropdown } from './';
import { Icon, IconName } from '../Icon';
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

const sampleAdditionalItem: User = {
  name: 'Additional user profile',
  icon: IconName.mdiAccount,
};

const Overlay = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        iconProps={{
          path: item.icon,
        }}
        role="listitem"
        style={{
          margin: '4px 0',
        }}
        text={item.name}
        variant={ButtonVariant.Default}
      />
    )}
    role="list"
  />
);

const OverlayWithAdditionalListItem = () => (
  <List<User>
    additionalItem={sampleAdditionalItem}
    items={sampleList}
    renderItem={(item) => (
      <Button
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        iconProps={{
          path: item.icon,
        }}
        role="listitem"
        style={{
          margin: '4px 0',
        }}
        text={item.name}
        variant={ButtonVariant.Default}
      />
    )}
    renderAdditionalItem={(item) => (
      <Button
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        iconProps={{
          path: item.icon,
        }}
        role="listitem"
        style={{
          margin: '4px 0',
        }}
        text={item.name}
        variant={ButtonVariant.Secondary}
      />
    )}
    role="list"
  />
);

const Dropdown_Button_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      {...args}
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
    >
      <Button
        alignIcon={ButtonIconAlign.Right}
        iconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
        id="octuple-dropdown-button-id"
        text={'Click button start'}
        variant={ButtonVariant.Default}
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
      <Button
        iconProps={{
          path: IconName.mdiAccount,
        }}
        prefixIconProps={{
          path: IconName.mdiChevronDown,
          rotate: visible ? 180 : 0,
        }}
        variant={ButtonVariant.Default}
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
      <Button
        alignIcon={ButtonIconAlign.Right}
        checked={visible}
        onClick={() => setVisibility(!visible)}
        text={'External Control'}
        toggle
        variant={ButtonVariant.Default}
      />
      <Dropdown
        {...args}
        visible={visible}
        onVisibleChange={(isVisible) => setVisibility(isVisible)}
      >
        <Button
          alignIcon={ButtonIconAlign.Right}
          text={'Click button start'}
          iconProps={{
            path: IconName.mdiChevronDown,
            rotate: visible ? 180 : 0,
          }}
          variant={ButtonVariant.Default}
        />
      </Dropdown>
    </Stack>
  );
};

const Dropdown_Advanced_Story: ComponentStory<typeof Dropdown> = (args) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [visibleQuickFilter, setVisibleQuickFilter] = useState<{
    [x: string]: boolean;
  }>({});
  const currentDropdown = Object.keys(visibleQuickFilter)?.[0] || '';

  useEffect(() => {
    if (currentDropdown) {
      console.log('Dropdown is: ' + currentDropdown);
    } else {
      setCheckedItems({});
      console.log('checkedItems cleared');
    }
  }, [currentDropdown]);

  useEffect(() => {
    console.log('checkedItems: ', checkedItems);

    if (checkedItems) {
      setVisibleQuickFilter({});
    }
  }, [checkedItems]);

  const toggleQuickFilterVisibility = ({
    key,
    value,
  }: {
    key: string;
    value: boolean;
  }) => {
    setVisibleQuickFilter({ [key]: value });
  };

  const sampleList = [
    {
      name: 'Option one',
    },
    {
      name: 'Option two',
    },
    {
      name: 'Option three',
    },
    {
      name: 'Option four',
    },
  ];

  const handleChange = (event: { target: { value: any; checked: any } }) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  const Overlay = () => (
    <List
      items={sampleList}
      itemProps={{ role: 'listitem' }}
      itemStyle={{
        margin: '4px 0',
      }}
      renderItem={(item) => (
        <CheckBox
          checked={(checkedItems as any)?.[item.name]}
          label={item.name}
          onChange={handleChange}
          role="listitem"
          value={item.name}
        />
      )}
      role="list"
    />
  );

  return (
    <Stack direction="horizontal" flexGap="l">
      <Dropdown
        {...args}
        overlay={Overlay()}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        onVisibleChange={(visible) => {
          toggleQuickFilterVisibility({
            key: 'filter one',
            value: visible,
          });
          if (!visible) {
            console.log('filter one not visible');
          } else {
            console.log('filter one visible');
          }
        }}
        portal
        visible={(visibleQuickFilter as any)?.['filter one']}
      >
        <TwoStateButton
          text="Filter one"
          iconTwoProps={{
            path: IconName.mdiChevronDown,
          }}
        />
      </Dropdown>
      <Dropdown
        {...args}
        overlay={Overlay()}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        onVisibleChange={(visible) => {
          toggleQuickFilterVisibility({
            key: 'filter two',
            value: visible,
          });
          if (!visible) {
            console.log('filter two not visible');
          } else {
            console.log('filter two visible');
          }
        }}
        portal
        visible={(visibleQuickFilter as any)?.['filter two']}
      >
        <TwoStateButton
          text="Filter two"
          iconTwoProps={{
            path: IconName.mdiChevronDown,
          }}
        />
      </Dropdown>
      <Dropdown
        {...args}
        overlay={Overlay()}
        closeOnDropdownClick={false}
        closeOnOutsideClick={false}
        onVisibleChange={(visible) => {
          toggleQuickFilterVisibility({
            key: 'filter three',
            value: visible,
          });
          if (!visible) {
            console.log('filter three not visible');
          } else {
            console.log('filter three visible');
          }
        }}
        portal
        visible={(visibleQuickFilter as any)?.['filter three']}
      >
        <TwoStateButton
          text="Filter three"
          iconTwoProps={{
            path: IconName.mdiChevronDown,
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
export const Dropdown_Advanced_Visible_State = Dropdown_Advanced_Story.bind({});
export const Dropdown_Additional_Item = Dropdown_Button_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Dropdown_Button',
  'Dropdown_IconButton',
  'Dropdown_Div',
  'Dropdown_External',
  'Dropdown_Advanced_Visible_State',
  'Dropdown_Additional_Item',
];

const dropdownArgs: Object = {
  trigger: 'click',
  classNames: 'my-dropdown-class',
  style: {},
  dropdownClassNames: 'my-dropdown-class',
  dropdownStyle: {},
  initialFocus: true,
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

Dropdown_Advanced_Visible_State.args = {
  ...dropdownArgs,
};

Dropdown_Additional_Item.args = {
  ...dropdownArgs,
  overlay: OverlayWithAdditionalListItem(),
};
