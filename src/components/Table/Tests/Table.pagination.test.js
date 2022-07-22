import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.table-pagination', () => {
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
        { key: 0, name: 'Lola' },
        { key: 1, name: 'Mia' },
    ];

    const longData = [];
    for (let i = 0; i < 100; i += 1) {
        longData.push({ key: i, name: `${i}` });
    }

    const pagination = { className: 'my-page', pageSize: 2 };

    function createTable(props) {
        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                {...props}
            />
        );
    }

    function renderedNames(wrapper) {
        return wrapper.find('BodyRow').map((row) => row.props().record.name);
    }

    it('renders pagination correctly', () => {
        const wrapper = mount(createTable());
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Table.pagination.renders.shot'
        );
    });

    it('not crash when pageSize is undefined', () => {
        expect(() => {
            mount(createTable({ pagination: { pageSize: undefined } }));
        }).not.toThrow();
    });

    it('repaginates when pageSize change', () => {
        const wrapper = mount(createTable());

        wrapper.setProps({ pagination: { pageSize: 1 } });
        expect(renderedNames(wrapper)).toEqual(['Lola']);
    });

    it('should not crash when trigger onChange in render', () => {
        function App() {
            const [page, setPage] = React.useState({
                currentPage: 1,
                pageSize: 5,
            });
            const onChange = (currentPage, pageSize) => {
                setPage({ currentPage, pageSize });
            };
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        ...page,
                        onChange,
                    }}
                />
            );
        }
        const wrapper = mount(<App />);
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Table.pagination.nocrashonchange.shot'
        );
    });

    it('Accepts pagination as true', () => {
        const wrapper = mount(createTable({ pagination: true }));
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Table.pagination.accepttrue.shot'
        );
    });

    it('renders pagination topLeft and bottomRight', () => {
        const wrapper = mount(
            createTable({ pagination: ['topLeft', 'bottomRight'] })
        );
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Table.pagination.position.shot'
        );
    });

    it('should render pagination after last item on last page being removed', () => {
        const total = data.length;
        const paginationProp = {
            pageSize: 1,
            total,
            currentPage: total,
            position: ['topLeft', 'bottomLeft'],
        };
        const wrapper = mount(
            createTable({
                pagination: paginationProp,
            })
        );

        wrapper.setProps({
            dataSource: data.slice(total - 1),
            pagination: { ...paginationProp, total: total - 1 },
        });
        expect(wrapper.find('.table-pagination')).toHaveLength(2);
    });

    it('should preserve table pagination className', () => {
        const wrapper = mount(
            <Table
                data={[]}
                columns={[]}
                pagination={{
                    className: 'my-pagination',
                    total: 200,
                    currentPage: 1,
                    pageSize: 10,
                }}
            />
        );
        expect(wrapper.find('.table-pagination').prop('className')).toEqual(
            'table-pagination table-pagination-right my-pagination pagination'
        );
    });
});
