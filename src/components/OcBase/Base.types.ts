import React from 'react';
export type OcBaseProps<T> = {
    /**
     * Custom classnames of the component
     */
    classNames?: string;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;

    ref?: React.Ref<T>;
};
