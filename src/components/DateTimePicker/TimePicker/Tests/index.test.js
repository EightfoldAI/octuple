import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import dayjs from 'dayjs';
import React from 'react';
import TimePicker from '../TimePicker';
import '@testing-library/jest-dom';
import MatchMediaMock from 'jest-matchmedia-mock';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

describe('TimePicker', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    it('not render clear icon when allowClear is false', () => {
        const wrapper = mount(
            <TimePicker
                defaultValue={dayjs('2000-01-01 00:00:00')}
                allowClear={false}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    // TODO: Re-enable when Octuple supports locales
    it.skip('prop locale should works', () => {
        const locale = {
            placeholder: 'Избери дата',
        };
        const wrapper = mount(
            <TimePicker
                defaultValue={dayjs('2000-01-01 00:00:00')}
                open
                locale={locale}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    // TODO Re-enable when test bug to find a component is fixed
    it.skip('should pass popupClassNames prop to Picker as dropdownClassNames prop', () => {
        const dropdownClassNames = 'myCustomClassName';
        const wrapper = mount(
            <TimePicker
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                popupClassNames={dropdownClassNames}
            />
        );
        expect(
            wrapper.find('PickerPartial').last().prop('dropdownClassNames')
        ).toEqual(popupClassNames);
    });

    it.skip('should pass popupClassNames prop to RangePicker as dropdownClassNames prop', () => {
        const dropdownClassNames = 'myCustomClassName';
        const wrapper = mount(
            <TimePicker.RangePicker
                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                popupClassNames={dropdownClassNames}
            />
        );
        expect(
            wrapper.find('PickerPartial').last().prop('dropdownClassNames')
        ).toEqual(popupClassNames);
    });

    it('should support bordered', () => {
        const wrapper = mount(
            <TimePicker
                className="custom-class"
                defaultValue={dayjs('2000-01-01 00:00:00')}
                bordered={false}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});
