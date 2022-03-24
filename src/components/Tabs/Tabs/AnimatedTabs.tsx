import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { TabsProps, TabVariant } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipper } from 'react-flip-toolkit';

import styles from '../tabs.module.scss';

export const AnimatedTabs: FC<TabsProps> = ({
    children,
    className,
    style,
    variant = TabVariant.default,
    scrollable,
}) => {
    const { currentActiveTab } = useTabs();
    const tabClassName: string = classNames([
        styles.tabWrap,
        { [styles.small]: variant === TabVariant.small },
        { [styles.pill]: variant === TabVariant.pill },
        { [styles.scrollable]: scrollable },
        className,
    ]);
    return (
        <Flipper flipKey={currentActiveTab}>
            <div role="tablist" className={tabClassName} style={style}>
                {children}
            </div>
        </Flipper>
    );
};
