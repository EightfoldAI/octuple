import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useForceUpdate } from './useForceUpdate';

describe('useForceUpdate', () => {
  test('Should return a function', () => {
    const { result } = renderHook(() => useForceUpdate());

    expect(typeof result.current).toBe('function');
  });

  test('Should cause a re-render when the returned function is called', () => {
    const { result } = renderHook(() => {
      const forceUpdate = useForceUpdate();
      const [state, setState] = useState(0);

      return { forceUpdate, state, setState };
    });

    act(() => {
      result.current.forceUpdate();
      result.current.setState((prevState) => prevState + 1);
    });

    expect(result.current.state).toBe(1);
  });
});
