import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Loader, LoaderProps, LoaderSize } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const loaderProps: LoaderProps = {
  classNames: 'my-loader-class',
  'data-testid': 'test-loader',
};

describe('Loader', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(<Loader {...loaderProps} />);
    const loader = getByTestId('test-loader');
    expect(() => container).not.toThrowError();
    expect(loader).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Loader accepts custom classes', () => {
    const { container } = render(<Loader {...loaderProps} />);
    expect(container.querySelector('.my-loader-class')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Loader is large', () => {
    const { container } = render(
      <Loader {...loaderProps} size={LoaderSize.Large} />
    );
    expect(container.querySelector('.large')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Loader is medium', () => {
    const { container } = render(
      <Loader {...loaderProps} size={LoaderSize.Medium} />
    );
    expect(container.querySelector('.medium')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Loader is small', () => {
    const { container } = render(
      <Loader {...loaderProps} size={LoaderSize.Small} />
    );
    expect(container.querySelector('.small')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
