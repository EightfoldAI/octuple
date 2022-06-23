import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '..';
import { Tooltip } from '../../Tooltip';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.filter', () => {
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

    window.requestAnimationFrame = (callback) =>
        window.setTimeout(callback, 16);
    window.cancelAnimationFrame = window.clearTimeout;

    const filterFn = (value, record) => record.name.indexOf(value) !== -1;
    const column = {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            { text: 'Boy', value: 'boy' },
            { text: 'Girl', value: 'girl' },
            {
                text: 'Title',
                value: 'title',
                children: [
                    { text: 'Designer', value: 'designer' },
                    { text: 'Coder', value: 'coder' },
                ],
            },
        ],
        onFilter: filterFn,
    };

    const data = [
        { key: 0, name: 'Jack' },
        { key: 1, name: 'Lucy' },
        { key: 2, name: 'Tom' },
        { key: 3, name: 'Jerry' },
    ];

    const longData = [];
    for (let i = 0; i < 100; i += 1) {
        longData.push({
            key: i.toString(),
            name: 'name',
        });
    }

    function createTable(props) {
        return (
            <Table
                columns={[column]}
                dataSource={data}
                pagination={false}
                {...props}
            />
        );
    }

    function renderedNames(wrapper) {
        return wrapper.find('BodyRow').map((row) => row.props().record.name);
    }

    it('not show filter icon when undefined', () => {
        const noFilterColumn = { ...column, filters: undefined };
        delete noFilterColumn.onFilter;
        const wrapper = mount(
            createTable({
                columns: [noFilterColumn],
            })
        );

        expect(wrapper.find('.table-filter-column')).toHaveLength(0);
    });

    it('not show filter icon when filter and filterDropdown is undefined', () => {
        const noFilterColumn = {
            ...column,
            filters: undefined,
            filterDropdown: undefined,
        };
        delete noFilterColumn.onFilter;
        const wrapper = mount(
            createTable({
                columns: [noFilterColumn],
            })
        );

        expect(wrapper.find('.table-filter-column')).toHaveLength(0);
    });

    it('renders filter correctly', () => {
        const wrapper = mount(createTable());

        expect(wrapper.render()).toMatchSnapshot();
    });

    it('can be controlled by filteredValue', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        filteredValue: ['Lucy'],
                    },
                ],
            })
        );

        expect(wrapper.find('tbody tr').length).toBe(1);
        wrapper.setProps({
            columns: [
                {
                    ...column,
                    filteredValue: [],
                },
            ],
        });
        expect(wrapper.find('tbody tr').length).toBe(4);
    });

    it('should handle filteredValue and non-array filterValue as expected', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        filteredValue: ['Lucy', 12, true],
                    },
                ],
            })
        );
        function getFilterMenu() {
            return wrapper.find('FilterDropdown');
        }

        expect(getFilterMenu().props().filterState.filteredKeys).toEqual([
            'Lucy',
            '12',
            'true',
        ]);

        wrapper.setProps({
            columns: [
                {
                    ...column,
                    filteredValue: null,
                },
            ],
        });
        expect(getFilterMenu().props().filterState.filteredKeys).toEqual(null);
    });

    it('can be controlled by filteredValue null', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        filteredValue: ['Lucy'],
                    },
                ],
            })
        );

        expect(wrapper.find('tbody tr').length).toBe(1);
        wrapper.setProps({
            columns: [
                {
                    ...column,
                    filteredValue: null,
                },
            ],
        });
        expect(wrapper.find('tbody tr').length).toBe(4);
    });

    it('can read defaults from defaultFilteredValue', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        defaultFilteredValue: ['Lucy'],
                    },
                ],
            })
        );
        expect(wrapper.find('tbody tr').length).toBe(1);
        expect(wrapper.find('tbody tr').text()).toBe('Lucy');

        // Should properly ignore further defaultFilteredValue changes
        wrapper.setProps({
            columns: [
                {
                    ...column,
                    defaultFilteredValue: [],
                },
            ],
        });
        expect(wrapper.find('tbody tr').length).toBe(1);
        expect(wrapper.find('tbody tr').text()).toBe('Lucy');

        // Should properly be overidden by non-null filteredValue
        wrapper.setProps({
            columns: [
                {
                    ...column,
                    defaultFilteredValue: ['Lucy'],
                    filteredValue: ['Tom'],
                },
            ],
        });
        expect(wrapper.find('tbody tr').length).toBe(1);
        expect(wrapper.find('tbody tr').text()).toBe('Tom');

        // Should properly be overidden by a null filteredValue
        wrapper.setProps({
            columns: [
                {
                    ...column,
                    defaultFilteredValue: ['Lucy'],
                    filteredValue: null,
                },
            ],
        });
        expect(wrapper.find('tbody tr').length).toBe(4);
    });

    it('works with grouping columns in controlled mode', () => {
        const columns = [
            {
                title: 'group',
                key: 'group',
                children: [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        filters: [
                            { text: 'Jack', value: 'Jack' },
                            { text: 'Lucy', value: 'Lucy' },
                        ],
                        onFilter: filterFn,
                        filteredValue: ['Jack'],
                    },
                    {
                        title: 'Age',
                        dataIndex: 'age',
                        key: 'age',
                    },
                ],
            },
        ];
        const testData = [
            { key: 0, name: 'Jack', age: 11 },
            { key: 1, name: 'Lucy', age: 20 },
            { key: 2, name: 'Tom', age: 21 },
            { key: 3, name: 'Jerry', age: 22 },
        ];
        const wrapper = mount(
            <Table columns={columns} dataSource={testData} />
        );

        expect(renderedNames(wrapper)).toEqual(['Jack']);
    });

    it('renders custom filter icon as string correctly', () => {
        const filterIcon = () => 'string';
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        filterIcon,
                    },
                ],
            })
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('renders custom filter icon with right Tooltip title', () => {
        const filterIcon = () => (
            <Tooltip title="title" visible>
                Tooltip
            </Tooltip>
        );
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        ...column,
                        filterIcon,
                    },
                ],
            })
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('pass visible prop to filterDropdown', () => {
        const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
        const filterDropdown = (...args) => filterDropdownMock(...args);

        const Test = () => (
            <Table
                rowKey="name"
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        filterDropdown,
                    },
                ]}
                dataSource={[
                    {
                        name: 'Jack',
                    },
                ]}
            />
        );

        mount(<Test />);
        expect(filterDropdownMock).toHaveBeenCalledWith(
            expect.objectContaining({
                visible: false,
            })
        );
    });

    it('should not crash', () => {
        class TestTable extends React.Component {
            state = {
                cols: [],
            };

            componentDidMount() {
                this.setState({
                    cols: [
                        {
                            title: 'test',
                            itemKey: 'test',
                            filterDropdown: 123,
                        },
                    ],
                });
            }

            render() {
                const { cols } = this.state;
                return (
                    <Table
                        columns={cols}
                        dataSource={[]}
                        scroll={{ x: 1000 }}
                    />
                );
            }
        }

        mount(<TestTable />);
    });

    it('with onFilter', () => {
        const onFilter = jest.fn((value, record) => record.key === value);
        const columns = [{ dataIndex: 'key', filteredValue: [5], onFilter }];
        const testData = [{ key: 1 }, { key: 3 }, { key: 5 }];
        const wrapper = mount(
            <Table columns={columns} dataSource={testData} />
        );

        expect(onFilter).toHaveBeenCalled();
        expect(wrapper.find('tbody tr')).toHaveLength(1);
    });

    it('jsx work', () => {
        const wrapper = mount(
            <Table dataSource={data}>
                <Table.Column
                    title="Name"
                    dataIndex="name"
                    filters={[
                        { text: 'Jack', value: 'Jack' },
                        { text: 'Lucy', value: 'Lucy' },
                    ]}
                    onFilter={(value, record) => record.name.includes(value)}
                    defaultFilteredValue={['Jack']}
                />
            </Table>
        );

        expect(wrapper.find('tbody tr')).toHaveLength(1);
        expect(wrapper.find('tbody tr td').text()).toEqual('Jack');
    });
});
