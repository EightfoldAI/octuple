import { useCallback, useEffect, useState } from 'react';

/**
 * A Hook to return the canvas direction of the document, 'inherit', 'ltr', or 'rtl'.
 * Checks html dir, or lang if not present. Defaults to ltr.
 * @returns the canvas direction.
 */
export const useCanvasDirection = (): string => {
    const [dir, setDir] = useState<string>();

    const getDirection = useCallback(
        (lang: string) => {
            if (document?.documentElement?.dir === 'rtl') {
                setDir(document.documentElement.dir);
            } else {
                // only check first two chars of string to ensure no false positives (e.g. es-AR)
                if (
                    lang &&
                    (lang.substring(0, 2) === 'ar' ||
                        lang.substring(0, 2) === 'he')
                ) {
                    setDir('rtl');
                } else {
                    setDir('ltr');
                }
            }
        },
        [dir]
    );

    useEffect((): void => {
        const lang =
            window?.navigator?.userLanguage || window?.navigator?.language;
        getDirection(lang);
    }, []);

    return dir;
};
