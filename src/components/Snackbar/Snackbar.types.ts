import React from 'react';
import { InfoBarsProps, InfoBarType } from '../InfoBar';

export type SnackbarPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export type SnackbarType = InfoBarType;

export interface SnackbarProps extends Omit<InfoBarsProps, 'onClick'> {
  /**
   * Content of the snackbar
   */
  content: React.ReactNode;
  /**
   * Duration for which the snackbar is shown
   * @default 3000
   */
  duration?: number;
  /**
   * Unique id of the snackbar
   */
  id?: string;
  /**
   * Position of the snackbar
   * @default top-center
   */
  position?: SnackbarPosition;
  /**
   * Ref of the parent element
   */
  parentRef?: React.MutableRefObject<HTMLDivElement>;
  /**
   * Last focusable element of the snackbar
   */

  lastFocusableElement?: HTMLElement;
  /**
   * Whether to move focus to the snackbar
   * @default true
   */
  moveFocusToSnackba?: boolean;
}

export interface SnackbarContainerProps {
  /**
   * Parent container on which the snackbar needs to
   * be rendered
   */
  parent?: HTMLElement;
}

export type VoidFunction = () => void;
export interface ISnack {
  /**
   * Serves a snack.
   */
  serve: (props: SnackbarProps) => VoidFunction;
  /**
   * Serves a neutral snack.
   */
  serveNeutral: (props: SnackbarProps) => VoidFunction;
  /**
   * Serves a positive snack.
   */
  servePositive: (props: SnackbarProps) => VoidFunction;
  /**
   * Serves a warning snack.
   */
  serveWarning: (props: SnackbarProps) => VoidFunction;
  /**
   * Serves a disruptive snack.
   */
  serveDisruptive: (props: SnackbarProps) => VoidFunction;
}
