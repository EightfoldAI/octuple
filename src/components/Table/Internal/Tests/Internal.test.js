import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcTable from '..';

Enzyme.configure({ adapter: new Adapter() });

// All follow test is only for internal usage which should be removed when refactor
describe('Table.Internal', () => {
    it('internal should pass `__PARENT_RENDER_ICON__` for expandable', () => {
        const wrapper = mount(
            <OcTable
                columns={[{ dataIndex: 'key' }]}
                data={[{ key: 233 }]}
                expandableConfig={{
                    __PARENT_RENDER_ICON__: true,
                    expandIcon: () => <div className="expand-icon" />,
                }}
            />
        );

        expect(wrapper.find('.expand-icon')).toHaveLength(1);
    });
});
