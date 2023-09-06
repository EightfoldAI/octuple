import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import {
  getDayjs,
  isOpen,
  DayjsPicker,
  DayjsRangePicker,
  openPicker,
} from './util/commonUtil';
import { fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('Picker.changeOnBlur', () => {
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
    MockDate.set(getDayjs('1990-09-03 00:00:00').toDate());
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('Picker', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const { container } = render(
      <>
        <DayjsPicker
          changeOnBlur
          showTime
          onSelect={onSelect}
          onChange={onChange}
        />
        <button className="outside" />
      </>
    );

    // Open
    fireEvent.mouseDown(container.querySelector('input'));
    fireEvent.click(container.querySelector('input'));
    fireEvent.focus(container.querySelector('input'));

    fireEvent.click(document.querySelectorAll('.picker-cell-inner')[0]);
    expect(onSelect).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();

    container.querySelector<HTMLButtonElement>('.outside').focus();
    fireEvent.blur(container.querySelector('input'));
    expect(onChange).toHaveBeenCalled();
  });

  test('RangePicker', () => {
    const onChange = jest.fn();

    const { container } = render(
      <>
        <DayjsRangePicker changeOnBlur showTime onChange={onChange} />
        <button className="outside" />
      </>
    );

    // Open
    fireEvent.mouseDown(container.querySelectorAll('input')[0]);
    fireEvent.click(container.querySelectorAll('input')[0]);
    fireEvent.focus(container.querySelectorAll('input')[0]);

    fireEvent.click(document.querySelectorAll('.picker-cell-inner')[0]);
    expect(onChange).not.toHaveBeenCalled();

    // Second Input
    fireEvent.mouseDown(container.querySelectorAll('input')[1]);
    fireEvent.click(container.querySelectorAll('input')[1]);
    fireEvent.focus(container.querySelectorAll('input')[1]);

    const cells = document.querySelectorAll('.picker-time-partial-cell-inner');
    fireEvent.click(cells[cells.length - 1]);

    // Blur
    container.querySelector<HTMLButtonElement>('.outside').focus();
    fireEvent.blur(container.querySelectorAll('input')[1]);
    expect(onChange).toHaveBeenCalled();
  });

  test('Blur & close should not trigger change', () => {
    const onCalendarChange = jest.fn();

    const { container } = render(
      <>
        <DayjsRangePicker
          changeOnBlur
          defaultValue={[getDayjs('2000-01-01'), getDayjs('2000-01-05')]}
          onCalendarChange={onCalendarChange}
        />
      </>
    );

    expect(isOpen()).toBeFalsy();
    fireEvent.blur(container.querySelector('input'));
    expect(onCalendarChange).not.toHaveBeenCalled();

    // Open to trigger
    openPicker(container);
    expect(isOpen()).toBeTruthy();
    fireEvent.blur(container.querySelector('input'));
    expect(onCalendarChange).toHaveBeenCalled();
  });
});
