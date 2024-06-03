'use client';

import React from 'react';
import OcTree, { TreeNode } from './Internal';
import { DraggableConfig, OcTreeNodeProps, TreeProps } from './Tree.types';
import type { BasicDataNode, DataNode } from './Internal/OcTree.types';
import DirectoryTree from './DirectoryTree';
import renderSwitcherIcon from './Utils/iconUtil';
import dropIndicatorRender from './Utils/dropIndicator';
import { Icon, IconName, IconSize } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { collapseMotion, mergeClasses } from '../../shared/utilities';

import styles from './Styles/tree.module.scss';

type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & { ref?: React.Ref<OcTree> }
) => React.ReactElement) & {
  defaultProps: Partial<React.PropsWithChildren<TreeProps<any>>>;
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
};

const Tree = React.forwardRef<OcTree, TreeProps>((props, ref) => {
  const {
    classNames,
    showIcon,
    showLine,
    switcherIcon,
    blockNode,
    children,
    checkable,
    selectable,
    draggable,
    virtual,
  } = props;
  const htmlDir: string = useCanvasDirection();
  const newProps = {
    ...props,
    showLine: Boolean(showLine),
    dropIndicatorRender,
  };

  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false;
    }

    let mergedDraggable: DraggableConfig = {};
    switch (typeof draggable) {
      case 'function':
        mergedDraggable.nodeDraggable = draggable;
        break;

      case 'object':
        mergedDraggable = { ...draggable };
        break;

      default:
      // Do nothing
    }

    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || (
        <Icon
          color={'#ffffff'}
          path={IconName.mdiHandBackRight}
          size={IconSize.Medium}
        />
      );
    }

    return mergedDraggable;
  }, [draggable]);

  return (
    <OcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual}
      {...newProps}
      classNames={mergeClasses([
        { ['tree-icon-hide']: !showIcon },
        { [styles.treeBlockNode]: blockNode },
        { [styles.treeUnselectable]: !selectable },
        { [styles.treeRtl]: htmlDir === 'rtl' },
        classNames,
      ])}
      direction={htmlDir}
      checkable={
        checkable ? <span className={'tree-checkbox-inner'} /> : checkable
      }
      selectable={selectable}
      switcherIcon={(nodeProps: OcTreeNodeProps) =>
        renderSwitcherIcon(switcherIcon, showLine, nodeProps)
      }
      draggable={draggableConfig as any}
    >
      {children}
    </OcTree>
  );
}) as unknown as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.DirectoryTree = DirectoryTree;

Tree.defaultProps = {
  checkable: false,
  selectable: true,
  showIcon: false,
  motion: {
    ...collapseMotion,
    motionAppear: false,
  },
  blockNode: false,
};

export default Tree;
