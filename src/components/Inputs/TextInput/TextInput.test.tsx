import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextInput } from './TextInput';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('TextInput', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });
    /*
     * Functionality Tests
     */
    test('text input renders', () => {
        const wrapper = mount(<TextInput />);
        expect(wrapper.containsMatchingElement(<TextInput />)).toEqual(true);
    });
});
