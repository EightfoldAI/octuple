import React, { FC } from 'react';
import { Item } from '../Item';
import { Separator } from '../Separator';
import {
  itemClassName,
  MenuItemsProps,
  separatorClassName,
} from '../Carousel.types';
import { getItemId } from '../Utilities';
import { mergeClasses } from '../../../shared/utilities';

export const MenuItems: FC<MenuItemsProps> = (props: MenuItemsProps) => {
  const { children, gap, itemClassNames, refs, rtl, separatorClassNames } =
    props;
  const childArray: (
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
  )[] = React.Children.toArray(children).filter(Boolean);
  const itemsCount: number = childArray.length;
  const gapSubDivided: number = gap / 2;

  const itemClasses: string = mergeClasses([itemClassName, itemClassNames]);

  const separatorClasses: string = mergeClasses([
    separatorClassName,
    separatorClassNames,
  ]);

  return (
    <>
      {childArray.map(
        (
          child: React.ReactChild | React.ReactFragment | React.ReactPortal,
          index: number
        ) => {
          const id: string = getItemId(child);
          const separatorId: string = id + '-separator';
          const isFirstItem: boolean = index === 0;
          const isLastItem: boolean = index + 1 === itemsCount;

          return [
            <Item
              classNames={itemClasses}
              id={id}
              index={index}
              key={'menuItem__' + id}
              refs={refs}
              style={{
                marginLeft: isFirstItem
                  ? rtl
                    ? gapSubDivided
                    : 0
                  : rtl
                  ? gapSubDivided
                  : 0,
                marginRight: isLastItem
                  ? rtl
                    ? 0
                    : gapSubDivided
                  : rtl
                  ? 0
                  : gapSubDivided,
              }}
            >
              {child}
            </Item>,
            !isLastItem && (
              <Separator
                classNames={separatorClasses}
                id={separatorId}
                index={index + 0.1}
                key={separatorId}
                refs={refs}
                style={{
                  marginLeft: isFirstItem
                    ? rtl
                      ? gapSubDivided
                      : 0
                    : rtl
                    ? gapSubDivided
                    : 0,
                  marginRight: isLastItem
                    ? rtl
                      ? 0
                      : gapSubDivided
                    : rtl
                    ? 0
                    : gapSubDivided,
                }}
              />
            ),
          ];
        }
      )}
    </>
  );
};
