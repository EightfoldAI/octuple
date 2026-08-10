import React from 'react';
import toArray from './toArray';

// Regression coverage for React 19 Fragment detection. `toArray` used to
// delegate this to `react-is`'s `isFragment`, but `react-is` versions are
// generation-locked to whichever element `$$typeof` symbol their matching
// React major uses (react-is@18 only recognizes React <19's
// `Symbol.for('react.element')`; react-is@19 only recognizes React 19's
// `Symbol.for('react.transitional.element')`) — see `toArray.ts` for the
// version-safe check that replaced it. These tests exercise that behavior
// directly, independent of which `react-is`/`react` major is installed.
describe('React 19 Fragment detection (toArray)', () => {
  it('flattens a Fragment with multiple children', () => {
    const children = toArray(
      <>
        <a key="a" />
        <b key="b" />
      </>
    );

    expect(children).toHaveLength(2);
  });

  it('flattens nested Fragments', () => {
    const children = toArray(
      <React.Fragment>
        <li key="1" />
        <>
          <li key="2" />
          <li key="3" />
        </>
      </React.Fragment>
    );

    expect(children).toHaveLength(3);
  });

  it('does not flatten a regular element', () => {
    const children = toArray(<div key="only" />);
    expect(children).toHaveLength(1);
  });
});
