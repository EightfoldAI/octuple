'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { PortalProps, PortalRef } from './Portal.types';

export const Portal = forwardRef<PortalRef, PortalProps>(
  ({ getContainer, children, insertPosition = 'append', wrapperAttributes }, ref) => {
    const [container, setContainer] = useState<HTMLElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement>(null);

    // Ref return nothing, only for wrapper check exist
    useImperativeHandle(ref, () => ({}));

    useEffect(() => {
      const parentContainer = getContainer();
      setContainer(parentContainer);

      // Create a wrapper div for the portal content
      const wrapper = document.createElement('div');

      // Apply wrapper attributes
      if (wrapperAttributes) {
        Object.entries(wrapperAttributes).forEach(([key, value]) => {
          wrapper.setAttribute(key, value);
        });
      }

      // Insert wrapper at the specified position
      if (insertPosition === 'prepend') {
        parentContainer.insertBefore(wrapper, parentContainer.firstChild);
      } else {
        parentContainer.appendChild(wrapper);
      }

      setPortalContainer(wrapper);

      // Cleanup: remove wrapper when unmounting
      return () => {
        if (parentContainer && wrapper && parentContainer.contains(wrapper)) {
          parentContainer.removeChild(wrapper);
        }
      };
    }, [getContainer, insertPosition, wrapperAttributes]);

    return portalContainer ? ReactDOM.createPortal(children, portalContainer) : null;
  }
);
