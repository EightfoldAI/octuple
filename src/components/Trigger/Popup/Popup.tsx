import React from 'react';
import { useState, useEffect } from 'react';
import Mask from './Mask';
import type { PopupInnerRef, PopupProps } from './Popup.types';
import PopupInner from './PopupInner';
import MobilePopupInner from './MobilePopupInner';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';

const Popup = React.forwardRef<PopupInnerRef, PopupProps>(
  ({ visible, mobile, ...props }, ref) => {
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const [innerVisible, serInnerVisible] = useState(visible);
    const [inMobile, setInMobile] = useState(false);
    const cloneProps = { ...props, visible: innerVisible };

    // We check mobile in visible changed here.
    // And this also delay set `innerVisible` to avoid popup component render flash
    useEffect(() => {
      serInnerVisible(visible);
      if (visible && mobile) {
        setInMobile(smallScreenActive);
      }
    }, [visible, mobile]);

    const popupNode: React.ReactNode = inMobile ? (
      <MobilePopupInner {...cloneProps} mobile={mobile} ref={ref} />
    ) : (
      <PopupInner {...cloneProps} ref={ref} />
    );

    // We can use fragment directly but this may failed some selector usage. Keep as origin logic
    return (
      <div>
        <Mask {...cloneProps} />
        {popupNode}
      </div>
    );
  }
);

Popup.displayName = 'Popup';

export default Popup;
