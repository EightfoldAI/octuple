import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { StepperProps, StepperSize, StepperVariant } from '../Stepper.types';
import { Step, Stepper } from '../';

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

const workflow: Step[] = [1, 2, 3, 4, 5].map((i) => ({
    index: i,
    content: `Step label ${i}`,
    complete: i > stepperArgs.index ? false : true,
}));

describe('Stepper', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('Should render', () => {
        const wrapper = mount(<Stepper {...stepperArgs} steps={workflow} />);
        expect(wrapper.children().length).toEqual(1);
    });

    test('Stepper is medium', () => {
        const wrapper = mount(
            <Stepper
                {...stepperArgs}
                size={StepperSize.Medium}
                steps={workflow}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    test('Stepper is small', () => {
        const wrapper = mount(
            <Stepper
                {...stepperArgs}
                size={StepperSize.Small}
                steps={workflow}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});
