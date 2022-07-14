import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import type { Dayjs } from 'dayjs';
import {
    mount,
    getDayjs,
    isSame,
    DayjsPicker,
    DayjsRangePicker,
} from './util/commonUtil';

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
    isOpen() {
        const openDiv = this.find('.trigger-popup').hostNodes();
        return (
            openDiv &&
            openDiv.length &&
            !openDiv.hasClass('trigger-popup-hidden')
        );
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

describe('Picker.DisabledTime', () => {
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

    it('disabledTime on TimePicker', () => {
        const wrapper = mount(
            <DayjsPicker
                open
                picker="time"
                disabledTime={() => ({
                    disabledSeconds: () =>
                        new Array(59).fill(0).map((_, index) => index),
                })}
            />
        );

        expect(
            wrapper.find(
                'ul.picker-time-partial-column li.picker-time-partial-cell-disabled'
            )
        ).toHaveLength(59);
    });

    it('disabledTime on TimeRangePicker', () => {
        const wrapper = mount(
            <DayjsRangePicker
                open
                picker="time"
                disabledTime={(_, type) => ({
                    disabledHours: () =>
                        type === 'start' ? [1, 3, 5] : [2, 4],
                })}
            />
        );

        expect(
            wrapper.find(
                'ul.picker-time-partial-column li.picker-time-partial-cell-disabled'
            )
        ).toHaveLength(3);

        // Click another one
        wrapper.find('input').last().simulate('mouseDown');
        expect(
            wrapper.find(
                'ul.picker-time-partial-column li.picker-time-partial-cell-disabled'
            )
        ).toHaveLength(2);
    });
});
