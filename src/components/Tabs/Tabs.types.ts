import React from 'react';
import { IconName } from '../Icon';
import { OcBaseProps } from '../OcBase';
import { Ref } from 'react';
import { Value } from '../ConfigProvider';

export type SelectTabEvent<E = HTMLElement> =
    | React.MouseEvent<E>
    | React.KeyboardEvent<E>;

export type OnChangeHandler = (value: TabValue, event: SelectTabEvent) => void;

export type TabValue = string;

export enum TabVariant {
    default = 'default',
    small = 'small',
    /**
     * @experimental as of version 0.0.1
     */
    pill = 'pill',
}

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
     * The value of the selected tab.
     */
    value?: TabValue;
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

export interface TabsProps extends Omit<OcBaseProps<HTMLElement>, 'onChange'> {
    /**
     * List of Tab element.
     */
    children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
    /**
     * Callback called on click of a tab.
     * @param value {TabValue}
     * @param event {SelectTabEvent}
     */
    onChange?: OnChangeHandler;
    /**
     * If the tabs are scrollable or not.
     * @default false
     */
    scrollable?: boolean;
    /**
     * The default tab to select.
     */
    value?: TabValue;
    /**
     * Variant of the tab.
     * @default default
     */
    variant?: TabVariant;
    /**
     * Ref of the tabs.
     */
    ref?: Ref<HTMLDivElement>;
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
}
