import React from 'react';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { IconProps } from '../Icon';
import { BadgeProps } from '../Badge';
import { ButtonProps } from '../Button';

type Locale = {
  /**
   * The Accordion locale.
   */
  locale: string;
  /**
   * The Accordion `Close content` aria label string.
   */
  collapseAriaLabelText?: string;
  /**
   * The Accordion `Open content` aria label string.
   */
  expandAriaLabelText?: string;
};

export type AccordionLocale = {
  lang: Locale;
};

export enum AccordionShape {
  Pill = 'pill',
  Rectangle = 'rectangle',
}

export enum AccordionSize {
  Large = 'large',
  Medium = 'medium',
}

interface AccordionBaseProps extends OcBaseProps<HTMLDivElement> {
  /**
   * If the accordion is bordered or not
   * @default true
   */
  bordered?: boolean;
  /**
   * The Accordion `Close content` aria label string.
   */
  collapseAriaLabelText?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * If the accordion is disabled
   */
  disabled?: boolean;
  /**
   * The Accordion `Open content` aria label string.
   */
  expandAriaLabelText?: string;
  /**
   * Accordion is in an expanded state or not
   * @default false
   */
  expanded?: boolean;
  /**
   * Allows for setting (or unsetting if so desired) and alternative
   * describedBy for the expand button. Otherwise it will default to the
   * header content of the accordion. In cases where the header content
   * is overly verbose and/or including buttons, it's recommended to
   * set this to point to a more appropriate description or unset it so
   * it the toggle button simple reads "According, button, expanded/collapsed."
   */
  expandButtonDescribedBy?: string;
  /**
   * Expand button props
   */
  expandButtonProps?: ButtonProps;
  /**
   * Expand icon props
   * @default { path: IconName['mdiChevronDown'] }
   */
  expandIconProps?: IconProps;
  /**
   * The button gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The Accordion locale.
   * @default 'enUS'
   */
  locale?: AccordionLocale;
  /**
   * The onClick callback for the accordion.
   * @param event
   * @returns
   */
  onIconButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Whether to render Accordion Body content when Accordion `expanded` is `false`.
   * @default true
   */
  renderContentAlways?: boolean;
  /**
   * Shape of the accordion
   * @default AccordionShape.Pill
   */
  shape?: AccordionShape;
  /**
   * Size of the accordion
   * @default AccordionSize.Large
   */
  size?: AccordionSize;
  /**
   * Theme of the accordion.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the accordion.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
}

export interface AccordionProps extends AccordionBaseProps {
  /**
   * Callback called when the expanded state of the accordion changes
   */
  onAccordionChange?: (expanded: boolean) => void;
  /**
   * Accordion Summary
   */
  summary: React.ReactNode | string;
  /**
   * Accordion Header Props
   */
  headerProps?: AccordionSummaryProps;
  /**
   * Accordion Body Props
   */
  bodyProps?: AccordionBodyProps;
  /**
   * Icon props for the header icon
   */
  iconProps?: IconProps;
  /**
   * Badge props for the header badge
   */
  badgeProps?: BadgeProps;
}

export interface AccordionSummaryProps
  extends Omit<AccordionBaseProps, 'configContextProps'> {
  /**
   * Icon props for the header icon
   */
  iconProps?: IconProps;
  /**
   * Badge props for the header badge
   */
  badgeProps?: BadgeProps;
  /**
   * Whether the accordion summary is full width or not.
   */
  fullWidth?: boolean;
}

export interface AccordionBodyProps
  extends Omit<
    AccordionBaseProps,
    'configContextProps' | 'expandButtonProps'
  > {}
