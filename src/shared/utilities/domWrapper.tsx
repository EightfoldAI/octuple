'use client';

import React from 'react';

export interface DomWrapperProps {
  children: React.ReactElement | React.ReactNode;
}

export interface DomWrapperRef {
  getDOMNode: () => HTMLElement | null;
}

/**
 * Fallback used to resolve the DOM node rendered by `children` when the
 * origin ref cannot provide one directly (e.g. `children` is a plain
 * function component, a Fragment, or otherwise not ref-able).
 *
 * `ReactDOM.findDOMNode` — which used to do this by walking the fiber tree
 * from this component's instance — was removed in React 19. Instead we
 * render an invisible marker node immediately *after* `children` and read
 * `previousSibling` off of it once mounted, via `getDOMNode()`.
 *
 * The marker goes after (not before) `children` deliberately: a marker
 * placed first would become the container's new `firstChild`/`:first-child`
 * — confirmed via a Select snapshot regression, where `container.firstChild`
 * suddenly returned the hidden marker instead of Select's actual rendered
 * root once its `ThemeContextProvider` child (a plain function component
 * that can't accept a ref) fell into this path. Placing the marker last
 * keeps `firstChild` pointing at the real content; the trade-off is one
 * extra (hidden, zero-size) trailing DOM node.
 *
 * Callers should only reach for this fallback when a direct ref cannot be
 * attached (see `canAttachRef` in `ref.ts`) — attaching a ref directly is
 * always preferred since it adds no extra DOM node at all.
 */
export const DomWrapper = React.forwardRef<DomWrapperRef, DomWrapperProps>(
  (props, ref) => {
    const markerRef = React.useRef<HTMLSpanElement>(null);

    React.useImperativeHandle(ref, () => ({
      getDOMNode: () =>
        (markerRef.current?.previousSibling as HTMLElement) ?? null,
    }));

    return (
      <>
        {props.children}
        <span ref={markerRef} hidden aria-hidden />
      </>
    );
  }
);

DomWrapper.displayName = 'DomWrapper';
