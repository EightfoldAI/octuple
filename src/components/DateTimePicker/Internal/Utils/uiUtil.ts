import dayjs, { Dayjs } from 'dayjs';
import { DatePickerProps } from '../../DatePicker';
import type { GenerateConfig } from '../Generate';
import type {
  CustomFormat,
  PartialMode,
  OcPickerMode,
} from '../OcPicker.types';
import {
  canUseDom,
  eventKeys,
  isVisible,
  requestAnimationFrameWrapper,
} from '../../../../shared/utilities';

const scrollIds: Map<HTMLElement, number> = new Map<HTMLElement, number>();

/** Trigger when element is visible in view */
export function waitElementReady(
  element: HTMLElement,
  callback: () => void
): () => void {
  let id: number;

  function tryOrNextFrame() {
    if (isVisible(element)) {
      callback();
    } else {
      id = requestAnimationFrameWrapper(() => {
        tryOrNextFrame();
      });
    }
  }

  tryOrNextFrame();

  return () => {
    requestAnimationFrameWrapper.cancel(id);
  };
}

/* eslint-disable no-param-reassign */
export function scrollTo(element: HTMLElement, to: number, duration: number) {
  if (!canUseDom()) {
    return;
  }
  if (scrollIds.get(element)) {
    cancelAnimationFrame(scrollIds.get(element)!);
  }

  // jump to target if duration zero
  if (duration <= 0) {
    scrollIds.set(
      element,
      requestAnimationFrame(() => {
        element.scrollTop = to;
      })
    );

    return;
  }
  const difference: number = to - element.scrollTop;
  const perTick: number = (difference / duration) * 10;

  scrollIds.set(
    element,
    requestAnimationFrame(() => {
      element.scrollTop += perTick;
      if (element.scrollTop !== to) {
        scrollTo(element, to, duration - 10);
      }
    })
  );
}
/* eslint-enable */

export type KeyboardConfig = {
  onLeftRight?: ((diff: number) => void) | null;
  onCtrlLeftRight?: ((diff: number) => void) | null;
  onUpDown?: ((diff: number) => void) | null;
  onPageUpDown?: ((diff: number) => void) | null;
  onEnter?: (() => void) | null;
};

export function createKeyDownHandler(
  event: React.KeyboardEvent<HTMLElement>,
  {
    onLeftRight,
    onCtrlLeftRight,
    onUpDown,
    onPageUpDown,
    onEnter,
  }: KeyboardConfig
): boolean {
  const { key, ctrlKey, metaKey } = event;

  switch (key) {
    case eventKeys.ARROWLEFT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(-1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(-1);
        return true;
      }
      break;

    case eventKeys.ARROWRIGHT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(1);
        return true;
      }
      break;

    case eventKeys.ARROWUP:
      if (onUpDown) {
        onUpDown(-1);
        return true;
      }
      break;

    case eventKeys.ARROWDOWN:
      if (onUpDown) {
        onUpDown(1);
        return true;
      }
      break;

    case eventKeys.PAGEUP:
      if (onPageUpDown) {
        onPageUpDown(-1);
        return true;
      }
      break;

    case eventKeys.PAGEDOWN:
      if (onPageUpDown) {
        onPageUpDown(1);
        return true;
      }
      break;

    case eventKeys.ENTER:
      if (onEnter) {
        onEnter();
        return true;
      }
      break;
  }

  return false;
}

export function getDefaultFormat<DateType>(
  format:
    | string
    | CustomFormat<DateType>
    | (string | CustomFormat<DateType>)[]
    | undefined,
  picker: OcPickerMode | undefined,
  showTime: boolean | object | undefined,
  use12Hours: boolean | undefined
) {
  let mergedFormat:
    | string
    | CustomFormat<DateType>
    | (string | CustomFormat<DateType>)[] = format;

  const weekStartEndFormat: DatePickerProps['format'] = (value: Dayjs) =>
    `${dayjs(value).startOf('week').format('YYYY-MM-DD')} to ${dayjs(value)
      .endOf('week')
      .format('YYYY-MM-DD')}`;

  if (!mergedFormat) {
    switch (picker) {
      case 'time':
        mergedFormat = use12Hours ? 'hh:mm:ss a' : 'HH:mm:ss';
        break;

      case 'week':
        mergedFormat = weekStartEndFormat as unknown as CustomFormat<DateType>;
        break;

      case 'month':
        mergedFormat = 'YYYY-MM';
        break;

      case 'quarter':
        mergedFormat = 'YYYY-[Q]Q';
        break;

      case 'year':
        mergedFormat = 'YYYY';
        break;

      default:
        mergedFormat = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    }
  }

  return mergedFormat;
}

export function getInputSize<DateType>(
  picker: OcPickerMode | undefined,
  format: string | CustomFormat<DateType>,
  generateConfig: GenerateConfig<DateType>
) {
  const defaultSize: 8 | 10 = picker === 'time' ? 8 : 10;
  const length: number =
    typeof format === 'function'
      ? format(generateConfig.getNow()).length
      : format.length;
  return Math.max(defaultSize, length) + 2;
}

type ClickEventHandler = (event: MouseEvent) => void;
let globalClickFunc: ClickEventHandler | null = null;
const clickCallbacks: Set<ClickEventHandler> = new Set<ClickEventHandler>();

export function addGlobalMouseDownEvent(callback: ClickEventHandler) {
  if (
    !globalClickFunc &&
    typeof window !== 'undefined' &&
    window.addEventListener
  ) {
    globalClickFunc = (e: MouseEvent) => {
      // Clone a new list to avoid repeat trigger events
      [...clickCallbacks].forEach((queueFunc) => {
        queueFunc(e);
      });
    };
    window.addEventListener('mousedown', globalClickFunc);
  }

  clickCallbacks.add(callback);

  return () => {
    clickCallbacks.delete(callback);
    if (clickCallbacks.size === 0) {
      window.removeEventListener('mousedown', globalClickFunc!);
      globalClickFunc = null;
    }
  };
}

export function getTargetFromEvent(e: Event) {
  const target: HTMLElement = e.target as HTMLElement;

  // get target if in shadow dom
  if (e.composed && target.shadowRoot) {
    return (e.composedPath?.()[0] || target) as HTMLElement;
  }

  return target;
}

const getYearNextMode = (next: PartialMode): PartialMode => {
  if (next === 'month' || next === 'date') {
    return 'year';
  }
  return next;
};

const getMonthNextMode = (next: PartialMode): PartialMode => {
  if (next === 'date') {
    return 'month';
  }
  return next;
};

const getQuarterNextMode = (next: PartialMode): PartialMode => {
  if (next === 'month' || next === 'date') {
    return 'quarter';
  }
  return next;
};

const getWeekNextMode = (next: PartialMode): PartialMode => {
  if (next === 'date') {
    return 'week';
  }
  return next;
};

export const PickerModeMap: Record<
  OcPickerMode,
  ((next: PartialMode) => PartialMode) | null
> = {
  year: getYearNextMode,
  month: getMonthNextMode,
  quarter: getQuarterNextMode,
  week: getWeekNextMode,
  time: null,
  date: null,
};

export function elementsContains(
  elements: (HTMLElement | undefined | null)[],
  target: HTMLElement
) {
  return elements.some((ele) => ele && ele.contains(target));
}
