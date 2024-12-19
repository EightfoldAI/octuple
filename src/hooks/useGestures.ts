'use client';

import { useMemo, useRef, useState, useCallback } from 'react';
export enum Gestures {
  SwipeUp = 'SwipeUp',
  SwipeDown = 'SwipeDown',
  SwipeLeft = 'SwipeLeft',
  SwipeRight = 'SwipeRight',
  Tap = 'Tap',
  TapAndHold = 'TapAndHold',
}
const useGestures = (
  swipeTarget: HTMLElement | Window | null,
  preventTouchMoveDefault: boolean = true
): Gestures | null => {
  const startTimeRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const [gestureType, setGestureType] = useState<Gestures | null>(null);
  // For hybrid scenarios where a person uses both finger and mouse.
  // Set gesture back to null upon mouse move.
  const onMouseMove = useCallback((): void => {
    if (!swipeTarget) {
      return;
    }
    // Check if touch start, if not then set gesture to null.
    if (touchStartXRef?.current === 0 && touchStartYRef?.current === 0) {
      setGestureType(null);
    }
  }, [swipeTarget]);
  const startTouchGesture = useCallback(
    (e: any): void => {
      if (!swipeTarget) {
        return;
      }
      startTimeRef.current = new Date().getTime();
      touchStartXRef.current = e?.changedTouches[0]?.screenX;
      touchStartYRef.current = e?.changedTouches[0]?.screenY;
    },
    [swipeTarget]
  );
  const endTouchGesture = useCallback(
    (e: any): void => {
      if (!swipeTarget) {
        return;
      }
      const currentTime: number = new Date().getTime();
      const touchEndX: number = e?.changedTouches[0]?.screenX;
      const touchEndY: number = e?.changedTouches[0]?.screenY;
      const count: number = touchEndX - touchStartXRef?.current;
      const next: number = touchEndY - touchStartYRef?.current;
      const latch: number = Math.abs(count);
      const timeout: number = Math.abs(next);
      let gesture: Gestures;
      let timer: number = 0;
      timer = currentTime - startTimeRef?.current;
      if (timer < 1000) {
        if (latch >= 40 && timeout <= 40) {
          gesture = count > 0 ? Gestures.SwipeRight : Gestures.SwipeLeft;
          setGestureType(gesture);
        } else if (timeout >= 40) {
          gesture = next > 0 ? Gestures.SwipeDown : Gestures.SwipeUp;
          setGestureType(gesture);
        } else {
          gesture = timer < 100 ? Gestures.Tap : Gestures.TapAndHold;
          setGestureType(gesture);
        }
      }
    },
    [swipeTarget]
  );
  const touchMoveGesture = useCallback(
    (e: any): void => {
      if (!swipeTarget) {
        return;
      }
      if (preventTouchMoveDefault) {
        e.preventDefault();
      }
    },
    [swipeTarget]
  );
  useMemo(() => {
    if (!swipeTarget) {
      return null;
    }
    swipeTarget?.addEventListener('touchstart', startTouchGesture, {
      capture: false,
      passive: false,
    });
    swipeTarget?.addEventListener('touchend', endTouchGesture, {
      capture: false,
      passive: false,
    });
    swipeTarget?.addEventListener('touchmove', touchMoveGesture, {
      capture: false,
      passive: false,
    });
    swipeTarget?.addEventListener('mousemove', onMouseMove, {
      capture: false,
      passive: false,
    });
    return () => {
      swipeTarget?.removeEventListener('touchstart', startTouchGesture);
      swipeTarget?.removeEventListener('touchend', endTouchGesture);
      swipeTarget?.removeEventListener('touchmove', touchMoveGesture);
      swipeTarget?.removeEventListener('mousemove', onMouseMove);
    };
  }, [swipeTarget]);
  return gestureType;
};
export default useGestures;
