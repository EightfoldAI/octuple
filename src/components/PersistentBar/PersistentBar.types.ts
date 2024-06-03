import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import { ButtonProps } from '../Button';
import { IconName } from '../Icon';
import { PaginationProps } from '../Pagination';

type Locale = {
  /**
   * The PersistentBar locale.
   */
  locale: string;
  /**
   * The PersistentBar `More buttons` Button aria label string.
   */
  overflowAriaLabelText?: string;
};

export type PersistentBarLocale = {
  lang: Locale;
};

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export enum PersistentBarType {
  bottomBarWithText = 'bottomBarWithText',
  bottomBarSecondaryButtons = 'bottomBarSecondaryButtons',
  bottomBarButtonsOnLeft = 'bottomBarButtonsOnLeft',
  bottomBarButtonsOnRight = 'bottomBarButtonsOnRight',
  topBarButtons = 'topBarButtons',
  topBarWithText = 'topBarWithText',
  topBarPagination = 'topBarPagination',
}

export const BUTTON_MENU_AFFORDANCE: number = 44;
export const BUTTON_PADDING: number = 44;
export const LINES_TO_SHOW: number = 1;

export interface PersistentBarsProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Props for the first action button.
   */
  actionButtonOneProps?: ButtonProps;
  /**
   * Props for the second action button.
   */
  actionButtonTwoProps?: ButtonProps;
  /**
   * Props for the third action button.
   */
  actionButtonThreeProps?: ButtonProps;
  /**
   * Whether the persistent bar is bordered or not.
   */
  bordered?: boolean;
  /**
   * Buttons to display on top bar.
   */
  buttonMenuProps?: Array<ButtonProps>;
  /**
   * Custom persitent bar render.
   */
  children?: React.ReactNode;
  /**
   * If the persistent bar is closable or not.
   */
  closable?: boolean;
  /**
   * Icon for the close button.
   * @default IconName.mdiClose
   */
  closeIcon?: IconName;
  /**
   * Custom props for the close button.
   */
  closeButtonProps?: CloseButtonProps;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * String content of the persistent bar.
   */
  content?: string;
  /**
   * The persistent bar gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Custom icon for the persistent bar.
   * @default PersistentBarType.mdiArrowLeft
   */
  icon?: IconName;
  /**
   * The PersistentBarLocale locale.
   * @default 'enUS'
   */
  locale?: PersistentBarLocale;
  /**
   * Callback fired on close of the persistent bar.
   */
  onClose?: () => void;
  /**
   * Aria label for the overflow button.
   * @default 'More buttons'
   */
  overflowAriaLabel?: string;
  /**
   * Arguments for pagination.
   * @deprecated Use paginatioonProps instead
   */
  paginationArgs?: Object;
  /**
   * Pagination props.
   */
  paginationProps?: PaginationProps;
  /**
   * Total pages for pagination.
   */
  paginationTotal?: number;
  /**
   * Role of the persistent bar.
   */
  role?: string;
  /**
   * Theme of the persistent bar.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the persistent bar.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Title for the persistent bar.
   */
  title?: string;
  /**
   * Type of the persistent bar.
   * @default PersistentBarType.bottom
   */
  type?: PersistentBarType;
}
