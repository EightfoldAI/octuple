import React, {
    forwardRef,
    useCallback,
    useEffect,
    useContext,
    useMemo,
    useRef,
} from 'react';
import {
    fillRef,
    isStyleSupport,
    mergeClasses,
} from '../../../../shared/utilities';
import ColGroup from '../ColGroup';
import type { ColumnsType, ColumnType } from '../OcTable.types';
import { FixedHeaderProps } from './FixedHolder.types';
import TableContext from '../Context/TableContext';

import styles from '../octable.module.scss';

function useColumnWidth(colWidths: readonly number[], columCount: number) {
    return useMemo(() => {
        const cloneColumns: number[] = [];
        for (let i = 0; i < columCount; i += 1) {
            const val = colWidths[i];
            if (val !== undefined) {
                cloneColumns[i] = val;
            } else {
                return null;
            }
        }
        return cloneColumns;
    }, [colWidths.join('_'), columCount]);
}

const FixedHolder = forwardRef<HTMLDivElement, FixedHeaderProps<unknown>>(
    (
        {
            classNames,
            noData,
            columns,
            flattenColumns,
            colWidths,
            columCount,
            stickyOffsets,
            direction,
            fixHeader,
            stickyTopOffset,
            stickyBottomOffset,
            stickyClassName,
            onScroll,
            maxContentScroll,
            children,
            ...props
        },
        ref
    ) => {
        const { scrollbarSize, isSticky } = useContext(TableContext);
        const supportedScrollbarSize: number = isStyleSupport(
            'scrollbar-gutter'
        )
            ? 0
            : scrollbarSize;
        const combinationScrollBarSize: number =
            isSticky && !fixHeader ? 0 : supportedScrollbarSize;
        const scrollRef: React.MutableRefObject<HTMLDivElement> =
            useRef<HTMLDivElement>(null);

        const setScrollRef = useCallback((element: HTMLElement) => {
            fillRef(ref, element);
            fillRef(scrollRef, element);
        }, []);

        useEffect(() => {
            function onWheel(e: WheelEvent) {
                const { currentTarget, deltaX } =
                    e as unknown as React.WheelEvent<HTMLDivElement>;
                if (deltaX) {
                    onScroll({
                        currentTarget,
                        scrollLeft: currentTarget.scrollLeft + deltaX,
                    });
                    e.preventDefault();
                }
            }
            scrollRef.current?.addEventListener('wheel', onWheel);

            return () => {
                scrollRef.current?.removeEventListener('wheel', onWheel);
            };
        }, []);

        // Check if all flattenColumns has width
        const allFlattenColumnsWithWidth: boolean = useMemo(
            () => flattenColumns.every((column) => column.width >= 0),
            [flattenColumns]
        );

        // Add scrollbar column
        const lastColumn: ColumnType<unknown> =
            flattenColumns[flattenColumns.length - 1];
        const ScrollBarColumn: ColumnType<unknown> & { scrollbar: true } = {
            fixed: lastColumn ? lastColumn.fixed : null,
            scrollbar: true,
            onHeaderCell: () => ({
                className: styles.tableCellScrollbar,
            }),
        };

        const columnsWithScrollbar: ColumnsType<unknown> = useMemo<
            ColumnsType<unknown>
        >(
            () =>
                combinationScrollBarSize
                    ? [...columns, ScrollBarColumn]
                    : columns,
            [combinationScrollBarSize, columns]
        );

        const flattenColumnsWithScrollbar: readonly ColumnType<unknown>[] =
            useMemo(
                () =>
                    combinationScrollBarSize
                        ? [...flattenColumns, ScrollBarColumn]
                        : flattenColumns,
                [combinationScrollBarSize, flattenColumns]
            );

        // Calculate the sticky offsets
        const headerStickyOffsets: {
            left: readonly number[];
            right: readonly number[];
            isSticky: boolean;
        } = useMemo(() => {
            const { right, left } = stickyOffsets;
            return {
                ...stickyOffsets,
                left:
                    direction === 'rtl'
                        ? [
                              ...left.map(
                                  (width) => width + combinationScrollBarSize
                              ),
                              0,
                          ]
                        : left,
                right:
                    direction === 'rtl'
                        ? right
                        : [
                              ...right.map(
                                  (width) => width + combinationScrollBarSize
                              ),
                              0,
                          ],
                isSticky,
            };
        }, [combinationScrollBarSize, stickyOffsets, isSticky]);

        const mergedColumnWidth: number[] = useColumnWidth(
            colWidths,
            columCount
        );

        return (
            <div
                style={{
                    overflow: 'hidden',
                    ...(isSticky
                        ? { top: stickyTopOffset, bottom: stickyBottomOffset }
                        : {}),
                }}
                ref={setScrollRef}
                className={mergeClasses([
                    classNames,
                    { [stickyClassName]: !!stickyClassName },
                ])}
            >
                <table
                    style={{
                        tableLayout: 'fixed',
                        visibility:
                            noData || mergedColumnWidth ? null : 'hidden',
                    }}
                >
                    {(!noData ||
                        !maxContentScroll ||
                        allFlattenColumnsWithWidth) && (
                        <ColGroup
                            colWidths={
                                mergedColumnWidth
                                    ? [
                                          ...mergedColumnWidth,
                                          combinationScrollBarSize,
                                      ]
                                    : []
                            }
                            columCount={columCount + 1}
                            columns={flattenColumnsWithScrollbar}
                        />
                    )}
                    {children({
                        ...props,
                        stickyOffsets: headerStickyOffsets,
                        columns: columnsWithScrollbar,
                        flattenColumns: flattenColumnsWithScrollbar,
                    })}
                </table>
            </div>
        );
    }
);

FixedHolder.displayName = 'FixedHolder';

export default FixedHolder;
