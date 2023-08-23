import React from 'react';
import { render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
import { spyElementPrototypes } from '../../../../tests/domHook';
import { eventKeys } from '../../../../shared/utilities';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { PartialMode } from '../OcPicker.types';
import { ButtonVariant } from '../../../Button';
import { mount, getDayjs, isSame, DayjsPicker } from './util/commonUtil';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

Object.assign(Enzyme.ReactWrapper.prototype, {
  openPicker(index: number = 0) {
    this.find('input').at(index).simulate('mousedown').simulate('focus');
  },
  closePicker(index: number = 0) {
    this.find('input').at(index).simulate('blur');
  },
  confirmOK() {
    this.find('.picker-ok > *').simulate('click');
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

describe('Picker.Basic', () => {
  beforeEach(() => {
    MockDate.set(getDayjs('1990-09-03 00:00:00').toDate());
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('mode', () => {
    const modeList: { mode: PartialMode; className: string }[] = [
      {
        mode: 'decade',
        className: '.picker-decade-partial',
      },
      {
        mode: 'year',
        className: '.picker-year-partial',
      },
      {
        mode: 'quarter',
        className: '.picker-quarter-partial',
      },
      {
        mode: 'month',
        className: '.picker-month-partial',
      },
      {
        mode: 'week',
        className: '.picker-week-partial',
      },
      {
        mode: 'date',
        className: '.picker-date-partial',
      },
      {
        mode: 'time' as any,
        className: '.picker-time-partial',
      },
    ];

    modeList.forEach(({ mode, className }) => {
      it(mode, () => {
        render(<DayjsPicker mode={mode} open />);
        expect(document.querySelector(className)).toBeTruthy();
      });
    });
  });

  describe('picker', () => {
    const modeList: { picker: PartialMode; className: string }[] = [
      {
        picker: 'year',
        className: '.picker-year-partial',
      },
      {
        picker: 'quarter',
        className: '.picker-quarter-partial',
      },
      {
        picker: 'month',
        className: '.picker-month-partial',
      },
      {
        picker: 'week',
        className: '.picker-week-partial',
      },
      {
        picker: 'date',
        className: '.picker-date-partial',
      },
      {
        picker: 'time',
        className: '.picker-time-partial',
      },
    ];

    modeList.forEach(({ picker, className }) => {
      it(picker, () => {
        render(<DayjsPicker picker={picker as any} open />);
        expect(document.querySelector(className)).toBeTruthy();
      });
    });
  });

  describe('open', () => {
    it('should work', () => {
      const onOpenChange = jest.fn();
      const wrapper = mount(<DayjsPicker onOpenChange={onOpenChange} />);

      wrapper.openPicker();
      expect(wrapper.isOpen()).toBeTruthy();
      expect(onOpenChange).toHaveBeenCalledWith(true);
      onOpenChange.mockReset();

      wrapper.closePicker();
      expect(wrapper.isClosed()).toBeTruthy();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('controlled', () => {
      const wrapper = mount(<DayjsPicker open />);
      expect(wrapper.isOpen()).toBeTruthy();

      wrapper.setProps({ open: false });
      wrapper.update();
      expect(wrapper.isClosed()).toBeTruthy();
    });

    it('fixed open need repeat trigger onOpenChange', () => {
      jest.useFakeTimers();
      const onOpenChange = jest.fn();
      mount(
        <DayjsPicker onOpenChange={onOpenChange} open changeOnBlur={false} />
      );

      for (let i = 0; i < 10; i += 1) {
        const clickEvent = new Event('mousedown');
        Object.defineProperty(clickEvent, 'target', {
          get: () => document.body,
        });
        act(() => {
          window.dispatchEvent(clickEvent);
        });
        expect(onOpenChange).toHaveBeenCalledTimes(i + 1);
      }
      act(() => {
        jest.runAllTimers();
      });
      jest.useRealTimers();
    });

    it('disabled should not open', () => {
      const wrapper = mount(<DayjsPicker open disabled />);
      expect(wrapper.isOpen()).toBeFalsy();
    });
  });

  describe('value', () => {
    it('defaultValue', () => {
      const wrapper = mount(
        <DayjsPicker defaultValue={getDayjs('1989-11-28')} />
      );
      expect(wrapper.find('input').prop('value')).toEqual('1989-11-28');
    });

    it('uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(<DayjsPicker onChange={onChange} />);
      wrapper.openPicker();
      wrapper.selectCell(11);
      wrapper.closePicker();

      expect(isSame(onChange.mock.calls[0][0], '1990-09-11')).toBeTruthy();
      expect(onChange.mock.calls[0][1]).toEqual('1990-09-11');
      expect(wrapper.find('input').prop('value')).toEqual('1990-09-11');
    });

    it('controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsPicker value={getDayjs('2011-11-11')} onChange={onChange} />
      );

      wrapper.openPicker();
      wrapper.selectCell(3);
      wrapper.closePicker();
      wrapper.update();

      expect(isSame(onChange.mock.calls[0][0], '2011-11-03')).toBeTruthy();
      expect(wrapper.find('input').prop('value')).toEqual('2011-11-11');

      wrapper.setProps({ value: onChange.mock.calls[0][0] });
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toEqual('2011-11-03');

      // Raw change value
      wrapper.setProps({ value: getDayjs('1999-09-09') });
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toEqual('1999-09-09');
    });
  });

  describe('typing to change value', () => {
    [
      {
        name: 'basic',
        value: '2000-11-11',
        selected: '.picker-cell-selected',
        matchDate: '2000-11-11',
      },
    ].forEach(({ name, value, matchDate, selected }) => {
      it(name, () => {
        const onChange = jest.fn();
        const wrapper = mount(<DayjsPicker onChange={onChange} allowClear />);
        wrapper.openPicker();
        wrapper.find('input').simulate('focus');

        // Invalidate value
        wrapper.find('input').simulate('change', {
          target: {
            value: 'abc',
          },
        });

        // Validate value
        wrapper.find('input').simulate('change', {
          target: {
            value,
          },
        });

        expect(wrapper.find('input').prop('value')).toEqual(value);
        expect(onChange).not.toHaveBeenCalled();
        wrapper.keyDown(eventKeys.ENTER);
        expect(isSame(onChange.mock.calls[0][0], matchDate)).toBeTruthy();
        expect(wrapper.find(selected).length).toBeTruthy();
        onChange.mockReset();

        wrapper.clearValue();
        expect(onChange).toHaveBeenCalledWith(null, '');
        expect(wrapper.isClosed()).toBeTruthy();

        wrapper.openPicker();
        expect(wrapper.find(selected).length).toBeFalsy();
      });
    });
  });

  describe('focus test', () => {
    let domMock: ReturnType<typeof spyElementPrototypes>;
    let focused = false;
    let blurred = false;

    beforeAll(() => {
      domMock = spyElementPrototypes(HTMLElement, {
        focus: () => {
          focused = true;
        },
        blur: () => {
          blurred = true;
        },
      });
    });

    beforeEach(() => {
      focused = false;
      blurred = false;
    });

    afterAll(() => {
      domMock.mockRestore();
    });

    it('function call', () => {
      const ref = React.createRef<DayjsPicker>();
      mount(
        <div>
          <DayjsPicker ref={ref} />
        </div>
      );

      ref.current!.pickerRef.current!.focus();
      expect(focused).toBeTruthy();

      ref.current!.pickerRef.current!.blur();
      expect(blurred).toBeTruthy();
    });

    it('style', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();

      const wrapper = mount(
        <div>
          <DayjsPicker onFocus={onFocus} onBlur={onBlur} />
        </div>
      );

      wrapper.find('input').simulate('focus');
      expect(onFocus).toHaveBeenCalled();
      expect(wrapper.find('.picker-focused').length).toBeTruthy();

      wrapper.find('input').simulate('blur');
      expect(onBlur).toHaveBeenCalled();
      expect(wrapper.find('.picker-focused').length).toBeFalsy();
    });
  });

  it('block native mouseDown in partial to prevent focus changed', () => {
    const wrapper = mount(<DayjsPicker />);
    wrapper.openPicker();

    const preventDefault = jest.fn();
    wrapper.find('td').first().simulate('mouseDown', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });

  describe('full steps', () => {
    [
      {
        name: 'date',
        yearBtn: '.picker-year-btn',
        finalPartial: 'DatePartial',
        finalMode: 'date',
      },
      {
        name: 'datetime',
        yearBtn: '.picker-year-btn',
        finalPartial: 'DatetimePartial',
        finalMode: 'date',
        showTime: true,
      },
      {
        name: 'week',
        yearBtn: '.picker-year-btn',
        finalPartial: 'WeekPartial',
        finalMode: 'week',
        picker: 'week',
      },
    ].forEach(
      ({ name, finalMode, yearBtn, finalPartial, picker, showTime }) => {
        it(name, () => {
          const onChange = jest.fn();
          const onPartialChange = jest.fn();
          const wrapper = mount(
            <DayjsPicker
              picker={picker as any}
              showTime={showTime}
              onChange={onChange}
              onPartialChange={onPartialChange}
            />
          );

          wrapper.openPicker();

          function expectPartialChange(dateStr: string, mode: PartialMode) {
            expect(
              isSame(onPartialChange.mock.calls[0][0], dateStr)
            ).toBeTruthy();
            expect(onPartialChange.mock.calls[0][1]).toEqual(mode);
            onPartialChange.mockReset();
          }

          // Year
          onPartialChange.mockReset();
          wrapper.find(yearBtn).simulate('click');
          expectPartialChange('1990-09-03', 'year');

          // Decade
          onPartialChange.mockReset();
          wrapper.find('.picker-decade-btn').simulate('click');
          expectPartialChange('1990-09-03', 'decade');

          // Next page
          wrapper.find('.picker-header-super-next-btn').simulate('click');
          expectPartialChange('2090-09-03', 'decade');

          // Select decade
          wrapper.selectCell('2010-2019');
          expectPartialChange('2010-09-03', 'year');

          // Select year
          wrapper.selectCell('2019');
          expectPartialChange('2019-09-03', 'month');

          // Select month
          wrapper.selectCell('Aug');
          expectPartialChange('2019-08-03', finalMode as any);

          // Select date
          wrapper.selectCell('18');
          expect(onPartialChange).not.toHaveBeenCalled();

          expect(wrapper.find(finalPartial).length).toBeTruthy();

          if (showTime) {
            wrapper.confirmOK();
          }
          wrapper.closePicker();
          expect(isSame(onChange.mock.calls[0][0], '2019-08-18')).toBeTruthy();
        });
      }
    );

    it('date -> year -> date', () => {
      const wrapper = mount(<DayjsPicker />);
      wrapper.openPicker();
      wrapper.find('.picker-year-btn').simulate('click');
      wrapper.selectCell(1990);
      expect(wrapper.find('DatePartial')).toHaveLength(1);
    });

    it('time', () => {
      const onChange = jest.fn();
      const onOk = jest.fn();
      const wrapper = mount(
        <DayjsPicker picker="time" onChange={onChange} onOk={onOk} />
      );
      wrapper.openPicker();

      function selectColumn(colIndex: number, rowIndex: number) {
        wrapper
          .find('ul')
          .at(colIndex)
          .find('li')
          .at(rowIndex)
          .simulate('click');
      }

      selectColumn(0, 13);
      selectColumn(1, 22);
      selectColumn(2, 33);

      expect(onOk).not.toHaveBeenCalled();
      wrapper.confirmOK();
      expect(onOk).toHaveBeenCalled();
      expect(
        isSame(onChange.mock.calls[0][0], '1990-09-03 13:22:33', 'second')
      ).toBeTruthy();
    });
  });

  it('renderExtraFooter', () => {
    const renderExtraFooter = jest.fn((mode) => <div>{mode}</div>);
    const wrapper = mount(
      <DayjsPicker renderExtraFooter={renderExtraFooter} />
    );

    function matchFooter(mode: string) {
      expect(wrapper.find('.picker-footer-extra').text()).toEqual(mode);
      expect(
        renderExtraFooter.mock.calls[renderExtraFooter.mock.calls.length - 1][0]
      ).toEqual(mode);
    }

    // Date
    wrapper.openPicker();
    matchFooter('date');

    // Month
    wrapper.find('.picker-month-btn').simulate('click');
    wrapper.update();
    matchFooter('month');

    // Year
    wrapper.find('.picker-year-btn').simulate('click');
    wrapper.update();
    matchFooter('year');
  });

  describe('showToday', () => {
    it('only works on date', () => {
      const onSelect = jest.fn();
      const wrapper = mount(<DayjsPicker onSelect={onSelect} showToday />);
      wrapper.openPicker();
      wrapper.find('.picker-today-btn').simulate('click');
      expect(isSame(onSelect.mock.calls[0][0], '1990-09-03')).toBeTruthy();
    });

    it('disabled when in disabledDate', () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPicker onSelect={onSelect} disabledDate={() => true} showToday />
      );
      wrapper.openPicker();
      expect(
        wrapper.find('.picker-today-btn').hasClass('picker-today-btn-disabled')
      ).toBeTruthy();
      wrapper.find('.picker-today-btn').simulate('click');
      expect(onSelect).not.toHaveBeenCalled();
    });

    ['decade', 'year', 'quarter', 'month', 'week'].forEach((name) => {
      it(`not works on ${name}`, () => {
        const wrapper = mount(<DayjsPicker picker={name as any} showToday />);
        wrapper.openPicker();
        expect(wrapper.find('.picker-today-btn').length).toBeFalsy();
      });
    });
  });

  it('icon', () => {
    const wrapper = mount(
      <DayjsPicker
        defaultValue={getDayjs('1990-09-03')}
        suffixIcon={<span className="suffix-icon" />}
        clearIcon={<span className="suffix-icon" />}
        allowClear
      />
    );

    expect(wrapper.find('.picker-input').render()).toMatchSnapshot();
  });

  it('inputRender', () => {
    const wrapper = mount(
      <DayjsPicker
        inputRender={(props: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input {...props} />
        )}
      />
    );

    expect(wrapper.find('.picker-input').render()).toMatchSnapshot();
  });

  describe('showNow', () => {
    it('datetime should display now', () => {
      const onSelect = jest.fn();
      const wrapper = mount(<DayjsPicker onSelect={onSelect} showTime />);
      wrapper.openPicker();
      wrapper.find('.picker-now button').simulate('click');

      expect(
        isSame(onSelect.mock.calls[0][0], '1990-09-03 00:00:00', 'second')
      ).toBeTruthy();
    });

    it("date shouldn't display now", () => {
      const onSelect = jest.fn();
      const wrapper = mount(<DayjsPicker onSelect={onSelect} />);
      wrapper.openPicker();
      expect(wrapper.find('.picker-now button').length).toEqual(0);
    });

    it("datetime shouldn't display now when showNow is false", () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPicker onSelect={onSelect} showTime showNow={false} />
      );
      wrapper.openPicker();
      expect(wrapper.find('.picker-now button').length).toEqual(0);
    });

    it('time should display now', () => {
      const onSelect = jest.fn();
      const wrapper = mount(<DayjsPicker onSelect={onSelect} picker="time" />);
      wrapper.openPicker();
      wrapper.find('.picker-now button').simulate('click');

      expect(
        isSame(onSelect.mock.calls[0][0], '1990-09-03 00:00:00', 'second')
      ).toBeTruthy();
    });

    it("time shouldn't display now when showNow is false", () => {
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPicker onSelect={onSelect} picker="time" showNow={false} />
      );
      wrapper.openPicker();
      expect(wrapper.find('.picker-now button').length).toEqual(0);
    });
  });

  describe('time step', () => {
    it('work with now', () => {
      MockDate.set(getDayjs('1990-09-03 00:09:00').toDate());
      const onSelect = jest.fn();
      const wrapper = mount(
        <DayjsPicker onSelect={onSelect} picker="time" minuteStep={10} />
      );
      wrapper.openPicker();
      wrapper.find('.picker-now button').simulate('click');
      expect(
        isSame(onSelect.mock.calls[0][0], '1990-09-03 00:00:59', 'second')
      ).toBeTruthy();
      MockDate.set(getDayjs('1990-09-03 00:00:00').toDate());
    });
  });

  it('pass data- & aria- & role', () => {
    const wrapper = mount(
      <DayjsPicker data-test="233" aria-label="3334" role="search" />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('support name & autoComplete prop', () => {
    const wrapper = mount(<DayjsPicker name="bamboo" autoComplete="off" />);

    expect(wrapper.find('input').props()).toMatchObject({
      name: 'bamboo',
      autoComplete: 'off',
    });
  });

  it('blur should reset invalidate text', () => {
    const wrapper = mount(<DayjsPicker />);
    wrapper.openPicker();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'Invalidate',
      },
    });
    wrapper.closePicker();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('should render correctly in rtl', () => {
    const wrapper = mount(<DayjsPicker direction="rtl" allowClear />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('week picker show correctly with year', () => {
    const wrapper = mount(
      <DayjsPicker value={getDayjs('2019-12-31')} picker="week" />
    );

    expect(wrapper.find('input').prop('value')).toEqual(
      '2019-12-29 to 2020-01-04'
    );
  });

  it('click outside should also focus', () => {
    const onMouseUp = jest.fn();
    const wrapper = mount(<DayjsPicker onMouseUp={onMouseUp} />);
    const inputElement = wrapper
      .find('input')
      .instance() as any as HTMLInputElement;
    inputElement.focus = jest.fn();

    wrapper.find('.picker').simulate('mouseUp');
    expect(inputElement.focus).toHaveBeenCalled();
    expect(wrapper.isOpen()).toBeTruthy();

    expect(onMouseUp).toHaveBeenCalled();
  });

  it('not open when disabled', () => {
    const wrapper = mount(<DayjsPicker disabled />);
    wrapper.find('.picker').simulate('mouseUp');
    expect(wrapper.isOpen()).toBeFalsy();

    wrapper.setProps({ disabled: false });
    expect(wrapper.isOpen()).toBeFalsy();
  });

  it('close to reset', () => {
    const wrapper = mount(
      <DayjsPicker defaultValue={getDayjs('2000-01-01')} />
    );

    wrapper.openPicker();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'aaaaa',
      },
    });
    expect(wrapper.find('input').props().value).toEqual('aaaaa');

    wrapper.closePicker();
    expect(wrapper.find('input').props().value).toEqual('2000-01-01');
  });

  it('switch picker should change format', () => {
    const wrapper = mount(
      <DayjsPicker
        picker="date"
        showTime
        defaultValue={getDayjs('1999-09-03')}
      />
    );
    expect(wrapper.find('input').props().value).toEqual('1999-09-03 00:00:00');

    [
      ['date', '1999-09-03'],
      ['month', '1999-09'],
      ['quarter', '1999-Q3'],
      ['year', '1999'],
    ].forEach(([picker, text]) => {
      wrapper.setProps({ picker, showTime: false });
      wrapper.update();
      expect(wrapper.find('input').props().value).toEqual(text);
    });
  });

  it('id', () => {
    const wrapper = mount(<DayjsPicker id="mia" />);
    expect(wrapper.find('input').props().id).toEqual('mia');
  });

  it('does not display today as active', () => {
    const wrapper = mount(<DayjsPicker open todayActive={false} />);
    expect(wrapper.find('.picker-cell-today').length).toEqual(0);
  });

  it('does not display now button when showTime', () => {
    const wrapper = mount(<DayjsPicker open showTime showNow={false} />);
    expect(wrapper.find('.picker-now').length).toEqual(0);
  });

  it('now button is primary', () => {
    const wrapper = mount(
      <DayjsPicker
        open
        showTime
        nowButtonProps={{ variant: ButtonVariant.Primary }}
      />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('does not display ok button when showTime', () => {
    const wrapper = mount(<DayjsPicker open showTime showOk={false} />);
    expect(wrapper.find('.picker-ok').length).toEqual(0);
  });

  it('ok button is primary', () => {
    const wrapper = mount(
      <DayjsPicker
        open
        showTime
        okButtonProps={{ variant: ButtonVariant.Primary }}
      />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('does not display today button', () => {
    const wrapper = mount(<DayjsPicker open showToday={false} />);
    expect(wrapper.find('.picker-today-btn').length).toEqual(0);
  });

  it('today button is primary', () => {
    const wrapper = mount(
      <DayjsPicker open todayButtonProps={{ variant: ButtonVariant.Primary }} />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('dateRender', () => {
    const wrapper = mount(
      <DayjsPicker
        open
        dateRender={(date: dayjs.Dayjs) => date.format('YYYY-MM-DD')}
      />
    );
    expect(wrapper.find('tbody td').last().text()).toEqual('1990-10-06');
  });

  it('format', () => {
    const wrapper = mount(<DayjsPicker format={['YYYYMMDD', 'YYYY-MM-DD']} />);
    wrapper.openPicker();
    wrapper.find('input').simulate('change', {
      target: {
        value: '2000-01-01',
      },
    });
    wrapper.closePicker();
    expect(wrapper.find('input').prop('value')).toEqual('20000101');
  });

  it('custom format', () => {
    const wrapper = mount(
      <DayjsPicker
        allowClear
        defaultValue={getDayjs('2020-09-17')}
        format={[
          (val: Dayjs) => `custom format:${val.format('YYYYMMDD')}`,
          'YYYY-MM-DD',
        ]}
      />
    );
    expect(wrapper.find('input').prop('readOnly')).toBeTruthy();
    wrapper.openPicker();
    wrapper.selectCell(24);
    wrapper.closePicker();
    expect(wrapper.find('input').prop('value')).toEqual(
      'custom format:20200924'
    );

    // clear
    const clearNode = wrapper.find('.picker-clear');
    expect(clearNode.simulate.bind(clearNode, 'mouseUp')).not.toThrow();
    expect(wrapper.find('input').prop('value')).toEqual('');
  });

  it('partialRender', () => {
    const wrapper = mount(
      <DayjsPicker open partialRender={() => <h1>Light</h1>} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('change partial when `picker` changed', () => {
    const wrapper = mount(<DayjsPicker open picker="week" />);
    expect(wrapper.find('.picker-week-partial').length).toEqual(1);
    wrapper.setProps({ picker: 'month' });
    wrapper.update();
    expect(wrapper.find('.picker-week-partial').length).toEqual(0);
    expect(wrapper.find('.picker-month-partial').length).toEqual(1);
  });

  describe('hover value', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('should restore when leave', () => {
      const wrapper = mount(
        <DayjsPicker open defaultValue={getDayjs('2020-07-22')} />
      );
      const cell = wrapper.findCell(24);
      cell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('2020-07-24');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeTruthy();

      cell.simulate('mouseLeave');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('2020-07-22');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeFalsy();
    });

    it('should restore after selecting cell', () => {
      const wrapper = mount(
        <DayjsPicker defaultValue={getDayjs('2020-07-22')} />
      );
      wrapper.openPicker();
      const cell = wrapper.findCell(24);
      cell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('2020-07-24');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeTruthy();

      wrapper.selectCell(24);
      expect(wrapper.find('input').prop('value')).toBe('2020-07-24');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeFalsy();
    });

    it('change value when hovering', () => {
      const wrapper = mount(
        <DayjsPicker defaultValue={getDayjs('2020-07-22')} />
      );
      wrapper.openPicker();
      const cell = wrapper.findCell(24);
      cell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('2020-07-24');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeTruthy();

      wrapper.find('input').simulate('change', {
        target: {
          value: '2020-07-23',
        },
      });

      expect(wrapper.find('input').prop('value')).toBe('2020-07-23');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeFalsy();

      wrapper.closePicker();
      expect(wrapper.find('input').prop('value')).toBe('2020-07-23');
      expect(
        wrapper.find('.picker-input').hasClass('picker-input-placeholder')
      ).toBeFalsy();
    });
  });

  describe('time picker open to scroll', () => {
    let domMock: ReturnType<typeof spyElementPrototypes>;
    let canBeSeen = false;
    let triggered = false;

    beforeAll(() => {
      domMock = spyElementPrototypes(HTMLElement, {
        offsetParent: {
          get: () => {
            if (canBeSeen) {
              return {};
            }
            canBeSeen = true;
            return null;
          },
        },
        scrollTop: {
          get: () => 0,
          set: () => {
            triggered = true;
          },
        },
      });
    });

    afterAll(() => {
      domMock.mockRestore();
    });

    it('work', () => {
      jest.useFakeTimers();
      const wrapper = mount(
        <DayjsPicker
          picker="time"
          defaultValue={getDayjs('2020-07-22 09:03:28')}
          open
        />
      );
      jest.runAllTimers();

      expect(triggered).toBeTruthy();

      jest.useRealTimers();
      wrapper.unmount();
    });
  });

  describe('prevent default on keydown', () => {
    it('should open picker partial if no prevent default', () => {
      const keyDown = jest.fn();
      const wrapper = mount(<DayjsPicker onKeyDown={keyDown} />);

      wrapper.closePicker();
      wrapper.keyDown(eventKeys.ENTER);
      expect(wrapper.isOpen()).toBeTruthy();
    });

    it('should not open if prevent default is called', () => {
      const keyDown = jest.fn(({ key }, preventDefault) => {
        if (key === eventKeys.ENTER) preventDefault();
      });
      const wrapper = mount(<DayjsPicker onKeyDown={keyDown} />);

      wrapper.openPicker();
      expect(wrapper.isOpen()).toBeTruthy();

      wrapper.keyDown(eventKeys.ESCAPE);
      expect(wrapper.isClosed()).toBeTruthy();

      wrapper.keyDown(eventKeys.ENTER);
      expect(wrapper.isClosed()).toBeTruthy();
    });
  });

  describe('disabledDate', () => {
    function disabledDate(current: Dayjs) {
      return current <= getDayjs('2020-12-28 00:00:00').endOf('day');
    }
    const wrapper = mount(
      <DayjsPicker
        open
        defaultValue={getDayjs('2020-12-29 12:00:00')}
        disabledDate={disabledDate}
      />
    );
    // Date Partial
    Array.from({
      length: 31,
    }).forEach((_v, i) => {
      const cell = wrapper.findCell(`${i + 1}`);
      // >= 29
      if (i >= 28) {
        expect(cell.hasClass('picker-cell-disabled')).toBeFalsy();
      } else {
        expect(cell.hasClass('picker-cell-disabled')).toBeTruthy();
      }
    });
    wrapper.find('.picker-month-btn').simulate('click');
    // Month Partial
    Array.from({
      length: 12,
    }).forEach((_v, i) => {
      const cell = wrapper.find('.picker-cell-in-view').at(i);
      // >= 12
      if (i >= 11) {
        expect(cell.hasClass('picker-cell-disabled')).toBeFalsy();
      } else {
        expect(cell.hasClass('picker-cell-disabled')).toBeTruthy();
      }
    });
    wrapper.find('.picker-year-btn').simulate('click');
    // Year Partial
    Array.from({
      length: 10,
    }).forEach((_v, i) => {
      const cell = wrapper.find('.picker-cell-in-view').at(i);
      // >= 2020
      expect(cell.hasClass('picker-cell-disabled')).toBeFalsy();
    });
    // Decade Partial
    Array.from({
      length: 8,
    }).forEach((_v, i) => {
      const cell = wrapper.find('.picker-cell-in-view').at(i);
      // >= 2020
      expect(cell.hasClass('picker-cell-disabled')).toBeFalsy();
    });

    const quarterWrapper = mount(
      <DayjsPicker
        picker="quarter"
        open
        defaultValue={getDayjs('2020-12-29 12:00:00')}
        disabledDate={disabledDate}
      />
    );
    // quarter Partial
    Array.from({
      length: 4,
    }).forEach((_v, i) => {
      const cell = quarterWrapper.find('.picker-cell-in-view').at(i);
      // >= 4
      if (i >= 3) {
        expect(cell.hasClass('picker-cell-disabled')).toBeFalsy();
      } else {
        expect(cell.hasClass('picker-cell-disabled')).toBeTruthy();
      }
    });
  });

  it('disabledDate should not crash', () => {
    const wrapper = mount(
      <DayjsPicker
        open
        disabledDate={(date: dayjs.Dayjs) => date.isAfter(Date.now())}
      />
    );
    wrapper.find('input').simulate('change', {
      target: { value: dayjs().add(1, 'year').format('YYYY-MM-DD') },
    });

    wrapper.find('input').simulate('keyDown', { key: eventKeys.ENTER });
  });
});
