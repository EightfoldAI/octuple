import { renderHook, act } from '@testing-library/react-hooks';
import { Breakpoints, useMatchMedia } from './useMatchMedia';

type ChangeListener = (event: { matches: boolean }) => void;

let listeners: ChangeListener[];
let currentMatches: boolean;

const createMockMediaQueryList = (matches: boolean, media = '') =>
  ({
    matches,
    media,
    onchange: null,
    addEventListener: jest.fn((_event: string, listener: ChangeListener) => {
      listeners.push(listener);
    }),
    removeEventListener: jest.fn((_event: string, listener: ChangeListener) => {
      listeners = listeners.filter((l) => l !== listener);
    }),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MediaQueryList);

beforeEach(() => {
  listeners = [];
  currentMatches = false;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn((query: string) =>
      createMockMediaQueryList(currentMatches, query)
    ),
  });
});

describe('useMatchMedia', () => {
  it('returns true on first render when breakpoint matches', () => {
    currentMatches = true;
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
    expect(result.current).toBe(true);
  });

  it('returns false on first render when breakpoint does not match', () => {
    currentMatches = false;
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
    expect(result.current).toBe(false);
  });

  it('calls window.matchMedia with the correct breakpoint query', () => {
    renderHook(() => useMatchMedia(Breakpoints.Medium));
    expect(window.matchMedia).toHaveBeenCalledWith(Breakpoints.Medium);
  });

  it('updates when the media query change event fires', () => {
    currentMatches = false;
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((listener) => listener({ matches: true }));
    });

    expect(result.current).toBe(true);
  });

  it('updates from true to false when viewport shrinks below breakpoint', () => {
    currentMatches = true;
    const { result } = renderHook(() => useMatchMedia(Breakpoints.Large));
    expect(result.current).toBe(true);

    act(() => {
      listeners.forEach((listener) => listener({ matches: false }));
    });

    expect(result.current).toBe(false);
  });

  it('registers a change event listener on mount', () => {
    renderHook(() => useMatchMedia(Breakpoints.Small));

    const results = (window.matchMedia as jest.Mock).mock.results;
    const effectMql = results[results.length - 1]?.value;
    expect(effectMql.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('removes the change event listener on unmount', () => {
    const { unmount } = renderHook(() => useMatchMedia(Breakpoints.Small));

    const results = (window.matchMedia as jest.Mock).mock.results;
    const effectMql = results[results.length - 1]?.value;
    unmount();

    expect(effectMql.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('re-subscribes when the breakpoint prop changes', () => {
    currentMatches = false;
    const { rerender } = renderHook(
      ({ bp }: { bp: Breakpoints }) => useMatchMedia(bp),
      { initialProps: { bp: Breakpoints.Small } }
    );

    const results = (window.matchMedia as jest.Mock).mock.results;
    const firstEffectMql = results[results.length - 1]?.value;

    currentMatches = true;
    rerender({ bp: Breakpoints.Large });

    expect(firstEffectMql.removeEventListener).toHaveBeenCalled();
    expect(window.matchMedia).toHaveBeenCalledWith(Breakpoints.Large);
  });

  it.each<[string, Breakpoints]>([
    ['XLarge', Breakpoints.XLarge],
    ['Large', Breakpoints.Large],
    ['Medium', Breakpoints.Medium],
    ['Small', Breakpoints.Small],
    ['XSmall', Breakpoints.XSmall],
  ])('works with %s breakpoint', (_name, breakpoint) => {
    currentMatches = true;
    const { result } = renderHook(() => useMatchMedia(breakpoint));
    expect(result.current).toBe(true);
  });

  it('falls back to addListener/removeListener when addEventListener is not available', () => {
    const addListener = jest.fn();
    const removeListener = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn(
        () =>
          ({
            matches: false,
            media: '',
            onchange: null,
            addEventListener: undefined,
            removeEventListener: undefined,
            addListener,
            removeListener,
            dispatchEvent: jest.fn(),
          } as unknown as MediaQueryList)
      ),
    });

    const { unmount } = renderHook(() => useMatchMedia(Breakpoints.Small));
    expect(addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();
    expect(removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
