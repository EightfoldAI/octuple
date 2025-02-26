import { SELECTORS } from './types';

/**
 * Interacts with the first interactive element found within a container element
 * based on a priority order of selectors.
 *
 * @param containerElement - The DOM element to search within
 * @returns boolean - Whether an interactive element was found and interacted with
 */
export function interactWithFirstInteractiveElement(
  containerElement: HTMLElement
): boolean {
  if (!containerElement) return false;

  // Define interactive elements in priority order with their selectors and actions
  const interactiveElements = [
    // Handle different input types with specific behaviors
    {
      selector: 'input[type="checkbox"], input[type="radio"]',
      action: 'click',
    },
    {
      selector:
        'input[type="button"], input[type="submit"], input[type="reset"]',
      action: 'click',
    },
    {
      selector:
        'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], input[type="datetime-local"], input[type="month"], input[type="time"], input[type="week"], input[type="color"]',
      action: 'focus',
    },
    { selector: 'button', action: 'click' },
    { selector: 'a[href]', action: 'click' },
    { selector: 'textarea', action: 'focus' },
    { selector: 'select', action: 'focus' },
    { selector: 'details', action: 'toggle' },
    { selector: '[tabindex]:not([tabindex="-1"])', action: 'focus' },
    { selector: 'iframe, object, embed', action: 'focus' },
  ];

  // Try to find and interact with elements in priority order
  const elementFound = interactiveElements.some(({ selector, action }) => {
    const element = containerElement.querySelector(selector) as HTMLElement;
    if (element) {
      switch (action) {
        case 'click':
          element.click();
          break;
        case 'focus':
          element.focus();
          break;
        case 'toggle':
          if (element instanceof HTMLDetailsElement) {
            element.open = !element.open;
          } else {
            element.click();
          }
          break;
        default:
          element.click();
      }
      return true; // Stop the loop once we've found and acted on an element
    }
    return false;
  });

  // If no specific interactive element was found, try using the SELECTORS constant
  if (!elementFound) {
    // Use SELECTORS as a fallback
    const anyInteractiveElement = containerElement.querySelector(
      SELECTORS
    ) as HTMLElement;
    if (anyInteractiveElement) {
      if (anyInteractiveElement.tagName === 'INPUT') {
        const inputElement = anyInteractiveElement as HTMLInputElement;
        const inputType = inputElement.type.toLowerCase();

        if (
          ['checkbox', 'radio', 'button', 'submit', 'reset'].includes(inputType)
        ) {
          inputElement.click();
        } else {
          inputElement.focus();
        }
      } else if (anyInteractiveElement.tagName === 'DETAILS') {
        const detailsElement = anyInteractiveElement as HTMLDetailsElement;
        detailsElement.open = !detailsElement.open;
      } else if (['BUTTON', 'A'].includes(anyInteractiveElement.tagName)) {
        anyInteractiveElement.click();
      } else {
        anyInteractiveElement.focus();
      }
      return true;
    } else {
      // If no interactive element found at all, click the container element itself
      containerElement.click();
      return true;
    }
  }

  return elementFound;
}
