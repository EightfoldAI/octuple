import { renderHook } from '@testing-library/react-hooks';
import { useEvent } from './useEvent';

describe('useEvent', () => {
  test('Should return a memoized version of the callback', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(() => useEvent(callback));

    const firstResult = result.current;

    // Simulate a rerender with the same callback
    rerender();

    expect(result.current).toBe(firstResult);
  });

  test('Should call the original callback with the correct arguments', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useEvent(callback));

    const args = ['arg1', 'arg2'];
    result.current(...args);

    expect(callback).toHaveBeenCalledWith(...args);
  });

  test('Should use the latest version of the callback', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useEvent(callback),
      {
        initialProps: { callback: firstCallback },
      }
    );

    const args = ['arg1', 'arg2'];
    result.current(...args);

    expect(firstCallback).toHaveBeenCalledWith(...args);

    // Simulate a rerender with a new callback
    rerender({ callback: secondCallback });

    result.current(...args);

    expect(secondCallback).toHaveBeenCalledWith(...args);
  });
});
