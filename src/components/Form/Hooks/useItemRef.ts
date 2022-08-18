import React from 'react';
import { composeRef } from '../../../shared/utilities';
import { FormContext } from '../Context';
import type { InternalOcNamePath } from '../Form.types';

export default function useItemRef() {
    const { itemRef } = React.useContext(FormContext);
    const cacheRef = React.useRef<{
        name?: string;
        originRef?: React.Ref<any>;
        ref?: React.Ref<any>;
    }>({});

    function getRef(name: InternalOcNamePath, children: any) {
        const childrenRef: React.Ref<React.ReactElement> =
            children && typeof children === 'object' && children.ref;
        const nameStr = name.join('_');
        if (
            cacheRef.current.name !== nameStr ||
            cacheRef.current.originRef !== childrenRef
        ) {
            cacheRef.current.name = nameStr;
            cacheRef.current.originRef = childrenRef;
            cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
        }

        return cacheRef.current.ref;
    }

    return getRef;
}
