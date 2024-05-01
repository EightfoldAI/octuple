'use client';

/**
 * A buffer or tolerance to account for any minor discrepancies
 * that might occur due to rounding errors, sub-pixel rendering, or other factors.
 */
const ROUNDING_ERROR_AFFORDANCE: number = 1;

/**
 * Detects whether an element's content has horizontal overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasHorizontalOverflow(element: HTMLElement): boolean {
  return element.clientWidth + ROUNDING_ERROR_AFFORDANCE < element.scrollWidth;
}

/**
 * Detects whether an element's content has vertical overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasVerticalOverflow(element: HTMLElement): boolean {
  return (
    element.clientHeight + ROUNDING_ERROR_AFFORDANCE < element.scrollHeight
  );
}

/**
 * Detects whether an element's content has overflow in any direction
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasOverflow(element: HTMLElement): boolean {
  return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
