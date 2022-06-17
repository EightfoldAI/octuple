let raf: (callback: FrameRequestCallback) => number = (
    callback: FrameRequestCallback
) => +setTimeout(callback, 16);
let caf: (num: number) => void = (num: number) => clearTimeout(num);

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    raf = (callback: FrameRequestCallback) =>
        window.requestAnimationFrame(callback);
    caf = (handle: number) => window.cancelAnimationFrame(handle);
}

let rafUUID: number = 0;
const rafIds: Map<number, number> = new Map<number, number>();

const cleanup = (id: number) => {
    rafIds.delete(id);
};

export default function wrapperRaf(callback: () => void, times = 1): number {
    rafUUID += 1;
    const id: number = rafUUID;

    const callRef = (leftTimes: number): void => {
        if (leftTimes === 0) {
            // Clean up
            cleanup(id);

            // Trigger
            callback();
        } else {
            // Next raf
            const realId = raf(() => {
                callRef(leftTimes - 1);
            });

            // Bind real raf id
            rafIds.set(id, realId);
        }
    };

    callRef(times);

    return id;
}

wrapperRaf.cancel = (id: number): void => {
    const realId: number = rafIds.get(id);
    cleanup(realId);
    return caf(realId);
};
