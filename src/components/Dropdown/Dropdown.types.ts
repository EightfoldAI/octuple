import React from 'react';
import { Placement, Strategy } from '@floating-ui/react-dom';

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
     * Callback to control the show/hide behavior of the dropdown.
     * triggered before the visible change
     * @param show {boolean}
     * @returns true or false.
     */
    showDropdown?: (show: boolean) => boolean;
    /**
     * The dropdown content
     */
    overlay?: React.ReactElement;
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
     * If the dropdown is portaled
     * @default false
     */
    portal?: boolean;
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
     * Should close dropdown on body click
     * @default true
     */
    closeOnDropdownClick?: boolean;
    visible?: boolean;
    onClickOutside?: (event: MouseEvent) => void;
}
