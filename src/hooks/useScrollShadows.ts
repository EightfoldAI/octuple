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

    useEffect(() => {
        const content = containerRef.current;
        if (!content) {
            return () => {};
        }
        content.addEventListener('scroll', onScroll);
        return () => content.removeEventListener('scroll', onScroll);
    }, [containerRef.current]);

    return { showBottomShadow, showTopShadow };
}
