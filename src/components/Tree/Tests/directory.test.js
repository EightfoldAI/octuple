import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { debounce } from '../../../shared/utilities';
import Tree from '../index';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

const { DirectoryTree, TreeNode } = Tree;

jest.mock('../../../shared/utilities/debounce');

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('Directory Tree', () => {
    debounce.mockImplementation((fn) => fn);

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
        debounce.mockRestore();
    });

    function createTree(props) {
        return (
            <DirectoryTree {...props}>
                <TreeNode key="0-0">
                    <TreeNode key="0-0-0" />
                </TreeNode>
            </DirectoryTree>
        );
    }

    describe('expand', () => {
        it('click', () => {
            const wrapper = mount(createTree());

            act(() => {
                wrapper
                    .find(TreeNode)
                    .find('.tree-node-content-wrapper')
                    .at(0)
                    .simulate('click');
            });
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/directory.expandclick1.shot'
            );
            jest.runAllTimers();
            act(() => {
                wrapper
                    .find(TreeNode)
                    .find('.tree-node-content-wrapper')
                    .at(0)
                    .simulate('click');
            });
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/directory.expandclick2.shot'
            );
        });

        it('double click', () => {
            const wrapper = mount(createTree({ expandAction: 'doubleClick' }));

            act(() => {
                wrapper
                    .find(TreeNode)
                    .find('.tree-node-content-wrapper')
                    .at(0)
                    .simulate('doubleClick');
            });
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/directory.doubleclick1.shot'
            );
            jest.runAllTimers();
            act(() => {
                wrapper
                    .find(TreeNode)
                    .find('.tree-node-content-wrapper')
                    .at(0)
                    .simulate('doubleClick');
            });
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/directory.doubleclick2.shot'
            );
        });

        describe('with state control', () => {
            class StateDirTree extends React.Component {
                state = {
                    expandedKeys: [],
                };

                onExpand = (expandedKeys) => {
                    this.setState({ expandedKeys });
                };

                render() {
                    const { expandedKeys } = this.state;

                    return (
                        <DirectoryTree
                            expandedKeys={expandedKeys}
                            onExpand={this.onExpand}
                            {...this.props}
                        >
                            <TreeNode key="0-0" title="parent">
                                <TreeNode key="0-0-0" title="children" />
                            </TreeNode>
                        </DirectoryTree>
                    );
                }
            }

            ['click', 'doubleClick'].forEach((action) => {
                it(action, () => {
                    const wrapper = mount(
                        <StateDirTree expandAction={action} />
                    );

                    act(() => {
                        wrapper
                            .find(TreeNode)
                            .find('.tree-node-content-wrapper')
                            .at(0)
                            .simulate(action);
                    });
                    jest.runAllTimers();
                    expect(wrapper.render()).toMatchSpecificSnapshot(
                        `./__snapshots__/directory.statecontrol${action}.shot`
                    );
                });
            });
        });
    });

    it('defaultExpandAll', () => {
        const wrapper = render(createTree({ defaultExpandAll: true }));
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/directory.defaultexpandall.shot'
        );
    });

    it('DirectoryTree should expand all when use treeData and defaultExpandAll is true', () => {
        const treeData = [
            {
                key: '0-0',
                title: 'Folder',
                children: [
                    {
                        key: '0-0-0',
                        title: 'Folder1',
                    },
                ],
            },
        ];
        const wrapper = render(
            createTree({ defaultExpandAll: true, treeData })
        );
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/directory.expandalldata.shot'
        );
    });

    it('defaultExpandParent', () => {
        const wrapper = render(createTree({ defaultExpandParent: true }));
        expect(wrapper).toMatchSpecificSnapshot(
            './__snapshots__/directory.expandparentdefault.shot'
        );
    });

    it('expandedKeys update', () => {
        const wrapper = mount(createTree());
        act(() => {
            wrapper.setProps({ expandedKeys: ['0-0'] });
        });
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/directory.expandkeysupdate.shot'
        );
    });

    it('selectedKeys update', () => {
        const wrapper = mount(createTree({ defaultExpandAll: true }));
        act(() => {
            wrapper.setProps({ selectedKeys: ['0-0-0'] });
        });
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/directory.selectedkeysupdate.shot'
        );
    });

    it('group select', () => {
        let nativeEventProto = null;
        const onSelect = jest.fn();
        const wrapper = mount(
            createTree({
                defaultExpandAll: true,
                expandAction: 'doubleClick',
                multiple: true,
                onClick: (e) => {
                    nativeEventProto = Object.getPrototypeOf(e.nativeEvent);
                },
                onSelect,
            })
        );

        act(() => {
            wrapper
                .find(TreeNode)
                .find('.tree-node-content-wrapper')
                .at(0)
                .simulate('click');
        });
        expect(onSelect.mock.calls[0][1].selected).toBeTruthy();
        expect(onSelect.mock.calls[0][1].selectedNodes.length).toBe(1);

        // Click twice should keep selected
        act(() => {
            wrapper
                .find(TreeNode)
                .find('.tree-node-content-wrapper')
                .at(0)
                .simulate('click');
        });
        expect(onSelect.mock.calls[1][1].selected).toBeTruthy();
        expect(onSelect.mock.calls[0][0]).toEqual(onSelect.mock.calls[1][0]);
        expect(onSelect.mock.calls[1][1].selectedNodes.length).toBe(1);

        // React not simulate full of NativeEvent. Hook it.
        // Ref: https://github.com/facebook/react/blob/master/packages/react-dom/src/test-utils/ReactTestUtils.js#L360
        nativeEventProto.ctrlKey = true;

        act(() => {
            wrapper
                .find(TreeNode)
                .find('.tree-node-content-wrapper')
                .at(1)
                .simulate('click');
        });
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/directory.groupselect1.shot'
        );
        expect(onSelect.mock.calls[2][0].length).toBe(2);
        expect(onSelect.mock.calls[2][1].selected).toBeTruthy();
        expect(onSelect.mock.calls[2][1].selectedNodes.length).toBe(2);

        delete nativeEventProto.ctrlKey;
        nativeEventProto.shiftKey = true;

        act(() => {
            wrapper
                .find(TreeNode)
                .find('.tree-node-content-wrapper')
                .at(1)
                .simulate('click');
        });
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/directory.groupselect2.shot'
        );
        expect(onSelect.mock.calls[2][0].length).toBe(2);
        expect(onSelect.mock.calls[2][1].selected).toBeTruthy();
        expect(onSelect.mock.calls[2][1].selectedNodes.length).toBe(2);

        delete nativeEventProto.shiftKey;
    });

    it('onDoubleClick', () => {
        const onDoubleClick = jest.fn();
        const wrapper = mount(createTree({ onDoubleClick }));
        act(() => {
            wrapper
                .find(TreeNode)
                .find('.tree-node-content-wrapper')
                .at(0)
                .simulate('doubleclick');
        });
        expect(onDoubleClick).toBeCalled();
    });

    it('ref support', () => {
        const treeRef = React.createRef();
        mount(createTree({ ref: treeRef }));

        expect('scrollTo' in treeRef.current).toBeTruthy();
    });
});
