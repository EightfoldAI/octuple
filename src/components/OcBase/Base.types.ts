import React from 'react';
export interface OcBaseProps<T> {
    /**
     * Custom classnames of the component
     */
    classNames?: string;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;

    ref?: React.Ref<T>;
}
