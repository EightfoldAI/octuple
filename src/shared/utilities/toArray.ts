import React from 'react';

export interface Option {
  keepEmpty?: boolean;
}

// react-is is generation-locked: react-is@18 only knows
// Symbol.for('react.element'), react-is@19 only knows
// Symbol.for('react.transitional.element'). Octuple spans React 16.8-19,
// so check both symbols directly.
const REACT_ELEMENT_TYPES = [
  Symbol.for('react.element'),
  Symbol.for('react.transitional.element'),
];
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

export function isReactFragment(node: unknown): boolean {
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
