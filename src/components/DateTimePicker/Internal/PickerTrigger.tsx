import React from 'react';
import { mergeClasses } from '../../../shared/utilities';
import Trigger from '../../Trigger/Trigger';
import { PickerTriggerProps } from './Picker.types';

import styles from './picker.module.scss';

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

function PickerTrigger({
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
}: PickerTriggerProps) {
    const getPopupPlacement = () => {
        if (popupPlacement !== undefined) {
            return popupPlacement;
        }
        return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    };

    return (
        <Trigger
            showAction={[]}
            hideAction={[]}
            popupPlacement={getPopupPlacement()}
            builtinPlacements={BUILT_IN_PLACEMENTS}
            popup={popupElement}
            popupAlign={dropdownAlign}
            popupVisible={visible}
            popupClassNames={mergeClasses([
                dropdownClassNames,
                { [styles.pickerDropdownRange]: range },
                { [styles.pickerDropdownRtl]: direction === 'rtl' },
            ])}
            popupStyle={popupStyle}
            getPopupContainer={getPopupContainer}
        >
            {children}
        </Trigger>
    );
}

export default PickerTrigger;
