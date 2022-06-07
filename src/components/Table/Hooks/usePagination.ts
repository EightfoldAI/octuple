import { useState } from 'react';
import type { PaginationProps } from '../../pagination';
import type { TablePaginationConfig } from '../Table.types';

export const DEFAULT_PAGE_SIZE = 10;

export function getPaginationParam(
    pagination: TablePaginationConfig | boolean | undefined,
    mergedPagination: TablePaginationConfig
) {
    const param: any = {
        currentPage: mergedPagination.currentPage,
        pageSize: mergedPagination.pageSize,
    };
    const paginationObj =
        pagination && typeof pagination === 'object' ? pagination : {};

    Object.keys(paginationObj).forEach((pageProp) => {
        const value = (mergedPagination as any)[pageProp];

        if (typeof value !== 'function') {
            param[pageProp] = value;
        }
    });

    return param;
}

function extendsObject<T extends Object>(...list: T[]) {
    const result: T = {} as T;

    list.forEach((obj) => {
        if (obj) {
            Object.keys(obj).forEach((key) => {
                const val = (obj as any)[key];
                if (val !== undefined) {
                    (result as any)[key] = val;
                }
            });
        }
    });

    return result;
}

export default function usePagination(
    total: number,
    pagination: TablePaginationConfig | false | undefined,
    onChange: (pageSize: number) => void
): [TablePaginationConfig, () => void] {
    const { total: paginationTotal = 0, ...paginationObj } =
        pagination && typeof pagination === 'object' ? pagination : {};

    const [innerPagination, setInnerPagination] = useState<{
        currentPage?: number;
        pageSize?: number;
    }>(() => ({
        currentPage:
            'defaultCurrent' in paginationObj ? paginationObj.currentPage : 1,
        pageSize:
            'defaultPageSize' in paginationObj
                ? paginationObj.pageSize
                : DEFAULT_PAGE_SIZE,
    }));

    // ============ Basic Pagination Config ============
    const mergedPagination = extendsObject<Partial<TablePaginationConfig>>(
        innerPagination,
        paginationObj,
        {
            total: paginationTotal > 0 ? paginationTotal : total,
        }
    );

    // Reset `current` if data length or pageSize changed
    const maxPage = Math.ceil(
        (paginationTotal || total) / mergedPagination.pageSize!
    );
    if (mergedPagination.currentPage! > maxPage) {
        // Prevent a maximum page count of 0
        mergedPagination.currentPage = maxPage || 1;
    }

    const refreshPagination = (currentPage?: number, pageSize?: number) => {
        setInnerPagination({
            currentPage: currentPage ?? 1,
            pageSize: pageSize || mergedPagination.pageSize,
        });
    };

    const onInternalCurrentChange: PaginationProps['onCurrentChange'] = (
        currentPage: number
    ) => {
        if (pagination) {
            pagination.onCurrentChange?.(currentPage);
        }
        refreshPagination(currentPage);
        onChange(currentPage || mergedPagination?.currentPage!);
    };

    const onInternalSizeChange: PaginationProps['onSizeChange'] = (
        pageSize: number
    ) => {
        if (pagination) {
            pagination.onSizeChange?.(pageSize);
        }
        refreshPagination(pageSize);
        onChange(pageSize || mergedPagination?.pageSize!);
    };

    if (pagination === false) {
        return [{}, () => {}];
    }

    return [
        {
            ...mergedPagination,
            onCurrentChange: onInternalCurrentChange,
            onSizeChange: onInternalSizeChange,
        },
        refreshPagination,
    ];
}
