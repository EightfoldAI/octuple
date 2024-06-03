import { canUseDom } from './canUseDom';

export type Breakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

export const responsiveArray: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: BreakpointMap = {
  xs: '(min-width: 0)',
  sm: '(min-width: 600px)',
  md: '(min-width: 900px)',
  lg: '(min-width: 1200px)',
  xl: '(min-width: 1600px)',
};

type SubscribeFunc = (screens: ScreenMap) => void;
const subscribers: Map<Number, SubscribeFunc> = new Map<
  Number,
  SubscribeFunc
>();
let subUid: number = -1;
let screens: {} = {};

export const responsiveObserve: {
  matchHandlers: {
    [prop: string]: {
      mql: MediaQueryList;
      listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any;
    };
  };
  dispatch(pointMap: ScreenMap): boolean;
  subscribe(func: SubscribeFunc): number;
  unsubscribe(token: number): void;
  unregister(): void;
  register(): void;
} = {
  matchHandlers: {} as {
    [prop: string]: {
      mql: MediaQueryList;
      listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    };
  },
  dispatch(pointMap: ScreenMap): boolean {
    screens = pointMap;
    subscribers.forEach((func) => func(screens));
    return subscribers.size >= 1;
  },
  subscribe(func: SubscribeFunc): number {
    if (!subscribers.size) this.register();
    subUid += 1;
    subscribers.set(subUid, func);
    func(screens);
    return subUid;
  },
  unsubscribe(token: number): void {
    subscribers.delete(token);
    if (!subscribers.size) this.unregister();
  },
  unregister(): void {
    if (canUseDom()) {
      Object.keys(responsiveMap).forEach((screen: Breakpoint): void => {
        const matchMediaQuery = responsiveMap[screen];
        const handler = this.matchHandlers[matchMediaQuery];
        handler?.mql.removeListener(handler?.listener);
      });
    }
    subscribers.clear();
  },
  register(): void {
    if (canUseDom()) {
      Object.keys(responsiveMap).forEach((screen: Breakpoint): void => {
        const matchMediaQuery = responsiveMap[screen];
        const listener = ({ matches }: { matches: boolean }): void => {
          this.dispatch({
            ...screens,
            [screen]: matches,
          });
        };
        const mql: MediaQueryList = window.matchMedia(matchMediaQuery);
        mql.addListener(listener);
        this.matchHandlers[matchMediaQuery] = {
          mql,
          listener,
        };

        listener(mql);
      });
    }
  },
};
