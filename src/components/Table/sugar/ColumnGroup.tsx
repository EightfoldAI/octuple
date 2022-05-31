import { ReactElement } from 'react';
import type { ColumnProps } from './Column';
import type { ColumnType } from '../Table.types';

export interface ColumnGroupProps<RecordType>
    extends Omit<ColumnType<RecordType>, 'children'> {
    children:
        | ReactElement<ColumnProps<RecordType>>
        | readonly ReactElement<ColumnProps<RecordType>>[];
}

/**
 * This is a syntactic sugar for `columns` prop.
 * So HOC will not work on this.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ColumnGroup<RecordType>(_: ColumnGroupProps<RecordType>): any {
    return null;
}

export default ColumnGroup;
