import React, { FC, Ref } from 'react';
import { ModalProps, ModalSize } from './Modal.types';
import { mergeClasses } from '../../shared/utilities';
import { BaseDialog } from '../Dialog/BaseDialog/BaseDialog';

import styles from './modal.module.scss';

export const Modal: FC<ModalProps> = React.forwardRef(
    (
        {
            actionButtonOneProps,
            actionButtonTwoProps,
            actionButtonThreeProps,
            actionsClassNames,
            bodyClassNames,
            bodyPadding = true,
            closeButtonProps,
            closeIcon,
            headerButtonProps,
            headerClassNames,
            headerIcon,
            height,
            modalClassNames,
            modalWrapperClassNames,
            overlay,
            size = ModalSize.medium,
            width,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const modalClasses: string = mergeClasses([
            styles.modal,
            { [styles.noBodyPadding]: bodyPadding === false },
            modalClassNames,
            { [styles.small]: size === ModalSize.small },
            { [styles.medium]: size === ModalSize.medium },
            { [styles.large]: size === ModalSize.large },
            { [styles.xLarge]: size === ModalSize.xLarge },
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
                ref={ref}
                actionButtonOneProps={actionButtonOneProps}
                actionButtonTwoProps={actionButtonTwoProps}
                actionButtonThreeProps={actionButtonThreeProps}
                actionsClassNames={actionsClasses}
                bodyClassNames={bodyClasses}
                bodyPadding={bodyPadding}
                closeButtonProps={closeButtonProps}
                closeIcon={closeIcon}
                dialogClassNames={modalClasses}
                dialogWrapperClassNames={modalWrapperClassNames}
                headerButtonProps={headerButtonProps}
                headerClassNames={headerClasses}
                headerIcon={headerIcon}
                height={height}
                overlay={overlay}
                width={width}
            />
        );
    }
);
