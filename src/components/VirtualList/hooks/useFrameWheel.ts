import { useRef } from 'react';
import raf from '../../../shared/raf';
import isFF from '../Utils/isFirefox';
import useOriginScroll from './useOriginScroll';

interface FireFoxDOMMouseScrollEvent {
    detail: number;
    preventDefault: Function;
}

export default function useFrameWheel(
    inVirtual: boolean,
    isScrollAtTop: boolean,
    isScrollAtBottom: boolean,
    onWheelDelta: (offset: number) => void
): [(e: WheelEvent) => void, (e: FireFoxDOMMouseScrollEvent) => void] {
    const offsetRef = useRef(0);
    const nextFrameRef = useRef<number>(null);

    // Firefox patch
    const wheelValueRef = useRef<number>(null);
    const isMouseScrollRef = useRef<boolean>(false);

    // Scroll status sync
    const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

    function onWheel(event: WheelEvent) {
        if (!inVirtual) return;

        raf.cancel(nextFrameRef.current);

        const { deltaY } = event;
        offsetRef.current += deltaY;
        wheelValueRef.current = deltaY;

        // Do nothing when scroll at the edge, Skip check when is in scroll
        if (originScroll(deltaY)) return;

        // Proxy of scroll events
        if (!isFF) {
            event.preventDefault();
        }

        nextFrameRef.current = raf(() => {
            // Patch a multiple for Firefox to fix wheel number too small
            const patchMultiple = isMouseScrollRef.current ? 10 : 1;
            onWheelDelta(offsetRef.current * patchMultiple);
            offsetRef.current = 0;
        });
    }

    // A patch for firefox
    function onFireFoxScroll(event: FireFoxDOMMouseScrollEvent) {
        if (!inVirtual) return;

        isMouseScrollRef.current = event.detail === wheelValueRef.current;
    }

    return [onWheel, onFireFoxScroll];
}
