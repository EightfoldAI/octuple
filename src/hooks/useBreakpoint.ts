import { useEffect, useRef } from 'react';
import { useForceUpdate } from './useForceUpdate';
import type {
    Breakpoint,
    ScreenMap,
} from '../shared/utilities/responsiveObserve';
import { responsiveObserve } from '../shared/utilities/responsiveObserve';

export const useBreakpoint: (refreshOnChange?: boolean) => ScreenMap = (
    refreshOnChange: boolean = true
): ScreenMap => {
    const screensRef: React.MutableRefObject<
        Partial<Record<Breakpoint, boolean>>
    > = useRef<ScreenMap>({});
    const forceUpdate: React.DispatchWithoutAction = useForceUpdate();

    useEffect(() => {
        const token: number = responsiveObserve.subscribe((supportScreens) => {
            screensRef.current = supportScreens;
            if (refreshOnChange) {
                forceUpdate();
            }
        });

        return () => responsiveObserve.unsubscribe(token);
    }, []);

    return screensRef.current;
};
