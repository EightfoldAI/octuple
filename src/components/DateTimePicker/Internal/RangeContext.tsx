import React, { createContext } from 'react';
import type { NullableDateType, RangeValue } from './Picker.types';

export type RangeContextProps = {
    /**
     * Set displayed range value style.
     * Partial only has one value, this is only style effect.
     */
    rangedValue?: [NullableDateType<any>, NullableDateType<any>] | null;
    hoverRangedValue?: RangeValue<any>;
    inRange?: boolean;
    partialPosition?: 'left' | 'right' | false;
};

const RangeContext = createContext<RangeContextProps>({});

export default RangeContext;
