import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CheckBox } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('RadioButton', () => {
    /*
     * Functionality Tests
     */
    test('Checkbox renders', () => {
        const wrapper = mount(<CheckBox checked={true} />);
        expect(
            wrapper.containsMatchingElement(<CheckBox checked={true} />)
        ).toEqual(true);
    });
});
