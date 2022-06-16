import { ButtonProps } from '../Button';
import { Placement, Strategy } from '@floating-ui/react-dom';
import { TooltipTheme } from '../Tooltip';
import { OcBaseProps } from '../OcBase';

export enum LabelSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface LabelIconButtonProps
  extends Omit<
    ButtonProps,
    | 'buttonWidth'
    | 'checked'
    | 'htmlType'
    | 'onContextMenu'
    | 'shape'
    | 'size'
    | 'split'
    | 'splitButtonChecked'
    | 'splitButtonProps'
    | 'toggle'
  > {
  /**
   * The label icon button is shown.
   * @default false
   */
  show?: boolean;
  /**
   * Content to show on the tooltip
   */
  toolTipContent?: React.ReactNode;
  /**
   * Theme of the tooltip
   * @default light
   */
  toolTipTheme?: TooltipTheme;
  /**
   * Placement of the tooltip
   * @default top
   */
  toolTipPlacement?: Placement;
  /**
   * Positioning strategy for the tooltip
   * @default absolute
   */
  toolTipPositionStrategy?: Strategy;
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
   * The label icon button props.
   */
  labelIconButtonProps?: LabelIconButtonProps;
  /**
   * The label size.
   */
  size?: LabelSize;
  /**
   * The label text.
   */
  text?: string;
}
