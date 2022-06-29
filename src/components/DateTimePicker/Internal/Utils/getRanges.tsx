import React from 'react';
import type { Components, RangeList, Locale } from '../Picker.types';
import { ButtonSize, DefaultButton, PrimaryButton } from '../../../Button';

import styles from '../picker.module.scss';

export type RangesProps = {
    rangeList?: RangeList;
    components?: Components;
    needConfirmButton: boolean;
    onNow?: null | (() => void) | false;
    onOk?: null | (() => void) | false;
    okDisabled?: boolean;
    showNow?: boolean;
    locale: Locale;
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
}: RangesProps) {
    let presetNode: React.ReactNode;
    let okNode: React.ReactNode;

    if (rangeList.length) {
        const Item = (components.rangeItem || 'span') as any;

        presetNode = (
            <>
                {rangeList.map(
                    ({ label, onClick, onMouseEnter, onMouseLeave }) => (
                        <li key={label} className={'picker-preset'}>
                            <Item
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                {label}
                            </Item>
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
                        size={ButtonSize.Small}
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
                    size={ButtonSize.Small}
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
