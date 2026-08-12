'use client';

import React from 'react';
import OcTree, { TreeNode } from './Internal';
import { TreeProps } from './Tree.types';
import type { BasicDataNode, DataNode } from './Internal/OcTree.types';
import BaseTree from './BaseTree';
import DirectoryTree from './DirectoryTree';

type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & { ref?: React.Ref<OcTree> }
) => React.ReactElement) & {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
};

const Tree = React.forwardRef<OcTree, TreeProps>((props, ref) => {
  return <BaseTree ref={ref} {...props} />;
}) as unknown as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.DirectoryTree = DirectoryTree;

export default Tree;
