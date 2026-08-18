import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Tree from '../Tree';
import DirectoryTree from '../DirectoryTree';

let matchMedia: MatchMediaMock;

describe('Tree defaults without defaultProps', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  const treeData = [
    { title: 'parent', key: '0', children: [{ title: 'child', key: '0-0' }] },
  ];

  it('hides icons and allows selection by default', () => {
    const { container } = render(<Tree treeData={treeData} />);
    expect(container.querySelector('.tree-icon-hide')).toBeTruthy();
    expect(container.querySelector('[class*="treeUnselectable"]')).toBeFalsy();
  });

  it('DirectoryTree shows icons by default', () => {
    const { container } = render(<DirectoryTree treeData={treeData} />);
    expect(container.querySelector('.tree-icon-hide')).toBeFalsy();
  });

  it('exposes no function-component defaultProps anymore', () => {
    expect((Tree as any).defaultProps).toBeUndefined();
    expect((DirectoryTree as any).defaultProps).toBeUndefined();
  });
});
