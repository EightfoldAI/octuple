import React from 'react';
import { render } from '@testing-library/react';

describe('findDOMNode (legacy fallback present)', () => {
  const { findDOMNode, supportsFindDOMNode } = require('./findDOMNode');

  it('reports legacy support on React 17', () => {
    expect(supportsFindDOMNode()).toBe(true);
  });

  it('returns null for null and undefined without throwing', () => {
    expect(findDOMNode(null)).toBeNull();
    expect(findDOMNode(undefined)).toBeNull();
  });

  it('passes through HTMLElement and Text nodes', () => {
    const div = document.createElement('div');
    const text = document.createTextNode('x');
    expect(findDOMNode(div)).toBe(div);
    expect(findDOMNode(text)).toBe(text);
  });

  it('resolves a class component instance via ReactDOM.findDOMNode', () => {
    let instance: any;
    class Probe extends React.Component {
      componentDidMount() {
        instance = this;
      }
      render() {
        return <span className="probe" />;
      }
    }
    const { container } = render(<Probe />);
    expect(findDOMNode(instance)).toBe(container.querySelector('.probe'));
  });
});

describe('findDOMNode (legacy fallback absent)', () => {
  let findDOMNodeFresh: any;
  let supportsFresh: () => boolean;

  beforeAll(() => {
    jest.resetModules();
    jest.doMock('react-dom', () => {
      const actual = jest.requireActual('react-dom');
      return { ...actual, findDOMNode: undefined };
    });
    ({ findDOMNode: findDOMNodeFresh, supportsFindDOMNode: supportsFresh } =
      require('./findDOMNode'));
  });

  afterAll(() => {
    jest.dontMock('react-dom');
    jest.resetModules();
  });

  it('reports no legacy support', () => {
    expect(supportsFresh()).toBe(false);
  });

  it('still passes through DOM nodes', () => {
    const div = document.createElement('div');
    expect(findDOMNodeFresh(div)).toBe(div);
  });

  it('returns null for a component instance instead of throwing', () => {
    expect(findDOMNodeFresh({ isReactComponent: {} })).toBeNull();
  });
});
