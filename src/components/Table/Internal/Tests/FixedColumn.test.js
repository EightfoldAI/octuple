import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import OcTable from '..';
import { ResizeObserver } from '../../../../shared/ResizeObserver/ResizeObserver';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.FixedColumn', () => {
    const columns = [
        {
            title: 'title1',
            dataIndex: 'a',
            key: 'a',
            width: 100,
            fixed: 'left',
        },
        { title: 'title3', dataIndex: 'c', key: 'c' },
        {
            title: 'title12',
            dataIndex: 'b',
            key: 'l',
            width: 100,
            fixed: 'right',
        },
    ];
    const data = [{ a: '123', b: 'xxxxxxxx', d: 3, key: '1' }];

    describe('renders correctly', () => {
        [
            { scrollName: 'scrollX', scroll: { x: 1200 } },
            { scrollName: 'scrollXY', scroll: { x: 1200, y: 100 } },
        ].forEach(({ scrollName, scroll }) => {
            [
                { name: 'withdata', data },
                { name: 'withoutdata', data: [] },
            ].forEach(({ name, data: testData }) => {
                it(`${scrollName} - ${name}`, async () => {
                    jest.useFakeTimers();
                    const wrapper = mount(
                        <OcTable
                            columns={columns}
                            data={testData}
                            scroll={scroll}
                            expandableConfig={{
                                expandIcon: () => (
                                    <div className="expand-icon" />
                                ),
                            }}
                        />
                    );

                    act(() => {
                        wrapper
                            .find(ResizeObserver.Collection)
                            .first()
                            .props()
                            .onBatchResize([
                                {
                                    data: wrapper
                                        .find('table ResizeObserver')
                                        .first()
                                        .props().data,
                                    size: { width: 93, offsetWidth: 93 },
                                },
                            ]);
                    });
                    await act(async () => {
                        jest.runAllTimers();
                        await Promise.resolve();
                        wrapper.update();
                    });
                    expect(wrapper.render()).toMatchSpecificSnapshot(
                        `./__snapshots__/FixedColumn.render${name}.shot`
                    );
                    jest.useRealTimers();
                });
            });
        });

        it('all column has width should use it', () => {
            const wrapper = mount(
                <OcTable
                    columns={[
                        {
                            title: 'title1',
                            dataIndex: 'a',
                            key: 'a',
                            width: 100,
                        },
                        {
                            title: 'title2',
                            dataIndex: 'b',
                            key: 'b',
                            width: 100,
                        },
                    ]}
                    data={[]}
                    scroll={{ x: 'max-content' }}
                    expandableConfig={{
                        expandIcon: () => <div className="expand-icon" />,
                    }}
                />
            );

            expect(wrapper.find('colgroup').render()).toMatchSpecificSnapshot(
                './__snapshots__/FixedColumn.colwidth.shot'
            );
        });
    });

    it('has correct scroll classNames when table resize', () => {
        const wrapper = mount(
            <OcTable
                columns={columns}
                data={data}
                scroll={{ x: true }}
                style={{ width: 2000 }}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        // Use `onScroll` directly since simulate not support `currentTarget`
        act(() => {
            wrapper
                .find('.table-content')
                .props()
                .onScroll({
                    currentTarget: {
                        scrollLeft: 10,
                        scrollWidth: 200,
                        clientWidth: 100,
                    },
                });
        });
        act(() => {
            wrapper.update();
        });
        expect(wrapper.find('.table-ping-left').exists()).toBeTruthy();
        expect(wrapper.find('.table-ping-right').exists()).toBeTruthy();

        // Left
        act(() => {
            wrapper
                .find('.table-content')
                .props()
                .onScroll({
                    currentTarget: {
                        scrollLeft: 0,
                        scrollWidth: 200,
                        clientWidth: 100,
                    },
                });
        });
        act(() => {
            wrapper.update();
        });
        expect(wrapper.find('.table-ping-left').exists()).toBeFalsy();
        expect(wrapper.find('.table-ping-right').exists()).toBeTruthy();

        // Right
        act(() => {
            wrapper
                .find('.table-content')
                .props()
                .onScroll({
                    currentTarget: {
                        scrollLeft: 100,
                        scrollWidth: 200,
                        clientWidth: 100,
                    },
                });
        });
        act(() => {
            wrapper.update();
        });
        expect(wrapper.find('.table-ping-left').exists()).toBeTruthy();
        expect(wrapper.find('.table-ping-right').exists()).toBeFalsy();
    });

    it('ellipsis will wrap additional dom', () => {
        const myColumns = [{ ...columns[0], ellipsis: true }];
        const wrapper = mount(
            <OcTable
                columns={myColumns}
                data={data}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        expect(wrapper.find('tr th').find('.table-cell-content')).toHaveLength(
            1
        );
        expect(wrapper.find('tr td').find('.table-cell-content')).toHaveLength(
            data.length
        );
    });

    it('fixed column renders correctly RTL', () => {
        const wrapper = mount(
            <OcTable
                columns={columns}
                data={data}
                direction="rtl"
                scroll={{ x: 1 }}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/FixedColumn.rtl.shot'
        );
    });
});
