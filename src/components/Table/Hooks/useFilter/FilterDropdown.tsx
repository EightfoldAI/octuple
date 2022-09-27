import React, { useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../../../shared/utilities';
import { isEqual } from '@ngard/tiny-isequal';
import {
    ButtonSize,
    DefaultButton,
    NeutralButton,
    PrimaryButton,
} from '../../../Button';
import { Menu } from '../../../Menu';
import type { MenuProps } from '../../../Menu';
import Tree from '../../../Tree';
import type { DataNode, EventDataNode } from '../../../Tree';
import { RadioButton } from '../../../RadioButton';
import { CheckBox } from '../../../CheckBox';
import { Dropdown } from '../../../Dropdown';
import { Empty } from '../../../Empty';
import type {
    ColumnType,
    ColumnFilterItem,
    Key,
    GetPopupContainer,
    FilterSearchType,
} from '../../Table.types';
import FilterDropdownMenuWrapper from './FilterWrapper';
import FilterSearch from './FilterSearch';
import type { FilterState } from './index';
import { flattenKeys } from './index';
import { useSyncState } from '../../../../hooks/useSyncState';
import { IconName, IconSize } from '../../../Icon';
import { useCanvasDirection } from '../../../../hooks/useCanvasDirection';

import styles from '../../Styles/table.module.scss';

interface FilterRestProps {
    confirm?: Boolean;
    closeDropdown?: Boolean;
}

function hasSubMenu(filters: ColumnFilterItem[]) {
    return filters.some(({ children }) => children);
}

function searchValueMatched(searchValue: string, text: React.ReactNode) {
    if (typeof text === 'string' || typeof text === 'number') {
        return text
            ?.toString()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase());
    }
    return false;
}

function renderFilterItems({
    filters,
    filteredKeys,
    filterMultiple,
    searchValue,
    filterSearch,
}: {
    filters: ColumnFilterItem[];
    filteredKeys: Key[];
    filterMultiple: boolean;
    searchValue: string;
    filterSearch: FilterSearchType;
}): Required<MenuProps>['items'] {
    return filters.map((filter, index: number) => {
        const key = String(filter.value);

        if (filter.children) {
            return {
                key: key || index,
                value: filter.text,
                popupClassName: styles.tableFilterDropdownSubmenu,
                children: renderFilterItems({
                    filters: filter.children,
                    filteredKeys,
                    filterMultiple,
                    searchValue,
                    filterSearch,
                }),
            };
        }

        const Component = filterMultiple ? CheckBox : RadioButton;

        const item = {
            key: filter.value !== undefined ? key : index,
            value: (
                <>
                    <Component checked={filteredKeys.includes(key)} />
                    <span>{filter.text}</span>
                </>
            ),
        };
        if (searchValue.trim()) {
            if (typeof filterSearch === 'function') {
                return filterSearch(searchValue, filter) ? item : null;
            }
            return searchValueMatched(searchValue, filter.text) ? item : null;
        }
        return item;
    });
}

export interface FilterDropdownProps<RecordType> {
    column: ColumnType<RecordType>;
    filterCheckallText: string;
    filterConfirmText: string;
    filterEmptyText: string;
    filterResetText: string;
    filterState?: FilterState<RecordType>;
    filterMultiple: boolean;
    filterMode?: 'menu' | 'tree';
    filterSearch?: FilterSearchType;
    filterSearchPlaceholderText: string;
    columnKey: Key;
    children: React.ReactNode;
    triggerFilter: (filterState: FilterState<RecordType>) => void;
    getPopupContainer?: GetPopupContainer;
    filterResetToDefaultFilteredValue?: boolean;
}

