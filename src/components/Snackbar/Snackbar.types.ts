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
    content: string;
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
    serve: (props: SnackbarProps) => void;
    /**
     * Serves a neutral snack.
     */
    serveNeutral: (props: SnackbarProps) => void;
    /**
     * Serves a positive snack.
     */
    servePositive: (props: SnackbarProps) => void;
    /**
     * Serves a warning snack.
     */
    serveWarning: (props: SnackbarProps) => void;
    /**
     * Serves a disruptive snack.
     */
    serveDisruptive: (props: SnackbarProps) => void;
}
