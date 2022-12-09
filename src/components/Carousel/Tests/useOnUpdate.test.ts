import { renderHook } from '@testing-library/react-hooks';
import { useOnUpdate } from '../Hooks/useOnUpdate';

describe('useOnUpdate', () => {
    test('should fire callback when visibleElementsWithSeparators changed', () => {
        const callback = jest.fn();
        const visibleElementsWithSeparators = ['it1', 'it2'];
        const visibleElementsWithSeparators2 = ['it2', 'it3'];
        const condition = true;

        const { rerender } = renderHook(useOnUpdate, {
            initialProps: {
                callback,
                condition,
                hash: JSON.stringify(visibleElementsWithSeparators),
            },
        });

        expect(callback).toHaveBeenCalledTimes(1);

        rerender();
        expect(callback).toHaveBeenCalledTimes(1);

        rerender({
            callback,
            condition,
            hash: JSON.stringify(visibleElementsWithSeparators2),
        });
        expect(callback).toHaveBeenCalledTimes(2);

        rerender();
        expect(callback).toHaveBeenCalledTimes(2);
    });

    test('should fire callback only when condition is truthy', () => {
        const callback = jest.fn();
        const visibleElementsWithSeparators = ['it1', 'it2'];
        const visibleElementsWithSeparators2 = ['it2', 'it3'];
        const condition = false;

        const { rerender } = renderHook(useOnUpdate, {
            initialProps: {
                callback,
                condition,
                hash: JSON.stringify(visibleElementsWithSeparators),
            },
        });

        expect(callback).toHaveBeenCalledTimes(0);

        rerender();
        expect(callback).toHaveBeenCalledTimes(0);

        rerender({
            callback,
            condition,
            hash: JSON.stringify(visibleElementsWithSeparators2),
        });
        expect(callback).toHaveBeenCalledTimes(0);

        rerender();
        expect(callback).toHaveBeenCalledTimes(0);
    });
});
