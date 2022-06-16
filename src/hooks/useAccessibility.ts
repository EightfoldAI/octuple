import { useCallback, RefObject, useEffect } from 'react';

const ACCESSIBILITY_EVENTS_MAP = {
  click: 'keydown',
  hover: 'focusin',
  contextmenu: '',
};

export const useAccessibility = (
  trigger: 'click' | 'hover' | 'contextmenu',
  ref: RefObject<any>,
  onEnter: () => void,
  onLeave: () => void
) => {
  const triggerEvent: string = ACCESSIBILITY_EVENTS_MAP[trigger];
  const handleAccessibility = useCallback(
    (e) => {
      if (ref.current?.contains?.(e.target)) {
        if (triggerEvent != 'keydown' || e.key == 'Enter') {
          return onEnter?.();
        }
        return null;
      }
      return onLeave?.();
    },
    [ref]
  );

  useEffect(() => {
    if (!triggerEvent) {
      return () => {};
    }
    document.addEventListener(triggerEvent, handleAccessibility);
    return () => {
      document.removeEventListener(triggerEvent, handleAccessibility);
    };
  }, [triggerEvent]);
};
