import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { spyElementPrototypes } from '../../../../tests/domHook';
import { mount, getDayjs, isSame, DayjsPickerPartial } from './util/commonUtil';
import enUS from '../Locale/en_US';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

dayjs.extend(updateLocale);

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

describe('Picker.Partial', () => {
    beforeAll(() => {
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

    afterAll(() => {
        MockDate.reset();
    });

    describe('value', () => {
        it('defaultValue', () => {
            const wrapper = mount(
                <DayjsPickerPartial defaultValue={getDayjs('2000-01-01')} />
            );

            expect(wrapper.find('.picker-cell-selected').text()).toEqual('1');
        });

        it('controlled', () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <DayjsPickerPartial
                    value={getDayjs('2000-01-01')}
                    onChange={onChange}
                />
            );

            wrapper.selectCell(23);
            expect(
                isSame(onChange.mock.calls[0][0], '2000-01-23')
            ).toBeTruthy();
            onChange.mockReset();

            // Trigger again since value is controlled
            wrapper.selectCell(23);
            expect(
                isSame(onChange.mock.calls[0][0], '2000-01-23')
            ).toBeTruthy();
            onChange.mockReset();

            // Not trigger
            wrapper.setProps({ value: getDayjs('2000-01-23') });
            wrapper.selectCell(23);
            expect(onChange).not.toHaveBeenCalled();
        });

        it('uncontrolled', () => {
            const onChange = jest.fn();
            const wrapper = mount(<DayjsPickerPartial onChange={onChange} />);

            wrapper.selectCell(23);
            expect(
                isSame(onChange.mock.calls[0][0], '1990-09-23')
            ).toBeTruthy();
            onChange.mockReset();

            // Not trigger
            wrapper.selectCell(23);
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('Partial switch by picker', () => {
        it('year', () => {
            const wrapper = mount(<DayjsPickerPartial picker="year" />);
            wrapper.find('.picker-decade-btn').simulate('click');
            expect(wrapper.find('.picker-decade-partial').length).toBeTruthy();

            wrapper.selectCell('1990-1999');
            expect(wrapper.find('.picker-year-partial').length).toBeTruthy();

            wrapper.selectCell('1999');
            expect(wrapper.find('.picker-year-partial').length).toBeTruthy();
        });

        [
            ['month', 'Aug'],
            ['quarter', 'Q3'],
        ].forEach(([picker, cell]) => {
            it(picker, () => {
                const wrapper = mount(
                    <DayjsPickerPartial picker={picker as any} />
                );
                wrapper.find('.picker-year-btn').simulate('click');
                wrapper.find('.picker-decade-btn').simulate('click');
                expect(
                    wrapper.find('.picker-decade-partial').length
                ).toBeTruthy();

                wrapper.selectCell('1990-1999');
                expect(
                    wrapper.find('.picker-year-partial').length
                ).toBeTruthy();

                wrapper.selectCell('1999');
                expect(
                    wrapper.find(`.picker-${picker}-partial`).length
                ).toBeTruthy();

                wrapper.selectCell(cell);
                expect(
                    wrapper.find(`.picker-${picker}-partial`).length
                ).toBeTruthy();
            });
        });
    });

    // TODO: Re-enable test when a good way to mock requestAnimationFrame is established.
    describe('time click to scroll', () => {
        [true, false].forEach((bool) => {
            it.skip(`spy requestAnimationFrame: ${bool}`, () => {
                let scrollTop = 90;
                const domSpy = spyElementPrototypes(HTMLElement, {
                    scrollTop: {
                        get: () => scrollTop,
                        set: ((_: Function, value: number) => {
                            scrollTop = value;
                        }) as any,
                    },
                });

                let requestAnimationFrameSpy = jest.spyOn(
                    global,
                    'requestAnimationFrame' as any
                );

                // Spy to trigger 2 way of test for checking case cover
                if (bool) {
                    requestAnimationFrameSpy =
                        requestAnimationFrameSpy.mockImplementation(
                            window.setTimeout as any
                        );
                }

                jest.useFakeTimers();
                const wrapper = mount(<DayjsPickerPartial picker="time" />);

                // Multiple times should only one work
                wrapper.find('ul').first().find('li').at(3).simulate('click');

                wrapper.find('ul').first().find('li').at(11).simulate('click');
                jest.runAllTimers();

                expect(requestAnimationFrameSpy).toHaveBeenCalled();

                jest.useRealTimers();

                domSpy.mockRestore();
                requestAnimationFrameSpy.mockRestore();
            });
        });
    });

    describe('click button to switch', () => {
        it('date', () => {
            const wrapper = mount(
                <DayjsPickerPartial defaultValue={getDayjs('1990-09-03')} />
            );

            wrapper.clickButton('prev');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                'Aug1990'
            );

            wrapper.clickButton('next');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                'Sep1990'
            );

            wrapper.clickButton('super-prev');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                'Sep1989'
            );

            wrapper.clickButton('super-next');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                'Sep1990'
            );
        });

        ['month', 'quarter'].forEach((picker) => {
            it(picker, () => {
                const wrapper = mount(
                    <DayjsPickerPartial
                        defaultValue={getDayjs('1990-09-03')}
                        picker={picker as any}
                    />
                );

                wrapper.clickButton('super-prev');
                expect(wrapper.find('.picker-header-view').text()).toEqual(
                    '1989'
                );

                wrapper.clickButton('super-next');
                expect(wrapper.find('.picker-header-view').text()).toEqual(
                    '1990'
                );
            });
        });

        it('year', () => {
            const wrapper = mount(
                <DayjsPickerPartial
                    defaultValue={getDayjs('1990-09-03')}
                    picker="year"
                />
            );

            wrapper.clickButton('super-prev');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                '1980-1989'
            );

            wrapper.clickButton('super-next');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                '1990-1999'
            );
        });

        it('decade', () => {
            const wrapper = mount(
                <DayjsPickerPartial
                    defaultValue={getDayjs('1990-09-03')}
                    mode="decade"
                />
            );

            wrapper.clickButton('super-prev');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                '1800-1899'
            );

            wrapper.clickButton('super-next');
            expect(wrapper.find('.picker-header-view').text()).toEqual(
                '1900-1999'
            );
        });
    });

    it('showTime.defaultValue only works at first render', () => {
        const onSelect = jest.fn();
        const wrapper = mount(
            <DayjsPickerPartial
                showTime={{
                    defaultValue: getDayjs('2001-01-02 01:03:07'),
                }}
                onSelect={onSelect}
            />
        );

        wrapper.selectCell(5);
        // use showTime.defaultValue
        expect(
            isSame(onSelect.mock.calls[0][0], '1990-09-05 01:03:07')
        ).toBeTruthy();

        // set hour to 10
        wrapper.find('ul').first().find('li').at(10).simulate('click');

        // expect hour changed
        expect(
            isSame(onSelect.mock.calls[1][0], '1990-09-05 10:03:07')
        ).toBeTruthy();

        wrapper.selectCell(20);
        // expect using last selection time
        expect(
            isSame(onSelect.mock.calls[2][0], '1990-09-20 10:03:07')
        ).toBeTruthy();
    });

    it('datepicker has defaultValue and showTime.defaultValue ', () => {
        const onSelect = jest.fn();
        const wrapper = mount(
            <DayjsPickerPartial
                value={getDayjs('2001-01-02 10:10:10')}
                showTime={{
                    defaultValue: getDayjs('2001-01-02 09:09:09'),
                }}
                onSelect={onSelect}
            />
        );

        wrapper.selectCell(5);
        // showTime.defaultValue not used
        expect(
            isSame(onSelect.mock.calls[0][0], '2001-01-05 10:10:10')
        ).toBeTruthy();
    });

    describe('not trigger onSelect when cell disabled', () => {
        const disabledDateTime = () => ({
            disabledHours: () => [0],
        });
        it('time', () => {
            const onSelect = jest.fn();
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="time"
                    onSelect={onSelect}
                    disabledTime={disabledDateTime}
                />
            );

            // Disabled
            wrapper.find('li').first().simulate('click');
            expect(onSelect).not.toHaveBeenCalled();

            // Enabled
            wrapper.find('li').at(1).simulate('click');
            expect(onSelect).toHaveBeenCalled();
        });

        it('month', () => {
            const onSelect = jest.fn();
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="month"
                    onSelect={onSelect}
                    disabledDate={(date: dayjs.Dayjs) => date.month() === 0}
                />
            );

            wrapper.selectCell('Jan');
            expect(onSelect).not.toHaveBeenCalled();

            wrapper.selectCell('Feb');
            expect(onSelect).toHaveBeenCalled();
        });

        it('year', () => {
            const onSelect = jest.fn();
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="year"
                    onSelect={onSelect}
                    disabledDate={(date: dayjs.Dayjs) => date.year() === 1990}
                />
            );

            wrapper.selectCell(1990);
            expect(onSelect).not.toHaveBeenCalled();

            wrapper.selectCell(1993);
            expect(onSelect).toHaveBeenCalled();
        });

        describe('decade', () => {
            it('mode', () => {
                const onPartialChange = jest.fn();
                const wrapper = mount(
                    <DayjsPickerPartial
                        mode="decade"
                        onPartialChange={onPartialChange}
                        disabledDate={(date: dayjs.Dayjs) =>
                            date.year() === 1900
                        }
                    />
                );

                // no picker is decade, it means alway can click
                wrapper.selectCell('1900-1909');
                expect(onPartialChange).toHaveBeenCalled();

                onPartialChange.mockReset();
                wrapper.selectCell('1910-1919');
                expect(onPartialChange).toHaveBeenCalled();
            });

            it('not trigger when same partial', () => {
                const onPartialChange = jest.fn();
                const wrapper = mount(
                    <DayjsPickerPartial onPartialChange={onPartialChange} />
                );

                wrapper.selectCell('23');
                expect(onPartialChange).not.toHaveBeenCalled();
            });
        });
    });

    describe('time with use12Hours', () => {
        it('should work', () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="time"
                    defaultValue={getDayjs('2000-01-01 00:01:02')}
                    use12Hours
                    onChange={onChange}
                />
            );

            wrapper
                .find('.picker-time-partial-column')
                .last()
                .find('li')
                .last()
                .simulate('click');
            expect(
                isSame(
                    onChange.mock.calls[0][0],
                    '2000-01-01 12:01:02',
                    'second'
                )
            ).toBeTruthy();
        });

        it('should display hour from 12 at AM', () => {
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="time"
                    defaultValue={getDayjs('2000-01-01 00:00:00')}
                    use12Hours
                />
            );

            const startHour = wrapper
                .find('.picker-time-partial-column')
                .first()
                .find('li')
                .first()
                .text();
            expect(startHour).toEqual('12');
        });

        it('should display hour from 12 at AM', () => {
            const wrapper = mount(
                <DayjsPickerPartial
                    picker="time"
                    defaultValue={getDayjs('2000-01-01 12:00:00')}
                    use12Hours
                />
            );

            const startHour = wrapper
                .find('.picker-time-partial-column')
                .first()
                .find('li')
                .first()
                .text();
            expect(startHour).toEqual('12');
        });
    });

    it('should render month correctly in rtl', () => {
        const wrapper = mount(
            <DayjsPickerPartial mode="month" direction="rtl" />
        );
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/partial.rtl.shot'
        );
    });

    describe('hideHeader', () => {
        ['decade', 'year', 'month', 'quarter', 'date', 'time'].forEach(
            (mode) => {
                it(mode, () => {
                    const wrapper = mount(
                        <DayjsPickerPartial mode={mode as any} hideHeader />
                    );
                    expect(wrapper.find('.picker-header')).toHaveLength(0);
                });
            }
        );
    });

    it('onOk to trigger', () => {
        const onOk = jest.fn();
        const wrapper = mount(<DayjsPickerPartial picker="time" onOk={onOk} />);
        wrapper
            .find('.picker-time-partial-column')
            .first()
            .find('.picker-time-partial-cell')
            .at(3)
            .simulate('click');

        expect(onOk).not.toHaveBeenCalled();
        wrapper.confirmOK();
        expect(
            isSame(onOk.mock.calls[0][0], '1990-09-03 03:00:00')
        ).toBeTruthy();
    });

    it('monthCellRender', () => {
        const wrapper = mount(
            <DayjsPickerPartial
                picker="month"
                monthCellRender={(date: dayjs.Dayjs) => date.format('YYYY-MM')}
            />
        );

        expect(wrapper.find('tbody').render()).toMatchSpecificSnapshot(
            './__snapshots__/partial.monthcellrender.shot'
        );
    });

    describe('start weekday should be correct', () => {
        [{ locale: enUS, startDate: '29' }].forEach(({ locale, startDate }) => {
            it(locale.locale, () => {
                const wrapper = mount(
                    <DayjsPickerPartial
                        defaultValue={getDayjs('2020-04-02')}
                        locale={locale}
                    />
                );

                expect(wrapper.find('td').first().text()).toEqual(startDate);
            });
        });

        [{ locale: enUS, startDate: '1' }].forEach(({ locale, startDate }) => {
            it(`another align test of ${locale.locale}`, () => {
                const wrapper = mount(
                    <DayjsPickerPartial
                        defaultValue={getDayjs('2020-03-01')}
                        locale={locale}
                    />
                );

                expect(wrapper.find('td').first().text()).toEqual(startDate);
            });
        });

        it('update firstDayOfWeek', () => {
            const defaultFirstDay = dayjs(enUS.locale)
                .localeData()
                .firstDayOfWeek();
            dayjs.updateLocale(enUS.locale, {
                week: {
                    dow: 5,
                } as any,
            });
            expect(defaultFirstDay).toEqual(0);

            const wrapper = mount(
                <DayjsPickerPartial
                    defaultValue={getDayjs('2020-04-02')}
                    locale={enUS}
                />
            );

            // Updated so the selected week starts within the correct range.
            expect(wrapper.find('td').first().text()).toEqual('29');

            dayjs.updateLocale(enUS.locale, {
                week: {
                    dow: defaultFirstDay,
                } as any,
            });
        });
    });
});
