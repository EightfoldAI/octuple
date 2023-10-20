import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FadeIn } from './FadeIn';
import { sleep } from '../../tests/Utilities';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('FadeIn', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should render children', () => {
    const { getByText } = render(<FadeIn>Hello, World!</FadeIn>);
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  test('Should apply the given classNames', () => {
    const { container } = render(
      <FadeIn classNames="custom-class">Hello, World!</FadeIn>
    );
    const fadeInElement = container.querySelector('.custom-class');
    expect(fadeInElement).toBeInTheDocument();
  });

  test('Should apply the animation styles', async () => {
    const { getByTestId } = render(
      <FadeIn data-testid="test-fadein">Hello, World!</FadeIn>
    );
    const fadeInElement = getByTestId('test-fadein');

    expect(fadeInElement).toHaveStyle('opacity: 0');

    await sleep(400);
    expect(fadeInElement).toHaveStyle('opacity: 1');
  });

  test('Should not animate if disabled prop is set to true', async () => {
    const { getByTestId } = render(
      <FadeIn data-testid="test-fadein" disabled>
        Hello, World!
      </FadeIn>
    );
    const fadeInElement = getByTestId('test-fadein');

    expect(fadeInElement).toHaveStyle('opacity: 0');

    await sleep(100);
    expect(fadeInElement).toHaveStyle('opacity: 1');
  });

  test('Should apply the given duration for animation', async () => {
    const { getByTestId } = render(
      <FadeIn data-testid="test-fadein" duration={1000}>
        Hello, World!
      </FadeIn>
    );
    const fadeInElement = getByTestId('test-fadein');

    await sleep(1100);
    expect(fadeInElement).toHaveStyle('opacity: 1');
  });
});
