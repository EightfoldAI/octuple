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
    debouncedFunc = renderHook(() => useDebounce(func, 1000)).result.current;
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

  it('debounces calls made across re-renders', () => {
    const { result, rerender } = renderHook(() => useDebounce(func, 1000));
    for (let i = 0; i < 5; i++) {
      result.current(i);
      rerender();
      act(() => {
        jest.advanceTimersByTime(50);
      });
    }

    act(() => {
      jest.runAllTimers();
    });

    expect(func).toBeCalledTimes(1);
    expect(func).toHaveBeenCalledWith(4);
  });

  it('calls the fn from the render that made the last call', () => {
    const first = jest.fn();
    const latest = jest.fn();
    const { result, rerender } = renderHook(({ fn }) => useDebounce(fn, 1000), {
      initialProps: { fn: first },
    });
    result.current(1);
    rerender({ fn: latest });
    result.current(2);

    act(() => {
      jest.runAllTimers();
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toBeCalledTimes(1);
    expect(latest).toHaveBeenCalledWith(2);
  });

  it('drops a pending call on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce(func, 1000));
    result.current(undefined);
    unmount();

    act(() => {
      jest.runAllTimers();
    });

    expect(func).not.toHaveBeenCalled();
  });
});
