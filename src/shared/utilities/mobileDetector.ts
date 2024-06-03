import { canUseDom } from './canUseDom';

/**
 * Returns true if and only if the user is on a iOS device.
 * Used to determine whether iOS-specific behavior should be applied.
 */
export const isIOS = (): boolean => {
  if (!canUseDom() || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
};

/**
 * Returns true if and only if the user is on a Android device.
 * Used to determine whether Android-specific behavior should be applied.
 */
export const isAndroid = (): boolean => {
  if (!canUseDom() || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /android/i.test(window.navigator.userAgent);
};

/**
 * Returns true if and only if the user is on a touch device and is currently using its touch API.
 * Used to determine interaciton with hybrid touch devices like Microsoft Surface.
 */
export const isTouchSupported = (): boolean => {
  if (!canUseDom() || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
