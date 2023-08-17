import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Spinner, SpinnerProps, SpinnerSize } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const spinnerProps: SpinnerProps = {
  size: SpinnerSize.Default,
  classNames: 'my-spinner-class',
};

describe('Spinner', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container } = render(<Spinner {...spinnerProps} />);
    const spinner = container.getElementsByClassName('spinner');
    expect(() => container).not.toThrowError();
    expect(spinner).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Spinner accepts custom classes', () => {
    const { container } = render(<Spinner {...spinnerProps} />);
    expect(container.querySelector('.my-spinner-class')).toBeTruthy();
  });
});
