import type { CSSMotionProps } from '../../Motion/CSSMotion.types';

interface GetMotionProps {
    motion: CSSMotionProps;
}

export function getMotion({ motion }: GetMotionProps): CSSMotionProps {
    if (motion) {
        return motion;
    }

    return null;
}
