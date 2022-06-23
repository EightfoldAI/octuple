import { createContext } from 'react';
import type { GetComponent } from '../OcTable.types';
import type { FixedInfo } from '../Utilities/fixUtil';

export interface TableContextProps {
    getComponent: GetComponent;
    scrollbarSize: number;
    direction: string;
    fixedInfoList: readonly FixedInfo[];
    isSticky: boolean;
}

const TableContext = createContext<TableContextProps>(null);

export default TableContext;
