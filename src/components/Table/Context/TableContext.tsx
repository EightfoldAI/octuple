import { createContext } from 'react';
import type { GetComponent } from '../Table.types';
import type { FixedInfo } from '../Utilities/fixUtil';

export interface TableContextProps {
    getComponent: GetComponent;
    scrollbarSize: number;
    direction: 'ltr' | 'rtl';
    fixedInfoList: readonly FixedInfo[];
    isSticky: boolean;
}

const TableContext = createContext<TableContextProps>(null);

export default TableContext;
