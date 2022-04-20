import { act, renderHook } from '@testing-library/react-hooks';

import { useScrollLock } from './useScrollLock';

describe('useScrollLock hook', () => {
    it('set overflow to hidden and reset', () => {
        const { result } = renderHook(() =>
            useScrollLock(document.documentElement)
        );
        const { unlockScroll, lockScroll } = result.current;

        act(() => {
            lockScroll();
        });

        expect(document.documentElement.style.overflow).toBe('hidden');

        act(() => {
            unlockScroll();
        });

        expect(document.documentElement.style.overflow).toBe('');
    });
});
