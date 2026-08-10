import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '../index';

const { DirectoryTree } = Tree;

// Regression coverage for the React 19 `defaultProps` migration on
// `ForwardDirectoryTree` (a `forwardRef` component). `showIcon` defaults
// to `true` here specifically to *override* `BaseTree`'s own default of
// `false` (see `DirectoryTree.tsx`) — this proves that override still
// resolves correctly now that neither component relies on `defaultProps`.
// (`expandAction`'s default of `'click'` already has full behavioral
// coverage in `Tests/directory.test.js`'s "expand > click" case, which
// exercises the click-to-expand default end-to-end without passing
// `expandAction` explicitly.)
describe('DirectoryTree default props (React 19 defaultProps migration)', () => {
  it('showIcon defaults to true (overriding BaseTree default of false)', () => {
    const { container } = render(
      <DirectoryTree>
        <Tree.TreeNode key="0-0" />
      </DirectoryTree>
    );
    expect(container.querySelector('.tree-icon-hide')).toBeNull();
  });

  it('explicit showIcon={false} is respected (not overridden by the true default)', () => {
    const { container } = render(
      <DirectoryTree showIcon={false}>
        <Tree.TreeNode key="0-0" />
      </DirectoryTree>
    );
    expect(container.querySelector('.tree-icon-hide')).not.toBeNull();
  });
});
