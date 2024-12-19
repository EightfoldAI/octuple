import React from 'react';
import { PanelProps } from '../Panel';

export enum DrawerVariant {
  Default = 'default',
  Hint = 'hint',
}

type Locale = {
  /**
   * The Drawer locale.
   */
  locale: string;
  /**
   * The Drawer `Close` Button aria label string.
   */
  closeButtonAriaLabelText?: string;
  /**
   * The Drawer `Move drawer` dragger aria label string.
   */
  draggerAriaLabelText?: string;
};

export type DrawerLocale = {
  lang: Locale;
};

export interface DrawerProps
  extends Omit<
    PanelProps,
    | 'closeIcon'
    | 'headerIcon'
    | 'locale'
    | 'onClose'
    | 'panelClassNames'
    | 'panelHeader'
    | 'panelStyle'
    | 'panelWrapperClassNames'
    | 'placement'
    | 'push'
    | 'size'
    | 'width'
  > {
  draggerProps?: {
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    onTouchEnd: () => void;
    onDrag: (e: any) => void;
    onDragStart: (e: any) => void;
    onDragEnd: () => void;
  };
  /**
   * The Drawer `Move drawer` dragger aria label string.
   */
  draggerAriaLabelText?: string;
  /**
   * Custom classes for the drawer.
   */
  drawerClassNames?: string;
  /**
   * Header of the drawer.
   */
  drawerHeader?: React.ReactElement;
  /**
   * The ref of the drawer
   */
  drawerRef?: any;
  /**
   * Custom style for the drawer.
   */
  drawerStyle?: React.CSSProperties;
  /**
   * Custom classes for the drawer wrapper.
   */
  drawerWrapperClassNames?: string;
  /**
   * The initialPlacement of the Drawer.
   */
  initialPlacement?: number;
  /**
   * The Drawer locale.
   * @default 'enUS'
   */
  locale?: DrawerLocale;
  /**
   * Callback fired on close on the drawer.
   */
  onClose?: () => void;
  /**
   * Callback called on click of the dragger.
   */
  onDraggerClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on keydown of the dragger.
   */
  onDraggerKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * The custom Drawer snap breakpoints.
   */
  snapBreakPoints?: {
    breakpoint: number;
    position: {
      top: string;
    };
  }[];
  /**
   * The Drawer sub title.
   */
  subTitle?: string;
  /**
   * Determines the Drawer variant.
   * @default DrawerVariant.Default
   */
  variant?: DrawerVariant;
}
