import type { ColumnType } from './OcTable.types';

export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: null;
}

/**
 * This is a syntactic sugar for `columns` prop.
 * So HOC will not work on this.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Column<RecordType>(_: ColumnProps<RecordType>): any {
  return null;
}

export default Column;
