import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CheckBox } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('RadioButton', () => {
    it('Checkbox renders', () => {
        const wrapper = mount(<CheckBox checked={true} />);
        expect(
            wrapper.containsMatchingElement(<CheckBox checked={true} />)
        ).toEqual(true);
    });

    it('Checkbox renders as toggle switch', () => {
        const wrapper = mount(<CheckBox checked={true} toggle />);
        expect(wrapper.find('.toggle')).toBeTruthy();
    });
});
