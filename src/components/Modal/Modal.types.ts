import { BaseDialogProps } from '../Dialog/BaseDialog/BaseDialog.types';

export enum ModalSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
    fullscreen = 'fullscreen',
}

export interface ModalProps
    extends Omit<
        BaseDialogProps,
        'dialogWrapperClassName' | 'dialogClassName'
    > {
    /**
     * Size of the modal
     * @default medium
     */
    size?: ModalSize;
    /**
     * Custom class for the modal wrapper
     */
    modalWrapperClassName?: string;
    /**
     * Custom class for the modal
     */
    modalClassName?: string;
}
