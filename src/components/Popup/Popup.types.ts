import { TooltipProps } from '../Tooltip';

export enum PopupSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum PopupTheme {
  light = 'light',
  dark = 'dark',
}

export interface PopupProps
  extends Omit<
    TooltipProps,
    'closeOnTooltipClick' | 'showTooltip' | 'size' | 'tooltipStyle' | 'type'
  > {
  /**
   * Should close Popup on body click.
   * @default false
   */
  closeOnPopupClick?: boolean;
  /**
   * The Popup style.
   */
  popupStyle?: React.CSSProperties;
  /**
   * Callback to control the show/hide behavior of the Popup.
   * triggered before the visible change
   * @param show {boolean}
   * @returns true or false.
   */
  showPopup?: (show: boolean) => boolean;
  /**
   * Size of the Popup.
   * @default PopupSize.Medium
   */
  size?: PopupSize;
}

export type PopupRef = {
  /**
   * Helper method to manually update the position
   * of the Popup.
   */
  update: () => void;
};
