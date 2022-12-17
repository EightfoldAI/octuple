import React from 'react';
import type { ListProps, ListRef } from './VirtualList.types';
import { RawList } from './VirtualList';

const List = React.forwardRef(
  (props: ListProps<any>, ref: React.Ref<ListRef>) =>
    RawList({ ...props, virtual: false }, ref)
) as <Item = any>(
  props: React.PropsWithChildren<ListProps<Item>> & {
    ref?: React.Ref<ListRef>;
  }
) => React.ReactElement;

(List as any).displayName = 'List';

export default List;
