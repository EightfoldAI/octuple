import React from 'react';

import { useFocusTrap } from './hooks/useFocusTrap';

interface Pros {
    children: React.ReactElement;
    trap: boolean;
}

export const FocusTrap = ({ children, trap = true }: Pros): JSX.Element => {
    const focusRef = useFocusTrap(trap);
    if (!trap) return children;
    return <div ref={focusRef}>{children}</div>;
};
