'use client';

import { useCallback, useEffect, useState } from 'react';
import { canUseDocElement, canUseDom } from '../shared/utilities';

/**
 * Indicates the directionality of an element's text.
 */
export type dir = 'inherit' | 'ltr' | 'rtl';

/** The lang must be a valid string, and may contain
 * XX, XXX, XX-XX, XXX-XX, XXX-XXX, XX-XXX
 * XX/XX, XXX/XX, XXX/XXX, XX/XXX
 * @returns true or false.
 * @param language
 */
export const isValidLangFormat = (lang: string): boolean => {
  if (!lang) {
    return false;
  }

  const validRegex = '^[a-zA-Z]{2,3}([-/][a-zA-Z]{2,3})?$';
  const regExp = new RegExp(validRegex);

  return regExp.test(lang);
};

/**
 * A Hook to return the canvas direction of the document, 'inherit', 'ltr', or 'rtl'.
 * Checks html dir, or lang if not present. Defaults to ltr.
 * @returns the canvas direction.
 * @param optional language string
 */
export const useCanvasDirection = (lang?: string): string => {
  const [dir, setDir] = useState<dir>();

  const getDirection = useCallback(
    (lang: string) => {
      if (canUseDocElement() && document?.documentElement?.dir === 'rtl') {
        setDir(document.documentElement.dir);
      } else {
        // only check first two chars of string to ensure no false positives (e.g. es-AR)
        if (lang?.substring(0, 2) === 'ar' || lang?.substring(0, 2) === 'he') {
          setDir('rtl');
        } else {
          setDir('ltr');
        }
      }
    },
    [dir]
  );

  useEffect((): void => {
    getDirection(
      isValidLangFormat(lang)
        ? lang
        : canUseDom()
        ? window?.navigator?.userLanguage || window?.navigator?.language
        : undefined
    );
  }, []);

  return dir;
};
