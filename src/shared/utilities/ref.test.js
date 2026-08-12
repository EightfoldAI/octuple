/* eslint-disable no-eval */
import React from 'react';
import { render } from '@testing-library/react';
import { composeRef, useComposeRef } from './';

describe('ref', () => {
  describe('composeRef', () => {
    it('basic', () => {
      const refFunc1 = jest.fn();
      const refFunc2 = jest.fn();

      const mergedRef = composeRef(refFunc1, refFunc2);
      const testRefObj = {};
      mergedRef(testRefObj);
      expect(refFunc1).toHaveBeenCalledWith(testRefObj);
      expect(refFunc2).toHaveBeenCalledWith(testRefObj);
    });

    it('ignore empty', () => {
      const ref = React.createRef();
      expect(composeRef(undefined, ref, null)).toBe(ref);
      expect(composeRef(undefined, null)).toBeFalsy();
    });

    it('useComposeRef', () => {
      const Demo = ({ ref1, ref2 }) => {
        const mergedRef = useComposeRef(ref1, ref2);
        return <div ref={mergedRef} />;
      };

      const ref1 = React.createRef();
      const ref2 = React.createRef();
      render(<Demo ref1={ref1} ref2={ref2} />);

      expect(ref1.current).toBeTruthy();
      expect(ref1.current).toBe(ref2.current);
    });
  });
});

describe('getElementRef', () => {
  const { getElementRef } = require('./ref');

  it('returns null for null and undefined element', () => {
    expect(getElementRef(null)).toBeNull();
    expect(getElementRef(undefined)).toBeNull();
  });

  it('reads the legacy element.ref on React <19', () => {
    const ref = React.createRef();
    const element = React.createElement('div', { ref });
    expect(getElementRef(element)).toBe(ref);
  });

  it('returns null when no ref is set', () => {
    expect(getElementRef(React.createElement('div'))).toBeNull();
  });

  it('reads props.ref when React major is >=19', () => {
    jest.resetModules();
    jest.doMock('react', () => {
      const actual = jest.requireActual('react');
      return { ...actual, version: '19.2.0' };
    });
    const { getElementRef: getElementRef19 } = require('./ref');
    const ref = () => {};
    expect(getElementRef19({ props: { ref } })).toBe(ref);
    jest.dontMock('react');
    jest.resetModules();
  });
});

describe('isDomRefable', () => {
  const { isDomRefable } = require('./ref');

  it('is true for host elements and forwardRef components', () => {
    const Fwd = React.forwardRef((props, ref) => <div ref={ref} />);
    expect(isDomRefable(<div />)).toBe(true);
    expect(isDomRefable(<Fwd />)).toBe(true);
  });

  it('is false for class components, plain function components, and null', () => {
    class Klass extends React.Component {
      render() {
        return <div />;
      }
    }
    const Fn = () => <div />;
    expect(isDomRefable(<Klass />)).toBe(false);
    expect(isDomRefable(<Fn />)).toBe(false);
    expect(isDomRefable(null)).toBe(false);
  });
});
