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

// `Tree` forwards every prop to `BaseTree` untouched, so it has no defaults
// of its own to migrate — `BaseTree`'s own destructuring defaults (see
// `BaseTree.tsx`) are what actually apply. `Tree.defaultProps` was removed
// rather than migrated: it was a redundant, byte-for-byte copy of
// `BaseTree.defaultProps`, and (being on a `forwardRef` value) React 19
// silently ignored it as of the branch that added it, so it wasn't
// contributing anything even before this change.
const Tree = React.forwardRef<OcTree, TreeProps>((props, ref) => {
  return <BaseTree ref={ref} {...props} />;
}) as unknown as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.DirectoryTree = DirectoryTree;

export default Tree;
