import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Step,
  Stepper,
  StepperLineStyle,
  StepperSize,
  StepperVariant,
} from './';
import { Col, Row } from '../Grid';

export default {
  title: 'Stepper',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Stepper</h1>
              <p>
                The Stepper component should be used with a small number of
                steps, and should display next to the items to be completed in
                numerical order. The Stepper indicates the number of steps, and
                whether or not the steps have been completed.
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

const Stepper_Story: ComponentStory<typeof Stepper> = (args) => {
  const workflow: Step[] = [1, 2, 3, 4, 5].map((i: number) => ({
    index: i,
    content: `Step label ${i}`,
    complete: i > args.index ? false : true,
  }));

  return (
    <Row>
      <Col span="12">
        <Stepper {...args} steps={workflow} />
      </Col>
    </Row>
  );
};

export const Default_Horizontal_Small = Stepper_Story.bind({});
export const Default_Horizontal_Small_Required = Stepper_Story.bind({});
export const Default_Horizontal_Small_Read_Only = Stepper_Story.bind({});
export const Default_Horizontal_Medium = Stepper_Story.bind({});
export const Default_Horizontal_Medium_Required = Stepper_Story.bind({});
export const Default_Horizontal_Medium_Read_Only = Stepper_Story.bind({});
export const Default_Horizontal_Medium_Active_Scroll = Stepper_Story.bind({});
export const Default_Vertical = Stepper_Story.bind({});
export const Default_Vertical_Required = Stepper_Story.bind({});
export const Default_Vertical_Read_Only = Stepper_Story.bind({});
export const Default_Vertical_Scroll = Stepper_Story.bind({});
export const Default_Vertical_Active_Scroll = Stepper_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Default_Horizontal_Small',
  'Default_Horizontal_Small_Required',
  'Default_Horizontal_Small_Read_Only',
  'Default_Horizontal_Medium',
  'Default_Horizontal_Medium_Required',
  'Default_Horizontal_Medium_Read_Only',
  'Default_Horizontal_Medium_Active_Scroll',
  'Default_Vertical',
  'Default_Vertical_Required',
  'Default_Vertical_Read_Only',
  'Default_Vertical_Scroll',
  'Default_Vertical_Active_Scroll',
];

const stepperArgs: Object = {
  activeStepIndex: 2,
  classNames: 'my-stepper',
  id: 'myStepperId',
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  gradient: false,
  theme: '',
  themeContainerId: 'my-stepper-theme-container',
  index: 2,
  layout: 'horizontal',
  readonly: false,
  required: false,
  size: StepperSize.Medium,
  steps: [],
  variant: StepperVariant.Default,
  'data-test-id': 'myStepperTestId',
};

Default_Horizontal_Small.args = {
  ...stepperArgs,
  size: StepperSize.Small,
};

Default_Horizontal_Small_Required.args = {
  ...stepperArgs,
  required: true,
  size: StepperSize.Small,
};

Default_Horizontal_Small_Read_Only.args = {
  ...stepperArgs,
  readonly: true,
  size: StepperSize.Small,
  stepsContainerProps: {
    tabIndex: -1,
    classNames: 'my-stepper-container-readonly',
  },
};

Default_Horizontal_Medium.args = {
  ...stepperArgs,
};

Default_Horizontal_Medium_Required.args = {
  ...stepperArgs,
  required: true,
};

Default_Horizontal_Medium_Read_Only.args = {
  ...stepperArgs,
  readonly: true,
};

Default_Horizontal_Medium_Active_Scroll.args = {
  ...stepperArgs,
  width: 300,
  scrollToActiveStep: true,
};

Default_Vertical.args = {
  ...stepperArgs,
  layout: 'vertical',
};

Default_Vertical_Required.args = {
  ...stepperArgs,
  layout: 'vertical',
  required: true,
};

Default_Vertical_Read_Only.args = {
  ...stepperArgs,
  layout: 'vertical',
  readonly: true,
};

Default_Vertical_Scroll.args = {
  ...stepperArgs,
  height: 400,
  layout: 'vertical',
};

Default_Vertical_Active_Scroll.args = {
  ...stepperArgs,
  height: 300,
  layout: 'vertical',
  scrollToActiveStep: true,
};
