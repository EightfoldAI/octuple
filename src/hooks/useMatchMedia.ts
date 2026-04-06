'use client';

import { useCallback, useEffect, useState } from 'react';
import { canUseDom } from '../shared/utilities';

export enum Breakpoints {
  XLarge = '(min-width: 1600px)',
  Large = '(min-width: 1200px)',
  Medium = '(min-width: 900px)',
  Small = '(min-width: 600px)',
  XSmall = '(min-width: 0)',
}

/**
 * A Hook to do CSS Media Queries in components.
 * @param breakpoint The mobile-first '(min-width: n)' threshold.
 * @returns a boolean determining if the threshold viewport size has been hit.
 */
export const useMatchMedia = (breakpoint: Breakpoints): boolean => {
  const [threshold, setThreshold] = useState<boolean>(() =>
    canUseDom() ? window.matchMedia(breakpoint).matches : false
  );

  const handleMatchMedia = useCallback((e: MediaQueryListEvent) => {
    setThreshold(e.matches);
  }, []);

  useEffect(() => {
    let mediaQueryList: MediaQueryList | null = null;

    // Check if window is defined to prevent SSR errors.
    if (canUseDom()) {
      mediaQueryList = window.matchMedia(breakpoint);
      setThreshold(mediaQueryList.matches);

      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleMatchMedia);
      } else {
        mediaQueryList.addListener(handleMatchMedia);
      }
    }

    return () => {
      if (mediaQueryList) {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', handleMatchMedia);
        } else if (mediaQueryList.removeListener) {
          mediaQueryList.removeListener(handleMatchMedia);
        }
      }
    };
  }, [breakpoint, handleMatchMedia]);

  return threshold;
};
