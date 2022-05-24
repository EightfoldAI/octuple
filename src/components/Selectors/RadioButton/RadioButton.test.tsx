import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { RadioButton } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('RadioButton', () => {
    /*
     * Functionality Tests
     */
    test('Radio button renders', () => {
        const wrapper = mount(<RadioButton checked={true} />);
        expect(
            wrapper.containsMatchingElement(<RadioButton checked={true} />)
        ).toEqual(true);
    });
});
