import React, { FC } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import {
  Stepper,
  StepperLineStyle,
  StepperSize,
  StepperThemeName,
  StepperVariant,
  StepSize,
} from '.';
import { Col, Row } from '../Grid';
import { IconName } from '../Icon';

export default {
  title: 'Timeline',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Timeline</h1>
              <p>
                The Stepper component Timeline variant should be used with a
                number of steps, and should display next to the items in
                chronoloigical order. The Stepper Timeline variant indicates
                whether or not the steps have been completed if needed.
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
    activeStepIndex: {
      control: { type: 'number' },
    },
    classNames: {
      control: 'text',
    },
    completeAriaLabelText: {
      control: 'text',
    },
    height: {
      control: { type: 'number' },
    },
    id: {
      control: 'text',
    },
    index: {
      control: { type: 'number' },
    },
    layout: {
      options: ['horizontal', 'vertical'],
      control: { type: 'inline-radio' },
    },
    lineStyle: {
      options: [
        StepperLineStyle.Dash,
        StepperLineStyle.Dot,
        StepperLineStyle.Solid,
      ],
      control: { type: 'inline-radio' },
    },
    nodeAriaLabelText: {
      control: 'text',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    scrollable: {
      control: 'boolean',
    },
    scrollDownAriaLabelText: {
      control: 'text',
    },
    scrollLeftAriaLabelText: {
      control: 'text',
    },
    scrollRightAriaLabelText: {
      control: 'text',
    },
    scrollUpAriaLabelText: {
      control: 'text',
    },
    size: {
      options: [StepperSize.Medium, StepperSize.Small],
      control: { type: 'inline-radio' },
    },
    status: {
      options: ['error', 'success', 'warning'],
      control: { type: 'inline-radio' },
    },
    steps: {
      control: 'object',
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
    variant: {
      options: [StepperVariant.Default, StepperVariant.Timeline],
      control: { type: 'inline-radio' },
    },
    width: {
      control: { type: 'number' },
    },
    scrollToActiveStep: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Stepper>;

const themes: StepperThemeName[] = [
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
];

interface TimelineItemProps {
  index?: number;
}

const TimelineItem: FC<TimelineItemProps> = ({ index }) => {
  return (
    <div>
      <div style={{ display: 'block' }}>Timeline label {index}</div>
      <div style={{ fontWeight: 400 }}>More content</div>
    </div>
  );
};

const Default_Story: ComponentStory<typeof Stepper> = (args) => {
  return (
    <Row>
      <Col span="12">
        <Stepper {...args} />
      </Col>
    </Row>
  );
};

const Show_Small_Active_Index_Story: ComponentStory<typeof Stepper> = (
  args
) => {
  const [_, updateArgs] = useArgs();

  const handle = (index: number = 3) => {
    updateArgs({
      ...args,
      activeStepIndex: index,
      index: index,
      steps: [1, 2, 3, 4, 5].map((i: number) => ({
        index: i,
        content: `Timeline label ${i}`,
        complete: i > 2 ? false : true,
        nodeAriaLabelText: i === 5 ? 'Finish' : null,
        nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
        size: i === index + 1 ? StepSize.Large : StepSize.Small,
      })),
    });
  };

  return (
    <Row>
      <Col span="12">
        <Stepper {...args} onChange={(step: number) => handle(step)} />
      </Col>
    </Row>
  );
};

const Show_Medium_Active_Index_Story: ComponentStory<typeof Stepper> = (
  args
) => {
  const [_, updateArgs] = useArgs();

  const handle = (index: number = 3) => {
    updateArgs({
      ...args,
      activeStepIndex: index,
      index: index,
      steps: [1, 2, 3, 4, 5].map((i: number) => ({
        index: i,
        content: <TimelineItem index={i} />,
        complete: i > 2 ? false : true,
        nodeAriaLabelText: i === 5 ? 'Finish' : null,
        nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
        size: i === index + 1 ? StepSize.Large : StepSize.Small,
      })),
    });
  };

  return (
    <Row>
      <Col span="12">
        <Stepper {...args} onChange={(step: number) => handle(step)} />
      </Col>
    </Row>
  );
};

export const Default_Horizontal_Small = Default_Story.bind({});
export const Default_Horizontal_Small_Required = Default_Story.bind({});
export const Default_Horizontal_Small_Read_Only = Default_Story.bind({});
export const Default_Horizontal_Small_Show_Active_Index =
  Show_Small_Active_Index_Story.bind({});
export const Default_Horizontal_Small_Custom = Default_Story.bind({});
export const Default_Horizontal_Medium = Default_Story.bind({});
export const Default_Horizontal_Medium_Required = Default_Story.bind({});
export const Default_Horizontal_Medium_Read_Only = Default_Story.bind({});
export const Default_Horizontal_Medium_Active_Scroll = Default_Story.bind({});
export const Default_Horizontal_Medium_Show_Active_Index =
  Show_Medium_Active_Index_Story.bind({});
export const Default_Horizontal_Medium_Custom = Default_Story.bind({});
export const Default_Vertical_Small = Default_Story.bind({});
export const Default_Vertical_Small_Required = Default_Story.bind({});
export const Default_Vertical_Small_Read_Only = Default_Story.bind({});
export const Default_Vertical_Small_Show_Active_Index =
  Show_Small_Active_Index_Story.bind({});
export const Default_Vertical_Small_Custom = Default_Story.bind({});
export const Default_Vertical_Medium = Default_Story.bind({});
export const Default_Vertical_Medium_Required = Default_Story.bind({});
export const Default_Vertical_Medium_Read_Only = Default_Story.bind({});
export const Default_Vertical_Medium_Show_Active_Index =
  Show_Medium_Active_Index_Story.bind({});
export const Default_Vertical_Medium_Scroll = Default_Story.bind({});
export const Default_Vertical_Medium_Custom = Default_Story.bind({});

const timelineArgs: Object = {
  activeStepIndex: 2,
  classNames: 'my-timeline',
  id: 'myTimelineId',
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  gradient: false,
  theme: '',
  themeContainerId: 'my-timeline-theme-container',
  index: 2,
  layout: 'horizontal',
  lineStyle: null,
  readonly: false,
  required: false,
  size: StepperSize.Medium,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: <TimelineItem index={i} />,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
  variant: StepperVariant.Timeline,
  'data-test-id': 'myTimelineTestId',
};

Default_Horizontal_Small.args = {
  ...timelineArgs,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Horizontal_Small_Required.args = {
  ...timelineArgs,
  required: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Horizontal_Small_Read_Only.args = {
  ...timelineArgs,
  readonly: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Horizontal_Small_Show_Active_Index.args = {
  ...timelineArgs,
  showActiveStepIndex: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
    size: i === 3 ? StepSize.Large : StepSize.Small,
  })),
};

Default_Horizontal_Small_Custom.args = {
  ...timelineArgs,
  classNames: 'custom-stepper-line',
  lineStyle: StepperLineStyle.Solid,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon:
      i === 5
        ? IconName.mdiFlagCheckered
        : i % 2 && i < 5
        ? IconName.mdiChevronDoubleRight
        : IconName.mdiStar,
    size: i % 2 ? StepSize.Large : StepSize.Small,
    status: i === 2 ? 'error' : null,
    theme: i === 5 ? themes[5] : null,
  })),
  theme: themes[11],
};

