import React from 'react';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { ButtonProps } from '../Button';
import { IconName } from '../Icon';
import { OcBaseProps } from '../OcBase';
import { Ref } from 'react';
import { Value } from '../ConfigProvider';
import { InputStatus } from '../../shared/utilities';

export type SelectTabEvent<E = HTMLElement> =
  | React.MouseEvent<E>
  | React.KeyboardEvent<E>;

export type OnChangeHandler = (value: TabValue, event: SelectTabEvent) => void;

export type TabsDirection = 'vertical' | 'horizontal';

export enum TabIconAlign {
  Start = 'start',
  End = 'end',
}

export enum TabSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

export type TabValue = string;

export enum TabVariant {
  default = 'default',
  stat = 'stat',
  /**
   * @experimental as of version 0.0.1
   */
  pill = 'pill',
  /**
   * @deprecated Use TabSize.Small instead.
   */
  small = 'small',
}

export type StatThemeName = OcThemeName;
export type StatValidationStatus = InputStatus;

export interface TabsContextProps {
  /**
   * The tab icon alignment.
   * Use when variant is `default` or `pill`.
   * @default TabIconAlign.Start
   */
  alignIcon?: TabIconAlign;
  /**
   * List of Tab element.
   */
  children: React.ReactNode;
  /**
   * The tabs inverted color scheme.
   * Use when variant is `pill`.
   * @default false
   */
  colorInvert?: boolean;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Direction type - horizontal or vertical
   * Use when variant is `stat`
   * @default TabsDirection.horizontal
   */
  direction?: TabsDirection;
  /**
   * Assigns Tabs 100% width.
   * Use when direction is `vertical` and variant is `stat`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Maximum number of lines the tabs' label can have.
   * Use when variant is `stat`.
   * `0` or `null` means no limit.
   */
  lineClamp?: number;
  /**
   * Assigns Tabs a max width.
   * Use when the variant is `stat`.
   */
  maxWidth?: number;
  /**
   * The onChange event handler.
   */
  onChange: OnChangeHandler;
  /**
   * The Stat Tab group is readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * The Tabs size.
   * @default TabSize.Medium
   */
  size?: TabSize;
  /**
   * Theme of the Stat Tab group.
   */
  statgrouptheme?: StatThemeName;
  /**
   * Theme of the Tabs.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the Tabs.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The value of the selected tab.
   */
  value?: TabValue;
  /**
   * Variant of the Tabs.
   * @default default
   */
  variant?: TabVariant;
}

export interface ITabsContext {
  /**
   * The tab icon alignment.
   * Use when variant is `default` or `pill`.
   * @default TabIconAlign.Start
   */
  alignIcon?: TabIconAlign;
  /**
   * The tabs inverted color scheme.
   * Use when variant is `pill`.
   * @default false
   */
  colorInvert?: boolean;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The currently active tab value.
   */
  currentActiveTab: TabValue;
  /**
   * Direction type - horizontal or vertical
   * Use when variant is `stat`
   * @default TabsDirection.horizontal
   */
  direction?: TabsDirection;
  /**
   * Assigns Tabs 100% width.
   * Use when direction is `vertical` and variant is `stat`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Maximum number of lines the tab label can have.
   * Use when variant is `stat`.
   * `0` or `null` means no limit.
   */
  lineClamp?: number;
  /**
   * Assigns Tabs a max width.
   * Use when the variant is `stat`.
   */
  maxWidth?: number;
  /**
   * The onClick handler of the tab.
   */
  onTabClick: OnChangeHandler;
  /**
   * The Stat Tab group is readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * The Tabs size.
   * @default TabSize.Medium
   */
  size?: TabSize;
  /**
   * Theme of the Stat Tab group.
   */
  statgrouptheme?: StatThemeName;
  /**
   * Theme of the Tabs.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the Tabs.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Variant of the Tabs.
   * @default default
   */
  variant?: TabVariant;
}

