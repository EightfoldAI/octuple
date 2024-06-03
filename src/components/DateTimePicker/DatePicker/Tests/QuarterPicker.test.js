import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '..';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

const { QuarterPicker } = DatePicker;

describe('QuarterPicker', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should support style prop', () => {
    const wrapper = mount(<QuarterPicker style={{ width: 400 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
