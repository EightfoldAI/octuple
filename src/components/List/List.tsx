import React, { Key } from 'react';
import { ListProps } from './List.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './list.module.scss';

export const List = <T extends any>({
    items,
    footer,
    layout = 'vertical',
    renderItem,
    rowKey,
    header,
    classNames,
    style,
    itemClassNames,
    itemStyle,
    listType = 'ul',
    role,
    itemProps,
    ...rest
}: ListProps<T>) => {
    const containerClasses: string = mergeClasses([
        styles.listContainer,
        { [styles.vertical]: layout === 'vertical' },
    ]);

    const itemClasses: string = mergeClasses([styles.listItem, itemClassNames]);

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
            {...itemProps}
            onClick={() => itemProps?.onClick(item)}
            key={getItemKey(item, index)}
            className={itemClasses}
            style={itemStyle}
        >
            {renderItem(item)}
        </li>
    );

    const getItems = (): JSX.Element[] =>
        items.map((item: T, index) => getItem(item, index));

    return (
        <div {...rest} className={classNames} style={style}>
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
