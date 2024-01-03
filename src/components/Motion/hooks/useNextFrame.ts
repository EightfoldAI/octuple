import React from 'react';
import {
  canUseDom,
  requestAnimationFrameWrapper,
} from '../../../shared/utilities';

export const useNextFrame = (): [
  (callback: (info: { isCanceled: () => boolean }) => void) => void,
  () => void
] => {
  const nextFrameRef = React.useRef<number>(null);

  function cancelNextFrame() {
    if (canUseDom()) {
      requestAnimationFrameWrapper.cancel(nextFrameRef.current);
    }
  }

  function nextFrame(
    callback: (info: { isCanceled: () => boolean }) => void,
    delay = 2
  ) {
    cancelNextFrame();

    if (canUseDom()) {
      const nextFrameId = requestAnimationFrameWrapper(() => {
        if (delay <= 1) {
          callback({
            isCanceled: () => nextFrameId !== nextFrameRef.current,
          });
        } else {
          nextFrame(callback, delay - 1);
        }
      });

      nextFrameRef.current = nextFrameId;
    }
  }

  React.useEffect(
    () => () => {
      cancelNextFrame();
    },
    []
  );

  return [nextFrame, cancelNextFrame];
};
