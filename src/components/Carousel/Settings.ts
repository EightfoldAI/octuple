type IntersectionObserverEntryVisibilityRatio = number;
type throttleInterval = number;

interface IntersectionObserverOptions extends IntersectionObserverInit {
  ratio: IntersectionObserverEntryVisibilityRatio;
  throttle: throttleInterval;
}

export const observerOptions: IntersectionObserverOptions = {
  ratio: 0.9,
  rootMargin: '8px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
  throttle: 100,
};
