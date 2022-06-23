import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.order', () => {
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
        return <Table columns={columns} dataSource={data} {...props} />;
    }

    it('auto fixed', () => {
        const wrapper = mount(
            createTable({
                columns: [
                    {
                        dataIndex: 'name',
                        fixed: true,
                    },
                    Table.SELECTION_COLUMN,
                    {
                        dataIndex: 'key',
                    },
                ],
                rowSelection: {},
            })
        );

        expect(wrapper.find('tr').last().find('td')).toHaveLength(3);
        wrapper.unmount();
    });
});
