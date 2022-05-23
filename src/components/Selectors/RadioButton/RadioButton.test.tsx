import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { RadioButton } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('RadioButton', () => {
    /*
     * Functionality Tests
     */
    test('label renders', () => {
        const wrapper = mount(<RadioButton checked={true} />);
        expect(wrapper.containsMatchingElement(<RadioButton />)).toEqual(true);
    });
});
