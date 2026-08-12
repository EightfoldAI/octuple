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
 *   import { unstableSetRender } from '@eightfold.ai/octuple';
 *   import { createRoot } from 'react-dom/client';
 *   unstableSetRender((node, container) => {
 *     const root = createRoot(container);
 *     root.render(node);
 *     return () => root.unmount();
 *   });
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
