import React, { FC, useEffect } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { Portal } from '../Portal';

import styles from './dialog.module.scss';
import { classNames, stopPropagation, uniqueId } from '../../shared/utilities';
import { DefaultButton, NeutralButton, PrimaryButton } from '../Button';
import { IconName } from '../Icon';

export const Dialog: FC<DialogProps> = ({
    parent = document.body,
    visible,
    onClose,
    maskClosable = true,
    onVisibleChange,
    height,
    width,
    zIndex,
    size = DialogSize.medium,
    header,
    headerClassName,
    body,
    bodyClassName,
    actionsClassName,
    dialogWrapperClassName,
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
}) => {
    const labelId = uniqueId('dialog-label-');

    const dialogBackdropClasses: string = classNames([
        styles.dialogBackdrop,
        dialogWrapperClassName,
        { [styles.visible]: visible },
    ]);

    const dialogClasses: string = classNames([
        styles.dialog,
        { [styles.small]: size === DialogSize.small },
        { [styles.medium]: size === DialogSize.medium },
    ]);

    const headerClasses: string = classNames([styles.header, headerClassName]);

    const bodyClasses: string = classNames([styles.body, bodyClassName]);

    const actionClasses: string = classNames([
        styles.actions,
        actionsClassName,
    ]);

    const dialogStyle: React.CSSProperties = {
        zIndex,
        height,
        width,
    };

    useEffect(() => {
        onVisibleChange?.(visible);
    }, [visible]);

    const getDialog = (): JSX.Element => (
        <div
            role="dialog"
            aria-modal={true}
            aria-labelledby={labelId}
            className={dialogBackdropClasses}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                maskClosable && onClose(e);
            }}
        >
            <div
                className={dialogClasses}
                style={dialogStyle}
                onClick={stopPropagation}
            >
                <div className={headerClasses}>
                    <span id={labelId}>{header}</span>
                    <NeutralButton icon={IconName.mdiClose} onClick={onClose} />
                </div>
                <div className={bodyClasses}>{body}</div>
                <div className={actionClasses}>
                    {cancelButtonProps && (
                        <DefaultButton
                            {...cancelButtonProps}
                            onClick={onCancel}
                        />
                    )}
                    {okButtonProps && (
                        <PrimaryButton {...okButtonProps} onClick={onOk} />
                    )}
                </div>
            </div>
        </div>
    );
    return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
};
