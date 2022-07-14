import React from 'react';
import { generateTrigger } from './Trigger';

interface MockPortalProps {
    didUpdate: () => void;
    children: React.ReactElement;
    getContainer: () => HTMLElement;
}

const MockPortal: React.FC<MockPortalProps> = ({
    didUpdate,
    children,
    getContainer,
}) => {
    React.useEffect(() => {
        didUpdate();
        getContainer();
    });

    return children;
};

export default generateTrigger(MockPortal);
