import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Select } from './';

// jsdom reads SCSS numbers as NaN; give the two padding values real numbers.
jest.mock(
  './select.module.scss',
  () =>
    new Proxy(
      { inputPaddingHorizontal: '8', multiSelectCountOffset: '54' },
      {
        get: (values, key) =>
          key === '__esModule'
            ? false
            : values[key as keyof typeof values] ?? key,
      }
    )
);

const options = [
  { text: 'Apple', value: 'apple', selected: true },
  { text: 'Banana', value: 'banana', selected: true },
  { text: 'Cherry', value: 'cherry', selected: true },
];

// A 300px input and a wide "+N" pill from 50px to 200px.
const mockRects = (): void => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      const [left, right] =
        this.tagName === 'INPUT'
          ? [0, 300]
          : this.id === 'select-pill-count'
          ? [50, 200]
          : [0, 100];
      return {
        width: right - left,
        height: 0,
        top: 0,
        bottom: 0,
        left,
        right,
        x: left,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    });
};

const openSelect = async (): Promise<HTMLElement> => {
  const { getByRole } = render(
    <Select multiple filterable options={options} />
  );
  const input = getByRole('combobox');
  fireEvent.click(input);
  await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
  return input;
};

window.ResizeObserver = class {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

describe('Select input padding', () => {
  let matchMedia: MatchMediaMock;
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
    jest.restoreAllMocks();
    document.documentElement.dir = '';
  });

  test('pads the input past a wide count pill', async () => {
    mockRects();
    const input = await openSelect();
    // Pill right edge (200) plus the input padding (8).
    await waitFor(() => expect(input.style.paddingLeft).toBe('208px'));
  });

  test('pads from the right in RTL', async () => {
    document.documentElement.dir = 'rtl';
    mockRects();
    const input = await openSelect();
    // Input right edge (300) minus pill left edge (50), plus the padding (8).
    await waitFor(() => expect(input.style.paddingRight).toBe('258px'));
    expect(input.style.paddingLeft).toBe('');
  });
});
