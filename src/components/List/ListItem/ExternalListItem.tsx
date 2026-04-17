import React, { FC, useRef } from 'react';
import { ExternalListItemProps } from './';
import { cloneElement, uniqueId } from '../../../shared/utilities';

export const ExternalListItem: FC<ExternalListItemProps> = (
  props: ExternalListItemProps
) => {
  const { handleItemKeyDown, id, index, item, itemRefs, itemRef } = props;
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
    onKeyDown: (event: KeyboardEvent) => {
      (item.props as unknown as React.HTMLAttributes<HTMLElement>).onKeyDown?.(
        event as unknown as React.KeyboardEvent<HTMLElement>
      );
      handleItemKeyDown?.(event, index, true);
    },
  });
};
