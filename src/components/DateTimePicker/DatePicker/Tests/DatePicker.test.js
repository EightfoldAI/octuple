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
    const table = wrapper.find('table[role="grid"]');
    const columnHeaders = wrapper.find('thead th[role="columnheader"]');
    const bodyRows = wrapper.find('tbody tr[role="row"]');
    const gridCells = wrapper.find('tbody td[role="gridcell"]');

    expect(table.prop('role')).toBe('grid');
    expect(columnHeaders.length).toBe(7);
    expect(columnHeaders.first().prop('scope')).toBe('col');
    expect(bodyRows.length).toBe(6);
    expect(gridCells.length).toBe(42);
  });

  it('should have proper ARIA attributes on date cells', () => {
    const wrapper = mount(
      <DatePicker
        value={dayjs('2016-11-15')}
        disabledDate={(current) => current && current < dayjs('2016-11-10')}
        open
      />
    );
    const gridCells = wrapper.find('tbody td[role="gridcell"]');
    const selected = gridCells.filterWhere(
      (td) => td.prop('aria-selected') === true
    );
    const disabled = gridCells.filterWhere(
      (td) => td.prop('aria-disabled') === true
    );

    expect(selected.length).toBe(1);
    expect(disabled.length).toBeGreaterThan(0);
    // aria-label is on the inner div, not the td
    expect(
      gridCells.first().find('div[role="button"]').prop('aria-label')
    ).toBeTruthy();
  });

  it('should have proper ARIA labels on the header buttons', () => {
    const wrapper = mount(<DatePicker open />);
    const superPrevButton = wrapper.find(
      'button[data-testid="picker-header-super-prev-btn"]'
    );
    const prevButton = wrapper.find(
      'button[data-testid="picker-header-prev-btn"]'
    );
    const nextButton = wrapper.find(
      'button[data-testid="picker-header-next-btn"]'
    );
    const superNextButton = wrapper.find(
      'button[data-testid="picker-header-super-next-btn"]'
    );
    expect(superPrevButton.prop('aria-label')).toBe(
      'Previous year (Control + left)'
    );
    expect(prevButton.prop('aria-label')).toBe('Previous month (PageUp)');
    expect(nextButton.prop('aria-label')).toBe('Next month (PageDown)');
    expect(superNextButton.prop('aria-label')).toBe(
      'Next year (Control + right)'
    );
  });

  it('should handle RangePicker with start and end dates selected', () => {
    const wrapper = mount(
      <DatePicker.RangePicker
        value={[dayjs('2016-11-15'), dayjs('2016-11-20')]}
        open
      />
    );
    const selected = wrapper
      .find('tbody td[role="gridcell"]')
      .filterWhere((td) => td.prop('aria-selected') === true);

    expect(selected.length).toBeGreaterThanOrEqual(2);
  });

  it('should set tabIndex to -1 for non-selected and non-today dates', () => {
    // Test case where a date is neither selected nor today
    // This covers the else branch in useCellProps where tabIndex is -1
    const wrapper = mount(<DatePicker value={dayjs('2016-11-15')} open />);
    const gridCells = wrapper.find('tbody td[role="gridcell"]');
    // Find a cell that is not the selected date (2016-11-15) and not today (2016-11-22)
    const nonSelectedCell = gridCells
      .filterWhere((td) => {
        const ariaSelected = td.prop('aria-selected');
        return ariaSelected === false;
      })
      .first();

    // Verify that non-selected, non-today cells have tabIndex -1
    const buttonDiv = nonSelectedCell.find('div[role="button"]');
    expect(buttonDiv.prop('tabIndex')).toBe(-1);
  });
});
