import React, { Key, useEffect, useRef, useState } from 'react';
import { ListProps } from './List.types';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import {
  cloneElement,
  eventKeys,
  focusable,
  mergeClasses,
  SELECTORS,
  uniqueId,
} from '../../shared/utilities';

import styles from './list.module.scss';

export const List = <T extends any>({
  additionalItem,
  disableArrowKeys = false,
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
  const htmlDir: string = useCanvasDirection();

  const containerClasses: string = mergeClasses([
    styles.listContainer,
    listClassNames,
    { [styles.vertical]: layout === 'vertical' },
  ]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const itemRefs: React.MutableRefObject<HTMLElement[]> = useRef<
    (HTMLElement | null)[]
  >([]);

  // Update the focused item when the items or focusIndex change.
  useEffect(() => {
    // Ensure the focused item index is within bounds.
    if (focusIndex !== null && items && focusIndex >= items.length) {
      setFocusIndex(items.length - 1);
    }
  }, [focusIndex, items]);

  const handleItemKeyDown = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement>,
    index: number,
    external: boolean = false
  ): void => {
    if (disableArrowKeys) {
      return;
    }
    const arrowDown: boolean = event?.key === eventKeys.ARROWDOWN;
    const arrowLeft: boolean = event?.key === eventKeys.ARROWLEFT;
    const arrowRight: boolean = event?.key === eventKeys.ARROWRIGHT;
    const arrowUp: boolean = event?.key === eventKeys.ARROWUP;
    const arrowDecrement: boolean = htmlDir === 'rtl' ? arrowRight : arrowLeft;
    const arrowIncrement: boolean = htmlDir === 'rtl' ? arrowLeft : arrowRight;
    const end: boolean = event?.key === eventKeys.END;
    const home: boolean = event?.key === eventKeys.HOME;
    if (
      ((arrowDown || arrowUp) && layout === 'vertical') ||
      ((arrowDecrement || arrowIncrement) && layout === 'horizontal')
    ) {
      event?.preventDefault();
      setFocusIndex(index);
      if (itemRefs.current[index]) {
        const getFocusableElements = (): HTMLElement[] => {
          const step: number =
            (arrowDown && layout === 'vertical') ||
            (arrowIncrement && layout === 'horizontal')
              ? 1
              : -1;
          let nextIndex: number = index + step;
          const additionalItemIndex: number = items ? items.length : 0;
          if (
            (renderAdditionalItem &&
              ((arrowDown && layout === 'vertical') ||
                (arrowIncrement && layout === 'horizontal')) &&
              nextIndex === additionalItemIndex) ||
            (((arrowUp && layout === 'vertical') ||
              (arrowDecrement && layout === 'horizontal')) &&
              nextIndex === additionalItemIndex + 1)
          ) {
            return [
              ...(itemRefs.current[additionalItemIndex]?.querySelectorAll(
                SELECTORS
              ) as unknown as HTMLElement[]),
            ].filter((el: HTMLElement) => focusable(el));
          }
          while (
            (nextIndex >= 0 && nextIndex <= additionalItemIndex) ||
            (nextIndex > additionalItemIndex && nextIndex < items.length)
          ) {
            const nextItem: HTMLElement | null = itemRefs.current[nextIndex];
            if (nextItem && focusable(nextItem)) {
              const nextFocusableItem: HTMLElement | null = external
                ? nextItem.parentElement
                : nextItem;
              return [
                ...(nextFocusableItem.querySelectorAll(
                  SELECTORS
                ) as unknown as HTMLElement[]),
              ].filter((el: HTMLElement) => focusable(el));
            }
            nextIndex += step;
          }
          return [];
        };
        const focusableElements: HTMLElement[] = getFocusableElements();
        focusableElements?.[0]?.focus();
      }
    }
    if (home) {
      event?.preventDefault();
      setFocusIndex(0);
      if (itemRefs.current[0]) {
        itemRefs.current[0]?.focus();
      }
    }
    if (end) {
      event?.preventDefault();
      setFocusIndex(items.length - 1);
      if (itemRefs.current[items.length - 1]) {
        itemRefs.current[items.length - 1]?.focus();
      }
    }
  };

  const itemClasses: string = mergeClasses([styles.listItem, itemClassNames]);

  const getHeader = (): JSX.Element => <>{header}</>;

  const getFooter = (): JSX.Element => <>{footer}</>;

  const getAdditionalItem = (): JSX.Element => {
    const additionalItemIndex: number = items ? items.length : 0;
    const itemRef = (el: HTMLElement | null) => {
      itemRefs.current[additionalItemIndex] = el;
    };
    return (
      <li
        {...itemProps}
        key={getItemKey(additionalItem, additionalItemIndex)}
        className={itemClasses}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) =>
          handleItemKeyDown(event, additionalItemIndex)
        }
        ref={itemRef}
        style={itemStyle}
      >
        {renderAdditionalItem?.(additionalItem)}
      </li>
    );
  };

  const getItemKey = (item: T, index: number): Key => {
    if (typeof rowKey === 'function') {
      return rowKey(item) as Key;
    } else if (rowKey) {
      return item[rowKey];
    }
    return `oc-list-item-${index}`;
  };

  const _getItem = (
    item: T,
    index: number,
    itemRef: (el: HTMLElement | null) => void
  ): JSX.Element => (
    <li
      {...itemProps}
      key={getItemKey(item, index)}
      className={itemClasses}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) =>
        handleItemKeyDown(event, index)
      }
      ref={itemRef}
      style={itemStyle}
    >
      {renderItem(item)}
    </li>
  );

  const externalItem = (
    node: React.ReactNode,
    index: number,
    itemRef: (el: HTMLElement | null) => void
  ): JSX.Element => {
    if (!node) {
      return null;
    }
    const item = React.Children.only(node) as React.ReactElement<HTMLElement>;
    const itemId: string = item.props.id
      ? item.props.id
      : uniqueId(`listItem${index}-`);
    const referenceElement: HTMLElement | null =
      document.getElementById(itemId);
    itemRef(referenceElement);
    itemRefs.current[index] = referenceElement;
    return cloneElement(item, {
      id: itemId,
      ref: itemRef,
      tabIndex: 0,
      onKeyDown: (event: KeyboardEvent) => {
        item.props.onkeydown?.(event);
        handleItemKeyDown(event, index, true);
      },
    });
  };

  const getItems = (): React.ReactNode[] =>
    items.map((item: T, index) => {
      const itemRef = (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
      };
      return (
        externalItem?.(getItem?.(item, index), index, itemRef) ??
        _getItem(item, index, itemRef)
      );
    });

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
