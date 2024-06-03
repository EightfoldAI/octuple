import * as React from 'react';
import { IconProps } from '../Icon';
import { OcThemeName } from '../ConfigProvider';
import { ButtonProps } from '../Button';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps } from '../ConfigProvider';

export enum PillIconAlign {
  Start = 'start',
  End = 'end',
}

export enum PillType {
  default = 'default',
  closable = 'closable',
  withButton = 'withButton',
}

export enum PillSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

/**
 * Props for the close button
 */
export type closeButtonProps = Omit<
  ButtonProps,
  'icon' | 'onClick' | 'size' | 'classNames'
>;

/**
 * Props for the pill button shown on right of the label
 */
export type pillButtonProps = Omit<
  ButtonProps,
  'onClick' | 'size' | 'classNames'
>;

export type PillThemeName =
  | 'red'
  | 'redOrange'
  | 'orange'
  | 'yellow'
  | 'yellowGreen'
  | 'green'
  | 'blueGreen'
  | 'blue'
  | 'blueViolet'
  | 'violet'
  | 'violetRed'
  | 'grey'
  | 'white';

export interface PillProps extends OcBaseProps<HTMLElement> {
  /**
   * The pill icon alignment.
   * @default PillIconAlign.Left
   */
  alignIcon?: PillIconAlign;
  /**
   * Props for the close button,
   * if type is set to PillType.closable
   */
  closeButtonProps?: closeButtonProps;
  /**
   * Custom color for the pill
   */
  color?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The pill disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * The pill gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Icon shown before the label
   */
  iconProps?: IconProps;
  /**
   * Label of the pill
   */
  label: string;
  /**
   * Maximum number of lines the pill label can have
   */
  lineClamp?: number;
  /**
   * Callback called on click of the button right of the pill
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback called on click of the close button
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Props for the button on the right side of the pill
   * if type is set to PillType.withButton
   */
  pillButtonProps?: pillButtonProps;
  /**
   * Size of the pill
   * @default PillType.Medium
   */
  size?: PillSize;
  /**
   * Theme of the pill
   * @default blue
   */
  theme?: OcThemeName | PillThemeName;
  /**
   * Type of the pill
   * @default PillType.default
   */
  type?: PillType;
}
