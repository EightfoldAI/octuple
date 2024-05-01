import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { useTruncate } from './useTruncate';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const fireResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('useTruncate', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });
  test('truncates long text', async () => {
    // Mock clientWidth and scrollWidth
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 100;
        }, // Mock clientWidth to be 100
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 200;
        }, // Mock scrollWidth to be larger than clientWidth to simulate truncation
        configurable: true,
      },
    });
    const TestComponent = () => {
      const { TruncateText } = useTruncate({ lineClamp: 1 });
      return (
        <div style={{ width: 100 }}>
          <TruncateText data-testid="test-truncate-id">
            Very long content that will definitely be truncated in a smaller
            viewport.
          </TruncateText>
        </div>
      );
    };
    await waitFor(() => {
      fireResize(100);
    });
    const { getByTestId } = render(<TestComponent />);
    const content = getByTestId('test-truncate-id');
    await waitFor(() =>
      expect(content.classList.contains('text-is-truncated')).toBe(true)
    );
    expect(content.classList.contains('all-text-visible')).toBe(false);
  });

  test('does not truncate short text', async () => {
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 100;
        },
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 200;
        },
        configurable: true,
      },
    });
    const TestComponent = () => {
      const { TruncateText } = useTruncate({ lineClamp: 1 });
      return (
        <TruncateText>
          Very long content that will definitely be truncated in a smaller
          viewport.
        </TruncateText>
      );
    };
    await waitFor(() => {
      fireResize(100);
    });
    const { container, rerender } = render(<TestComponent />);
    await waitFor(() =>
      expect(container.querySelector('.text-is-truncated')).toBeInTheDocument()
    );
    expect(
      container.querySelector('.all-text-visible')
    ).not.toBeInTheDocument();
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 1024;
        },
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 1024;
        },
        configurable: true,
      },
    });
    await waitFor(() => {
      fireResize(1024);
    });
    rerender(<TestComponent />);
    await waitFor(() =>
      expect(container.querySelector('.all-text-visible')).toBeInTheDocument()
    );
    expect(
      container.querySelector('.text-is-truncated')
    ).not.toBeInTheDocument();
  });
});
