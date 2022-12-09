import { useEffect, useState } from 'react';

interface CallbackProps {
    callback: () => void;
    condition?: boolean;
}

export const useOnInitCallback = ({
    callback,
    condition,
}: CallbackProps): boolean => {
    const [callbackTriggered, setCallbackTriggered] = useState(false);

    useEffect(() => {
        if (condition && !callbackTriggered) {
            setCallbackTriggered(true);
            callback();
        }
    }, [condition, callbackTriggered]);

    return callbackTriggered;
};
