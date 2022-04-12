import React, { useEffect, useRef } from 'react';
import { Portal } from './';

export default {
    title: 'Portal',
    component: Portal,
};

export const Default = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <h1>Portal</h1>
            <div ref={containerRef}></div>
            <Portal getContainer={() => containerRef.current}>
                Hello i was portaled
            </Portal>
        </>
    );
};
