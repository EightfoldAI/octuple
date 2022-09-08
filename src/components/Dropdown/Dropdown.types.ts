import React from 'react';
import { Placement, Strategy } from '@floating-ui/react-dom';

export interface DropdownProps {
    /**
     * Class names of the main wrapper
     */
    classNames?: string;
    /**
     * Should close dropdown on body click
     * @default true
     */
    closeOnDropdownClick?: boolean;
    /**
     * Should close dropdown on click outside
     * @default true
     */
    closeOnOutsideClick?: boolean;
    /**
     * If the dropdown is disabled or not
     */
    disabled?: boolean;
    /**
     * Custom dropdown class names
     */
    dropdownClassNames?: string;
    /**
     * Dropdown custom style
     */
    dropdownStyle?: React.CSSProperties;
    /**
     * Manually control the height of the dropdown
     */
    height?: number;
    /**
     * The offset from the reference element
     * @default 0
     */
    offset?: number;
    /**
     * Callback method fired on outside click on dropdown
     * @param event
     */
    onClickOutside?: (event: MouseEvent) => void;
    /**
     * Callback called when the visibility of the dropdown changes
     * @param visible {boolean}
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * The dropdown content
     */
    overlay?: React.ReactElement;
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
     * Callback to control the show/hide behavior of the dropdown.
     * triggered before the visible change
     * @param show {boolean}
     * @returns true or false.
     */
    showDropdown?: (show: boolean) => boolean;
    /**
     * Style of the main wrapper
     */
    style?: React.CSSProperties;
    /**
     * The trigger mode that opens the dropdown
     * @default 'click'
     */
    trigger?: 'click' | 'hover' | 'contextmenu';
    /**
     * Manually control visibility of the dropdown
     */
    visible?: boolean;
    /**
     * Manually control the width of the dropdown
     */
    width?: number;
}
