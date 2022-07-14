import React from 'react';
import type { CSSMotionProps } from '../../Motion/CSSMotion.types';
import type { StretchType, Point, MobileConfig } from '../Trigger.types';
import type { AlignType } from '../../Align/Align.types';

export interface PopupInnerProps {
    visible?: boolean;
    classNames?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    zIndex?: number;
    motion: CSSMotionProps;
    destroyPopupOnHide?: boolean;
    forceRender?: boolean;
    stretch?: StretchType;
    align?: AlignType;
    point?: Point;
    getRootDomNode?: () => HTMLElement;
    getClassNameFromAlign?: (align: AlignType) => string;
    onAlign?: (element: HTMLElement, align: AlignType) => void;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface PopupInnerRef {
    forceAlign: () => void;
    getElement: () => HTMLElement;
}

export interface PopupProps {
    visible?: boolean;
    style?: React.CSSProperties;
    getClassNameFromAlign?: (align: AlignType) => string;
    onAlign?: (element: HTMLElement, align: AlignType) => void;
    getRootDomNode?: () => HTMLElement;
    align?: AlignType;
    destroyPopupOnHide?: boolean;
    classNames?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseDown?: React.MouseEventHandler<HTMLElement>;
    onTouchStart?: React.TouchEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    stretch?: StretchType;
    children?: React.ReactNode;
    point?: Point;
    zIndex?: number;
    mask?: boolean;
    motion: CSSMotionProps;
    maskMotion: CSSMotionProps;
    forceRender?: boolean;
    mobile?: MobileConfig;
}
