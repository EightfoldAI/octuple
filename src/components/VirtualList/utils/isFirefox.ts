const isFF: boolean =
  typeof window !== 'undefined' &&
  typeof navigator === 'object' &&
  /Firefox/i.test(navigator.userAgent);

export default isFF;
