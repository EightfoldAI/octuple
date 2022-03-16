import React, {FC} from "react";
import {classNames} from "../../../shared/utilities";
import {TabsProps, TabVariant} from "../Tabs.types";
import {useTabs} from "../Tabs.context";
import {Flipper} from "react-flip-toolkit";

import "../../../styles/main.scss";

export const AnimatedTabs: FC<TabsProps> = ({
                                                children,
                                                className,
                                                style,
                                                variant = TabVariant.default,
                                                scrollable
                                            }) => {
    const {currentActiveTab} = useTabs();
    const tabClassName: string = classNames([
        "tab-wrap",
        {small: variant === TabVariant.small},
        {pill: variant === TabVariant.pill},
        {scrollable: scrollable},
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
