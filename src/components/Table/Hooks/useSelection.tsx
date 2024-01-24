import React, { useEffect, useRef } from 'react';
import { useState, useCallback, useMemo } from 'react';
import { convertDataToEntities } from '../../Tree/Internal/utils/treeUtil';
import { conductCheck } from '../../Tree/Internal/utils/conductUtil';
import { arrAdd, arrDel } from '../../Tree/Internal/util';
import type {
  DataNode,
  GetCheckDisabled,
} from '../../Tree/Internal/OcTree.types';
import { INTERNAL_COL_DEFINE } from '../Internal';
import type { FixedType } from '../Internal/OcTable.types';
import { useMergedState } from '../../../hooks/useMergedState';
import { RadioButton } from '../../RadioButton';
import { CheckBox, CheckboxProps } from '../../CheckBox';
import { Dropdown } from '../../Dropdown';
import { Icon, IconName, IconSize } from '../../Icon';
import { Menu } from '../../Menu';
import type {
  TableRowSelection,
  Key,
  ColumnsType,
  ColumnType,
  GetRowKey,
  SelectionItem,
  TransformColumns,
  ExpandType,
  GetPopupContainer,
} from '../Table.types';

import styles from '../Styles/table.module.scss';

export const SELECTION_COLUMN = {} as const;
export const SELECTION_ALL = 'SELECT_ALL' as const;
export const SELECTION_INVERT = 'SELECT_INVERT' as const;
export const SELECTION_NONE = 'SELECT_NONE' as const;

const EMPTY_LIST: React.Key[] = [];

interface UseSelectionConfig<RecordType> {
  pageData: RecordType[];
  data: RecordType[];
  getRowKey: GetRowKey<RecordType>;
  getRecordByKey: (key: Key) => RecordType;
  expandType: ExpandType;
  childrenColumnName: string;
  emptyText: React.ReactNode | (() => React.ReactNode);
  emptyTextDetails?: string;
  selectAllRowsText?: string;
  selectionAllText: string;
  selectInvertText: string;
  selectNoneText: string;
  selectRowText?: string;
  getPopupContainer?: GetPopupContainer;
}

export type INTERNAL_SELECTION_ITEM =
  | SelectionItem
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT
  | typeof SELECTION_NONE;

function flattenData<RecordType>(
  data: RecordType[] | undefined,
  childrenColumnName: string
): RecordType[] {
  let list: RecordType[] = [];
  (data || []).forEach((record) => {
    list.push(record);

    if (record && typeof record === 'object' && childrenColumnName in record) {
      list = [
        ...list,
        ...flattenData<RecordType>(
          (record as any)[childrenColumnName],
          childrenColumnName
        ),
      ];
    }
  });

  return list;
}

