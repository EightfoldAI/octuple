import React from 'react';
import { createRootRenderer, unstableSetRender } from './unstableSetRender';

describe('unstableSetRender', () => {
  afterEach(() => {
    unstableSetRender(undefined);
  });

  it('returns the previous renderer and reads without arguments', () => {
    const first = () => () => {};
    const second = () => () => {};

    expect(unstableSetRender(first)).toBeUndefined();
    expect(unstableSetRender(second)).toBe(first);
    expect(unstableSetRender()).toBe(second);
    // A bare read must not clear the registration.
    expect(unstableSetRender()).toBe(second);
  });
});

describe('createRootRenderer', () => {
  const node = React.createElement('div');

  it('creates one root per container and re-renders in place', () => {
    const render = jest.fn();
    const unmount = jest.fn();
    const createRoot = jest.fn(() => ({ render, unmount }));
    const renderer = createRootRenderer(createRoot);
    const container = document.createElement('div');

    renderer(node, container);
    renderer(node, container);

    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(2);
    expect(unmount).not.toHaveBeenCalled();
  });

  it('keeps containers independent', () => {
    const createRoot = jest.fn(() => ({
      render: jest.fn(),
      unmount: jest.fn(),
    }));
    const renderer = createRootRenderer(createRoot);

    renderer(node, document.createElement('div'));
    renderer(node, document.createElement('div'));

    expect(createRoot).toHaveBeenCalledTimes(2);
  });

  it('unmounts and drops the cached root so the next render is fresh', () => {
    const unmount = jest.fn();
    const createRoot = jest.fn(() => ({ render: jest.fn(), unmount }));
    const renderer = createRootRenderer(createRoot);
    const container = document.createElement('div');

    const dispose = renderer(node, container);
    dispose();
    expect(unmount).toHaveBeenCalledTimes(1);

    renderer(node, container);
    expect(createRoot).toHaveBeenCalledTimes(2);
  });
});
