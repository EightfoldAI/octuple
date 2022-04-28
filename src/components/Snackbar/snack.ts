import {
    ISnack,
    SnackbarPosition,
    SnackbarProps,
    SnackbarType,
} from './Snackbar.types';
import { generateId } from '../../shared/utilities';

const DEFAULT_POSITION: SnackbarPosition = 'top-center';

export const SNACK_EVENTS: Record<string, string> = {
    SERVE: 'serveSnack',
    EAT: 'eatSnack',
};

export const serve = (props: SnackbarProps): void => {
    const id = generateId();
    const serveSnackEvent = new CustomEvent<SnackbarProps>(SNACK_EVENTS.SERVE, {
        bubbles: true,
        cancelable: false,
        detail: {
            position: DEFAULT_POSITION,
            ...props,
            id,
        },
    });
    document.dispatchEvent(serveSnackEvent);
    if (!props.closable) {
        setTimeout(() => {
            eat(id);
        }, props.duration || 3000);
    }
};

export const eat = (snackId: string): void => {
    const removeSnackEvent = new CustomEvent<string>(SNACK_EVENTS.EAT, {
        bubbles: true,
        cancelable: false,
        detail: snackId,
    });
    document.dispatchEvent(removeSnackEvent);
};

export const serveNeutral = (props: SnackbarProps) =>
    serve({
        ...props,
        type: SnackbarType.neutral,
    });

export const servePositive = (props: SnackbarProps) =>
    serve({
        ...props,
        type: SnackbarType.positive,
    });

export const serveWarning = (props: SnackbarProps) =>
    serve({
        ...props,
        type: SnackbarType.warning,
    });

export const serveDisruptive = (props: SnackbarProps) =>
    serve({
        ...props,
        type: SnackbarType.disruptive,
    });

export const snack: ISnack = {
    serve,
    serveNeutral,
    servePositive,
    serveWarning,
    serveDisruptive,
};
