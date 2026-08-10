import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '../index';
import BaseTree from '../BaseTree';
import { TreeNode } from '../Internal';

// Regression coverage for the React 19 `defaultProps` migration on `Tree`
// and `BaseTree` (both `forwardRef` components — React 19 no longer honors
// `defaultProps` on non-class components, so these defaults are now
// applied via destructuring inside `BaseTree`; see `BaseTree.tsx`).
//
// These tests assert the actual resolved DOM/behavior when a defaulted
// prop is omitted (not just that the component renders), and that an
// explicit falsy override is respected rather than replaced by the
// default. `Tree.defaultProps` itself was removed outright (redundant with
// `BaseTree`'s own defaults — see `Tree.tsx`), so `Tree` is covered here to
// prove that removal didn't change resolved behavior.
describe('Tree / BaseTree default props (React 19 defaultProps migration)', () => {
  it('BaseTree: showIcon defaults to false', () => {
    const { container } = render(
      <BaseTree>
        <TreeNode key="0-0" />
      </BaseTree>
    );
    expect(container.querySelector('.tree-icon-hide')).toBeTruthy();
  });

  it('BaseTree: selectable defaults to true (no "unselectable" class)', () => {
    const { container } = render(
      <BaseTree>
        <TreeNode key="0-0" />
      </BaseTree>
    );
    expect(container.querySelector('[class*="tree-unselectable"]')).toBeNull();
  });

  it('BaseTree: explicit selectable={false} is respected (not overridden by the true default)', () => {
    const { container } = render(
      <BaseTree selectable={false}>
        <TreeNode key="0-0" />
      </BaseTree>
    );
    expect(
      container.querySelector('[class*="tree-unselectable"]')
    ).not.toBeNull();
  });

  it('BaseTree: blockNode defaults to false', () => {
    const { container } = render(
      <BaseTree>
        <TreeNode key="0-0" />
      </BaseTree>
    );
    expect(container.querySelector('[class*="tree-block-node"]')).toBeNull();
  });

  it('BaseTree: explicit blockNode={true} is respected', () => {
    const { container } = render(
      <BaseTree blockNode>
        <TreeNode key="0-0" />
      </BaseTree>
    );
    expect(
      container.querySelector('[class*="tree-block-node"]')
    ).not.toBeNull();
  });

  it('Tree: forwards the same resolved defaults as BaseTree (showIcon=false by default)', () => {
    const { container } = render(
      <Tree>
        <TreeNode key="0-0" />
      </Tree>
    );
    expect(container.querySelector('.tree-icon-hide')).toBeTruthy();
  });
});
