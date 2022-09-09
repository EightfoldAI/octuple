import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SearchBox } from './SearchBox';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('SearchBox', () => {
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
        const wrapper = mount(<SearchBox />);
        expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
    });
    test('text input renders with partially customized icon button', () => {
        const wrapper = mount(
            <SearchBox iconButtonProps={{ htmlType: 'submit' }} />
        );
        expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
    });
});
