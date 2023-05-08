import { useEffect, useRef } from 'react';

export const usePreviousState = (value: any) => {
  const ref: React.MutableRefObject<any> = useRef();

  // useEffect when the value of 'value' changes
  useEffect(() => {
    // Assign the value of ref to the argument
    ref.current = value;
  }, [value]);

  // return the current ref value.
  return ref.current;
};
