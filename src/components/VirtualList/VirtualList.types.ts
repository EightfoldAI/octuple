export const EMPTY_DATA: any[] = [];
export const MIN_SCROLL_BAR_SIZE: number = 20;

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode;

export interface SharedConfig<T> {
  getKey: (item: T) => React.Key;
}

export type GetKey<T> = (item: T) => React.Key;

export interface FillerProps {
  /** Virtual filler height. Should be `count * itemMinHeight` */
  height: number;
  /** Set offset of visible items. Should be the top of start item position */
  offset?: number;

  children: React.ReactNode;

  onInnerResize?: () => void;
}

export interface ItemProps {
  children: React.ReactElement;
  setRef: (element: HTMLElement) => void;
}

export interface ScrollBarProps {
  scrollTop: number;
  scrollHeight: number;
  height: number;
  count: number;
  onScroll: (scrollTop: number) => void;
  onStartMove: () => void;
  onStopMove: () => void;
}

export interface ScrollBarState {
  dragging: boolean;
  pageY: number;
  startTop: number;
  visible: boolean;
}

export const ScrollStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowAnchor: 'none',
};

export type ScrollAlign = 'top' | 'bottom' | 'auto';
export type ScrollConfig =
  | {
      index: number;
      align?: ScrollAlign;
      offset?: number;
    }
  | {
      key: React.Key;
      align?: ScrollAlign;
      offset?: number;
    };
export type ScrollTo = (arg: number | ScrollConfig) => void;
export type ListRef = {
  scrollTo: ScrollTo;
};

export interface ListProps<T>
  extends Omit<React.HTMLAttributes<any>, 'children'> {
  children: RenderFunc<T>;
  classNames?: string;
  data: T[];
  height?: number;
  itemHeight?: number;
  /** If not match virtual scroll condition, Set List still use height of container. */
  fullHeight?: boolean;
  itemKey: React.Key | ((item: T) => React.Key);
  component?: string | React.FC<any> | React.ComponentClass<any>;
  /** Set `false` will always use real scroll instead of virtual one */
  virtual?: boolean;

  onScroll?: React.UIEventHandler<HTMLElement>;
  /** Trigger when render list item changed */
  onVisibleChange?: (visibleList: T[], fullList: T[]) => void;
}
