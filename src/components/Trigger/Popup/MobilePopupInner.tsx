import React from 'react';
import CSSMotion from '../../Motion/CSSMotion';
import { mergeClasses } from '../../../shared/utilities';
import type { PopupInnerProps, PopupInnerRef } from './Popup.types';
import type { MobileConfig } from '../Trigger.types';

import styles from '../trigger.module.scss';

interface MobilePopupInnerProps extends PopupInnerProps {
    mobile?: MobileConfig;
}

const MobilePopupInner = React.forwardRef<PopupInnerRef, MobilePopupInnerProps>(
    (props, ref) => {
        const {
            visible,
            zIndex,
            children,
            mobile: {
                popupClassNames,
                popupStyle,
                popupMotion = {},
                popupRender,
            } = {},
            onClick,
        } = props;
        const elementRef = React.useRef<HTMLDivElement>();

        React.useImperativeHandle(ref, () => ({
            forceAlign: () => {},
            getElement: () => elementRef.current,
        }));

        const mergedStyle: React.CSSProperties = {
            zIndex,

            ...popupStyle,
        };

        let childNode = children;

        // Wrapper when multiple children
        if (React.Children.count(children) > 1) {
            childNode = (
                <div className={'trigger-popup-content'}>{children}</div>
            );
        }

        // Mobile support additional render
        if (popupRender) {
            childNode = popupRender(childNode);
        }

        return (
            <CSSMotion
                visible={visible}
                ref={elementRef}
                removeOnLeave
                {...popupMotion}
            >
                {(
                    { classNames: motionClassNames, style: motionStyle },
                    motionRef
                ) => {
                    const mergedClassName = mergeClasses([
                        styles.triggerPopup,
                        styles.triggerPopupMobile,
                        popupMotion.motionName,
                        popupClassNames,
                        motionClassNames,
                    ]);

                    return (
                        <div
                            ref={motionRef}
                            className={mergedClassName}
                            onClick={onClick}
                            style={{
                                ...motionStyle,
                                ...mergedStyle,
                            }}
                        >
                            {childNode}
                        </div>
                    );
                }}
            </CSSMotion>
        );
    }
);

MobilePopupInner.displayName = 'MobilePopupInner';

export default MobilePopupInner;
