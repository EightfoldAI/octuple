import React, { useEffect, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skill, SkillProps, SkillSize, SkillStatus, SkillVariant } from './';
import {
  Button,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { IconName } from '../Icon';
import { List } from '../List';
import { MenuItemType } from '../Menu';
import { Stack } from '../Stack';
import { Slider, SliderSize } from '../Slider';

export default {
  title: 'Skill',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Skill</h1>
              <p>
                Skill component is used only to represent skills across our
                products. It is a mix of UI treatment from card component and
                pill (tag) component. This is intentional since we want a unique
                visual treatment for skills and do not want to mix with other
                pill(tag) component usage.
              </p>
              <h2>Skill tag</h2>
              <p>
                Skill tag is the smaller size representation of a skill. Skill
                tag without button is used in small space like cards since
                adding a skill tag with a button will create complex interaction
                for the card component.
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
    onClose: {
      action: 'close',
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
    variant: {
      options: [SkillVariant.Tag, SkillVariant.Block],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Skill>;

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

const Skill_Story: ComponentStory<typeof Skill> = (args) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderLabel, setSliderLabel] = useState('Assess skill level');

  useEffect(() => {
    if (sliderValue >= 0.1 && sliderValue < 2) {
      setSliderLabel('Learner');
    } else if (sliderValue >= 2 && sliderValue < 3) {
      setSliderLabel('Practitioner');
    } else if (sliderValue >= 3 && sliderValue < 4) {
      setSliderLabel('Professional');
    } else if (sliderValue >= 4 && sliderValue < 5) {
      setSliderLabel('Expert');
    } else if (sliderValue === 5) {
      setSliderLabel('Worldclass');
    } else {
      setSliderLabel('Assess skill level');
    }
  }, [sliderLabel, sliderValue]);

  const handleChange = (val: number): void => {
    setSliderValue(val);
  };

  const getSlider = (disabled: boolean): JSX.Element => (
    <div
      style={{
        height: 'auto',
        padding: '4px 0',
        width: 320,
      }}
    >
      <Slider
        disabled={disabled}
        size={SliderSize.Medium}
        value={sliderValue}
        onChange={handleChange}
        showMarkers
        showLabels
        tooltipContent={`${sliderValue}`}
        tooltipProps={{
          height: 24,
          offset: 20,
          portal: true,
          style: { padding: '4px 12px' },
          width: 40,
        }}
        min={0}
        max={5}
        step={0.1}
        minLabel={sliderLabel}
        minLabelStyle={{
          color:
            sliderValue === 0
              ? 'var(--blue-color)'
              : 'var(--text-primary-color)',
        }}
        hideMax
        hideMin
        hideValue
      />
    </div>
  );

  return (
    <Stack direction="vertical" flexGap="l" align="flex-start">
      <Skill {...args} content={getSlider(args.disabled)} label="Default" />
      <Skill
        {...args}
        content={getSlider(args.disabled)}
        label="Highlight"
        status={SkillStatus.Highlight}
      />
      <Skill
        {...args}
        content={getSlider(args.disabled)}
        label="Match"
        status={SkillStatus.Match}
      />
    </Stack>
  );
};

const With_Long_Text_Story: ComponentStory<typeof Skill> = (args) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderLabel, setSliderLabel] = useState('Assess skill level');

  useEffect(() => {
    if (sliderValue >= 1 && sliderValue < 2) {
      setSliderLabel('Learner');
    } else if (sliderValue >= 2 && sliderValue < 3) {
      setSliderLabel('Practitioner');
    } else if (sliderValue >= 3 && sliderValue < 4) {
      setSliderLabel('Professional');
    } else if (sliderValue >= 4 && sliderValue < 5) {
      setSliderLabel('Expert');
    } else if (sliderValue === 5) {
      setSliderLabel('Worldclass');
    } else {
      setSliderLabel('Assess skill level');
    }
  }, [sliderLabel, sliderValue]);

  const handleChange = (val: number): void => {
    setSliderValue(val);
  };

  const getSlider = (disabled: boolean): JSX.Element => (
    <div
      style={{
        height: 'auto',
        padding: '4px 0',
        width: 320,
      }}
    >
      <Slider
        disabled={disabled}
        size={SliderSize.Medium}
        value={sliderValue}
        onChange={handleChange}
        showMarkers
        showLabels
        tooltipContent={`${sliderValue}`}
        tooltipProps={{
          height: 24,
          offset: 20,
          portal: true,
          style: { padding: '4px 12px' },
          width: 40,
        }}
        min={0}
        max={5}
        step={0.1}
        minLabel={sliderLabel}
        minLabelStyle={{
          color:
            sliderValue === 0
              ? 'var(--blue-color)'
              : 'var(--text-primary-color)',
        }}
        hideMax
        hideMin
        hideValue
      />
    </div>
  );
  return (
    <Stack direction="vertical" flexGap="l" style={{ width: 216 }}>
      <Skill
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Default text is present here"
      />
      <Skill
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Highlight text is present here"
        status={SkillStatus.Highlight}
      />
      <Skill
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Match text is present here"
        status={SkillStatus.Match}
      />
    </Stack>
  );
};