function FilterDropdown<RecordType>(props: FilterDropdownProps<RecordType>) {
    const {
        column,
        columnKey,
        filterCheckallText = 'Select all items',
        filterConfirmText = 'OK',
        filterEmptyText = 'No filters',
        filterResetText = 'Reset',
        filterMultiple,
        filterMode = 'menu',
        filterSearch = false,
        filterSearchPlaceholderText = 'Search in filters',
        filterState,
        triggerFilter,
        children,
        getPopupContainer,
    } = props;

    const {
        filterDropdownVisible,
        onFilterDropdownVisibleChange,
        filterResetToDefaultFilteredValue,
        defaultFilteredValue,
    } = column;
    const [visible, setVisible] = useState(false);

    const filtered: boolean = !!(
        filterState &&
        (filterState.filteredKeys?.length || filterState.forceFiltered)
    );
    const triggerVisible = (newVisible: boolean) => {
        setVisible(newVisible);
        onFilterDropdownVisibleChange?.(newVisible);
    };

    const mergedVisible =
        typeof filterDropdownVisible === 'boolean'
            ? filterDropdownVisible
            : visible;

    // ===================== Select Keys =====================
    const propFilteredKeys = filterState?.filteredKeys;
    const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(
        propFilteredKeys || []
    );

    const onSelectKeys = ({ selectedKeys }: { selectedKeys: Key[] }) => {
        setFilteredKeysSync(selectedKeys);
    };

    const onCheck = (
        keys: Key[],
        { node, checked }: { node: EventDataNode<DataNode>; checked: boolean }
    ) => {
        if (!filterMultiple) {
            onSelectKeys({
                selectedKeys: checked && node.key ? [node.key] : [],
            });
        } else {
            onSelectKeys({ selectedKeys: keys as Key[] });
        }
    };

    useEffect(() => {
        if (!visible) {
            return;
        }
        onSelectKeys({ selectedKeys: propFilteredKeys || [] });
    }, [propFilteredKeys]);

    // ====================== Open Keys ======================
    // const [openKeys, setOpenKeys] = React.useState<string[]>([]);
    const openRef = useRef<number>();
    // const onOpenChange = (keys: string[]) => {
    //   openRef.current = window.setTimeout(() => {
    //     setOpenKeys(keys);
    //   });
    // };
    const onMenuClick = () => {
        window.clearTimeout(openRef.current);
    };
    useEffect(
        () => () => {
            window.clearTimeout(openRef.current);
        },
        []
    );

    // search in tree mode column filter
    const [searchValue, setSearchValue] = useState('');
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchValue(value);
    };
    // clear search value after close filter dropdown
    useEffect(() => {
        if (!visible) {
            setSearchValue('');
        }
    }, [visible]);

    // ======================= Submit ========================
    const internalTriggerFilter = (keys: Key[] | undefined | null): any => {
        const mergedKeys = keys && keys.length ? keys : null;
        if (
            mergedKeys === null &&
            (!filterState || !filterState.filteredKeys)
        ) {
            return null;
        }

        if (isEqual(mergedKeys, filterState?.filteredKeys)) {
            return null;
        }

        triggerFilter({
            column,
            key: columnKey,
            filteredKeys: mergedKeys,
        });
    };

    const onConfirm = () => {
        triggerVisible(false);
        internalTriggerFilter(getFilteredKeysSync());
    };

    const onReset = (
        { confirm, closeDropdown }: FilterRestProps = {
            confirm: false,
            closeDropdown: false,
        }
    ) => {
        if (confirm) {
            internalTriggerFilter([]);
        }
        if (closeDropdown) {
            triggerVisible(false);
        }

        setSearchValue('');

        if (filterResetToDefaultFilteredValue) {
            setFilteredKeysSync(
                (defaultFilteredValue || []).map((key) => String(key))
            );
        } else {
            setFilteredKeysSync([]);
        }
    };

    const doFilter = ({ closeDropdown } = { closeDropdown: true }) => {
        if (closeDropdown) {
            triggerVisible(false);
        }
        internalTriggerFilter(getFilteredKeysSync());
    };

    const onVisibleChange = (newVisible: boolean) => {
        if (newVisible && propFilteredKeys !== undefined) {
            // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefiend)
            setFilteredKeysSync(propFilteredKeys || []);
        }

        triggerVisible(newVisible);

        // Default will filter when closed
        if (!newVisible && !column.filterDropdown) {
            onConfirm();
        }
    };

    // ======================== Style ========================
    const dropdownMenuClass: string = mergeClasses([
        { ['table-menu-without-submenu']: !hasSubMenu(column.filters || []) },
    ]);

    const onCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allFilterKeys = flattenKeys(column?.filters).map((key) =>
                String(key)
            );
            setFilteredKeysSync(allFilterKeys);
        } else {
            setFilteredKeysSync([]);
        }
    };

    const getTreeData = ({ filters }: { filters?: ColumnFilterItem[] }) =>
        (filters || []).map((filter, index) => {
            const key = String(filter.value);
            const item: DataNode = {
                title: filter.text,
                key: filter.value !== undefined ? key : index,
            };
            if (filter.children) {
                item.children = getTreeData({ filters: filter.children });
            }
            return item;
        });

    let dropdownContent: React.ReactNode;
    if (typeof column.filterDropdown === 'function') {
        dropdownContent = column.filterDropdown({
            setSelectedKeys: (selectedKeys: Key[]) =>
                onSelectKeys({ selectedKeys }),
            selectedKeys: getFilteredKeysSync(),
            confirm: doFilter,
            clearFilters: onReset,
            filters: column.filters,
            visible: mergedVisible,
        });
    } else if (column.filterDropdown) {
        dropdownContent = column.filterDropdown;
    } else {
        const selectedKeys = (getFilteredKeysSync() || []) as any;
        const getFilterComponent = () => {
            if ((column.filters || []).length === 0) {
                return (
                    <Empty
                        description={filterEmptyText}
                        imageStyle={{
                            height: 24,
                        }}
                        style={{
                            margin: 0,
                            padding: '16px 0',
                        }}
                    />
                );
            }
            if (filterMode === 'tree') {
                return (
                    <>
                        <FilterSearch
                            filterSearch={filterSearch}
                            filterSearchPlaceholderText={
                                filterSearchPlaceholderText
                            }
                            onChange={onSearch}
                        />
                        <div className={styles.tableFilterDropdownTree}>
                            {filterMultiple ? (
                                <CheckBox
                                    checked={
                                        selectedKeys.length ===
                                        flattenKeys(column.filters).length
                                    }
                                    classNames={
                                        styles.tableFilterDropdownCheckall
                                    }
                                    id={'filterCheckBox'}
                                    onChange={onCheckAll}
                                    label={filterCheckallText}
                                />
                            ) : null}
                            <Tree
                                checkable
                                selectable={false}
                                blockNode
                                multiple={filterMultiple}
                                checkStrictly={!filterMultiple}
                                classNames={'table-menu'}
                                onCheck={onCheck}
                                checkedKeys={selectedKeys}
                                selectedKeys={selectedKeys}
                                showIcon={false}
                                treeData={getTreeData({
                                    filters: column.filters,
                                })}
                                autoExpandParent
                                defaultExpandAll
                                filterTreeNode={
                                    searchValue.trim()
                                        ? (node: EventDataNode<DataNode>) =>
                                              searchValueMatched(
                                                  searchValue,
                                                  node.title
                                              )
                                        : undefined
                                }
                            />
                        </div>
                    </>
                );
            }
            return (
                <>
                    <FilterSearch
                        filterSearch={filterSearch}
                        filterSearchPlaceholderText={
                            filterSearchPlaceholderText
                        }
                        onChange={onSearch}
                    />
                    <Menu
                        classNames={dropdownMenuClass}
                        onClick={onMenuClick}
                        onSelect={() => onSelectKeys}
                        items={renderFilterItems({
                            filters: column.filters || [],
                            filterSearch,
                            filteredKeys: getFilteredKeysSync(),
                            filterMultiple,
                            searchValue,
                        })}
                    />
                </>
            );
        };

        const getResetDisabled = () => {
            if (filterResetToDefaultFilteredValue) {
                return isEqual(
                    (defaultFilteredValue || []).map((key) => String(key)),
                    selectedKeys
                );
            }

            return selectedKeys.length === 0;
        };

        dropdownContent = (
            <>
                {getFilterComponent()}
                <div className={styles.tableFilterDropdownBtns}>
                    <DefaultButton
                        disabled={getResetDisabled()}
                        onClick={() => onReset()}
                        size={ButtonSize.Small}
                        text={filterResetText}
                    />
                    <PrimaryButton
                        onClick={onConfirm}
                        size={ButtonSize.Small}
                        text={filterConfirmText}
                    />
                </div>
            </>
        );
    }

    const htmlDir: string = useCanvasDirection();

    const menu = (
        <FilterDropdownMenuWrapper
            classNames={mergeClasses([
                styles.tableFilterDropdown,
                { [styles.tableFilterDropdownRtl]: htmlDir === 'rtl' },
            ])}
        >
            {dropdownContent}
        </FilterDropdownMenuWrapper>
    );

    return (
        <div className={styles.tableFilterColumn}>
            <span className={styles.tableColumnTitle}>{children}</span>
            <Dropdown
                overlay={menu}
                trigger="click"
                onVisibleChange={onVisibleChange}
                placement={htmlDir === 'rtl' ? 'bottom-end' : 'bottom-start'}
                portal
                positionStrategy="absolute"
            >
                <NeutralButton
                    className={mergeClasses([
                        styles.tableFilterTrigger,
                        { [styles.active]: filtered },
                    ])}
                    iconProps={{
                        path: IconName.mdiFilter,
                        size: IconSize.Small,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    size={ButtonSize.Small}
                />
            </Dropdown>
        </div>
    );
}

export default FilterDropdown;
