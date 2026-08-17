import type React from 'react';

export type OctupleUnmount = () => void | Promise<void>;

export type OctupleRender = (
  node: React.ReactElement,
  container: Element | DocumentFragment
) => OctupleUnmount;

let registeredRender: OctupleRender | undefined;

/**
 * Registers the renderer octuple uses for imperative APIs (DialogHelper) on
 * React 19, where ReactDOM.render no longer exists. Returns the previously
 * registered renderer. Call with no arguments to read without changing.
 *
 * App setup (React 19):
 *   import { unstableSetRender, createRootRenderer } from '@eightfold.ai/octuple';
 *   import { createRoot } from 'react-dom/client';
 *   unstableSetRender(createRootRenderer(createRoot));
 */
export function unstableSetRender(
  render?: OctupleRender
): OctupleRender | undefined {
  const previous = registeredRender;
  if (arguments.length > 0) {
    registeredRender = render;
  }
  return previous;
}

export const getRegisteredRender = (): OctupleRender | undefined =>
  registeredRender;

export interface OctupleRoot {
  render: (node: React.ReactElement) => void;
  unmount: () => void;
}

const ROOT_KEY = '__octupleRoot';

type RootHolder = {
  [ROOT_KEY]?: OctupleRoot;
};

/**
 * Builds the renderer to hand `unstableSetRender`, given React 19's
 * `createRoot`. The root is cached on the container so a repeat render of the
 * same container updates in place instead of tearing down and remounting,
 * matching what `ReactDOM.render` did on React <=18.
 *
 *   import { unstableSetRender, createRootRenderer } from '@eightfold.ai/octuple';
 *   import { createRoot } from 'react-dom/client';
 *   unstableSetRender(createRootRenderer(createRoot));
 */
export const createRootRenderer =
  (createRoot: (container: Element | DocumentFragment) => OctupleRoot) =>
  (node: React.ReactElement, container: Element | DocumentFragment) => {
    const holder = container as unknown as RootHolder;
    const root: OctupleRoot = holder[ROOT_KEY] ?? createRoot(container);
    holder[ROOT_KEY] = root;
    root.render(node);
    return () => {
      delete holder[ROOT_KEY];
      root.unmount();
    };
  };
