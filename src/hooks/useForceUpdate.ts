import React, { useReducer } from 'react';

export const useForceUpdate: () => React.DispatchWithoutAction = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
};
