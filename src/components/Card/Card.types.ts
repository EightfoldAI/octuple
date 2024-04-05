import { IconName, IconProps } from '../Icon';
import { ButtonProps } from '../Button';
import { PillProps } from '../Pills';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, Size } from '../ConfigProvider';
import { AvatarProps } from '../Avatar';

export enum CardSize {
  Flex = 'flex',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum CardType {
  list = 'list',
  carousel = 'carousel',
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

export type FooterItems = [iconProps?: IconProps, text?: string];

export interface CardProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Allows focus on the checkbox when it's disabled.
   */
  allowDisabledFocus?: boolean;
  /**
   * Avatar of the card.
   */
  avatar?: AvatarProps;
  /**
   * The Body of the card.
   */
  body?: React.ReactNode;
  /**
   * Custom classes for the Body.
   */
  bodyClassNames?: string;
  /**
   * Pill props for the first body list.
   */
  bodyListOnePillProps?: PillProps;
  /**
   * Pill props for the second body list.
   */
  bodyListTwoPillProps?: PillProps;
  /**
   * List of items for body.
   */
  bodyListOneProps?: BodyProps;
  /**
   * List of items for body.
   */
  bodyListTwoProps?: BodyProps;
  /**
   * If the card is bordered or not.
   * @default false
   */
  bordered?: boolean;
  /**
   * Custom classnames of the component.
   */
  classNames?: string;
  /**
   * Configure how contextual props are consumed.
   */
  configContextProps?: ConfigContextProps;
  /**
   * The card is in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * The card has a drop shadow.
   * @default false
   */
  dropShadow?: boolean;
  /**
   * The Footer of the card.
   */
  footer?: React.ReactNode;
  /**
   * Props for the Footer button.
   */
  footerButtonProps?: ButtonProps;
  /**
   * Custom classes for the Footer.
   */
  footerClassNames?: string;
  /**
   * Footer icon name.
   */
  footerIcon?: IconName;
  /**
   * The props for the footer.
   */
  footerProps?: FooterItems;
  /**
   * The Header of the card.
   */
  header?: React.ReactNode;
  /**
   * Props for the header button.
   */
  headerButtonProps?: ButtonProps;
  /**
   * Custom classes for the header.
   */
  headerClassNames?: string;
  /**
   * Header icon name.
   */
  headerIcon?: IconName;
  /**
   * Header title name.
   */
  headerTitle?: string;
  /**
   * Custom height of the card.
   */
  height?: number | string;
  /**
   * Custom icon for the card.
   * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
   */
  icon?: IconName;
  /**
   * Option to inset the :focus-visible CSS box-shadow.
   * Use this if the :focus-visible CSS box-shadow is being clipped.
   */
  insetFocusVisible?: boolean;
  /**
   * The boolean value if a list card is selected.
   */
  isSelected?: boolean;
  /**
   * Name of the employee card.
   */
  name?: string;
  /**
   * The card size.
   * @default CardSize.Medium
   */
  size?: CardSize | Size;
  /**
   * The card style.
   */
  style?: React.CSSProperties;
  /**
   * The props for the subheaders.
   */
  subHeaderProps?: Array<string>;
  /**
   * Custom icon subheader separator.
   */
  subHeaderSeparatorIcon?: IconName;
  /**
   * Tags for the card.
   */
  tag?: PillProps;
  /**
   * Type of the card.
   * @default CardType.neutral
   */
  type?: CardType;
  /**
   * Custom width of the card.
   */
  width?: number | string;
}
