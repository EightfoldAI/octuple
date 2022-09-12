import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const SCROLL_BREATHER: number = 0.5;

export function useScrollShadow(containerRef: MutableRefObject<HTMLElement>) {
    let ob: ResizeObserver;
    const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);
    const [showTopShadow, setShowTopShadow] = useState<boolean>(false);

    const onScroll = useCallback((event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        const containerHeight = scrollHeight - clientHeight - SCROLL_BREATHER;
        if (scrollTop > 0) {
            setShowTopShadow(true);
        } else if (scrollTop === 0) {
            setShowTopShadow(false);
        }
        if (scrollTop < containerHeight) {
            setShowBottomShadow(true);
        } else if (scrollTop >= containerHeight) {
            setShowBottomShadow(false);
        }
    }, []);

    const scrollRef = useCallback((content: HTMLElement) => {
        if (!content) {
            return;
        }
        containerRef.current = content;
        // To compute shadows on mount and resize
        ob = new ResizeObserver(() => onScroll({ target: content }));
        ob.observe(content);
        content.addEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        return () => {
            containerRef?.current?.removeEventListener?.('scroll', onScroll);
            ob?.disconnect?.();
        };
    }, [containerRef]);

    return { showBottomShadow, showTopShadow, scrollRef };
}
