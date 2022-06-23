import React from 'react';
import { requestAnimationFrameWrapper } from '../../../shared/utilities';

export const useNextFrame = (): [
    (callback: (info: { isCanceled: () => boolean }) => void) => void,
    () => void
] => {
    const nextFrameRef = React.useRef<number>(null);

    function cancelNextFrame() {
        requestAnimationFrameWrapper.cancel(nextFrameRef.current);
    }

    function nextFrame(
        callback: (info: { isCanceled: () => boolean }) => void,
        delay = 2
    ) {
        cancelNextFrame();

        const nextFrameId = requestAnimationFrameWrapper(() => {
            if (delay <= 1) {
                callback({
                    isCanceled: () => nextFrameId !== nextFrameRef.current,
                });
            } else {
                nextFrame(callback, delay - 1);
            }
        });

        nextFrameRef.current = nextFrameId;
    }

    React.useEffect(
        () => () => {
            cancelNextFrame();
        },
        []
    );

    return [nextFrame, cancelNextFrame];
};
