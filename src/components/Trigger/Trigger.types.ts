import type { CSSMotionProps } from '../Motion/CSSMotion.types';
import { AlignType } from '../Align/Align.types';

export type BuildInPlacements = Record<string, AlignType>;

export type StretchType = string;

export type ActionType = string;

export type AnimationType = string;

export interface Point {
  pageX: number;
  pageY: number;
}

export interface CommonEventHandler {
  remove: () => void;
}

export interface MobileConfig {
  /** Set popup motion. You can ref `motion` for more info. */
  popupMotion?: CSSMotionProps;
  popupClassNames?: string;
  popupStyle?: React.CSSProperties;
  popupRender?: (originNode: React.ReactNode) => React.ReactNode;
}

export interface TriggerProps {
  children: React.ReactElement;
  action?: ActionType | ActionType[];
  showAction?: ActionType[];
  hideAction?: ActionType[];
  getPopupClassNameFromAlign?: (align: AlignType) => string;
  onPopupVisibleChange?: (visible: boolean) => void;
  onPopupClick?: React.MouseEventHandler<HTMLDivElement>;
  afterPopupVisibleChange?: (visible: boolean) => void;
  popup: React.ReactNode | (() => React.ReactNode);
  popupStyle?: React.CSSProperties;
  popupClassNames?: string;
  classNames?: string;
  popupPlacement?: string;
  builtinPlacements?: BuildInPlacements;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  zIndex?: number;
  focusDelay?: number;
  blurDelay?: number;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  getDocument?: (element?: HTMLElement) => HTMLDocument;
  forceRender?: boolean;
  destroyPopupOnHide?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
  popupAlign?: AlignType;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  autoDestroy?: boolean;

  stretch?: string;
  alignPoint?: boolean; // Maybe we can support user pass position in the future

  /** Set popup motion. You can ref `motion` for more info. */
  popupMotion?: CSSMotionProps;
  /** Set mask motion. You can ref `motion` for more info. */
  maskMotion?: CSSMotionProps;

  /**
   * @private Get trigger DOM node.
   * Used for some component is function component which can not access by `findDOMNode`
   */
  getTriggerDOMNode?: (node: React.ReactInstance) => HTMLElement;

  /** @private Bump fixed position at bottom in mobile. **/
  mobile?: MobileConfig;
}
