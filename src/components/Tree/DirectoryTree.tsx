import React from 'react';
import { debounce, mergeClasses } from '../../shared/utilities';
import type OcTree from './Internal';
import { conductExpandParent } from './Internal/util';
import type { EventDataNode, DataNode, Key } from './Internal/OcTree.types';
import {
  convertDataToEntities,
  convertTreeToData,
} from './Internal/utils/treeUtil';
import type { TreeProps, OcTreeNodeAttribute } from './Tree.types';
import Tree from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './Utils/dictUtil';
import { Icon, IconName, IconSize } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './Styles/tree.module.scss';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps extends TreeProps {
  expandAction?: ExpandAction;
}

export interface DirectoryTreeState {
  expandedKeys?: Key[];
  selectedKeys?: Key[];
}

function getIcon(props: OcTreeNodeAttribute): React.ReactNode {
  const { isLeaf, expanded } = props;
  if (isLeaf) {
    return (
      <Icon path={IconName.mdiFileDocumentOutline} size={IconSize.Small} />
    );
  }
  return expanded ? (
    <Icon path={IconName.mdiFolderOpenOutline} size={IconSize.Small} />
  ) : (
    <Icon path={IconName.mdiFolderOutline} size={IconSize.Small} />
  );
}

function getTreeData({ treeData, children }: DirectoryTreeProps) {
  return treeData || convertTreeToData(children);
}

const DirectoryTree: React.ForwardRefRenderFunction<
  OcTree,
  DirectoryTreeProps
> = (
  { defaultExpandAll, defaultExpandParent, defaultExpandedKeys, ...props },
  ref
) => {
  // Shift click usage
  const lastSelectedKey = React.useRef<Key>();

  const cachedSelectedKeys = React.useRef<Key[]>();

  const treeRef = React.createRef<OcTree>();

  React.useImperativeHandle(ref, () => treeRef.current!);

  const getInitExpandedKeys = () => {
    const { keyEntities } = convertDataToEntities(getTreeData(props));

    let initExpandedKeys: any;

    // Expanded keys
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(
        props.expandedKeys || defaultExpandedKeys || [],
        keyEntities
      );
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys;
    }
    return initExpandedKeys;
  };

  const [selectedKeys, setSelectedKeys] = React.useState(
    props.selectedKeys || props.defaultSelectedKeys || []
  );
  const [expandedKeys, setExpandedKeys] = React.useState(getInitExpandedKeys());

  React.useEffect(() => {
    if ('selectedKeys' in props) {
      setSelectedKeys(props.selectedKeys!);
    }
  }, [props.selectedKeys]);

  React.useEffect(() => {
    if ('expandedKeys' in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);

  const expandFolderNode = (
    event: React.MouseEvent<HTMLElement>,
    node: any
  ) => {
    const { isLeaf } = node;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    // Call internal tree expand function
    debounce(() => {
      treeRef.current!.onNodeExpand(event as any, node);
    }, 200);
  };

  const onExpand = (
    keys: Key[],
    info: {
      node: EventDataNode<DataNode>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) => {
    if (!('expandedKeys' in props)) {
      setExpandedKeys(keys);
    }
    // Call origin function
    return props.onExpand?.(keys, info);
  };

  const onClick = (
    event: React.MouseEvent<HTMLElement>,
    node: EventDataNode<DataNode>
  ) => {
    const { expandAction } = props;

    // Expand the tree
    if (expandAction === 'click') {
      expandFolderNode(event, node);
    }

    props.onClick?.(event, node);
  };

  const onDoubleClick = (
    event: React.MouseEvent<HTMLElement>,
    node: EventDataNode<DataNode>
  ) => {
    const { expandAction } = props;

    // Expand the tree
    if (expandAction === 'doubleClick') {
      expandFolderNode(event, node);
    }

    props.onDoubleClick?.(event, node);
  };

  const onSelect = (
    keys: Key[],
    event: {
      event: 'select';
      selected: boolean;
      node: any;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    const { multiple } = props;
    const { node, nativeEvent } = event;
    const { key = '' } = node;

    const treeData = getTreeData(props);
    // const newState: DirectoryTreeState = {};

    // We need wrap this event since some value is not same
    const newEvent: any = {
      ...event,
      selected: true, // Directory selected always true
    };

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent?.ctrlKey || nativeEvent?.metaKey;
    const shiftPick: boolean = nativeEvent?.shiftKey;

    // Generate new selected keys
    let newSelectedKeys: Key[];
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(
        treeData,
        newSelectedKeys
      );
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(
        new Set([
          ...(cachedSelectedKeys.current || []),
          ...calcRangeKeys({
            treeData,
            expandedKeys,
            startKey: key,
            endKey: lastSelectedKey.current,
          }),
        ])
      );
      newEvent.selectedNodes = convertDirectoryKeysToNodes(
        treeData,
        newSelectedKeys
      );
    } else {
      // Single click
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(
        treeData,
        newSelectedKeys
      );
    }

    props.onSelect?.(newSelectedKeys, newEvent);
    if (!('selectedKeys' in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const htmlDir: string = useCanvasDirection();

  const { classNames, ...otherProps } = props;

  const connectClassNames = mergeClasses([
    styles.treeDirectory,
    { ['tree-directory-rtl']: htmlDir === 'rtl' },
    classNames,
  ]);

  return (
    <Tree
      icon={getIcon}
      ref={treeRef}
      blockNode
      {...otherProps}
      classNames={connectClassNames}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onExpand={onExpand}
    />
  );
};

const ForwardDirectoryTree = React.forwardRef(DirectoryTree);
ForwardDirectoryTree.displayName = 'DirectoryTree';

ForwardDirectoryTree.defaultProps = {
  showIcon: true,
  expandAction: 'click' as DirectoryTreeProps['expandAction'],
};

export default ForwardDirectoryTree;
