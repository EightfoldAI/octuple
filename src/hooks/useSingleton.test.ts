import { renderHook } from '@testing-library/react-hooks';
import { useSingleton } from './useSingleton';

describe('useSingleton', () => {
  test('should call callback only once', () => {
    const callback = jest.fn();

    const { rerender } = renderHook(() => useSingleton(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call callback if not provided', () => {
    const { rerender } = renderHook(() => useSingleton());

    rerender();

    // No assertion needed as we're just verifying that no error is thrown
  });
});
