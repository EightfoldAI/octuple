import React from 'react';
import type { PartialMode } from '../OcPicker.types';

import styles from '../ocpicker.module.scss';

export const getExtraFooter = (
    mode: PartialMode,
    renderExtraFooter?: (mode: PartialMode) => React.ReactNode
) => {
    if (!renderExtraFooter) {
        return null;
    }

    return renderExtraFooter(mode);
};
