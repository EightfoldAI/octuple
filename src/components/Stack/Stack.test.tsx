import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Stack, StackProps } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const stackProps: StackProps = {
  fullWidth: false,
  direction: 'horizontal',
  inline: false,
  flexGap: 'm',
  style: {
    backgroundColor: 'aquamarine',
  },
  classNames: 'my-stack-class',
  breakpoints: {},
  children: (
    <>
      <div
        style={{
          height: '200px',
          width: '200px',
          backgroundColor: 'mediumpurple',
        }}
      />
      <div
        style={{
          height: '200px',
          width: '200px',
          backgroundColor: 'mediumpurple',
        }}
      />
      <div
        style={{
          height: '200px',
          width: '200px',
          backgroundColor: 'mediumpurple',
        }}
      />
    </>
  ),
  'data-testid': 'test-stack',
};

describe('Spinner', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(<Stack {...stackProps} />);
    const stack = getByTestId('test-stack');
    expect(() => container).not.toThrowError();
    expect(stack).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Stack is vertical', () => {
    const { container, getByTestId } = render(
      <Stack {...stackProps} direction="vertical" />
    );
    const stack = getByTestId('test-stack');
    expect(() => container).not.toThrowError();
    expect(stack.classList.contains('vertical')).toBe(true);
    expect(container).toMatchSnapshot();
  });
});
