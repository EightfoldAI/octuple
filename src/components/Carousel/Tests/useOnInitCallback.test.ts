import { renderHook } from '@testing-library/react-hooks';
import { useOnInitCallback } from '../Hooks/useOnInitCallback';

describe('useOnInitCallback', () => {
    test('should fire callback only 1 time', () => {
        const callback = jest.fn();
        const { result, rerender } = renderHook(() =>
            useOnInitCallback({ callback, condition: true })
        );

        expect(callback).toHaveBeenCalledTimes(1);
        expect(result.all).toEqual([false, true]);

        rerender();

        expect(result.all).toEqual([false, true, true]);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should fire callback only when condition is truthy', () => {
        const callback = jest.fn();
        const { result, rerender } = renderHook(useOnInitCallback, {
            initialProps: { callback, condition: false },
        });

        expect(callback).toHaveBeenCalledTimes(0);
        expect(result.all).toEqual([false]);

        rerender({ callback, condition: true });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(result.all).toEqual([false, false, true]);

        rerender();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(result.all).toEqual([false, false, true, true]);
    });
});
