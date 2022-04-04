import React from 'react';
import { Placement } from '@floating-ui/react-dom';
import { IconName } from '../Icon';

export enum MenuType {
    primary = 'primary',
    default = 'default',
    disruptive = 'disruptive',
}

export interface MenuItem {
    icon?: IconName;
    label: string;
    value: string | number | boolean;
}

export interface MenuProps {
    type?: MenuType;
    items: MenuItem[];
}
