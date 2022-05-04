import React, { HTMLAttributes } from 'react';

export interface OcBaseProps<T> extends HTMLAttributes<T> {
    classNames?: string;
    style?: React.CSSProperties;
    'data-test-id'?: string;
}
