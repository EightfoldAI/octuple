import React, { Key } from 'react';
import { ListProps } from './List.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './list.module.scss';

export const List = <T extends any>({
  additionalItem,
  items,
  footer,
  layout = 'vertical',
  renderAdditionalItem,
  renderItem,
  rowKey,
  header,
  classNames,
  style,
  itemClassNames,
  itemStyle,
  listClassNames,
  listType = 'ul',
  role,
  itemProps,
  getItem,
  ...rest
}: ListProps<T>) => {
  const containerClasses: string = mergeClasses([
    styles.listContainer,
    listClassNames,
    { [styles.vertical]: layout === 'vertical' },
  ]);

  const itemClasses: string = mergeClasses([styles.listItem, itemClassNames]);

  const getHeader = (): JSX.Element => <>{header}</>;

  const getFooter = (): JSX.Element => <>{footer}</>;

  const getAdditionalItem = (): JSX.Element => (
    <li
      {...itemProps}
      key={getItemKey(additionalItem, (items?.length + 1) | 1)}
      className={itemClasses}
      style={itemStyle}
    >
      {renderAdditionalItem?.(additionalItem)}
    </li>
  );

  const getItemKey = (item: T, index: number): Key => {
    if (typeof rowKey === 'function') {
      return rowKey(item) as Key;
    } else if (rowKey) {
      return item[rowKey];
    }
    return `oc-list-item-${index}`;
  };

  const _getItem = (item: T, index: number): JSX.Element => (
    <li
      {...itemProps}
      key={getItemKey(item, index)}
      className={itemClasses}
      style={itemStyle}
    >
      {renderItem(item)}
    </li>
  );

  const getItems = (): React.ReactNode[] =>
    items.map(
      (item: T, index) => getItem?.(item, index) ?? _getItem(item, index)
    );

  return (
    <div {...rest} className={classNames} style={style}>
      {getHeader()}
      {listType === 'ul' && (
        <ul role={role} className={containerClasses}>
          {getItems()}
          {!!renderAdditionalItem && getAdditionalItem()}
        </ul>
      )}
      {listType === 'ol' && (
        <ol role={role} className={containerClasses}>
          {getItems()}
          {!!renderAdditionalItem && getAdditionalItem()}
        </ol>
      )}
      {getFooter()}
    </div>
  );
};
