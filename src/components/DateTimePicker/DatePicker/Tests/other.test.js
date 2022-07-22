import React from 'react';
import dayjs from 'dayjs';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '..';
import '@testing-library/jest-dom';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

const { MonthPicker, WeekPicker } = DatePicker;

describe('Picker format by locale', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    const date = dayjs('2000-01-01', 'YYYY-MM-DD');
    function matchPicker(name, Picker, props) {
        it(name, () => {
            const wrapper = mount(<Picker value={date} {...props} />);

            expect(wrapper.render()).toMatchSpecificSnapshot(
                `./__snapshots__/DatePicker.${name}.shot`
            );
        });
    }

    matchPicker('date', DatePicker);
    matchPicker('dateTime', DatePicker, { showTime: true });
    matchPicker('week', WeekPicker);
    matchPicker('month', MonthPicker);
});

describe('MonthPicker and WeekPicker', () => {
    it('render MonthPicker', () => {
        const birthday = dayjs('2000-01-01', 'YYYY-MM-DD').locale('en-us');
        const wrapper = mount(<MonthPicker />);
        wrapper.setProps({ value: birthday });
        expect(
            render(wrapper.find('Trigger').instance().getComponent())
        ).toMatchSpecificSnapshot(
            './__snapshots__/DatePicker.monthpicker.shot'
        );
    });

    it('render WeekPicker', () => {
        const birthday = dayjs('2000-01-01', 'YYYY-MM-DD').locale('en-us');
        const wrapper = mount(<WeekPicker />);
        wrapper.setProps({ value: birthday });
        expect(
            render(wrapper.find('Trigger').instance().getComponent())
        ).toMatchSpecificSnapshot('./__snapshots__/DatePicker.weekpicker.shot');
    });
});
