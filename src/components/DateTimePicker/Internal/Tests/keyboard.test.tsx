import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
import { eventKeys } from '../../../../shared/utilities';
import {
  mount,
  getDayjs,
  isSame,
  DayjsPicker,
  DayjsPickerPartial,
  Wrapper,
  DayjsRangePicker,
} from './util/commonUtil';
import dayjs from 'dayjs';
import '@testing-library/jest-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

Object.assign(Enzyme.ReactWrapper.prototype, {
  openPicker(index: number = 0) {
    this.find('input').at(index).simulate('mousedown').simulate('focus');
  },
  closePicker(index: number = 0) {
    this.find('input').at(index).simulate('blur');
  },
  confirmOK() {
    this.find('.picker-ok *').simulate('click');
  },
  isClosed() {
    const closedDiv = this.find('.slide-up-leave').hostNodes();
    return closedDiv && closedDiv.length;
  },
  isOpen() {
    const openDiv = this.find('.trigger-popup').hostNodes();
    return openDiv && openDiv.length;
  },
  findCell(text: number | string, index: number = 0) {
    let matchCell;

    const table = this.find('table').at(index);

    table.find('td').forEach(
      (td: {
        text: () => string;
        props: () => {
          (): any;
          new (): any;
          className: string | string[];
        };
      }) => {
        if (
          td.text() === String(text) &&
          td.props().className.includes('-in-view')
        ) {
          matchCell = td;
        }
      }
    );
    if (!matchCell) {
      console.log(table.html());
      throw new Error('Cell not match in picker partial.');
    }

    return matchCell;
  },
  selectCell(text: number | string, index: number = 0) {
    const td = this.findCell(text, index);
    td.simulate('click');

    return td;
  },
  clickButton(type: 'prev' | 'next' | 'super-prev' | 'super-next') {
    let matchBtn: any;
    this.find('button').forEach(
      (btn: {
        props: () => {
          (): any;
          new (): any;
          className: string | string[];
        };
      }) => {
        if (btn.props().className.includes(`-header-${type}-btn`)) {
          matchBtn = btn;
        }
      }
    );

    matchBtn.simulate('click');

    return matchBtn;
  },
  clearValue() {
    this.find('.picker-clear-btn').simulate('mouseDown');
    this.find('.picker-clear-btn').simulate('mouseUp');
  },
  keyDown(key: string, info: object = {}, index: number = 0) {
    let component = this.find('input');

    if (component.length === 0) {
      component = this.find('.picker-partial');
    }

    component.at(index).simulate('keydown', { ...info, key });
  },
  inputValue(text: any, index = 0) {
    this.find('input')
      .at(index)
      .simulate('change', { target: { value: text } });
  },
});

