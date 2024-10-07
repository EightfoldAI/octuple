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
}

export interface SnackbarContainerProps {
  /**
   * Parent container on which the snackbar needs to
   * be rendered
   */
  parent?: HTMLElement;
}

export interface ISnack {
  /**
   * Serves a snack.
   */
  serve: (props: SnackbarProps) => string;
  /**
   * Serves a neutral snack.
   */
  serveNeutral: (props: SnackbarProps) => string;
  /**
   * Serves a positive snack.
   */
  servePositive: (props: SnackbarProps) => string;
  /**
   * Serves a warning snack.
   */
  serveWarning: (props: SnackbarProps) => string;
  /**
   * Serves a disruptive snack.
   */
  serveDisruptive: (props: SnackbarProps) => string;
  /**
   * Eat a snack.
   * @param snackId - The id of the snack to eat.
   * @returns void
   */
  eat: (snackId: string) => void;
}
