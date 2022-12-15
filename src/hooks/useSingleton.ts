import { useRef } from 'react';

/**
 * Ensures that a given block of code is run once, and only once.
 * @param callBack Code to run.
 */
export const useSingleton = (callBack = () => {}): void => {
  const hasBeenCalled = useRef(false);

  if (hasBeenCalled.current) {
    return;
  }

  callBack();

  hasBeenCalled.current = true;
};
