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

  test('Text input renders', () => {
    const wrapper = mount(<TextInput />);
    expect(wrapper.containsMatchingElement(<TextInput />)).toEqual(true);
  });

  test('Text input id does not append uuid when from props', () => {
    const { container } = render(<TextInput id="textInputTest" />);
    expect(container.getElementsByTagName('input')[0].getAttribute('id')).toBe(
      'textInputTest'
    );
  });

  test('Text input is readonly', () => {
    const { container } = render(
      <TextInput readonly defaultValue="Test value" />
    );
    expect(
      container.getElementsByTagName('input')[0].hasAttribute('readonly')
    ).toBeTruthy();
    expect(
      container.getElementsByTagName('input')[0].getAttribute('value')
    ).toBe('Test value');
  });
});
