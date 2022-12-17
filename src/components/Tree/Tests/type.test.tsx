import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import type { BasicDataNode } from '../Internal/index';
import Tree from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('Tree.TypeScript', () => {
  it('without generic', () => {
    const wrapper = mount(
      <Tree
        treeData={[
          {
            title: 'Bamboo',
            key: 'bamboo',
            children: [
              {
                title: 'Little',
                key: 'little',
              },
            ],
          },
        ]}
      />
    );

    expect(wrapper).toBeTruthy();
  });

  it('support generic', () => {
    interface MyDataNode extends BasicDataNode {
      bamboo: string;
      list?: MyDataNode[];
    }

    const wrapper = mount(
      <Tree<MyDataNode>
        treeData={[
          {
            bamboo: 'good',
            list: [
              {
                bamboo: 'well',
              },
            ],
          },
        ]}
      />
    );

    expect(wrapper).toBeTruthy();
  });
});
