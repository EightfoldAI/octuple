'use client';

import React from 'react';
import OcTree from './Internal';
import { DraggableConfig, OcTreeNodeProps, TreeProps } from './Tree.types';
import renderSwitcherIcon from './Utils/iconUtil';
import dropIndicatorRender from './Utils/dropIndicator';
import { Icon, IconName, IconSize } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { collapseMotion, mergeClasses } from '../../shared/utilities';

import styles from './Styles/tree.module.scss';

// React 19 removed `defaultProps` support for non-class components
// (including `forwardRef`-wrapped ones like `BaseTree`). These defaults are
// applied via destructuring below instead, which behaves identically for
// both React 17 and React 19 — a default only applies when the prop is
// `undefined`, so explicit falsy values (e.g. `selectable={false}`) are
// preserved exactly as `defaultProps` would have preserved them.
const DEFAULT_TREE_MOTION = {
  ...collapseMotion,
  motionAppear: false,
};

const BaseTree = React.forwardRef<OcTree, TreeProps>((props, ref) => {
  const {
    classNames,
    showIcon = false,
    showLine,
    switcherIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    virtual,
    motion = DEFAULT_TREE_MOTION,
  } = props;
  const htmlDir: string = useCanvasDirection();
  const newProps = {
    ...props,
    showLine: Boolean(showLine),
    dropIndicatorRender,
    motion,
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
      // Explicitly resolved and forwarded (rather than relying on
      // `newProps`'s spread of the original `props.showIcon`) because
      // `showIcon` is otherwise absent from `props` whenever the caller
      // omits it — `OcTree` (a class component) has its own
      // `defaultProps.showIcon = true`, which would silently win instead
      // of this component's own `showIcon = false` default.
      showIcon={showIcon}
      switcherIcon={(nodeProps: OcTreeNodeProps) =>
        renderSwitcherIcon(switcherIcon, showLine, nodeProps)
      }
      draggable={draggableConfig as any}
    >
      {children}
    </OcTree>
  );
});

export default BaseTree;
