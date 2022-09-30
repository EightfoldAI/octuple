import React from 'react';
import { Size } from '../../../ConfigProvider';
import { Components, DatePickerSize, RangeList } from '../OcPicker.types';
import { ButtonSize, DefaultButton, PrimaryButton } from '../../../Button';

import styles from '../ocpicker.module.scss';

export type RangesProps = {
    components?: Components;
    needConfirmButton: boolean;
    nowText?: string;
    okDisabled?: boolean;
    okText?: string;
    onNow?: null | (() => void) | false;
    onOk?: null | (() => void) | false;
    rangeList?: RangeList;
    showNow?: boolean;
    size?: DatePickerSize | Size;
};

export default function getRanges({
    components = {},
    needConfirmButton,
    nowText,
    okDisabled,
    okText,
    onNow,
    onOk,
    rangeList = [],
    showNow,
    size = DatePickerSize.Medium,
}: RangesProps) {
    let presetNode: React.ReactNode;
    let okNode: React.ReactNode;

    const datePickerSizeToButtonSizeMap = new Map<
        DatePickerSize | Size,
        ButtonSize | Size
    >([
        [DatePickerSize.Flex, ButtonSize.Flex],
        [DatePickerSize.Large, ButtonSize.Large],
        [DatePickerSize.Medium, ButtonSize.Medium],
        [DatePickerSize.Small, ButtonSize.Small],
    ]);

    if (rangeList.length) {
        const Item = (components.rangeItem || 'span') as any;

        presetNode = (
            <>
                {rangeList.map(
                    ({ label, onClick, onMouseEnter, onMouseLeave }) => (
                        <li key={label} className={styles.pickerPreset}>
                            <Item
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                size={datePickerSizeToButtonSizeMap.get(size)}
                                text={label}
                            />
                        </li>
                    )
                )}
            </>
        );
    }

    if (needConfirmButton) {
        if (onNow && !presetNode && showNow !== false) {
            presetNode = (
                <li className={'picker-now'}>
                    <DefaultButton
                        classNames={'picker-now-btn'}
                        onClick={onNow}
                        size={datePickerSizeToButtonSizeMap.get(size)}
                        text={nowText}
                    />
                </li>
            );
        }

        okNode = needConfirmButton && (
            <li className={styles.pickerOk}>
                <PrimaryButton
                    disabled={okDisabled}
                    onClick={onOk as () => void}
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    text={okText}
                />
            </li>
        );
    }

    if (!presetNode && !okNode) {
        return null;
    }

    return (
        <ul className={styles.pickerRanges}>
            {presetNode}
            {okNode}
        </ul>
    );
}
