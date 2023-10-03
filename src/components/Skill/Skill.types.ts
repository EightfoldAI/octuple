import { OcBaseProps } from '../OcBase';
import { OcThemeName } from '../ConfigProvider';
import { ButtonProps } from '../Button';
import { DropdownProps } from '../Dropdown';
import { IconProps } from '../Icon';
import { MenuItemTypes } from '../Menu';
import { PopupProps } from '../Popup';
import { TooltipProps } from '../Tooltip';

export type Key = React.Key;

export enum SkillSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

export enum SkillStatus {
  Default = 'default',
  Highlight = 'highlight',
  Match = 'match',
}

export enum SkillVariant {
  Tag = 'tag',
  Block = 'block',
}

export interface BodyListProps {
  showIcon?: boolean;
  label?: string;
}

export interface BodyProps {
  contents?: BodyListProps[];
  type?: string;
  iconProps?: IconProps;
}

export type SkillThemeName =
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

export interface SkillProps
  extends Omit<OcBaseProps<HTMLDivElement>, 'onBlur' | 'onClick' | 'onFocus'> {
  /**
   * Allows focus on the Skill when it's disabled.
   */
  allowDisabledFocus?: boolean;
  /**
   * The Skill animates expand and collapse.
   * @default true
   */
  animate?: boolean;
  /**
   * Custom background color of the Skill.
   */
  background?: string;
  /**
   * Custom classnames of the Skill.
   */
  classNames?: string;
  /**
   * Whether or not the Skill is clickable.
   * @default false
   */
  clickable?: boolean;
  /**
   * The Skill is closable.
   * @default false
   */
  closable?: boolean;
  /**
   * Aria label for the close button.
   */
  closeButtonAriaLabel?: string;
  /**
   * Props for the close button,
   * `closable` must be true and `variant` must be SkillVariant.Tag
   */
  closeButtonProps?: ButtonProps;
  /**
   * Custom color of the Skill.
   */
  color?: string;
  /**
   * The content of the Skill.
   */
  content?: React.ReactNode;
  /**
   * Custom classes for the content.
   */
  contentClassNames?: string;
  /**
   * Props for the custom button.
   * An optional button for SkillVariant.Block scenarios.
   */
  customButtonProps?: ButtonProps;
  /**
   * The Skill is in a disabled state.
   * Be sure to pass this same value to any content of the Skill.
   * @default false
   */
  disabled?: boolean;
  /**
   * The Dropdown and overlay props.
   * @default {}
   */
  dropdownProps?: DropdownProps;
  /**
   * The Skill has a drop shadow.
   * @default false
   */
  dropshadow?: boolean;
  /**
   * Props for the endorsement button.
   */
  endorseButtonProps?: ButtonProps;
  /**
   * Whether or not the Skill is expandable.
   * @default false
   */
  expandable?: boolean;
  /**
   * Whether the Skill is expanded.
   * `variant` must be SkillVariant.Block
   * @default false
   */
  expanded?: boolean;
  /**
   * The expanded content of the Skill.
   * `variant` must be SkillVariant.Block
   */
  expandedContent?: React.ReactNode;
  /**
   * Custom classes for the expanded content.
   * `variant` must be SkillVariant.Block
   */
  expandedContentClassNames?: string;
  /**
   * Custom height of the Skill.
   */
  height?: number;
  /**
   * Props for the highlight button.
   */
  highlightButtonProps?: ButtonProps;
  /**
   * Whether or not the Skill is hoverable.
   * `variant` must be SkillVariant.Block
   * @default false
   */
  hoverable?: boolean;
  /**
   * Icon shown before the label.
   */
  iconProps?: IconProps;
  /**
   * The Skill id.
   */
  id?: string;
  /**
   * Aria label for the overflow button.
   */
  itemMenuAriaLabel?: string;
  /**
   * Props for the item menu button.
   */
  itemMenuButtonProps?: ButtonProps;
  /**
   * Unique key of the Skill.
   */
  key?: Key;
  /**
   * The Skill label.
   */
  label?: string;
  /**
   * Maximum number of lines the Skill label can have.
   */
  lineClamp?: number;
  /**
   * Items to display in the overflow menu.
   */
  menuItems?: Array<MenuItemTypes>;
  /**
   * Name of the Skill
   */
  name?: string;
  /**
   * Callback called on blur of the Skill.
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  /**
   * Callback called on click of the Skill.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on click of the close button.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback called on focus of the Skill.
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /**
   * Callback called on keydown of the Skill.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Callback called on mouse enter of the Skill.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on mouse leave of the Skill.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * The Popup and overlay props.
   * @default {}
   */
  popupProps?: PopupProps;
  /**
   * The Skill is readonly.
   * Be sure to pass this same value to any content of the Skill.
   */
  readonly?: boolean;
  /**
   * Role of the Skill.
   * @default 'button'
   */
  role?: string;
  /**
   * The Skill size.
   * @default SkillCardSize.Medium
   */
  size?: SkillSize;
  /**
   * The Skill status.
   * @default SkillCardStatus.Default
   */
  status?: SkillStatus;
  /**
   * The custom style of the Skill.
   */
  style?: React.CSSProperties;
  /**
   * The Skill tab-index.
   * @default 0
   */
  tabIndex?: number;
  /**
   * Theme of the Skill.
   * @default blue
   */
  theme?: OcThemeName | SkillThemeName;
  /**
   * Title of the Skill.
   */
  title?: string;
  /**
   * The Tooltip and overlay props.
   * @default {}
   */
  tooltipProps?: TooltipProps;
  /**
   * Callback when the Skill dimensions have changed.
   */
  updateDimension?: (async?: boolean, delay?: number) => void;
  /**
   * Variant of the Skill.
   * @default SkillVariant.Tag
   */
  variant?: SkillVariant;
  /**
   * Custom width of the Skill.
   */
  width?: number;
}
