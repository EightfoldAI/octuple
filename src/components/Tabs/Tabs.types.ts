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
    children: React.ReactNode;
    onChange: OnChangeHandler;
    value?: TabValue;
}

export interface ITabsContext {
    currentActiveTab: TabValue;
    onTabClick: OnChangeHandler;
}

export interface TabProps extends OcBaseProps<HTMLButtonElement> {
    /**
     * Active value of the tab.
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
    /**
     * Content of the badge
     */
    badgeContent?: React.ReactNode;
}

export interface TabsProps extends Omit<OcBaseProps<HTMLElement>, 'onChange'> {
    /**
     * List of Tab element
     */
    children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
    /**
     * The default tab to select
     */
    value?: TabValue;
    /**
     * Callback called on click of a tab
     * @param value {TabValue}
     * @param event {SelectTabEvent}
     */
    onChange?: OnChangeHandler;
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
    /**
     * Ref of the tabs
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
