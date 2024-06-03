import '@testing-library/jest-dom/extend-expect';
import fetch from 'cross-fetch';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { InlineSvg } from './InlineSvg';

jest.mock('cross-fetch', () => {
  return jest.fn(() =>
    Promise.resolve({
      text: () => '<svg>Mock SVG</svg>',
    })
  );
});

describe('InlineSvg', () => {
  const url = 'https://static.vscdn.net/images/learning-opp.svg';
  const width = '300px';
  const height = '200px';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders a skeleton while loading the SVG image if enabled', async () => {
    const { container } = render(
      <InlineSvg url={url} width={width} height={height} showSkeleton />
    );
    const skeleton = container.querySelector('.skeleton.wave.rounded');
    expect(skeleton).toBeInTheDocument();
  });

  test('renders the SVG image', async () => {
    const { container } = render(
      <InlineSvg url={url} width={width} height={height} />
    );

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('renders an error icon when the SVG image fails to load', async () => {
    const errorUrl = 'https://example.com/broken.svg';
    const { container } = render(
      <InlineSvg url={errorUrl} width={width} height={height} />
    );
    await waitFor(() => {
      expect(
        container.querySelector('.svg-display-error-icon')
      ).toBeInTheDocument();
    });
  });

  test('Should call fetchSvg only once', async () => {
    const { rerender } = render(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Should call fetchSvg twice', async () => {
    const { rerender } = render(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url-diff" />);
    rerender(<InlineSvg url="mock-url-diff" />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
