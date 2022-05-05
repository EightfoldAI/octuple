import React from 'react';
import { OcBaseProps } from '../OcBase';

export interface BadgeProps extends OcBaseProps<HTMLSpanElement> {
    /**
     * Badge is in an active state or not
     */
    active?: boolean;
    /**
     * If badge is disruptive or not
     */
    disruptive?: boolean;
}
