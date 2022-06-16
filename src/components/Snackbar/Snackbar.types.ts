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
   * Unique id of the snackbar
   */
  id?: string;
  /**
   * Content of the snackbar
   */
  content: string;
  /**
   * Duration for which the snackbar is shown
   * @default 3000
   */
  duration?: number;
  /**
   * Position of the snackbar
   * @default top-center
   */
  position?: SnackbarPosition;
}

export interface SnackbarContainerProps {
  /**
   * Parent container on which the snackbar need to
   * be rendered on
   */
  parent?: HTMLElement;
}

export interface ISnack {
  serve: (props: SnackbarProps) => void;
  serveNeutral: (props: SnackbarProps) => void;
  servePositive: (props: SnackbarProps) => void;
  serveWarning: (props: SnackbarProps) => void;
  serveDisruptive: (props: SnackbarProps) => void;
}
