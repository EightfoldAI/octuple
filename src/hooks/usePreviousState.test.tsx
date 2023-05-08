import { renderHook, act } from '@testing-library/react-hooks';
import { usePreviousState } from './usePreviousState';

describe('usePreviousState', () => {
  it('should return the previous value after a re-render', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreviousState(value),
      {
        initialProps: { value: 0 },
      }
    );

    // initial render, the previous value should be undefined
    expect(result.current).toBeUndefined();

    // update the value and rerender the hook
    act(() => {
      rerender({ value: 1 });
    });

    // the previous value should be the previous value, which is 0
    expect(result.current).toEqual(0);

    // update the value again and rerender the hook
    act(() => {
      rerender({ value: 2 });
    });

    // the previous value should be the previous value, which is 1
    expect(result.current).toEqual(1);
  });
});
