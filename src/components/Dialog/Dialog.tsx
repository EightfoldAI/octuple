import React, { FC } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { classNames } from '../../shared/utilities';
import { DefaultButton, PrimaryButton } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';

import styles from './dialog.module.scss';

export const Dialog: FC<DialogProps> = ({
    parent = document.body,
    size = DialogSize.medium,
    headerClassName,
    bodyClassName,
    actionsClassName,
    dialogClassName,
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
    ...rest
}) => {
    const dialogClasses: string = classNames([
        styles.dialog,
        dialogClassName,
        { [styles.small]: size === DialogSize.small },
        { [styles.medium]: size === DialogSize.medium },
    ]);

    const headerClasses: string = classNames([styles.header, headerClassName]);

    const bodyClasses: string = classNames([styles.body, bodyClassName]);

    const actionClasses: string = classNames([
        styles.actions,
        actionsClassName,
    ]);

    return (
        <BaseDialog
            {...rest}
            dialogClassName={dialogClasses}
            headerClassName={headerClasses}
            bodyClassName={bodyClasses}
            actionsClassName={actionClasses}
            actions={
                <>
                    {cancelButtonProps && (
                        <DefaultButton
                            {...cancelButtonProps}
                            onClick={onCancel}
                        />
                    )}
                    {okButtonProps && (
                        <PrimaryButton {...okButtonProps} onClick={onOk} />
                    )}
                </>
            }
        />
    );
};
