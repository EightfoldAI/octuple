import * as React from 'react';
import { IconName } from '../Icon';

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
    children: React.ReactNode;
    onChange: OnChangeHandler;
    activeTab?: TabValue;
}

export interface ITabsContext {
    currentActiveTab: TabValue;
    onTabClick: OnChangeHandler;
}

export interface TabProps {
    /**
     * The value of the tab.
     */
    value: TabValue;
    /**
     * The tab label.
     */
    label?: string;
    /**
     * The icon to display.
     */
    icon?: IconName;
    /**
     * The aria-label of the tab.
     */
    ariaLabel?: string;
    /**
     * The tab is disabled.
     */
    disabled?: boolean;
}

export interface TabsProps {
    /**
     * List of Tab element
     */
    children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
    /**
     * The default tab to select
     */
    activeTab?: TabValue;
    /**
     * Callback called on click of a tab
     * @param value {TabValue}
     * @param event {SelectTabEvent}
     */
    onChange?: OnChangeHandler;
    /**
     * Custom class that can be applied on tabs container
     */
    className?: string;
    /**
     * Css properties top be applied on tabs container
     */
    style?: React.CSSProperties;
    /**
     * Variant of the tab
     * @default default
     */
    variant?: TabVariant;
    /**
     * If the tabs are scrollable or not
     * @default false
     */
    scrollable?: boolean;
}
