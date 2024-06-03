import ReactDOM from 'react-dom';

/**
 * A custom wrapper for addEventListener
 * @param target - The element target
 * @param type - The event type
 * @param listener - The callback function
 * @param option - The options
 * @returns A self-removing event listener
 */
export const addEventListenerWrapper = (
  target: any,
  type: string,
  listener: (a: any) => any | EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOrEventListenerObject
) => {
  const internalCallback = ReactDOM.unstable_batchedUpdates
    ? function run(e: any) {
        ReactDOM.unstable_batchedUpdates(listener, e);
      }
    : listener;
  if (target?.addEventListener) {
    target.addEventListener(type, internalCallback, options);
  }
  return {
    remove: () => {
      if (target?.removeEventListener) {
        target.removeEventListener(type, internalCallback, options);
      }
    },
  };
};
