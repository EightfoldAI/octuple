import { useCallback, RefObject, useEffect } from 'react';
import { eventKeys } from '../shared/utilities';

const ACCESSIBILITY_EVENTS_MAP = {
  click: 'keydown',
  hover: 'focusin',
  contextmenu: '',
};

export const useAccessibility = (
  trigger: 'click' | 'hover' | 'contextmenu',
  ref: RefObject<any>,
  onEnter: () => void,
  onLeave: (e: any) => void
) => {
  const triggerEvent: string = ACCESSIBILITY_EVENTS_MAP[trigger];
  const handleAccessibility = useCallback(
    (e) => {
      if (ref.current?.contains?.(e.target)) {
        if (triggerEvent !== 'keydown' || e.key === eventKeys.ENTER) {
          return onEnter?.();
        } else if (e.key === eventKeys.ESCAPE) {
          return onLeave?.(e);
        }
      } else if (triggerEvent !== 'keydown' && onLeave) {
        return onLeave?.(e);
      }
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
