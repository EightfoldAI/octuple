import React, { FC, Ref } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { mergeClasses } from '../../shared/utilities';
import { DefaultButton, PrimaryButton } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';

import styles from './dialog.module.scss';

export const Dialog: FC<DialogProps> = React.forwardRef(
    (
        {
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
        },
        ref: Ref<HTMLDivElement>
    ) => {
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
                ref={ref}
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
    }
);
