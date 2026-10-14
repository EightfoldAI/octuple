import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { TextInput } from './TextInput';
import { act, fireEvent, render } from '@testing-library/react';

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

  test('Text input does not render role attribute', () => {
    const { container } = render(<TextInput />);
    const input = container.getElementsByTagName('input')[0];
    expect(input.hasAttribute('role')).toBe(false);
  });

  test('Text input does not render tabindex attribute', () => {
    const { container } = render(<TextInput />);
    const input = container.getElementsByTagName('input')[0];
    expect(input.hasAttribute('tabindex')).toBe(false);
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
  describe('waitInterval', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    const type = (input: HTMLInputElement, text: string) => {
      fireEvent.change(input, { target: { value: text } });
      act(() => {
        jest.advanceTimersByTime(50);
      });
    };

    test('calls onChange once for keystrokes typed within the interval', () => {
      const onChange = jest.fn();
      const { container } = render(
        <TextInput
          waitInterval={1000}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      const input = container.getElementsByTagName('input')[0];
      ['a', 'ab', 'abc', 'abcd', 'abcde'].forEach((v) => type(input, v));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('abcde');
    });

    test('a late echo of an emitted value does not overwrite newer typing', () => {
      // The parent stores what onChange emits but applies it only when told to, standing in for a
      // value prop that arrives after the user has typed more (React 18 legacy root timing).
      let emitted: string[] = [];
      const Parent: React.FC<{ value: string }> = ({ value }) => (
        <TextInput
          waitInterval={10}
          value={value}
          onChange={(e) => emitted.push(e.target.value)}
        />
      );
      const { container, rerender } = render(<Parent value="" />);
      const input = container.getElementsByTagName('input')[0];

      type(input, 'a');
      expect(emitted).toEqual(['a']);
      fireEvent.change(input, { target: { value: 'ab' } }); // its own emit is still pending
      rerender(<Parent value="a" />); // the echo of 'a' lands after 'b' was typed
      expect(input.value).toBe('ab');
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(emitted).toEqual(['a', 'ab']);

      rerender(<Parent value="reset" />); // a genuine parent update still applies
      expect(input.value).toBe('reset');
      emitted = [];
    });
  });
});
