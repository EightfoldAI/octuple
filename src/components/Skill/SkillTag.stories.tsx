import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  SkillAssessment,
  SkillSize,
  SkillStatus,
  SkillTag,
  SkillTagProps,
} from '.';
import {
  Button,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { IconName } from '../Icon';
import { List } from '../List';
import { SkeletonVariant } from '../Skeleton';
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
  // If you wish to show a skeleton whilst loading,
  // make sure it's a good size match to the tag size.
  // The width may be different than the height.
  const getAssessmentsSvgDimensions = (size: SkillSize): string => {
    switch (size) {
      case SkillSize.Large:
        return '26px';
      case SkillSize.Medium:
        return '22px';
      case SkillSize.Small:
        return '18px';
      case SkillSize.XSmall:
        return '18px';
      default:
        return '22px';
    }
  };
  return (
    <Stack align="flex-start" direction="vertical" flexGap="l" fullWidth>
      <SkillTag
        {...args}
        inlineSvgProps={
          !!args.inlineSvgProps
            ? {
                ...args.inlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Default"
      />
      <SkillTag
        {...args}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        endorsement
        label="Highlight"
        status={SkillStatus.Highlight}
      />
      <SkillTag
        {...args}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Match"
        status={SkillStatus.Match}
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Below}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        endorsement
        label="Highlight with Below assessment"
        status={SkillStatus.Highlight}
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Below}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Below"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.BelowUpskilling}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Below and Upskilling"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Exceed}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Exceed"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.ExceedUpskilling}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Exceed and Upskilling"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Meet}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Meet"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.MeetUpskilling}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Meet and Upskilling"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Upskilling}
        suffixInlineSvgProps={
          !!args.suffixInlineSvgProps
            ? {
                ...args.suffixInlineSvgProps,
                height: getAssessmentsSvgDimensions(args.size),
                width: getAssessmentsSvgDimensions(args.size),
              }
            : null
        }
        label="Upskilling"
      />
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
      <SkillTag
        {...args}
        assessment={SkillAssessment.Below}
        endorsement
        label="Some very long Highlight with Below assessment text is present here"
        status={SkillStatus.Highlight}
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Below}
        label="Some very long Below text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.BelowUpskilling}
        label="Some very long Below and Upskilling text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Exceed}
        label="Some very long Exceed text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.ExceedUpskilling}
        label="Some very long Exceed and Upskilling text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Meet}
        label="Some very long Meet text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.MeetUpskilling}
        label="Some very long Meet and Upskilling text is present here"
      />
      <SkillTag
        {...args}
        assessment={SkillAssessment.Upskilling}
        label="Some very long Upskilling text is present here"
      />
    </Stack>
  );
};

export const Tag = SkillTag_Story.bind({});
export const Tag_With_Icon = SkillTag_Story.bind({});
export const Tag_With_SuffixIcon = SkillTag_Story.bind({});
export const Tag_With_InlineSvg = SkillTag_Story.bind({});
export const Tag_With_SuffixInlineSvg = SkillTag_Story.bind({});
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
  'Tag_With_SuffixIcon',
  'Tag_With_InlineSvg',
  'Tag_With_SuffixInlineSvg',
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
  blockEndClassNames: 'my-block-end-class',
  blockEndStyles: null,
  blockStartClassNames: 'my-block-start-class',
  blockStartStyles: null,
  role: null,
  allowDisabledFocus: false,
  bordered: true,
  disabled: false,
  fullWidth: false,
  readonly: false,
  required: false,
  requiredMark: true,
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

Tag_With_SuffixIcon.args = {
  ...skillTagArgs,
  fullWidth: true,
  suffixIconProps: {
    path: IconName.mdiTrendingUp,
  },
};

Tag_With_InlineSvg.args = {
  ...skillTagArgs,
  inlineSvgProps: {
    height: '22px', // Required if you want to show a skeleton whilst loading the url. Make sure it's the size you want.
    hideBrokenIcon: false,
    showSkeleton: true,
    skeletonVariant: SkeletonVariant.Rounded,
    url: 'https://static.vscdn.net/images/learning-opp.svg',
    width: '22px', // Required if you want to show a skeleton whilst loading the url. Make sure it's the size you want.
  },
};

Tag_With_SuffixInlineSvg.args = {
  ...skillTagArgs,
  fullWidth: true,
  suffixInlineSvgProps: {
    height: '22px', // Required if you want to show a skeleton whilst loading the url. Make sure it's the size you want.
    hideBrokenIcon: false,
    showSkeleton: true,
    skeletonVariant: SkeletonVariant.Rounded,
    url: 'https://static.vscdn.net/images/learning-opp.svg',
    width: '22px', // Required if you want to show a skeleton whilst loading the url. Make sure it's the size you want.
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
