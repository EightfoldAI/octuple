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
import { NoFormStyle } from '../../Form/Context';

import styles from './base-dialog.module.scss';

export const BaseDialog: FC<BaseDialogProps> = React.forwardRef(
    (
        {
            actionButtonOneProps,
            actionButtonTwoProps,
            actionButtonThreeProps,
            closeButtonProps,
            closeIcon = IconName.mdiClose,
            parent = document.body,
            visible,
            onClose,
            maskClosable = true,
            onVisibleChange,
            height,
            width,
            zIndex,
            header,
            headerClassNames,
            body,
            bodyClassNames,
            actions,
            actionsClassNames,
            dialogWrapperClassNames,
            dialogClassNames,
            positionStrategy = 'fixed',
            style,
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
            <NoFormStyle status override>
                <div
                    {...rest}
                    ref={ref}
                    role="dialog"
                    aria-modal={true}
                    aria-labelledby={labelId}
                    style={dialogBackdropStyle}
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
                            <span className={styles.headerButtons}>
                                {actionButtonThreeProps && (
                                    <NeutralButton
                                        {...actionButtonThreeProps}
                                    />
                                )}
                                {actionButtonTwoProps && (
                                    <NeutralButton {...actionButtonTwoProps} />
                                )}
                                {actionButtonOneProps && (
                                    <NeutralButton {...actionButtonOneProps} />
                                )}
                                <NeutralButton
                                    ariaLabel={'Close'}
                                    iconProps={{ path: closeIcon }}
                                    onClick={onClose}
                                    {...closeButtonProps}
                                />
                            </span>
                        </div>
                        <div className={bodyClassNames}>{body}</div>
                        {actions && (
                            <div className={actionsClassNames}>{actions}</div>
                        )}
                    </div>
                </div>
            </NoFormStyle>
        );
        return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
    }
);
