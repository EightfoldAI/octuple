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

    it('returns rtl', () => {
        document.documentElement.lang = 'he-HE';

        const { result, rerender } = renderHook(() => useCanvasDirection());
        const rtl = result.current;

        rerender();

        expect(result.current).toBe(rtl);
    });

    it('returns rtl', () => {
        document.documentElement.dir = 'ar-SA';

        const { result, rerender } = renderHook(() => useCanvasDirection());
        const rtl = result.current;

        rerender();

        expect(result.current).toBe(rtl);
    });

    it('returns ltr', () => {
        document.documentElement.dir = 'pt-BR';

        const { result, rerender } = renderHook(() => useCanvasDirection());
        const ltr = result.current;

        rerender();

        expect(result.current).toBe(ltr);
    });

    it('returns ltr', () => {
        document.documentElement.dir = 'en';

        const { result, rerender } = renderHook(() => useCanvasDirection());
        const ltr = result.current;

        rerender();

        expect(result.current).toBe(ltr);
    });

    it('returns ltr', () => {
        const { result, rerender } = renderHook(() => useCanvasDirection());
        const ltr = result.current;

        rerender();

        expect(result.current).toBe(ltr);
    });
});
