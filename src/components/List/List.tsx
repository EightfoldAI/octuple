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
}: ListProps<T>) => {
    const containerClasses: string = classNames([
        styles.listContainer,
        { [styles.vertical]: layout === 'vertical' },
    ]);

    const itemClasses: string = classNames([itemClassName]);

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
        <div
            key={getItemKey(item, index)}
            className={itemClasses}
            style={itemStyle}
        >
            {renderItem(item)}
        </div>
    );

    return (
        <div className={className} style={style}>
            {getHeader()}
            <div className={containerClasses}>
                {items.map((item: T, index) => getItem(item, index))}
            </div>
            {getFooter()}
        </div>
    );
};
