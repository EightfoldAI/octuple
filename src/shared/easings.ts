export const easeInOutCubic = (
    t: number,
    b: number,
    c: number,
    d: number
): number => {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
};