export default function useSelection<RecordType>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>
): [TransformColumns<RecordType>, Set<Key>] {
  const {
    preserveSelectedRowKeys,
    selectedRowKeys,
    defaultSelectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    columnWidth: selectionColWidth,
    type: selectionType,
    selections,
    fixed,
    renderCell: customizeRenderCell,
    hideSelectAll,
    checkStrictly = true,
  } = rowSelection || {};

  const {
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
    selectAllRowsText,
    selectionAllText,
    selectInvertText,
    selectNoneText,
    selectRowText,
    getPopupContainer,
  } = config;

  // ========================= Keys =========================
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(
    selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST,
    {
      value: selectedRowKeys,
    }
  );

  // ======================== Caches ========================
  const preserveRecordsRef = useRef(new Map<Key, RecordType>());

  const updatePreserveRecordsCache = useCallback(
    (keys: Key[]) => {
      if (preserveSelectedRowKeys) {
        const newCache = new Map<Key, RecordType>();
        // Keep key if mark as preserveSelectedRowKeys
        keys.forEach((key) => {
          let record = getRecordByKey(key);

          if (!record && preserveRecordsRef.current.has(key)) {
            record = preserveRecordsRef.current.get(key)!;
          }

          newCache.set(key, record);
        });
        // Refresh to new cache
        preserveRecordsRef.current = newCache;
      }
    },
    [getRecordByKey, preserveSelectedRowKeys]
  );

  // Update cache with selectedKeys
  useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys);
  }, [mergedSelectedKeys]);

  const { keyEntities } = useMemo(
    () =>
      checkStrictly
        ? { keyEntities: null }
        : convertDataToEntities(data as unknown as DataNode[], {
            externalGetKey: getRowKey as any,
            childrenPropName: childrenColumnName,
          }),
    [data, getRowKey, checkStrictly, childrenColumnName]
  );

  // Get flatten data
  const flattedData = useMemo(
    () => flattenData(pageData, childrenColumnName),
    [pageData, childrenColumnName]
  );

  // Get all checkbox props
  const checkboxPropsMap = useMemo(() => {
    const map = new Map<Key, Partial<CheckboxProps>>();
    flattedData.forEach((record, index) => {
      const key = getRowKey(record, index);
      const checkboxProps =
        (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);
    });
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);

  const isCheckboxDisabled: GetCheckDisabled<RecordType> = useCallback(
    (r: RecordType) => !!checkboxPropsMap.get(getRowKey(r))?.disabled,
    [checkboxPropsMap, getRowKey]
  );

  const [derivedSelectedKeys, derivedHalfSelectedKeys] = useMemo(() => {
    if (checkStrictly) {
      return [mergedSelectedKeys || [], []];
    }
    const { checkedKeys, halfCheckedKeys } = conductCheck(
      mergedSelectedKeys,
      true,
      keyEntities as any,
      isCheckboxDisabled as any
    );
    return [checkedKeys || [], halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]);

  const derivedSelectedKeySet: Set<Key> = useMemo(() => {
    const keys =
      selectionType === 'radio'
        ? derivedSelectedKeys.slice(0, 1)
        : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  const derivedHalfSelectedKeySet = useMemo(
    () =>
      selectionType === 'radio' ? new Set() : new Set(derivedHalfSelectedKeys),
    [derivedHalfSelectedKeys, selectionType]
  );

  // Save last selected key to enable range selection
  const [lastSelectedKey, setLastSelectedKey] = useState<Key | null>(null);

  // Reset if rowSelection reset
  useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys(EMPTY_LIST);
    }
  }, [!!rowSelection]);

  const setSelectedKeys = useCallback(
    (keys: Key[]) => {
      let availableKeys: Key[];
      let records: RecordType[];

      updatePreserveRecordsCache(keys);

      if (preserveSelectedRowKeys) {
        availableKeys = keys;
        records = keys.map((key) => preserveRecordsRef.current.get(key)!);
      } else {
        // Filter key which not exist in the `dataSource`
        availableKeys = [];
        records = [];

        keys.forEach((key) => {
          const record = getRecordByKey(key);
          if (record !== undefined) {
            availableKeys.push(key);
            records.push(record);
          }
        });
      }

      setMergedSelectedKeys(availableKeys);

      onSelectionChange?.(availableKeys, records);
    },
    [
      setMergedSelectedKeys,
      getRecordByKey,
      onSelectionChange,
      preserveSelectedRowKeys,
    ]
  );

  // ====================== Selections ======================
  // Trigger single `onSelect` event
  const triggerSingleSelection = useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map((k) => getRecordByKey(k));
        onSelect(getRecordByKey(key), selected, rows, event);
      }

      setSelectedKeys(keys);
    },
    [onSelect, getRecordByKey, setSelectedKeys]
  );

  const mergedSelections = useMemo<SelectionItem[] | null>((): any => {
    if (!selections || hideSelectAll) {
      return null;
    }

    const selectionList: INTERNAL_SELECTION_ITEM[] =
      selections === true
        ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE]
        : selections;

    return selectionList.map((selection: INTERNAL_SELECTION_ITEM) => {
      if (selection === SELECTION_ALL) {
        return {
          key: 'all',
          value: selectionAllText,
          onSelect() {
            setSelectedKeys(
              data
                .map((record, index) => getRowKey(record, index))
                .filter((key) => {
                  const checkProps = checkboxPropsMap.get(key);
                  return (
                    !checkProps?.disabled || derivedSelectedKeySet.has(key)
                  );
                })
            );
          },
        };
      }
      if (selection === SELECTION_INVERT) {
        return {
          key: 'invert',
          value: selectInvertText,
          onSelect() {
            const keySet = new Set(derivedSelectedKeySet);
            pageData.forEach((record, index) => {
              const key = getRowKey(record, index);
              const checkProps = checkboxPropsMap.get(key);

              if (!checkProps?.disabled) {
                if (keySet.has(key)) {
                  keySet.delete(key);
                } else {
                  keySet.add(key);
                }
              }
            });

            const keys = Array.from(keySet);
            setSelectedKeys(keys);
          },
        };
      }
      if (selection === SELECTION_NONE) {
        return {
          key: 'none',
          value: selectNoneText,
          onSelect() {
            setSelectedKeys(
              Array.from(derivedSelectedKeySet).filter((key) => {
                const checkProps = checkboxPropsMap.get(key);
                return checkProps?.disabled;
              })
            );
          },
        };
      }
      return selection as SelectionItem;
    });
  }, [selections, derivedSelectedKeySet, pageData, getRowKey, setSelectedKeys]);

  // ======================= Columns ========================
  const transformColumns = useCallback(
    (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      // >>>>>>>>>>> Skip if `rowSelection` does not exist
      if (!rowSelection) {
        return columns.filter((col) => col !== SELECTION_COLUMN);
      }

      // >>>>>>>>>>> Support selection
      let cloneColumns = [...columns];
      const keySet = new Set(derivedSelectedKeySet);

      // Record key only needs to be checked with enabled
      const recordKeys = flattedData
        .map(getRowKey)
        .filter((key) => !checkboxPropsMap.get(key)!.disabled);
      const checkedCurrentAll: boolean = recordKeys.every((key) =>
        keySet.has(key)
      );
      const checkedCount: number = recordKeys.filter((key) =>
        keySet.has(key)
      ).length;
      const checkedCurrentSome: boolean =
        checkedCount > 0 && checkedCount < recordKeys.length;

      const onSelectAllChange = () => {
        const changeKeys: Key[] = [];

        if (checkedCurrentAll) {
          recordKeys.forEach((key) => {
            keySet.delete(key);
            changeKeys.push(key);
          });
        } else {
          recordKeys.forEach((key) => {
            if (!keySet.has(key)) {
              keySet.add(key);
              changeKeys.push(key);
            }
          });
        }

        const keys = Array.from(keySet);
        setSelectedKeys(keys);
      };

      // ===================== Render =====================
      // Title Cell
      let title: React.ReactNode;
      if (selectionType !== 'radio') {
        let customizeSelections: React.ReactNode;
        if (mergedSelections) {
          const menu = (
            <Menu
              items={mergedSelections.map((selection, index) => {
                const { key, text, onSelect: onSelectionClick } = selection;

                return {
                  key: key || index,
                  onClick: () => {
                    onSelectionClick?.(recordKeys);
                  },
                  value: text,
                };
              })}
            />
          );
          customizeSelections = (
            <div className={styles.tableSelectionExtra}>
              <Dropdown overlay={menu}>
                <span>
                  <Icon path={IconName.mdiArrowDown} size={IconSize.Small} />
                </span>
              </Dropdown>
            </div>
          );
        }

        const allDisabledData = flattedData
          .map((record, index) => {
            const key: React.Key = getRowKey(record, index);
            const checkboxProps: Partial<CheckboxProps> =
              checkboxPropsMap.get(key) || {};
            return { checked: keySet.has(key), ...checkboxProps };
          })
          .filter(({ disabled }) => disabled);

        const allDisabled =
          !!allDisabledData.length &&
          allDisabledData.length === flattedData.length;

        const allDisabledAndChecked =
          allDisabled && allDisabledData.every(({ checked }) => checked);

        title = !hideSelectAll && (
          <div className={styles.tableSelectionColumn}>
            <CheckBox
              ariaLabel={selectAllRowsText}
              checked={
                !allDisabled
                  ? !!flattedData.length && checkedCurrentAll
                  : allDisabledAndChecked
              }
              indeterminate={
                !allDisabled
                  ? !!flattedData.length && checkedCurrentSome
                  : false
              }
              classNames={styles.selectionCheckbox}
              id="selectAllCheckBox"
              label={selectAllRowsText}
              onChange={onSelectAllChange}
              disabled={flattedData.length === 0 || allDisabled}
            />
            {customizeSelections}
          </div>
        );
      }

      // Body Cell
      let renderCell: (
        _: RecordType,
        record: RecordType,
        index: number
      ) => { node: React.ReactNode; checked: boolean };
      if (selectionType === 'radio') {
        renderCell = (_, record, index) => {
          const key: React.Key = getRowKey(record, index);
          const checked: boolean = keySet.has(key);

          return {
            node: (
              <RadioButton
                ariaLabel={selectRowText}
                label={selectRowText}
                {...checkboxPropsMap.get(key)}
                checked={checked}
                classNames={styles.selectionRadiobutton}
                id={`selectRadioButton-${key}`}
                name="oc-table-radio-group"
                onChange={(event) => {
                  if (!keySet.has(key)) {
                    triggerSingleSelection(key, true, [key], event.nativeEvent);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ),
            checked,
          };
        };
      } else {
        renderCell = (_, record, index) => {
          const key: React.Key = getRowKey(record, index);
          const checked: boolean = keySet.has(key);
          const checkboxProps: Partial<CheckboxProps> =
            checkboxPropsMap.get(key);

          // Record checked
          return {
            node: (
              <CheckBox
                ariaLabel={selectRowText}
                label={selectRowText}
                {...checkboxProps}
                checked={checked}
                classNames={styles.selectionCheckbox}
                id={`selectCheckBox-${key}`}
                onClick={(e) => e.stopPropagation()}
                onChange={(nativeEvent: any) => {
                  const { shiftKey } = nativeEvent;

                  let startIndex: number = -1;
                  let endIndex: number = -1;

                  // Get range of this
                  if (shiftKey && checkStrictly) {
                    const pointKeys = new Set([lastSelectedKey, key]);

                    recordKeys.some((recordKey, recordIndex) => {
                      if (pointKeys.has(recordKey)) {
                        if (startIndex === -1) {
                          startIndex = recordIndex;
                        } else {
                          endIndex = recordIndex;
                          return true;
                        }
                      }

                      return false;
                    });
                  }

                  if (
                    endIndex !== -1 &&
                    startIndex !== endIndex &&
                    checkStrictly
                  ) {
                    // Batch update selections
                    const rangeKeys = recordKeys.slice(
                      startIndex,
                      endIndex + 1
                    );
                    const changedKeys: Key[] = [];

                    if (checked) {
                      rangeKeys.forEach((recordKey) => {
                        if (keySet.has(recordKey)) {
                          changedKeys.push(recordKey);
                          keySet.delete(recordKey);
                        }
                      });
                    } else {
                      rangeKeys.forEach((recordKey) => {
                        if (!keySet.has(recordKey)) {
                          changedKeys.push(recordKey);
                          keySet.add(recordKey);
                        }
                      });
                    }

                    const keys = Array.from(keySet);
                    setSelectedKeys(keys);
                  } else {
                    // Single record selected
                    const originCheckedKeys = derivedSelectedKeys;
                    if (checkStrictly) {
                      const checkedKeys = checked
                        ? arrDel(originCheckedKeys, key)
                        : arrAdd(originCheckedKeys, key);
                      triggerSingleSelection(
                        key,
                        !checked,
                        checkedKeys,
                        nativeEvent
                      );
                    } else {
                      // Always fill first
                      const result = conductCheck(
                        [...originCheckedKeys, key],
                        true,
                        keyEntities as any,
                        isCheckboxDisabled as any
                      );
                      const { checkedKeys, halfCheckedKeys } = result;
                      let nextCheckedKeys = checkedKeys;

                      // If remove, we do it again to correction
                      if (checked) {
                        const tempKeySet = new Set(checkedKeys);
                        tempKeySet.delete(key);
                        nextCheckedKeys = conductCheck(
                          Array.from(tempKeySet),
                          {
                            checked: false,
                            halfCheckedKeys,
                          },
                          keyEntities as any,
                          isCheckboxDisabled as any
                        ).checkedKeys;
                      }

                      triggerSingleSelection(
                        key,
                        !checked,
                        nextCheckedKeys,
                        nativeEvent
                      );
                    }
                  }

                  setLastSelectedKey(key);
                }}
              />
            ),
            checked,
          };
        };
      }

      const renderSelectionCell = (
        _: any,
        record: RecordType,
        index: number
      ) => {
        const { node, checked } = renderCell(_, record, index);

        if (customizeRenderCell) {
          return customizeRenderCell(checked, record, index, node);
        }

        return node;
      };

      // Insert selection column if none exist
      if (!cloneColumns.includes(SELECTION_COLUMN)) {
        // Always after expand icon
        if (
          cloneColumns.findIndex(
            (col: any) =>
              col[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN'
          ) === 0
        ) {
          const [expandColumn, ...restColumns] = cloneColumns;
          cloneColumns = [expandColumn, SELECTION_COLUMN, ...restColumns];
        } else {
          // Normal insert at first column
          cloneColumns = [SELECTION_COLUMN, ...cloneColumns];
        }
      }

      // Deduplicate selection column
      const selectionColumnIndex = cloneColumns.indexOf(SELECTION_COLUMN);

      cloneColumns = cloneColumns.filter(
        (column, index) =>
          column !== SELECTION_COLUMN || index === selectionColumnIndex
      );

      // Fixed column logic
      const prevCol: ColumnType<RecordType> & Record<string, any> =
        cloneColumns[selectionColumnIndex - 1];
      const nextCol: ColumnType<RecordType> & Record<string, any> =
        cloneColumns[selectionColumnIndex + 1];

      let mergedFixed: FixedType | undefined = fixed;

      if (mergedFixed === undefined) {
        if (nextCol?.fixed !== undefined) {
          mergedFixed = nextCol.fixed;
        } else if (prevCol?.fixed !== undefined) {
          mergedFixed = prevCol.fixed;
        }
      }

      if (
        mergedFixed &&
        prevCol &&
        prevCol[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN' &&
        prevCol.fixed === undefined
      ) {
        prevCol.fixed = mergedFixed;
      }

      // Replace with real selection column
      const selectionColumn = {
        fixed: mergedFixed,
        width: selectionColWidth,
        className: styles.tableSelectionColumn,
        title: rowSelection.columnTitle || title,
        render: renderSelectionCell,
        [INTERNAL_COL_DEFINE]: {
          className: styles.tableSelectionCol,
        },
      };

      return cloneColumns.map((col) =>
        col === SELECTION_COLUMN ? selectionColumn : col
      );
    },
    [
      getRowKey,
      flattedData,
      rowSelection,
      derivedSelectedKeys,
      derivedSelectedKeySet,
      derivedHalfSelectedKeySet,
      selectionColWidth,
      mergedSelections,
      expandType,
      lastSelectedKey,
      checkboxPropsMap,
      triggerSingleSelection,
      isCheckboxDisabled,
    ]
  );

  return [transformColumns, derivedSelectedKeySet];
}
