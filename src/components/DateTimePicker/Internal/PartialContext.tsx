import React from 'react';
import type { OnSelect, PartialMode } from './OcPicker.types';

export type ContextOperationRefProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
  onClose?: () => void;
};

export type PartialContextProps = {
  operationRef?: React.MutableRefObject<ContextOperationRefProps | null>;
  /** Only work with time partial */
  hideHeader?: boolean;
  partialRef?: React.Ref<HTMLDivElement>;
  hidePrevBtn?: boolean;
  hideNextBtn?: boolean;
  onDateMouseEnter?: (date: any) => void;
  onDateMouseLeave?: (date: any) => void;
  onSelect?: OnSelect<any>;
  hideRanges?: boolean;
  open?: boolean;
  mode?: PartialMode;
  trapFocus?: boolean;
};

const PartialContext = React.createContext<PartialContextProps>({});

export default PartialContext;
