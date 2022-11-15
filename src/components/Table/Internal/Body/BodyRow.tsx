import React, { useContext, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../../../shared/utilities';
import Cell from '../Cell';
import TableContext from '../Context/TableContext';
import BodyContext from '../Context/BodyContext';
import { getColumnsKey } from '../Utilities/valueUtil';
import type { ColumnType } from '../OcTable.types';
import { BodyRowProps } from './Body.types';
import ExpandedRow from './ExpandedRow';

import styles from '../octable.module.scss';

function BodyRow<RecordType extends { children?: readonly RecordType[] }>(
    props: BodyRowProps<RecordType>
) {
    const {
        classNames,
        style,
        record,
        index,
        renderIndex,
        rowKey,
        rowExpandable,
        expandedKeys,
        onRow,
        indent = 0,
        rowComponent: RowComponent,
        cellComponent,
        childrenColumnName,
        onRowHover,
    } = props;
    const { fixedInfoList } = useContext(TableContext);
    const {
        flattenColumns,
        expandableType,
        expandRowByClick,
        onTriggerExpand,
        rowClassName,
        expandedRowClassName,
        indentSize,
        expandIcon,
        expandedRowRender,
    } = useContext(BodyContext);
    const [expandRended, setExpandRended] = useState(false);

    const expanded = expandedKeys && expandedKeys.has(props.recordKey);

    useEffect(() => {
        if (expanded) {
            setExpandRended(true);
        }
    }, [expanded]);

    const rowSupportExpand =
        expandableType === 'row' && (!rowExpandable || rowExpandable(record));
    // Only when row is not expandable and `children` exist in record
    const nestExpandable = expandableType === 'nest';
    const hasNestChildren: boolean =
        childrenColumnName && record && (record as any)[childrenColumnName];
    const mergedExpandable = rowSupportExpand || nestExpandable;

    // ======================== Expandable =========================
    const onExpandRef = useRef(onTriggerExpand);
    onExpandRef.current = onTriggerExpand;

    const onInternalTriggerExpand = (
        ...args: Parameters<typeof onTriggerExpand>
    ) => {
        onExpandRef.current(...args);
    };

    // =========================== onRow ===========================
    let additionalProps: React.HTMLAttributes<HTMLElement>;
    if (onRow) {
        additionalProps = onRow(record, index);
    }

    const onClick: React.MouseEventHandler<HTMLElement> = (event, ...args) => {
        if (expandRowByClick && mergedExpandable) {
            onInternalTriggerExpand(record, event);
        }

        additionalProps?.onClick?.(event, ...args);
    };

    // ======================== Base tr row ========================
    let computeRowClassName: string;
    if (typeof rowClassName === 'string') {
        computeRowClassName = rowClassName;
    } else if (typeof rowClassName === 'function') {
        computeRowClassName = rowClassName(record, index, indent);
    }

    const columnsKey = getColumnsKey(flattenColumns);
    const baseRowNode = (
        <RowComponent
            {...additionalProps}
            data-row-key={rowKey}
            className={mergeClasses?.([
                classNames,
                'table-row',
                `table-row-level-${indent}`,
                computeRowClassName,
                additionalProps && additionalProps.className,
            ])}
            style={{
                ...style,
                ...(additionalProps ? additionalProps.style : null),
            }}
            onClick={onClick}
            onMouseOver={(e: React.MouseEvent<HTMLElement>) =>
                onRowHover?.(renderIndex, e)
            }
        >
            {flattenColumns.map((column: ColumnType<RecordType>, colIndex) => {
                const {
                    render,
                    dataIndex,
                    classNames: columnClassName,
                } = column;

                const key = columnsKey[colIndex];
                const fixedInfo = fixedInfoList[colIndex];

                // ============= Used for nest expandable =============
                let appendCellNode: React.ReactNode;
                if (colIndex === 0 && nestExpandable) {
                    appendCellNode = (
                        <>
                            <span
                                style={{
                                    paddingLeft: `${indentSize * indent}px`,
                                }}
                                className={`table-row-indent indent-level-${indent}`}
                            />
                            {expandIcon({
                                expanded,
                                expandable: hasNestChildren,
                                record,
                                onExpand: onInternalTriggerExpand,
                            })}
                        </>
                    );
                }

                let additionalCellProps: React.HTMLAttributes<HTMLElement>;
                if (column.onCell) {
                    additionalCellProps = column.onCell(record, index);
                }

                return (
                    <Cell
                        classNames={columnClassName}
                        ellipsis={column.ellipsis}
                        align={column.align}
                        verticalAlign={column.verticalAlign}
                        component={cellComponent}
                        key={key}
                        record={record}
                        index={index}
                        renderIndex={renderIndex}
                        dataIndex={dataIndex}
                        render={render}
                        shouldCellUpdate={column.shouldCellUpdate}
                        expanded={appendCellNode && expanded}
                        {...fixedInfo}
                        appendNode={appendCellNode}
                        additionalProps={additionalCellProps}
                    />
                );
            })}
        </RowComponent>
    );

    // ======================== Expand Row =========================
    let expandRowNode: React.ReactElement;
    if (rowSupportExpand && (expandRended || expanded)) {
        const expandContent = expandedRowRender(
            record,
            index,
            indent + 1,
            expanded
        );
        const computedExpandedRowClassName =
            expandedRowClassName && expandedRowClassName(record, index, indent);
        expandRowNode = (
            <ExpandedRow
                expanded={expanded}
                classNames={mergeClasses?.([
                    styles.tableExpandedRow,
                    `table-expanded-row-level-${indent + 1}`,
                    computedExpandedRowClassName,
                ])}
                component={RowComponent}
                cellComponent={cellComponent}
                colSpan={flattenColumns.length}
                isEmpty={false}
            >
                {expandContent}
            </ExpandedRow>
        );
    }

    return (
        <>
            {baseRowNode}
            {expandRowNode}
        </>
    );
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;
