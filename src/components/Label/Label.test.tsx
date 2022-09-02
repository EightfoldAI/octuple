import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Label } from './index';
import MatchMediaMock from 'jest-matchmedia-mock';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Label', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('label renders', () => {
        const wrapper = mount(<Label text="Test label" />);
        expect(wrapper.containsMatchingElement(<Label />)).toEqual(true);
    });
});
