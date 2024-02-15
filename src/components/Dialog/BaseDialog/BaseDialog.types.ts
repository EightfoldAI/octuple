import React, { Ref } from 'react';
import { ConfigContextProps, OcThemeName } from '../../ConfigProvider';
import { OcBaseProps } from '../../OcBase';
import { ButtonProps } from '../../Button';
import { IconName } from '../../Icon';

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type Strategy = 'absolute' | 'fixed';

type Locale = {
  /**
   * The Dialog locale.
   */
  locale: string;
  /**
   * The Dialog `Cancel` button string.
   */
  cancelText?: string;
  /**
   * The Dialog `Close` Button aria label string.
   */
  closeButtonAriaLabelText?: string;
  /**
   * The Dialog `OK` button string.
   */
  okText?: string;
};

export type DialogLocale = {
  lang: Locale;
};

export interface BaseDialogProps
  extends Omit<OcBaseProps<HTMLDivElement>, 'classNames'> {
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
   * The actions of the dialog
   */
  actions?: React.ReactNode;
  /**
   * Custom classes for the actions wrapper
   */
  actionsClassNames?: string;
  /**
   * The body of the dialog
   */
  body?: React.ReactNode;
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
   * The dialog cancel button string.
   * @default 'Cancel'
   */
  cancelText?: string;
  /**
   * Show close button on top right
   * @default true
   */
  closable?: boolean;
  /**
   * The dialog close button aria label string.
   * @default 'Close'
   */
  closeButtonAriaLabelText?: string;
  /**
   * Close button extra props
   */
  closeButtonProps?: CloseButtonProps;
  /**
   * Close icon name
   */
  closeIcon?: IconName;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Custom classes for the dialog
   */
  dialogClassNames?: string;
  /**
   * Custom classes for the dialog wrapper
   */
  dialogWrapperClassNames?: string;
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
   * The dialog gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The header of the dialog
   */
  header?: React.ReactNode;
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
   * Custom height of the dialog
   */
  height?: number;
  /**
   * Append a specific selector to the end
   * of the focus loop generated list of selectors.
   * Use optionally when `focusTrap` is `true`.
   */
  lastFocusableSelector?: string;
  /**
   * The Dialog locale.
   * @default 'enUS'
   */
  locale?: DialogLocale;
  /**
   * Clicking on mask should close modal or not
   * @default true
   */
  maskClosable?: boolean;
  /**
   * The dialog ok button string.
   * @default 'OK'
   */
  okText?: string;
  /**
   * Callback fired on close on the modal
   * @param e {EventType}
   */
  onClose?: (e: EventType) => void;
  /**
   * Callback fired on visibility change of the modal
   * @param visible {bool}
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Whether the dialog should show the overlay
   * if false: there will be no overlay.
   * @default true
   */
  overlay?: boolean;
  /**
   * Element to which to attach the modal to
   * @default HTMLBodyElement
   */
  parent?: HTMLDivElement | HTMLBodyElement;
  /**
   * Positioning strategy for the dialog
   * @default absolute
   */
  positionStrategy?: Strategy;
  /**
   * Ref for the dialog element
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Whether to render Dialog content when Dialog `visible` is `false`.
   * @default true
   */
  renderContentAlways?: boolean;
  /**
   * Optionally skip some selectors when tabbing by index.length - skipFocusableSelectorsFromIndex
   * Use when `focusTrap` is `true`
   * @default `index.length - 1`
   */
  skipFocusableSelectorsFromIndex?: number;
  /**
   * Theme of the dialog.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the dialog.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Custom width of the dialog
   */
  width?: number;
  /**
   * Dialog is visible or not
   */
  visible?: boolean;
  /**
   * Custom zIndex for the dialog
   */
  zIndex?: number;
}
