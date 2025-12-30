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

  it('should have proper ARIA roles and labels for time selection', () => {
    const wrapper = mount(
      <TimePicker defaultValue={dayjs('2000-01-01 12:30:45')} open />
    );

    // Check that listbox role exists
    const listbox = wrapper.find('[role="listbox"]');
    expect(listbox.length).toBeGreaterThan(0);

    // Check that option roles exist
    const options = wrapper.find('[role="option"]');
    expect(options.length).toBeGreaterThan(0);

    // Check that time columns have aria-label
    const timeColumns = wrapper.find('ul[aria-label]');
    expect(timeColumns.length).toBeGreaterThan(0);

    // Verify specific column labels
    const hourColumn = wrapper.find('ul[aria-label="Hours"]');
    const minuteColumn = wrapper.find('ul[aria-label="Minutes"]');
    const secondColumn = wrapper.find('ul[aria-label="Seconds"]');

    expect(hourColumn.length).toBeGreaterThan(0);
    expect(minuteColumn.length).toBeGreaterThan(0);
    expect(secondColumn.length).toBeGreaterThan(0);
  });

  it('should have proper ARIA roles and labels for 12-hour format', () => {
    const wrapper = mount(
      <TimePicker defaultValue={dayjs('2000-01-01 12:30:45')} use12Hours open />
    );

    // Check that listbox role exists
    const listbox = wrapper.find('[role="listbox"]');
    expect(listbox.length).toBeGreaterThan(0);

    // Check that AM/PM column has aria-label
    const ampmColumn = wrapper.find('ul[aria-label="AM/PM"]');
    expect(ampmColumn.length).toBeGreaterThan(0);
  });
});
