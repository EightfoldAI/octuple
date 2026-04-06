import { useCallback, useEffect } from 'react';
import { useFocusVisible } from './useFocusVisible';

const FOCUS_VISIBLE_CLASSNAME: string = 'focus-visible';

export const useFocusVisibleClassName = (
  focusVisible?: boolean,
  focusVisibleElement?: HTMLElement
): void => {
  const isFocusVisible: boolean = useFocusVisible();

  const handleFocusVisible = useCallback(
    (focusVisibleElement: HTMLElement): void => {
      if (isFocusVisible) {
        if (!focusVisibleElement?.classList.contains(FOCUS_VISIBLE_CLASSNAME)) {
          focusVisibleElement?.classList.add(FOCUS_VISIBLE_CLASSNAME);
        }
      } else {
        if (focusVisibleElement?.classList.contains(FOCUS_VISIBLE_CLASSNAME)) {
          focusVisibleElement?.classList.remove(FOCUS_VISIBLE_CLASSNAME);
          if (focusVisibleElement?.classList.length === 0) {
            focusVisibleElement?.removeAttribute('class');
          }
        }
      }
    },
    [isFocusVisible]
  );

  useEffect(() => {
    if (focusVisible) {
      handleFocusVisible(focusVisibleElement);
    }
  }, [handleFocusVisible]);
};
