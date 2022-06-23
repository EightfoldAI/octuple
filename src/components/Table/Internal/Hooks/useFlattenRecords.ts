import { useMemo } from 'react';
import type { GetRowKey, Key } from '../OcTable.types';

// recursion (flat tree structure)
function flatRecord<T>(
    record: T,
    indent: number,
    childrenColumnName: string,
    expandedKeys: Set<Key>,
    getRowKey: GetRowKey<T>,
    index: number
): any {
    const arr = [];

    arr.push({
        record,
        indent,
        index,
    });

    const key = getRowKey(record);

    const expanded = expandedKeys?.has(key);

    if (
        record &&
        Array.isArray((record as any)[childrenColumnName]) &&
        expanded
    ) {
        // expanded state, flat record
        for (
            let i = 0;
            i < (record as any)[childrenColumnName].length;
            i += 1
        ) {
            const tempArr = flatRecord(
                (record as any)[childrenColumnName][i],
                indent + 1,
                childrenColumnName,
                expandedKeys,
                getRowKey,
                i
            );

            arr.push(...tempArr);
        }
    }

    return arr;
}

/**
 * flat tree data on expanded state
 *
 * @export
 * @template T
 * @param {*} data : table data
 * @param {string} childrenColumnName
 * @param {Set<Key>} expandedKeys
 * @param {GetRowKey<T>} getRowKey
 * @returns flattened data
 */
export default function useFlattenRecords<T>(
    data: any,
    childrenColumnName: string,
    expandedKeys: Set<Key>,
    getRowKey: GetRowKey<T>
) {
    const arr: { record: T; indent: number; index: number }[] = useMemo(() => {
        if (expandedKeys?.size) {
            const temp: { record: T; indent: number; index: number }[] = [];

            // collect flattened record
            for (let i = 0; i < data?.length; i += 1) {
                const record = data[i];

                temp.push(
                    ...flatRecord<T>(
                        record,
                        0,
                        childrenColumnName,
                        expandedKeys,
                        getRowKey,
                        i
                    )
                );
            }

            return temp;
        }

        return data?.map((item: any, index: number) => {
            return {
                record: item,
                indent: 0,
                index,
            };
        });
    }, [data, childrenColumnName, expandedKeys, getRowKey]);

    return arr;
}
