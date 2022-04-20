import React, { FC, useEffect } from 'react';
import { BaseDialogProps } from './BaseDialog.types';
import { Portal } from '../../Portal';
import {
    classNames,
    stopPropagation,
    uniqueId,
} from '../../../shared/utilities';
import { IconName } from '../../Icon';
import { NeutralButton } from '../../Button';
import { useScrollLock } from '../../../hooks/useScrollLock';

import styles from './base-dialog.module.scss';

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

    const { lockScroll, unlockScroll } = useScrollLock(parent);

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
        if (visible) {
            lockScroll();
        } else {
            unlockScroll();
        }
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
                {actions && <div className={actionsClassName}>{actions}</div>}
            </div>
        </div>
    );
    return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
};
