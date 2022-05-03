import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Label, LabelSize } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Label', () => {
    /*
     * Functionality Tests
     */
    test('label renders', () => {
        const wrapper = mount(<Label text="Test label" />);
        expect(wrapper.containsMatchingElement(<Label />)).toEqual(true);
    });
});
