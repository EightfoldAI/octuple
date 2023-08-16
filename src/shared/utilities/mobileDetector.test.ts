import React from 'react';
import { render } from '@testing-library/react';
import { isAndroid, isIOS, isTouchSupported } from './mobileDetector';

let windowSpy: any;

const mockNavigator = (agent: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).__defineGetter__('userAgent', (): string => {
    return agent;
  });
};

describe('isIOS', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  test('is true for iPad', () => {
    mockNavigator(
      `Mozilla/5.0 (iPad; CPU OS 10_2_1 like Mac OS X)
      AppleWebKit/602.4.6 (KHTML, like Gecko)
      Version/10.0 Mobile/14D27 Safari/602.1`
    );

    expect(isIOS()).toBe(true);
  });

  test('is true for iPhone', () => {
    mockNavigator(
      `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X)
      AppleWebKit/604.1.38 (KHTML, like Gecko)
      Version/11.0 Mobile/15A372 Safari/604.1`
    );

    expect(isIOS()).toBe(true);
  });

  test('is true for iPod touch', () => {
    mockNavigator(
      `Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X)
      AppleWebKit/537.51.1 (KHTML, like Gecko)
      Version/7.0 Mobile/11B511 Safari/9537.53`
    );

    expect(isIOS()).toBe(true);
  });

  test('is false for Android', () => {
    mockNavigator(
      `Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K)
      AppleWebkit/534.30 (KHTML, like Gecko)
      Version/4.0 Mobile Safari/534.30`
    );

    expect(isIOS()).toBe(false);
  });

  test('is false for desktop Chrome', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 6.1)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/41.0.2228.0 Safari/537.36`
    );

    expect(isIOS()).toBe(false);
  });

  test('is false for desktop Firefox', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1`
    );

    expect(isIOS()).toBe(false);
  });

  test('is false for desktop Safari', () => {
    mockNavigator(
      `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)
      AppleWebKit/537.75.14 (KHTML, like Gecko)
      Version/7.0.3 Safari/7046A194A`
    );

    expect(isIOS()).toBe(false);
  });

  test('is false for desktop Edge', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 10.0; Win64; x64)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/42.0.2311.135 Safari/537.36 Edge/12.246`
    );

    expect(isIOS()).toBe(false);
  });

  test('window is undefined', () => {
    windowSpy.mockImplementation((): any => undefined);

    expect(window).toBeUndefined();
    expect(isIOS()).toBe(false);
  });
});

describe('isAndroid', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  test('is true for Android', () => {
    mockNavigator(
      `Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K)
      AppleWebkit/534.30 (KHTML, like Gecko)
      Version/4.0 Mobile Safari/534.30`
    );

    expect(isAndroid()).toBe(true);
  });

  test('is false for desktop Chrome', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 6.1)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/41.0.2228.0 Safari/537.36`
    );

    expect(isAndroid()).toBe(false);
  });

  test('is false for desktop Firefox', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1`
    );

    expect(isAndroid()).toBe(false);
  });

  test('is false for desktop Safari', () => {
    mockNavigator(
      `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)
      AppleWebKit/537.75.14 (KHTML, like Gecko)
      Version/7.0.3 Safari/7046A194A`
    );

    expect(isAndroid()).toBe(false);
  });

  test('is false for desktop Edge', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 10.0; Win64; x64)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/42.0.2311.135 Safari/537.36 Edge/12.246`
    );

    expect(isAndroid()).toBe(false);
  });

  test('window is undefined', () => {
    windowSpy.mockImplementation((): any => undefined);

    expect(window).toBeUndefined();
    expect(isAndroid()).toBe(false);
  });
});

describe('isTouching', () => {
  let originalWindowProperty: any;
  let originalNavigatorProperty: any;

  beforeAll(() => {
    originalWindowProperty = window.hasOwnProperty('ontouchstart');
    originalNavigatorProperty = Object.getOwnPropertyDescriptor(
      Navigator.prototype,
      'maxTouchPoints'
    );
  });

  afterAll(() => {
    if (originalWindowProperty) {
      delete window.ontouchstart;
    }

    if (originalNavigatorProperty) {
      Object.defineProperty(
        Navigator.prototype,
        'maxTouchPoints',
        originalNavigatorProperty
      );
    }
  });

  test('Should return true when ontouchstart is present', () => {
    window.ontouchstart = jest.fn();
    const result = isTouchSupported();
    expect(result).toBe(true);
  });

  test('Should return true when maxTouchPoints is greater than 0', () => {
    Object.defineProperty(Navigator.prototype, 'maxTouchPoints', {
      value: 1,
    });
    const result = isTouchSupported();
    expect(result).toBe(true);
  });

  test('Should return false when neither ontouchstart nor maxTouchPoints are present', () => {
    delete window.ontouchstart;
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true,
    });
    const result = isTouchSupported();
    expect(result).toBe(false);
  });
});
