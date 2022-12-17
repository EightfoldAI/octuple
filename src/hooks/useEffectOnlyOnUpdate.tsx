import React, { useEffect, useRef } from 'react';

/**
 * Hook that doesn't run on initial value setting, only on updates.
 * @param callback function to be executed on dep update.
 * @param dependencies list of deps which will trigger callback on update.
 */
export const useEffectOnlyOnUpdate = (
  callback: React.EffectCallback,
  dependencies: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  }, [callback, dependencies]);
};
