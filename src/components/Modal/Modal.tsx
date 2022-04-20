import React, { FC } from 'react';
import { ModalProps, ModalSize } from './Modal.types';
import { classNames } from '../../shared/utilities';
import { BaseDialog } from '../Dialog/BaseDialog/BaseDialog';

import styles from './modal.module.scss';

export const Modal: FC<ModalProps> = ({
    size = ModalSize.medium,
    headerClassName,
    bodyClassName,
    actionsClassName,
    modalClassName,
    modalWrapperClassName,
    ...rest
}) => {
    const modalClasses: string = classNames([
        styles.modal,
        modalClassName,
        { [styles.small]: size === ModalSize.small },
        { [styles.medium]: size === ModalSize.medium },
        { [styles.large]: size === ModalSize.large },
        { [styles.fullscreen]: size === ModalSize.fullscreen },
    ]);

    const headerClasses: string = classNames([styles.header, headerClassName]);

    const bodyClasses: string = classNames([styles.body, bodyClassName]);

    const actionsClasses: string = classNames([
        styles.footer,
        actionsClassName,
    ]);

    return (
        <BaseDialog
            {...rest}
            dialogWrapperClassName={modalWrapperClassName}
            dialogClassName={modalClasses}
            headerClassName={headerClasses}
            bodyClassName={bodyClasses}
            actionsClassName={actionsClasses}
        />
    );
};
