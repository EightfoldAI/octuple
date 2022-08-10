import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import List from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Props', () => {
    it('itemKey is a function', () => {
        class ItemComponent extends React.Component {
            render() {
                return this.props.children;
            }
        }

        const wrapper = mount(
            <List
                data={[{ id: 903 }, { id: 1128 }]}
                itemKey={(item) => item.id}
            >
                {({ id }) => <ItemComponent>{id}</ItemComponent>}
            </List>
        );

        expect(wrapper.find('Item').at(0).key()).toBe('903');

        expect(wrapper.find('Item').at(1).key()).toBe('1128');
    });
});
