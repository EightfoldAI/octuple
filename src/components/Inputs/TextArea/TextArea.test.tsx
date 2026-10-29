import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextArea } from './TextArea';
import { act, render, fireEvent } from '@testing-library/react';

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
  describe('waitInterval', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    const type = (textArea: HTMLTextAreaElement, text: string) => {
      fireEvent.change(textArea, { target: { value: text } });
      act(() => {
        jest.advanceTimersByTime(50);
      });
    };

    test('calls onChange once for keystrokes typed within the interval', () => {
      const onChange = jest.fn();
      const { container } = render(
        <TextArea
          waitInterval={1000}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      const textArea = container.getElementsByTagName('textarea')[0];
      ['a', 'ab', 'abc', 'abcd', 'abcde'].forEach((v) => type(textArea, v));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('abcde');
    });

    test('a late echo of an emitted value does not overwrite newer typing', () => {
      // The parent stores what onChange emits but applies it only when told to, standing in for a
      // value prop that arrives after the user has typed more (React 18 legacy root timing).
      const emitted: string[] = [];
      const Parent: React.FC<{ value: string }> = ({ value }) => (
        <TextArea
          waitInterval={10}
          value={value}
          onChange={(e) => emitted.push(e.target.value)}
        />
      );
      const { container, rerender } = render(<Parent value="" />);
      const textArea = container.getElementsByTagName('textarea')[0];

      type(textArea, 'a');
      expect(emitted).toEqual(['a']);
      fireEvent.change(textArea, { target: { value: 'ab' } }); // its own emit is still pending
      rerender(<Parent value="a" />); // the echo of 'a' lands after 'b' was typed
      expect(textArea.value).toBe('ab');
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(emitted).toEqual(['a', 'ab']);

      rerender(<Parent value="reset" />); // a genuine parent update still applies
      expect(textArea.value).toBe('reset');
    });
  });
});
