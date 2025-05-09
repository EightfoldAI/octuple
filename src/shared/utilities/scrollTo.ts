import { canUseDom } from './canUseDom';
import { getScroll } from './getScroll';
import { isWindow } from './getScroll';
import { requestAnimationFrameWrapper } from './raf';
import { easeInOutCubic } from '../../components/Motion/util/easings';

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window | Document;
  /** Scroll end callback */
  callback?: () => any;
  /** Animation duration, default as 450 */
  duration?: number;
}

export default function scrollTo(y: number, options: ScrollToOptions = {}) {
  const {
    getContainer = () => (canUseDom() ? window : undefined),
    callback,
    duration = 450,
  } = options;
  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      scrollTop,
      y,
      duration
    );
    if (isWindow(container)) {
      (container as Window).scrollTo(window.pageXOffset, nextScrollTop);
    } else if (
      container instanceof HTMLDocument ||
      container.constructor.name === 'HTMLDocument'
    ) {
      (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
    } else if (container instanceof HTMLElement) {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < duration) {
      requestAnimationFrameWrapper(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  requestAnimationFrameWrapper(frameFunc);
}
