import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import { PortalProps, PortalRef } from './Portal.types';

export const Portal = forwardRef<PortalRef, PortalProps>(
    ({ getContainer, children }, ref) => {
        const [container, setContainer] = useState<HTMLElement>(null);

        // Ref return nothing, only for wrapper check exist
        useImperativeHandle(ref, () => ({}));

        useEffect(() => {
            setContainer(getContainer());
        }, [getContainer]);

        return container ? ReactDOM.createPortal(children, container) : null;
    }
);
