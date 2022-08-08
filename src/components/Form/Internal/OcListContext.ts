import React, { createContext } from 'react';
import type { InternalOcNamePath } from './OcForm.types';

export interface OcListContextProps {
    getKey: (namePath: InternalOcNamePath) => [React.Key, InternalOcNamePath];
}

const OcListContext = createContext<OcListContextProps | null>(null);

export default OcListContext;
