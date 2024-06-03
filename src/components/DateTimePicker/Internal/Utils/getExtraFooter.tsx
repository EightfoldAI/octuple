import React from 'react';
import type { PartialMode } from '../OcPicker.types';

export const getExtraFooter = (
  mode: PartialMode,
  renderExtraFooter?: (mode: PartialMode) => React.ReactNode
) => {
  if (!renderExtraFooter) {
    return null;
  }

  return renderExtraFooter(mode);
};
