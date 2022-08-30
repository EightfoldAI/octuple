import React, { HTMLAttributes, Ref } from 'react';

export interface OcBaseProps<T> extends HTMLAttributes<T> {
    /**
     * Custom classnames of the component
     */
    classNames?: string;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;
    /**
     * The component ref
     */
    ref?: Ref<T>;
}
