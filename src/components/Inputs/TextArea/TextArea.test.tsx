import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextArea } from './TextArea';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('TextArea', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('Text area renders', () => {
    const wrapper = mount(<TextArea />);
    expect(wrapper.containsMatchingElement(<TextArea />)).toEqual(true);
  });

  test('Text area id does not append uuid when from props', () => {
    const { container } = render(<TextArea id="textAreaTest" />);
    expect(
      container.getElementsByTagName('textarea')[0].getAttribute('id')
    ).toBe('textAreaTest');
  });

  test('Text area is readonly', () => {
    const { container } = render(
      <TextArea readonly defaultValue="Test value" />
    );
    expect(container.querySelector('.read-only')).toBeTruthy();
    expect(
      container.querySelector('.text-area').hasAttribute('readonly')
    ).toBeTruthy();
    expect(container.querySelector('.text-area').innerHTML).toBe('Test value');
  });
});
