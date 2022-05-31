import React, {
    forwardRef,
    useCallback,
    useEffect,
    useContext,
    useMemo,
    useRef,
} from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { fillRef } from '../../../shared/ref';
import ColGroup from '../ColGroup';
import type { ColumnsType, ColumnType } from '../Table.types';
import { FixedHeaderProps } from './FixedHolder.types';
import TableContext from '../Context/TableContext';

import styles from './Table.module.scss';

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

        const combinationScrollBarSize =
            isSticky && !fixHeader ? 0 : scrollbarSize;

        // Pass wheel to scroll event
        const scrollRef = useRef<HTMLDivElement>(null);

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
        const allFlattenColumnsWithWidth = useMemo(
            () => flattenColumns.every((column) => column.width >= 0),
            [flattenColumns]
        );

        // Add scrollbar column
        const lastColumn = flattenColumns[flattenColumns.length - 1];
        const ScrollBarColumn: ColumnType<unknown> & { scrollbar: true } = {
            fixed: lastColumn ? lastColumn.fixed : null,
            scrollbar: true,
            onHeaderCell: () => ({
                className: styles.tableCellScrollbar,
            }),
        };

        const columnsWithScrollbar = useMemo<ColumnsType<unknown>>(
            () =>
                combinationScrollBarSize
                    ? [...columns, ScrollBarColumn]
                    : columns,
            [combinationScrollBarSize, columns]
        );

        const flattenColumnsWithScrollbar = useMemo(
            () =>
                combinationScrollBarSize
                    ? [...flattenColumns, ScrollBarColumn]
                    : flattenColumns,
            [combinationScrollBarSize, flattenColumns]
        );

        // Calculate the sticky offsets
        const headerStickyOffsets = useMemo(() => {
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

        const mergedColumnWidth = useColumnWidth(colWidths, columCount);

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
