import React from 'react';
import type { PartialMode } from '../Picker.types';

export const getExtraFooter = (
    mode: PartialMode,
    renderExtraFooter?: (mode: PartialMode) => React.ReactNode
) => {
    if (!renderExtraFooter) {
        return null;
    }

    return (
        <div className={'picker-footer-extra'}>{renderExtraFooter(mode)}</div>
    );
};
