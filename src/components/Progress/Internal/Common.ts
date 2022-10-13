import { useRef, useEffect } from 'react';
import { OcProgressProps } from './OcProgress.types';

export const defaultProps: Partial<OcProgressProps> = {
    classNames: '',
    percent: 0,
    strokeColor: 'var(--primary-color-60)',
    strokeLinecap: 'round',
    strokeWidth: 1,
    style: {},
    trailColor: 'var(--accent-color-10)',
    trailWidth: 1,
    gapPosition: 'bottom',
};

export const useTransitionDuration = (): SVGPathElement[] => {
    const pathsRef = useRef<SVGPathElement[]>([]);
    const prevTimeStamp = useRef(null);

    useEffect(() => {
        const now = Date.now();
        let updated = false;

        pathsRef.current.forEach((path) => {
            if (!path) {
                return;
            }

            updated = true;
            const pathStyle = path.style;
            pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

            if (prevTimeStamp.current && now - prevTimeStamp.current < 100) {
                pathStyle.transitionDuration = '0s, 0s';
            }
        });

        if (updated) {
            prevTimeStamp.current = Date.now();
        }
    });

    return pathsRef.current;
};
