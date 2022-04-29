import 'jest-localstorage-mock';

import { act, renderHook } from '@testing-library/react-hooks';

import { useTheme } from './useTheme';

describe('useTheme hook', () => {
    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should apply the passed value as a class name to the document', () => {
        const { result } = renderHook(() => useTheme());
        const [, setTheme] = result.current;

        act(() => {
            setTheme('blue');
        });

        expect(document.documentElement.classList.contains('theme-blue')).toBe(
            true
        );

        act(() => {
            setTheme('brand');
        });

        expect(document.documentElement.classList.contains('theme-brand')).toBe(
            true
        );
    });
});
