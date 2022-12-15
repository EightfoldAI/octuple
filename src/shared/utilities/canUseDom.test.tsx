import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { canUseDom } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('canUseDom', () => {
  test('should return true when the function is called in the browser', () => {
    expect(canUseDom()).toBe(true);
  });
});
