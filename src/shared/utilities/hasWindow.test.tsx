import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { hasWindow } from './hasWindow';

Enzyme.configure({ adapter: new Adapter() });

describe('hasWindow', () => {
    test('should return true when the function is called in the browser', () => {
        expect(hasWindow()).toBe(true);
    });
});
