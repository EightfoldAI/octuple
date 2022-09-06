import { MutableRefObject, useCallback, useEffect, useState } from 'react';

export function useScrollShadow(containerRef: MutableRefObject<HTMLElement>) {
    const [showBottomShadow, setShowBottomShadow] = useState(false);
    const [showTopShadow, setShowTopShadow] = useState(false);

    const onScroll = useCallback((event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        const containerHeight = scrollHeight - clientHeight;
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
        content.addEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        return () =>
            containerRef.current.removeEventListener('scroll', onScroll);
    }, [containerRef]);

    return { showBottomShadow, showTopShadow, scrollRef };
}
