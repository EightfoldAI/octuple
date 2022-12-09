import React from 'react';
import { OcThemeNames } from '../ConfigProvider';
import { IconName } from '../Icon';
import { OcBaseProps } from '../OcBase';
import { Ref } from 'react';
import { Value } from '../ConfigProvider';

export type SelectTabEvent<E = HTMLElement> =
    | React.MouseEvent<E>
    | React.KeyboardEvent<E>;

export type OnChangeHandler = (value: TabValue, event: SelectTabEvent) => void;

export enum TabSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
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

export type StatThemeNames = OcThemeNames;

export interface TabsContextProps {
    /**
     * List of Tab element.
     */
    children: React.ReactNode;
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
    statgrouptheme?: StatThemeNames;
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
     * The currently active tab value.
     */
    currentActiveTab: TabValue;
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
    statgrouptheme?: StatThemeNames;
    /**
     * Variant of the Tabs.
     * @default default
     */
    variant?: TabVariant;
}

export interface TabProps extends OcBaseProps<HTMLButtonElement> {
    /**
     * The aria-label of the tab.
     */
    ariaLabel?: string;
    /**
     * Content of the badge.
     */
    badgeContent?: React.ReactNode;
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
     * Active value of the tab.
     */
    value: TabValue;
}

export interface StatProps extends Omit<TabProps, 'badgeContent'> {
    /**
     * The stat tab 'a' ratio value, e.g. [1]/2.
     */
    ratioA?: string | number;
    /**
     * The stat tab 'b' ratio value, e.g. 1/[2].
     */
    ratioB?: string | number;
    /**
     * Theme of the stat tab.
     */
    theme?: StatThemeNames;
}

export interface TabsProps extends Omit<OcBaseProps<HTMLElement>, 'onChange'> {
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
     * Use when variant is `stat`.
     * If the stat tabs are separated by a dashed line or not.
     * @default true
     */
    divider?: boolean;
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
    statgrouptheme?: StatThemeNames;
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
