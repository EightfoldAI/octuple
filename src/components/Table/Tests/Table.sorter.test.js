/* eslint-disable react/no-multi-comp */
import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { eventKeys } from '../../../shared/eventKeys';
import Table from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.sorter', () => {
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

    const sorterFn = (a, b) => a.name[0].charCodeAt() - b.name[0].charCodeAt();

    const column = {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: sorterFn,
    };

    const data = [
        { key: 0, name: 'Jack' },
        { key: 1, name: 'Lucy' },
        { key: 2, name: 'Tom' },
        { key: 3, name: 'Jerry' },
    ];

    function createTable(tableProps, columnProps = {}) {
        return (
            <Table
                columns={[
                    {
                        ...column,
                        ...columnProps,
                    },
                ]}
                dataSource={data}
                pagination={false}
                {...tableProps}
            />
        );
    }

    function renderedNames(wrapper) {
        return wrapper.find('BodyRow').map((row) => row.props().record.name);
    }

    it('renders sorter icon correctly', () => {
        const wrapper = render(createTable());
        expect(wrapper.find('thead')).toMatchSnapshot();
    });

    it('default sort order ascend', () => {
        const wrapper = mount(
            createTable(
                {},
                {
                    defaultSortOrder: 'ascend',
                }
            )
        );

        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Jerry',
            'Lucy',
            'Tom',
        ]);
    });

    it('default sort order descend', () => {
        const wrapper = mount(
            createTable(
                {},
                {
                    defaultSortOrder: 'descend',
                }
            )
        );

        const getNameColumn = () => wrapper.find('th').at(0);

        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');
    });

    it('should change aria-sort when default sort order is set to descend', () => {
        const wrapper = mount(
            createTable(
                {
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    defaultSortOrder: 'descend',
                }
            )
        );

        const getNameColumn = () => wrapper.find('th').at(0);

        // Test that it cycles through the order of sortDirections
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        wrapper.find('.tableColumnSorters').simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        wrapper.find('.tableColumnSorters').simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('sort records', () => {
        const wrapper = mount(createTable());

        const getNameColumn = () => wrapper.find('th').at(0);

        // first assert default state
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Lucy',
            'Tom',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);

        // ascend
        wrapper.find('.tableColumnSorters').simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Jerry',
            'Lucy',
            'Tom',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        // descend
        wrapper.find('.tableColumnSorters').simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');
    });

    it('sort records with keydown', () => {
        const wrapper = mount(createTable());

        // ascend
        wrapper
            .find('.tableColumnHasSorters')
            .simulate('keydown', { key: eventKeys.ENTER });
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Jerry',
            'Lucy',
            'Tom',
        ]);

        // descend
        wrapper
            .find('.tableColumnHasSorters')
            .simulate('keydown', { key: eventKeys.ENTER });
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
    });

    describe('can be controlled by sortOrder', () => {
        it('single', () => {
            const wrapper = mount(
                createTable({
                    columns: [{ ...column, sortOrder: 'ascend' }],
                })
            );
            expect(renderedNames(wrapper)).toEqual([
                'Jack',
                'Jerry',
                'Lucy',
                'Tom',
            ]);
        });

        it('invalidate mix with single & multiple sorters', () => {
            const wrapper = mount(
                createTable({
                    columns: [
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            sortOrder: 'ascend',
                            sorter: {
                                multiple: 1,
                            },
                        },
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            sortOrder: 'ascend',
                            sorter: {},
                        },
                    ],
                })
            );

            expect(renderedNames(wrapper)).toEqual([
                'Jack',
                'Lucy',
                'Tom',
                'Jerry',
            ]);
        });
    });

    it('provides sortOrder in the sorterFn', () => {
        let actualSortOrder;
        mount(
            createTable(
                {},
                {
                    sortOrder: 'ascend',
                    sorter: (a, b, sortOrder) => {
                        actualSortOrder = sortOrder;
                        return sorterFn(a, b);
                    },
                }
            )
        );
        expect(actualSortOrder).toEqual('ascend');
    });

    it('can update column sortOrder', () => {
        const wrapper = mount(
            createTable({
                columns: [column],
            })
        );
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Lucy',
            'Tom',
            'Jerry',
        ]);
        wrapper.setProps({
            columns: [{ ...column, sortOrder: 'ascend' }],
        });
        wrapper.update();
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Jerry',
            'Lucy',
            'Tom',
        ]);
    });

    it('fires change event', () => {
        const handleChange = jest.fn();
        const wrapper = mount(createTable({ onChange: handleChange }));

        // ascent
        wrapper.find('.tableColumnSorters').simulate('click');
        const sorter1 = handleChange.mock.calls[0][2];
        expect(sorter1.column.dataIndex).toBe('name');
        expect(sorter1.order).toBe('ascend');
        expect(sorter1.field).toBe('name');
        expect(sorter1.columnKey).toBe('name');

        wrapper.find('.tableColumnSorters').simulate('click');
        const sorter2 = handleChange.mock.calls[1][2];
        expect(sorter2.column.dataIndex).toBe('name');
        expect(sorter2.order).toBe('descend');
        expect(sorter2.field).toBe('name');
        expect(sorter2.columnKey).toBe('name');

        wrapper.find('.tableColumnSorters').simulate('click');
        const sorter3 = handleChange.mock.calls[2][2];
        expect(sorter3.column).toBe(undefined);
        expect(sorter3.order).toBe(undefined);
        expect(sorter3.field).toBe('name');
        expect(sorter3.columnKey).toBe('name');
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
                        sorter: sorterFn,
                        sortOrder: 'descend',
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

        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
    });

    it('Allow column title as render props with sortOrder argument', () => {
        const title = ({ sortOrder }) => (
            <div className="custom-title">{sortOrder}</div>
        );
        const columns = [
            {
                title,
                key: 'group',
                sorter: true,
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
        expect(wrapper.find('.custom-title').text()).toEqual('');
        wrapper.find('.tableColumnSorters').simulate('click');
        expect(wrapper.find('.custom-title').text()).toEqual('ascend');
        wrapper.find('.tableColumnSorters').simulate('click');
        expect(wrapper.find('.custom-title').text()).toEqual('descend');
    });

    it('should sort from beginning state when toggle from different columns', () => {
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
                sorter: true,
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

        const getNameColumn = () =>
            wrapper.find('.tableColumnHasSorters').at(0);
        const getAgeColumn = () => wrapper.find('.tableColumnHasSorters').at(1);

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');
        expect(getAgeColumn().prop('aria-sort')).toEqual(undefined);

        // sort age
        getAgeColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
        expect(getAgeColumn().prop('aria-sort')).toEqual('ascending');
    });

    it('should toggle sort state when columns are put in render', () => {
        const testData = [
            { key: 0, name: 'Jack', age: 11 },
            { key: 1, name: 'Lucy', age: 20 },
            { key: 2, name: 'Tom', age: 21 },
            { key: 3, name: 'Jerry', age: 22 },
        ];
        class TableTest extends React.Component {
            state = {
                pagination: {},
            };

            onChange = (pagination) => {
                this.setState({ pagination });
            };

            render() {
                const columns = [
                    {
                        title: 'name',
                        dataIndex: 'name',
                        sorter: true,
                    },
                ];
                const { pagination } = this.state;
                return (
                    <Table
                        columns={columns}
                        pagination={pagination}
                        dataSource={testData}
                        onChange={this.onChange}
                    />
                );
            }
        }

        const wrapper = mount(<TableTest />);

        const getNameColumn = () => wrapper.find('th').at(0);

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should toggle sort state when columns with non primitive properties are put in render', () => {
        const testData = [
            { key: 0, name: 'Jack', age: 11 },
            { key: 1, name: 'Lucy', age: 20 },
            { key: 2, name: 'Tom', age: 21 },
            { key: 3, name: 'Jerry', age: 22 },
        ];
        class TableTest extends React.Component {
            state = {
                pagination: {},
            };

            onChange = (pagination) => {
                this.setState({ pagination });
            };

            render() {
                const columns = [
                    {
                        title: 'name',
                        dataIndex: 'name',
                        sorter: true,
                        render: (text) => text,
                        array: ['1', '2', 3],
                    },
                ];
                const { pagination } = this.state;
                return (
                    <Table
                        columns={columns}
                        pagination={pagination}
                        dataSource={testData}
                        onChange={this.onChange}
                    />
                );
            }
        }

        const wrapper = mount(<TableTest />);

        const getNameColumn = () => wrapper.find('th').at(0);

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // sort name
        getNameColumn().simulate('click');
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should toggle sort state when columns with key are put in render', () => {
        const testData = [
            { key: 0, name: 'Jack', age: 11 },
            { key: 1, name: 'Lucy', age: 20 },
            { key: 2, name: 'Tom', age: 21 },
            { key: 3, name: 'Jerry', age: 22 },
        ];
        class TableTest extends React.Component {
            state = {
                pagination: {},
            };

            onChange = (pagination) => {
                this.setState({ pagination });
            };

            render() {
                const columns = [
                    {
                        title: 'name',
                        dataIndex: 'name',
                        sorter: true,
                        key: 'a',
                        style: {
                            fontSize: 18,
                        },
                    },
                ];
                const { pagination } = this.state;
                return (
                    <Table
                        columns={columns}
                        pagination={pagination}
                        dataSource={testData}
                        onChange={this.onChange}
                    />
                );
            }
        }

        const wrapper = mount(<TableTest />);
        const getNameColumn = () => wrapper.find('th').at(0);
        expect(
            getNameColumn()
                .find('.tableColumnSorterUp')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(
            getNameColumn()
                .find('.tableColumnSorterDown')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);

        // sort name
        getNameColumn().simulate('click');
        expect(
            getNameColumn()
                .find('.tableColumnSorterUp')
                .at(0)
                .hasClass('active')
        ).toBeTruthy();
        expect(
            getNameColumn()
                .find('.tableColumnSorterDown')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        // sort name
        getNameColumn().simulate('click');
        expect(
            getNameColumn()
                .find('.tableColumnSorterUp')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(
            getNameColumn()
                .find('.tableColumnSorterDown')
                .at(0)
                .hasClass('active')
        ).toBeTruthy();
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // sort name
        getNameColumn().simulate('click');
        expect(
            getNameColumn()
                .find('.tableColumnSorterUp')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(
            getNameColumn()
                .find('.tableColumnSorterDown')
                .at(0)
                .hasClass('active')
        ).toBeFalsy();
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should first sort by descend, then ascend, then cancel sort', () => {
        const wrapper = mount(
            createTable({
                sortDirections: ['descend', 'ascend'],
            })
        );
        const getNameColumn = () => wrapper.find('th').at(0);

        // descend
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // ascend
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Jerry',
            'Lucy',
            'Tom',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('ascending');

        // cancel sort
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Lucy',
            'Tom',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should first sort by descend, then cancel sort', () => {
        const wrapper = mount(
            createTable({
                sortDirections: ['descend'],
            })
        );

        const getNameColumn = () => wrapper.find('th').at(0);

        // default
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);

        // descend
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // cancel sort
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Lucy',
            'Tom',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should first sort by descend, then cancel sort. (column prop)', () => {
        const wrapper = mount(
            createTable(
                {},
                {
                    sortDirections: ['descend'],
                }
            )
        );

        const getNameColumn = () => wrapper.find('th').at(0);

        // default
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);

        // descend
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Tom',
            'Lucy',
            'Jack',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual('descending');

        // cancel sort
        getNameColumn().simulate('click');
        expect(renderedNames(wrapper)).toEqual([
            'Jack',
            'Lucy',
            'Tom',
            'Jerry',
        ]);
        expect(getNameColumn().prop('aria-sort')).toEqual(undefined);
    });

    it('should support onHeaderCell in sort column', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <Table
                columns={[
                    {
                        title: 'title',
                        onHeaderCell: () => ({ onClick }),
                        sorter: true,
                    },
                ]}
            />
        );
        wrapper.find('th').simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    it('should not being inifinite loop when using Table.Column with sortOrder', () => {
        class Demo extends React.Component {
            componentDidMount() {
                this.setState({});
            }

            render() {
                return (
                    <Table dataSource={[]}>
                        <Table.Column
                            title="Age"
                            dataIndex="age"
                            sorter
                            sortOrder="ascend"
                            key="age"
                        />
                    </Table>
                );
            }
        }
        expect(() => {
            mount(<Demo />);
        }).not.toThrow();
    });

    it('should support defaultOrder in Column', () => {
        const wrapper = mount(
            <Table dataSource={[{ key: '1', age: 1 }]}>
                <Table.Column
                    title="Age"
                    dataIndex="age"
                    sorter
                    defaultSortOrder="ascend"
                    key="age"
                />
            </Table>
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('invalidate sorter should not display sorter button', () => {
        const wrapper = mount(
            <Table
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        sorter: false,
                    },
                    {
                        title: 'Age',
                        dataIndex: 'age',
                        key: 'age',
                        sorter: null,
                    },
                    {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                        sorter: undefined,
                    },
                ]}
            />
        );

        expect(wrapper.find('.tableColumnSorterInner')).toHaveLength(0);
    });

    it('table with sugar column', () => {
        const wrapper = mount(
            <Table>
                <Table.Column
                    title="Chinese Score"
                    dataIndex="chinese"
                    sorter={{
                        compare: (a, b) => a.chinese - b.chinese,
                        multiple: 3,
                    }}
                />
                <Table.Column
                    title="Math Score"
                    dataIndex="math"
                    sorter={{
                        compare: (a, b) => a.math - b.math,
                        multiple: 2,
                    }}
                />
            </Table>
        );

        wrapper.find('th').first().simulate('click');

        expect(wrapper.find('th.tableColumnSort')).toHaveLength(1);
    });

    it('surger should support sorterOrder', () => {
        const wrapper = mount(
            <Table>
                <Table.Column
                    key="name"
                    title="Name"
                    dataIndex="name"
                    sortOrder="ascend"
                    sorter
                />
            </Table>
        );

        expect(
            wrapper.find('.tableColumnSorterUp').last().hasClass('active')
        ).toBeTruthy();
        expect(
            wrapper.find('.tableColumnSorterDown').last().hasClass('active')
        ).toBeFalsy();
    });

    it('onChange with correct sorter for multiple', () => {
        const groupColumns = [
            {
                title: 'Math Score',
                dataIndex: 'math',
                sorter: { multiple: 1 },
            },
            {
                title: 'English Score',
                dataIndex: 'english',
                sorter: { multiple: 2 },
            },
        ];

        const groupData = [
            {
                key: '1',
                name: 'John Brown',
                chinese: 98,
                math: 60,
                english: 70,
            },
        ];

        const onChange = jest.fn();
        const wrapper = mount(
            <Table
                columns={groupColumns}
                data={groupData}
                onChange={onChange}
            />
        );

        function clickToMatchExpect(index, sorter) {
            wrapper.find('.tableColumnSorters').at(index).simulate('click');

            expect(onChange).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                expect.objectContaining(sorter),
                expect.anything()
            );

            onChange.mockReset();
        }

        // First
        clickToMatchExpect(0, { field: 'math', order: 'ascend' });
        clickToMatchExpect(0, { field: 'math', order: 'descend' });
        clickToMatchExpect(0, { field: 'math', order: undefined });

        // Last
        clickToMatchExpect(1, { field: 'english', order: 'ascend' });
        clickToMatchExpect(1, { field: 'english', order: 'descend' });
        clickToMatchExpect(1, { field: 'english', order: undefined });
    });
});
