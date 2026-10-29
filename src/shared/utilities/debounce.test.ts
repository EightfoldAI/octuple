import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('calls fn once with the last args after the delay', () => {
    const fn = jest.fn();
    const [debounced] = debounce(fn, 100);

    debounced(1);
    debounced(2);
    debounced(3);
    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  test('resolves with the return value of fn', async () => {
    const [debounced] = debounce((n: number) => n * 2, 100);

    const result = debounced(21);
    jest.advanceTimersByTime(100);

    await expect(result).resolves.toBe(42);
  });

  test('teardown cancels a pending call', () => {
    const fn = jest.fn();
    const [debounced, teardown] = debounce(fn, 100);

    debounced(1);
    teardown();
    jest.runAllTimers();

    expect(fn).not.toHaveBeenCalled();
  });
});
