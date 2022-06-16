import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { spyElementPrototypes } from './utils/domHook';
import OcTable from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Sticky', () => {
    it('Sticky Header', () => {
        jest.useFakeTimers();
        const col1 = { dataIndex: 'light', width: 100 };
        const col2 = { dataIndex: 'bamboo', width: 200 };

        const TableDemo = (props) => {
            return (
                <div
                    style={{
                        height: 10000,
                    }}
                >
                    <OcTable
                        columns={[col1, col2]}
                        data={[{ light: 'bamboo', bamboo: 'light', key: 1 }]}
                        sticky
                        expandable={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                        {...props}
                    />
                </div>
            );
        };
        const wrapper = mount(<TableDemo />);

        expect(wrapper.find('.tableHeader').last().prop('style')).toEqual({
            overflow: 'hidden',
            top: 0,
        });

        expect(wrapper.find('.tableHeader').last().prop('className')).toBe(
            'tableHeader tableStickyHolder'
        );

        wrapper.setProps({
            sticky: {
                offsetHeader: 10,
            },
        });

        expect(wrapper.find('.tableHeader').last().prop('style')).toEqual({
            overflow: 'hidden',
            top: 10,
        });

        jest.useRealTimers();
    });

    it('Sticky scroll', async () => {
        jest.useFakeTimers();
        window.pageYOffset = 900;
        document.documentElement.scrollTop = 200;
        let scrollLeft = 100;
        const domSpy = spyElementPrototypes(HTMLDivElement, {
            scrollLeft: {
                get: () => scrollLeft,
                set: (left) => {
                    scrollLeft = left;
                },
            },
            scrollTop: {
                get: () => 100,
            },
            scrollWidth: {
                get: () => 200,
            },
            clientWidth: {
                get: () => 100,
            },
            offsetHeight: {
                get: () => 100,
            },
        });

        const col1 = { dataIndex: 'light', width: 1000 };
        const col2 = { dataIndex: 'bamboo', width: 2000 };
        const wrapper = mount(
            <OcTable
                columns={[col1, col2]}
                data={[
                    { light: 'bamboo', bamboo: 'light', key: 1 },
                    { light: 'bamboo', bamboo: 'light', key: 2 },
                    { light: 'bamboo', bamboo: 'light', key: 3 },
                    { light: 'bamboo', bamboo: 'light', key: 4 },
                    { light: 'bamboo', bamboo: 'light', key: 6 },
                    { light: 'bamboo', bamboo: 'light', key: 7 },
                    { light: 'bamboo', bamboo: 'light', key: 8 },
                    { light: 'bamboo', bamboo: 'light', key: 9 },
                    { light: 'bamboo', bamboo: 'light', key: 10 },
                    { light: 'bamboo', bamboo: 'light', key: 11 },
                    { light: 'bamboo', bamboo: 'light', key: 12 },
                    { light: 'bamboo', bamboo: 'light', key: 13 },
                    { light: 'bamboo', bamboo: 'light', key: 15 },
                    { light: 'bamboo', bamboo: 'light', key: 16 },
                    { light: 'bamboo', bamboo: 'light', key: 17 },
                    { light: 'bamboo', bamboo: 'light', key: 18 },
                    { light: 'bamboo', bamboo: 'light', key: 19 },
                    { light: 'bamboo', bamboo: 'light', key: 20 },
                    { light: 'bamboo', bamboo: 'light', key: 21 },
                    { light: 'bamboo', bamboo: 'light', key: 22 },
                    { light: 'bamboo', bamboo: 'light', key: 23 },
                    { light: 'bamboo', bamboo: 'light', key: 24 },
                    { light: 'bamboo', bamboo: 'light', key: 25 },
                    { light: 'bamboo', bamboo: 'light', key: 26 },
                ]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
                scroll={{
                    x: 10000,
                }}
                sticky
            />
        );

        await act(async () => {
            jest.runAllTimers();
            await Promise.resolve();
        });

        const oldInnerHeight = global.innerHeight;
        const resizeEvent = new Event('resize');

        global.innerHeight = 10000;

        await act(async () => {
            global.dispatchEvent(resizeEvent);
            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        await act(async () => {
            global.innerHeight = oldInnerHeight;
            global.dispatchEvent(resizeEvent);
            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        const mockFn = jest.fn();

        wrapper.find('.tableStickyScrollBar').simulate('mousedown', {
            persist: mockFn,
            preventDefault: mockFn,
            pageX: 0,
        });

        expect(mockFn).toHaveBeenCalledTimes(2);

        expect(wrapper.find('.tableStickyScrollBarActive').length).toBe(1);

        const mousemoveEvent = new Event('mousemove');

        mousemoveEvent.buttons = 1;
        mousemoveEvent.pageX = 50;

        await act(async () => {
            document.body.dispatchEvent(mousemoveEvent);
            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        expect(wrapper.find('.tableStickyScrollBar').prop('style')).toEqual({
            width: '50px',
            transform: 'translate3d(50.5px, 0, 0)',
        });

        await act(async () => {
            mousemoveEvent.pageX = -50;
            document.body.dispatchEvent(mousemoveEvent);

            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        expect(wrapper.find('.tableStickyScrollBar').prop('style')).toEqual({
            width: '50px',
            transform: 'translate3d(0px, 0, 0)',
        });

        await act(async () => {
            mousemoveEvent.buttons = 0;
            document.body.dispatchEvent(mousemoveEvent);

            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        expect(wrapper.find('.tableStickyScrollBarActive').length).toBe(0);

        const mouseupEvent = new Event('mouseup');

        document.body.dispatchEvent(mouseupEvent);

        wrapper.unmount();

        window.pageYOffset = 0;
        mockFn.mockRestore();
        domSpy.mockRestore();
        jest.useRealTimers();
    });

    it('Sticky Header with border classname', () => {
        jest.useFakeTimers();

        const TableDemo = (props) => {
            return (
                <div
                    style={{
                        height: 10000,
                    }}
                >
                    <OcTable
                        columns={[
                            {
                                title: 'title1',
                                dataIndex: 'a',
                                key: 'a',
                                width: 100,
                                fixed: 'left',
                            },
                            { title: 'title2', dataIndex: 'b', key: 'b' },
                            { title: 'title3', dataIndex: 'c', key: 'c' },
                            {
                                title: 'title4',
                                dataIndex: 'd',
                                key: 'd',
                                width: 100,
                                fixed: 'right',
                            },
                        ]}
                        data={[
                            {
                                a: '123',
                                b: 'xxxxxxxx',
                                c: 3,
                                d: 'hehe',
                                key: '1',
                            },
                            {
                                a: 'cdd',
                                b: 'edd12221',
                                c: 3,
                                d: 'haha',
                                key: '2',
                            },
                        ]}
                        expandable={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                        sticky
                        scroll={{
                            x: 10000,
                        }}
                        {...props}
                    />
                </div>
            );
        };
        const wrapper = mount(<TableDemo />);

        expect(wrapper.find('.tableCellFixSticky').at(1).prop('style')).toEqual(
            {
                position: 'sticky',
                right: 0,
            }
        );

        expect(wrapper.find('.tableCellFixSticky').at(1)).not.toBe(undefined);

        jest.useRealTimers();
    });

    it('Sticky Header with scroll-y', () => {
        jest.useFakeTimers();

        const TableDemo = (props) => {
            return (
                <div
                    style={{
                        height: 10000,
                    }}
                >
                    <OcTable
                        columns={[
                            {
                                title: 'title1',
                                dataIndex: 'a',
                                key: 'a',
                                width: 100,
                                fixed: 'left',
                            },
                            { title: 'title2', dataIndex: 'b', key: 'b' },
                            { title: 'title3', dataIndex: 'c', key: 'c' },
                            {
                                title: 'title4',
                                dataIndex: 'd',
                                key: 'd',
                                width: 100,
                                fixed: 'right',
                            },
                        ]}
                        data={[
                            {
                                a: '123',
                                b: 'xxxxxxxx',
                                c: 3,
                                d: 'hehe',
                                key: '1',
                            },
                            {
                                a: 'cdd',
                                b: 'edd12221',
                                c: 3,
                                d: 'haha',
                                key: '2',
                            },
                        ]}
                        expandable={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                        sticky
                        scroll={{
                            x: 10000,
                            y: 10,
                        }}
                        {...props}
                    />
                </div>
            );
        };
        const wrapper = mount(<TableDemo />);

        expect(wrapper.find('.tableCellFixSticky').at(0).prop('style')).toEqual(
            {
                left: 0,
                position: 'sticky',
            }
        );

        jest.useRealTimers();
    });

    it('Sticky scroll with getContainer', async () => {
        jest.useFakeTimers();
        window.pageYOffset = 900;
        document.documentElement.scrollTop = 200;
        const container = document.createElement('p');
        container.style = 'height: 500px;overflow: scroll';
        document.body.appendChild(container);
        let scrollLeft = 100;
        const domSpy = spyElementPrototypes(HTMLDivElement, {
            scrollLeft: {
                get: () => scrollLeft,
                set: (left) => {
                    scrollLeft = left;
                },
            },
            scrollTop: {
                get: () => 100,
            },
            scrollWidth: {
                get: () => 200,
            },
            clientWidth: {
                get: () => 100,
            },
            offsetHeight: {
                get: () => 1000,
            },
        });

        const sectionSpy = spyElementPrototypes(HTMLParagraphElement, {
            scrollLeft: {
                get: () => scrollLeft,
                set: (left) => {
                    scrollLeft = left;
                },
            },
            scrollTop: {
                get: () => 100,
            },
            scrollWidth: {
                get: () => 200,
            },
            clientWidth: {
                get: () => 100,
            },
            clientHeight: {
                get: () => 500,
            },
            offsetHeight: {
                get: () => 100,
            },
        });

        const col1 = { dataIndex: 'light', width: 1000 };
        const col2 = { dataIndex: 'bamboo', width: 2000 };
        const wrapper = mount(
            <OcTable
                columns={[col1, col2]}
                data={[
                    { light: 'bamboo', bamboo: 'light', key: 1 },
                    { light: 'bamboo', bamboo: 'light', key: 2 },
                    { light: 'bamboo', bamboo: 'light', key: 3 },
                    { light: 'bamboo', bamboo: 'light', key: 4 },
                    { light: 'bamboo', bamboo: 'light', key: 6 },
                    { light: 'bamboo', bamboo: 'light', key: 7 },
                    { light: 'bamboo', bamboo: 'light', key: 8 },
                    { light: 'bamboo', bamboo: 'light', key: 9 },
                    { light: 'bamboo', bamboo: 'light', key: 10 },
                    { light: 'bamboo', bamboo: 'light', key: 11 },
                    { light: 'bamboo', bamboo: 'light', key: 12 },
                    { light: 'bamboo', bamboo: 'light', key: 13 },
                    { light: 'bamboo', bamboo: 'light', key: 15 },
                    { light: 'bamboo', bamboo: 'light', key: 16 },
                    { light: 'bamboo', bamboo: 'light', key: 17 },
                    { light: 'bamboo', bamboo: 'light', key: 18 },
                    { light: 'bamboo', bamboo: 'light', key: 19 },
                    { light: 'bamboo', bamboo: 'light', key: 20 },
                    { light: 'bamboo', bamboo: 'light', key: 21 },
                    { light: 'bamboo', bamboo: 'light', key: 22 },
                    { light: 'bamboo', bamboo: 'light', key: 23 },
                    { light: 'bamboo', bamboo: 'light', key: 24 },
                    { light: 'bamboo', bamboo: 'light', key: 25 },
                    { light: 'bamboo', bamboo: 'light', key: 26 },
                ]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
                scroll={{
                    x: 10000,
                }}
                sticky={{
                    getContainer: () => container,
                }}
            />,
            {
                attachTo: container,
            }
        );

        await act(async () => {
            jest.runAllTimers();
            await Promise.resolve();
        });

        const mockFn = jest.fn();

        const mousemoveEvent = new Event('mousemove');

        mousemoveEvent.buttons = 1;
        mousemoveEvent.pageX = 50;

        await act(async () => {
            document.body.dispatchEvent(mousemoveEvent);
            jest.runAllTimers();
            await Promise.resolve();
            wrapper.update();
        });

        expect(wrapper.find('.tableStickyScrollBar').prop('style')).toEqual({
            width: '50px',
            transform: 'translate3d(50px, 0, 0)',
        });

        wrapper.unmount();

        window.pageYOffset = 0;
        domSpy.mockRestore();
        sectionSpy.mockRestore();
        mockFn.mockRestore();
        jest.useRealTimers();
    });
});
