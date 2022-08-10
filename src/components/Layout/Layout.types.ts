import React from 'react';
import { OcBaseProps } from '../OcBase';

export interface GeneratorProps {
    cssModifier: string;
    tagName:
        | 'article'
        | 'div'
        | 'footer'
        | 'header'
        | 'main'
        | 'nav'
        | 'section';
}

export interface BasicProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The layout has an aside.
     */
    hasAside?: boolean;
    /**
     * The layout style.
     */
    style?: React.CSSProperties;
    /**
     * The layout uses octuple styles.
     */
    octupleStyles?: boolean;
}

export interface LayoutContextProps {
    asideHook: {
        addAside: (id: string) => void;
        removeAside: (id: string) => void;
    };
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    asideHook: {
        addAside: () => null,
        removeAside: () => null,
    },
});

export interface BasicPropsWithTagName extends BasicProps {
    /**
     * The layout semantic html tag name, with one non-semantic div to represent the app root.
     */
    tagName:
        | 'article'
        | 'div'
        | 'footer'
        | 'header'
        | 'main'
        | 'nav'
        | 'section';
}

interface AsideContextProps {
    /**
     * The aside is collapsed.
     */
    asideCollapsed?: boolean;
}

export const AsideContext: React.Context<AsideContextProps> =
    React.createContext({});

export type CollapseType = 'clickTrigger' | 'responsive';

export interface AsideProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The aside class names.
     */
    asideClassNames?: string;
    /**
     * The aside style.
     */
    asideStyle?: React.CSSProperties;
    /**
     * The aside breakpoints, to enable a responsive layout.
     */
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * Sets whether the aside is collapsed.
     */
    collapsed?: boolean;
    /**
     * The aside collapsed width.
     * @default 80
     */
    collapsedWidth?: number | string;
    /**
     * Sets whether the aside is collapsible.
     * @default false
     */
    collapsible?: boolean;
    /**
     * Sets whether the aside is collapsed by default.
     * @default false
     */
    defaultCollapsed?: boolean;
    /**
     * The aside onBreakpoint callback.
     */
    onBreakpoint?: (broken: boolean) => void;
    /**
     * The aside onCollapse callback.
     */
    onCollapse?: (collapsed: boolean, type: CollapseType) => void;
    /**
     * Sets whether the amburger arrow is reversed.
     * @default false
     */
    reverseArrow?: boolean;
    /**
     * The aside trigger element
     */
    trigger?: React.ReactNode;
    /**
     * The aside width.
     * @default 200
     */
    width?: number | string;
    /**
     * The aside width trigger style.
     */
    zeroWidthTriggerStyle?: React.CSSProperties;
}
