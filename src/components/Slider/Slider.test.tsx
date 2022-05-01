import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import MatchMediaMock from 'jest-matchmedia-mock';
import React from 'react';

import { Slider } from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Slider', () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = mount(<Slider min={20} max={40} value={30} />);
    });

    test('Should render', () => {
        expect(wrapper).toBeTruthy();
    });
});
