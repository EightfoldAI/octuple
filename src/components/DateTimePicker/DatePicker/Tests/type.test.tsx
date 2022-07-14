import React from 'react';
import type { Dayjs } from 'dayjs';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '..';
import type { DatePickRef, RangePickerRef } from '../Generate/Generate.types';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker.typescript', () => {
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

    it('DatePicker ref methods', () => {
        const datePicker = (
            <DatePicker
                ref={(picker) => {
                    picker?.focus();
                    picker?.blur();
                }}
            />
        );
        expect(datePicker).toBeTruthy();
    });

    it('DatePicker ref methods with forwardRef', () => {
        const MyDatePicker = React.forwardRef(
            (props, ref: DatePickRef<Dayjs>) => (
                <DatePicker {...props} ref={ref} />
            )
        );
        const datePicker = (
            <MyDatePicker
                ref={(picker) => {
                    picker?.focus();
                    picker?.blur();
                }}
            />
        );
        expect(datePicker).toBeTruthy();
    });

    it('RangePicker ref methods', () => {
        const rangePicker = (
            <DatePicker.RangePicker
                ref={(picker) => {
                    picker?.focus();
                    picker?.blur();
                }}
            />
        );
        expect(rangePicker).toBeTruthy();
    });

    it('RangePicker ref methods with forwardRef', () => {
        const MyRangePicker = React.forwardRef(
            (props, ref: RangePickerRef<Dayjs>) => (
                <DatePicker.RangePicker {...props} ref={ref} />
            )
        );
        const datePicker = (
            <MyRangePicker
                ref={(picker) => {
                    picker?.focus();
                    picker?.blur();
                }}
            />
        );
        expect(datePicker).toBeTruthy();
    });
});
