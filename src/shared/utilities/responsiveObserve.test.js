import { responsiveMap, responsiveObserve } from './';

describe('Test ResponsiveObserve', () => {
  beforeAll(() => {
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => ({
        matches: query.includes('min-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  it('test responsiveObserve subscribe and unsubscribe', () => {
    const { xs } = responsiveMap;
    const subscribeFunc = jest.fn();
    const token = responsiveObserve.subscribe(subscribeFunc);
    expect(responsiveObserve.matchHandlers[xs].mql.matches).toBeTruthy();
    expect(subscribeFunc).toBeCalledTimes(1);

    responsiveObserve.unsubscribe(token);
    expect(responsiveObserve.matchHandlers[xs].mql.removeListener).toBeCalled();
  });
});
