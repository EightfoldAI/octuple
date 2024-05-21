import { createRef } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useForkedRef, isFunction, assignRef } from './useForkedRef';

describe('useForkedRef', () => {
  test('Should return null if all refs are null', () => {
    const { result } = renderHook(() => useForkedRef(null, null));

    expect(result.current).toBeNull();
  });

  test('Should return a function if there is at least one ref', () => {
    const ref = createRef();
    const { result } = renderHook(() => useForkedRef(ref, null));

    expect(isFunction(result.current)).toBe(true);
  });

  test('Should assign the node to all refs', () => {
    const ref1 = createRef();
    const ref2 = createRef();
    const { result } = renderHook(() => useForkedRef(ref1, ref2));

    act(() => {
      result.current('node');
    });

    expect(ref1.current).toBe('node');
    expect(ref2.current).toBe('node');
  });
});

describe('assignRef', () => {
  test('Should assign the value to the ref if the ref is a function', () => {
    const ref = jest.fn();
    assignRef(ref, 'value');

    expect(ref).toHaveBeenCalledWith('value');
  });

  test('Should assign the value to the ref if the ref is an object', () => {
    const ref = createRef();
    assignRef(ref, 'value');

    expect(ref.current).toBe('value');
  });

  test('Should throw an error if the ref is an object and the value cannot be assigned', () => {
    const ref = Object.freeze({ current: 'initial' });

    expect(() => assignRef(ref, 'value')).toThrowError();
  });
});
