import { useEffect, useLayoutEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number | null
): void => {
  const savedCallback: React.MutableRefObject<() => void> = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if delay is not specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      // @ts-ignore
      return;
    }

    const id: NodeJS.Timer = setInterval(
      (): void => savedCallback.current(),
      delay
    );

    return (): void => clearInterval(id);
  }, [delay]);
};
