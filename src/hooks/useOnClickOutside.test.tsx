import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
  test('should call handler when click occurs outside ref', async () => {
    const handler = jest.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement('div');
      document.body.appendChild(ref.current);
      useOnClickOutside(ref, handler, true);
      return { ref, handler };
    });

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(handler).toHaveBeenCalled();

    document.body.removeChild(result.current.ref.current);
  });

  test('should not call handler when click occurs inside ref', async () => {
    const handler = jest.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement('div');
      document.body.appendChild(ref.current);
      useOnClickOutside(ref, handler, true);
      return { ref, handler };
    });

    act(() => {
      fireEvent.mouseDown(result.current.ref.current);
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(result.current.ref.current);
  });

  test('should not call handler when visible is false', async () => {
    const handler = jest.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement('div');
      document.body.appendChild(ref.current);
      useOnClickOutside(ref, handler, false);
      return { ref, handler };
    });

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(result.current.ref.current);
  });
});
