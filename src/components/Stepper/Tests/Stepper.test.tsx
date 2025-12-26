import React, { FC } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { StepperProps, StepperSize, StepperVariant } from '../Stepper.types';
import {
  Step,
  Stepper,
  StepperLineStyle,
  StepperThemeName,
  StepSize,
} from '../';
import { IconName } from '../../Icon';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const stepperArgs: StepperProps = {
  activeStepIndex: 2,
  classNames: 'my-stepper',
  id: 'myStepperId',
  index: 2,
  layout: 'horizontal',
  readonly: false,
  required: false,
  size: StepperSize.Medium,
  steps: [],
  variant: StepperVariant.Default,
  'data-test-id': 'myStepperTestId',
};

const timelineArgs: Object = {
  activeStepIndex: 2,
  classNames: 'my-timeline',
  id: 'myTimelineId',
  index: 2,
  layout: 'horizontal',
  lineStyle: null,
  readonly: false,
  required: false,
  size: StepperSize.Medium,
  theme: null,
  steps: [],
  variant: StepperVariant.Timeline,
  'data-test-id': 'myTimelineTestId',
};

const defaultWorkflow: Step[] = [1, 2, 3, 4, 5].map((i) => ({
  index: i,
  content: `Step label ${i}`,
  complete: i > stepperArgs.index ? false : true,
}));

const timelineWorkflow: Step[] = [1, 2, 3, 4, 5].map((i: number) => ({
  index: i,
  content: `Timeline label ${i}`,
  complete: i > 2 ? false : true,
  nodeAriaLabelText: i === 5 ? 'Finish' : null,
  nodeIcon: i === 5 ? IconName.mdiFlagCheckered : null,
}));

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

const timelineCustomWorkflow: Step[] = [1, 2, 3, 4, 5].map((i: number) => ({
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
}));

describe('Stepper', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should render', () => {
    const wrapper = mount(<Stepper {...stepperArgs} steps={defaultWorkflow} />);
    expect(wrapper.children().length).toEqual(1);
  });

  test('Stepper is medium', () => {
    const wrapper = mount(
      <Stepper
        {...stepperArgs}
        size={StepperSize.Medium}
        steps={defaultWorkflow}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is small', () => {
    const wrapper = mount(
      <Stepper
        {...stepperArgs}
        size={StepperSize.Small}
        steps={defaultWorkflow}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is timeline', () => {
    const wrapper = mount(
      <Stepper
        {...timelineArgs}
        steps={timelineWorkflow}
        variant={StepperVariant.Timeline}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is custom timeline', () => {
    const wrapper = mount(
      <Stepper
        {...timelineArgs}
        lineStyle={StepperLineStyle.Solid}
        steps={timelineCustomWorkflow}
        theme={themes[11]}
        variant={StepperVariant.Timeline}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is scrollable', () => {
    const wrapper = mount(
      <Stepper
        {...stepperArgs}
        size={StepperSize.Small}
        steps={defaultWorkflow}
        scrollable
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is fullwidth', () => {
    const wrapper = mount(
      <Stepper
        {...stepperArgs}
        size={StepperSize.Medium}
        steps={defaultWorkflow}
        fullwidth
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Stepper is fullwidth and scrollable', () => {
    const wrapper = mount(
      <Stepper
        {...stepperArgs}
        size={StepperSize.Medium}
        steps={defaultWorkflow}
        fullwidth
        scrollable
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
