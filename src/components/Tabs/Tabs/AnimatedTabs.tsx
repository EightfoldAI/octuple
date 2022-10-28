import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabsProps, TabSize, TabVariant } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipper } from 'react-flip-toolkit';

import styles from '../tabs.module.scss';

export const AnimatedTabs: FC<TabsProps> = React.forwardRef(
    (
        {
            bordered = true,
            children,
            classNames,
            onChange,
            scrollable,
            divider = true,
            size = TabSize.Medium,
            style,
            underlined = false,
            variant = TabVariant.default,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const { currentActiveTab } = useTabs();
        const tabClassName: string = mergeClasses([
            styles.tabWrap,
            { [styles.underlined]: underlined && variant !== TabVariant.pill },
            {
                [styles.small]:
                    variant === TabVariant.small || size === TabSize.Small,
            },
            { [styles.pill]: variant === TabVariant.pill },
            { [styles.stat]: variant === TabVariant.stat },
            { [styles.bordered]: variant === TabVariant.stat && bordered },
            { [styles.divider]: variant === TabVariant.stat && divider },
            { [styles.scrollable]: scrollable },
            classNames,
        ]);
        return (
            <Flipper flipKey={currentActiveTab}>
                <div
                    {...rest}
                    ref={ref}
                    role="tablist"
                    className={tabClassName}
                    style={style}
                >
                    {children}
                </div>
            </Flipper>
        );
    }
);
