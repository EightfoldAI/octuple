import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable, { INTERNAL_COL_DEFINE } from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.Basic', () => {
    const data = [
        { key: 'key0', name: 'Lucy' },
        { key: 'key1', name: 'Jack' },
    ];
    const createTable = (props) => {
        const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }];

        return (
            <OcTable
                columns={columns}
                data={data}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
                {...props}
            />
        );
    };

    describe('renders correctly', () => {
        it('basic', () => {
            const wrapper = mount(
                createTable({
                    classNames: 'test-class-name',
                })
            );
            expect(wrapper.render()).toMatchSnapshot();
        });

        it('RTL', () => {
            const wrapper = mount(
                createTable({
                    classNames: 'test-class-name',
                    direction: 'rtl',
                })
            );
            expect(wrapper.render()).toMatchSnapshot();
        });

        it('no columns', () => {
            const wrapper = mount(createTable({ columns: [] }));
            expect(wrapper.render()).toMatchSnapshot();
        });

        it('column children undefined', () => {
            const wrapper = mount(
                createTable({
                    columns: [
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            children: [],
                        },
                        {
                            title: 'Age',
                            dataIndex: 'age',
                            key: 'age',
                            children: undefined,
                        },
                    ],
                })
            );
            expect(wrapper.render()).toMatchSnapshot();
            expect(wrapper.find('th').at(0).text()).toEqual('Name');
            expect(wrapper.find('th').at(1).text()).toEqual('Age');
        });

        it('falsy columns', () => {
            const wrapper = mount(
                createTable({
                    columns: [
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            children: [],
                        },
                        false,
                    ],
                })
            );
            expect(wrapper.render()).toMatchSnapshot();
        });
    });

    describe('renders empty text correctly', () => {
        it('ReactNode', () => {
            const wrapper = mount(
                createTable({ data: [], emptyText: 'No data' })
            );
            expect(
                wrapper.find('.tablePlaceholder').hostNodes().text()
            ).toEqual('No data');
        });

        it('renderProps', () => {
            const wrapper = mount(
                createTable({ data: [], emptyText: () => 'No data' })
            );
            expect(
                wrapper.find('.tablePlaceholder').hostNodes().text()
            ).toEqual('No data');
        });

        it('effect update', () => {
            const App = () => {
                const [emptyText, setEmptyText] = React.useState('light');
                React.useEffect(() => {
                    setEmptyText('bamboo');
                }, []);
                return (
                    <OcTable
                        emptyText={emptyText}
                        expandable={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                    />
                );
            };
            const wrapper = mount(<App />);
            wrapper.update();
            expect(
                wrapper.find('.tablePlaceholder').hostNodes().text()
            ).toEqual('bamboo');
        });
    });

    it('renders without header', () => {
        const wrapper = mount(createTable({ showHeader: false }));
        expect(wrapper.find('thead').length).toBeFalsy();
    });

    it('renders fixed header correctly', () => {
        const wrapper = mount(createTable({ scroll: { y: 100 } }));
        expect(wrapper.find('.tableHeader').length).toBeTruthy();
    });

    it('renders title correctly', () => {
        const wrapper = mount(createTable({ title: () => <p>title</p> }));
        expect(wrapper.find('.tableTitle').hostNodes().text()).toEqual('title');
    });

    it('renders footer correctly', () => {
        const wrapper = mount(createTable({ footer: () => <p>footer</p> }));
        expect(wrapper.find('.tableFooter').hostNodes().text()).toEqual(
            'footer'
        );
    });

    it('renders with id correctly', () => {
        const testId = 'test-identifier';
        const wrapper = mount(createTable({ id: testId }));
        expect(wrapper.find(`div#${testId}`).length).toBeTruthy();
    });

    it('renders data- &  aria- attributes', () => {
        const miscProps = {
            'data-test': 'names-table',
            'aria-label': 'names-table-aria',
        };
        const wrapper = mount(createTable(miscProps));
        const props = wrapper.find('div.table').props();
        expect(props).toEqual(expect.objectContaining(miscProps));
    });

    describe('rowKey', () => {
        it('uses record.key', () => {
            const wrapper = mount(createTable());
            expect(wrapper.find('BodyRow').at(0).key()).toBe('key0');
            expect(wrapper.find('BodyRow').at(1).key()).toBe('key1');
        });

        it('sets by rowKey', () => {
            const wrapper = mount(createTable({ rowKey: 'name' }));
            expect(wrapper.find('BodyRow').at(0).key()).toBe('Lucy');
            expect(wrapper.find('BodyRow').at(1).key()).toBe('Jack');
        });

        it('sets by rowKey function', () => {
            const wrapper = mount(
                createTable({ rowKey: (record) => `${record.key}1` })
            );
            expect(wrapper.find('BodyRow').at(0).key()).toBe('key01');
            expect(wrapper.find('BodyRow').at(1).key()).toBe('key11');
        });
    });

    it('renders tableLayout', () => {
        const wrapper = mount(createTable({ tableLayout: 'fixed' }));
        expect(wrapper.find('table').props().style.tableLayout).toEqual(
            'fixed'
        );
        expect(wrapper.find('.table-layout-fixed').exists()).toBeTruthy();
    });

    it('renders ellipsis', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    { title: 'title', ellipsis: true },
                    {
                        title: 'node title',
                        ellipsis: true,
                        render: () => <h1>233</h1>,
                    },
                ],
            })
        );

        wrapper.find('td').forEach((td) => {
            expect(td.hasClass('tableCellEllipsis')).toBeTruthy();
        });
    });

    it('renders ellipsis by showTitle option', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    { title: 'title', ellipsis: { showTitle: true } },
                    {
                        title: 'node title',
                        ellipsis: { showTitle: true },
                        render: () => <h1>233</h1>,
                    },
                ],
            })
        );

        wrapper.find('td').forEach((td) => {
            expect(td.hasClass('tableCellEllipsis')).toBeTruthy();
        });
    });

    it('not renders ellipsis origin html title', () => {
        const columns = [
            { title: 'title', ellipsis: { showTitle: false } },
            {
                title: 'node title',
                ellipsis: { showTitle: false },
                render: () => <h1>233</h1>,
            },
        ];
        const wrapper = mount(
            createTable({
                columns,
            })
        );

        wrapper.find('.table-thead th').forEach((td) => {
            expect(
                td.getDOMNode().attributes.getNamedItem('title')
            ).toBeTruthy();
        });

        wrapper.find('.table-tbody td').forEach((td) => {
            expect(
                td.getDOMNode().attributes.getNamedItem('title')
            ).toBeFalsy();
        });
    });

    it('renders column correctly', () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                classNames: 'name-class',
                width: 100,
            },
        ];
        const wrapper = mount(createTable({ columns }));
        wrapper.find('td').forEach((td, index) => {
            expect(td.hasClass('name-class')).toBeTruthy();
            expect(td.text()).toEqual(['Lucy', 'Jack'][index]);
        });

        expect(wrapper.find('col').props().style).toEqual(
            expect.objectContaining({ width: 100 })
        );
    });

    it('renders custom cell correctly', () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text) => <p>!!!{text}!!!</p>,
            },
        ];
        const wrapper = mount(createTable({ columns }));
        wrapper.find('td').forEach((td, index) => {
            expect(td.text()).toEqual(['!!!Lucy!!!', '!!!Jack!!!'][index]);
        });
    });

    describe('dataIndex', () => {
        it("pass record to render when it's falsy", () => {
            [null, undefined, '', []].forEach((dataIndex) => {
                const cellRender = jest.fn();
                const columns = [
                    {
                        title: 'Name',
                        dataIndex,
                        key: 'name',
                        render: cellRender,
                    },
                ];
                mount(createTable({ columns }));
                expect(cellRender).toHaveBeenCalledWith(data[0], data[0], 0);
            });
        });

        it('render text by path', () => {
            const columns = [
                { title: 'First Name', dataIndex: ['name', 'first'], key: 'a' },
                { title: 'Last Name', dataIndex: ['name', 'last'], key: 'b' },
            ];
            const localData = [
                { key: 'key0', name: { first: 'John', last: 'Doe' } },
                { key: 'key1', name: { first: 'Terry', last: 'Garner' } },
            ];
            const wrapper = mount(createTable({ columns, data: localData }));

            const targetData = [
                ['John', 'Doe'],
                ['Terry', 'Garner'],
            ];

            wrapper.find('tbody tr').forEach((tr, ri) => {
                tr.find('td').forEach((td, di) => {
                    expect(td.text()).toEqual(targetData[ri][di]);
                });
            });
        });
    });

    it('render empty cell if text is empty object', () => {
        const localData = [
            { key: 'key0', name: {} },
            { key: 'key1', name: 'Jack' },
        ];
        const wrapper = mount(createTable({ data: localData }));
        expect(wrapper.find('table td').first().text()).toBe('');
    });

    it('renders colSpan correctly', () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'firstName',
                key: 'firstName',
                colSpan: 2,
                render: (text, record, index) => {
                    const obj = {
                        children: text,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.colSpan = 2;
                    }
                    return obj;
                },
            },
            {
                title: '',
                dataIndex: 'lastName',
                key: 'lastName',
                colSpan: 0,
                render: (text, record, index) => {
                    const obj = {
                        children: text,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                },
            },
        ];
        const localData = [
            { key: 'key0', firstName: 'John', lastName: 'Doe' },
            { key: 'key1', firstName: 'Terry', lastName: 'Garner' },
        ];
        const wrapper = mount(createTable({ columns, data: localData }));
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('render with style & className & data-*', () => {
        const columns = [
            {
                dataIndex: 'key',
                render: (text) => ({
                    props: {
                        style: { background: 'red' },
                        classNames: 'customize-render',
                        'data-light': 'bamboo',
                    },
                    children: text,
                }),
            },
        ];

        const wrapper = mount(
            <OcTable
                columns={columns}
                data={[{ key: '' }]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );
        const props = wrapper.find('td').props();
        expect(props.style).toEqual(
            expect.objectContaining({ background: 'red' })
        );
        expect(props.className.includes('customize-render')).toBeTruthy();
        expect(props['data-light']).toEqual('bamboo');
    });

    it('renders rowSpan correctly', () => {
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
                render: (text, record, index) => {
                    const obj = {
                        children: text,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 2;
                    } else {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            },
        ];
        const localData = [
            { key: 'key0', firstName: 'John', lastName: 'Doe' },
            { key: 'key1', firstName: 'Terry', lastName: 'Garner' },
        ];
        const wrapper = mount(createTable({ columns, data: localData }));
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('renders correctly RowClassName as string', () => {
        const wrapper = mount(
            createTable({
                rowClassName: 'test-row-class-name-asStr',
            })
        );

        wrapper.find('tbody tr').forEach((tr) => {
            expect(tr.hasClass('test-row-class-name-asStr')).toBeTruthy();
        });
        expect(wrapper.find('tbody tr').length).toBeTruthy();
    });

    it('renders correctly RowClassName as function', () => {
        const wrapper = mount(
            createTable({
                rowClassName: () => 'test-row-class-name-asFn',
            })
        );

        wrapper.find('tbody tr').forEach((tr) => {
            expect(tr.hasClass('test-row-class-name-asFn')).toBeTruthy();
        });
        expect(wrapper.find('tbody tr').length).toBeTruthy();
    });

    describe('onRow', () => {
        it('renders onRow correctly', () => {
            const onRow = (record, index) => ({
                id: `row-${record.key}`,
                index,
            });
            const wrapper = mount(createTable({ onRow }));

            expect(wrapper.find('tbody tr').length).toBeTruthy();
            wrapper.find('tbody tr').forEach((tr, index) => {
                expect(tr.props().id).toEqual(`row-${data[index].key}`);
                expect(tr.simulate.bind(tr, 'click')).not.toThrowError();
            });
        });

        it('onRow should keep update', () => {
            const Test = () => {
                const [count, setCount] = React.useState(0);

                return (
                    <div>
                        <OcTable
                            columns={[{ dataIndex: 'key' }]}
                            data={[{ key: 0 }]}
                            expandable={{
                                expandIcon: () => (
                                    <div className="expand-icon" />
                                ),
                            }}
                            onRow={() => ({
                                onClick() {
                                    setCount(count + 1);
                                },
                            })}
                        />
                        <span id="count">{count}</span>
                    </div>
                );
            };
            const wrapper = mount(<Test />);
            for (let i = 0; i < 10; i += 1) {
                wrapper.find('tbody tr td').last().simulate('click');
                expect(wrapper.find('#count').text()).toEqual(String(i + 1));
            }
        });
    });

    it('renders column.onCell correctly', () => {
        const onCell = (record) => ({
            id: `cell-${record.name}`,
        });
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', onCell },
        ];
        const wrapper = mount(createTable({ columns }));

        expect(wrapper.find('tbody td')).toHaveLength(2);
        wrapper.find('tbody td').forEach((td, index) => {
            expect(td.props().id).toEqual(`cell-${data[index].name}`);
        });
    });

    it('renders onHeaderRow correctly', () => {
        const onHeaderRow = jest.fn((columns, index) => ({
            id: `header-row-${index}`,
        }));
        const wrapper = mount(createTable({ onHeaderRow }));

        expect(wrapper.find('thead tr').props().id).toEqual('header-row-0');
        expect(onHeaderRow).toHaveBeenCalledWith(
            [{ title: 'Name', dataIndex: 'name', key: 'name' }],
            0
        );
    });

    it('renders column.onHeaderCell', () => {
        const onHeaderCell = (column) => ({
            id: `header-cell-${column.key}`,
        });
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', onHeaderCell },
        ];
        const wrapper = mount(createTable({ columns }));

        expect(wrapper.find('thead th')).toHaveLength(1);
        expect(wrapper.find('thead th').props().id).toEqual('header-cell-name');
    });

    describe('custom components', () => {
        const MyTable = (props) => <table name="my-table" {...props} />;
        const HeaderWrapper = (props) => (
            <thead name="my-header-wrapper" {...props} />
        );
        const HeaderRow = (props) => <tr name="my-header-row" {...props} />;
        const HeaderCell = (props) => <th name="my-header-cell" {...props} />;
        const BodyWrapper = (props) => (
            <tbody name="my-body-wrapper" {...props} />
        );
        const BodyRow = (props) => <tr name="my-body-row" {...props} />;
        const BodyCell = (props) => <td name="my-body-cell" {...props} />;
        const components = {
            table: MyTable,
            header: {
                wrapper: HeaderWrapper,
                row: HeaderRow,
                cell: HeaderCell,
            },
            body: {
                wrapper: BodyWrapper,
                row: BodyRow,
                cell: BodyCell,
            },
        };

        it('renders correctly', () => {
            const wrapper = mount(createTable({ components }));
            expect(wrapper.render()).toMatchSnapshot();
        });

        it('renders fixed column and header correctly', () => {
            const columns = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    fixed: 'left',
                },
                { title: 'Age', dataIndex: 'age', key: 'age' },
                {
                    title: 'Gender',
                    dataIndex: 'gender',
                    key: 'gender',
                    fixed: 'right',
                },
            ];
            const sampleData = [{ key: 0, name: 'Lucy', age: 27, gender: 'F' }];
            const wrapper = mount(
                createTable({
                    columns,
                    data: sampleData,
                    components,
                    scroll: { x: 100, y: 100 },
                })
            );
            expect(wrapper.render()).toMatchSnapshot();
        });

        describe('scroll content', () => {
            it('with scroll', () => {
                const wrapper = mount(
                    createTable({
                        columns: [
                            { dataIndex: 'a' },
                            { dataIndex: 'b', width: 903 },
                        ],
                        components: {
                            body: () => <h1>Bamboo</h1>,
                        },
                        scroll: { x: 100, y: 100 },
                    })
                );
                expect(wrapper.render()).toMatchSnapshot();
            });

            it('without scroll', () => {
                mount(
                    createTable({
                        components: {
                            body: () => <h1>Bamboo</h1>,
                        },
                    })
                );
            });
        });
    });

    it('align column', () => {
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age', align: 'center' },
        ];
        const wrapper = mount(createTable({ columns }));
        expect(wrapper.find('th').at(0).props().style.textAlign).toBeFalsy();
        expect(wrapper.find('th').at(1).props().style.textAlign).toEqual(
            'center'
        );
        expect(
            wrapper.find('tbody tr').first().find('td').at(0).props().style
                .textAlign
        ).toBeFalsy();
        expect(
            wrapper.find('tbody tr').first().find('td').at(1).props().style
                .textAlign
        ).toEqual('center');
    });

    it('align column should not override cell style', () => {
        const columns = [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                align: 'center',
                onCell: () => ({ style: { color: 'red' } }),
                onHeaderCell: () => ({ style: { color: 'green' } }),
            },
        ];
        const wrapper = mount(createTable({ columns }));
        expect(wrapper.find('th').first().props().style).toEqual({
            color: 'green',
            textAlign: 'center',
        });
        expect(wrapper.find('td').first().props().style).toEqual({
            color: 'red',
            textAlign: 'center',
        });
    });

    describe('row events', () => {
        let spy;

        beforeAll(() => {
            spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockReset();
        });

        afterAll(() => {
            spy.mockRestore();
        });

        it('fires row click event', () => {
            const onClick = jest.fn();
            const wrapper = mount(createTable({ onRow: () => ({ onClick }) }));
            const tr = wrapper.find('tbody tr').first();

            tr.simulate('click');
            expect(onClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: tr.instance(),
                })
            );
        });

        it('fires double row click event', () => {
            const onDoubleClick = jest.fn();
            const wrapper = mount(
                createTable({ onRow: () => ({ onDoubleClick }) })
            );
            const tr = wrapper.find('tbody tr').first();

            tr.first().simulate('doubleClick');
            expect(onDoubleClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: tr.instance(),
                })
            );
        });

        it('fires row contextmenu event', () => {
            const onContextMenu = jest.fn();
            const wrapper = mount(
                createTable({ onRow: () => ({ onContextMenu }) })
            );
            const tr = wrapper.find('tbody tr').first();

            tr.first().simulate('contextMenu');
            expect(onContextMenu).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: tr.instance(),
                })
            );
        });

        it('fires onRowMouseEnter', () => {
            const onMouseEnter = jest.fn();
            const wrapper = mount(
                createTable({
                    onRow: () => ({ onMouseEnter }),
                })
            );

            const tr = wrapper.find('.table-row').first();

            tr.simulate('mouseEnter');
            expect(onMouseEnter).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: tr.instance(),
                })
            );
        });

        it('fires onRowMouseLeave', () => {
            const onMouseLeave = jest.fn();
            const wrapper = mount(
                createTable({
                    onRow: () => ({ onMouseLeave }),
                })
            );

            const tr = wrapper.find('.table-row').first();

            tr.simulate('mouseLeave');
            expect(onMouseLeave).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: tr.instance(),
                })
            );
        });
    });

    it('columns without key', () => {
        const wrapper = mount(
            createTable({
                columns: [{ dataIndex: null }],
            })
        );

        expect(wrapper.find('tbody WrappedCell').first().key()).toBeTruthy();
    });

    it('syntactic sugar', () => {
        const { Column, ColumnGroup } = OcTable;
        expect(
            mount(
                <OcTable
                    expandable={{
                        expandIcon: () => <div className="expand-icon" />,
                    }}
                >
                    <ColumnGroup title="total">
                        <Column title="Name" dataIndex="name" />
                    </ColumnGroup>
                    Invalidate Column
                </OcTable>
            ).render()
        ).toMatchSnapshot();
    });

    describe('internal api', () => {
        describe('transformColumns', () => {
            it('basic', () => {
                const wrapper = mount(
                    createTable({
                        transformColumns: (columns) => [
                            { title: 'before' },
                            ...columns,
                            { title: 'after' },
                        ],
                    })
                );

                expect(wrapper.render()).toMatchSnapshot();
            });

            // Used to check if is expand column
            // We'd better to move selection into table also
            it('internal columnType', () => {
                let existExpandColumn = false;

                mount(
                    createTable({
                        expandable: {
                            expandedRowRender: () => null,
                        },
                        transformColumns: (columns) => {
                            existExpandColumn = columns.some(
                                (col) =>
                                    col[INTERNAL_COL_DEFINE]?.columnType ===
                                    'EXPAND_COLUMN'
                            );
                            return columns;
                        },
                    })
                );

                expect(existExpandColumn).toBeTruthy();
            });
        });
    });

    it('column render array', () => {
        const wrapper = mount(
            <OcTable
                columns={[
                    {
                        dataIndex: 'test',
                        render: () => [<span className="test" key="test" />],
                    },
                ]}
                data={[{ key: 1 }]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );
        expect(wrapper.find('.test')).toHaveLength(1);
    });

    it('component body should pass `data-row-key`', () => {
        const wrapper = mount(
            <OcTable
                columns={[{ dataIndex: 'test' }]}
                components={{ body: { row: (props) => <tr {...props} /> } }}
                data={[{ test: 'bamboo', key: 'light' }]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        expect(wrapper.find('tr').last().props()['data-row-key']).toEqual(
            'light'
        );
    });

    it('render with state change', () => {
        class Test extends React.Component {
            state = {
                change: false,
                columns: [
                    {
                        render: () => String(this.state.change),
                    },
                ],
            };

            render() {
                return (
                    <OcTable
                        columns={this.state.columns}
                        data={[{ key: 1 }]}
                        expandable={{
                            expandIcon: () => <div className="expand-icon" />,
                        }}
                    />
                );
            }
        }

        const wrapper = mount(<Test />);
        expect(wrapper.find('td').text()).toEqual('false');

        wrapper.setState({ change: true });
        expect(wrapper.find('td').text()).toEqual('true');
    });

    it('not crash with raw data', () => {
        expect(() => {
            mount(
                createTable({
                    data: [122, null, '2333', true, undefined],
                })
            );
        }).not.toThrow();
    });

    describe('shouldCellUpdate', () => {
        it('basic', () => {
            const record = { key: 1 };
            let shouldUpdate = false;
            let renderTimes = 0;
            let prev;
            let next;

            const Demo = ({ records }) => {
                const [, forceUpdate] = React.useState({});

                return (
                    <>
                        <OcTable
                            data={records}
                            expandable={{
                                expandIcon: () => (
                                    <div className="expand-icon" />
                                ),
                            }}
                            columns={[
                                {
                                    dataIndex: 'key',
                                    shouldCellUpdate: (
                                        nextRecord,
                                        prevRecord
                                    ) => {
                                        next = nextRecord;
                                        prev = prevRecord;
                                        return shouldUpdate;
                                    },
                                    render() {
                                        renderTimes += 1;
                                        return null;
                                    },
                                },
                            ]}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                forceUpdate({});
                            }}
                        />
                    </>
                );
            };

            const wrapper = mount(<Demo records={[record]} />);
            renderTimes = 0;

            wrapper.find('button').simulate('click');
            expect(renderTimes).toEqual(0);

            shouldUpdate = true;
            wrapper.find('button').simulate('click');
            expect(renderTimes).toEqual(1);

            // Should update match prev & next
            const newRecord = { ...record, next: true };
            wrapper.setProps({ records: [newRecord] });
            // wrapper.update();
            expect(prev).toBe(record);
            expect(next).toBe(newRecord);
        });
    });

    it('render index in tree table', () => {
        const tColumns = [
            {
                title: 'Key',
                dataIndex: 'key',
            },
            {
                title: 'XXX',
                key: 'xxx',
                render: (value, record, index) => index,
            },
        ];

        const tData = [
            { key: 'row0', children: [{ key: 'row0-0' }, { key: 'row0-1' }] },
            { key: 'row1', children: [{ key: 'row1-0' }, { key: 'row1-1' }] },
        ];
        const wrapper = mount(
            <OcTable
                columns={tColumns}
                expandable={{
                    defaultExpandAllRows: true,
                    expandIcon: () => <div className="expand-icon" />,
                }}
                data={tData}
            />
        );

        const trs = wrapper.find('BodyRow');

        expect(trs.at(0).find('Cell').at(1).text()).toEqual('0');
        expect(trs.at(1).find('Cell').at(1).text()).toEqual('0');
        expect(trs.at(2).find('Cell').at(1).text()).toEqual('1');
        expect(trs.at(3).find('Cell').at(1).text()).toEqual('1');
        expect(trs.at(4).find('Cell').at(1).text()).toEqual('0');
        expect(trs.at(5).find('Cell').at(1).text()).toEqual('1');
    });

    it('hover the tree table', () => {
        const tColumns = [
            {
                title: 'Key',
                dataIndex: 'key',
            },
        ];

        const tData = [
            { key: 'row0', children: [{ key: 'row0-0' }, { key: 'row0-1' }] },
            { key: 'row1', children: [{ key: 'row1-0' }, { key: 'row1-1' }] },
        ];
        const wrapper = mount(
            <OcTable
                columns={tColumns}
                expandable={{
                    defaultExpandAllRows: true,
                    expandIcon: () => <div className="expand-icon" />,
                }}
                data={tData}
            />
        );

        const trs = wrapper.find('.tableRow');

        trs.forEach((tr, index) => {
            tr.find('.tableCell').at(0).simulate('mouseEnter');
            const currentClassName = wrapper
                .find('.tableRow')
                .at(index)
                .find('.tableCell')
                .at(0)
                .getElement().props.className;

            expect(currentClassName.includes('tableCellRowHover')).toEqual(
                true
            );
            expect(wrapper.find('.tableCellRowHover')).toHaveLength(1);
        });
    });
});
