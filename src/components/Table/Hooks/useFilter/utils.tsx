import type {
  ColumnType,
  Key,
  FilterValue,
  FilterKey,
  ColumnFilterItem,
} from '../../Table.types';

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  filteredKeys?: FilterKey;
  forceFiltered?: boolean;
}

export function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: FilterValue = [];
  (filters || []).forEach(({ value, children }) => {
    keys.push(value);
    if (children) {
      keys = [...keys, ...flattenKeys(children)];
    }
  });
  return keys;
}