export const Tag = Skill_Story.bind({});
export const Tag_With_Icon = Skill_Story.bind({});
export const Tag_Closable = Skill_Story.bind({});
export const Tag_Custom_Closable = Skill_Story.bind({});
export const Tag_With_Button = Skill_Story.bind({});
export const Tag_With_Long_Text = With_Long_Text_Story.bind({});
export const Tag_With_Dropdown = Skill_Story.bind({});
export const Tag_With_Popup = Skill_Story.bind({});
export const Tag_With_Tooltip = Skill_Story.bind({});
export const Block = Skill_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Tag',
  'Tag_With_Icon',
  'Tag_Closable',
  'Tag_Custom_Closable',
  'Tag_With_Button',
  'Tag_With_Long_Text',
  'Tag_With_Dropdown',
  'Tag_With_Popup',
  'Tag_With_Tooltip',
  'Block',
];

const skillArgs: SkillProps = {
  size: SkillSize.Medium,
  variant: SkillVariant.Tag,
  label: 'Skill label',
  lineClamp: 0,
  disabled: false,
  readonly: false,
  clickable: false,
  closable: false,
  closeButtonAriaLabel: null,
  closeButtonProps: {
    ariaLabel: 'Close',
    onClick: () => {
      console.log('Close button clicked');
    },
  },
  expandable: false,
  expanded: false,
  animate: true,
  expandedContent: (
    <div
      style={{
        border: '1px solid var(--grey-background3-color)',
        borderRadius: 16,
        color: 'var(--text-primary-color)',
        fontSize: '18px',
        height: 'auto',
        lineHeight: '24px',
        padding: 8,
        textAlign: 'center',
        width: '100%',
      }}
    >
      Replace this with your own page level component or an Octuple component.
    </div>
  ),
  hoverable: false,
  endorseButtonProps: null,
  highlightButtonProps: {
    ariaLabel: 'Highlight',
  },
  menuItems: [
    {
      onClick: () => {
        console.log('Button 1 clicked');
      },
      text: 'Button 1',
      value: 'menu 1',
    },
    {
      onClick: () => {
        console.log('Button 2 clicked');
      },
      text: 'Button 2',
      value: 'menu 2',
    },
    {
      type: MenuItemType.link,
      text: 'Link button 3',
      href: 'https://eightfold.ai',
      target: '_blank',
      value: 'menu 3',
    },
  ],
  theme: 'white',
};

Tag.args = {
  ...skillArgs,
};

Tag_With_Icon.args = {
  ...skillArgs,
  iconProps: {
    path: IconName.mdiAccount,
  },
};

Tag_Closable.args = {
  ...skillArgs,
  closable: true,
};

Tag_Custom_Closable.args = {
  ...skillArgs,
  closeButtonProps: {
    ariaLabel: 'Remove',
    iconProps: {
      path: IconName.mdiTrashCanOutline,
    },
    onClick: () => {
      console.log('Remove button clicked');
    },
  },
  size: SkillSize.Medium,
  closable: true,
};

Tag_With_Button.args = {
  ...skillArgs,
  endorseButtonProps: {
    iconProps: { path: IconName.mdiThumbUpOutline },
    counter: '2',
    ariaLabel: 'Endorsements',
    onClick: () => {
      console.log('Endorse button clicked');
    },
  },
};

Tag_With_Long_Text.args = {
  ...skillArgs,
  lineClamp: 1,
};

Tag_With_Dropdown.args = {
  ...skillArgs,
  dropdownProps: {
    overlay: Overlay(),
    portal: true,
  },
};

Tag_With_Popup.args = {
  ...skillArgs,
  popupProps: {
    content: <div style={{ padding: '12px 16px' }}>A popup</div>,
    height: 40,
    portal: true,
    width: 140,
  },
};

Tag_With_Tooltip.args = {
  ...skillArgs,
  tooltipProps: {
    content: 'A tooltip',
    portal: true,
  },
};

Block.args = {
  ...skillArgs,
  customButtonProps: null,
  endorseButtonProps: {
    iconProps: { path: IconName.mdiThumbUpOutline },
    counter: '2',
    ariaLabel: 'Endorsements',
    onClick: () => {
      console.log('Endorse button clicked');
    },
  },
  variant: SkillVariant.Block,
};
