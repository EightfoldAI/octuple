import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkillSize, SkillStatus, SkillTag, SkillTagProps } from '.';
import {
  Button,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { IconName } from '../Icon';
import { List } from '../List';
import { Stack } from '../Stack';

export default {
  title: 'SkillTag',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h2>Skill tag</h2>
              <p>
                Skill tag is the smaller size representation of a skill. Skill
                tag without button is used in small space like cards since
                adding a skill tag with a button will create complex interaction
                for the component.
              </p>
              <p>
                In the surface layer interface, Skill tag can have one button
                Skill tags must be at least medium size to contain a button.
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
    onClick: {
      action: 'click',
    },
    onKeyDown: {
      action: 'keydown',
    },
    onRemove: {
      action: 'remove',
    },
    size: {
      options: [
        SkillSize.Large,
        SkillSize.Medium,
        SkillSize.Small,
        SkillSize.XSmall,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof SkillTag>;

interface User {
  name: string;
  icon: IconName;
}

const sampleList: User[] = [1, 2, 3].map((i) => ({
  name: `Button ${i}`,
  icon: IconName.mdiAccount,
}));

const Overlay = () => (
  <List<User>
    items={sampleList}
    renderItem={(item) => (
      <Button
        text={item.name}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        size={ButtonSize.Medium}
        variant={ButtonVariant.SystemUI}
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

const SkillTag_Story: ComponentStory<typeof SkillTag> = (args) => {
  return (
    <Stack direction="vertical" flexGap="l" align="flex-start">
      <SkillTag {...args} label="Default" />
      <SkillTag
        {...args}
        endorsement
        label="Highlight"
        status={SkillStatus.Highlight}
      />
      <SkillTag {...args} label="Match" status={SkillStatus.Match} />
    </Stack>
  );
};

const With_Long_Text_Story: ComponentStory<typeof SkillTag> = (args) => {
  return (
    <Stack direction="vertical" flexGap="l" style={{ width: 216 }}>
      <SkillTag {...args} label="Some very long Default text is present here" />
      <SkillTag
        {...args}
        endorsement
        label="Some very long Highlight text is present here"
        status={SkillStatus.Highlight}
      />
      <SkillTag
        {...args}
        label="Some very long Match text is present here"
        status={SkillStatus.Match}
      />
    </Stack>
  );
};

export const Tag = SkillTag_Story.bind({});
export const Tag_With_Icon = SkillTag_Story.bind({});
export const Tag_Removable = SkillTag_Story.bind({});
export const Tag_Custom_Removable = SkillTag_Story.bind({});
export const Tag_With_Button = SkillTag_Story.bind({});
export const Tag_With_Long_Text = With_Long_Text_Story.bind({});
export const Tag_With_Dropdown = SkillTag_Story.bind({});
export const Tag_With_Popup = SkillTag_Story.bind({});
export const Tag_With_Tooltip = SkillTag_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Tag',
  'Tag_With_Icon',
  'Tag_Removable',
  'Tag_Custom_Removable',
  'Tag_With_Button',
  'Tag_With_Long_Text',
  'Tag_With_Dropdown',
  'Tag_With_Popup',
  'Tag_With_Tooltip',
];

const skillTagArgs: SkillTagProps = {
  size: SkillSize.Medium,
  label: 'Skill label',
  lineClamp: 0,
  role: null,
  allowDisabledFocus: false,
  disabled: false,
  readonly: false,
  endorsement: false,
  clickable: false,
  removable: false,
  removeButtonAriaLabel: null,
  removeButtonProps: {
    ariaLabel: 'Remove',
    onClick: () => {
      console.log('Remove button clicked');
    },
  },
  customButtonProps: null,
  endorseButtonProps: null,
  title: null,
  theme: 'white',
};

Tag.args = {
  ...skillTagArgs,
};

Tag_With_Icon.args = {
  ...skillTagArgs,
  iconProps: {
    path: IconName.mdiAccount,
  },
};

Tag_Removable.args = {
  ...skillTagArgs,
  removable: true,
};

Tag_Custom_Removable.args = {
  ...skillTagArgs,
  removeButtonProps: {
    ariaLabel: 'Remove custom',
    iconProps: {
      path: IconName.mdiTrashCanOutline,
    },
    onClick: () => {
      console.log('Remove button clicked');
    },
  },
  size: SkillSize.Medium,
  removable: true,
};

Tag_With_Button.args = {
  ...skillTagArgs,
  endorseButtonProps: {
    counter: '2',
    ariaLabel: 'Endorsements',
    onClick: () => {
      console.log('Endorse button clicked');
    },
  },
};

Tag_With_Long_Text.args = {
  ...skillTagArgs,
  lineClamp: 1,
};

Tag_With_Dropdown.args = {
  ...skillTagArgs,
  dropdownProps: {
    overlay: Overlay(),
    portal: true,
  },
};

Tag_With_Popup.args = {
  ...skillTagArgs,
  popupProps: {
    content: <div style={{ padding: '12px 16px' }}>A popup</div>,
    height: 40,
    portal: true,
    width: 140,
  },
};

Tag_With_Tooltip.args = {
  ...skillTagArgs,
  tooltipProps: {
    content: 'A tooltip',
    portal: true,
  },
};
