import React, { FC, Ref, useEffect, useRef } from 'react';
import { BaseDialogProps } from './BaseDialog.types';
import { Portal } from '../../Portal';
import {
    mergeClasses,
    stopPropagation,
    uniqueId,
} from '../../../shared/utilities';
import { IconName } from '../../Icon';
import { ButtonShape, NeutralButton } from '../../Button';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { NoFormStyle } from '../../Form/Context';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from './base-dialog.module.scss';
import { useScrollShadow } from '../../../hooks/useScrollShadows';

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
            bodyPadding = true,
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
        const htmlDir: string = useCanvasDirection();

        const labelId = uniqueId('dialog-label-');
        const bodyRef = useRef<HTMLDivElement>(null);

        useScrollLock(parent, visible);
        const { showBottomShadow, showTopShadow, scrollRef } =
            useScrollShadow(bodyRef);

        const dialogBackdropClasses: string = mergeClasses([
            styles.dialogBackdrop,
            dialogWrapperClassNames,
            { [styles.visible]: visible },
            {
                [styles.modeless]: overlay === false,
                [styles.modelessMask]: overlay === false && maskClosable,
            },
        ]);

        const dialogClasses: string = mergeClasses([
            styles.dialog,
            { [styles.noBodyPadding]: bodyPadding === false },
            { [styles.dialogRtl]: htmlDir === 'rtl' },
            dialogClassNames,
        ]);

        const headerClasses: string = mergeClasses([
            styles.header,
            headerClassNames,
        ]);

        const bodyClasses: string = mergeClasses([
            styles.body,
            bodyClassNames,
            {
                [styles.bodyBottomShadow]: showBottomShadow,
                [styles.bodyTopShadow]: showTopShadow,
                [styles.bodyTopBottomShadow]: showTopShadow && showBottomShadow,
            },
        ]);

        const actionsClasses: string = mergeClasses([
            styles.footer,
            actionsClassNames,
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
                            <span id={labelId}>
                                {headerButtonProps && (
                                    <NeutralButton
                                        classNames={styles.headerButton}
                                        shape={ButtonShape.Round}
                                        iconProps={{ path: headerIcon }}
                                        style={{
                                            transform:
                                                htmlDir === 'rtl'
                                                    ? 'rotate(180deg)'
                                                    : 'none',
                                        }}
                                        {...headerButtonProps}
                                    />
                                )}
                                {header}
                            </span>
                            <span className={styles.headerButtons}>
                                {actionButtonThreeProps && (
                                    <NeutralButton
                                        shape={ButtonShape.Round}
                                        {...actionButtonThreeProps}
                                    />
                                )}
                                {actionButtonTwoProps && (
                                    <NeutralButton
                                        shape={ButtonShape.Round}
                                        {...actionButtonTwoProps}
                                    />
                                )}
                                {actionButtonOneProps && (
                                    <NeutralButton
                                        shape={ButtonShape.Round}
                                        {...actionButtonOneProps}
                                    />
                                )}
                                {closable && (
                                    <NeutralButton
                                        ariaLabel={'Close'}
                                        iconProps={{ path: closeIcon }}
                                        shape={ButtonShape.Round}
                                        onClick={onClose}
                                        {...closeButtonProps}
                                    />
                                )}
                            </span>
                        </div>
                        <div ref={scrollRef} className={bodyClasses}>
                            {body}
                        </div>
                        {actions && (
                            <div className={actionsClasses}>{actions}</div>
                        )}
                    </div>
                </div>
            </NoFormStyle>
        );
        return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
    }
);
