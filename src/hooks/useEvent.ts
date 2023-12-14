import * as React from 'react';

type CallbackFunction = (...args: any[]) => any;

export function useEvent<T extends CallbackFunction>(callback: T): T {
  const fnRef = React.useRef<CallbackFunction>();
  fnRef.current = callback;

  const memoFn = React.useCallback<CallbackFunction>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    []
  );

  return memoFn as T;
}
