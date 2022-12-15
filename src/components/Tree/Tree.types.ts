import type {
  BasicDataNode,
  DataNode,
  Key,
  OcTreeProps,
} from './Internal/OcTree.types';

export type SwitcherIcon =
  | React.ReactNode
  | ((props: { expanded: boolean }) => React.ReactNode);

export interface OcTreeNodeAttribute {
  eventKey: string;
  classNames: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}

export interface OcTreeNodeProps {
  classNames?: string;
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: Key;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: OcTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  [customProp: string]: any;
}

export interface OcTreeNode extends React.Component<OcTreeNodeProps, {}> {}

export interface OcTreeNodeBaseEvent {
  node: OcTreeNode;
  nativeEvent: MouseEvent;
}

export interface OcTreeNodeCheckedEvent extends OcTreeNodeBaseEvent {
  event: 'check';
  checked?: boolean;
  checkedNodes?: OcTreeNode[];
}

export interface OcTreeNodeSelectedEvent extends OcTreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: DataNode[];
}

export interface OcTreeNodeExpandedEvent extends OcTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface OcTreeNodeMouseEvent {
  node: OcTreeNode;
  event: React.DragEvent<HTMLElement>;
}

export interface OcTreeNodeDragEnterEvent extends OcTreeNodeMouseEvent {
  expandedKeys: Key[];
}

export interface OcTreeNodeDropEvent {
  node: OcTreeNode;
  dragNode: OcTreeNode;
  dragNodesKeys: Key[];
  dropPosition: number;
  dropToGap?: boolean;
  event: React.MouseEvent<HTMLElement>;
}

// [Legacy] Compatible for v3
export type TreeNodeNormal = DataNode;

export type DraggableFn = (node: OcTreeNode) => boolean;

export interface DraggableConfig {
  icon?: React.ReactNode | false;
  nodeDraggable?: DraggableFn;
}

export interface TreeProps<T extends BasicDataNode = DataNode>
  extends Omit<OcTreeProps<T>, 'showLine' | 'direction' | 'draggable'> {
  showLine?: boolean | { showLeafIcon: boolean };
  classNames?: string;
  multiple?: boolean;
  autoExpandParent?: boolean;
  checkStrictly?: boolean;
  checkable?: boolean;
  disabled?: boolean;
  defaultExpandAll?: boolean;
  defaultExpandParent?: boolean;
  defaultExpandedKeys?: Key[];
  expandedKeys?: Key[];
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  defaultCheckedKeys?: Key[];
  selectedKeys?: Key[];
  defaultSelectedKeys?: Key[];
  selectable?: boolean;
  filterOcTreeNode?: (node: OcTreeNode) => boolean;
  loadedKeys?: Key[];
  draggable?: DraggableFn | boolean | DraggableConfig;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?:
    | ((nodeProps: OcTreeNodeAttribute) => React.ReactNode)
    | React.ReactNode;
  switcherIcon?: SwitcherIcon;
  children?: React.ReactNode;
  blockNode?: boolean;
  virtual?: boolean;
}
