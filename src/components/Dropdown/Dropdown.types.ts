import { offset, Placement } from '@floating-ui/react-dom';
import React from 'react';

export interface DropdownProps {
    trigger?: 'click' | 'hover' | 'contextmenu';
    onVisibleChange?: (visible: boolean) => void;
    overlay?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    /**
     * Placement of the menu
     * @default bottom-start
     */
    placement?: Placement;
    offset?: number;
    dropdownClassName?: string;
    dropdownStyle?: React.CSSProperties;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
}
