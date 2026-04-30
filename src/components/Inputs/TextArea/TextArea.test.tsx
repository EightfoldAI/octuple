import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextArea } from './TextArea';
import { render, fireEvent } from '@testing-library/react';

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

  test('Close button is not rendered by default', () => {
    const { container } = render(<TextArea value="Some text" />);
    expect(container.querySelector('.text-area-close-button')).toBeNull();
  });

  test('Close button is rendered when showCloseButton is true and value is present', () => {
    const { container } = render(
      <TextArea showCloseButton value="Some text" />
    );
    expect(container.querySelector('.text-area-close-button')).toBeTruthy();
    expect(
      container
        .querySelector('.text-area-close-button')
        .getAttribute('aria-label')
    ).toBe('Clear text area');
  });

  test('Close button click clears the textarea value', () => {
    const { container } = render(
      <TextArea showCloseButton value="Some text" onChange={() => {}} />
    );
    const closeButton = container.querySelector('.text-area-close-button');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton);
    expect(container.querySelector('.text-area-close-button')).toBeNull();
  });

  test('Text area with showCloseButton and value matches snapshot', () => {
    const { container } = render(
      <TextArea showCloseButton value="Hello world" id="snapshot-textarea" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
