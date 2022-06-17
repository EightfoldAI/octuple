import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';
import { CheckBox } from '../../Selectors';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.rowSelection', () => {
    window.requestAnimationFrame = (callback) =>
        window.setTimeout(callback, 16);
    window.cancelAnimationFrame = window.clearTimeout;

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
        errorSpy.mockReset();
    });

    afterAll(() => {
        errorSpy.mockRestore();
    });

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ];

    const data = [
        { key: 0, name: 'Jack' },
        { key: 1, name: 'Lucy' },
        { key: 2, name: 'Tom' },
        { key: 3, name: 'Jerry' },
    ];

    function createTable(props = {}) {
        return (
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{}}
                {...props}
            />
        );
    }

    function renderedNames(wrapper) {
        return wrapper.find('BodyRow').map((row) => row.props().record.name);
    }

    function getSelections(wrapper) {
        return wrapper
            .find('BodyRow')
            .map((row) => {
                const { key } = row.props().record;
                if (!row.find('input').at(0).props().checked) {
                    return null;
                }

                return key;
            })
            .filter((key) => key !== null);
    }

    function getIndeterminateSelection(wrapper) {
        return wrapper
            .find('BodyRow')
            .map((row) => {
                const { key } = row.props().record;
                return key;
            })
            .filter((key) => key !== null);
    }

    it('select default row', () => {
        const wrapper = mount(
            createTable({ rowSelection: { defaultSelectedRowKeys: [0] } })
        );
        const checkboxes = wrapper.find('input');

        expect(getSelections(wrapper)).toEqual([0]);

        checkboxes.at(1).simulate('change', { target: { checked: false } });
        expect(getSelections(wrapper)).toEqual([]);

        checkboxes.at(0).simulate('change', { target: { checked: true } });
        expect(getSelections(wrapper)).toEqual([0, 1, 2, 3]);

        checkboxes.at(0).simulate('change', { target: { checked: false } });
        expect(getSelections(wrapper)).toEqual([]);
    });

    it('select by checkbox', () => {
        const wrapper = mount(createTable());
        const checkboxes = wrapper.find('input');
        const checkboxAll = checkboxes.first();

        checkboxAll.simulate('change', { target: { checked: true } });
        expect(getSelections(wrapper)).toEqual([0, 1, 2, 3]);

        checkboxes.at(1).simulate('change', { target: { checked: false } });
        expect(getSelections(wrapper)).toEqual([1, 2, 3]);

        checkboxes.at(1).simulate('change', { target: { checked: true } });
        expect(getSelections(wrapper)).toEqual([0, 1, 2, 3]);
    });

    it('fires change & select events', () => {
        const order = [];
        const handleChange = jest.fn().mockImplementation(() => {
            order.push('onChange');
        });
        const handleSelect = jest.fn().mockImplementation(() => {
            order.push('onSelect');
        });
        const rowSelection = {
            onChange: handleChange,
            onSelect: handleSelect,
        };
        const wrapper = mount(createTable({ rowSelection }));

        wrapper
            .find('input')
            .last()
            .simulate('change', { target: { checked: true } });

        expect(handleChange).toHaveBeenCalledWith(
            [3],
            [{ key: 3, name: 'Jerry' }]
        );
        expect(handleSelect.mock.calls.length).toBe(1);
        expect(handleSelect.mock.calls[0][0]).toEqual({
            key: 3,
            name: 'Jerry',
        });
        expect(handleSelect.mock.calls[0][1]).toEqual(true);
        expect(handleSelect.mock.calls[0][2]).toEqual([
            { key: 3, name: 'Jerry' },
        ]);
        expect(handleSelect.mock.calls[0][3].type).toBe('change');
        expect(order).toEqual(['onSelect', 'onChange']);
    });

    it('could hide selectAll checkbox and custom selection', () => {
        const rowSelection = {
            hideSelectAll: true,
        };
        const wrapper = mount(createTable({ rowSelection }));
        expect(wrapper.find('.selection').exists()).toBeFalsy();
    });

    it('handles disabled checkbox correctly when dataSource changes', () => {
        const rowSelection = {
            getCheckboxProps: (record) => ({ disabled: record.disabled }),
        };
        const wrapper = mount(createTable({ rowSelection }));
        const newData = [
            { key: 0, name: 'Jack', disabled: true },
            { key: 1, name: 'Lucy', disabled: true },
        ];
        wrapper.setProps({ dataSource: newData });
        wrapper.find('input').forEach((checkbox) => {
            expect(checkbox.props().disabled).toBe(true);
        });
    });

    it('highlight selected row', () => {
        const wrapper = mount(createTable());
        wrapper
            .find('input')
            .at(1)
            .simulate('change', { target: { checked: true } });
        expect(
            wrapper.find('tbody tr').at(0).hasClass('tableRowSelected')
        ).toBe(true);
    });

    it('fix selection column on the left', () => {
        const wrapper = mount(
            createTable({
                rowSelection: { fixed: true },
                scroll: { x: 903 },
            })
        );

        expect(wrapper.render()).toMatchSnapshot();
    });

    it('fix expand on th left when selection column fixed on the left', () => {
        const wrapper = mount(
            createTable({
                expandable: {
                    expandedRowRender() {
                        return <div />;
                    },
                },
                rowSelection: { fixed: true },
                scroll: { x: 903 },
            })
        );

        expect(wrapper.render()).toMatchSnapshot();
    });

    it('fix selection column on the left when any other column is fixed', () => {
        const wrapper = mount(
            createTable({
                rowSelection: {},
                columns: [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        fixed: 'left',
                    },
                ],
                scroll: { x: 903 },
            })
        );

        expect(wrapper.render()).toMatchSnapshot();
    });

    it('use column as selection column when key is `selection-column`', () => {
        const wrapper = mount(
            createTable({
                rowSelection: {},
                columns: [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'selection-column',
                    },
                ],
            })
        );

        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should keep all checked state when remove item from dataSource', () => {
        const wrapper = mount(
            <Table
                rowSelection={{
                    selectedRowKeys: [0, 1, 2, 3],
                }}
                columns={columns}
                dataSource={data}
            />
        );
        expect(wrapper.find(CheckBox).length).toBe(5);
        wrapper.find(CheckBox).forEach((checkbox) => {
            expect(checkbox.props().checked).toBe(true);
        });
        wrapper.setProps({
            dataSource: data.slice(1),
            rowSelection: {
                selectedRowKeys: [1, 2, 3],
            },
        });
        expect(wrapper.find(CheckBox).length).toBe(4);
        wrapper.find(CheckBox).forEach((checkbox) => {
            expect(checkbox.props().checked).toBe(true);
        });
    });

    it('add columnTitle for rowSelection', () => {
        const wrapper = mount(
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    columnTitle: '多选',
                }}
            />
        );
        expect(wrapper.find('thead tr th').at(0).text()).toBe('多选');
        wrapper.setProps({
            rowSelection: {
                type: 'radio',
                columnTitle: '单选',
            },
        });
        expect(wrapper.find('thead tr th').at(0).text()).toBe('单选');
    });

    it('select by checkbox to trigger stopPropagation', () => {
        const wrapper = mount(createTable());
        expect(() => {
            wrapper.find('span').at(10).simulate('click');
        }).not.toThrow();
    });

    describe('supports children', () => {
        const dataWithChildren = [
            { key: 0, name: 'Jack' },
            { key: 1, name: 'Lucy' },
            { key: 2, name: 'Tom' },
            {
                key: 3,
                name: 'Jerry',
                children: [
                    {
                        key: 4,
                        name: 'Jerry Jack',
                    },
                    {
                        key: 5,
                        name: 'Jerry Lucy',
                    },
                    {
                        key: 6,
                        name: 'Jerry Tom',
                        children: [
                            {
                                key: 7,
                                name: 'Jerry Tom Jack',
                            },
                            {
                                key: 8,
                                name: 'Jerry Tom Lucy',
                            },
                            {
                                key: 9,
                                name: 'Jerry Tom Tom',
                            },
                        ],
                    },
                ],
            },
        ];
        describe('supports checkStrictly', () => {
            it('should support `childrenColumnName`', () => {
                const onChange = jest.fn();

                const table = createTable({
                    dataSource: [
                        {
                            key: 0,
                            name: 'Jack',
                            childList: [
                                { key: 1, name: 'Light' },
                                { key: 2, name: 'Bamboo' },
                            ],
                        },
                    ],
                    expandable: {
                        childrenColumnName: 'childList',
                        defaultExpandAllRows: true,
                    },
                    rowSelection: {
                        checkStrictly: false,
                        onChange,
                    },
                });
                const wrapper = mount(table);
                const checkboxes = wrapper.find('input');
                expect(checkboxes).toHaveLength(1 + 3);

                checkboxes
                    .at(1)
                    .simulate('change', { target: { checked: true } });
                expect(getSelections(wrapper)).toEqual([0, 1, 2]);
            });
        });
    });

    describe('cache with selected keys', () => {
        it('default not cache', () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <Table
                    dataSource={[{ name: 'light' }, { name: 'bamboo' }]}
                    rowSelection={{ onChange }}
                    rowKey="name"
                />
            );

            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(
                ['light'],
                [{ name: 'light' }]
            );

            wrapper.setProps({ dataSource: [{ name: 'bamboo' }] });
            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(
                ['bamboo'],
                [{ name: 'bamboo' }]
            );
        });

        it('cache with preserveSelectedRowKeys', () => {
            const onChange = jest.fn();
            const wrapper = mount(
                <Table
                    dataSource={[{ name: 'light' }, { name: 'bamboo' }]}
                    rowSelection={{ onChange, preserveSelectedRowKeys: true }}
                    rowKey="name"
                />
            );

            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(
                ['light'],
                [{ name: 'light' }]
            );

            wrapper.setProps({ dataSource: [{ name: 'bamboo' }] });
            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(
                ['light', 'bamboo'],
                [{ name: 'light' }, { name: 'bamboo' }]
            );
        });

        it('works with receive selectedRowKeys fron [] to undefined', () => {
            const onChange = jest.fn();
            const dataSource = [{ name: 'Jack' }];
            const wrapper = mount(
                <Table
                    dataSource={dataSource}
                    rowSelection={{ onChange, selectedRowKeys: [0] }}
                    rowKey="name"
                />
            );

            wrapper.setProps({
                rowSelection: { onChange, selectedRowKeys: undefined },
            });
            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(['Jack'], [{ name: 'Jack' }]);
        });

        it('works with selectionType radio receive selectedRowKeys from [] to undefined', () => {
            const onChange = jest.fn();
            const dataSource = [{ name: 'Jack' }];
            const wrapper = mount(
                <Table
                    dataSource={dataSource}
                    rowSelection={{
                        onChange,
                        selectedRowKeys: [0],
                        type: 'radio',
                    }}
                    rowKey="name"
                />
            );

            wrapper.setProps({
                rowSelection: {
                    onChange,
                    selectedRowKeys: undefined,
                    type: 'radio',
                },
            });
            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(['Jack'], [{ name: 'Jack' }]);
        });

        it('selectedRows and selectedKeys should keep sync in initial state', () => {
            const dataSource = [
                { name: 'Jack' },
                { name: 'Tom' },
                { name: 'Lucy' },
                { name: 'John' },
            ];
            const onChange = jest.fn();
            const rowSelection = {
                preserveSelectedRowKeys: true,
                onChange,
                selectedRowKeys: ['Jack'],
            };
            const wrapper = mount(
                <Table
                    dataSource={dataSource.slice(0, 2)}
                    rowSelection={rowSelection}
                    rowKey="name"
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                    ]}
                />
            );

            wrapper.setProps({
                dataSource: dataSource.slice(2, 4),
            });
            wrapper
                .find('tbody input')
                .first()
                .simulate('change', { target: { checked: true } });
            expect(onChange).toHaveBeenCalledWith(
                ['Jack', 'Lucy'],
                [{ name: 'Jack' }, { name: 'Lucy' }]
            );
        });
    });
});
