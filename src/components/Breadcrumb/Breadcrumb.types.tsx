import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import { IconProps } from '../Icon';
import { LinkProps } from '../Link';
import { TooltipProps } from '../Tooltip';

type Locale = {
  /**
   * The Breadcrumb locale.
   */
  locale: string;
  /**
   * The Breadcrumb `Breadcrumbs` aria label string.
   */
  ariaLabelText?: string;
  /**
   * The Breadcrumb `More links` Button aria label string.
   */
  overflowAriaLabelText?: string;
};

export type BreadcrumbLocale = {
  lang: Locale;
};

export interface BreadcrumbLinkProps
  extends Omit<LinkProps, 'fullWidth' | 'role'> {
  /**
   * Use this on the current page Breadcrumb if included.
   */
  ariaCurrent?: boolean;
  /**
   * Custom breadcrumb link renderer.
   * Use with React Router.
   */
  children?: React.ReactNode;
  /**
   * Custom divider of the Breadcrumb Link list item.
   */
  divider?: IconProps;
  /**
   * Custom breadcrumb dropdown item renderer.
   * Use with React Router.
   */
  dropdownChildren?: React.ReactNode;
  /**
   * The Breadcrumb custom crumb.
   */
  customCrumb?: React.ReactNode;
  /**
   * The Link is readonly (text)
   */
  readonly?: boolean;
  /**
   * The Breadcrumb Tooltip.
   */
  tooltipprops?: TooltipProps;
  /**
   * The Breadcrumb Link src url.
   */
  url?: string;
}

export interface BreadcrumbProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The Breadcrumb Links.
   */
  links: BreadcrumbLinkProps[];
  /**
   * Aria label of the root element of Breadcrumb.
   * @default 'Breadcrumbs'
   */
  ariaLabel?: string;
  /**
   * Custom class names of the root Breadcrumb element.
   */
  classNames?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Whether to display the current page in the Breadcrumb.
   * To be used if your links array includes the current page.
   * @default true
   */
  displayCurrent?: boolean;
  /**
   * Shared custom divider of the Breadcrumb list items.
   * Cutom dividers of individual Links will take priority.
   */
  divider?: IconProps;
  /**
   * id of the root Breadcrumb element.
   */
  id?: string;
  /**
   * Shared custom class names of the Breadcrumb Links.
   */
  linkClassNames?: string;
  /**
   * The Breadcrumb locale.
   * @default 'enUS'
   */
  locale?: BreadcrumbLocale;
  /**
   * Specify when to begin truncating to overflow Dropdown Link Menu.
   * if set to false the Breadcrumbs will not truncate.
   * @default 3
   */
  maxDisplayedLinks?: boolean | number;
  /**
   * Aria label for the overflow button.
   * @default 'More links'
   */
  overflowAriaLabel?: string;
  /**
   * Custom style of the root Breadcrumb element.
   */
  style?: React.CSSProperties;
  /**
   * Theme of the breadcrumb.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the breadcrumb.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
}
