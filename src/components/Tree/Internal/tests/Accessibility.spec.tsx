import React from 'react';
import { eventKeys } from '../../../../shared/eventKeys';
import { render, fireEvent } from '@testing-library/react';
import Tree, { FieldDataNode } from '../';
import { spyConsole } from './util';

describe('Tree Accessibility', () => {
    spyConsole();

    describe('key operation', () => {
        function typeTest(props: any, spaceCallback: any, enterCallback: any) {
            const onExpand = jest.fn();
            const onFocus = jest.fn();
            const onBlur = jest.fn();
            const onKeyDown = jest.fn();
            const onActiveChange = jest.fn();

            function checkKeyDownTrigger() {
                expect(onKeyDown).toHaveBeenCalled();
                onKeyDown.mockReset();
            }

            function checkActiveTrigger(key: string) {
                expect(onActiveChange).toHaveBeenCalledWith(key);
                onActiveChange.mockReset();
            }

            const { container } = render(
                <Tree
                    {...props}
                    onExpand={onExpand}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    onActiveChange={onActiveChange}
                    defaultExpandAll
                    treeData={[
                        {
                            key: 'parent',
                            children: [{ key: 'child 1' }, { key: 'child 2' }],
                        },
                    ]}
                />
            );

            function keyDown(key: string) {
                fireEvent.keyDown(container.querySelector('input'), {
                    key,
                });
            }

            function getTreeNode(index: number) {
                const treeNodes = container
                    .querySelector('.tree-list-holder')
                    .querySelectorAll('.tree-treenode');

                return treeNodes[(index + treeNodes.length) % treeNodes.length];
            }

            // Focus
            fireEvent.focus(container.querySelector('input'));
            expect(onFocus).toHaveBeenCalled();

            // Arrow up: last one
            keyDown(eventKeys.ARROWUP);
            expect(getTreeNode(-1)).toHaveClass('tree-treenode-active');
            checkKeyDownTrigger();
            checkActiveTrigger('child 2');

            // Arrow down: first one
            keyDown(eventKeys.ARROWDOWN);
            expect(getTreeNode(0)).toHaveClass('tree-treenode-active');
            checkKeyDownTrigger();
            checkActiveTrigger('parent');

            // Arrow up: last one again
            keyDown(eventKeys.ARROWUP);
            expect(getTreeNode(-1)).toHaveClass('tree-treenode-active');
            checkKeyDownTrigger();
            checkActiveTrigger('child 2');

            // Arrow left: parent
            keyDown(eventKeys.ARROWLEFT);
            expect(getTreeNode(0)).toHaveClass('tree-treenode-active');
            checkKeyDownTrigger();
            checkActiveTrigger('parent');

            // Arrow left: collapse
            keyDown(eventKeys.ARROWLEFT);
            expect(getTreeNode(0)).toHaveClass('tree-treenode-active');
            expect(onExpand).toHaveBeenCalledWith(
                ['child 1', 'child 2'],
                expect.anything()
            );
            checkKeyDownTrigger();

            // Arrow right: expand
            onExpand.mockReset();
            keyDown(eventKeys.ARROWRIGHT);
            expect(getTreeNode(0)).toHaveClass('tree-treenode-active');
            expect(onExpand).toHaveBeenCalledWith(
                ['child 1', 'child 2', 'parent'],
                expect.anything()
            );
            checkKeyDownTrigger();

            // Arrow right: first child
            onExpand.mockReset();
            keyDown(eventKeys.ARROWRIGHT);
            expect(getTreeNode(1)).toHaveClass('tree-treenode-active');
            checkKeyDownTrigger();
            checkActiveTrigger('child 1');

            // SPACE: confirm
            keyDown(eventKeys.SPACE);
            spaceCallback();
            checkKeyDownTrigger();

            // ENTER: confirm again
            keyDown(eventKeys.ENTER);
            enterCallback();
            checkKeyDownTrigger();

            // Blur
            fireEvent.blur(container.querySelector('input'));
            expect(onBlur).toHaveBeenCalled();

            // null activeKey
            fireEvent.mouseMove(getTreeNode(0));
            checkActiveTrigger(null);

            for (let i = 0; i < 10; i += 1) {
                fireEvent.mouseMove(getTreeNode(0));
                expect(onActiveChange).not.toHaveBeenCalled();
            }
        }

        it('onSelect', () => {
            const onSelect = jest.fn();
            typeTest(
                { onSelect },
                () => {
                    expect(onSelect).toHaveBeenCalledWith(
                        ['child 1'],
                        expect.anything()
                    );
                    onSelect.mockReset();
                },
                () => {
                    expect(onSelect).toHaveBeenCalledWith(
                        [],
                        expect.anything()
                    );
                }
            );
        });

        it('onCheck', () => {
            const onCheck = jest.fn();
            typeTest(
                { onCheck, checkable: true, selectable: false },
                () => {
                    expect(onCheck).toHaveBeenCalledWith(
                        ['child 1'],
                        expect.anything()
                    );
                    onCheck.mockReset();
                },
                () => {
                    expect(onCheck).toHaveBeenCalledWith([], expect.anything());
                }
            );
        });

        it('not crash if not exist', () => {
            const { container } = render(
                <Tree defaultExpandAll treeData={[]} />
            );

            fireEvent.focus(container.querySelector('input'));

            // Arrow should not work
            fireEvent.keyDown(container.querySelector('input'), {
                key: eventKeys.ARROWUP,
            });
            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeFalsy();
        });

        it('remove active if mouse hover', () => {
            const { container } = render(
                <Tree defaultExpandAll treeData={[{ key: 'parent' }]} />
            );

            fireEvent.focus(container.querySelector('input'));

            fireEvent.keyDown(container.querySelector('input'), {
                key: eventKeys.ARROWUP,
            });
            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeTruthy();

            // Mouse move
            fireEvent.mouseMove(
                container.querySelectorAll('.tree-treenode')[1]
            );
            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeFalsy();
        });

        it('fieldNames should also work', () => {
            const onActiveChange = jest.fn();
            const onSelect = jest.fn();

            const { container } = render(
                <Tree<FieldDataNode<{ value: string }>>
                    defaultExpandAll
                    treeData={[{ value: 'first' }, { value: 'second' }]}
                    fieldNames={{ key: 'value' }}
                    onActiveChange={onActiveChange}
                    onSelect={onSelect}
                />
            );

            fireEvent.focus(container.querySelector('input'));

            fireEvent.keyDown(container.querySelector('input'), {
                key: eventKeys.ARROWDOWN,
            });
            expect(onActiveChange).toHaveBeenCalledWith('first');

            fireEvent.keyDown(container.querySelector('input'), {
                key: eventKeys.ARROWDOWN,
            });
            expect(onActiveChange).toHaveBeenCalledWith('second');

            fireEvent.keyDown(container.querySelector('input'), {
                key: eventKeys.ENTER,
            });
            expect(onSelect).toHaveBeenCalledWith(
                ['second'],
                expect.anything()
            );
        });
    });

    it('disabled should prevent keyboard', () => {
        const { container } = render(<Tree disabled />);
        expect(container.querySelector('input')).toHaveAttribute('disabled');
    });

    describe('activeKey in control', () => {
        it('basic', () => {
            const { container, rerender } = render(
                <Tree
                    treeData={[
                        {
                            title: 'Parent',
                            key: 'parent',
                        },
                    ]}
                />
            );

            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeFalsy();

            rerender(
                <Tree
                    treeData={[
                        {
                            title: 'Parent',
                            key: 'parent',
                        },
                    ]}
                    activeKey="parent"
                />
            );
            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeTruthy();
        });

        it('with fieldNames', () => {
            const { container, rerender } = render(
                <Tree<FieldDataNode<{ title: string; value: string }>>
                    fieldNames={{ key: 'value' }}
                    treeData={[
                        {
                            title: 'Parent',
                            value: 'parent',
                        },
                    ]}
                />
            );

            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeFalsy();

            rerender(
                <Tree<FieldDataNode<{ title: string; value: string }>>
                    fieldNames={{ key: 'value' }}
                    treeData={[
                        {
                            title: 'Parent',
                            value: 'parent',
                        },
                    ]}
                    activeKey="parent"
                />
            );
            expect(
                container.querySelector('.tree-treenode-active')
            ).toBeTruthy();
        });
    });
});
