import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextArea } from './TextArea';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('TextArea', () => {
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
        const wrapper = mount(<TextArea />);
        expect(wrapper.containsMatchingElement(<TextArea />)).toEqual(true);
    });
});
