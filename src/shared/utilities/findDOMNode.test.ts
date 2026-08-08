import { findDOMNode } from './findDOMNode';

// React 19 removed `ReactDOM.findDOMNode`. This utility no longer depends
// on it (see `findDOMNode.ts`) — it just recognizes DOM nodes it is
// already handed and safely returns `null` otherwise, instead of throwing.
describe('findDOMNode', () => {
  it('returns null for null input without throwing', () => {
    expect(() => findDOMNode(null)).not.toThrow();
    expect(findDOMNode(null)).toBeNull();
  });

  it('returns null for undefined input without throwing', () => {
    expect(() => findDOMNode(undefined)).not.toThrow();
    expect(findDOMNode(undefined)).toBeNull();
  });

  it('returns the node unchanged when it is already an HTMLElement', () => {
    const div: HTMLElement = document.createElement('div');
    expect(findDOMNode(div)).toBe(div);
  });

  it('returns null for a non-DOM value', () => {
    const plainObject: unknown = {};
    expect(findDOMNode(plainObject as unknown as HTMLElement)).toBeNull();
  });
});
