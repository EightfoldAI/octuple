import { canUseDom } from './canUseDom';

let requestAnimationFrame: (callback: FrameRequestCallback) => number = (
  callback: FrameRequestCallback
) => +setTimeout(callback, 16);
let caf: (num: number) => void = (num: number) => clearTimeout(num);

if (canUseDom() && 'requestAnimationFrame' in window) {
  requestAnimationFrame = (callback: FrameRequestCallback) =>
    window.requestAnimationFrame(callback);
  caf = (handle: number) => window.cancelAnimationFrame(handle);
}

let rafUUID: number = 0;
const rafIds: Map<number, number> = new Map<number, number>();

const cleanup = (id: number) => {
  rafIds.delete(id);
};

export const requestAnimationFrameWrapper = (
  callback: () => void,
  times = 1
): number => {
  rafUUID += 1;
  const id: number = rafUUID;

  const callRef = (leftTimes: number): void => {
    if (leftTimes === 0) {
      // Clean up
      cleanup(id);

      // Trigger
      callback();
    } else {
      // Next requestAnimationFrame
      if (canUseDom()) {
        const realId = requestAnimationFrame(() => {
          callRef(leftTimes - 1);
        });

        // Bind real requestAnimationFrame id
        rafIds.set(id, realId);
      }
    }
  };

  callRef(times);

  return id;
};

requestAnimationFrameWrapper.cancel = (id: number): void => {
  const realId: number = rafIds.get(id);
  cleanup(realId);
  if (canUseDom()) {
    return caf(realId);
  }
};