Default_Horizontal_Medium.args = {
  ...timelineArgs,
};

Default_Horizontal_Medium_Required.args = {
  ...timelineArgs,
  required: true,
};

Default_Horizontal_Medium_Read_Only.args = {
  ...timelineArgs,
  readonly: true,
};

Default_Horizontal_Medium_Active_Scroll.args = {
  ...timelineArgs,
  width: 400,
  scrollToActiveStep: true,
};

Default_Horizontal_Medium_Show_Active_Index.args = {
  ...timelineArgs,
  showActiveStepIndex: true,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: <TimelineItem index={i} />,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
    size: i === 3 ? StepSize.Large : StepSize.Small,
  })),
};

Default_Horizontal_Medium_Custom.args = {
  ...timelineArgs,
  classNames: 'custom-stepper-line',
  lineStyle: StepperLineStyle.Solid,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: <TimelineItem index={i} />,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon:
      i === 5
        ? IconName.mdiFlagCheckered
        : i % 2 && i < 5
        ? IconName.mdiChevronDoubleRight
        : IconName.mdiStar,
    size: i % 2 ? StepSize.Large : StepSize.Small,
    status: i === 2 ? 'error' : null,
    theme: i === 5 ? themes[5] : null,
  })),
  theme: themes[11],
};

Default_Vertical_Small.args = {
  ...timelineArgs,
  layout: 'vertical',
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Vertical_Small_Required.args = {
  ...timelineArgs,
  layout: 'vertical',
  required: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Vertical_Small_Read_Only.args = {
  ...timelineArgs,
  layout: 'vertical',
  readonly: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
  })),
};

Default_Vertical_Small_Show_Active_Index.args = {
  ...timelineArgs,
  layout: 'vertical',
  showActiveStepIndex: true,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
    size: i === 3 ? StepSize.Large : StepSize.Small,
  })),
};

Default_Vertical_Small_Custom.args = {
  ...timelineArgs,
  classNames: 'custom-stepper-line',
  layout: 'vertical',
  lineStyle: StepperLineStyle.Solid,
  size: StepperSize.Small,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Timeline label ${i}`,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon:
      i === 5
        ? IconName.mdiFlagCheckered
        : i % 2 && i < 5
        ? IconName.mdiChevronDoubleDown
        : IconName.mdiStar,
    size: i % 2 ? StepSize.Large : StepSize.Small,
    status: i === 2 ? 'error' : null,
    theme: i === 5 ? themes[5] : null,
  })),
  theme: themes[11],
};

Default_Vertical_Medium.args = {
  ...timelineArgs,
  layout: 'vertical',
};

Default_Vertical_Medium_Required.args = {
  ...timelineArgs,
  layout: 'vertical',
  required: true,
};

Default_Vertical_Medium_Read_Only.args = {
  ...timelineArgs,
  layout: 'vertical',
  readonly: true,
};

Default_Vertical_Medium_Show_Active_Index.args = {
  ...timelineArgs,
  layout: 'vertical',
  showActiveStepIndex: true,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: <TimelineItem index={i} />,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
    size: i === 3 ? StepSize.Large : StepSize.Small,
  })),
};

Default_Vertical_Medium_Scroll.args = {
  ...timelineArgs,
  height: 420,
  layout: 'vertical',
};

Default_Vertical_Medium_Custom.args = {
  ...timelineArgs,
  classNames: 'custom-stepper-line',
  layout: 'vertical',
  lineStyle: StepperLineStyle.Solid,
  steps: [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: <TimelineItem index={i} />,
    complete: i > 2 ? false : true,
    nodeAriaLabelText: i === 5 ? 'Finish' : null,
    nodeIcon:
      i === 5
        ? IconName.mdiFlagCheckered
        : i % 2 && i < 5
        ? IconName.mdiChevronDoubleDown
        : IconName.mdiStar,
    size: i % 2 ? StepSize.Large : StepSize.Small,
    status: i === 2 ? 'error' : null,
    theme: i === 5 ? themes[5] : null,
  })),
  theme: themes[11],
};
