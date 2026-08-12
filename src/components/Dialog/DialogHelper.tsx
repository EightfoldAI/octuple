'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import { DialogProps, DialogSize } from './Dialog.types';
import { Dialog } from './Dialog';
import { canUseDocElement, generateId } from '../../shared/utilities';
import {
  getRegisteredRender,
  OctupleUnmount,
} from '../../shared/utilities/unstableSetRender';

const uniqueId: string = generateId();

type LegacyReactDOM = {
  render?: (node: React.ReactElement, container: Element) => void;
  unmountComponentAtNode?: (container: Element) => boolean;
};

// Property access, not named imports: react-dom 19 removed render and
// unmountComponentAtNode, and named imports of removed exports break
// consumer bundlers.
const legacyReactDOM = ReactDOM as LegacyReactDOM;

const MISSING_RENDERER_ERROR =
  '[Octuple] DialogHelper needs a renderer on React 19. Register one at app startup:\n' +
  "  import { unstableSetRender } from '@eightfold.ai/octuple';\n" +
  "  import { createRoot } from 'react-dom/client';\n" +
  '  unstableSetRender((node, container) => {\n' +
  '    const root = createRoot(container);\n' +
  '    root.render(node);\n' +
  '    return () => root.unmount();\n' +
  '  });';

const unmounts = new Map<string, OctupleUnmount>();
const showTokens = new Map<string, object>();
const pendingUnmounts = new Map<string, Promise<void>>();

function runUnmount(containerId: string, unmount: OctupleUnmount): void {
  const result = unmount() as Promise<void> | void;
  if (result && typeof (result as Promise<void>).then === 'function') {
    const pending = (result as Promise<void>).then(() => {
      if (pendingUnmounts.get(containerId) === pending) {
        pendingUnmounts.delete(containerId);
      }
    });
    pendingUnmounts.set(containerId, pending);
  }
}

function createWrapperAndAppendToBody(wrapperId: string): HTMLDivElement {
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

function closeDialog(
  containerId: string,
  container?: HTMLElement | null
): boolean | null {
  showTokens.delete(containerId);
  const unmount = unmounts.get(containerId);
  if (unmount) {
    unmounts.delete(containerId);
    runUnmount(containerId, unmount);
    return true;
  }
  if (!canUseDocElement()) {
    return null;
  }
  const element = container ?? document.getElementById(containerId);
  return element && typeof legacyReactDOM.unmountComponentAtNode === 'function'
    ? legacyReactDOM.unmountComponentAtNode(element)
    : false;
}

const $dialog = (props: DialogProps, containerId: string = uniqueId) => {
  const resolvedContainerId = containerId ?? uniqueId;
  const element: HTMLDivElement =
    createWrapperAndAppendToBody(resolvedContainerId);
  if (!element) {
    return;
  }

  const dialog = (
    <Dialog
      {...props}
      visible
      parent={element}
      onClose={(e) => {
        props?.onClose?.(e);
        closeDialog(resolvedContainerId, element);
      }}
    />
  );

  const registeredRender = getRegisteredRender();
  if (registeredRender) {
    const token = {};
    showTokens.set(resolvedContainerId, token);
    const mount = () => {
      if (showTokens.get(resolvedContainerId) === token) {
        unmounts.set(resolvedContainerId, registeredRender(dialog, element));
      }
    };
    const previousUnmount = unmounts.get(resolvedContainerId);
    if (previousUnmount) {
      unmounts.delete(resolvedContainerId);
      runUnmount(resolvedContainerId, previousUnmount);
    }
    // antd-style renderers may resolve unmount a tick later; mounting
    // before that clears the fresh render from the same container.
    const pending = pendingUnmounts.get(resolvedContainerId);
    if (pending) {
      pending.then(mount);
      return;
    }
    mount();
    return;
  }

  if (typeof legacyReactDOM.render === 'function') {
    legacyReactDOM.render(dialog, element);
    return;
  }

  console.error(MISSING_RENDERER_ERROR);
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
