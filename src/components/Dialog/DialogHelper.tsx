'use client';

import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DialogProps, DialogSize } from './Dialog.types';
import { Dialog } from './Dialog';
import { canUseDocElement, generateId } from '../../shared/utilities';

const uniqueId: string = generateId();

// React 19 removed `ReactDOM.render`/`ReactDOM.unmountComponentAtNode`.
// `createRoot` replaces both, but unlike `unmountComponentAtNode` (which
// took the DOM container), `root.unmount()` is called on the root
// *instance* — so we keep one root per container id around to unmount it
// later, and to re-render into the same root on subsequent `show()` calls
// for that id instead of calling `createRoot` on an already-mounted
// container (which React warns about).
const roots = new Map<string, Root>();

function createWrapperAndAppendToBody(
  wrapperId: string
): HTMLDivElement | null {
  if (!canUseDocElement()) {
    return null;
  }
  const existingElement = document.getElementById(wrapperId) as HTMLDivElement;
  if (existingElement) {
    return existingElement;
  }
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function getOrCreateRoot(containerId: string, element: HTMLDivElement): Root {
  let root = roots.get(containerId);
  if (!root) {
    root = createRoot(element);
    roots.set(containerId, root);
  }
  return root;
}

function closeDialog(containerId: string): void {
  if (!canUseDocElement()) {
    return;
  }
  const root = roots.get(containerId);
  if (root) {
    root.unmount();
    roots.delete(containerId);
  }
}

const $dialog = (props: DialogProps, containerId: string = uniqueId): void => {
  const resolvedContainerId = containerId ?? uniqueId;
  const element: HTMLDivElement =
    createWrapperAndAppendToBody(resolvedContainerId);
  if (!element) {
    return;
  }

  const root = getOrCreateRoot(resolvedContainerId, element);

  // Note: `root.render` (like `ReactDOM.render` before it) commits the
  // initial mount synchronously outside of `startTransition` — existing
  // callers that read the DOM immediately after calling `show()` keep
  // working — but subsequent updates scheduled by React itself may be
  // batched/async per React 19 semantics.
  root.render(
    <Dialog
      {...props}
      visible
      parent={element}
      onClose={(e) => {
        props?.onClose?.(e);
        closeDialog(resolvedContainerId);
      }}
    />
  );
};

export const DialogHelper = {
  show: $dialog,
  showSmall: (props: DialogProps, containerId: string = uniqueId) =>
    $dialog(
      {
        ...props,
        size: DialogSize.small,
      },
      containerId
    ),
  showMedium: (props: DialogProps, containerId: string = uniqueId) =>
    $dialog(
      {
        ...props,
        size: DialogSize.medium,
      },
      containerId
    ),
  close: (containerId: string = uniqueId) => closeDialog(containerId),
};
