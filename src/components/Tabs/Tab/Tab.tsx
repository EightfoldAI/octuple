import React, {FC} from 'react';
import {classNames} from '../../../shared/utilities';
import {TabProps} from "../Tabs.types";
import {useTabs} from "../Tabs.context";
import {Flipped} from "react-flip-toolkit";

import '../../../styles/main.scss';

export const Tab: FC<TabProps> = ({
                                      value,
                                      label,
                                      icon,
                                      disabled,
                                      ariaLabel
                                  }) => {

    const {onTabClick, currentActiveTab} = useTabs();

    const iconExists: boolean = icon && icon !== '';
    const labelExists: boolean = !!label;
    const isActive: boolean = value === currentActiveTab;

    const tabClassName: string = classNames([
        'tab',
        {'active': isActive}
    ]);

    const getIcon = (): JSX.Element => (
        <span className={'icon'}>
            <span className={'icon-1-material'}>
                <i className={classNames(['mdi', icon])}/>
            </span>
        </span>
    );

    const getLabel = (): JSX.Element => (
        <span className="label">
            {label}
        </span>
    );

    const getTabIndicator = (): JSX.Element => (
        <Flipped flipId="tabIndicator">
            <div className="tab-indicator"/>
        </Flipped>
    );

    return (
        <button
            className={tabClassName}
            aria-label={ariaLabel}
            aria-selected={isActive}
            role='tab'
            disabled={disabled}
            onClick={(e) => onTabClick(value, e)}>
            {iconExists && getIcon()}
            {labelExists && getLabel()}
            {isActive && getTabIndicator()}
        </button>
    );
};
