import React, { FC, Ref } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { mergeClasses } from '../../shared/utilities';
import { NeutralButton, PrimaryButton } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';

import styles from './dialog.module.scss';

export const Dialog: FC<DialogProps> = React.forwardRef(
    (
        {
            actionButtonOneProps,
            actionButtonTwoProps,
            actionButtonThreeProps,
            actionsClassNames,
            bodyClassNames,
            bodyPadding = true,
            cancelButtonProps,
            closeButtonProps,
            closeIcon,
            dialogClassNames,
            headerButtonProps,
            headerClassNames,
            headerIcon,
            height,
            okButtonProps,
            onOk,
            onCancel,
            overlay,
            parent = document.body,
            size = DialogSize.medium,
            width,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const dialogClasses: string = mergeClasses([
            styles.dialog,
            { [styles.noBodyPadding]: bodyPadding === false },
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
                actions={
                    <>
                        {cancelButtonProps && (
                            <NeutralButton
                                {...cancelButtonProps}
                                onClick={onCancel}
                            />
                        )}
                        {okButtonProps && (
                            <PrimaryButton {...okButtonProps} onClick={onOk} />
                        )}
                    </>
                }
                actionsClassNames={actionClasses}
                bodyClassNames={bodyClasses}
                bodyPadding={bodyPadding}
                closeButtonProps={closeButtonProps}
                closeIcon={closeIcon}
                dialogClassNames={dialogClasses}
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
