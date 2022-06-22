import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { spyElementPrototypes } from '../../../../tests/domHook';
import Tree, { TreeNode } from '..';
import { objectMatcher, spyConsole } from './util';

const OPEN_CLASSNAME = 'tree-switcher_open';
const CHECKED_CLASSNAME = 'treeCheckboxChecked';

const delay = (timeout = 0) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

describe('Tree Basic', () => {
    spyConsole();

    it('TreeNode is in Tree', () => {
        expect(TreeNode).toBe(Tree.TreeNode);
    });

    it('renders correctly', () => {
        const { asFragment } = render(
            <Tree
                className="forTest"
                selectable
                checkable
                defaultExpandAll
                showIcon
                showLine
                multiple
                focusable
            >
                <TreeNode title="parent 1" key="0-0" classNames="spe">
                    <TreeNode title="leaf 1" key="0-0-0" disabled>
                        <TreeNode title="leaf" key="random" />
                        <TreeNode title="leaf" />
                        {null /* Supports conditional rendering */}
                    </TreeNode>
                    <TreeNode title="leaf 2" key="0-0-1" disableCheckbox />
                </TreeNode>
            </Tree>
        );
        expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('switcherIcon = null, no render tree-switcher null', () => {
        const { container } = render(
            <Tree
                className="forTest"
                defaultExpandAll
                switcherIcon={() => false}
            >
                <TreeNode title="parent 1" key="0-0" classNames="spe">
                    <TreeNode title="leaf 1" key="0-0-0" disabled>
                        <TreeNode title="leaf" key="random" />
                        <TreeNode title="leaf" />
                    </TreeNode>
                    <TreeNode title="leaf 2" key="0-0-1" disableCheckbox />
                </TreeNode>
            </Tree>
        );
        expect(container.querySelector('.treeSwitcher')).toBeFalsy();
    });

    describe('expanded', () => {
        it('controlled by expanded keys', () => {
            const renderTree = (props?: any) => (
                <Tree expandedKeys={[]} {...props}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );

            const { container, rerender } = render(renderTree());
            expect(container.querySelector(`.${OPEN_CLASSNAME}`)).toBeFalsy();
            rerender(renderTree({ expandedKeys: ['0-0'] }));
            expect(container.querySelector(`.${OPEN_CLASSNAME}`)).toBeTruthy();
        });

        it('does not expand parent node when autoExpandParent is false', () => {
            const { container } = render(
                <Tree expandedKeys={['0-0-0']} defaultExpandParent={false}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0">
                            <TreeNode title="leaf" key="0-0-0-0" />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            );
            expect(container.querySelector(`.${OPEN_CLASSNAME}`)).toBeFalsy();
        });

        it('fires expand event', () => {
            const handleExpand = jest.fn();
            const { container } = render(
                <Tree onExpand={handleExpand}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );

            fireEvent.click(container.querySelector('.treeSwitcher'));
            expect(handleExpand).toHaveBeenCalledWith(['0-0'], {
                expanded: true,
                node: expect.objectContaining({
                    key: '0-0',
                    title: 'parent 1',
                }),
                nativeEvent: expect.anything(),
            });

            fireEvent.click(container.querySelector('.treeSwitcher'));
            expect(handleExpand).toHaveBeenCalledWith([], {
                expanded: false,
                node: expect.objectContaining({
                    key: '0-0',
                    title: 'parent 1',
                }),
                nativeEvent: expect.anything(),
            });
        });
    });

    describe('check', () => {
        it('basic render', () => {
            const { asFragment } = render(
                <Tree checkable defaultExpandAll>
                    <TreeNode key="0-0">
                        <TreeNode key="0-0-0" disabled />
                        <TreeNode key="0-0-1" />
                    </TreeNode>
                </Tree>
            );

            expect(asFragment().firstChild).toMatchSnapshot();
        });

        it("ignore disabled children when calculate parent's checked status", () => {
            const { container } = render(
                <Tree checkable defaultCheckedKeys={['0-0-0']}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" disableCheckbox />
                        <TreeNode title="leaf 1" key="0-0-1" />
                    </TreeNode>
                </Tree>
            );
            expect(
                container.querySelector(`.${CHECKED_CLASSNAME}`)
            ).toBeFalsy();
        });

        it('controlled by checkedKeys', () => {
            const renderTree = (props?: any) => (
                <Tree checkable checkedKeys={[]} {...props}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );
            const { container, rerender } = render(renderTree());
            expect(
                container.querySelector(`.${CHECKED_CLASSNAME}`)
            ).toBeFalsy();

            rerender(renderTree({ checkedKeys: ['0-0'] }));
            expect(
                container.querySelector(`.${CHECKED_CLASSNAME}`)
            ).toBeTruthy();
        });

        it('fires check event', () => {
            const handleCheck = jest.fn();
            const { container } = render(
                <Tree checkable onCheck={handleCheck}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );
            fireEvent.click(container.querySelector('.treeSwitcher'));

            const nodeData00 = { title: 'parent 1', key: '0-0' };
            const nodeData000 = { title: 'leaf 1', key: '0-0-0' };

            fireEvent.click(container.querySelectorAll('.treeCheckbox')[0]);
            expect(handleCheck).toHaveBeenCalledWith(
                ['0-0', '0-0-0'],
                objectMatcher({
                    checked: true,
                    checkedNodes: [nodeData00, nodeData000],
                    checkedNodesPositions: [
                        { node: nodeData00, pos: '0-0' },
                        { node: nodeData000, pos: '0-0-0' },
                    ],
                    event: 'check',
                    halfCheckedKeys: [],
                    node: {
                        title: 'parent 1',
                        key: '0-0',
                    },
                    nativeEvent: {},
                })
            );

            fireEvent.click(container.querySelectorAll('.treeCheckbox')[1]);
            expect(handleCheck).toHaveBeenCalledWith(
                [],
                objectMatcher({
                    checked: false,
                    checkedNodes: [],
                    checkedNodesPositions: [],
                    event: 'check',
                    halfCheckedKeys: [],
                    node: {
                        title: 'leaf 1',
                        key: '0-0-0',
                    },
                    nativeEvent: {},
                })
            );
        });

        it('check works correctly after dragging children under another node', () => {
            const renderTree = (children: React.ReactNode) => (
                <Tree defaultExpandAll checkable>
                    {children}
                </Tree>
            );
            const { container, rerender } = render(
                renderTree(
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                        <TreeNode title="leaf 2" key="0-0-1" />
                    </TreeNode>
                )
            );
            fireEvent.click(container.querySelectorAll('.treeCheckbox')[1]);

            rerender(
                renderTree(
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 2" key="0-0-1">
                            <TreeNode title="leaf 1" key="0-0-0" />
                        </TreeNode>
                    </TreeNode>
                )
            );

            expect(() => {
                fireEvent.click(container.querySelectorAll('.treeCheckbox')[2]);
            }).not.toThrow();
        });

        it('check works correctly after adding children dynamically', () => {
            const renderTree = (children: React.ReactNode) => (
                <Tree defaultExpandAll checkable>
                    {children}
                </Tree>
            );
            const { container, rerender } = render(
                renderTree(
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                )
            );

            fireEvent.click(container.querySelectorAll('.treeCheckbox')[1]);
            rerender(
                renderTree(
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                        <TreeNode title="leaf 2" key="0-0-1" />
                    </TreeNode>
                )
            );
            expect(() => {
                fireEvent.click(container.querySelectorAll('.treeCheckbox')[2]);
            }).not.toThrow();
        });

        it('check children after changing from children[disableCheckbox] from true to false', () => {
            let checkedKeys = null;
            const mockHandleCheck = (keys: React.Key[]) => (checkedKeys = keys);
            function Test(props: { disableCheckbox: any }) {
                return (
                    <Tree checkable onCheck={mockHandleCheck}>
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode
                                title="leaf 1"
                                key="0-0-1"
                                disableCheckbox={props.disableCheckbox}
                            />
                            <TreeNode
                                title="leaf 2"
                                key="0-0-2"
                                disableCheckbox={props.disableCheckbox}
                            />
                            <TreeNode
                                title="leaf 3"
                                key="0-0-3"
                                disableCheckbox={props.disableCheckbox}
                            />
                        </TreeNode>
                    </Tree>
                );
            }
            const { container, rerender } = render(<Test disableCheckbox />);
            fireEvent.click(container.querySelectorAll('.treeCheckbox')[0]);
            expect(checkedKeys).toEqual(['0-0']);

            rerender(<Test disableCheckbox={false} />);
            fireEvent.click(container.querySelectorAll('.treeCheckbox')[0]);
            fireEvent.click(container.querySelectorAll('.treeCheckbox')[0]);
            expect(checkedKeys).toEqual(['0-0', '0-0-1', '0-0-2', '0-0-3']);
        });

        it('check dynamic children when their parent is checked', () => {
            const mockLoadData: any = () => new Promise(() => {});
            const renderTree = (children?: React.ReactNode) => (
                <Tree
                    checkable
                    defaultCheckedKeys={['0-0']}
                    loadData={mockLoadData}
                    expandedKeys={['0-0']}
                >
                    {children}
                </Tree>
            );

            const { container, rerender } = render(
                renderTree(<TreeNode title="parent 1" key="0-0" />)
            );
            rerender(
                renderTree(
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                        <TreeNode title="leaf 2" key="0-0-1" />
                    </TreeNode>
                )
            );

            expect(
                container.querySelectorAll(`.${CHECKED_CLASSNAME}`)
            ).toHaveLength(3);
        });

        it('check update when Tree trigger componentWillReceiveProps', () => {
            class Test extends React.Component {
                state = {};

                onCheck = () => {
                    this.setState({ whatever: 1 });
                };

                render() {
                    return (
                        <Tree checkable>
                            <TreeNode title="parent 1" key="0-0" />
                        </Tree>
                    );
                }
            }
            const { container } = render(<Test />);
            fireEvent.click(container.querySelector('.treeCheckbox'));

            expect(container.firstChild).toMatchSnapshot();
        });

        it('should ignore !checkable node', () => {
            const onCheck = jest.fn();
            const { container } = render(
                <Tree checkable defaultExpandAll onCheck={onCheck}>
                    <TreeNode key="0-0">
                        <TreeNode key="0-0-0" checkable={false} />
                        <TreeNode key="0-0-1" />
                    </TreeNode>
                </Tree>
            );

            fireEvent.click(container.querySelectorAll('.treeCheckbox')[1]);

            expect(onCheck.mock.calls[0][0].sort()).toEqual(['0-0', '0-0-1']);
        });

        describe('strictly', () => {
            describe('controlled mode', () => {
                class App extends React.Component {
                    state = {
                        checkedKeys: {
                            checked: [],
                            halfChecked: [],
                        } as any,
                    };

                    handleCheck = (checkedKeys: any) => {
                        this.setState({ checkedKeys });
                    };

                    render() {
                        return (
                            <>
                                <Tree
                                    checkable
                                    checkStrictly
                                    checkedKeys={this.state.checkedKeys}
                                    onCheck={this.handleCheck}
                                >
                                    <TreeNode title="parent 1" key="0-0">
                                        <TreeNode title="leaf 1" key="0-0-0" />
                                    </TreeNode>
                                </Tree>
                                <button
                                    onClick={() => {
                                        this.setState({
                                            checkedKeys: {
                                                checked: ['0-0', '0-0-0'],
                                                halfChecked: [],
                                            },
                                        });
                                    }}
                                />
                            </>
                        );
                    }
                }
            });
        });
    });

    describe('select', () => {
        it('fires select event', () => {
            const handleSelect = jest.fn();
            const { container } = render(
                <Tree selectable onSelect={handleSelect}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );
            const nodeContent = container.querySelector(
                '.treeNodeContentWrapper'
            );

            fireEvent.click(nodeContent);
            expect(handleSelect).toHaveBeenCalledWith(
                ['0-0'],
                objectMatcher({
                    event: 'select',
                    node: {
                        title: 'parent 1',
                        key: '0-0',
                    },
                    selected: true,
                    selectedNodes: [{ title: 'parent 1', key: '0-0' }],
                    nativeEvent: {},
                })
            );

            fireEvent.click(nodeContent);
            expect(handleSelect).toHaveBeenCalledWith(
                [],
                objectMatcher({
                    event: 'select',
                    node: {
                        title: 'parent 1',
                        key: '0-0',
                    },
                    selected: false,
                    selectedNodes: [],
                    nativeEvent: {},
                })
            );
        });
    });

    describe('checkable but not selectable', () => {
        it('fires check event when click on TreeNode', () => {
            const handleCheck = jest.fn();
            const { container } = render(
                <Tree checkable selectable={false} onCheck={handleCheck}>
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf 1" key="0-0-0" />
                    </TreeNode>
                </Tree>
            );
            fireEvent.click(container.querySelector('.treeSwitcher'));

            const dataNode1 = { title: 'parent 1', key: '0-0' };
            const dataNode2 = { title: 'leaf 1', key: '0-0-0' };

            fireEvent.click(container.querySelector('.treeNodeContentWrapper'));
            expect(handleCheck).toHaveBeenCalledWith(
                ['0-0', '0-0-0'],
                objectMatcher({
                    checked: true,
                    checkedNodes: [dataNode1, dataNode2],
                    checkedNodesPositions: [
                        { node: dataNode1, pos: '0-0' },
                        { node: dataNode2, pos: '0-0-0' },
                    ],
                    event: 'check',
                    halfCheckedKeys: [],
                    node: { title: 'parent 1', key: '0-0' },
                    nativeEvent: {},
                })
            );

            fireEvent.click(
                container.querySelectorAll('.treeNodeContentWrapper')[1]
            );
            expect(handleCheck).toHaveBeenCalledWith(
                [],
                objectMatcher({
                    checked: false,
                    checkedNodes: [],
                    checkedNodesPositions: [],
                    event: 'check',
                    halfCheckedKeys: [],
                    node: {
                        title: 'leaf 1',
                        key: '0-0-0',
                    },
                    nativeEvent: {},
                })
            );
        });
    });

    it('fires rightClick event', () => {
        const handleRightClick = jest.fn();
        const { container } = render(
            <Tree onRightClick={handleRightClick}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="leaf 1" key="0-0-0" />
                </TreeNode>
            </Tree>
        );
        fireEvent.contextMenu(
            container.querySelector('.treeNodeContentWrapper')
        );
        expect(handleRightClick.mock.calls[0][0].node).toEqual(
            expect.objectContaining({
                title: 'parent 1',
                key: '0-0',
            })
        );
    });

    it('fires rightClick should not change selected item', () => {
        const onRightClick = jest.fn();
        const onSelect = jest.fn();
        const { container } = render(
            <Tree
                onRightClick={onRightClick}
                selectedKeys={['0-0-0']}
                onSelect={onSelect}
            >
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="leaf 1" key="0-0-0" />
                </TreeNode>
            </Tree>
        );
        fireEvent.contextMenu(
            container.querySelector('.treeNodeContentWrapper')
        );
        expect(onRightClick).toHaveBeenCalled();
        expect(onSelect).not.toHaveBeenCalled();
        expect(container.querySelector('.tree-node-selected')).toBeFalsy();
    });

    it('fires mouseEnter events', () => {
        const handleMouseEnter = jest.fn();
        const { container } = render(
            <Tree onMouseEnter={handleMouseEnter}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="leaf 1" key="0-0-0" />
                </TreeNode>
            </Tree>
        );
        fireEvent.mouseEnter(
            container.querySelector('.treeNodeContentWrapper')
        );
        expect(handleMouseEnter.mock.calls[0][0].node).toEqual(
            expect.objectContaining({
                key: '0-0',
            })
        );
    });

    it('fires mouseLeave events', () => {
        const handleMouseLeave = jest.fn();
        const { container } = render(
            <Tree onMouseLeave={handleMouseLeave}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="leaf 1" key="0-0-0" />
                </TreeNode>
            </Tree>
        );

        fireEvent.mouseLeave(
            container.querySelector('.treeNodeContentWrapper')
        );
        expect(handleMouseLeave.mock.calls[0][0].node).toEqual(
            expect.objectContaining({
                key: '0-0',
            })
        );
    });

    it('loads nodes asynchronously', () => {
        const then = jest.fn(() => Promise.resolve());
        const loadData: any = jest.fn(() => ({ then }));
        const { container } = render(
            <Tree loadData={loadData}>
                <TreeNode title="parent 1" key="0-0" />
            </Tree>
        );
        fireEvent.click(container.querySelector('.treeSwitcher'));
        expect(loadData).toHaveBeenCalledWith(
            expect.objectContaining({
                key: '0-0',
            })
        );
        expect(then).toHaveBeenCalled();
    });

    it('renders without errors', () => {
        expect(() => {
            render(
                <Tree>
                    {[0, 1].map((i) => (
                        <TreeNode title={i} key={i}>
                            {[2, 3].map((j) => (
                                <TreeNode title={j} key={`${i}_${j}`} />
                            ))}
                            <TreeNode title="4" key={`${i}_4`} />
                        </TreeNode>
                    ))}
                </Tree>
            );
        }).not.toThrow();
    });

    it('renders opaque children correctly', () => {
        const { asFragment } = render(
            <Tree>
                <TreeNode title="0" key="0">
                    {[1, 2].map((i) => (
                        <TreeNode title={i} key={i} />
                    ))}
                    <TreeNode title="3" key="3" />
                </TreeNode>
            </Tree>
        );

        expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('Number key', () => {
        const onCheck = jest.fn();

        const Demo = () => {
            const [checkedKeys, setCheckedKeys] = React.useState<any>([]);

            return (
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={(keys) => {
                        setCheckedKeys(keys);
                        onCheck(keys);
                    }}
                    treeData={[
                        {
                            key: 11,
                            title: 11,
                            children: [{ key: 22, title: 22 }],
                        },
                    ]}
                />
            );
        };

        const { container } = render(<Demo />);

        fireEvent.click(container.querySelector('.treeCheckbox'));
        expect(onCheck).toHaveBeenCalledWith([11, 22]);

        onCheck.mockReset();
        fireEvent.click(container.querySelectorAll('.treeCheckbox')[1]);
        expect(onCheck).toHaveBeenCalledWith([]);
    });

    describe('scrollTo should work', () => {
        let domSpy: ReturnType<typeof spyElementPrototypes>;
        let called = false;

        beforeAll(() => {
            domSpy = spyElementPrototypes(HTMLDivElement, {
                scrollTop: {
                    get: () => 233,
                    set: () => {
                        called = true;
                    },
                },
                clientHeight: {
                    get: () => 100,
                },
            });
        });

        afterAll(() => {
            domSpy.mockRestore();
        });

        it('work', () => {
            jest.useFakeTimers();
            const treeRef = React.createRef<any>();
            render(<Tree ref={treeRef} />);

            treeRef.current.scrollTo({ key: 'light', align: 'top' });
            jest.runAllTimers();

            expect(called).toBeTruthy();
            jest.useRealTimers();
        });
    });

    it('not crash if expandedKeys is null', () => {
        render(
            <Tree expandedKeys={null}>
                <TreeNode key="test" title="alive" />
            </Tree>
        );
    });
});
