import { SnackbarProps } from './Snackbar.types';

const generateSnackId = (): string => {
    return Math.random().toString(36).substring(2, 9);
};

export const useSnack = () => {
    const serve = (props: SnackbarProps): void => {
        const id = generateSnackId();
        const serveSnackEvent = new CustomEvent<SnackbarProps>('serveSnack', {
            bubbles: true,
            cancelable: false,
            detail: {
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

    const eat = (snackId: string): void => {
        const removeSnackEvent = new CustomEvent<string>('removeSnack', {
            bubbles: true,
            cancelable: false,
            detail: snackId,
        });
        document.dispatchEvent(removeSnackEvent);
    };

    return {
        serve,
        add: serve,
        eat,
        remove: eat,
    };
};
