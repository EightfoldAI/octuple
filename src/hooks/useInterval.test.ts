import { renderHook } from '@testing-library/react-hooks/dom';
import { useInterval } from './useInterval';

const sleep: (ms: number) => Promise<unknown> = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe('useInterval()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fire the callback function (1)', async () => {
    const timeout: number = 500;
    const callback: jest.Mock<any, any> = jest.fn();
    renderHook((): void => useInterval(callback, timeout));
    await sleep(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should fire the callback function (2)', async () => {
    const timeout: number = 500;
    const earlyTimeout: number = 400;
    const callback: jest.Mock<any, any> = jest.fn();
    renderHook((): void => useInterval(callback, timeout));
    await sleep(earlyTimeout);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should call set interval on start', () => {
    const timeout: number = 1200;
    mockSetInterval();
    const callback = jest.fn();
    renderHook((): void => useInterval(callback, timeout));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  test('should call clearTimeout on unmount', () => {
    mockClearInterval();
    const callback: jest.Mock<any, any> = jest.fn();
    const { unmount } = renderHook((): void => useInterval(callback, 1200));
    unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});

function mockSetInterval() {
  jest.useFakeTimers();
  jest.spyOn(global, 'setInterval');
}

function mockClearInterval() {
  jest.useFakeTimers();
  jest.spyOn(global, 'clearInterval');
}
