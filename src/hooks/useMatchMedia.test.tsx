import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Breakpoints, useMatchMedia } from './useMatchMedia';

let matchMedia: any;

describe('useMatchMedia', () => {
  afterEach(() => {
    matchMedia.clear();
  });
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    jest.useFakeTimers();
  });
  it('is extra large screen', async () => {
    const { result } = renderHook(() => useMatchMedia(Breakpoints.XLarge));
    const largeMq = result.current;
    window.resizeTo(1920, 1080);
    setTimeout(() => {
      expect(largeMq).toBe(true);
    }, 10);
  });

  it('is large screen', async () => {
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
    const largeMq = result.current;
    window.resizeTo(1366, 768);
    setTimeout(() => {
      expect(largeMq).toBe(true);
    }, 10);
  });

  it('is medium screen', () => {
    window.resizeTo(1024, 768);
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Medium));
    const mediumMq = result.current;
    setTimeout(() => {
      expect(mediumMq).toBe(true);
    }, 10);
  });

  it('is small screen', () => {
    window.resizeTo(640, 480);
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Small));
    const smallMq = result.current;
    setTimeout(() => {
      expect(smallMq).toBe(true);
    }, 10);
  });

  it('is extra small screen', () => {
    window.resizeTo(320, 480);
    const { result } = renderHook(() => useMatchMedia(Breakpoints.XSmall));
    const xSmallMq = result.current;
    setTimeout(() => {
      expect(xSmallMq).toBe(true);
    }, 10);
  });
});
