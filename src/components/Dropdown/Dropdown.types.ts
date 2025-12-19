import React, { Ref } from 'react';
import { Placement, Strategy } from '@floating-ui/react';

export const ANIMATION_DURATION: number = 200;
export const NO_ANIMATION_DURATION: number = 10;
export const PREVENT_DEFAULT_TRIGGERS: string[] = ['contextmenu'];
export const TRIGGER_TO_HANDLER_MAP_ON_ENTER = {
  click: 'onClick',
  hover: 'onMouseEnter',
  contextmenu: 'onContextMenu',
};
export const TRIGGER_TO_HANDLER_MAP_ON_LEAVE = {
  click: '',
  hover: 'onMouseLeave',
  contextmenu: '',
};

export interface DropdownProps {
  /**
   * The ref of element that should implement the following props:
   * 'aria-controls', 'aria-expanded', 'aria-haspopup', 'role'
   * @default child
   */
  ariaRef?: React.MutableRefObject<HTMLElement>;
  /**
   * The child renderer.
   * @deprecated Wrap your element instead, e.g. `<Dropdown><MyElement /></Dropdown>`.
   */
  children?: React.ReactNode;
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
   * Should close Tooltip on reference click.
   * @default true
   */
  closeOnReferenceClick?: boolean;
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
   * Optionally place focus on the first focusable
   * selector when the Dropdown is first visible.
   * When false, visibility will remain on the Dropdown.
   * @default true
   */
  initialFocus?: boolean;
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
   * If the dropdown should be shown when the user presses the shift + tab key
   * @default true
   */
  toggleDropdownOnShiftTab?: boolean;
  /**
   * The dropdown content
   */
  overlay?: React.ReactElement;
  /**
   * The tabindex of the overlay wrapper
   * @default 0
   */
  overlayTabIndex?: number;
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
   * Positioning strategy for the dropdown
   * @default absolute
   */
  positionStrategy?: Strategy;
  /**
   * Callback executed on reference element click.
   * @param event
   * @returns (event: React.MouseEvent) => void
   */
  referenceOnClick?: (event: React.MouseEvent) => void;
  /**
   * Callback executed on reference element keydown.
   * @param event
   * @returns (event: React.KeyboardEvent) => void
   */
  referenceOnKeydown?: (event: React.KeyboardEvent) => void;
  /**
   * Custom reference wrapper class names
   */
  referenceWrapperClassNames?: string;
  /**
   * The dropdown aria role.
   * @default 'listbox'
   */
  role?: string;
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
   * The optional tab index of the reference element.
   */
  tabIndex?: number;
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
  /**
   * The ref of the dropdown
   */
  ref?: Ref<DropdownRef>;
  /**
   * The props of the overlay
   */
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
}

export type DropdownRef = {
  /**
   * Helper to manually place focus on the first focusable selector of the Dropdwon.
   */
  focusFirstElement: () => void;
  /**
   * Helper to manually place focus on a selector of the Dropdwon.
   */
  focusOnElement: (elementToFocus: HTMLElement) => void;
  /**
   * Helper method to manually update the position
   * of the dropdown
   */
  update: () => void;
};
