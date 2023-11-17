import { useEffect, useState } from 'react';

export enum Gestures {
  SwipeUp = 'SwipeUp',
  SwipeDown = 'SwipeDown',
  SwipeLeft = 'SwipeLeft',
  SwipeRight = 'SwipeRight',
  Tap = 'Tap',
  TapAndHold = 'TapAndHold',
}

const useGestures = (
  swipeTarget: HTMLElement | Window | null
): Gestures | null => {
  const [startTime, setStartTime] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [gestureType, setGestureType] = useState<Gestures | null>(null);

  const startTouchGesture = (e: any): void => {
    if (!swipeTarget) {
      return;
    }

    setStartTime(new Date().getTime());
    setTouchStartX(e?.changedTouches[0]?.screenX);
    setTouchStartY(e?.changedTouches[0]?.screenY);
  };

  const endTouchGesture = (e: any): void => {
    if (!swipeTarget) {
      return;
    }

    const currentTime: number = new Date().getTime();
    const touchEndX: number = e?.changedTouches[0]?.screenX;
    const touchEndY: number = e?.changedTouches[0]?.screenY;
    const count: number = touchEndX - touchStartX;
    const next: number = touchEndY - touchStartY;
    const latch: number = Math.abs(count);
    const timeout: number = Math.abs(next);

    let gesture: Gestures;
    let timer: number = 0;

    timer = currentTime - startTime;

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
  };

  const touchMoveGesture = (e: any): void => {
    if (!swipeTarget) {
      return;
    }

    e.preventDefault();
  };

  const attachGestures = (): void => {
    if (!swipeTarget) {
      return;
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
  };

  const detachGestures = (): void => {
    if (!swipeTarget) {
      return;
    }

    swipeTarget?.removeEventListener('touchstart', startTouchGesture);
    swipeTarget?.removeEventListener('touchend', endTouchGesture);
    swipeTarget?.removeEventListener('touchmove', touchMoveGesture);
  };

  useEffect(() => {
    attachGestures();

    return () => {
      detachGestures();
    };
  });

  return gestureType;
};

export default useGestures;