describe('Picker.Keyboard', () => {
  function partialKeyDown(wrapper: Wrapper, key: string, info?: object) {
    wrapper.find('.picker-partial').simulate('keyDown', { key: key, ...info });
  }

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

  describe('datepicker trapFocus set to true', () => {
    it('should focus to the first focusable element when Tab is pressed', async () => {
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const { container } = render(
        <DayjsPicker
          onSelect={onSelect}
          onChange={onChange}
          trapFocus
          showToday
        />
      );
      const input = container.getElementsByTagName('input')[0];
      input.focus();
      expect(input).toHaveFocus();
      fireEvent.keyDown(input, { key: eventKeys.ENTER });
      expect(screen.getByTestId('picker-dialog')).toBeInTheDocument();
      fireEvent.keyDown(input, { key: eventKeys.TAB });
      await waitFor(() =>
        expect(
          screen.getByTestId('picker-header-super-prev-btn').matches(':focus')
        ).toBe(true)
      );
    });

    it('focus should move to the last focusable element in picker dialog when Shift + Tab is pressed', async () => {
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const { container } = render(
        <DayjsPicker
          onSelect={onSelect}
          onChange={onChange}
          trapFocus
          showToday
        />
      );
      const input = container.getElementsByTagName('input')[0];
      input.focus();
      expect(input).toHaveFocus();
      fireEvent.keyDown(input, { key: eventKeys.ENTER });
      expect(screen.getByTestId('picker-dialog')).toBeInTheDocument();
      fireEvent.keyDown(input, { key: eventKeys.TAB });
      screen.getByTestId('picker-dialog').focus();
      fireEvent.keyDown(screen.getByTestId('picker-dialog'), {
        key: eventKeys.TAB,
      });
      await waitFor(() =>
        expect(
          screen.getByTestId('picker-header-super-prev-btn').matches(':focus')
        ).toBe(true)
      );
      fireEvent.keyDown(screen.getByTestId('picker-header-super-prev-btn'), {
        key: eventKeys.TAB,
        shiftKey: true,
      });
      await waitFor(() =>
        expect(screen.getByTestId('picker-today-btn').matches(':focus')).toBe(
          true
        )
      );
    });

    it('should have aria-label and tabIndex set when date selection', () => {
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const { container } = render(
        <DayjsPicker
          onSelect={onSelect}
          onChange={onChange}
          trapFocus
          showToday
        />
      );
      const input = container.getElementsByTagName('input')[0];
      input.focus();
      expect(input).toHaveFocus();
      fireEvent.keyDown(input, { key: eventKeys.ENTER });
      expect(screen.getByTestId('picker-dialog')).toBeInTheDocument();
      fireEvent.keyDown(input, { key: eventKeys.TAB });
      fireEvent.keyDown(screen.getByTestId('picker-dialog').firstChild, {
        key: eventKeys.ARROWDOWN,
      });

      expect(isSame(onSelect.mock.calls[0][0], '1990-09-10')).toBeTruthy();
      expect(screen.getByLabelText('Monday 10 September 1990')).toHaveFocus();
      expect(screen.getByLabelText('Monday 10 September 1990')).toHaveAttribute(
        'tabIndex',
        '0'
      );

      onSelect.mockReset();
      fireEvent.keyDown(screen.getByTestId('picker-dialog').firstChild, {
        key: eventKeys.ARROWUP,
      });
      expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();
      expect(screen.getByLabelText('Monday 3 September 1990')).toHaveFocus();
      expect(screen.getByLabelText('Monday 10 September 1990')).toHaveAttribute(
        'tabIndex',
        '-1'
      );
      expect(screen.getByLabelText('Monday 3 September 1990')).toHaveAttribute(
        'tabIndex',
        '0'
      );
    });
  });

  it('open to select', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    const wrapper = mount(
      <DayjsPicker onSelect={onSelect} onChange={onChange} />
    );
    wrapper.find('input').simulate('focus');
    wrapper.keyDown(eventKeys.ENTER);
    expect(wrapper.isOpen()).toBeTruthy();

    // Tab to operate popup partial
    wrapper.keyDown(eventKeys.TAB);
    expect(wrapper.find('.picker-partial-focused').length).toBeTruthy();

    // Down
    wrapper.keyDown(eventKeys.ARROWDOWN);
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-10')).toBeTruthy();

    // ARROWUP
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.ARROWUP);
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();

    // ARROWLEFT
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.ARROWLEFT);
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-02')).toBeTruthy();

    // ARROWRIGHT
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.ARROWRIGHT);
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // Control + Left
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.ARROWLEFT, { ctrlKey: true });
    expect(isSame(onSelect.mock.calls[0][0], '1989-09-03')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // Control + ARROWRIGHT
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.ARROWRIGHT, { ctrlKey: true });
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // PageUp
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.PAGEUP);
    expect(isSame(onSelect.mock.calls[0][0], '1990-08-03')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // PageDown
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.PAGEDOWN);
    expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // Other key
    onSelect.mockReset();
    wrapper.keyDown(eventKeys.KEYB);
    expect(onSelect).not.toHaveBeenCalled();

    // Double ARROWRIGHT
    wrapper.keyDown(eventKeys.ARROWRIGHT);

    // ENTER
    wrapper.keyDown(eventKeys.ENTER);
    expect(wrapper.isClosed()).toBeTruthy();
    expect(onChange.mock.calls[0][1]).toEqual('1990-09-04');
  });

  it('ESCAPE to cancel', () => {
    const onChange = jest.fn();
    const wrapper = mount(<DayjsPicker onChange={onChange} />);
    wrapper.openPicker();

    // Change value
    wrapper.keyDown(eventKeys.TAB);
    wrapper.keyDown(eventKeys.ARROWDOWN);

    // ESCAPE
    wrapper.keyDown(eventKeys.ESCAPE);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('any key to open', () => {
    const wrapper = mount(<DayjsPicker />);
    wrapper.keyDown(eventKeys.KEYA);
    expect(wrapper.isOpen()).toBeTruthy();
  });

  it('not change focus to partial', () => {
    const wrapper = mount(<DayjsPicker />);
    wrapper.openPicker();

    // Not change focus
    wrapper.keyDown(eventKeys.KEYB);
    expect(wrapper.isOpen()).toBeTruthy();

    expect(wrapper.find('.picker-partial-focused').length).toBeFalsy();
  });

  it('Tab into Partial and back to input', () => {
    const wrapper = mount(<DayjsPicker />);
    wrapper.openPicker();

    // Focus Partial
    wrapper.keyDown(eventKeys.TAB);
    expect(wrapper.find('.picker-partial-focused').length).toBeTruthy();

    // Focus Back
    wrapper.keyDown(eventKeys.TAB, { shiftKey: true });
    expect(wrapper.find('.picker-partial-focused').length).toBeFalsy();
  });

  describe('datetime Tab control', () => {
    it('Picker', () => {
      jest.useFakeTimers();

      const wrapper = mount(<DayjsPicker showTime />);
      wrapper.openPicker();

      // Focus Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-partial-focused').length).toBeTruthy();

      // Focus Date Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-date-partial-active').length).toBeTruthy();

      // Focus Time Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-time-partial-active').length).toBeTruthy();

      // Close should focus
      wrapper.closePicker();
      act(() => {
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find('.picker-time-partial-active').length).toBeTruthy();

      jest.useRealTimers();
    });

    it('Picker without focus trap', () => {
      jest.useFakeTimers();

      const wrapper = mount(<DayjsPicker showTime trapFocus={false} />);
      wrapper.openPicker();

      // Focus Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-partial-focused').length).toBeTruthy();

      // Focus Date Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-date-partial-active').length).toBeTruthy();

      // Focus Time Partial
      wrapper.keyDown(eventKeys.TAB);
      expect(wrapper.find('.picker-time-partial-active').length).toBeTruthy();

      // Close should not focus
      wrapper.closePicker();
      act(() => {
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find('.picker-time-partial-active').length).toBeFalsy();

      jest.useRealTimers();
    });

    describe('PickerPartial', () => {
      describe('switch partials', () => {
        [
          {
            name: 'Tab switch first',
            operate: (wrapper: Wrapper) => {
              partialKeyDown(wrapper, eventKeys.TAB);
            },
          },
          {
            name: 'Arrow switch first',
            operate: (wrapper: Wrapper) => {
              // Nothing happen
              partialKeyDown(wrapper, eventKeys.KEYA);

              // Switch
              partialKeyDown(wrapper, eventKeys.ARROWDOWN);
            },
          },
        ].forEach(({ name, operate }) => {
          it(name, () => {
            const onSelect = jest.fn();
            const wrapper = mount(
              <DayjsPickerPartial onSelect={onSelect} showTime />
            );

            // Focus Partial
            wrapper.find('.picker-partial').simulate('focus');

            // Focus Date Partial
            operate(wrapper);
            expect(
              wrapper.find('.picker-date-partial-active').length
            ).toBeTruthy();

            // Select
            partialKeyDown(wrapper, eventKeys.ARROWDOWN);
            expect(
              isSame(onSelect.mock.calls[0][0], '1990-09-10')
            ).toBeTruthy();

            // Focus Time Partial
            partialKeyDown(wrapper, eventKeys.TAB);
            expect(
              wrapper.find('.picker-time-partial-active').length
            ).toBeTruthy();

            // Select
            onSelect.mockReset();
            partialKeyDown(wrapper, eventKeys.ARROWUP);
            partialKeyDown(wrapper, eventKeys.ARROWDOWN);
            expect(
              isSame(onSelect.mock.calls[0][0], '1990-09-10 01:00:00', 'second')
            ).toBeTruthy();

            // Next column select
            onSelect.mockReset();
            partialKeyDown(wrapper, eventKeys.ARROWRIGHT);
            partialKeyDown(wrapper, eventKeys.ARROWUP);
            expect(
              isSame(onSelect.mock.calls[0][0], '1990-09-10 01:59:00', 'second')
            ).toBeTruthy();

            // Enter to exit column edit
            onSelect.mockReset();
            expect(
              wrapper.find('.picker-time-partial-column-active').length
            ).toBeTruthy();
            partialKeyDown(wrapper, eventKeys.ENTER);
            expect(
              wrapper.find('.picker-time-partial-column-active').length
            ).toBeFalsy();
            expect(
              isSame(onSelect.mock.calls[0][0], '1990-09-10 01:59:00', 'second')
            ).toBeTruthy();

            // Close should not focus
            wrapper.find('.picker-partial').simulate('blur');
            expect(
              wrapper.find('.picker-time-partial-active').length
            ).toBeFalsy();
          });
        });
      });

      it('Enter to next view', () => {
        const wrapper = mount(<DayjsPickerPartial />);
        wrapper.find('.picker-year-btn').simulate('click');
        wrapper.find('.picker-decade-btn').simulate('click');

        // Decade
        expect(wrapper.find('.picker-decade-partial').length).toBeTruthy();

        // Year
        partialKeyDown(wrapper, eventKeys.ENTER);
        expect(wrapper.find('.picker-year-partial').length).toBeTruthy();

        // Month
        partialKeyDown(wrapper, eventKeys.ENTER);
        expect(wrapper.find('.picker-month-partial').length).toBeTruthy();

        // Date
        partialKeyDown(wrapper, eventKeys.ENTER);
        expect(wrapper.find('.picker-date-partial').length).toBeTruthy();
      });
    });
  });

  it('time enter will trigger onSelect', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <DayjsPickerPartial picker="time" onSelect={onSelect} />
    );
    partialKeyDown(wrapper, eventKeys.ENTER);
    expect(
      isSame(onSelect.mock.calls[0][0], '1990-09-03 00:00:00', 'second')
    ).toBeTruthy();
  });

  describe('arrow trigger onSelect', () => {
    // Same as 'open to select' test. But with other partial
    it('month', () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPickerPartial
          picker="month"
          defaultValue={getDayjs('1990-09-03')}
          onSelect={onSelect}
        />
      );

      // Left
      partialKeyDown(wrapper, eventKeys.ARROWLEFT);
      expect(isSame(onSelect.mock.calls[0][0], '1990-08-03')).toBeTruthy();

      // Control + Right
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWRIGHT, { ctrlKey: true });
      expect(isSame(onSelect.mock.calls[0][0], '1991-08-03')).toBeTruthy();

      // Down
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[0][0], '1991-11-03')).toBeTruthy();
    });

    it('quarter', () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPickerPartial
          picker="quarter"
          defaultValue={getDayjs('1990-09-03')}
          onSelect={onSelect}
        />
      );

      // Left
      partialKeyDown(wrapper, eventKeys.ARROWLEFT);
      expect(isSame(onSelect.mock.calls[0][0], '1990-06-03')).toBeTruthy();

      // Control + Right
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWRIGHT, { ctrlKey: true });
      expect(isSame(onSelect.mock.calls[0][0], '1991-06-03')).toBeTruthy();

      // Down
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[0][0], '1992-06-03')).toBeTruthy();
    });

    it('year', () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPickerPartial
          picker="year"
          defaultValue={getDayjs('1990-09-03')}
          onSelect={onSelect}
        />
      );

      // Left
      partialKeyDown(wrapper, eventKeys.ARROWLEFT);
      expect(isSame(onSelect.mock.calls[0][0], '1989-09-03')).toBeTruthy();

      // Control + Right
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWRIGHT, { ctrlKey: true });
      expect(isSame(onSelect.mock.calls[0][0], '1999-09-03')).toBeTruthy();

      // Down
      onSelect.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[0][0], '2002-09-03')).toBeTruthy();
    });

    it('decade', () => {
      const onPartialChange = jest.fn();
      const wrapper = mount(
        <DayjsPickerPartial
          mode="decade"
          defaultValue={getDayjs('1990-09-03')}
          onPartialChange={onPartialChange}
        />
      );

      // Left
      partialKeyDown(wrapper, eventKeys.ARROWLEFT);
      partialKeyDown(wrapper, eventKeys.ENTER);
      expect(
        isSame(onPartialChange.mock.calls[0][0], '1980', 'year')
      ).toBeTruthy();

      // Control + Right
      onPartialChange.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWRIGHT, { ctrlKey: true });
      partialKeyDown(wrapper, eventKeys.ENTER);
      expect(
        isSame(onPartialChange.mock.calls[0][0], '2080', 'year')
      ).toBeTruthy();

      // Down
      onPartialChange.mockReset();
      partialKeyDown(wrapper, eventKeys.ARROWDOWN);
      partialKeyDown(wrapper, eventKeys.ENTER);
      expect(
        isSame(onPartialChange.mock.calls[0][0], '2110', 'year')
      ).toBeTruthy();
    });
  });

  describe('range picker', () => {
    it('full step', () => {
      jest.useFakeTimers();
      const onCalendarChange = jest.fn();
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          onCalendarChange={onCalendarChange}
          onChange={onChange}
        />
      );

      // Start Date
      wrapper.openPicker();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: '1990-01-01' } });
      wrapper.keyDown(eventKeys.TAB);
      wrapper.keyDown(eventKeys.ARROWDOWN);
      wrapper.keyDown(eventKeys.ENTER);
      expect(onCalendarChange.mock.calls[0][1]).toEqual(['1990-01-08', '']);
      expect(onChange).not.toHaveBeenCalled();

      // End Date
      act(() => {
        jest.runAllTimers();
      });
      expect(
        wrapper.find('.picker-input').last().hasClass('picker-input-active')
      ).toBeTruthy();
      onCalendarChange.mockReset();

      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: '2000-01-01' } });
      wrapper.keyDown(eventKeys.TAB, {}, 1);
      wrapper.keyDown(eventKeys.ARROWDOWN, {}, 1);
      wrapper.keyDown(eventKeys.ENTER, {}, 1);
      expect(onCalendarChange.mock.calls[0][1]).toEqual([
        '1990-01-08',
        '2000-01-08',
      ]);
      expect(onChange.mock.calls[0][1]).toEqual(['1990-01-08', '2000-01-08']);

      jest.useRealTimers();
    });

    it('full step', () => {
      const onCalendarChange = jest.fn();
      const onChange = jest.fn();
      const onFocus = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          onFocus={onFocus}
          onCalendarChange={onCalendarChange}
          onChange={onChange}
        />
      );

      wrapper.openPicker();
      expect(onFocus).toHaveBeenCalled();

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: '2000-01-01' } });
      wrapper.keyDown(eventKeys.ESCAPE);
      expect(wrapper.find('input').first().props().value).toEqual('2000-01-01');
    });

    it('move based on current date on first keyboard event', () => {
      jest.useFakeTimers();
      const onCalendarChange = jest.fn();
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          onCalendarChange={onCalendarChange}
          onChange={onChange}
        />
      );

      // Start Date
      wrapper.openPicker();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: '1990-09-03' } });
      wrapper.keyDown(eventKeys.TAB);
      wrapper.keyDown(eventKeys.ARROWRIGHT);
      wrapper.keyDown(eventKeys.ENTER);
      expect(onCalendarChange.mock.calls[0][1]).toEqual(['1990-09-04', '']);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('enter should prevent default to avoid form submit', () => {
    const wrapper = mount(<DayjsPicker />);
    const preventDefault = jest.fn();
    wrapper.find('input').simulate('keyDown', {
      key: eventKeys.ENTER,
      preventDefault,
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  describe('keyboard should not trigger on disabledDate', () => {
    it('picker', () => {
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPicker
          showTime
          onSelect={onSelect}
          onChange={onChange}
          disabledDate={(date: dayjs.Dayjs) => date.date() % 2 === 0}
        />
      );
      wrapper.find('input').simulate('focus');
      wrapper.keyDown(eventKeys.ENTER);
      wrapper.keyDown(eventKeys.TAB);
      wrapper.keyDown(eventKeys.TAB);
      wrapper.keyDown(eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[0][0], '1990-09-10')).toBeTruthy();

      // Not enter to change
      wrapper.keyDown(eventKeys.ENTER);
      expect(onChange).not.toHaveBeenCalled();

      // Not button enabled
      expect(wrapper.find('.picker-ok button').props().disabled).toBeTruthy();

      // Another can be enter
      wrapper.keyDown(eventKeys.ARROWRIGHT);
      expect(wrapper.find('.picker-ok button').props().disabled).toBeFalsy();
      wrapper.keyDown(eventKeys.ENTER);
      expect(onChange).toHaveBeenCalled();
    });

    it('partial', () => {
      const onChange = jest.fn();
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPickerPartial
          onSelect={onSelect}
          onChange={onChange}
          disabledDate={(date: dayjs.Dayjs) => date.date() % 2 === 0}
        />
      );

      wrapper.find('.picker-partial').simulate('focus');

      // 9-10 is disabled
      wrapper.keyDown(eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[0][0], '1990-09-10')).toBeTruthy();
      expect(onChange).not.toHaveBeenCalled();

      // 9-17 is enabled
      wrapper.keyDown(eventKeys.ARROWDOWN);
      expect(isSame(onSelect.mock.calls[1][0], '1990-09-17')).toBeTruthy();
      expect(isSame(onChange.mock.calls[0][0], '1990-09-17')).toBeTruthy();
    });
  });
});
