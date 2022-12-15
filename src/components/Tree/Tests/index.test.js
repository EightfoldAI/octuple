import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Tree from '../index';
import 'jest-specific-snapshot';

Enzyme.configure({ adapter: new Adapter() });

const { TreeNode } = Tree;

describe('Tree', () => {
  it('icon and switcherIcon of Tree with showLine should render correctly', () => {
    const wrapper = mount(
      <Tree showLine showIcon>
        <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
        <TreeNode switcherIcon="switcherIcon" key="0-1">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
        <TreeNode key="0-2">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
      </Tree>
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/index.treeiconrender.shot'
    );
  });

  it('switcherIcon in Tree should not render at leaf nodes', () => {
    const wrapper = mount(
      <Tree switcherIcon={<i className="switcherIcon" />} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode id="node1" title="node1" icon="icon" key="0-0-2" />
          <TreeNode id="node2" title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>
    );
    expect(wrapper.find('.switcherIcon').length).toBe(1);
  });

  it('switcherIcon in Tree could be string', () => {
    const wrapper = mount(
      <Tree switcherIcon="switcherIcon" defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode id="node1" title="node1" icon="icon" key="0-0-2" />
          <TreeNode id="node2" title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/index.switchericonstring.shot'
    );
  });

  it('switcherIcon should be loading icon when loadData', () => {
    const onLoadData = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    const wrapper = mount(
      <Tree switcherIcon="switcherIcon" defaultExpandAll loadData={onLoadData}>
        <TreeNode icon="icon" id="node1" key="0-0" title="node1" />
      </Tree>
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/index.loadingicon.shot'
    );
  });

  it('switcherIcon in Tree could be render prop function', () => {
    const wrapper = mount(
      <Tree
        switcherIcon={(expanded) =>
          expanded ? <span className="open" /> : <span className="close" />
        }
        defaultExpandAll
      >
        <TreeNode icon="icon">
          <TreeNode id="node1" title="node1" icon="icon" key="0-0-2" />
          <TreeNode id="node2" title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>
    );
    expect(wrapper.find('.open').length).toBe(1);
  });

  it('showLine is object type should render correctly', () => {
    const wrapper = mount(
      <Tree showLine={{ showLeafIcon: false }} defaultExpandedKeys={['0-0-0']}>
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
    expect(wrapper.render()).toMatchSpecificSnapshot(
      './__snapshots__/index.showline.shot'
    );
  });

  describe('draggable', () => {
    const dragTreeData = [
      {
        title: 'bamboo',
        key: 'bamboo',
      },
    ];

    it('hide icon', () => {
      const wrapper = mount(
        <Tree treeData={dragTreeData} draggable={{ icon: false }} />
      );
      expect(wrapper.exists('.anticon-holder')).toBeFalsy();
    });

    it('customize icon', () => {
      const wrapper = mount(
        <Tree
          treeData={dragTreeData}
          draggable={{ icon: <span className="little" /> }}
        />
      );
      expect(wrapper.exists('.little')).toBeTruthy();
    });

    it('nodeDraggable', () => {
      const nodeDraggable = jest.fn(() => false);
      mount(<Tree treeData={dragTreeData} draggable={{ nodeDraggable }} />);
      expect(nodeDraggable).toHaveBeenCalledWith(dragTreeData[0]);
    });

    it('nodeDraggable func', () => {
      const nodeDraggable = jest.fn(() => false);
      mount(<Tree treeData={dragTreeData} draggable={nodeDraggable} />);
      expect(nodeDraggable).toHaveBeenCalledWith(dragTreeData[0]);
    });
  });
});
