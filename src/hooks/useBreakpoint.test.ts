import { renderHook, act } from '@testing-library/react-hooks';
import { useBreakpoint } from './useBreakpoint';
import { responsiveObserve } from '../shared/utilities';

describe('useBreakpoint', () => {
  beforeAll(() => {
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => ({
        matches: query.includes('min-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  test('Returns the correct initial value', () => {
    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toEqual({
      lg: true,
      md: true,
      sm: true,
      xl: true,
      xs: true,
    });
  });

  test('Updates the value when responsiveObserve.subscribe is called', () => {
    const mockSubscribe = jest.fn();
    responsiveObserve.subscribe = mockSubscribe;

    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      mockSubscribe.mock.calls[0][0]({ xs: true });
    });

    expect(result.current).toEqual({ xs: true });
  });

  test('Does not update the value when refreshOnChange is false and responsiveObserve.subscribe is called', () => {
    const mockSubscribe = jest.fn();
    responsiveObserve.subscribe = mockSubscribe;

    const { result } = renderHook(() => useBreakpoint(false));

    act(() => {
      mockSubscribe.mock.calls[0][0]({ xs: true });
    });

    expect(result.current).toEqual({});
  });

  test('Unsubscribes when unmounted', () => {
    const mockUnsubscribe = jest.fn();
    responsiveObserve.unsubscribe = mockUnsubscribe;

    const { unmount } = renderHook(() => useBreakpoint());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
