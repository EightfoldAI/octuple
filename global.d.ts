declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

/**
 * This repo's devDependency `@types/react-dom` is still pinned to 17.x
 * (see package.json), which predates `react-dom/client` (added in React
 * 18). Real consumers on React 18/19 resolve the real module/types from
 * their own `react-dom` install; this ambient declaration only lets
 * Octuple's own build/typecheck succeed against its React 17 toolchain.
 */
declare module 'react-dom/client' {
  import type { ReactNode } from 'react';

  export interface Root {
    render(children: ReactNode): void;
    unmount(): void;
  }

  export function createRoot(
    container: Element | DocumentFragment,
    options?: unknown
  ): Root;

  export function hydrateRoot(
    container: Element | DocumentFragment,
    initialChildren: ReactNode,
    options?: unknown
  ): Root;
}

/**
 * userLanguage type for IE i18n
 */
interface Navigator {
  userLanguage: string;
}
