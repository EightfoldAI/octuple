/* eslint-disable react/no-multi-comp */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';

Enzyme.configure({ adapter: new Adapter() });

const columns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
    },
];

const John = {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
};

const Jim = {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
};

const data = [
    {
        ...John,

        children: [
            {
                ...Jim,
            },
        ],
    },
];

describe('Table.expand', () => {
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

    it('click to expand', () => {
        const wrapper = mount(<Table columns={columns} dataSource={data} />);
        wrapper.find('.table-row-expand-icon').last().at(0).simulate('click');
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('expandRowByClick should not block click icon', () => {
        const wrapper = mount(
            <Table
                columns={columns}
                dataSource={[John, Jim]}
                expandable={{
                    expandRowByClick: true,
                    expandedRowRender: () => '',
                }}
            />
        );

        wrapper.find('.table-row-expand-icon').first().at(0).simulate('click');
        expect(
            wrapper
                .find('.table-row-expand-icon')
                .first()
                .hasClass('table-row-expand-icon-expanded')
        ).toBeTruthy();

        wrapper.find('.table-row-expand-icon').first().at(0).simulate('click');
        expect(
            wrapper
                .find('.table-row-expand-icon')
                .first()
                .hasClass('table-row-expand-icon-collapsed')
        ).toBeTruthy();
    });

    it('show expandIcon', () => {
        const wrapper = mount(
            <Table
                columns={[{ dataIndex: 'key' }]}
                dataSource={[{ key: 233 }]}
                expandable={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        expect(wrapper.find('.expand-icon')).toHaveLength(1);
    });

    it('row indent padding should be 0px when indentSize defined as 0', () => {
        const wrapper = mount(
            <Table indentSize={0} columns={columns} dataSource={data} />
        );
        const button = wrapper.find('.table-row-expand-icon').at(0);
        button.simulate('click');
        expect(
            wrapper.find('.indent-level-1').at(0).prop('style')
        ).toHaveProperty('paddingLeft', '0px');
    });
});
