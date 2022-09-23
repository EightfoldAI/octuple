import React from 'react';
import {
    DEFAULT_TREE_NODE_TITLE,
    InternalTreeNodeProps,
    TREE_NODE_ICON_CLOSE,
    TREE_NODE_ICON_OPEN,
    TreeNodeProps,
    TreeNodeState,
} from './OcTree.types';
import { mergeClasses, pickAttrs } from '../../../shared/utilities';
import { TreeContext } from './contextTypes';
import Indent from './Indent';
import { convertNodePropsToEventData } from './utils/treeUtil';

import styles from './octree.module.scss';

class InternalTreeNode extends React.Component<
    InternalTreeNodeProps,
    TreeNodeState
> {
    public state = {
        dragNodeHighlight: false,
    };

    public selectHandle: HTMLSpanElement;

    // Isomorphic needn't load data in server side
    componentDidMount() {
        this.syncLoadData(this.props);
    }

    componentDidUpdate() {
        this.syncLoadData(this.props);
    }

    onSelectorClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        // Click trigger before select/check operation
        const {
            context: { onNodeClick },
        } = this.props;
        onNodeClick(e, convertNodePropsToEventData(this.props));

        if (this.isSelectable()) {
            this.onSelect(e);
        } else {
            this.onCheck(e);
        }
    };

    onSelectorDoubleClick = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        const {
            context: { onNodeDoubleClick },
        } = this.props;
        onNodeDoubleClick(e, convertNodePropsToEventData(this.props));
    };

    onSelect = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (this.isDisabled()) return;

        const {
            context: { onNodeSelect },
        } = this.props;
        e.preventDefault();
        onNodeSelect(e, convertNodePropsToEventData(this.props));
    };

    onCheck = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (this.isDisabled()) return;

        const { disableCheckbox, checked } = this.props;
        const {
            context: { onNodeCheck },
        } = this.props;

        if (!this.isCheckable() || disableCheckbox) return;

        e.preventDefault();
        const targetChecked = !checked;
        onNodeCheck(e, convertNodePropsToEventData(this.props), targetChecked);
    };

    onMouseEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const {
            context: { onNodeMouseEnter },
        } = this.props;
        onNodeMouseEnter(e, convertNodePropsToEventData(this.props));
    };

    onMouseLeave = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const {
            context: { onNodeMouseLeave },
        } = this.props;
        onNodeMouseLeave(e, convertNodePropsToEventData(this.props));
    };

    onContextMenu = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const {
            context: { onNodeContextMenu },
        } = this.props;
        onNodeContextMenu(e, convertNodePropsToEventData(this.props));
    };

    onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDragStart },
        } = this.props;

        e.stopPropagation();
        this.setState({
            dragNodeHighlight: true,
        });
        onNodeDragStart(e, this);

        try {
            // ie throw error
            // firefox-need-it
            e.dataTransfer.setData('text/plain', '');
        } catch (error) {
            // empty
        }
    };

    onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDragEnter },
        } = this.props;

        e.preventDefault();
        e.stopPropagation();
        onNodeDragEnter(e, this);
    };

    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDragOver },
        } = this.props;

        e.preventDefault();
        e.stopPropagation();
        onNodeDragOver(e, this);
    };

    onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDragLeave },
        } = this.props;

        e.stopPropagation();
        onNodeDragLeave(e, this);
    };

    onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDragEnd },
        } = this.props;

        e.stopPropagation();
        this.setState({
            dragNodeHighlight: false,
        });
        onNodeDragEnd(e, this);
    };

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const {
            context: { onNodeDrop },
        } = this.props;

        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dragNodeHighlight: false,
        });
        onNodeDrop(e, this);
    };

    // Disabled item still can be switch
    onExpand: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const {
            loading,
            context: { onNodeExpand },
        } = this.props;
        if (loading) return;
        onNodeExpand(e, convertNodePropsToEventData(this.props));
    };

    // Drag usage
    setSelectHandle = (node: HTMLSpanElement) => {
        this.selectHandle = node;
    };

    getNodeState = () => {
        const { expanded } = this.props;

        if (this.isLeaf()) {
            return null;
        }

        return expanded ? TREE_NODE_ICON_OPEN : TREE_NODE_ICON_CLOSE;
    };

    hasChildren = () => {
        const { eventKey } = this.props;
        const {
            context: { keyEntities },
        } = this.props;
        const { children } = keyEntities[eventKey] || {};

        return !!(children || []).length;
    };

    isLeaf = () => {
        const { isLeaf, loaded } = this.props;
        const {
            context: { loadData },
        } = this.props;

        const hasChildren = this.hasChildren();

        if (isLeaf === false) {
            return false;
        }

        return (
            isLeaf ||
            (!loadData && !hasChildren) ||
            (loadData && loaded && !hasChildren)
        );
    };

    isDisabled = () => {
        const { disabled } = this.props;
        const {
            context: { disabled: treeDisabled },
        } = this.props;

        return !!(treeDisabled || disabled);
    };

    isCheckable = () => {
        const { checkable } = this.props;
        const {
            context: { checkable: treeCheckable },
        } = this.props;

        // Return false if tree or treeNode is not checkable
        if (!treeCheckable || checkable === false) return false;
        return treeCheckable;
    };

    // Load data to avoid default expanded tree without data
    syncLoadData = (
        props: Readonly<InternalTreeNodeProps> &
            Readonly<{ children?: React.ReactNode }>
    ) => {
        const { expanded, loading, loaded } = props;
        const {
            context: { loadData, onNodeLoad },
        } = this.props;

        if (loading) {
            return;
        }

        // read from state to avoid loadData at same time
        if (loadData && expanded && !this.isLeaf()) {
            // We needn't reload data when has children in sync logic
            // It's only needed in node expanded
            if (!this.hasChildren() && !loaded) {
                onNodeLoad(convertNodePropsToEventData(this.props));
            }
        }
    };

    isSelectable() {
        const { selectable } = this.props;
        const {
            context: { selectable: treeSelectable },
        } = this.props;

        // Ignore when selectable is undefined or null
        if (typeof selectable === 'boolean') {
            return selectable;
        }

        return treeSelectable;
    }

    isDraggable = () => {
        const {
            data,
            context: { draggable },
        } = this.props;

        return !!(
            draggable &&
            (!draggable.nodeDraggable || draggable.nodeDraggable(data))
        );
    };

    // ==================== Render: Drag Handler ====================
    renderDragHandler = () => {
        const {
            context: { draggable },
        } = this.props;

        return draggable?.icon ? (
            <span className={styles.treeDraggableIcon}>{draggable.icon}</span>
        ) : null;
    };

    // ====================== Render: Switcher ======================
    renderSwitcherIconDom = (isLeaf: boolean) => {
        const { switcherIcon: switcherIconFromProps } = this.props;
        const {
            context: { switcherIcon: switcherIconFromCtx },
        } = this.props;

        const switcherIcon = switcherIconFromProps || switcherIconFromCtx;
        // if switcherIconDom is null, no render switcher span
        if (typeof switcherIcon === 'function') {
            return switcherIcon({ ...this.props, isLeaf });
        }
        return switcherIcon;
    };

    // Switcher
    renderSwitcher = () => {
        const { expanded } = this.props;

        if (this.isLeaf()) {
            // if switcherIconDom is null, no render switcher span
            const switcherIconDom = this.renderSwitcherIconDom(true);

            return switcherIconDom !== false ? (
                <span
                    className={mergeClasses([
                        styles.treeSwitcher,
                        styles.treeSwitcherNoop,
                    ])}
                >
                    {switcherIconDom}
                </span>
            ) : null;
        }

        const switcherCls = mergeClasses([
            styles.treeSwitcher,
            (styles as any)[
                `tree-switcher_${
                    expanded ? TREE_NODE_ICON_OPEN : TREE_NODE_ICON_CLOSE
                }`
            ],
        ]);

        const switcherIconDom = this.renderSwitcherIconDom(false);

        return switcherIconDom !== false ? (
            <span onClick={this.onExpand} className={switcherCls}>
                {switcherIconDom}
            </span>
        ) : null;
    };

    // ====================== Render: Checkbox ======================
    // Checkbox
    renderCheckbox = () => {
        const { checked, halfChecked, disableCheckbox } = this.props;
        const disabled = this.isDisabled();
        const checkable = this.isCheckable();

        if (!checkable) return null;

        // [Legacy] Custom element should be separate with `checkable` in future
        const $custom = typeof checkable !== 'boolean' ? checkable : null;

        return (
            <span
                className={mergeClasses([
                    styles.treeCheckbox,
                    checked && styles.treeCheckboxChecked,
                    !checked && halfChecked && styles.treeCheckboxIndeterminate,
                    (disabled || disableCheckbox) &&
                        styles.treeCheckboxDisabled,
                ])}
                onClick={this.onCheck}
            >
                {$custom}
            </span>
        );
    };

    // ==================== Render: Title + Icon ====================
    renderIcon = () => {
        const { loading } = this.props;

        return (
            <span
                className={mergeClasses([
                    styles.treeIconEle,
                    `tree-icon__${this.getNodeState() || 'docu'}`,
                    loading && styles.treeIconLoading,
                ])}
            />
        );
    };

    // Icon + Title
    renderSelector = () => {
        const { dragNodeHighlight } = this.state;
        const { title, selected, icon, loading, data } = this.props;
        const {
            context: { showIcon, icon: treeIcon, loadData, titleRender },
        } = this.props;
        const disabled = this.isDisabled();

        const wrapClass = styles.treeNodeContentWrapper;

        // Icon - Still show loading icon when loading without showIcon
        let $icon;

        if (showIcon) {
            const currentIcon = icon || treeIcon;

            $icon = currentIcon ? (
                <span
                    className={mergeClasses([
                        styles.treeIconEle,
                        styles.treeIconCustomize,
                    ])}
                >
                    {typeof currentIcon === 'function'
                        ? currentIcon(this.props)
                        : currentIcon}
                </span>
            ) : (
                this.renderIcon()
            );
        } else if (loadData && loading) {
            $icon = this.renderIcon();
        }

        // Title
        let titleNode: React.ReactNode;
        if (typeof title === 'function') {
            titleNode = title(data);
        } else if (titleRender) {
            titleNode = titleRender(data);
        } else {
            titleNode = title;
        }

        const $title = <span className={styles.treeTitle}>{titleNode}</span>;

        return (
            <span
                ref={this.setSelectHandle}
                title={typeof title === 'string' ? title : ''}
                className={mergeClasses([
                    `${wrapClass}`,
                    `${wrapClass}-${this.getNodeState() || 'normal'}`,
                    !disabled &&
                        (selected || dragNodeHighlight) &&
                        styles.treeNodeSelected,
                ])}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onContextMenu={this.onContextMenu}
                onClick={this.onSelectorClick}
                onDoubleClick={this.onSelectorDoubleClick}
            >
                {$icon}
                {$title}
                {this.renderDropIndicator()}
            </span>
        );
    };

    // =================== Render: Drop Indicator ===================
    renderDropIndicator = () => {
        const { disabled, eventKey } = this.props;
        const {
            context: {
                draggable,
                dropLevelOffset,
                dropPosition,
                indent,
                dropIndicatorRender,
                dragOverNodeKey,
                direction,
            },
        } = this.props;
        const rootDraggable = draggable !== false;
        // allowDrop is calculated in Tree.tsx, there is no need for calc it here
        const showIndicator =
            !disabled && rootDraggable && dragOverNodeKey === eventKey;
        return showIndicator
            ? dropIndicatorRender({
                  dropPosition,
                  dropLevelOffset,
                  indent,
                  direction,
              })
            : null;
    };

    // =========================== Render ===========================
    render() {
        const {
            eventKey,
            classNames,
            style,
            dragOver,
            dragOverGapTop,
            dragOverGapBottom,
            isLeaf,
            isStart,
            isEnd,
            expanded,
            selected,
            checked,
            halfChecked,
            loading,
            domRef,
            active,
            data,
            onMouseMove,
            selectable,
            ...otherProps
        } = this.props;
        const {
            context: {
                filterTreeNode,
                keyEntities,
                dropContainerKey,
                dropTargetKey,
                draggingNodeKey,
            },
        } = this.props;
        const disabled = this.isDisabled();
        const dataOrAriaAttributeProps = pickAttrs(otherProps, {
            aria: true,
            data: true,
        });
        const { level } = keyEntities[eventKey] || {};
        const isEndNode = isEnd[isEnd.length - 1];

        const mergedDraggable = this.isDraggable();
        const draggableWithoutDisabled = !disabled && mergedDraggable;

        const dragging = draggingNodeKey === eventKey;
        const ariaSelected =
            selectable !== undefined
                ? { 'aria-selected': !!selectable }
                : undefined;

        return (
            <div
                ref={domRef}
                className={mergeClasses([
                    classNames,
                    styles.treeTreenode,
                    { [styles.treeTreenodeDisabled]: disabled },
                    {
                        [`tree-treenode-switcher-${
                            expanded ? 'open' : 'close'
                        }`]: !isLeaf,
                    },
                    { ['tree-treenode-checkbox-checked']: checked },
                    {
                        ['tree-treenode-checkbox-indeterminate']: halfChecked,
                    },
                    { ['tree-treenode-selected']: selected },
                    { ['tree-treenode-loading']: loading },
                    { ['tree-treenode-active']: active },
                    { ['tree-treenode-leaf-last']: isEndNode },
                    {
                        ['tree-treenode-draggable']: draggableWithoutDisabled,
                    },

                    dragging,
                    { [styles.dropTarget]: dropTargetKey === eventKey },
                    { [styles.dropContainer]: dropContainerKey === eventKey },
                    { ['drag-over']: !disabled && dragOver },
                    { ['drag-over-gap-top']: !disabled && dragOverGapTop },
                    {
                        ['drag-over-gap-bottom']:
                            !disabled && dragOverGapBottom,
                    },
                    {
                        [styles.filterNode]:
                            filterTreeNode &&
                            filterTreeNode(
                                convertNodePropsToEventData(this.props)
                            ),
                    },
                ])}
                style={style}
                // Draggable config
                draggable={draggableWithoutDisabled}
                aria-grabbed={dragging}
                onDragStart={
                    draggableWithoutDisabled ? this.onDragStart : undefined
                }
                // Drop config
                onDragEnter={mergedDraggable ? this.onDragEnter : undefined}
                onDragOver={mergedDraggable ? this.onDragOver : undefined}
                onDragLeave={mergedDraggable ? this.onDragLeave : undefined}
                onDrop={mergedDraggable ? this.onDrop : undefined}
                onDragEnd={mergedDraggable ? this.onDragEnd : undefined}
                onMouseMove={onMouseMove}
                {...ariaSelected}
                {...dataOrAriaAttributeProps}
            >
                <Indent level={level} isStart={isStart} isEnd={isEnd} />
                {this.renderDragHandler()}
                {this.renderSwitcher()}
                {this.renderCheckbox()}
                {this.renderSelector()}
            </div>
        );
    }
}

const ContextTreeNode: React.FC<TreeNodeProps> = (props) => (
    <TreeContext.Consumer>
        {(context) => <InternalTreeNode {...props} context={context} />}
    </TreeContext.Consumer>
);

ContextTreeNode.displayName = 'TreeNode';

ContextTreeNode.defaultProps = {
    title: DEFAULT_TREE_NODE_TITLE,
};

(ContextTreeNode as any).isTreeNode = 1;

export { InternalTreeNode };

export default ContextTreeNode;
