import { useRef, useEffect } from 'react';

export const MAX_PERCENT: number = 100;

export const useTransitionDuration = (): SVGPathElement[] => {
    const pathsRef: React.MutableRefObject<SVGPathElement[]> = useRef<
        SVGPathElement[]
    >([]);
    const prevTimeStamp: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        const now: number = Date.now();
        let updated: boolean = false;

        pathsRef.current.forEach((path: SVGPathElement) => {
            if (!path) {
                return;
            }

            updated = true;
            const pathStyle: CSSStyleDeclaration = path.style;
            pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

            if (
                prevTimeStamp.current &&
                now - prevTimeStamp.current < MAX_PERCENT
            ) {
                pathStyle.transitionDuration = '0s, 0s';
            }
        });

        if (updated) {
            prevTimeStamp.current = Date.now();
        }
    });

    return pathsRef.current;
};
