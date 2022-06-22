import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable, { INTERNAL_COL_DEFINE } from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Table.ColGroup', () => {
    it('internal props should render', () => {
        const columns = [
            {
                key: 'test',
                [INTERNAL_COL_DEFINE]: { className: 'show-in-col' },
            },
        ];

        const wrapper = mount(
            <OcTable
                columns={columns}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );
        expect(wrapper.find('colgroup col').props().className).toEqual(
            'show-in-col'
        );
    });

    it('correct key', () => {
        const columns = [
            {
                key: 0,
                width: 1,
            },
        ];

        const wrapper = mount(
            <OcTable
                columns={columns}
                expandableConfig={{
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );
        expect(String(wrapper.find('colgroup col').key())).toEqual('0');
    });
});