export interface TabProps extends OcBaseProps<HTMLButtonElement> {
  /**
   * The tab icon alignment.
   * Use when variant is `default` or `pill`.
   * @default TabIconAlign.Start
   */
  alignIcon?: TabIconAlign;
  /**
   * The aria-label of the tab.
   */
  ariaLabel?: string;
  /**
   * Content of the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * The tabs inverted color scheme.
   * Use when variant is `pill`.
   * @default false
   */
  colorInvert?: boolean;
  /**
   * The tab is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display.
   */
  icon?: IconName;
  /**
   * The tab label.
   */
  label?: string;
  /**
   * If the tab is in loading state.
   */
  loading?: boolean;
  /**
   * The tab size.
   * @default TabSize.Medium
   */
  size?: TabSize;
  /**
   * Active value of the tab.
   */
  value: TabValue;
}

export interface StatProps extends Omit<TabProps, 'badgeContent'> {
  /**
   * The optional button props.
   * The button will not display unless this prop is provided.
   * The button size is automatically mapped by default to the stat tab size.
   * All other props are to be passed to the button.
   */
  buttonProps?: ButtonProps;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Direction type - horizontal or vertical
   * @default TabsDirection.horizontal
   */
  direction?: TabsDirection;
  /**
   * Assigns Tabs 100% width.
   * Use when direction is `vertical`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The stat gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Maximum number of lines the tab label can have.
   * `0` or `null` means no limit.
   */
  lineClamp?: number;
  /**
   * Assigns Tab a max width.
   */
  maxWidth?: number;
  /**
   * The stat tab 'a' ratio value, e.g. [1]/2.
   */
  ratioA?: string | number;
  /**
   * The stat tab 'b' ratio value, e.g. 1/[2].
   */
  ratioB?: string | number;
  /**
   * the validation status.
   */
  status?: StatValidationStatus;
  /**
   * Theme of the stat tab.
   */
  theme?: StatThemeName;
}

export interface TabsProps extends Omit<OcBaseProps<HTMLElement>, 'onChange'> {
  /**
   * The tabs icon alignment.
   * Use when variant is `default` or `pill`.
   * @default TabIconAlign.Start
   */
  alignIcon?: TabIconAlign;
  /**
   * Use when variant is `stat`.
   * If the stat tabs are bordered or not.
   * @default true
   */
  bordered?: boolean;
  /**
   * List of Tab element.
   */
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  /**
   * The tabs inverted color scheme.
   * Use when variant is `pill`.
   * @default false
   */
  colorInvert?: boolean;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Direction type - horizontal or vertical
   * Use when variant is `stat`
   * @default TabsDirection.horizontal
   */
  direction?: TabsDirection;
  /**
   * Use when variant is `stat`.
   * If the stat tabs are separated by a dashed line or not.
   * @default true
   */
  divider?: boolean;
  /**
   * Assigns Tabs 100% width.
   * Use when direction is `vertical` and variant is `stat`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Maximum number of lines the tab label can have.
   * Use when variant is `stat`.
   * `0` or `null` means no limit.
   */
  lineClamp?: number;
  /**
   * Assigns Tabs a max width.
   * Use when the variant is `stat`.
   */
  maxWidth?: number;
  /**
   * Callback called on click of a tab.
   * @param value {TabValue}
   * @param event {SelectTabEvent}
   */
  onChange?: OnChangeHandler;
  /**
   * The Stat Tab group is readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Ref of the tabs.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * If the tabs are scrollable or not.
   * @default false
   */
  scrollable?: boolean;
  /**
   * The tab size.
   * @default TabSize.Medium
   */
  size?: TabSize;
  /**
   * Theme of the Stat Tab group.
   */
  statgrouptheme?: StatThemeName;
  /**
   * Theme of the Tabs.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the Tabs.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * If the tabs should have an underline/penline beneath them.
   * NOTE: won't be applied if pill variant is used.
   * @default false
   */
  underlined?: boolean;
  /**
   * The default tab to select.
   */
  value?: TabValue;
  /**
   * Variant of the tab.
   * @default default
   */
  variant?: TabVariant;
}

export interface TabsTheme {
  label?: Value;
  activeLabel?: Value;
  activeBackground?: Value;
  hoverLabel?: Value;
  hoverBackground?: Value;
  indicatorColor?: Value;
  smallActiveBackground?: Value;
  smallHoverBackground?: Value;
  pillLabel?: Value;
  pillActiveLabel?: Value;
  pillActiveBackground?: Value;
  pillHoverLabel?: Value;
  pillBackground?: Value;
  underline?: Value;
}
