import React, {
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { classNames, stopPropagation } from '../../shared/utilities';
import { PanelProps, PanelRef, PanelSize } from './';
import { IconName } from '../Icon';
import { DefaultButton } from '../Button';
import { Portal } from '../Portal';
import { useScrollLock } from '../../hooks/useScrollLock';

import styles from './panel.module.scss';

const PanelContext = React.createContext<PanelRef | null>(null);

const PANEL_WIDTHS: Record<PanelSize, number> = Object.freeze({
    small: 480,
    medium: 640,
    large: 860,
});

export const Panel = React.forwardRef<PanelRef, PanelProps>(
    (
        {
            size = PanelSize.medium,
            visible = false,
            closable = true,
            onClose = () => {},
            children,
            placement = 'right',
            footer,
            title,
            maskClosable = true,
            width,
            height,
            onVisibleChange,
            zIndex,
            panelStyle,
            closeIcon = IconName.mdiClose,
            push = true,
            parent = document.body,
            panelWrapperClassName,
            panelClassName,
            headerClassName,
            bodyClassName,
            footerClassName,
            closeButtonProps,
            autoFocus = true,
        },
        ref
    ) => {
        const panelRef = useRef<HTMLDivElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const parentPanel = useContext<PanelRef>(PanelContext);
        const [internalPush, setPush] = useState<boolean>(false);
        const { lockScroll, unlockScroll } = useScrollLock(parent);

        const panelBackdropClasses: string = classNames([
            styles.panelBackdrop,
            panelWrapperClassName,
            { [styles.visible]: visible },
        ]);

        const panelClasses: string = classNames([
            styles.panel,
            panelClassName,
            { [styles.right]: placement === 'right' },
            { [styles.left]: placement === 'left' },
            { [styles.bottom]: placement === 'bottom' },
            { [styles.top]: placement === 'top' },
            { [styles.large]: size === PanelSize.large },
            { [styles.medium]: size === PanelSize.medium },
            { [styles.small]: size === PanelSize.small },
        ]);

        const bodyClasses: string = classNames([styles.body, bodyClassName]);

        const footerClasses: string = classNames([
            styles.footer,
            footerClassName,
        ]);

        const headerClasses: string = classNames([
            styles.header,
            headerClassName,
        ]);

        useEffect(() => {
            if (parentPanel) {
                if (visible) {
                    parentPanel.push();
                } else {
                    parentPanel.pull();
                }
            } else {
                if (visible) {
                    lockScroll();
                } else {
                    unlockScroll();
                }
            }
            if (autoFocus) {
                setTimeout(() => {
                    containerRef.current?.focus();
                }, 200);
            }
            onVisibleChange?.(visible);
        }, [visible]);

        const getHeader = (): JSX.Element => (
            <div className={headerClasses}>
                <div>{title}</div>
                {closable && (
                    <DefaultButton
                        icon={closeIcon}
                        ariaLabel={'Close'}
                        onClick={onClose}
                        {...closeButtonProps}
                    />
                )}
            </div>
        );

        const getBody = (): JSX.Element => (
            <div className={bodyClasses}>{children}</div>
        );

        const getFooter = (): JSX.Element => (
            <div className={footerClasses}>{footer}</div>
        );

        const getPushTransform = (): React.CSSProperties => {
            const panelWidth: number = width || PANEL_WIDTHS[size];
            let distance: number = visible ? 0 : panelWidth;

            if (internalPush) {
                distance -= panelWidth / 3;
            }

            if (['left', 'right'].includes(placement)) {
                return {
                    transform: `translateX(${
                        placement === 'left' ? -distance : distance
                    }px)`,
                };
            } else if (['top', 'bottom'].includes(placement)) {
                return {
                    transform: `translateY(${
                        placement === 'top' ? -distance : distance
                    }px)`,
                };
            }
            return {};
        };

        const getPanelStyle = (): React.CSSProperties => ({
            zIndex,
            ...getPushTransform(),
            ...panelStyle,
            height,
            width,
        });

        const operations = React.useMemo(
            () => ({
                push() {
                    push && setPush(true);
                },
                pull() {
                    push && setPush(false);
                },
            }),
            [push]
        );

        useImperativeHandle(ref, () => operations);

        const getPanel = (): JSX.Element => (
            <PanelContext.Provider value={operations}>
                <div
                    tabIndex={-1}
                    ref={containerRef}
                    className={panelBackdropClasses}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        maskClosable && onClose(e);
                    }}
                    aria-hidden={!visible}
                >
                    <div
                        ref={panelRef}
                        className={panelClasses}
                        onClick={stopPropagation}
                        style={getPanelStyle()}
                    >
                        {getHeader()}
                        {getBody()}
                        {getFooter()}
                    </div>
                </div>
            </PanelContext.Provider>
        );

        return <Portal getContainer={() => parent}>{getPanel()}</Portal>;
    }
);
