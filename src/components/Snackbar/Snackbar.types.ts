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
   * Element to focus when the snackbar is closed
   */
  lastFocusableElement?: HTMLElement;
}

export interface SnackbarContainerProps {
  /**
   * Parent container on which the snackbar needs to
   * be rendered
   */
  parent?: HTMLElement;
  /**
   * DOM position for the snackbar container
   * 'start' - Insert at the beginning of parent (better for tab order)
   * 'end' - Insert at the end of parent (default)
   * @default 'end'
   */
  domPosition?: 'start' | 'end';
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
