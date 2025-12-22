import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import React from 'react';
import DatePicker from '..';
import '@testing-library/jest-dom';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker', () => {
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
    MockDate.set(dayjs('2016-11-22').valueOf());
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('prop locale should work', () => {
    const locale = {
      lang: {
        locale: 'mk',
        placeholder: 'Избери дата',
        rangePlaceholder: ['Начална дата', 'Крайна дата'],
        today: 'Днес',
        now: 'Сега',
        backToToday: 'Към днес',
        ok: 'Добре',
        clear: 'Изчистване',
        month: 'Месец',
        year: 'Година',
        timeSelect: 'Избор на час',
        dateSelect: 'Избор на дата',
        monthSelect: 'Избор на месец',
        yearSelect: 'Избор на година',
        decadeSelect: 'Десетилетие',
        previousMonth: 'Предишен месец (PageUp)',
        nextMonth: 'Следващ месец (PageDown)',
        previousYear: 'Последна година (Control + left)',
        nextYear: 'Следваща година (Control + right)',
        previousDecade: 'Предишно десетилетие',
        nextDecade: 'Следващо десетилетие',
        previousCentury: 'Последен век',
        nextCentury: 'Следващ век',
        yearFormat: 'YYYY',
        dateFormat: 'D M YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'D M YYYY HH:mm:ss',
        monthBeforeYear: true,
      },
      timePickerLocale: {
        placeholder: 'Избор на час',
      },
    };
    const birthday = dayjs('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(<DatePicker locale={locale} value={birthday} />);
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/DatePicker.locale.shot'
    );
  });

  it('disabled date', () => {
    const disabledDate = (current) => current && current < dayjs().endOf('day');
    const wrapper = mount(<DatePicker disabledDate={disabledDate} />);
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/DatePicker.disableddate.shot'
    );
  });

  it('placeholder', () => {
    const wrapper = mount(<DatePicker placeholder={undefined} />);
    expect(wrapper.find('input').props().placeholder).toEqual('Select date');
  });

  it('showTime={{ showHour: true, showMinute: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showHour: true, showMinute: true }}
        format="YYYY-MM-DD"
        open
      />
    );
    expect(wrapper.find('.picker-time-partial-column').length).toBe(2);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(0)
        .find('.picker-time-partial-cell').length
    ).toBe(24);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(1)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
  });

  it('showTime={{ showHour: true, showSecond: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showHour: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />
    );
    expect(wrapper.find('.picker-time-partial-column').length).toBe(2);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(0)
        .find('.picker-time-partial-cell').length
    ).toBe(24);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(1)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
  });

  it('showTime={{ showMinute: true, showSecond: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showMinute: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />
    );
    expect(wrapper.find('.picker-time-partial-column').length).toBe(2);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(0)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(1)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
  });
  it('showTime should work correctly when format is custom function', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime
        format={(val) => val.format('YYYY-MM-DD')}
        open
      />
    );
    const input = wrapper.find('input').simulate('mousedown');
    expect(input.simulate.bind(input, 'focus')).not.toThrowError();
  });

  it('12 hours', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime
        format="YYYY-MM-DD HH:mm:ss A"
        open
      />
    );
    expect(wrapper.find('.picker-time-partial-column').length).toBe(4);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(0)
        .find('.picker-time-partial-cell').length
    ).toBe(12);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(1)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(2)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(3)
        .find('.picker-time-partial-cell').length
    ).toBe(2);
  });

  it('24 hours', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={dayjs()}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        open
      />
    );
    expect(wrapper.find('.picker-time-partial-column').length).toBe(3);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(0)
        .find('.picker-time-partial-cell').length
    ).toBe(24);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(1)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
    expect(
      wrapper
        .find('.picker-time-partial-column')
        .at(2)
        .find('.picker-time-partial-cell').length
    ).toBe(60);
  });

  it('DatePicker.RangePicker with defaultPickerValue and showTime', () => {
    const startDate = dayjs('1982-02-12');
    const endDate = dayjs('1982-02-22');

    const wrapper = mount(
      <DatePicker.RangePicker
        defaultPickerValue={[startDate, endDate]}
        showTime
        open
      />
    );

    const month = wrapper.find('.picker-header-view .picker-month-btn').text();
    const year = wrapper.find('.picker-header-view .picker-year-btn').text();

    expect(month).toBe(startDate.format('MMM'));
    expect(year).toBe(startDate.format('YYYY'));
    expect(wrapper.find('.picker-time-partial').length).toBe(1);
  });

  it('placement api work correctly ', () => {
    const popupAlignDefault = (points = ['tl', 'bl'], offset = [0, 4]) => ({
      points,
      offset,
      overflow: {
        adjustX: 1,
        adjustY: 1,
      },
    });

    const wrapper = mount(
      <DatePicker.RangePicker
        defaultValue={dayjs()}
        popupPlacement="bottomLeft"
      />
    );
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['tl', 'bl'])
    );
    wrapper.setProps({
      popupPlacement: 'bottomRight',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['tr', 'br'])
    );
    wrapper.setProps({
      popupPlacement: 'topLeft',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['bl', 'tl'], [0, -4])
    );
    wrapper.setProps({
      popupPlacement: 'topRight',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['br', 'tr'], [0, -4])
    );
  });

  it('should have proper ARIA roles for calendar grid structure', () => {
    const wrapper = mount(<DatePicker open />);

    // Find the calendar table by role
    const table = wrapper.find('table[role="grid"]');
    expect(table.length).toBe(1);
    expect(table.prop('role')).toBe('grid');

    // Find header row in thead
    const headerRow = wrapper.find('thead tr[role="row"]');
    expect(headerRow.length).toBe(1);
    expect(headerRow.prop('role')).toBe('row');

    // Find column headers (th elements) - should be 7 for days of the week
    const columnHeaders = wrapper.find('thead th[role="columnheader"]');
    expect(columnHeaders.length).toBe(7);
    columnHeaders.forEach((th) => {
      expect(th.prop('role')).toBe('columnheader');
      expect(th.prop('scope')).toBe('col');
    });

    // Find body rows in tbody - should be 6 rows for a month view
    const bodyRows = wrapper.find('tbody tr[role="row"]');
    expect(bodyRows.length).toBe(6);
    bodyRows.forEach((tr) => {
      expect(tr.prop('role')).toBe('row');
    });

    // Find grid cells (td elements) - should be 42 cells (7 columns * 6 rows)
    const gridCells = wrapper.find('tbody td[role="gridcell"]');
    expect(gridCells.length).toBe(42);
    gridCells.forEach((td) => {
      expect(td.prop('role')).toBe('gridcell');
    });
  });
});
