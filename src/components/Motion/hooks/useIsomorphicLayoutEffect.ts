import { useEffect, useLayoutEffect } from 'react';
import { canUseDom } from '../../../shared/utilities';

// It's safe to use `useLayoutEffect` but the warning is annoying
const useIsomorphicLayoutEffect = canUseDom() ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
