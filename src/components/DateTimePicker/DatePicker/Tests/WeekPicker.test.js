import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '..';
import { resetMockDate, setMockDate } from '../../../../tests/Utilities';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

const { WeekPicker } = DatePicker;

describe('WeekPicker', () => {
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

    beforeEach(() => {
        setMockDate();
    });

    afterEach(() => {
        resetMockDate();
    });

    it('should support style prop', () => {
        const wrapper = mount(<WeekPicker style={{ width: 400 }} />);
        expect(wrapper.render()).toMatchSnapshot();
    });
});
