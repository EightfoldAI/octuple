import { useState } from 'react';
import type { PaginationProps } from '../../Pagination/Pagination.types';
import type { TablePaginationConfig } from '../Table.types';

export const DEFAULT_PAGE_SIZE: number = 10;

export function getPaginationParam(
    pagination: TablePaginationConfig | boolean | undefined,
    mergedPagination: TablePaginationConfig
) {
    const param: any = {
        currentPage: mergedPagination.currentPage,
        pageSize: mergedPagination.pageSize,
        pageSizes: mergedPagination.pageSizes,
        total: mergedPagination.total,
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
    onChange: (
        currentPage: number,
        pageSize: number,
        pageSizes: number[],
        total: number
    ) => void
): [TablePaginationConfig, () => void] {
    const { total: paginationTotal = 0, ...paginationObj } =
        pagination && typeof pagination === 'object' ? pagination : {};

    const [innerPagination, setInnerPagination] = useState<{
        currentPage?: number;
        pageSize?: number;
        pageSizes?: number[];
        total?: number;
    }>(() => ({
        currentPage: paginationObj.currentPage,
        pageSize: paginationObj.pageSize,
        pageSizes: paginationObj.pageSizes,
        total: paginationTotal,
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
    const pages: number[] = mergedPagination.pageSizes!;
    let maxPage: number;

    if (pages) {
        for (let i: number = 0; i < pages.length; ++i) {
            if (mergedPagination.pageSize === pages[i]) {
                maxPage = Math.ceil((paginationTotal || total) / pages[i]!);
            }
        }
    } else {
        maxPage = Math.ceil(
            (paginationTotal || total) / mergedPagination.pageSize!
        );
    }

    if (mergedPagination.currentPage! > maxPage) {
        // Prevent a maximum page count of 0
        mergedPagination.currentPage = maxPage || 1;
    }

    const refreshPagination = (
        currentPage?: number,
        pageSize?: number,
        pageSizes?: number[],
        total?: number
    ) => {
        setInnerPagination({
            currentPage: currentPage,
            pageSize: pageSize,
            pageSizes: pageSizes,
            total: total,
        });
    };

    const onInternalCurrentChange: PaginationProps['onCurrentChange'] = (
        currentPage: number
    ) => {
        mergedPagination.onCurrentChange?.(mergedPagination?.currentPage);
        refreshPagination(
            currentPage,
            mergedPagination?.pageSize,
            mergedPagination?.pageSizes,
            mergedPagination?.total
        );
        onChange(
            currentPage || mergedPagination?.currentPage!,
            mergedPagination?.pageSize,
            mergedPagination?.pageSizes,
            mergedPagination?.total
        );
    };

    const onInternalSizeChange: PaginationProps['onSizeChange'] = (
        size: number
    ) => {
        const pages: number[] = mergedPagination?.pageSizes;
        if (pages) {
            for (let i: number = 0; i < pages.length; ++i) {
                if (size === pages[i]) {
                    mergedPagination.onSizeChange?.(
                        mergedPagination?.pageSizes[i]
                    );
                    refreshPagination(
                        mergedPagination?.currentPage,
                        size,
                        mergedPagination?.pageSizes!,
                        mergedPagination?.total
                    );
                    onChange(
                        mergedPagination?.currentPage,
                        size || mergedPagination?.pageSizes[i]!,
                        mergedPagination?.pageSizes!,
                        mergedPagination?.total
                    );
                }
            }
        } else {
            mergedPagination.onSizeChange?.(mergedPagination?.pageSize);
            refreshPagination(
                mergedPagination?.currentPage,
                size,
                undefined,
                mergedPagination?.total
            );
            onChange(
                mergedPagination?.currentPage,
                size || mergedPagination?.pageSize!,
                undefined,
                mergedPagination?.total
            );
        }
    };

    if (pagination === false) {
        return [{}, () => {}];
    }

    return [
        {
            ...mergedPagination,
            onCurrentChange: onInternalCurrentChange,
            onSizeChange: onInternalSizeChange,
            total: mergedPagination.total,
        },
        refreshPagination,
    ];
}
