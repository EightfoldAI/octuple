import 'jest-localstorage-mock';

import { act, renderHook } from '@testing-library/react-hooks';

import { useFontSize } from './useFontSize';

describe('useFontSize hook', () => {
    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should apply the passed value as css variable to the document', () => {
        const { result } = renderHook(() => useFontSize());
        const [, setFontSize] = result.current;

        act(() => {
            setFontSize(20);
        });

        expect(
            document.documentElement.style.getPropertyValue('--font-size')
        ).toBe('20px');

        act(() => {
            setFontSize(14);
        });

        expect(
            document.documentElement.style.getPropertyValue('--font-size')
        ).toBe('14px');
    });
});
