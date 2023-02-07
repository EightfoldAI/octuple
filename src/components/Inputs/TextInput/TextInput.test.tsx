import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextInput } from './TextInput';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('TextInput', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('text input renders', () => {
    const wrapper = mount(<TextInput />);
    expect(wrapper.containsMatchingElement(<TextInput />)).toEqual(true);
  });

  test('text input id does not append uuid when from props', () => {
    const { container } = render(<TextInput id="textInputTest" />);
    expect(container.getElementsByTagName('input')[0].getAttribute('id')).toBe(
      'textInputTest'
    );
  });
});
