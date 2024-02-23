import React from 'react';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import { ButtonProps } from '../Button';
import { IconName } from '../Icon';

export enum PanelSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type PanelRef = {
  push: () => void;
  pull: () => void;
};

export type PanelPlacement = 'top' | 'right' | 'bottom' | 'left';

export type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'iconProps'>;

type Locale = {
  /**
   * The Panel locale.
   */
  locale: string;
  /**
   * The Panel `Close` Button aria label string.
   */
  closeButtonAriaLabelText?: string;
};

export type PanelLocale = {
  lang: Locale;
};

export interface PanelProps extends Omit<OcBaseProps<HTMLElement>, 'title'> {
  /**
   * Props for the first header action button
   */
  actionButtonOneProps?: ButtonProps;
  /**
   * Props for the second header action button
   */
  actionButtonTwoProps?: ButtonProps;
  /**
   * Props for the third header action button
   */
  actionButtonThreeProps?: ButtonProps;
  /**
   * Autofocus on the panel on visible
   * @default true
   */
  autoFocus?: boolean;
  /**
   * Custom classes for the body
   */
  bodyClassNames?: string;
  /**
   * Enables body padding
   * @default true
   */
  bodyPadding?: boolean;
  /**
   * Content of the body
   */
  children?: React.ReactNode;
  /**
   * The Panel `Close` Button aria label string.
   * @default 'Close'
   */
  closeButtonAriaLabelText?: string;
  /**
   * Close button extra props
   */
  closeButtonProps?: CloseButtonProps;
  /**
   * Show close button on top right
   * @default true
   */
  closable?: boolean;
  /**
   * Close icon name
   */
  closeIcon?: IconName;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Prepend a specific selector to the beginning
   * of the focus loop generated list of selectors.
   * Use optionally when `focusTrap` is `true`.
   */
  firstFocusableSelector?: string;
  /**
   * Unset this to disable focus trap
   * @default true
   */
  focusTrap?: boolean;
  /**
   * Footer of the panel
   */
  footer?: React.ReactNode;
  /**
   * Custom classes for the footer
   */
  footerClassNames?: string;
  /**
   * The panel gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Props for the header button
   */
  headerButtonProps?: ButtonProps;
  /**
   * Custom classes for the header
   */
  headerClassNames?: string;
  /**
   * Header icon name
   */
  headerIcon?: IconName;
  /**
   * Enables header padding
   * @default true
   */
  headerPadding?: boolean;
  /**
   * Custom height of the panel
   */
  height?: number;
  /**
   * Append a specific selector to the end
   * of the focus loop generated list of selectors.
   * Use optionally when `focusTrap` is `true`.
   */
  lastFocusableSelector?: string;
  /**
   * The Panel locale.
   * @default 'enUS'
   */
  locale?: PanelLocale;
  /**
   * Clicking on mask should close panel or not
   * @default true
   */
  maskClosable?: boolean;
  /**
   * Callback fired on close on the panel
   * @param e {EventType}
   */
  onClose?: (e: EventType) => void;
  /**
   * Callback fired on visibility change of the panel
   * @param visible {bool}
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Whether the panel should show the overlay
   * if false: there will be no overlay.
   * @default true
   */
  overlay?: boolean;
  /**
   * Element to which to attach the panel
   * @default HTMLBodyElement
   */
  parent?: HTMLDivElement | HTMLBodyElement;
  /**
   * Custom classes for the panel
   */
  panelClassNames?: string;
  /**
   * Header of the panel
   */
  panelHeader?: React.ReactElement;
  /**
   * Custom style for the panel
   */
  panelStyle?: React.CSSProperties;
  /**
   * Custom classes for the panel wrapper
   */
  panelWrapperClassNames?: string;
  /**
   * Where to place the panel
   * @default right
   */
  placement?: PanelPlacement;
  /**
   * Whether the panel gets pushed out with nested panels
   * @default true
   */
  push?: boolean;
  /**
   * Whether to render Panel content when Panel `visible` is `false`.
   * @default true
   */
  renderContentAlways?: boolean;
  /**
   * Set this to enable/disable parent scroll
   * @default true
   */
  scrollLock?: boolean;
  /**
   * Size of the panel, can be overridden with width
   * @default medium
   */
  size?: PanelSize;
  /**
   * Optionally skip some selectors when tabbing by index.length - skipFocusableSelectorsFromIndex
   * Use when `focusTrap` is `true`
   * @default `index.length - 1`
   */
  skipFocusableSelectorsFromIndex?: number;
  /**
   * Theme of the panel.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the panel.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The title node of the panel
   */
  title?: React.ReactNode;
  /**
   * Whether the panel is visible or not
   */
  visible?: boolean;
  /**
   * Custom width of the panel
   */
  width?: number;
  /**
   * Custom zIndex for the panel
   */
  zIndex?: number;
}

export interface PanelHeaderProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Props for the first header action button
   */
  actionButtonOneProps?: ButtonProps;
  /**
   * Props for the second header action button
   */
  actionButtonTwoProps?: ButtonProps;
  /**
   * Props for the default header action button
   */
  actionDefaultButtonProps?: ButtonProps;
  /**
   * The Panel `Close` Button aria label string.
   * @default 'Close'
   */
  closeButtonAriaLabelText?: string;
  /**
   * Close icon name
   * @default IconName.mdiClose
   */
  closeIcon?: IconName;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The panel header gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The PanelHeader locale.
   * @default 'enUS'
   */
  locale?: PanelLocale;
  /**
   * Callback fired on close on the panel
   * @param e {EventType}
   */
  onClose?: (e: EventType) => void;
  /**
   * Theme of the panel header.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the panel header.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The title string of the panel
   */
  title?: string;
}
