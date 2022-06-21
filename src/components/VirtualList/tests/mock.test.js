import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockList from '../mock';
import Filler from '../Filler';

Enzyme.configure({ adapter: new Adapter() });

describe('MockList', () => {
    it('correct render', () => {
        const wrapper = mount(
            <MockList data={[0, 1, 2]} itemKey={(id) => id}>
                {(id) => <span>{id}</span>}
            </MockList>
        );

        expect(wrapper.find(Filler).length).toBeTruthy();

        for (let i = 0; i < 3; i += 1) {
            expect(wrapper.find('Item').at(i).key()).toBe(String(i));
        }

        expect(wrapper.find('List')).toHaveLength(1);
    });
});
