import React, { FC } from 'react';
import { ModalProps, ModalSize } from './Modal.types';
import { mergeClasses } from '../../shared/utilities';
import { BaseDialog } from '../Dialog/BaseDialog/BaseDialog';

import styles from './modal.module.scss';

export const Modal: FC<ModalProps> = ({
    size = ModalSize.medium,
    headerClassNames,
    bodyClassNames,
    actionsClassNames,
    modalClassNames,
    modalWrapperClassNames,
    ...rest
}) => {
    const modalClasses: string = mergeClasses([
        styles.modal,
        modalClassNames,
        { [styles.small]: size === ModalSize.small },
        { [styles.medium]: size === ModalSize.medium },
        { [styles.large]: size === ModalSize.large },
        { [styles.fullscreen]: size === ModalSize.fullscreen },
    ]);

    const headerClasses: string = mergeClasses([
        styles.header,
        headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const actionsClasses: string = mergeClasses([
        styles.footer,
        actionsClassNames,
    ]);

    return (
        <BaseDialog
            {...rest}
            dialogWrapperClassNames={modalWrapperClassNames}
            dialogClassNames={modalClasses}
            headerClassNames={headerClasses}
            bodyClassNames={bodyClasses}
            actionsClassNames={actionsClasses}
        />
    );
};
