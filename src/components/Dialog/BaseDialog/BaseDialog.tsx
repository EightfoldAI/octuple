import React, { FC, Ref, useEffect } from 'react';
import { BaseDialogProps } from './BaseDialog.types';
import { Portal } from '../../Portal';
import {
    mergeClasses,
    stopPropagation,
    uniqueId,
} from '../../../shared/utilities';
import { IconName } from '../../Icon';
import { NeutralButton } from '../../Button';
import { useScrollLock } from '../../../hooks/useScrollLock';

import styles from './base-dialog.module.scss';

export const BaseDialog: FC<BaseDialogProps> = React.forwardRef(
    (
        {
            actionButtonOneProps,
            actionButtonTwoProps,
            actionButtonThreeProps,
            actions,
            actionsClassNames,
            body,
            bodyClassNames,
            closable = true,
            closeButtonProps,
            closeIcon = IconName.mdiClose,
            dialogClassNames,
            dialogWrapperClassNames,
            header,
            headerButtonProps,
            headerClassNames,
            headerIcon = IconName.mdiArrowLeftThick,
            height,
            maskClosable = true,
            onClose,
            onVisibleChange,
            overlay = true,
            parent = document.body,
            positionStrategy = 'fixed',
            style,
            visible,
            width,
            zIndex,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const labelId = uniqueId('dialog-label-');

        useScrollLock(parent, visible);

        const dialogBackdropClasses: string = mergeClasses([
            styles.dialogBackdrop,
            dialogWrapperClassNames,
            { [styles.visible]: visible },
            { [styles.modeless]: overlay === false },
        ]);

        const dialogClasses: string = mergeClasses([
            styles.dialog,
            dialogClassNames,
        ]);

        const headerClasses: string = mergeClasses([
            styles.header,
            headerClassNames,
        ]);

        const dialogBackdropStyle: React.CSSProperties = {
            position: positionStrategy,
            ...style,
        };

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
                {...rest}
                ref={ref}
                role="dialog"
                aria-modal={true}
                aria-labelledby={labelId}
                style={dialogBackdropStyle}
                className={dialogBackdropClasses}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    !overlay || (maskClosable && onClose?.(e));
                }}
            >
                <div
                    className={dialogClasses}
                    style={dialogStyle}
                    onClick={stopPropagation}
                >
                    <div className={headerClasses}>
                        {headerButtonProps && (
                            <NeutralButton
                                ariaLabel={'Back'}
                                iconProps={{ path: headerIcon }}
                                {...headerButtonProps}
                            />
                        )}
                        <span id={labelId}>{header}</span>
                        <span className={styles.headerButtons}>
                            {actionButtonThreeProps && (
                                <NeutralButton {...actionButtonThreeProps} />
                            )}
                            {actionButtonTwoProps && (
                                <NeutralButton {...actionButtonTwoProps} />
                            )}
                            {actionButtonOneProps && (
                                <NeutralButton {...actionButtonOneProps} />
                            )}
                            {closable && (
                                <NeutralButton
                                    ariaLabel={'Close'}
                                    iconProps={{ path: closeIcon }}
                                    onClick={onClose}
                                    {...closeButtonProps}
                                />
                            )}
                        </span>
                    </div>
                    <div className={bodyClassNames}>{body}</div>
                    {actions && (
                        <div className={actionsClassNames}>{actions}</div>
                    )}
                </div>
            </div>
        );
        return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
    }
);
