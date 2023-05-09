import { ButtonProps } from '../Button';
import { Placement, Strategy } from '@floating-ui/react';
import { TooltipTheme, TooltipProps } from '../Tooltip';
import { OcBaseProps } from '../OcBase';
import { Size } from '../ConfigProvider';

export enum LabelSize {
  Flex = 'flex',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface LabelIconButtonProps extends ButtonProps {
  /**
   * The label icon button is shown.
   * @default false
   */
  show?: boolean;
  /**
   * The tooltip props.
   * @default false
   */
  tooltipProps?: TooltipProps;
  /**
   * Unique id used to target element for testing.
   */
  'data-test-id'?: string;
  /**
   * @deprecated Use labelIconButtonProps.tooltipProps instead.
   * Content to show on the tooltip.
   */
  toolTipContent?: React.ReactNode;
  /**
   * @deprecated Use labelIconButtonProps.tooltipProps instead.
   * Placement of the tooltip.
   * @default top
   */
  toolTipPlacement?: Placement;
  /**
   * @deprecated Use labelIconButtonProps.tooltipProps instead.
   * Positioning strategy for the tooltip.
   * @default absolute
   */
  toolTipPositionStrategy?: Strategy;
  /**
   * @deprecated Use labelIconButtonProps.tooltipProps instead.
   * Theme of the tooltip.
   * @default light
   */
  toolTipTheme?: TooltipTheme;
}

export interface LabelProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The label class names.
   */
  classNames?: string;
  /**
   * Sets whether to display `:` after label text.
   * @default false
   */
  colon?: boolean;
  /**
   * The label element name.
   */
  htmlFor?: string;
  /**
   * The label element is inline.
   * @default false
   */
  inline?: boolean;
  /**
   * The label icon button props.
   */
  labelIconButtonProps?: LabelIconButtonProps;
  /**
   * The label size.
   * @default LabelSize.Medium
   */
  size?: LabelSize | Size;
  /**
   * The label text.
   */
  text?: string;
}
