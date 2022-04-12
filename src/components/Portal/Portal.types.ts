import React from 'react';

export type PortalRef = {};

export interface PortalProps {
    /**
     * Element to which to attach the child to
     */
    getContainer: () => HTMLElement;
    /**
     * Child that needs to be portaled
     */
    children?: React.ReactNode;
}
