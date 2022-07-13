import React from 'react';
import moment from 'moment';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '..';
import { resetMockDate, setMockDate } from '../../../../tests/Utilities';
import enUS from '../Locale/en_US';
import { closePicker, openPicker, selectCell } from './utils';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

const { RangePicker } = DatePicker;

describe('RangePicker', () => {
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

    it('should not throw error when value is reset to `[]`', () => {
        const birthday = moment('2000-01-01', 'YYYY-MM-DD');
        const wrapper = mount(
            <RangePicker value={[birthday, birthday]} open />
        );
        wrapper.setProps({ value: [] });

        expect(() => {
            openPicker(wrapper);
            selectCell(wrapper, 3);
            closePicker(wrapper);

            openPicker(wrapper, 1);
            selectCell(wrapper, 5, 1);
            closePicker(wrapper, 1);
        }).not.toThrow();
    });

    it('customize separator', () => {
        const wrapper = mount(<RangePicker separator="test" />);
        expect(wrapper.render()).toMatchSnapshot();
    });

    describe('in "month" mode, when the left and right partials select the same month', () => {
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

        it('the cell status is correct', () => {
            class Test extends React.Component {
                state = {
                    value: null,
                };

                onPartialChange = (value) => {
                    this.setState({ value });
                };

                render() {
                    return (
                        <RangePicker
                            value={this.state.value}
                            mode={['month', 'month']}
                            onPartialChange={this.onPartialChange}
                        />
                    );
                }
            }
            const wrapper = mount(<Test />);
            openPicker(wrapper);
            selectCell(wrapper, 'Feb');
            openPicker(wrapper, 1);
            selectCell(wrapper, 'Feb');
            closePicker(wrapper, 1);
            const { value } = wrapper.find(Test).state();
            expect(value[0].isSame(value[1], 'date')).toBeTruthy();
        });
    });

    it('placeholder', () => {
        const wrapper = mount(<RangePicker placeholder={undefined} />);
        expect(wrapper.find('input').first().props().placeholder).toEqual(
            'Start date'
        );
        expect(wrapper.find('input').last().props().placeholder).toEqual(
            'End date'
        );
    });

    it('RangePicker picker quarter placeholder', () => {
        const wrapper = mount(<RangePicker picker="quarter" locale={enUS} />);
        expect(wrapper.find('input').at(0).props().placeholder).toEqual(
            'Start quarter'
        );
        expect(wrapper.find('input').at(1).props().placeholder).toEqual(
            'End quarter'
        );
    });
});
