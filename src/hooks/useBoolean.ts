'use client';

import { useState } from 'react';
import { useConst } from './useConst';

/** Updater callbacks returned by `useBoolean`. */
export type UseBooleanCallbacks = {
  /** Set the value to true. Always has the same identity. */
  setTrue: () => void;
  /** Set the value to false. Always has the same identity. */
  setFalse: () => void;
  /** Toggle the value. Always has the same identity. */
  toggle: () => void;
};

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export const useBoolean = (
  initialState: boolean
): [boolean, UseBooleanCallbacks] => {
  const [value, setValue] = useState<boolean>(initialState);

  const setTrue = useConst(() => () => {
    setValue(true);
  });
  const setFalse = useConst(() => () => {
    setValue(false);
  });
  const toggle = useConst(() => () => {
    setValue((currentValue) => !currentValue);
  });

  return [value, { setTrue, setFalse, toggle }];
};
