'use client';

import {
  ISnack,
  SnackbarPosition,
  SnackbarProps,
  VoidFunction,
} from './Snackbar.types';
import { canUseDocElement, generateId } from '../../shared/utilities';
import { InfoBarType } from '../InfoBar';

let elementToFocus: HTMLElement | null = null;
let activeSnacksCount: number = 0;

const DEFAULT_POSITION: SnackbarPosition = 'top-center';

export const SNACK_EVENTS: Record<string, string> = {
  SERVE: 'serveSnack',
  EAT: 'eatSnack',
};

export const serve = (props: SnackbarProps): VoidFunction => {
  const id = props.id ?? generateId();
  const serveSnackEvent = new CustomEvent<SnackbarProps>(SNACK_EVENTS.SERVE, {
    bubbles: true,
    cancelable: false,
    detail: {
      position: DEFAULT_POSITION,
      ...props,
      id,
    },
  });
  if (canUseDocElement()) {
    document.dispatchEvent(serveSnackEvent);
  }

  // Only store the element to focus if this is the first snack
  if (activeSnacksCount === 0) {
    if (props.lastFocusableElement) {
      elementToFocus = props.lastFocusableElement;
    } else {
      elementToFocus = document.activeElement as HTMLElement;
    }
  }

  activeSnacksCount++;

  if (!props.closable || props.actionButtonProps) {
    setTimeout(() => {
      eat(id);
    }, props.duration || 3000);
  }
  const closeSnack = () => eat(id);
  return closeSnack;
};

export const eat = (snackId: string): void => {
  const removeSnackEvent = new CustomEvent<string>(SNACK_EVENTS.EAT, {
    bubbles: true,
    cancelable: false,
    detail: snackId,
  });
  if (canUseDocElement()) {
    document.dispatchEvent(removeSnackEvent);
  }

  activeSnacksCount--;
  // Only return focus when all snacks are closed
  if (activeSnacksCount === 0 && elementToFocus) {
    elementToFocus.focus();
  }
};

export const serveNeutral = (props: SnackbarProps) =>
  serve({
    ...props,
    type: InfoBarType.neutral,
  });

export const servePositive = (props: SnackbarProps) =>
  serve({
    ...props,
    type: InfoBarType.positive,
  });

export const serveWarning = (props: SnackbarProps) =>
  serve({
    ...props,
    type: InfoBarType.warning,
  });

export const serveDisruptive = (props: SnackbarProps) =>
  serve({
    ...props,
    type: InfoBarType.disruptive,
  });

export const snack: ISnack = {
  serve,
  serveNeutral,
  servePositive,
  serveWarning,
  serveDisruptive,
};
