import React from 'react';
import { canUseDom } from '../shared/utilities';

/**
 * Wrap `React.useLayoutEffect` which will not throw warning message in test env
 */
export const useLayoutEffect =
    process.env.NODE_ENV !== 'test' && canUseDom()
        ? React.useLayoutEffect
        : React.useEffect;
