import React from 'react';
import {
    IconType,
    Key,
    DataEntity,
    EventDataNode,
    NodeInstance,
    DataNode,
    BasicDataNode,
} from './OcTree.types';
import { DraggableConfig } from './OcTree.types';

export type NodeMouseEventParams<
    TreeDataType extends BasicDataNode = DataNode,
    T = HTMLSpanElement
> = {
    event: React.MouseEvent<T>;
    node: EventDataNode<TreeDataType>;
};
export type NodeDragEventParams<
    TreeDataType extends BasicDataNode = DataNode,
    T = HTMLDivElement
> = {
    event: React.DragEvent<T>;
    node: EventDataNode<TreeDataType>;
};

export type NodeMouseEventHandler<
    TreeDataType extends BasicDataNode = DataNode,
    T = HTMLSpanElement
> = (e: React.MouseEvent<T>, node: EventDataNode<TreeDataType>) => void;
export type NodeDragEventHandler<
    TreeDataType extends BasicDataNode = DataNode,
    T = HTMLDivElement
> = (
    e: React.DragEvent<T>,
    node: NodeInstance<TreeDataType>,
    outsideTree?: boolean
) => void;

export interface TreeContextProps<
    TreeDataType extends BasicDataNode = DataNode
> {
    selectable: boolean;
    showIcon: boolean;
    icon: IconType;
    switcherIcon: IconType;
    draggable?: DraggableConfig;
    draggingNodeKey?: React.Key;
    checkable: boolean | React.ReactNode;
    checkStrictly: boolean;
    disabled: boolean;
    keyEntities: Record<Key, DataEntity<any>>;
    // for details see comment in Tree.state (Tree.tsx)
    dropLevelOffset?: number;
    dropContainerKey: Key | null;
    dropTargetKey: Key | null;
    dropPosition: -1 | 0 | 1 | null;
    indent: number | null;
    dropIndicatorRender: (props: {
        dropPosition: -1 | 0 | 1;
        dropLevelOffset: number;
        indent: any;
        direction: string;
    }) => React.ReactNode;
    dragOverNodeKey: Key | null;
    direction: string;

    loadData: (treeNode: EventDataNode<TreeDataType>) => Promise<void>;
    filterTreeNode: (treeNode: EventDataNode<TreeDataType>) => boolean;
    titleRender?: (node: any) => React.ReactNode;

    onNodeClick: NodeMouseEventHandler<TreeDataType>;
    onNodeDoubleClick: NodeMouseEventHandler<TreeDataType>;
    onNodeExpand: NodeMouseEventHandler<TreeDataType>;
    onNodeSelect: NodeMouseEventHandler<TreeDataType>;
    onNodeCheck: (
        e: React.MouseEvent<HTMLSpanElement>,
        treeNode: EventDataNode<TreeDataType>,
        checked: boolean
    ) => void;
    onNodeLoad: (treeNode: EventDataNode<TreeDataType>) => void;
    onNodeMouseEnter: NodeMouseEventHandler<TreeDataType>;
    onNodeMouseLeave: NodeMouseEventHandler<TreeDataType>;
    onNodeContextMenu: NodeMouseEventHandler<TreeDataType>;
    onNodeDragStart: NodeDragEventHandler<any, any>;
    onNodeDragEnter: NodeDragEventHandler<any, any>;
    onNodeDragOver: NodeDragEventHandler<any, any>;
    onNodeDragLeave: NodeDragEventHandler<any, any>;
    onNodeDragEnd: NodeDragEventHandler<any, any>;
    onNodeDrop: NodeDragEventHandler<any, any>;
}

export const TreeContext: React.Context<TreeContextProps<any> | null> =
    React.createContext(null);
