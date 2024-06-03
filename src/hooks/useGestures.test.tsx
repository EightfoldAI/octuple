import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import '@testing-library/jest-dom/extend-expect';
import useGestures, { Gestures } from './useGestures';
import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

jest.useFakeTimers();

describe('useGestures Hook', () => {
  let swipeTarget: HTMLElement;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  beforeEach(() => {
    swipeTarget = document.createElement('div');
    document.body.appendChild(swipeTarget);
  });

  afterEach(() => {
    matchMedia.clear();
    document.body.removeChild(swipeTarget);
  });

  test('Detects SwipeDown gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(500);
    fireEvent.touchEnd(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 140 }],
    });

    expect(result.current).toBe(Gestures.SwipeDown);
  });

  test('Detects SwipeLeft gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(500);
    fireEvent.touchEnd(swipeTarget, {
      changedTouches: [{ screenX: 60, screenY: 100 }],
    });

    expect(result.current).toBe(Gestures.SwipeLeft);
  });

  test('Detects SwipeRight gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(500);
    fireEvent.touchEnd(swipeTarget, {
      changedTouches: [{ screenX: 140, screenY: 100 }],
    });

    expect(result.current).toBe(Gestures.SwipeRight);
  });

  test('Detects SwipeUp gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(500);
    fireEvent.touchEnd(swipeTarget, {
      changedTouches: [{ screenX: 100, screenY: 60 }],
    });

    expect(result.current).toBe(Gestures.SwipeUp);
  });

  test('Detects Tap gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      touches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(50);
    fireEvent.touchEnd(swipeTarget, {
      touches: [{ screenX: 100, screenY: 100 }],
    });

    expect(result.current).toBe(Gestures.Tap);
  });

  test('Detects TapAndHold gesture', () => {
    const { result } = renderHook(() => useGestures(swipeTarget));

    fireEvent.touchStart(swipeTarget, {
      touches: [{ screenX: 100, screenY: 100 }],
    });
    jest.advanceTimersByTime(300);
    fireEvent.touchEnd(swipeTarget, {
      touches: [{ screenX: 100, screenY: 100 }],
    });

    expect(result.current).toBe(Gestures.TapAndHold);
  });

  test('onMouseMove sets the Gesture to null', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useGestures(swipeTarget));
    act(() => {
      fireEvent.touchStart(swipeTarget, {
        touches: [{ screenX: 100, screenY: 100 }],
      });
      jest.advanceTimersByTime(50);
      fireEvent.touchEnd(swipeTarget, {
        touches: [{ screenX: 100, screenY: 100 }],
      });
    });
    expect(result.current).toBe(Gestures.Tap);
    act(() => {
      fireEvent.touchStart(swipeTarget, {
        changedTouches: [{ screenX: 0, screenY: 0 }],
      });
    });
    act(() => {
      fireEvent.mouseMove(swipeTarget, { clientX: 100, clientY: 100 });
      jest.advanceTimersByTime(50);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(null);
    jest.useRealTimers();
  });
});
