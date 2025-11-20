import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
import { OcBaseProps } from '../OcBase';
import React from 'react';
import { IconProps } from '../Icon/Icon.types';

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export enum InfoBarType {
  neutral = 'neutral',
  positive = 'positive',
  warning = 'warning',
  disruptive = 'disruptive',
}

type Locale = {
  /**
   * The InfoBar locale.
   */
  locale: string;
  /**
   * The InfoBar `Close` Button aria label string.
   */
  closeButtonAriaLabelText?: string;
};

export type InfoBarLocale = {
  lang: Locale;
};

export interface InfoBarsProps
  extends Omit<OcBaseProps<HTMLDivElement>, 'content'> {
  /**
   * Custom classes for the action button.
   * May be implemnted without the need for a button.
   */
  actionButtonClassNames?: string;
  /**
   * Props for the action button
   */
  actionButtonProps?: ButtonProps;
  /**
   * Whether to visually hide the InfoBar border.
   * @default false
   */
  bordered?: boolean;
  /**
   * If the InfoBar is closable or not.
   */
  closable?: boolean;
  /**
   * The Panel `Close` Button aria label string.
   * @default 'Close'
   */
  closeButtonAriaLabelText?: string;
  /**
   * Custom props for the close button
   */
  closeButtonProps?: CloseButtonProps;
  /**
   * Icon for the close button
   * @default IconName.mdiClose
   */
  closeIcon?: IconName;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Content of the InfoBar
   */
  content: React.ReactNode;
  /**
   * Custom classes of the content.
   */
  contentClassNames?: string;
  /**
   * ID attribute for the content element.
   * Useful for aria-describedby references.
   */
  contentId?: string;
  /**
   * Custom classes of the content wrapper.
   */
  contentWrapperClassNames?: string;
  /**
   * The InfoBar gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Custom icon for the InfoBar
   * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
   */
  icon?: IconName;
  /**
   * Custom classes of the icon.
   */
  iconClassNames?: string;
  /**
   * Additional props to be passed to the Icon component.
   * These props will be merged with the default icon props.
   */
  iconProps?: IconProps;
  /**
   * The InfoBar locale.
   * @default 'enUS'
   */
  locale?: InfoBarLocale;
  /**
   * Callback fired on close of the InfoBar
   */
  onClose?: () => void;
  /**
   * Role of the InfoBar
   */
  role?: string;
  /**
   * Theme of the InfoBar.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the InfoBar.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Type of the InfoBar
   * @default InfoBarType.neutral
   */
  type?: InfoBarType;
  /**
   * Whether to move focus to the snackbar
   * @default false
   */
  moveFocusToSnackbar?: boolean;
  /**
   * Ref for the close button element
   */
  closeButtonRef?: React.Ref<HTMLButtonElement>;
}
