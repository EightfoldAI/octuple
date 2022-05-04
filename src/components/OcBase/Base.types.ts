import React, { HTMLAttributes } from 'react';

export interface OcBaseProps<T> extends HTMLAttributes<T> {
    classNames?: string;
    'data-test-id'?: string;
}
