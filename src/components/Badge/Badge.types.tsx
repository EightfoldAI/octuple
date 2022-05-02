import React from 'react';

export interface BadgeProps {
    /**
     * Badge is in an active state or not
     */
    active?: boolean;
    /**
     * If badge is disruptive or not
     */
    disruptive?: boolean;
    /**
     * Custom badge className
     */
    className?: string;
    /**
     * Custom badge style
     */
    style?: React.CSSProperties;
}
