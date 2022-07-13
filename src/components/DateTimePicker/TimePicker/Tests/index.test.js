import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import moment from 'moment';
import React from 'react';
import TimePicker from '../TimePicker';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('TimePicker', () => {
    it('not render clear icon when allowClear is false', () => {
        const wrapper = mount(
            <TimePicker
                defaultValue={moment('2000-01-01 00:00:00')}
                allowClear={false}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    // TODO: Re-enable when Octuple supports locales
    // it('prop locale should works', () => {
    //   const locale = {
    //     placeholder: 'Избери дата',
    //   };
    //   const wrapper = mount(
    //     <TimePicker defaultValue={moment('2000-01-01 00:00:00')} open locale={locale} />,
    //   );
    //   expect(wrapper.render()).toMatchSnapshot();
    // });

    // TODO Re-enable when test bug to find component is fixed
    // it('should pass popupClassNames prop to Picker as dropdownClassNames prop', () => {
    //   const dropdownClassNames = 'myCustomClassName';
    //   const wrapper = mount(
    //     <TimePicker
    //       defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    //       popupClassNames={dropdownClassNames}
    //     />,
    //   );
    //   expect(wrapper.find('PickerPartial').last().prop('dropdownClassNames')).toEqual(popupClassNames);
    // });

    // it('should pass popupClassNames prop to RangePicker as dropdownClassNames prop', () => {
    //   const dropdownClassNames = 'myCustomClassName';
    //   const wrapper = mount(
    //     <TimePicker.RangePicker
    //       defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    //       popupClassNames={dropdownClassNames}
    //     />,
    //   );
    //   expect(wrapper.find('PickerPartial').last().prop('dropdownClassNames')).toEqual(popupClassNames);
    // });

    it('should support bordered', () => {
        const wrapper = mount(
            <TimePicker
                className="custom-class"
                defaultValue={moment('2000-01-01 00:00:00')}
                bordered={false}
            />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});
