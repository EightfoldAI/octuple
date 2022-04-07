import React, { Key } from 'react';
import { ListProps } from './List.types';
import { classNames } from '../../shared/utilities';

import styles from './list.module.scss';

export const List = <T extends any>({
    items,
    footer,
    layout = 'vertical',
    renderItem,
    rowKey,
    header,
    className,
    style,
    itemClassName,
    itemStyle,
    listType = 'ul',
    role,
    itemRole,
}: ListProps<T>) => {
    const containerClasses: string = classNames([
        styles.listContainer,
        { [styles.vertical]: layout === 'vertical' },
    ]);

    const itemClasses: string = classNames([styles.listItem, itemClassName]);

    const getHeader = (): JSX.Element => <>{header}</>;

    const getFooter = (): JSX.Element => <>{footer}</>;

    const getItemKey = (item: T, index: number): Key => {
        if (typeof rowKey === 'function') {
            return rowKey(item) as Key;
        } else if (rowKey) {
            return item[rowKey];
        }
        return `oc-list-item-${index}`;
    };

    const getItem = (item: T, index: number): JSX.Element => (
        <li
            key={getItemKey(item, index)}
            className={itemClasses}
            style={itemStyle}
            role={itemRole}
        >
            {renderItem(item)}
        </li>
    );

    const getItems = (): JSX.Element[] =>
        items.map((item: T, index) => getItem(item, index));

    return (
        <div className={className} style={style}>
            {getHeader()}
            {listType === 'ul' && (
                <ul role={role} className={containerClasses}>
                    {getItems()}
                </ul>
            )}
            {listType === 'ol' && (
                <ol role={role} className={containerClasses}>
                    {getItems()}
                </ol>
            )}
            {getFooter()}
        </div>
    );
};
