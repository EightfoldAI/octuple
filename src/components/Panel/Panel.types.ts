import React from 'react';

export enum SizeType {
    small = 'small',
    medium = 'medium',
    large = 'large',
}
export type PlacementTypes = 'top' | 'right' | 'bottom' | 'left';

type EventType =
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface PanelProps {
    autoFocus?: boolean;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    destroyOnClose?: boolean;
    forceRender?: boolean;
    maskClosable?: boolean;
    mask?: boolean;
    maskStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    size?: SizeType;
    /** Wrapper dom node style of header and body */
    drawerStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    contentWrapperStyle?: React.CSSProperties;
    title?: React.ReactNode;
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    zIndex?: number;
    placement?: PlacementTypes;
    onClose?: (e: EventType) => void;
    afterVisibleChange?: (visible: boolean) => void;
    className?: string;
    handler?: React.ReactNode;
    footer?: React.ReactNode;
    footerStyle?: React.CSSProperties;
    level?: string | string[] | null | undefined;
    children?: React.ReactNode;
}
