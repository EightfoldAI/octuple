import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useDebounce } from './useDebounce';
import { renderHook, act } from '@testing-library/react-hooks';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('useDebounce', () => {
    let func: jest.Mock;
    let debouncedFunc: Function;

    beforeEach(() => {
        func = jest.fn();
        debouncedFunc = renderHook(() => useDebounce(func, 1000)).result
            .current;
    });

    it('initialized value in first render', () => {
        for (let i = 0; i < 100; i++) {
            debouncedFunc();
        }

        act(() => {
            jest.runAllTimers();
        });

        expect(func).toBeCalledTimes(1);
    });
});
