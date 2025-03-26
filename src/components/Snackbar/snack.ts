'use client';

import {
  ISnack,
  SnackbarPosition,
  SnackbarProps,
  VoidFunction,
} from './Snackbar.types';
import { canUseDocElement, generateId } from '../../shared/utilities';
import { InfoBarType } from '../InfoBar';

const DEFAULT_POSITION: SnackbarPosition = 'top-center';

const focusedElementsMap = new Map<string, HTMLElement>();

export const SNACK_EVENTS: Record<string, string> = {
  SERVE: 'serveSnack',
  EAT: 'eatSnack',
};

export const serve = (props: SnackbarProps): VoidFunction => {
  const id = props.id ?? generateId();

  if (props.lastFocusableElement instanceof HTMLElement) {
    focusedElementsMap.set(id, props.lastFocusableElement);
  }

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

    const elementToFocus = focusedElementsMap.get(snackId);
    if (elementToFocus?.isConnected) {
      elementToFocus.focus();
    }
    focusedElementsMap.delete(snackId);
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
