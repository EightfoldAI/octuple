import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
import { eventKeys } from '../../../../shared/utilities';
import { spyElementPrototypes } from '../../../../tests/domHook';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Wrapper } from './util/commonUtil';
import {
  closePicker,
  DayjsRangePicker,
  getDayjs,
  isSame,
  mount,
  openPicker,
  selectCell,
} from './util/commonUtil';
import enUS from '../Locale/en_US';
import type { OcPickerMode } from '../OcPicker.types';
import { ButtonVariant } from '../../../Button';
import { createEvent, fireEvent, render } from '@testing-library/react';

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

describe('Picker.Range', () => {
  function matchValues(wrapper: Wrapper, value1: string, value2: string) {
    expect(wrapper.find('input').first().props().value).toEqual(value1);
    expect(wrapper.find('input').last().props().value).toEqual(value2);
  }

  beforeEach(() => {
    MockDate.set(getDayjs('1990-09-03 00:00:00').toDate());

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

  afterEach(() => {
    MockDate.reset();
  });

  describe('value', () => {
    it('defaultValue', () => {
      const wrapper = mount(
        <DayjsRangePicker
          defaultValue={[getDayjs('1989-11-28'), getDayjs('1990-09-03')]}
        />
      );

      matchValues(wrapper, '1989-11-28', '1990-09-03');
    });

    it('controlled', () => {
      const wrapper = mount(
        <DayjsRangePicker
          value={[getDayjs('1989-11-28'), getDayjs('1990-09-03')]}
        />
      );

      matchValues(wrapper, '1989-11-28', '1990-09-03');

      // Update
      wrapper.setProps({
        value: [getDayjs('2000-01-01'), getDayjs('2011-12-12')],
      });
      wrapper.update();
      matchValues(wrapper, '2000-01-01', '2011-12-12');
    });

    it('uncontrolled', () => {
      const onChange = jest.fn();
      const onCalendarChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          onChange={onChange}
          onCalendarChange={onCalendarChange}
        />
      );

      // Start date
      wrapper.openPicker();
      expect(onChange).not.toHaveBeenCalled();

      wrapper.selectCell(13);
      expect(onChange).not.toHaveBeenCalled();

      expect(
        isSame(onCalendarChange.mock.calls[0][0][0], '1990-09-13')
      ).toBeTruthy();
      expect(onCalendarChange.mock.calls[0][0][1]).toBeFalsy();
      expect(onCalendarChange.mock.calls[0][1]).toEqual(['1990-09-13', '']);

      // End date
      onCalendarChange.mockReset();
      wrapper.selectCell(14);

      expect(isSame(onChange.mock.calls[0][0][0], '1990-09-13')).toBeTruthy();
      expect(isSame(onChange.mock.calls[0][0][1], '1990-09-14')).toBeTruthy();
      expect(onChange.mock.calls[0][1]).toEqual(['1990-09-13', '1990-09-14']);

      expect(
        isSame(onCalendarChange.mock.calls[0][0][0], '1990-09-13')
      ).toBeTruthy();
      expect(
        isSame(onCalendarChange.mock.calls[0][0][1], '1990-09-14')
      ).toBeTruthy();
      expect(onCalendarChange.mock.calls[0][1]).toEqual([
        '1990-09-13',
        '1990-09-14',
      ]);
    });
  });

  it('exchanged value should re-order', () => {
    const wrapper = mount(
      <DayjsRangePicker
        defaultValue={[getDayjs('1990-09-03'), getDayjs('1989-11-28')]}
      />
    );
    wrapper.update();

    matchValues(wrapper, '1989-11-28', '1990-09-03');
  });

  describe('view is closed', () => {
    it('year', () => {
      const wrapper = mount(<DayjsRangePicker picker="year" />);
      wrapper.openPicker();
      expect(wrapper.exists('.picker-footer')).toBeFalsy();
      expect(wrapper.find('.picker-header-view').first().text()).toEqual(
        '1990-1999'
      );
      expect(wrapper.find('.picker-header-view').last().text()).toEqual(
        '2000-2009'
      );
    });

    it('year with footer', () => {
      const wrapper = mount(
        <DayjsRangePicker
          renderExtraFooter={() => <p>footer</p>}
          picker="year"
        />
      );
      wrapper.openPicker();
      expect(wrapper.find('.picker-footer-extra').text()).toEqual('footer');
      expect(wrapper.find('.picker-header-view').first().text()).toEqual(
        '1990-1999'
      );
      expect(wrapper.find('.picker-header-view').last().text()).toEqual(
        '2000-2009'
      );
    });
  });

  it('endDate can not click before startDate', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <DayjsRangePicker
        onChange={onChange}
        disabledDate={(date: dayjs.Dayjs) => date.date() === 28}
        allowClear
      />
    );

    let cellNode: Wrapper;

    // Start date
    wrapper.openPicker();
    wrapper.selectCell(23);

    // End date
    cellNode = wrapper.selectCell(11);
    expect(cellNode.hasClass('picker-cell-disabled')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    // Click origin disabled date
    cellNode = wrapper.selectCell(28);
    expect(cellNode.hasClass('picker-cell-disabled')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('week picker can not click before start week', () => {
    const wrapper = mount(<DayjsRangePicker picker="week" locale={enUS} />);
    wrapper.openPicker();
    wrapper.selectCell(11);

    expect(wrapper.findCell(4).hasClass('picker-cell-disabled')).toBeTruthy();
    expect(wrapper.findCell(11).hasClass('picker-cell-disabled')).toBeFalsy();
  });

  describe('Can not select when start or end first selected', () => {
    it('select end', () => {
      const wrapper = mount(<DayjsRangePicker />);

      wrapper.openPicker(1);
      wrapper.selectCell(7);

      expect(
        wrapper.findCell(23).hasClass('picker-cell-disabled')
      ).toBeTruthy();
    });

    it('select start', () => {
      const wrapper = mount(<DayjsRangePicker picker="quarter" />);

      wrapper.openPicker(0);
      wrapper.selectCell('Q3');

      expect(
        wrapper.findCell('Q1').hasClass('picker-cell-disabled')
      ).toBeTruthy();
    });

    it('select end', () => {
      const wrapper = mount(<DayjsRangePicker picker="month" />);

      wrapper.openPicker(1);
      wrapper.selectCell('May');

      expect(
        wrapper.findCell('Dec').hasClass('picker-cell-disabled')
      ).toBeTruthy();
    });

    it('disabled start', () => {
      const wrapper = mount(
        <DayjsRangePicker
          disabled={[true, false]}
          defaultValue={[getDayjs('1990-01-15'), getDayjs('1990-02-15')]}
        />
      );

      wrapper.openPicker(1);
      expect(
        wrapper.findCell(14).hasClass('picker-cell-disabled')
      ).toBeTruthy();
    });
  });

  it('allowEmpty', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DayjsRangePicker
        onChange={onChange}
        allowEmpty={[false, true]}
        allowClear
      />
    );

    wrapper.openPicker();
    wrapper.selectCell(11);
    expect(onChange).toHaveBeenCalledWith(
      [expect.anything(), null],
      ['1990-09-11', '']
    );

    wrapper.clearValue();
    onChange.mockReset();

    // Not allow empty with startDate
    wrapper.openPicker(1);
    wrapper.selectCell(23);
    wrapper.closePicker(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  describe('disabled', () => {
    it('basic disabled check', () => {
      const wrapper = mount(<DayjsRangePicker disabled={[true, false]} />);
      expect(wrapper.find('input').at(0).props().disabled).toBeTruthy();
      expect(wrapper.find('input').at(1).props().disabled).toBeFalsy();
    });

    it('startDate will have disabledDate when endDate is not selectable', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          disabled={[false, true]}
          defaultValue={[null, getDayjs('1990-09-22')]}
          onChange={onChange}
        />
      );

      let cellNode: Wrapper;

      // Disabled date
      wrapper.openPicker();
      cellNode = wrapper.selectCell(25);
      expect(cellNode.hasClass('picker-cell-disabled')).toBeTruthy();
      expect(onChange).not.toHaveBeenCalled();

      // Enabled date
      wrapper.openPicker();
      cellNode = wrapper.selectCell(7);
      expect(cellNode.hasClass('picker-cell-disabled')).toBeFalsy();
      expect(onChange).toHaveBeenCalledWith(
        [expect.anything(), expect.anything()],
        ['1990-09-07', '1990-09-22']
      );
    });

    // TODO: Re-enable this test when null value pattern is established.
    it.skip('null value with disabled', () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mount(<DayjsRangePicker disabled={[false, true]} value={[null, null]} />);

      expect(errSpy).toHaveBeenCalledWith(
        'Warning: `disabled` should not set with empty `value`. You should set `allowEmpty` or `value` instead.'
      );
      errSpy.mockReset();
    });

    it('clear should trigger change', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          disabled={[false, true]}
          defaultValue={[getDayjs('1990-01-01'), getDayjs('2000-11-11')]}
          onChange={onChange}
          allowClear
        />
      );

      wrapper.openPicker();
      wrapper.clearValue();
      expect(wrapper.isClosed()).toBeTruthy();
      expect(onChange.mock.calls[0][1]).toEqual(['', '2000-11-11']);
    });

    it('not fill when all disabled and no value', () => {
      const wrapper = mount(<DayjsRangePicker disabled />);
      expect(wrapper.find('input').first().props().value).toEqual('');
      expect(wrapper.find('input').last().props().value).toEqual('');
    });
  });

  describe('readonly', () => {
    it('basic readonly check', () => {
      const wrapper = mount(<DayjsRangePicker readonly={[true, false]} />);
      expect(wrapper.find('input').at(0).props().readOnly).toBeTruthy();
      expect(wrapper.find('input').at(1).props().readOnly).toBeFalsy();
    });

    it('startDate will have disabledDate when endDate is not selectable', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          readonly={[false, true]}
          defaultValue={[null, getDayjs('1990-09-22')]}
          onChange={onChange}
        />
      );

      let cellNode: Wrapper;

      // Disabled date
      wrapper.openPicker();
      cellNode = wrapper.selectCell(25);
      expect(cellNode.hasClass('picker-cell-disabled')).toBeTruthy();
      expect(onChange).not.toHaveBeenCalled();

      // Enabled date
      wrapper.openPicker();
      cellNode = wrapper.selectCell(7);
      expect(cellNode.hasClass('picker-cell-disabled')).toBeFalsy();
      expect(onChange).toHaveBeenCalledWith(
        [expect.anything(), expect.anything()],
        ['1990-09-07', '1990-09-22']
      );
    });

    it('clear should trigger change', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          readonly={[false, true]}
          defaultValue={[getDayjs('1990-01-01'), getDayjs('2000-11-11')]}
          onChange={onChange}
          allowClear
        />
      );

      wrapper.openPicker();
      wrapper.clearValue();
      expect(wrapper.isClosed()).toBeTruthy();
      expect(onChange.mock.calls[0][1]).toEqual(['', '2000-11-11']);
    });

    it('not fill when all readonly and no value', () => {
      const wrapper = mount(<DayjsRangePicker readonly />);
      expect(wrapper.find('input').first().props().value).toEqual('');
      expect(wrapper.find('input').last().props().value).toEqual('');
    });
  });

  describe('ranges', () => {
    it('hover className', () => {
      const wrapper = mount(
        <DayjsRangePicker
          ranges={{
            now: [getDayjs('1990-09-11'), getDayjs('1990-09-13')],
          }}
        />
      );

      wrapper.openPicker();
      wrapper.find('.picker-preset > *').simulate('mouseEnter');
      expect(
        wrapper.findCell(11).hasClass('picker-cell-range-start')
      ).toBeTruthy();
      expect(
        wrapper.findCell(12).hasClass('picker-cell-in-range')
      ).toBeTruthy();
      expect(
        wrapper.findCell(13).hasClass('picker-cell-range-end')
      ).toBeTruthy();

      wrapper.find('.picker-preset > *').simulate('mouseLeave');
      expect(
        wrapper.findCell(11).hasClass('picker-cell-range-start')
      ).toBeFalsy();
      expect(wrapper.findCell(12).hasClass('picker-cell-in-range')).toBeFalsy();
      expect(
        wrapper.findCell(13).hasClass('picker-cell-range-end')
      ).toBeFalsy();
    });
  });

  it('placeholder', () => {
    const wrapper = mount(<DayjsRangePicker placeholder={['mia', 'lola']} />);
    expect(wrapper.find('input').first().props().placeholder).toEqual('mia');
    expect(wrapper.find('input').last().props().placeholder).toEqual('lola');
  });

  describe('defaultPickerValue', () => {
    it('defaultPickerValue with showTime', () => {
      const startDate = getDayjs('1982-02-12');
      const endDate = getDayjs('1982-02-12');

      const wrapper = mount(
        <DayjsRangePicker defaultPickerValue={[startDate, endDate]} showTime />
      );
      wrapper.openPicker();
      expect(wrapper.find('.picker-year-btn').first().text()).toEqual(
        startDate.format('YYYY')
      );
    });

    it('defaultPickerValue with showTime should works when open partial', () => {
      const startDate = getDayjs('1982-02-12');
      const endDate = getDayjs('1982-02-12');

      const wrapper = mount(
        <DayjsRangePicker
          defaultValue={[startDate, endDate]}
          defaultPickerValue={[startDate, endDate]}
          showTime
        />
      );
      expect(() => {
        wrapper.openPicker();
      }).not.toThrow();
      expect(wrapper.find('.picker-year-btn').first().text()).toEqual(
        startDate.format('YYYY')
      );
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
      const ref = React.createRef<DayjsRangePicker>();
      mount(
        <div>
          <DayjsRangePicker ref={ref} />
        </div>
      );

      ref.current!.rangePickerRef.current!.focus();
      expect(focused).toBeTruthy();

      ref.current!.rangePickerRef.current!.blur();
      expect(blurred).toBeTruthy();
    });

    it('not crash with showTime defaultValue', () => {
      const wrapper = mount(
        <DayjsRangePicker
          showTime={{
            defaultValue: [getDayjs('01:02:03'), getDayjs('05:06:07')],
          }}
        />
      );

      wrapper.openPicker();
      wrapper.selectCell(13);
      wrapper.find('.picker-ok button').simulate('click');
      wrapper.selectCell(23);

      matchValues(wrapper, '1990-09-13 01:02:03', '1990-09-23 05:06:07');
    });
  });

  it('mode is array', () => {
    const wrapper = mount(<DayjsRangePicker mode={['year', 'month']} />);
    wrapper.openPicker();
    expect(wrapper.find('.picker-year-partial')).toHaveLength(1);

    wrapper.openPicker(1);
    expect(wrapper.find('.picker-month-partial')).toHaveLength(1);
  });

  describe('onPartialChange is array args', () => {
    it('mode', () => {
      const onPartialChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker
          mode={['month', 'year']}
          onPartialChange={onPartialChange}
        />
      );

      wrapper.openPicker();
      wrapper.selectCell('Feb');
      expect(isSame(onPartialChange.mock.calls[0][0][0], '1990-02-03'));
      expect(onPartialChange.mock.calls[0][1]).toEqual(['date', 'year']);

      wrapper.closePicker();
      onPartialChange.mockReset();

      wrapper.openPicker(1);
      wrapper.selectCell(1993);
      expect(isSame(onPartialChange.mock.calls[0][0][1], '1993-02-03'));
      expect(onPartialChange.mock.calls[0][1]).toEqual(['month', 'month']);
    });

    it('picker', () => {
      const onPartialChange = jest.fn();
      const wrapper = mount(
        <DayjsRangePicker picker="month" onPartialChange={onPartialChange} />
      );

      // First go to year partial
      wrapper.openPicker();
      wrapper.find('.picker-year-btn').first().simulate('click');
      expect(isSame(onPartialChange.mock.calls[0][0][0], '1990-09-03'));
      expect(onPartialChange.mock.calls[0][1]).toEqual(['year', 'month']);

      // First nack to month partial
      onPartialChange.mockReset();
      wrapper.selectCell(1993);
      expect(onPartialChange).toHaveBeenCalled();
      expect(isSame(onPartialChange.mock.calls[0][0][0], '1993-09-03'));
      expect(onPartialChange.mock.calls[0][1]).toEqual(['month', 'month']);

      // Last go to year partial
      wrapper.closePicker();
      wrapper.openPicker(1);
      wrapper.find('.picker-year-btn').first().simulate('click');
      onPartialChange.mockReset();

      // Last nack to month partial
      wrapper.selectCell(1998);
      expect(isSame(onPartialChange.mock.calls[0][0][1], '1998-09-03'));
      expect(onPartialChange.mock.calls[0][1]).toEqual(['month', 'month']);
    });

    it('should render correctly in rtl', () => {
      const wrapper = mount(<DayjsRangePicker direction="rtl" />);
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('type can not change before start time', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DayjsRangePicker
        defaultValue={[getDayjs('2000-01-15'), getDayjs('2000-01-16')]}
        onChange={onChange}
      />
    );

    wrapper
      .find('input')
      .last()
      .simulate('change', {
        target: {
          value: '2000-01-11',
        },
      });
    wrapper.find('input').last().simulate('keyDown', {
      key: eventKeys.ENTER,
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should open last when first selected', () => {
    jest.useFakeTimers();
    const onOpenChange = jest.fn();
    const wrapper = mount(<DayjsRangePicker onOpenChange={onOpenChange} />);
    expect(wrapper.find('PickerPartial')).toHaveLength(0);

    wrapper.openPicker();
    expect(
      wrapper.find('.picker-input').first().hasClass('picker-input-active')
    ).toBeTruthy();

    // Select to active next
    wrapper.selectCell(11);
    jest.runAllTimers();
    expect(
      wrapper.find('.picker-input').last().hasClass('picker-input-active')
    ).toBeTruthy();

    wrapper.unmount();

    jest.useRealTimers();
  });

  describe('hover className', () => {
    [
      { picker: 'year', start: 1990, end: 1997, mid: 1991 },
      { picker: 'month', start: 'Feb', end: 'Oct', mid: 'May' },
      { picker: 'date', start: 11, end: 22, mid: 15 },
    ].forEach(({ picker, start, end, mid }) => {
      it('year', () => {
        const wrapper = mount(<DayjsRangePicker picker={picker as any} />);
        wrapper.openPicker();
        wrapper.selectCell(start);

        // Hover it
        wrapper.findCell(end).simulate('mouseEnter');

        expect(
          wrapper.findCell(start).hasClass('picker-cell-range-hover-start')
        ).toBeTruthy();
        expect(
          wrapper.findCell(mid).hasClass('picker-cell-range-hover')
        ).toBeTruthy();
        expect(
          wrapper.findCell(end).hasClass('picker-cell-range-hover-end')
        ).toBeTruthy();

        // Leave
        wrapper.findCell(end).simulate('mouseLeave');
        expect(
          wrapper.findCell(start).hasClass('picker-cell-range-hover-start')
        ).toBeFalsy();
        expect(
          wrapper.findCell(mid).hasClass('picker-cell-range-hover')
        ).toBeFalsy();
        expect(
          wrapper.findCell(end).hasClass('picker-cell-range-hover-end')
        ).toBeFalsy();
      });
    });

    it('range edge className', () => {
      const wrapper = mount(
        <DayjsRangePicker
          value={[getDayjs('2019-12-20'), getDayjs('2019-12-20')]}
        />
      );

      // End edge
      wrapper.openPicker();
      wrapper.findCell(10).simulate('mouseEnter');
      expect(
        wrapper.findCell(19).hasClass('picker-cell-range-hover-edge-end')
      ).toBeTruthy();
      expect(
        wrapper.findCell(20).hasClass('picker-cell-range-start-near-hover')
      ).toBeTruthy();
      wrapper.findCell(10).simulate('mouseOut');

      // Start edge
      wrapper.openPicker(1);
      wrapper.findCell(28).simulate('mouseEnter');
      expect(
        wrapper.findCell(21).hasClass('picker-cell-range-hover-edge-start')
      ).toBeTruthy();
      expect(
        wrapper.findCell(20).hasClass('picker-cell-range-end-near-hover')
      ).toBeTruthy();
      wrapper.findCell(28).simulate('mouseOut');
    });
  });

  it('should close when user focus out', () => {
    const wrapper = mount(<DayjsRangePicker />);
    wrapper.openPicker();
    wrapper.selectCell(11);
    expect(wrapper.isOpen()).toBeTruthy();

    wrapper.find('input').last().simulate('blur');
    expect(wrapper.isClosed()).toBeTruthy();
  });

  it('icon', () => {
    const wrapper = mount(
      <DayjsRangePicker
        defaultValue={[getDayjs('1990-09-03'), getDayjs('1990-09-03')]}
        suffixIcon={<span className="suffix-icon" />}
        clearIcon={<span className="suffix-icon" />}
        allowClear
      />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('block native mouseDown in partial to prevent focus changed', () => {
    const wrapper = mount(<DayjsRangePicker />);
    wrapper.openPicker();

    const preventDefault = jest.fn();
    wrapper.find('td').first().simulate('mouseDown', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });

  describe('arrow position', () => {
    let domMock: ReturnType<typeof spyElementPrototypes>;

    beforeAll(() => {
      domMock = spyElementPrototypes(HTMLElement, {
        offsetWidth: {
          get: () => 100,
        },
      });
    });

    afterAll(() => {
      domMock.mockRestore();
    });

    it('end date arrow should not move partial left', () => {
      const wrapper = mount(<DayjsRangePicker />);
      wrapper.openPicker(1);
      wrapper.update();
      expect(
        (wrapper.find('.picker-partial-container').props() as any).style
          .marginLeft
      ).toEqual(0);
    });
  });

  it('focus to next input not to onOpenChange', () => {
    jest.useFakeTimers();

    const onOpenChange = jest.fn();
    const wrapper = mount(<DayjsRangePicker onOpenChange={onOpenChange} />);
    wrapper.openPicker();
    onOpenChange.mockReset();

    const clickEvent = new Event('mousedown');
    Object.defineProperty(clickEvent, 'target', {
      get: () => wrapper.find('input').last().instance(),
    });
    act(() => {
      window.dispatchEvent(clickEvent);
      wrapper.find('input').first().simulate('blur');
      wrapper.find('input').last().simulate('focus');
      jest.runAllTimers();
    });

    expect(onOpenChange).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('fixed open need repeat trigger onOpenChange', () => {
    jest.useFakeTimers();
    const onOpenChange = jest.fn();
    const wrapper = mount(
      <DayjsRangePicker onOpenChange={onOpenChange} open />
    );

    for (let i = 0; i < 10; i += 1) {
      const clickEvent = new Event('mousedown');
      Object.defineProperty(clickEvent, 'target', {
        get: () => document.body,
      });

      const current = onOpenChange.mock.calls.length;
      act(() => {
        window.dispatchEvent(clickEvent);
        wrapper.find('input').first().simulate('blur');
      });
      const next = onOpenChange.mock.calls.length;

      // Maybe not good since onOpenChange trigger twice
      expect(current < next).toBeTruthy();
    }
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('datetime display ok button', () => {
    const onCalendarChange = jest.fn();
    const onOk = jest.fn();
    const wrapper = mount(
      <DayjsRangePicker
        showTime
        onCalendarChange={onCalendarChange}
        onOk={onOk}
      />
    );
    wrapper.openPicker();

    // Not trigger when not value
    expect(wrapper.find('.picker-ok button').props().disabled).toBeTruthy();
    expect(onCalendarChange).not.toHaveBeenCalled();

    // Trigger when start Ok'd
    onCalendarChange.mockReset();
    wrapper.selectCell(11);
    expect(onCalendarChange).not.toHaveBeenCalled();
    wrapper.find('.picker-ok button').simulate('click');
    expect(onCalendarChange).toHaveBeenCalledWith(
      [expect.anything(), null],
      ['1990-09-11 00:00:00', ''],
      { range: 'start' }
    );
    expect(onOk).toHaveBeenCalled();

    // Trigger when end Ok'd
    onCalendarChange.mockReset();
    wrapper.selectCell(23);
    expect(onCalendarChange).not.toHaveBeenCalled();
    wrapper.find('.picker-ok button').simulate('click');
    expect(onCalendarChange).toHaveBeenCalledWith(
      [expect.anything(), expect.anything()],
      ['1990-09-11 00:00:00', '1990-09-23 00:00:00'],
      { range: 'end' }
    );
    expect(onOk).toHaveBeenCalled();
  });

  it('datetime will reset by blur', () => {
    jest.useFakeTimers();

    const { container } = render(
      <DayjsRangePicker showTime changeOnBlur={false} />
    );
    openPicker(container);
    selectCell(11);
    closePicker(container);
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.trigger-popup')).toBeTruthy();
    expect(document.querySelector('input').value).toEqual('');

    jest.useRealTimers();
  });

  describe('viewDate', () => {
    function matchTitle(wrapper: Wrapper, title: string) {
      expect(wrapper.find('.picker-header-view').first().text()).toEqual(title);
    }

    [
      {
        picker: 'year',
        // Default picker value
        defaultPickerValue: [getDayjs('1990-09-03'), getDayjs('2000-11-28')],
        defaultPickerValueTitle: ['1990-1999', '2000-2009'],
        // Closing value
        closingValue: [getDayjs('1989-09-03'), getDayjs('1990-11-28')],
        closingValueTitle: '1980-1989',
        // Far away value
        farValue: [getDayjs('1989-09-03'), getDayjs('2090-11-28')],
        farValueTitle: ['1980-1989', '2080-2089'],
      },
      {
        picker: 'month',
        // Default picker value
        defaultPickerValue: [getDayjs('1990-09-03'), getDayjs('2000-11-28')],
        defaultPickerValueTitle: ['1990', '2000'],
        // Closing value
        closingValue: [getDayjs('1989-09-03'), getDayjs('1989-10-11')],
        closingValueTitle: '1989',
        // Far away value
        farValue: [getDayjs('1989-09-03'), getDayjs('2000-10-11')],
        farValueTitle: ['1989', '1999'],
      },
      {
        picker: 'date',
        // Default picker value
        defaultPickerValue: [getDayjs('1990-09-03'), getDayjs('2000-11-28')],
        defaultPickerValueTitle: ['Sep1990', 'Nov2000'],
        // Closing value
        closingValue: [getDayjs('1989-09-03'), getDayjs('1989-10-11')],
        closingValueTitle: 'Sep1989',
        // Far away value
        farValue: [getDayjs('1989-09-03'), getDayjs('2000-10-11')],
        farValueTitle: ['Sep1989', 'Sep2000'],
      },
    ].forEach(
      ({
        picker,
        defaultPickerValue,
        defaultPickerValueTitle,
        closingValue,
        closingValueTitle,
        farValue,
        farValueTitle,
      }) => {
        describe(picker, () => {
          it('defaultPickerValue', () => {
            const wrapper = mount(
              <DayjsRangePicker
                picker={picker as any}
                defaultPickerValue={defaultPickerValue as any}
              />
            );

            wrapper.openPicker();
            matchTitle(wrapper, defaultPickerValueTitle[0]);
            wrapper.openPicker(1);
            matchTitle(wrapper, defaultPickerValueTitle[1]);
          });

          it('with closing value', () => {
            const wrapper = mount(
              <DayjsRangePicker
                picker={picker as any}
                value={closingValue as any}
              />
            );

            wrapper.openPicker();
            matchTitle(wrapper, closingValueTitle);
            wrapper.openPicker(1);
            matchTitle(wrapper, closingValueTitle);
          });

          it('with far value', () => {
            const wrapper = mount(
              <DayjsRangePicker
                picker={picker as any}
                value={farValue as any}
              />
            );

            wrapper.openPicker();
            matchTitle(wrapper, farValueTitle[0]);
            wrapper.openPicker(1);
            matchTitle(wrapper, farValueTitle[1]);
          });

          it('no end date', () => {
            const wrapper = mount(
              <DayjsRangePicker
                picker={picker as any}
                value={[closingValue[0], null]}
              />
            );

            wrapper.openPicker();
            matchTitle(wrapper, farValueTitle[0]);
            wrapper.openPicker(1);
            matchTitle(wrapper, farValueTitle[0]);
          });
        });
      }
    );

    it('click switch 1 offset', () => {
      const wrapper = mount(<DayjsRangePicker />);
      wrapper.openPicker();
      expect(wrapper.find('.picker-header-view').first().text()).toEqual(
        'Sep1990'
      );
      wrapper.find('.picker-header-next-btn').last().simulate('click');
      expect(wrapper.find('.picker-header-view').first().text()).toEqual(
        'Oct1990'
      );
    });
  });

  it('change picker should reset mode', () => {
    const wrapper = mount(<DayjsRangePicker picker="date" />);
    wrapper.openPicker();
    expect(wrapper.find('DatePartial').length).toBeTruthy();

    wrapper.setProps({ picker: 'month' });
    wrapper.update();
    expect(wrapper.find('DatePartial').length).toBeFalsy();
    expect(wrapper.find('MonthPartial').length).toBeTruthy();
  });

  describe('reorder onChange logic', () => {
    it('datetime should reorder in onChange if start is after end in same date', () => {
      const onChange = jest.fn();

      const wrapper = mount(<DayjsRangePicker onChange={onChange} showTime />);
      wrapper.openPicker();
      wrapper.selectCell(15);
      wrapper.find('ul').first().find('li').last().simulate('click');
      wrapper.find('.picker-ok button').simulate('click');

      wrapper.selectCell(15);
      wrapper.find('ul').first().find('li').first().simulate('click');
      wrapper.find('.picker-ok button').simulate('click');

      expect(onChange).toHaveBeenCalledWith(expect.anything(), [
        '1990-09-15 00:00:00',
        '1990-09-15 23:00:00',
      ]);

      expect(
        isSame(onChange.mock.calls[0][0][0], '1990-09-15 00:00:00')
      ).toBeTruthy();
      expect(
        isSame(onChange.mock.calls[0][0][1], '1990-09-15 23:00:00')
      ).toBeTruthy();
    });

    function testOrderOnTime(order: boolean, start: string, end: string) {
      it(`order: ${String(order)} when picker is time`, () => {
        const onChange = jest.fn();

        const wrapper = mount(
          <DayjsRangePicker onChange={onChange} picker="time" order={order} />
        );
        wrapper.openPicker();
        wrapper.find('ul').first().find('li').last().simulate('click');
        wrapper.find('.picker-ok button').simulate('click');

        wrapper.find('ul').first().find('li').at(2).simulate('click');
        wrapper.find('.picker-ok button').simulate('click');

        expect(onChange).toHaveBeenCalledWith(expect.anything(), [start, end]);

        expect(isSame(onChange.mock.calls[0][0][0], start)).toBeTruthy();
        expect(isSame(onChange.mock.calls[0][0][1], end)).toBeTruthy();
      });
    }

    testOrderOnTime(false, '23:00:00', '02:00:00');
    testOrderOnTime(true, '02:00:00', '23:00:00');
  });

  it('id', () => {
    const wrapper = mount(<DayjsRangePicker id="lola" />);
    expect(wrapper.find('input').first().props().id).toEqual('lola');
  });

  it('does not display today as active', () => {
    const wrapper = mount(<DayjsRangePicker open todayActive={false} />);
    expect(wrapper.find('.picker-cell-today').length).toEqual(0);
  });

  it('does not display now button when showTime', () => {
    const wrapper = mount(<DayjsRangePicker open showTime showNow={false} />);
    expect(wrapper.find('.picker-now').length).toEqual(0);
  });

  it('now button is primary', () => {
    const wrapper = mount(
      <DayjsRangePicker
        open
        showTime
        nowButtonProps={{ variant: ButtonVariant.Primary }}
      />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('does not display ok button when showTime', () => {
    const wrapper = mount(<DayjsRangePicker open showTime showOk={false} />);
    expect(wrapper.find('.picker-ok').length).toEqual(0);
  });

  it('ok button is primary', () => {
    const wrapper = mount(
      <DayjsRangePicker
        open
        showTime
        okButtonProps={{ variant: ButtonVariant.Primary }}
      />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('does not display today button', () => {
    const wrapper = mount(<DayjsRangePicker open />);
    expect(wrapper.find('.picker-today-btn').length).toEqual(0);
  });

  it('today button is primary', () => {
    const wrapper = mount(
      <DayjsRangePicker
        open
        showToday
        todayButtonProps={{ variant: ButtonVariant.Primary }}
      />
    );
    expect(wrapper.find('.button-primary')).toBeTruthy();
  });

  it('dateRender', () => {
    let range = 'start';

    const wrapper = mount(
      <DayjsRangePicker
        open
        dateRender={(date, _, info) => {
          expect(info.range).toEqual(range);
          return date.format('YYYY-MM-DD');
        }}
      />
    );
    expect(wrapper.find('tbody td').last().text()).toEqual('1990-11-10');

    range = 'end';
    wrapper.openPicker(1);
  });

  it('should not jump back to current date after select', () => {
    const wrapper = mount(<DayjsRangePicker />);
    wrapper.openPicker();
    wrapper.clickButton('super-prev');
    wrapper.selectCell(3);
    wrapper.selectCell(4);
    matchValues(wrapper, '1989-09-03', '1989-09-04');
  });

  describe('can select endDate when in same level', () => {
    /**
     * Selection should support in same level.
     * Like `2020-12-31` ~ `2020-01-01` is validate in `year` picker.
     */
    const list: {
      picker: OcPickerMode;
      defaultValue: string[];
      selectCell: string;
      match: string[];
    }[] = [
      {
        picker: 'week',
        defaultValue: ['2020-06-13'],
        selectCell: '9',
        match: ['2020-06-07 to 2020-06-13'],
      },
      {
        picker: 'quarter',
        defaultValue: ['2020-03-30', '2020-05-20'],
        selectCell: 'Q1',
        match: ['2020-Q1'],
      },
    ];

    list.forEach(({ picker, defaultValue, match, selectCell }) => {
      it(picker, () => {
        const onChange = jest.fn();
        const wrapper = mount(
          <DayjsRangePicker
            picker={picker}
            onChange={onChange}
            defaultValue={[
              getDayjs(defaultValue[0]),
              getDayjs(defaultValue[1] || defaultValue[0]),
            ]}
          />
        );
        wrapper.openPicker(1);
        wrapper.selectCell(selectCell);
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(expect.anything(), [
          match[0],
          match[1] || match[0],
        ]);
      });
    });
  });

  it('should not disabled when week picker in diff year', () => {
    const wrapper = mount(
      <DayjsRangePicker
        picker="week"
        defaultValue={[getDayjs('2000-12-15'), getDayjs('2021-02-03')]}
      />
    );

    wrapper.openPicker(1);
    expect(wrapper.findCell('15').hasClass('picker-cell-disabled')).toBeFalsy();
  });

  it('format', () => {
    const wrapper = mount(
      <DayjsRangePicker
        format={['YYYYMMDD', 'YYYY-MM-DD']}
        defaultValue={[getDayjs('2000-12-15'), getDayjs('2021-02-03')]}
      />
    );

    // Start date
    wrapper.openPicker();
    wrapper
      .find('input')
      .first()
      .simulate('change', {
        target: {
          value: '1989-09-03',
        },
      });
    wrapper.closePicker();

    // end date
    wrapper.openPicker(1);
    wrapper
      .find('input')
      .last()
      .simulate('change', {
        target: {
          value: '1990-11-28',
        },
      });
    wrapper.closePicker(1);

    expect(wrapper.find('input').first().prop('value')).toEqual('19890903');
    expect(wrapper.find('input').last().prop('value')).toEqual('19901128');
  });

  it('custom format', () => {
    const wrapper = mount(
      <DayjsRangePicker
        allowClear
        format={[
          (val: Dayjs) => `custom format:${val.format('YYYYMMDD')}`,
          'YYYY-MM-DD',
        ]}
        defaultValue={[getDayjs('2020-09-17'), getDayjs('2020-10-17')]}
      />
    );

    expect(wrapper.find('input').first().prop('readOnly')).toBeTruthy();
    expect(wrapper.find('input').last().prop('readOnly')).toBeTruthy();

    // Start date
    wrapper.openPicker();
    wrapper.selectCell(24);
    wrapper.closePicker();

    // end date
    wrapper.openPicker(1);
    wrapper.selectCell(24, 1);
    wrapper.closePicker(1);

    expect(wrapper.find('input').first().prop('value')).toEqual(
      'custom format:20200924'
    );
    expect(wrapper.find('input').last().prop('value')).toEqual(
      'custom format:20201024'
    );

    // clear
    const clearNode = wrapper.find('.picker-clear');
    expect(clearNode.simulate.bind(clearNode, 'mouseUp')).not.toThrow();
    expect(wrapper.find('input').first().prop('value')).toEqual('');
    expect(wrapper.find('input').last().prop('value')).toEqual('');
  });

  describe('auto open', () => {
    it('empty: start -> end -> close', () => {
      const wrapper = mount(<DayjsRangePicker />);

      wrapper.openPicker(0);
      wrapper.inputValue('1990-11-28');
      wrapper.closePicker(0);
      expect(wrapper.isOpen()).toBeTruthy();

      wrapper.openPicker(1);
      wrapper.inputValue('1991-01-01');
      wrapper.closePicker(1);
      expect(wrapper.isClosed()).toBeTruthy();
    });

    describe('valued: start -> end -> close', () => {
      it('in range', () => {
        const wrapper = mount(
          <DayjsRangePicker
            defaultValue={[getDayjs('1989-01-01'), getDayjs('1990-01-01')]}
          />
        );

        wrapper.openPicker(0);
        wrapper.inputValue('1990-11-28');
        wrapper.closePicker(0);
        expect(wrapper.isOpen()).toBeTruthy();

        wrapper.openPicker(1);
        wrapper.inputValue('1990-12-23');
        wrapper.closePicker(1);
        expect(wrapper.isClosed()).toBeTruthy();
      });

      it('new start is after end', () => {
        const wrapper = mount(
          <DayjsRangePicker
            defaultValue={[getDayjs('1989-01-10'), getDayjs('1989-01-15')]}
          />
        );

        wrapper.openPicker(0);
        wrapper.inputValue('1989-01-20');
        wrapper.closePicker(0);
        expect(wrapper.isOpen()).toBeTruthy();

        wrapper.openPicker(1);
        wrapper.inputValue('1989-01-25');
        wrapper.closePicker(1);
        expect(wrapper.isClosed()).toBeTruthy();
      });
    });

    it('empty: end -> start -> close', () => {
      const wrapper = mount(<DayjsRangePicker />);

      wrapper.openPicker(1);
      wrapper.inputValue('1990-11-28', 1);
      wrapper.closePicker(1);
      expect(wrapper.isOpen()).toBeTruthy();

      wrapper.openPicker(0);
      wrapper.inputValue('1989-01-01');
      wrapper.closePicker(0);
      expect(wrapper.isClosed()).toBeTruthy();
    });

    describe('valued: end -> start -> close', () => {
      it('in range', () => {
        const wrapper = mount(
          <DayjsRangePicker
            defaultValue={[getDayjs('1989-01-01'), getDayjs('1990-01-01')]}
          />
        );

        wrapper.openPicker(1);
        wrapper.inputValue('1990-11-28', 1);
        wrapper.closePicker(1);
        expect(wrapper.isOpen()).toBeTruthy();

        wrapper.openPicker(0);
        wrapper.inputValue('1989-01-01');
        wrapper.closePicker(0);
        expect(wrapper.isClosed()).toBeTruthy();
      });

      it('new end is before start', () => {
        const wrapper = mount(
          <DayjsRangePicker
            defaultValue={[getDayjs('1989-01-10'), getDayjs('1989-01-15')]}
          />
        );

        wrapper.openPicker(1);
        wrapper.inputValue('1989-01-07', 1);
        wrapper.closePicker(1);
        expect(wrapper.isOpen()).toBeTruthy();

        wrapper.openPicker(0);
        expect(wrapper.isOpen()).toBeTruthy();
        wrapper.inputValue('1989-01-01');
        wrapper.closePicker(0);
        expect(wrapper.isClosed()).toBeTruthy();
      });
    });

    it('not change: start not to end', () => {
      const wrapper = mount(
        <DayjsRangePicker
          defaultValue={[getDayjs('1989-01-01'), getDayjs('1990-01-01')]}
          changeOnBlur={false}
        />
      );
      wrapper.openPicker(0);
      wrapper.closePicker(0);
      expect(wrapper.isClosed()).toBeTruthy();
    });
  });

  describe('click at non-input elements', () => {
    it('should focus on the first element by default', () => {
      jest.useFakeTimers();
      const { container } = render(<DayjsRangePicker />);
      fireEvent.click(container.querySelector('.picker'));
      expect(document.querySelector('.trigger-popup')).toBeTruthy();
      jest.runAllTimers();
      expect(document.activeElement).toBe(container.querySelector('input'));
      jest.useRealTimers();
    });
    it('should focus on the second element if first is disabled', () => {
      jest.useFakeTimers();
      const { container } = render(
        <DayjsRangePicker disabled={[true, false]} />
      );
      fireEvent.click(container.querySelector('.picker'));
      expect(document.querySelector('.trigger-popup')).toBeTruthy();
      jest.runAllTimers();
      expect(document.activeElement).toBe(
        container.querySelectorAll('input')[1]
      );
      jest.useRealTimers();
    });
    it("shouldn't let mousedown blur the input", () => {
      jest.useFakeTimers();
      const { container } = render(<DayjsRangePicker changeOnBlur={false} />);
      const node = container.querySelector('.picker');
      fireEvent.click(node);
      act(() => {
        jest.runAllTimers();
      });
      const mouseDownEvent = createEvent.mouseDown(node);
      fireEvent(node, mouseDownEvent);
      expect(document.querySelector('.trigger-popup')).toBeTruthy();
      expect(mouseDownEvent.defaultPrevented).toBeTruthy();
      jest.useRealTimers();
    });
  });

  it('partialRender', () => {
    const wrapper = mount(
      <DayjsRangePicker open partialRender={() => <h1>Light</h1>} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('Selection callbacks', () => {
    it('selection provide info for onCalendarChange', () => {
      const onCalendarChange = jest.fn();

      const wrapper = mount(
        <DayjsRangePicker onCalendarChange={onCalendarChange} />
      );

      wrapper.openPicker();

      // Start date
      wrapper.selectCell(11);
      expect(onCalendarChange).toHaveBeenCalledWith(
        [expect.anything(), null],
        ['1990-09-11', ''],
        {
          range: 'start',
        }
      );

      // End date
      wrapper.selectCell(23);
      expect(onCalendarChange).toHaveBeenCalledWith(
        [expect.anything(), expect.anything()],
        ['1990-09-11', '1990-09-23'],
        { range: 'end' }
      );
    });
  });

  describe('hover placeholder', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    const defaultValue: [Dayjs, Dayjs] = [
      getDayjs('2020-07-22'),
      getDayjs('2020-08-22'),
    ];

    it('should restore when leave', () => {
      const wrapper = mount(<DayjsRangePicker defaultValue={defaultValue} />);

      // left
      wrapper.openPicker(0);
      const leftCell = wrapper.findCell(24);
      leftCell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-22');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeTruthy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();

      leftCell.simulate('mouseLeave');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-22');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-22');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();

      wrapper.closePicker(0);

      // right
      wrapper.openPicker(1);
      const rightCell = wrapper.findCell(24, 1);
      rightCell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-22');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-24');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeTruthy();

      rightCell.simulate('mouseLeave');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-22');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-22');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();

      wrapper.closePicker(1);
    });

    it('should restore after selecting cell', () => {
      const wrapper = mount(<DayjsRangePicker defaultValue={defaultValue} />);
      // left
      wrapper.openPicker(0);
      const leftCell = wrapper.findCell(24, 0);
      leftCell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-22');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeTruthy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();

      wrapper.selectCell(24, 0);
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-22');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();

      // right
      const rightCell = wrapper.findCell(24, 1);
      rightCell.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-24');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeTruthy();

      wrapper.selectCell(24, 1);
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(wrapper.find('input').last().prop('value')).toBe('2020-08-24');
      expect(
        wrapper
          .find('.picker-input')
          .first()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(
        wrapper
          .find('.picker-input')
          .last()
          .hasClass('picker-input-placeholder')
      ).toBeFalsy();
    });

    it('should clean hover style when selecting the same value with last value', () => {
      const wrapper = mount(
        <DayjsRangePicker
          defaultValue={[getDayjs('2020-07-24'), getDayjs('2020-08-24')]}
        />
      );

      wrapper.openPicker();

      wrapper.selectCell(24, 0);
      expect(wrapper.find('input').first().prop('value')).toBe('2020-07-24');
      expect(
        wrapper.find('input').first().hasClass('picker-input-placeholder')
      ).toBeFalsy();
      expect(wrapper.isOpen()).toBeTruthy();
    });
  });

  it('ok button should be disabled when disabledDate is true', () => {
    const disabledDate = () => {
      // Can not select days before today and today
      return true;
    };
    const wrapper = mount(
      <DayjsRangePicker
        showTime
        disabledDate={disabledDate}
        defaultValue={[getDayjs('2020-07-24'), getDayjs('2020-08-24')]}
      />
    );

    wrapper.openPicker();

    expect(wrapper.find('.picker-ok button').props().disabled).toBeTruthy();

    wrapper
      .find('OcPickerPartial')
      .first()
      .find('.picker-time-partial-column')
      .first()
      .find('li')
      .at(6)
      .simulate('click');

    expect(wrapper.find('input').first().props().value).toEqual(
      '2020-07-24 06:00:00'
    );
    expect(wrapper.find('.picker-ok button').props().disabled).toBeTruthy();
  });

  it('partial should keep open when nextValue is empty', () => {
    const wrapper = mount(<DayjsRangePicker />);

    wrapper.openPicker(0);

    wrapper.selectCell(7, 0);
    expect(wrapper.find('input').first().prop('value')).toBe('1990-09-07');

    // back to first partial and clear input value
    wrapper.openPicker(0);
    wrapper.inputValue('', 0);

    // reselect date
    wrapper.selectCell(9, 0);
    expect(wrapper.find('input').first().prop('value')).toBe('1990-09-09');

    // end date
    wrapper.selectCell(9, 1);

    matchValues(wrapper, '1990-09-09', '1990-10-09');
  });

  it('right date partial switch to month should keep in the same year', () => {
    const wrapper = mount(<DayjsRangePicker />);
    wrapper.openPicker(0);
    wrapper.find('.picker-month-btn').last().simulate('click');
    expect(wrapper.find('.picker-year-btn').text()).toEqual('1990');
  });

  it('month partial should be disabled', () => {
    const wrapper = mount(<DayjsRangePicker />);
    wrapper.openPicker();
    wrapper.selectCell(15);

    wrapper.find('.picker-month-btn').first().simulate('click');
    expect(
      wrapper.findCell('Jan').hasClass('picker-cell-disabled')
    ).toBeTruthy();
    expect(
      wrapper.findCell('Dec').hasClass('picker-cell-disabled')
    ).toBeFalsy();
  });

  it('default endDate should be relative startDate', () => {
    const wrapper = mount(<DayjsRangePicker showTime />);
    wrapper.openPicker();

    wrapper.selectCell(24);
    wrapper.find('.picker-ok button').simulate('click');

    wrapper.find('ul').first().find('li').at(0).simulate('click');
    wrapper.find('.picker-ok button').simulate('click');

    matchValues(wrapper, '1990-09-24 00:00:00', '1990-09-24 00:00:00');
  });

  it('default startDate should be relative endDate', () => {
    const wrapper = mount(<DayjsRangePicker showTime />);
    wrapper.openPicker(1);

    wrapper.selectCell(24);
    wrapper.find('.picker-ok button').simulate('click');

    wrapper.find('ul').first().find('li').at(0).simulate('click');
    wrapper.find('.picker-ok button').simulate('click');

    matchValues(wrapper, '1990-09-24 00:00:00', '1990-09-24 00:00:00');
  });

  it('range picker should have onMouseEnter and onMouseLeave event', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    const wrapper = mount(
      <DayjsRangePicker
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
    wrapper.simulate('mouseenter');
    expect(handleMouseEnter).toHaveBeenCalled();
    wrapper.simulate('mouseleave');
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('keyboard should not trigger on disabledDate', () => {
    const onCalendarChange = jest.fn();
    const now = dayjs();
    const disabledDate = (current: Dayjs) => {
      return current.diff(now, 'days') > 1 || current.diff(now, 'days') < -1;
    };
    const wrapper = mount(
      <DayjsRangePicker
        onCalendarChange={onCalendarChange}
        disabledDate={disabledDate}
      />
    );
    wrapper.find('input').first().simulate('focus');
    wrapper.keyDown(eventKeys.ENTER);
    wrapper.keyDown(eventKeys.TAB);
    // Make sure the selected value is disabledDate. Because only a few values are disabledDate
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ARROWDOWN);
    wrapper.keyDown(eventKeys.ENTER);
    expect(onCalendarChange).not.toHaveBeenCalled();
  });

  it('range picker should have onClick event', () => {
    const handleClick = jest.fn();
    const wrapper = mount(<DayjsRangePicker onClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('range picker should have onMouseDown event', () => {
    const handleMouseDown = jest.fn();
    const wrapper = mount(<DayjsRangePicker onMouseDown={handleMouseDown} />);
    wrapper.simulate('mousedown');
    expect(handleMouseDown).toHaveBeenCalled();
  });

  it('partial should be stable: left', () => {
    const mock = spyElementPrototypes(HTMLElement, {
      offsetWidth: {
        get() {
          if (this.className.includes('range-arrow')) {
            return 14;
          } else if (this.className.includes('partial-container')) {
            return 312;
          } else if (this.className.includes('input')) {
            return 236;
          } else if (this.className.includes('range-separator')) {
            return 10;
          }
          return null;
        },
      },
      offsetLeft: {
        get() {
          if (this.className.includes('range-arrow')) {
            return 16;
          }
          return null;
        },
      },
    });
    const wrapper = mount(
      <DayjsRangePicker
        allowClear
        defaultValue={[dayjs('1990-09-03'), dayjs('1989-11-28')]}
        clearIcon={<span>X</span>}
        suffixIcon={<span>O</span>}
      />
    );
    wrapper.openPicker(1);
    expect(
      (wrapper.find('.picker-partial-container').getDOMNode() as HTMLElement)
        .style.marginLeft
    ).toBe('0px');
    mock.mockRestore();
  });

  it('partial should be stable: right', () => {
    const mock = spyElementPrototypes(HTMLElement, {
      offsetWidth: {
        get() {
          if (this.className.includes('range-arrow')) {
            return 14;
          } else if (this.className.includes('partial-container')) {
            return 312;
          } else if (this.className.includes('input')) {
            return 236;
          } else if (this.className.includes('range-separator')) {
            return 10;
          }
          return null;
        },
      },
      offsetLeft: {
        get() {
          if (this.className.includes('range-arrow')) {
            return 262;
          }
          return null;
        },
      },
    });
    const wrapper = mount(
      <DayjsRangePicker
        allowClear
        defaultValue={[dayjs('1990-09-03'), dayjs('1989-11-28')]}
        clearIcon={<span>X</span>}
        suffixIcon={<span>O</span>}
      />
    );
    wrapper.openPicker(1);
    expect(
      (wrapper.find('.picker-partial-container').getDOMNode() as HTMLElement)
        .style.marginLeft
    ).toBe('0px');
    mock.mockRestore();
  });
});
