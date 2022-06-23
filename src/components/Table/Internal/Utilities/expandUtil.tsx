import React from 'react';
import { mergeClasses } from '../../../../shared/utilities';
import type { RenderExpandIconProps, Key, GetRowKey } from '../OcTable.types';

import styles from '../octable.module.scss';

export function renderExpandIcon<RecordType>({
    record,
    onExpand,
    expanded,
    expandable,
}: RenderExpandIconProps<RecordType>) {
    const expandClassName = styles.tableRowExpandIcon;

    if (!expandable) {
        return (
            <span
                className={mergeClasses([
                    expandClassName,
                    styles.tableRowSpaced,
                ])}
            />
        );
    }

    const onClick: React.MouseEventHandler<HTMLElement> = (event) => {
        onExpand(record, event);
        event.stopPropagation();
    };

    return (
        <span
            className={mergeClasses([
                expandClassName,
                { [styles.tableRowExpanded]: expanded },
                { [styles.tableRowCollapsed]: !expanded },
            ])}
            onClick={onClick}
        />
    );
}

export function findAllChildrenKeys<RecordType>(
    data: readonly RecordType[],
    getRowKey: GetRowKey<RecordType>,
    childrenColumnName: string
): Key[] {
    const keys: Key[] = [];

    function dig(list: readonly RecordType[]) {
        (list || []).forEach((item, index) => {
            keys.push(getRowKey(item, index));

            dig((item as any)[childrenColumnName]);
        });
    }

    dig(data);

    return keys;
}
