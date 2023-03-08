import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Link } from '.';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Link', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should navigate to ... when Link is clicked', () => {
    const LinkToClick = (): JSX.Element => {
      return (
        <>
          <Link data-testid="link-1" href="https://eightfold.ai">
            Click me
          </Link>
        </>
      );
    };
    const { getByTestId } = render(<LinkToClick />);
    expect(getByTestId('link-1').getAttribute('href')).toBe(
      'https://eightfold.ai'
    );
  });

  test('Link is default', () => {
    const { container } = render(
      <Link href="https://eightfold.ai">Test default</Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link is neutral', () => {
    const { container } = render(
      <Link href="https://eightfold.ai" variant="neutral">
        Test neutral
      </Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container.getElementsByClassName('neutral')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link is primary', () => {
    const { container } = render(
      <Link href="https://eightfold.ai" variant="primary"></Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container.getElementsByClassName('primary')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link is secondary', () => {
    const { container } = render(
      <Link href="https://eightfold.ai" variant="secondary">
        Test secondary
      </Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container.getElementsByClassName('secondary')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link is underline when variant is primary', () => {
    const { container } = render(
      <Link href="https://eightfold.ai" underline variant="primary">
        Test underline
      </Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container.getElementsByClassName('primary')).toHaveLength(1);
    expect(container.getElementsByClassName('underline')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link is disabled', () => {
    const { container } = render(
      <Link disabled href="https://eightfold.ai">
        Test
      </Link>
    );
    expect(container.getElementsByClassName('link-style')).toHaveLength(1);
    expect(container.getElementsByClassName('disabled')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
