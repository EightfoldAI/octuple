import { canUseDom } from './canUseDom';
import visuallyHidden from './visuallyHidden';

export interface AnnouncementOptions {
  /**
   * The message to announce to screen readers
   */
  message: string;
  /**
   * Priority level for the announcement
   * 'polite' - announces when user is idle (default for most cases)
   * 'assertive' - interrupts current speech (use sparingly, for urgent messages)
   * @default 'assertive'
   */
  priority?: 'polite' | 'assertive';
  /**
   * Delay in milliseconds before announcing (helps with NVDA compatibility)
   * @default 100
   */
  delay?: number;
  /**
   * Whether to clear previous announcements before making new one
   * @default true
   */
  clearPrevious?: boolean;
}

interface AnnouncementRegion {
  element: HTMLElement;
  timeoutId?: number;
}

// Global announcement regions for reuse
const announcementRegions: {
  polite?: AnnouncementRegion;
  assertive?: AnnouncementRegion;
} = {};

/**
 * Creates or gets an existing announcement region for screen readers.
 * Uses the "priming" technique recommended for NVDA compatibility.
 */
function getAnnouncementRegion(priority: 'polite' | 'assertive'): AnnouncementRegion {
  if (!canUseDom()) {
    return { element: null as any };
  }

  // Return existing region if available
  if (announcementRegions[priority]) {
    return announcementRegions[priority]!;
  }

  // Create new announcement region using priming technique
  const element = document.createElement('div');

  // Apply NVDA-optimized attributes
  element.setAttribute('aria-live', priority);
  element.setAttribute('aria-atomic', 'true');
  element.setAttribute('role', 'status');
  element.setAttribute('aria-relevant', 'additions text');

  // Apply visually hidden styles for better cross-screen reader support
  Object.assign(element.style, visuallyHidden);

  // Add unique ID for debugging
  element.id = `octuple-sr-announce-${priority}-${Date.now()}`;

  // Add to document body
  document.body.appendChild(element);

  const region: AnnouncementRegion = { element };
  announcementRegions[priority] = region;

  return region;
}

/**
 * Announces a message to screen readers with NVDA-optimized timing and techniques.
 *
 * This utility specifically addresses NVDA compatibility issues by:
 * 1. Using pre-existing containers (priming technique)
 * 2. Using aria-live="assertive" by default for better NVDA support
 * 3. Implementing proper timing delays for content injection
 * 4. Adding role="status" for enhanced compatibility
 * 5. Using optimized visually hidden styles
 *
 * @param options - Configuration for the announcement
 */
export function announceToScreenReader(options: AnnouncementOptions): void {
  console.log('[DEBUG announceToScreenReader] Called with:', options);
  if (!canUseDom()) {
    console.log('[DEBUG announceToScreenReader] canUseDom() returned false');
    return;
  }

  const {
    message,
    priority = 'assertive', // Default to assertive for better NVDA support
    delay = 100, // Small delay helps NVDA recognition
    clearPrevious = true,
  } = options;

  if (!message.trim()) {
    console.log('[DEBUG announceToScreenReader] Empty message');
    return;
  }

  const region = getAnnouncementRegion(priority);
  console.log('[DEBUG announceToScreenReader] Got region:', region);

  if (!region.element) {
    console.log('[DEBUG announceToScreenReader] No region element');
    return;
  }

  // Clear existing timeout if any
  if (region.timeoutId) {
    clearTimeout(region.timeoutId);
  }

  // Clear previous announcement if requested
  if (clearPrevious) {
    region.element.textContent = '';
  }

  // Use setTimeout for proper timing (helps NVDA recognize content changes)
  console.log('[DEBUG announceToScreenReader] Scheduling announcement with delay:', delay);
  region.timeoutId = setTimeout(() => {
    if (region.element) {
      console.log('[DEBUG announceToScreenReader] Injecting content:', message);
      // Use textContent for better screen reader compatibility
      region.element.textContent = message;
    }
  }, delay);
}

/**
 * Creates a React hook for announcing messages to screen readers.
 * Provides cleanup on component unmount.
 */
export function useScreenReaderAnnouncement() {
  const announce = (options: AnnouncementOptions) => {
    announceToScreenReader(options);
  };

  // Cleanup function to clear timeouts
  const cleanup = () => {
    Object.values(announcementRegions).forEach(region => {
      if (region?.timeoutId) {
        clearTimeout(region.timeoutId);
        region.timeoutId = undefined;
      }
    });
  };

  return { announce, cleanup };
}

/**
 * Clears all announcement regions (useful for testing or cleanup)
 */
export function clearAnnouncementRegions(): void {
  if (!canUseDom()) {
    return;
  }

  Object.values(announcementRegions).forEach(region => {
    if (region?.element) {
      if (region.timeoutId) {
        clearTimeout(region.timeoutId);
      }
      if (region.element.parentNode) {
        region.element.parentNode.removeChild(region.element);
      }
    }
  });

  // Clear the registry
  announcementRegions.polite = undefined;
  announcementRegions.assertive = undefined;
}

// Cleanup on page unload
if (canUseDom()) {
  window.addEventListener('beforeunload', clearAnnouncementRegions);
}