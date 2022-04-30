import React from 'react';

export interface BadgeProps {
    /**
     * Badge is in an active state or not
     */
    active: boolean;
    /**
     * Custom badge className
     */
    className?: string;
    /**
     * Custom badge style
     */
    style?: React.CSSProperties;
}
