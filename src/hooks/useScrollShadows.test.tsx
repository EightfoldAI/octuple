import { useRef } from 'react';
import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useScrollShadow } from './useScrollShadows';

describe('useScrollShadow', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.height = '100px';
    container.style.overflow = 'auto';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('Should show top shadow when scrolled', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      const { showTopShadow, scrollRef } = useScrollShadow(ref);
      scrollRef(container);
      return { showTopShadow, ref };
    });

    act(() => {
      container.scrollTop = 10;
      fireEvent.scroll(container);
    });

    expect(result.current.showTopShadow).toBe(true);
  });

  test('Should hide top shadow when not scrolled', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      const { showTopShadow, scrollRef } = useScrollShadow(ref);
      scrollRef(container);
      return { showTopShadow, ref };
    });

    act(() => {
      container.scrollTop = 0;
      fireEvent.scroll(container);
    });

    expect(result.current.showTopShadow).toBe(false);
  });

  test('Should show bottom shadow when not scrolled to bottom', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      const { showBottomShadow, scrollRef } = useScrollShadow(ref);
      scrollRef(container);
      return { showBottomShadow, ref };
    });

    act(() => {
      container.scrollTop = container.clientHeight - 90;
      fireEvent.scroll(container);
    });

    expect(result.current.showBottomShadow).toBe(true);
  });

  test('Should hide bottom shadow when scrolled to bottom', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      const { showBottomShadow, scrollRef } = useScrollShadow(ref);
      scrollRef(container);
      return { showBottomShadow, ref };
    });

    act(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
      fireEvent.scroll(container);
    });

    expect(result.current.showBottomShadow).toBe(false);
  });
});
