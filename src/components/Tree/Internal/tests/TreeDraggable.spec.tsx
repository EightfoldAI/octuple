import React from 'react';
import { render, fireEvent, act, createEvent } from '@testing-library/react';
import { spyElementPrototypes } from './domHook';
import Tree, { TreeNode } from '../';

const delay = (timeout: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

describe('Tree Draggable', () => {
    function createTree(props?: any) {
        return (
            <Tree draggable defaultExpandAll {...props}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode
                        classNames="dragTarget"
                        title="leaf"
                        key="0-0-0-0"
                    />
                    <TreeNode
                        classNames="dropTarget"
                        title="leaf"
                        key="0-0-0-1"
                    />
                </TreeNode>
            </Tree>
        );
    }

    function fireDragEvent(
        ele: HTMLElement,
        eventName: string,
        data: object = {}
    ) {
        const event = (createEvent as any)[eventName](ele);
        Object.keys(data).forEach((key) => {
            event[key] = (data as any)[key];
        });
        fireEvent(ele, event);
    }

    it('fires dragStart event', () => {
        const onDragStart = jest.fn();
        const { container } = render(createTree({ onDragStart }));
        const treeNode = container.querySelector(
            '.dragTarget > .treeNodeContentWrapper'
        );
        fireEvent.dragStart(treeNode);
        const event = onDragStart.mock.calls[0][0];
        expect(event.node).toEqual(
            expect.objectContaining({
                key: '0-0-0-0',
            })
        );
    });

    it('fires dragEnter event', async () => {
        const onDragEnter = jest.fn();
        const { container } = render(createTree({ onDragEnter }));

        fireEvent.dragStart(
            container.querySelector('.dragTarget > .treeNodeContentWrapper')
        );

        // Not trigger self
        fireEvent.dragEnter(
            container.querySelector('.dragTarget > .treeNodeContentWrapper')
        );

        await act(async () => {
            await delay(900);
        });
        expect(onDragEnter).not.toHaveBeenCalled();

        fireEvent.dragEnter(container.querySelector('.dropTarget'));
        expect(onDragEnter).toHaveBeenCalled();

        await act(async () => {
            await delay(900);
        });
        const event = onDragEnter.mock.calls[0][0];
        expect(event.node.key).toEqual('0-0-0-1');
        expect(event.expandedKeys).toEqual(['0-0', '0-0-0-1']);
        expect(onDragEnter).toHaveBeenCalledTimes(1);
    });

    it('fires dragOver event', () => {
        const onDragOver = jest.fn();
        const { container } = render(createTree({ onDragOver }));
        fireEvent.dragStart(
            container.querySelector('.dragTarget > .treeNodeContentWrapper')
        );
        fireEvent.dragOver(container.querySelector('.dropTarget'));
        const event = onDragOver.mock.calls[0][0];
        expect(event.node).toEqual(
            expect.objectContaining({
                key: '0-0-0-1',
            })
        );
    });

    it('fires dragLeave event', () => {
        const onDragLeave = jest.fn();
        const { container } = render(createTree({ onDragLeave }));
        fireEvent.dragLeave(container.querySelector('.dropTarget'));
        const event = onDragLeave.mock.calls[0][0];
        expect(event.node).toEqual(
            expect.objectContaining({
                key: '0-0-0-1',
            })
        );
    });

    it('fires drop event', () => {
        const onDrop = jest.fn();
        const { container } = render(createTree({ onDrop }));
        fireEvent.dragStart(
            container.querySelector('.dragTarget > .treeNodeContentWrapper')
        );
        fireEvent.dragEnter(container.querySelector('.dropTarget'));
        fireEvent.dragOver(container.querySelector('.dropTarget'));
        fireEvent.drop(container.querySelector('.dropTarget'));
        const event = onDrop.mock.calls[0][0];
        expect(event.node).toEqual(expect.objectContaining({ key: '0-0-0-1' }));
        expect(event.dragNode).toEqual(
            expect.objectContaining({ key: '0-0-0-0' })
        );
        expect(event.dragNodesKeys).toEqual(['0-0-0-0']);
    });

    it('fires dropEnd event', () => {
        const onDragEnd = jest.fn();
        const { container } = render(createTree({ onDragEnd }));
        fireEvent.dragEnd(
            container.querySelector('.dragTarget > .treeNodeContentWrapper')
        );
        const event = onDragEnd.mock.calls[0][0];
        expect(event.node).toEqual(
            expect.objectContaining({
                key: '0-0-0-0',
            })
        );
    });

    it('do not throw error when drag into another non-drag-able tree', () => {
        const { container } = render(
            <>
                <div className="tree1">{createTree()}</div>
                <div className="tree2">{createTree({ draggable: false })}</div>
            </>
        );

        const dragTree = container.querySelector('.tree1');
        const normalTree = container.querySelector('.tree2');

        fireEvent.dragStart(
            dragTree.querySelector('.dragTarget > .treeNodeContentWrapper')
        );
        fireEvent.dragEnter(normalTree.querySelector('.dropTarget'));
        fireEvent.dragOver(normalTree.querySelector('.dropTarget'));
        fireEvent.drop(normalTree.querySelector('.dropTarget'));
    });

    describe('full steps', () => {
        function dropTarget(targetSelector: string) {
            return new Promise<void>((resolve) => {
                const { container } = render(
                    <Tree
                        draggable={() => true}
                        defaultExpandAll
                        onExpand={() => {}}
                    >
                        <TreeNode key="0-0" classNames="dragTarget">
                            <TreeNode
                                key="0-0-0"
                                classNames="dragTargetChild"
                            />
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0" />
                        </TreeNode>
                        <TreeNode key="0-2" classNames="dropTarget">
                            <TreeNode key="0-2-0" />
                        </TreeNode>
                    </Tree>
                );

                fireEvent.dragStart(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    )
                );

                // 1. Move into target (first in the middle of the node)
                fireEvent.dragEnter(container.querySelector(targetSelector), {
                    clientY: 10,
                });
                setTimeout(() => {
                    fireEvent.dragOver(
                        container.querySelector(targetSelector),
                        { clientY: 999 }
                    );

                    // 2. Move out of target
                    fireEvent.dragLeave(
                        container.querySelector(targetSelector)
                    );

                    // 3. Move in again
                    fireEvent.dragEnter(
                        container.querySelector(targetSelector),
                        { clientY: 0 }
                    );

                    setTimeout(() => {
                        fireEvent.dragOver(
                            container.querySelector(targetSelector),
                            { clientY: 999 }
                        );

                        // 4. Drop
                        fireEvent.drop(container.querySelector(targetSelector));
                        fireEvent.dragEnd(
                            container.querySelector('.dragTarget')
                        );

                        resolve();
                    }, 1000);
                }, 10);
            });
        }

        let domSpy: { mockRestore: () => void };
        beforeEach(() => {
            domSpy = spyElementPrototypes(HTMLElement, {
                offsetWidth: {
                    get() {
                        return 24;
                    },
                },
                getBoundingClientRect: jest.fn(() => ({
                    width: 100,
                    height: 20,
                    top: 0,
                    left: 0,
                    bottom: 20,
                    right: 100,
                })),
            });
        });

        afterEach(() => {
            domSpy.mockRestore();
        });

        it('self', () => {
            act(() => {
                dropTarget('div.dragTarget');
            });
        });

        it('target', () => {
            act(() => {
                dropTarget('div.dropTarget');
            });
        });
    });

    describe('new drop logic', () => {
        let domSpy: { mockRestore: () => void };
        beforeEach(() => {
            domSpy = spyElementPrototypes(HTMLElement, {
                getBoundingClientRect: () => ({
                    width: 100,
                    height: 20,
                    top: 0,
                    left: 0,
                    bottom: 20,
                    right: 100,
                }),
                offsetWidth: {
                    get() {
                        return 24;
                    },
                },
            });
        });

        afterEach(() => {
            domSpy.mockRestore();
        });

        (['ltr', 'rtl'] as const).forEach((dir) => {
            const base = dir === 'ltr' ? 1 : -1;

            it('not allow cross level dnd on expanded nodes', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        onDrop={onDrop}
                        direction={dir}
                        expandedKeys={['0-0', '0-1', '0-1-0']}
                    >
                        <TreeNode key="0-0">
                            <TreeNode key="0-0-0" classNames="dropTarget1">
                                <TreeNode key="0-0-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0" classNames="dropTarget2">
                                <TreeNode key="0-1-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-2" classNames="dragTarget" />
                    </Tree>
                );

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget1 > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget1 > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget1 > .treeNodeContentWrapper'
                    )
                );

                // insert after 0-0, since 0-0-0 is not expanded
                expect(onDrop.mock.calls[0][0].node.key).toEqual('0-0');
                expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget2 > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget2 > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget2 > .treeNodeContentWrapper'
                    )
                );

                // insert into 0-1-0, since it is expanded, do not allow cross level dnd
                expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0');
                expect(onDrop.mock.calls[1][0].dropPosition).toEqual(0);
            });

            it('allowDrop all nodes', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0">
                                <TreeNode
                                    key="0-1-0-0"
                                    classNames="dropTarget"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-2" />
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );

                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );

                expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1-0-0');
                // (in ltr) drag from right to left, should be insert after, so drop position is 1
                expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );

                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );

                expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[1][0].dropPosition).toEqual(1);

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );

                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );

                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[2][0].dropPosition).toEqual(0);

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[2][0].dropPosition).toEqual(0);
            });

            it('allowDrop no node', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        onDrop={onDrop}
                        allowDrop={() => false}
                        direction={dir}
                    >
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0" classNames="dropTargetParent">
                                <TreeNode
                                    key="0-1-0-0"
                                    classNames="dropTarget"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-2" />
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTargetParent > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTargetParent > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTargetParent > .treeNodeContentWrapper'
                    )
                );
                // not allow any dropPosition except 0 on expanded node
                expect(onDrop).not.toHaveBeenCalled();

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();

                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();
            });

            it('drop to top half of first node', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-1" classNames="dropTarget">
                            <TreeNode key="0-1-0">
                                <TreeNode key="0-1-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 0,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: -1000,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1');
                expect(onDrop.mock.calls[0][0].dropPosition).toEqual(-1);
            });

            it('can drop on its direct parent', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-1" classNames="dropTarget">
                            <TreeNode key="0-1-0">
                                <TreeNode key="0-1-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTargetParent > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTargetParent > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dragTargetParent > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).toHaveBeenCalled();
            });

            it('cover window dragend & componentWillUnmount', () => {
                const { container, unmount } = render(
                    <Tree draggable defaultExpandAll direction={dir}>
                        <TreeNode key="0-1" classNames="dropTarget">
                            <TreeNode key="0-1-0">
                                <TreeNode key="0-1-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                window.dispatchEvent(new Event('dragend'));
                unmount();
            });

            it('dragover self', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-1" classNames="dropTarget">
                            <TreeNode key="0-1-0">
                                <TreeNode key="0-1-0-0" />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-0" classNames="dragTargetParent">
                            <TreeNode key="0-0-0" classNames="dragTarget">
                                <TreeNode
                                    key="0-0-0-0"
                                    classNames="dragTargetChild"
                                />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 500,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();
            });

            it('not allowDrop on node which has children', () => {
                const onDrop = jest.fn();
                const allowDrop = (props: {
                    dropNode: any;
                    dropPosition: any;
                }) => {
                    if (!props.dropNode.children) {
                        if (props.dropPosition === 0) return false;
                    }
                    return true;
                };
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        allowDrop={allowDrop}
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-0" classNames="dragTarget">
                            <TreeNode
                                key="0-0-0"
                                classNames="dragTargetChild"
                            />
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0">
                                <TreeNode
                                    key="0-1-0-0"
                                    classNames="dropTarget"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-2" />
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1-0-0');
                // (in ltr) drag from right to left, should be insert after, so drop position is 1
                expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 500,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[1][0].dropPosition).toEqual(1);
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 550,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[2][0].dropPosition).toEqual(1);
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 600,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
                expect(onDrop.mock.calls[2][0].dropPosition).toEqual(1);
            });

            it('allowDrop should pass dragNode and dropNode', () => {
                const onDrop = jest.fn();
                const allowDrop = jest.fn();
                const { container } = render(
                    <Tree
                        draggable
                        defaultExpandAll
                        allowDrop={allowDrop}
                        onDrop={onDrop}
                        direction={dir}
                    >
                        <TreeNode key="0-0" classNames="dragTarget">
                            <TreeNode
                                key="0-0-0"
                                classNames="dragTargetChild"
                            />
                        </TreeNode>
                        <TreeNode key="0-1">
                            <TreeNode key="0-1-0">
                                <TreeNode
                                    key="0-1-0-0"
                                    classNames="dropTarget"
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode key="0-2" />
                    </Tree>
                );
                fireDragEvent(
                    container.querySelector(
                        '.dragTarget > .treeNodeContentWrapper'
                    ),
                    'dragStart',
                    {
                        clientX: base * 500,
                        clientY: 500,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragEnter',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireDragEvent(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    ),
                    'dragOver',
                    {
                        clientX: base * 400,
                        clientY: 600,
                    }
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(allowDrop.mock.calls[0][0].dragNode.key).toEqual('0-0');
                expect(allowDrop.mock.calls[0][0].dropNode.key).toEqual(
                    '0-1-0-0'
                );
            });

            it('not allow dragging elements outside into tree', () => {
                const onDrop = jest.fn();
                const { container } = render(
                    <div>
                        <Tree
                            draggable
                            defaultExpandAll
                            onDrop={onDrop}
                            direction={dir}
                        >
                            <TreeNode key="0-0">
                                <TreeNode key="0-0-0" classNames="dropTarget" />
                            </TreeNode>
                        </Tree>
                        <div className="dragTarget">Element outside</div>
                    </div>
                );
                fireEvent.dragStart(container.querySelector('.dragTarget'));
                fireEvent.dragEnter(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                fireEvent.dragOver(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                fireEvent.drop(
                    container.querySelector(
                        '.dropTarget > .treeNodeContentWrapper'
                    )
                );
                expect(onDrop).not.toHaveBeenCalled();
            });
        });
    });

    it('render handler', () => {
        const { container } = render(
            <Tree
                draggable={{
                    icon: <span className="handler" />,
                }}
                defaultExpandAll
                treeData={[
                    {
                        title: 'Parent',
                        key: 'parent',
                        children: [
                            {
                                title: 'Child',
                                key: 'child',
                            },
                        ],
                    },
                ]}
            />
        );

        expect(container.querySelectorAll('.handler')).toHaveLength(2);
    });
});
