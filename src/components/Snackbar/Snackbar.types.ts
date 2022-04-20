export enum SnackbarType {
    neutral = 'neutral',
    positive = 'positive',
    warning = 'warning',
    disruptive = 'disruptive',
}

export interface SnackbarProps {
    message: string;
    type?: SnackbarType;
}
