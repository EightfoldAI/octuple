import { useEffect } from 'react';

interface OnUpdateProps {
    callback: Function;
    condition: boolean;
    hash: string;
}

export const useOnUpdate = ({
    callback,
    condition,
    hash,
}: OnUpdateProps): void => {
    useEffect(() => {
        if (condition) {
            callback?.();
        }
    }, [hash, condition]);
};
