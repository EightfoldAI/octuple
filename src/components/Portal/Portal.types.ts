import React from 'react';

export type PortalRef = {};

export interface PortalProps {
    /**
     * Child that needs to be portaled
     */
    children?: React.ReactNode;
    /**
     * HTMLElement to which to attach the child
     */
    getContainer: () => HTMLElement;
}
