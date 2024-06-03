import React from 'react';
import { ItemProps } from './VirtualList.types';

export function Item({ children, setRef }: ItemProps) {
  const refFunc = React.useCallback((node) => {
    setRef(node);
  }, []);

  return React.cloneElement(children, {
    ref: refFunc,
  });
}
