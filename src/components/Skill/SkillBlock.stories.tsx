import React, { useEffect, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkillBlock, SkillBlockProps, SkillStatus } from '.';
import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { IconName } from '../Icon';
import {
  LinkButton,
  LinkButtonShape,
  LinkButtonSize,
  LinkButtonTextAlign,
  LinkButtonVariant,
  LinkButtonWidth,
} from '../LinkButton';
import { Stack } from '../Stack';
import { Slider, SliderSize } from '../Slider';
import { MenuItemType } from '../Menu';

export default {
  title: 'SkillBlock',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Skill block</h1>
              <p>
                Skill component is used only to represent skills across our
                products. It is a mix of UI treatment from card component and
                tag component. This is intentional since we want a unique visual
                treatment for skills and do not want to mix with other component
                usage.
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
    onBlur: {
      action: 'blur',
    },
    onClick: {
      action: 'click',
    },
    onFocus: {
      action: 'focus',
    },
    onKeyDown: {
      action: 'keydown',
    },
    onMouseEnter: {
      action: 'mouseenter',
    },
    onMouseLeave: {
      action: 'mouseleave',
    },
  },
} as ComponentMeta<typeof SkillBlock>;

const SkillBlock_Story: ComponentStory<typeof SkillBlock> = (args) => {
  return (
    <Stack direction="vertical" flexGap="l" fullWidth>
      <SkillBlock {...args} label="Default" />
      <SkillBlock
        {...args}
        label="Highlight"
        endorsement
        status={SkillStatus.Highlight}
      />
      <SkillBlock {...args} label="Match" status={SkillStatus.Match} />
    </Stack>
  );
};

const SkillBlock_With_Content_Story: ComponentStory<typeof SkillBlock> = (
  args
) => {
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
    <Stack direction="vertical" flexGap="l" fullWidth>
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Default"
      />
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Highlight"
        endorsement
        status={SkillStatus.Highlight}
      />
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Match"
        status={SkillStatus.Match}
      />
    </Stack>
  );
};

const SkillBlock_With_Long_Text_Story: ComponentStory<typeof SkillBlock> = (
  args
) => {
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
    <Stack direction="vertical" flexGap="l" fullWidth>
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Default text is present here"
      />
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Highlight text is present here"
        endorsement
        status={SkillStatus.Highlight}
      />
      <SkillBlock
        {...args}
        content={getSlider(args.disabled)}
        label="Some very long Match text is present here"
        status={SkillStatus.Match}
      />
    </Stack>
  );
};

export const Block = SkillBlock_Story.bind({});
export const Block_With_Content = SkillBlock_With_Content_Story.bind({});
export const Block_With_Icon = SkillBlock_With_Content_Story.bind({});
export const Block_With_Long_Text = SkillBlock_With_Long_Text_Story.bind({});
export const Block_With_Extra_Content = SkillBlock_With_Content_Story.bind({});
export const Block_With_Extra_Content_And_Footer =
  SkillBlock_With_Content_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Block',
  'Block_With_Content',
  'Block_With_Icon',
  'Block_With_Long_Text',
  'Block_With_Extra_Content',
  'Block_With_Extra_Content_And_Footer',
];

const skillBlockArgs: SkillBlockProps = {
  label: 'Skill label',
  labelWidth: null,
  lineClamp: 0,
  bordered: true,
  role: null,
  allowDisabledFocus: false,
  disabled: false,
  readonly: false,
  endorsement: false,
  clickable: false,
  hoverable: false,
  expandable: false,
  expanded: false,
  animate: true,
  width: null,
  maxWidth: null,
  minWidth: 'fit-content',
  content: (
    <div
      style={{
        border: '1px solid var(--grey-background3-color)',
        borderRadius: 16,
        color: 'var(--text-primary-color)',
        fontSize: '18px',
        height: 'fit-content',
        lineHeight: '24px',
        padding: 8,
        textAlign: 'center',
        width: 400,
      }}
    >
      content: Replace this with your own page level component or an Octuple
      component.
    </div>
  ),
  expandedContent: (
    <div
      style={{
        border: '1px solid var(--grey-background3-color)',
        borderRadius: 16,
        color: 'var(--text-primary-color)',
        fontSize: '18px',
        height: 'fit-content',
        lineHeight: '24px',
        minWidth: 240,
        padding: 8,
        textAlign: 'center',
      }}
    >
      expandedContent: Replace this with your own page level component or an
      Octuple component.
    </div>
  ),
  extraContent: null,
  customButtonProps: null,
  endorseButtonProps: {
    counter: '2',
    ariaLabel: 'Endorsements',
    onClick: () => {
      console.log('Endorse button clicked');
    },
  },
  highlightButtonProps: {
    ariaLabel: 'Highlight',
  },
  itemMenuOnly: null,
  reflow: null,
  menuItems: [
    {
      render: () => (
        <Button
          alignText={ButtonTextAlign.Left}
          buttonWidth={ButtonWidth.fill}
          shape={ButtonShape.Pill}
          size={ButtonSize.Small}
          text="Button 1"
          toggle
          variant={ButtonVariant.SystemUI}
          onClick={() => {
            console.log('Button 1 clicked');
          }}
        />
      ),
      type: MenuItemType.custom,
      value: 'menu 1',
    },
    {
      render: () => (
        <Button
          alignText={ButtonTextAlign.Left}
          buttonWidth={ButtonWidth.fill}
          shape={ButtonShape.Pill}
          size={ButtonSize.Small}
          text="Button 2"
          toggle
          variant={ButtonVariant.SystemUI}
          onClick={() => {
            console.log('Button 2 clicked');
          }}
        />
      ),
      type: MenuItemType.custom,
      value: 'menu 2',
    },
    {
      render: () => (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          href="https://eightfold.ai"
          linkButtonWidth={LinkButtonWidth.fill}
          shape={LinkButtonShape.Pill}
          size={LinkButtonSize.Small}
          target="_blank"
          text="Link button"
          variant={LinkButtonVariant.SystemUI}
          onClick={() => {
            console.log('Link Button clicked');
          }}
        />
      ),
      type: MenuItemType.custom,
      value: 'menu 3',
    },
  ],
  tabIndex: 0,
  theme: 'white',
};

Block.args = {
  ...skillBlockArgs,
};

Block_With_Content.args = {
  ...skillBlockArgs,
  customButtonProps: null,
};

Block_With_Icon.args = {
  ...skillBlockArgs,
  iconProps: {
    path: IconName.mdiAccount,
  },
};

Block_With_Long_Text.args = {
  ...skillBlockArgs,
  lineClamp: 1,
};

Block_With_Extra_Content.args = {
  ...skillBlockArgs,
  customButtonProps: null,
  extraContent: (
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
      extraContent: Replace this with your own page level component or an
      Octuple component.
    </div>
  ),
};

Block_With_Extra_Content_And_Footer.args = {
  ...skillBlockArgs,
  customButtonProps: null,
  extraContent: (
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
      extraContent: Replace this with your own page level component or an
      Octuple component.
    </div>
  ),
  footer: (
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
      footer: Replace this with your own page level component or an Octuple
      component.
    </div>
  ),
};
