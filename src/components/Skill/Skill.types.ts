import React from 'react';
import { OcBaseProps } from '../OcBase';
import {
  BelowLargeImg,
  BelowMediumImg,
  BelowSmallImg,
  BelowUpskillingLargeImg,
  BelowUpskillingMediumImg,
  BelowUpskillingSmallImg,
  ExceedLargeImg,
  ExceedMediumImg,
  ExceedSmallImg,
  ExceedUpskillingLargeImg,
  ExceedUpskillingMediumImg,
  ExceedUpskillingSmallImg,
  MeetLargeImg,
  MeetMediumImg,
  MeetSmallImg,
  MeetUpskillingLargeImg,
  MeetUpskillingMediumImg,
  MeetUpskillingSmallImg,
  UpskillingLargeImg,
  UpskillingMediumImg,
  UpskillingSmallImg,
} from '.';
import { OcThemeName } from '../ConfigProvider';
import { ButtonProps } from '../Button';
import { DropdownProps } from '../Dropdown';
import { IconName, IconProps } from '../Icon';
import { InlineSvgProps } from '../InlineSvg';
import { MenuItemTypes } from '../Menu';
import { PopupProps } from '../Popup';
import { TooltipProps } from '../Tooltip';

import styles from './skill.module.scss';

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

export enum SkillAssessment {
  Below = 'below',
  BelowUpskilling = 'belowupskilling',
  Exceed = 'exceed',
  ExceedUpskilling = 'exceedupskilling',
  Meet = 'meet',
  MeetUpskilling = 'meetupskilling',
  Upskilling = 'upskilling',
}

export const SKILL_SVG_LARGE_HEIGHT: number = +styles.skillSvgLargeHeight;
export const SKILL_SVG_MEDIUM_HEIGHT: number = +styles.skillSvgMediumHeight;
export const SKILL_SVG_SMALL_HEIGHT: number = +styles.skillSvgSmallHeight;
export const SKILL_SVG_XSMALL_HEIGHT: number = +styles.skillSvgXsmallHeight;

export const matchingSkillStatus: SkillStatus[] = [
  SkillStatus.Highlight,
  SkillStatus.Match,
];

export const matchingSkillAssessment: SkillAssessment[] = [
  SkillAssessment.Below,
  SkillAssessment.BelowUpskilling,
  SkillAssessment.Exceed,
  SkillAssessment.ExceedUpskilling,
  SkillAssessment.Meet,
  SkillAssessment.MeetUpskilling,
  SkillAssessment.Upskilling,
];

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

export const skillStatusToIconNameMap: Map<SkillStatus, IconName> = new Map<
  SkillStatus,
  IconName
>([
  [SkillStatus.Default, null],
  [SkillStatus.Highlight, IconName.mdiStar],
  [SkillStatus.Match, IconName.mdiCheck],
]);

export const skillPropsToSvgMap = {
  [SkillAssessment.Below]: {
    [SkillSize.XSmall]: () => BelowSmallImg(),
    [SkillSize.Small]: () => BelowSmallImg(),
    [SkillSize.Medium]: () => BelowMediumImg(),
    [SkillSize.Large]: () => BelowLargeImg(),
  },
  [SkillAssessment.BelowUpskilling]: {
    [SkillSize.XSmall]: () => BelowUpskillingSmallImg(),
    [SkillSize.Small]: () => BelowUpskillingSmallImg(),
    [SkillSize.Medium]: () => BelowUpskillingMediumImg(),
    [SkillSize.Large]: () => BelowUpskillingLargeImg(),
  },
  [SkillAssessment.Exceed]: {
    [SkillSize.XSmall]: () => ExceedSmallImg(),
    [SkillSize.Small]: () => ExceedSmallImg(),
    [SkillSize.Medium]: () => ExceedMediumImg(),
    [SkillSize.Large]: () => ExceedLargeImg(),
  },
  [SkillAssessment.ExceedUpskilling]: {
    [SkillSize.XSmall]: () => ExceedUpskillingSmallImg(),
    [SkillSize.Small]: () => ExceedUpskillingSmallImg(),
    [SkillSize.Medium]: () => ExceedUpskillingMediumImg(),
    [SkillSize.Large]: () => ExceedUpskillingLargeImg(),
  },
  [SkillAssessment.Meet]: {
    [SkillSize.XSmall]: () => MeetSmallImg(),
    [SkillSize.Small]: () => MeetSmallImg(),
    [SkillSize.Medium]: () => MeetMediumImg(),
    [SkillSize.Large]: () => MeetLargeImg(),
  },
  [SkillAssessment.MeetUpskilling]: {
    [SkillSize.XSmall]: () => MeetUpskillingSmallImg(),
    [SkillSize.Small]: () => MeetUpskillingSmallImg(),
    [SkillSize.Medium]: () => MeetUpskillingMediumImg(),
    [SkillSize.Large]: () => MeetUpskillingLargeImg(),
  },
  [SkillAssessment.Upskilling]: {
    [SkillSize.XSmall]: () => UpskillingSmallImg(),
    [SkillSize.Small]: () => UpskillingSmallImg(),
    [SkillSize.Medium]: () => UpskillingMediumImg(),
    [SkillSize.Large]: () => UpskillingLargeImg(),
  },
};

