import React from 'react';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { IconProps } from '../Icon';
import { BadgeProps } from '../Badge';
import { ButtonProps } from '../Button';

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
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * If the accordion is disabled
   */
  disabled?: boolean;
  /**
   * Accordion is in an expanded state or not
   * @default false
   */
  expanded?: boolean;
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
