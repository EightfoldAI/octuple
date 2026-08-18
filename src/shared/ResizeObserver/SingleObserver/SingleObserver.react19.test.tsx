import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';

describe('SingleObserver marker gating on React 19 (findDOMNode absent)', () => {
  let ResizeObserver: any;
  let rtl: any;
  let matchMedia: MatchMediaMock;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    jest.resetModules();
    jest.doMock('react-dom', () => {
      const actual = jest.requireActual('react-dom');
      return { ...actual, findDOMNode: undefined };
    });
    rtl = require('@testing-library/react/pure');
    ({ ResizeObserver } = require('../ResizeObserver'));
  });

  afterAll(() => {
    rtl.cleanup();
    matchMedia.clear();
    jest.dontMock('react-dom');
    jest.resetModules();
  });

  it('renders no marker for a host element child', () => {
    const { container } = rtl.render(
      <ResizeObserver>
        <div className="host" />
      </ResizeObserver>
    );
    expect(container.querySelector('.host')).toBeTruthy();
    expect(container.querySelector('span[hidden]')).toBeNull();
  });

  it('renders the marker for a plain function component child', () => {
    const FnChild = () => <div className="fn-child" />;
    const { container } = rtl.render(
      <ResizeObserver>
        <FnChild />
      </ResizeObserver>
    );
    expect(container.querySelector('.fn-child')).toBeTruthy();
    expect(container.querySelector('span[hidden]')).toBeTruthy();
  });
});
