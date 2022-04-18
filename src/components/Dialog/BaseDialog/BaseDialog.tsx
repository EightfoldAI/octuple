import React, { FC, useEffect } from 'react';
import { BaseDialogProps } from './BaseDialog.types';
import { Portal } from '../../Portal';

import styles from './base-dialog.module.scss';
import {
    classNames,
    stopPropagation,
    uniqueId,
} from '../../../shared/utilities';
import { IconName } from '../../Icon';
import { NeutralButton } from '../../Button';

export const BaseDialog: FC<BaseDialogProps> = ({
    parent = document.body,
    visible,
    onClose,
    maskClosable = true,
    onVisibleChange,
    height,
    width,
    zIndex,
    header,
    headerClassName,
    body,
    bodyClassName,
    actions,
    actionsClassName,
    dialogWrapperClassName,
    dialogClassName,
}) => {
    const labelId = uniqueId('dialog-label-');

    const dialogBackdropClasses: string = classNames([
        styles.dialogBackdrop,
        dialogWrapperClassName,
        { [styles.visible]: visible },
    ]);

    const dialogClasses: string = classNames([styles.dialog, dialogClassName]);

    const headerClasses: string = classNames([styles.header, headerClassName]);

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
                maskClosable && onClose?.(e);
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
                <div className={bodyClassName}>{body}</div>
                <div className={actionsClassName}>{actions}</div>
            </div>
        </div>
    );
    return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
};
