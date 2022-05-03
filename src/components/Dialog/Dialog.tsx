import React, { FC } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { mergeClasses } from '../../shared/utilities';
import { DefaultButton, PrimaryButton } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';

import styles from './dialog.module.scss';

export const Dialog: FC<DialogProps> = ({
    parent = document.body,
    size = DialogSize.medium,
    headerClassNames,
    bodyClassNames,
    actionsClassNames,
    dialogClassNames,
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
    ...rest
}) => {
    const dialogClasses: string = mergeClasses([
        styles.dialog,
        dialogClassNames,
        { [styles.small]: size === DialogSize.small },
        { [styles.medium]: size === DialogSize.medium },
    ]);

    const headerClasses: string = mergeClasses([
        styles.header,
        headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const actionClasses: string = mergeClasses([
        styles.actions,
        actionsClassNames,
    ]);

    return (
        <BaseDialog
            {...rest}
            dialogClassNames={dialogClasses}
            headerClassNames={headerClasses}
            bodyClassNames={bodyClasses}
            actionsClassNames={actionClasses}
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
