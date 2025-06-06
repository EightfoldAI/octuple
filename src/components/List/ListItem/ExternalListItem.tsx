import React, { FC, useRef } from 'react';
import { ExternalListItemProps } from './';
import { cloneElement, uniqueId } from '../../../shared/utilities';

export const ExternalListItem: FC<ExternalListItemProps> = (
  props: ExternalListItemProps
) => {
  const {
    handleItemKeyDown,
    id,
    index,
    item,
    itemRefs,
    itemRef,
    setSize,
  } = props;
  const itemId: React.MutableRefObject<string> = useRef<string>(
    id || uniqueId(`listItem${index}-`)
  );
  const referenceElement: HTMLElement | null = document?.getElementById(
    itemId?.current
  );
  itemRef?.(referenceElement);
  itemRefs.current[index] = referenceElement;
  return cloneElement(item, {
    id: itemId?.current,
    ref: itemRef,
    tabIndex: 0,
    'aria-posinset': index + 1,
    'aria-setsize': setSize,
    onKeyDown: (event: KeyboardEvent) => {
      item.props.onkeydown?.(event);
      handleItemKeyDown?.(event, index, true);
    },
  });
};
