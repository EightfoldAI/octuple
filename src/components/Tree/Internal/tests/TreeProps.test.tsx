import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tree, { TreeNode, FieldDataNode } from '..';
import { spyConsole, spyError } from './util';

// Promisify timeout to let jest catch works
function timeoutPromise(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

describe('Tree Props', () => {
    spyConsole();

    // showLine
    it('showLine', () => {
        const wrapper = render(<Tree showLine />);
        expect(wrapper.container.firstChild).toMatchSnapshot();
    });

    // showIcon
    it('showIcon', () => {
        const withIcon = render(
            <Tree>
                <TreeNode>
                    <TreeNode>
                        <TreeNode />
                    </TreeNode>
                    <TreeNode />
                </TreeNode>
                <TreeNode />
            </Tree>
        );
        expect(withIcon.container.firstChild).toMatchSnapshot();

        const withoutIcon = render(
            <Tree showIcon={false}>
                <TreeNode>
                    <TreeNode>
                        <TreeNode />
                    </TreeNode>
                    <TreeNode />
                </TreeNode>
                <TreeNode />
            </Tree>
        );
        expect(withoutIcon.container.firstChild).toMatchSnapshot();

        const withOpenIcon = render(
            <Tree defaultExpandedKeys={['0-0']}>
                <TreeNode>
                    <TreeNode key="0-0">
                        <TreeNode />
                    </TreeNode>
                    <TreeNode />
                </TreeNode>
                <TreeNode />
            </Tree>
        );
        expect(withOpenIcon.container.firstChild).toMatchSnapshot();
    });

    describe('selectable', () => {
        // selectable - false
        it('without selectable', () => {
            const handleOnSelect = jest.fn();
            const handleOnCheck = jest.fn();

            const { container } = render(
                <Tree
                    onSelect={handleOnSelect}
                    defaultExpandedKeys={['0-0']}
                    selectable={false}
                >
                    <TreeNode key="0-0">
                        <TreeNode key="0-0-0" />
                    </TreeNode>
                </Tree>
            );

            expect(container.firstChild).toMatchSnapshot();

            fireEvent.click(container.querySelector('.treeNodeContentWrapper'));

            expect(handleOnSelect).not.toHaveBeenCalled();
            expect(handleOnCheck).not.toHaveBeenCalled(); // Will test in checkable
        });
    });

    describe('expandAction with selectable props', () => {
        it('title expandable when selectable is false and expandAction is "click"', () => {
            const onClick = jest.fn();
            const onSelect = jest.fn();
            const onExpand = jest.fn();

            const { container } = render(
                <Tree
                    onClick={onClick}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    defaultExpandedKeys={['0-0']}
                    selectable={false}
                    expandAction="click"
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0">
                            <TreeNode title="leaf-1" key="0-0-0-0" />
                        </TreeNode>

                        <TreeNode title="leaf 2" key="0-1-0">
                            <TreeNode title="leaf-2" key="0-1-0-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            );

            // test trigger expand when click title
            fireEvent.click(container.querySelector('[title="leaf 1"]'));

            expect(onClick).toHaveBeenCalled();
            expect(onSelect).not.toHaveBeenCalled();
            expect(onExpand).toHaveBeenCalledWith(['0-0', '0-0-0'], {
                expanded: true,
                node: expect.anything(),
                nativeEvent: expect.anything(),
            });

            onClick.mockReset();
            onSelect.mockReset();
            onExpand.mockReset();

            // test trigger un-expand when click title again
            fireEvent.click(container.querySelector('[title="leaf 1"]'));

            expect(onClick).toHaveBeenCalled();
            expect(onSelect).not.toHaveBeenCalled();
            expect(onExpand).toHaveBeenCalledWith(['0-0'], {
                expanded: false,
                node: expect.anything(),
                nativeEvent: expect.anything(),
            });
        });

        it('title expandable when selectable is false and expandAction is "doubleClick"', () => {
            const onDoubleClick = jest.fn();
            const onSelect = jest.fn();
            const onExpand = jest.fn();

            const { container } = render(
                <Tree
                    onDoubleClick={onDoubleClick}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    defaultExpandedKeys={['0-0']}
                    selectable={false}
                    expandAction="doubleClick"
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0">
                            <TreeNode title="leaf-1" key="0-0-0-0" />
                        </TreeNode>

                        <TreeNode title="leaf 2" key="0-1-0">
                            <TreeNode title="leaf-2" key="0-1-0-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            );

            // test trigger expand when double click title
            fireEvent.doubleClick(container.querySelector('[title="leaf 1"]'));

            expect(onDoubleClick).toHaveBeenCalled();
            expect(onSelect).not.toHaveBeenCalled();
            expect(onExpand).toHaveBeenCalledWith(['0-0', '0-0-0'], {
                expanded: true,
                node: expect.anything(),
                nativeEvent: expect.anything(),
            });

            onDoubleClick.mockReset();
            onSelect.mockReset();
            onExpand.mockReset();

            // test trigger un-expand when double click title again
            fireEvent.doubleClick(container.querySelector('[title="leaf 1"]'));

            expect(onDoubleClick).toHaveBeenCalled();
            expect(onSelect).not.toHaveBeenCalled();
            expect(onExpand).toHaveBeenCalledWith(['0-0'], {
                expanded: false,
                node: expect.anything(),
                nativeEvent: expect.anything(),
            });
        });

        it('title un-expandable when selectable is false and expandAction is false', () => {
            const onClick = jest.fn();
            const onSelect = jest.fn();
            const onExpand = jest.fn();

            const { container } = render(
                <Tree
                    onClick={onClick}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    defaultExpandedKeys={['0-0']}
                    selectable={false}
                    expandAction={false}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0">
                            <TreeNode title="leaf-1" key="0-0-0-0" />
                        </TreeNode>

                        <TreeNode title="leaf 2" key="0-1-0">
                            <TreeNode title="leaf-2" key="0-1-0-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            );

            // test won't trigger expand when click title if expandAction is false
            fireEvent.click(container.querySelector('[title="leaf 2"]'));

            expect(onClick).toHaveBeenCalled();
            expect(onSelect).not.toHaveBeenCalled();
            expect(onExpand).not.toHaveBeenCalled();
        });
    });

    // checkable
    describe('checkable', () => {
        it('node set checkable to `false`', () => {
            const { container } = render(
                <Tree checkable defaultExpandAll>
                    <TreeNode key="0-0">
                        <TreeNode key="0-0-0" checkable={false} />
                    </TreeNode>
                </Tree>
            );

            expect(container.querySelectorAll('.treeCheckbox')).toHaveLength(1);
        });
    });

    // Don't crash
    describe('invalidate checkedKeys', () => {
        const errorSpy = spyError();

        const genWrapper = (checkedKeys: any) =>
            render(
                <Tree checkedKeys={checkedKeys} defaultExpandAll checkable>
                    <TreeNode key="0-0">
                        <TreeNode key="0-0-0" />
                    </TreeNode>
                </Tree>
            );

        it('null', () => {
            const { container } = genWrapper(null);
            expect(errorSpy()).not.toHaveBeenCalledWith(
                'Warning: `checkedKeys` is not an array or an object'
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    // defaultExpandAll
    it('defaultExpandAll', () => {
        const { container } = render(
            <Tree defaultExpandAll>
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" />
                </TreeNode>
            </Tree>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('icon', () => {
        // Node icon has much higher priority
        const { container } = render(
            <Tree defaultExpandAll icon={<span>ROOT ICON</span>}>
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" icon={<span>CUSTOMIZE ICON</span>} />
                </TreeNode>
            </Tree>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('onClick', () => {
        const onClick = jest.fn();

        const { container } = render(
            <Tree onClick={onClick} defaultExpandedKeys={['0-0']}>
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" />
                </TreeNode>
            </Tree>
        );

        // Select leaf
        fireEvent.click(
            container.querySelectorAll('.treeNodeContentWrapper')[1]
        );

        expect(onClick).toHaveBeenCalledWith(
            expect.objectContaining({}),
            expect.objectContaining({
                key: '0-0-0',
            })
        );
    });

    it('onDoubleClick', () => {
        const onClick = jest.fn();
        const onDoubleClick = jest.fn();

        const { container } = render(
            <Tree
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                defaultExpandedKeys={['0-0']}
            >
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" />
                </TreeNode>
            </Tree>
        );

        // Select leaf
        fireEvent.doubleClick(
            container.querySelectorAll('.treeNodeContentWrapper')[1]
        );

        expect(onClick).not.toHaveBeenCalled();
        expect(onDoubleClick).toHaveBeenCalledWith(
            expect.objectContaining({}),
            expect.objectContaining({
                key: '0-0-0',
            })
        );
    });

    it('onContextMenu', () => {
        const onClick = jest.fn();
        const onContextMenu = jest.fn();

        const { container } = render(
            <Tree
                onClick={onClick}
                onContextMenu={onContextMenu}
                defaultExpandedKeys={['0-0']}
            >
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" />
                </TreeNode>
            </Tree>
        );

        // Select leaf
        fireEvent.contextMenu(
            container.querySelectorAll('.treeNodeContentWrapper')[1]
        );

        expect(onClick).not.toHaveBeenCalled();
        expect(onContextMenu).toHaveBeenCalled();
    });

    describe('loadedKeys & onLoad', () => {
        it('has loadedKeys', () => {
            const loadData = jest.fn(() => Promise.resolve());
            const onLoad = jest.fn();

            const { container } = render(
                <Tree loadedKeys={['0-0']} loadData={loadData} onLoad={onLoad}>
                    <TreeNode key="0-0" />
                </Tree>
            );

            fireEvent.click(container.querySelector('.treeSwitcher'));
            expect(loadData).not.toHaveBeenCalled();
            expect(onLoad).not.toHaveBeenCalled();
        });
    });

    it('treeData', () => {
        const treeData = [
            { key: 'K0', title: 'T0' },
            {
                key: 'K1',
                title: 'T1',
                children: [
                    { key: 'K10', title: 'T10' },
                    {
                        key: 'K11',
                        title: 'T11',
                        children: [
                            { key: 'K110', title: 'T110' },
                            { key: 'K111', title: 'T111' },
                        ],
                    },
                    { key: 'K12', title: 'T12' },
                ],
            },
        ];
        const { container, rerender } = render(
            <Tree treeData={treeData} defaultExpandAll />
        );
        expect(container.firstChild).toMatchSnapshot();

        rerender(
            <Tree treeData={[{ key: 'K0', title: 'T0' }]} defaultExpandAll />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    describe('disabled', () => {
        it('basic', () => {
            const { container } = render(
                <Tree defaultExpandAll disabled>
                    <TreeNode key="0-0" />
                </Tree>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it('treeNode should disabled when tree disabled', () => {
            const { container } = render(
                <Tree defaultExpandAll disabled>
                    <TreeNode key="0-0" disabled={false} />
                </Tree>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('data and aria props', () => {
        it('renders data attributes', () => {
            const { container } = render(<Tree data-test="tree" />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('renders aria attributes', () => {
            const { container } = render(<Tree aria-label="name" />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('custom switcher icon', () => {
        function switcherIcon(text: React.ReactNode, testLeaf?: boolean) {
            const sfc = (props: { isLeaf: boolean }) => {
                if (testLeaf) {
                    return props.isLeaf ? <span>{text}</span> : null;
                }
                return props.isLeaf ? null : <span>{text}</span>;
            };

            return sfc;
        }

        it('switcher icon', () => {
            const { container } = render(
                <Tree
                    defaultExpandAll
                    switcherIcon={switcherIcon('switcherIcon')}
                >
                    <TreeNode key="0-0" />
                    <TreeNode
                        key="0-1"
                        switcherIcon={switcherIcon('switcherIconFromNode0-1')}
                    >
                        <TreeNode key="0-1-0" />
                        <TreeNode key="0-1-1" />
                    </TreeNode>
                </Tree>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it('switcher leaf icon', () => {
            const { container } = render(
                <Tree
                    defaultExpandAll
                    switcherIcon={switcherIcon('switcherLeafIcon', true)}
                >
                    <TreeNode key="0-0" />
                    <TreeNode
                        key="0-1"
                        switcherIcon={switcherIcon(
                            'switcherLeafIconFromNode0-1',
                            true
                        )}
                    />
                    <TreeNode key="0-2">
                        <TreeNode key="0-2-0" />
                        <TreeNode
                            key="0-2-1"
                            switcherIcon={switcherIcon(
                                'switcherLeafIconFromNode0-2-1',
                                true
                            )}
                        />
                    </TreeNode>
                    <TreeNode key="0-3" />
                </Tree>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('titleRender', () => {
        const { container } = render(
            <Tree<FieldDataNode<{ value: string; title?: any }>>
                defaultExpandAll
                titleRender={({ value }) => (
                    <span className="bamboo-span">{value}</span>
                )}
                treeData={[
                    {
                        title: (props: { value: any }) => (
                            <span className="light-span">{props.value}</span>
                        ),
                        value: 'light',
                    },
                    { value: 'bamboo' },
                ]}
            />
        );

        expect(
            container
                .querySelectorAll('.treeTitle')[0]
                .querySelector('.light-span').textContent
        ).toEqual('light');
        expect(
            container
                .querySelectorAll('.treeTitle')[1]
                .querySelector('.bamboo-span').textContent
        ).toEqual('bamboo');
    });
});
