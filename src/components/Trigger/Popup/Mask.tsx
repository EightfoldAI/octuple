import React from 'react';
import { mergeClasses } from '../../../shared/utilities';
import type { CSSMotionProps } from '../../Motion/CSSMotion.types';
import CSSMotion from '../../Motion/CSSMotion';
import { getMotion } from '../Utils/util';

import styles from '../trigger.module.scss';

export interface MaskProps {
    visible?: boolean;
    zIndex?: number;
    mask?: boolean;
    maskMotion?: CSSMotionProps;
}

export default function Mask(props: MaskProps) {
    const { visible, zIndex, mask, maskMotion } = props;

    if (!mask) {
        return null;
    }

    let motion: CSSMotionProps = {};

    if (maskMotion) {
        motion = {
            motionAppear: true,
            ...getMotion({
                motion: maskMotion,
            }),
        };
    }

    return (
        <CSSMotion {...motion} visible={visible} removeOnLeave>
            {({ classNames }) => (
                <div
                    style={{ zIndex }}
                    className={mergeClasses([
                        styles.triggerPopupMask,
                        classNames,
                    ])}
                />
            )}
        </CSSMotion>
    );
}
