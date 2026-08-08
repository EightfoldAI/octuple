import React from 'react';

export interface Option {
  keepEmpty?: boolean;
}

// React 19 renamed the element `$$typeof` marker from `Symbol.for('react.element')`
// to `Symbol.for('react.transitional.element')`. `react-is` versions are
// generation-locked to whichever symbol their matching React major uses —
// e.g. react-is@19 only recognizes the *new* symbol. Since Octuple's
// `peerDependencies` span React 16.8 through 19, a single `react-is`
// version can't correctly detect Fragments for every React major we
// support, so Fragment detection here is done directly against both
// symbols instead of delegating to `react-is`.
const REACT_ELEMENT_TYPES = [
  Symbol.for('react.element'),
  Symbol.for('react.transitional.element'),
];
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

function isReactFragment(node: unknown): boolean {
  if (!node || typeof node !== 'object') {
    return false;
  }
  const { $$typeof, type } = node as { $$typeof?: symbol; type?: unknown };
  return REACT_ELEMENT_TYPES.includes($$typeof) && type === REACT_FRAGMENT_TYPE;
}

export default function toArray(
  children: React.ReactNode,
  option: Option = {}
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  React.Children.forEach(children, (child: any) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isReactFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}
