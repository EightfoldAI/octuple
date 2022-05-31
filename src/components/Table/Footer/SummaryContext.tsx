import { createContext } from 'react';
import type { StickyOffsets } from '../Table.types';
import { FlattenColumns } from './Footer.types';

const SummaryContext = createContext<{
    stickyOffsets?: StickyOffsets;
    scrollColumnIndex?: number;
    flattenColumns?: FlattenColumns<any>;
}>({});

export default SummaryContext;
