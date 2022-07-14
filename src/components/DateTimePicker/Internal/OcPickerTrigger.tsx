import React from 'react';
import { mergeClasses } from '../../../shared/utilities';
import Trigger from '../../Trigger/Trigger';
import { OcPickerTriggerProps } from './OcPicker.types';

import styles from './ocpicker.module.scss';

const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1,
        },
    },
    bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1,
        },
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 0,
            adjustY: 1,
        },
    },
    topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: {
            adjustX: 0,
            adjustY: 1,
        },
    },
};

function OcPickerTrigger({
    popupElement,
    popupStyle,
    visible,
    dropdownClassNames,
    dropdownAlign,
    getPopupContainer,
    children,
    range,
    popupPlacement,
    direction,
}: OcPickerTriggerProps) {
    const getPopupPlacement = () => {
        if (popupPlacement !== undefined) {
            return popupPlacement;
        }
        return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    };

    return (
        <Trigger
            builtinPlacements={BUILT_IN_PLACEMENTS}
            getPopupContainer={getPopupContainer}
            hideAction={[]}
            popup={popupElement}
            popupAlign={dropdownAlign}
            popupClassNames={mergeClasses([
                dropdownClassNames,
                styles.triggerPopup,
                { [styles.slideUpEnter]: visible },
                { [styles.slideUpLeave]: !visible },
                {
                    [styles.triggerPopupPlacementBottomLeft]:
                        getPopupPlacement() === 'bottomLeft',
                },
                {
                    [styles.triggerPopupPlacementBottomRight]:
                        getPopupPlacement() === 'bottomRight',
                },
                {
                    [styles.triggerPopupPlacementTopLeft]:
                        getPopupPlacement() === 'topLeft',
                },
                {
                    [styles.triggerPopupPlacementTopRight]:
                        getPopupPlacement() === 'topRight',
                },
                { [styles.pickerDropdownRange]: range },
                { [styles.pickerDropdownRtl]: direction === 'rtl' },
            ])}
            popupPlacement={getPopupPlacement()}
            popupStyle={popupStyle}
            popupVisible={visible}
            showAction={[]}
        >
            {children}
        </Trigger>
    );
}

export default OcPickerTrigger;
