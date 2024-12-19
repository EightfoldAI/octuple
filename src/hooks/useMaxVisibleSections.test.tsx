import { renderHook } from '@testing-library/react-hooks';
import { useMaxVisibleSections } from './useMaxVisibleSections';

describe('useMaxVisibleSections', () => {
  beforeEach(() => {
    global.ResizeObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  test('Should compute visible sections when itemsRef changes', () => {
    const containerRef = {
      current: {
        getBoundingClientRect: () => ({ width: 100 }),
      },
    };
    const itemsRef = {
      current: [
        {
          getBoundingClientRect: () => ({ width: 20 }),
        },
      ],
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useMaxVisibleSections(
        containerRef as React.MutableRefObject<HTMLElement>,
        itemsRef as React.MutableRefObject<HTMLElement[]>,
        0,
        0,
        1,
        1
      )
    );

    waitForNextUpdate();

    expect(result.current).toEqual({
      width: 20,
      count: 1,
      filled: false,
    });
  });

  test('Should update visible sections when new item is added', () => {
    const containerRef = {
      current: {
        getBoundingClientRect: () => ({ width: 100 }),
      },
    };
    const itemsRef = {
      current: [
        {
          getBoundingClientRect: () => ({ width: 20 }),
        },
      ],
    };

    const { result, rerender, waitForNextUpdate } = renderHook(() =>
      useMaxVisibleSections(
        containerRef as React.MutableRefObject<HTMLElement>,
        itemsRef as React.MutableRefObject<HTMLElement[]>,
        0,
        0,
        1,
        1
      )
    );

    itemsRef.current.push({
      getBoundingClientRect: () => ({ width: 30 }),
    });

    rerender();

    waitForNextUpdate();

    expect(result.current).toEqual({
      width: 50,
      count: 2,
      filled: false,
    });
  });
});
