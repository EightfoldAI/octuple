import { useRef } from 'react';
import type { Key, GetRowKey } from '../Table.types';

interface MapCache<RecordType> {
  data?: readonly RecordType[];
  childrenColumnName?: string;
  kvMap?: Map<Key, RecordType>;
  getRowKey?: Function;
}

export default function useLazyKVMap<RecordType>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>
) {
  const mapCacheRef = useRef<MapCache<RecordType>>({});

  function dig(
    records: readonly RecordType[],
    kvMap?: Map<Key, RecordType>
  ): void {
    records.forEach((record, index) => {
      const rowKey = getRowKey(record, index);
      kvMap?.set(rowKey, record);

      if (
        record &&
        typeof record === 'object' &&
        childrenColumnName in record
      ) {
        dig((record as any)[childrenColumnName] || []);
      }
    });
  }

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>();

      dig(data, kvMap);

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap!.get(key)!;
  }

  return [getRecordByKey];
}
