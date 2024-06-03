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

export enum PopupTouchInteraction {
  Tap = 'Tap',
  TapAndHold = 'TapAndHold',
}

export interface PopupProps
  extends Omit<
    TooltipProps,
    | 'closeOnTooltipClick'
    | 'showTooltip'
    | 'size'
    | 'theme'
    | 'tooltipOnKeydown'
    | 'tooltipStyle'
    | 'touchInteraction'
    | 'type'
  > {
  /**
   * Should close Popup on body click.
   * @default false
   */
  closeOnPopupClick?: boolean;
  /**
   * Callback executed on popup element keydown.
   * @param event
   * @returns (event: React.KeyboardEvent) => void
   */
  popupOnKeydown?: (event: React.KeyboardEvent) => void;
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
  /**
   * Theme of the Popup.
   * @default light
   */
  theme?: PopupTheme;
  /**
   * Determines the interaction that triggers
   * the equivalent of hover on touch interfaces.
   * @default PopupTouchInteraction.Tap
   */
  touchInteraction?: PopupTouchInteraction;
}

export type PopupRef = {
  /**
   * Helper method to manually update the position
   * of the Popup.
   */
  update: () => void;
};