export interface SharedSkillProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Allows focus on the Skill when it's disabled.
   */
  allowDisabledFocus?: boolean;
  /**
   * The Skill assessment status.
   */
  assessment?: SkillAssessment;
  /**
   * Custom background color of the Skill.
   */
  background?: string;
  /**
   * Custom classnames of the Skill end block
   * containing the button list.
   */
  blockEndClassNames?: string;
  /**
   * Custom inline styles of the Skill end block element
   * containing the button list.
   */
  blockEndStyles?: React.CSSProperties;
  /**
   * Custom classnames of the Skill start block
   * containing the label.
   */
  blockStartClassNames?: string;
  /**
   * Custom inline styles of the Skill start block element
   * containing the label.
   */
  blockStartStyles?: React.CSSProperties;
  /**
   * Whether the Skill is bordered or not.
   * @default true
   */
  bordered?: boolean;
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
   * Custom color of the Skill.
   */
  color?: string;
  /**
   * Props for the custom button.
   */
  customButtonProps?: ButtonProps;
  /**
   * The Skill is in a disabled state.
   * Be sure to pass this same value to any content of the Skill.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the Skill is endorsed or not.
   * @default false
   */
  endorsement?: boolean;
  /**
   * Props for the endorsement button.
   */
  endorseButtonProps?: ButtonProps;
  /**
   * Icon shown before the label.
   */
  iconProps?: IconProps;
  /**
   * The Skill id.
   */
  id?: string;
  /**
   * InlineSvg shown before the label.
   */
  inlineSvgProps?: InlineSvgProps;
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
   * Callback called on click of the Skill.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on keydown of the Skill.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * The Skill is readonly.
   * Be sure to pass this same value to any content of the Skill.
   */
  readonly?: boolean;
  /**
   * The Skill is required.
   * @default false
   */
  required?: boolean;
  /**
   * Required mark enabled.
   * @default true
   */
  requiredMark?: boolean;
  /**
   * Role of the Skill.
   * @default 'button'
   */
  role?: string;
  /**
   * Whether to display the assessment Icon next the the Label.
   */
  showLabelAssessmentIcon?: boolean;
  /**
   * The Skill status.
   * @default SkillStatus.Default
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
}

export interface SkillBlockProps extends SharedSkillProps {
  /**
   * The Skill animates expand and collapse.
   * @default true
   */
  animate?: boolean;
  /**
   * The content of the Skill.
   */
  content?: React.ReactNode;
  /**
   * Custom classes for the content.
   */
  contentClassNames?: string;
  /**
   * Whether or not the Skill is expandable.
   * @default false
   */
  expandable?: boolean;
  /**
   * Whether the Skill is expanded.
   * @default false
   */
  expanded?: boolean;
  /**
   * The expanded content of the Skill.
   */
  expandedContent?: React.ReactNode;
  /**
   * Custom classes for the expanded content.
   */
  expandedContentClassNames?: string;
  /**
   * The extra content of the Skill.
   */
  extraContent?: React.ReactNode;
  /**
   * Custom classes for the extra content.
   */
  extraContentClassNames?: string;
  /**
   * The footer content of the Skill.
   */
  footer?: React.ReactNode;
  /**
   * Custom classes for the footer.
   */
  footerClassNames?: string;
  /**
   * Props for the highlight button.
   */
  highlightButtonProps?: ButtonProps;
  /**
   * Whether or not the Skill is hoverable.
   * @default false
   */
  hoverable?: boolean;
  /**
   * Aria label for the overflow button.
   */
  itemMenuAriaLabel?: string;
  /**
   * Props for the item menu button.
   */
  itemMenuButtonProps?: ButtonProps;
  /**
   * The item menu Dropdown and overlay props.
   * @default {}
   */
  itemMenuDropdownProps?: DropdownProps;
  /**
   * Whether or not the item menu button is the only one visible.
   */
  itemMenuOnly?: boolean;
  /**
   * Custom label width.
   */
  labelWidth?: number;
  /**
   * Custom min-width of the Skill.
   * Use this if you want the Skill to resize down to a specific width.
   * @default 'fit-content'
   */
  minWidth?: number | string;
  /**
   * Custom max-width of the Skill.
   * Use this if you want the Skill to resize up to a specific width.
   */
  maxWidth?: number | string;
  /**
   * Items to display in the overflow menu.
   */
  menuItems?: Array<MenuItemTypes>;
  /**
   * Callback called on blur of the Skill.
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  /**
   * Callback called on focus of the Skill.
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /**
   * Callback called on mouse enter of the Skill.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on mouse leave of the Skill.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Whether or not to manually reflow the content after the button list.
   */
  reflow?: boolean;
  /**
   * Callback when the Skill dimensions have changed.
   */
  updateDimension?: (async?: boolean, delay?: number) => void;
  /**
   * Custom width of the Skill.
   * Use this if you want the Skill to be a fixed or percentile width.
   */
  width?: number | string;
}

export interface SkillTagProps extends SharedSkillProps {
  /**
   * The Dropdown and overlay props.
   * @default {}
   */
  dropdownProps?: DropdownProps;
  /**
   * Assigns the Skill 100% width
   */
  fullWidth?: boolean;
  /**
   * Callback called on click of the remove button.
   */
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The Popup and overlay props.
   * @default {}
   */
  popupProps?: PopupProps;
  /**
   * The Skill is removable.
   * @default false
   */
  removable?: boolean;
  /**
   * Aria label for the remove button.
   */
  removeButtonAriaLabel?: string;
  /**
   * Props for the remove button.
   */
  removeButtonProps?: ButtonProps;
  /**
   * The Skill size.
   * @default SkillCardSize.Medium
   */
  size?: SkillSize;
  /**
   * Icon shown at the end of the component.
   */
  suffixIconProps?: IconProps;
  /**
   * InlineSvg shown at the end of the component.
   */
  suffixInlineSvgProps?: InlineSvgProps;
  /**
   * The Tooltip and overlay props.
   * @default {}
   */
  tooltipProps?: TooltipProps;
}
