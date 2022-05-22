import { Placement, Strategy } from '@floating-ui/react-dom';
import React from 'react';
import { IconProps } from '../Icon';

export interface DropdownProps {
    /**
     * The trigger mode that opens the dropdown
     */
    trigger?: 'click' | 'hover' | 'contextmenu';
    /**
     * Callback called when the visibility of the dropdown changes
     * @param visible {boolean}
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * The dropdown content
     */
    overlay?: React.ReactNode;
    /**
     * If the dropdown is disabled or not
     */
    disabled?: boolean;
    /**
     * Class names of the main wrapper
     */
    classNames?: string;
    /**
     * Style of the main wrapper
     */
    style?: React.CSSProperties;
    /**
     * Placement of the menu
     * @default bottom-start
     */
    placement?: Placement;
    /**
     * Positioning strategy for the tooltip
     * @default absolute
     */
    positionStrategy?: Strategy;
    /**
     * The offset from the reference element
     * @default 0
     */
    offset?: number;
    /**
     * Custom dropdown class names
     */
    dropdownClassNames?: string;
    /**
     * Dropdown custom style
     */
    dropdownStyle?: React.CSSProperties;
    /**
     * dropdown icon props
     */
    iconProps?: IconProps;
}
