import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SearchBox } from './SearchBox';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('SearchBox', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('Text input renders', () => {
    const wrapper = mount(<SearchBox />);
    expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
  });

  test('Text input renders with partially customized icon button', () => {
    const wrapper = mount(
      <SearchBox iconButtonProps={{ htmlType: 'submit' }} />
    );
    expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
  });

  test('Text input default non-interactive icon button renders as disabled and with aria-hidden', () => {
    const wrapper = mount(<SearchBox />);
    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
    expect(button.prop('aria-hidden')).toBe(true);
    expect(button.prop('aria-label')).toBeUndefined();
  });

  test('Text input is readonly', () => {
    const { container } = render(
      <SearchBox readonly defaultValue="Test value" />
    );
    expect(
      container.getElementsByTagName('input')[0].hasAttribute('readonly')
    ).toBeTruthy();
    expect(
      container.getElementsByTagName('input')[0].getAttribute('value')
    ).toBe('Test value');
  });
});
