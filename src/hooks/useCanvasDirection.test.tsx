import { renderHook } from '@testing-library/react-hooks';
import { useCanvasDirection } from './useCanvasDirection';

describe('useCanvasDirection', () => {
  it('returns ltr', () => {
    document.documentElement.dir = 'ltr';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const ltr = result.current;

    rerender();

    expect(result.current).toBe(ltr);
  });

  it('returns rtl', () => {
    document.documentElement.dir = 'rtl';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const rtl = result.current;

    rerender();

    expect(result.current).toBe(rtl);
  });

  it('returns rtl for he lang', () => {
    document.documentElement.lang = 'he-HE';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const rtl = result.current;

    rerender();

    expect(result.current).toBe(rtl);
  });

  it('returns rtl for ar lang', () => {
    document.documentElement.lang = 'ar-SA';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const rtl = result.current;

    rerender();

    expect(result.current).toBe(rtl);
  });

  it('returns ltr for pt lang', () => {
    document.documentElement.lang = 'pt-BR';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const ltr = result.current;

    rerender();

    expect(result.current).toBe(ltr);
  });

  it('returns ltr en lang', () => {
    document.documentElement.lang = 'en';

    const { result, rerender } = renderHook(() => useCanvasDirection());
    const ltr = result.current;

    rerender();

    expect(result.current).toBe(ltr);
  });

  it('returns ltr by default', () => {
    const { result, rerender } = renderHook(() => useCanvasDirection());
    const ltr = result.current;

    rerender();

    expect(result.current).toBe(ltr);
  });

  it('returns ltr if lang param is not valid', () => {
    const { result, rerender } = renderHook(() =>
      useCanvasDirection('somestring')
    );
    const ltr = result.current;

    rerender();

    expect(result.current).toBe(ltr);
  });
});
