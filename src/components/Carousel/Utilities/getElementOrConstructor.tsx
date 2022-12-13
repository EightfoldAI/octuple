import React from 'react';

export const getElementOrConstructor = (
    Elem: React.FC | React.ReactNode
): JSX.Element | null => {
    return (
        (React.isValidElement(Elem) && Elem) ||
        (typeof Elem === 'function' && <Elem />) ||
        null
    );
};
