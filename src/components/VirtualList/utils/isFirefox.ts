const isFF: boolean =
    typeof navigator === 'object' && /Firefox/i.test(navigator.userAgent);

export default isFF;
