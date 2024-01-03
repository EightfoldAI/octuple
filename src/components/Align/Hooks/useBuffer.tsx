import React from 'react';
import { canUseDom } from '../../../shared/utilities';

export default (callback: () => boolean, buffer: number) => {
  const calledRef = React.useRef<boolean>(false);
  const timeoutRef = React.useRef<number>(null);

  function cancelTrigger() {
    if (canUseDom()) {
      window.clearTimeout(timeoutRef.current);
    }
  }

  function trigger(force?: boolean) {
    cancelTrigger();

    if (!calledRef.current || force === true) {
      if (callback() === false) {
        // Not delay since callback cancelled self
        return;
      }

      calledRef.current = true;
      if (canUseDom()) {
        timeoutRef.current = window.setTimeout(() => {
          calledRef.current = false;
        }, buffer);
      }
    } else {
      if (canUseDom()) {
        timeoutRef.current = window.setTimeout(() => {
          calledRef.current = false;
          trigger();
        }, buffer);
      }
    }
  }

  return [
    trigger,
    () => {
      calledRef.current = false;
      cancelTrigger();
    },
  ];
};
