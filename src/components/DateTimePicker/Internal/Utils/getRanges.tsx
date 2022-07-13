import React from 'react';
import type {
    Components,
    DatePickerSize,
    RangeList,
    Locale,
} from '../OcPicker.types';
import { ButtonSize, DefaultButton, PrimaryButton } from '../../../Button';

import styles from '../ocpicker.module.scss';

export type RangesProps = {
    rangeList?: RangeList;
    components?: Components;
    needConfirmButton: boolean;
    onNow?: null | (() => void) | false;
    onOk?: null | (() => void) | false;
    okDisabled?: boolean;
    showNow?: boolean;
    locale: Locale;
    size?: DatePickerSize;
};

export default function getRanges({
    rangeList = [],
    components = {},
    needConfirmButton,
    onNow,
    onOk,
    okDisabled,
    showNow,
    locale,
    size = 'Small',
}: RangesProps) {
    let presetNode: React.ReactNode;
    let okNode: React.ReactNode;

    const datePickerSizeToButtonSizeMap = new Map<typeof size, ButtonSize>([
        ['Large', ButtonSize.Large],
        ['Medium', ButtonSize.Medium],
        ['Small', ButtonSize.Small],
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
        const Button = (components.button || 'button') as any;

        if (onNow && !presetNode && showNow !== false) {
            presetNode = (
                <li className={'picker-now'}>
                    <DefaultButton
                        classNames={'picker-now-btn'}
                        onClick={onNow}
                        size={datePickerSizeToButtonSizeMap.get(size)}
                        text={locale.now}
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
                    text={locale.ok}
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
