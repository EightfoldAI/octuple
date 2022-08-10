import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from '../index';
import type { FixedType } from '../Internal/OcTable.types';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

const columns = [{ title: 'Column 1', dataIndex: 'address', key: '1' }];

const columnsFixed = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left' as FixedType,
    },
];

describe('Table', () => {
    it('renders empty table', () => {
        const wrapper = render(
            <Table
                dataSource={[]}
                columns={columns}
                pagination={false}
                emptyText={<span>custom empty text</span>}
            />
        );
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/empty.render.shot'
        );
    });

    it('renders empty table with fixed columns', () => {
        const wrapper = render(
            <Table
                dataSource={[]}
                columns={columnsFixed}
                emptyText={<span>custom empty text</span>}
                pagination={false}
                scroll={{ x: 1 }}
            />
        );
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/empty.renderfixedcols.shot'
        );
    });

    it('renders empty table without emptyText when loading', () => {
        const wrapper = render(
            <Table dataSource={[]} columns={columns} loading />
        );
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/empty.renderloading.shot'
        );
    });
});
