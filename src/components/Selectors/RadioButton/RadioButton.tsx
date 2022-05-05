import React, { FC, useState } from 'react';
import { RadioButtonProps } from '../';
import { classNames } from '../../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = ({
    ariaLabel,
    checked = false,
    disabled = false,
    name,
    value = '',
    id = `radiobox-${value}-${Math.random().toString(36).slice(2)}`,
}) => {
    const { onRadioButtonClick, currentRadioButton } = useRadioGroup();
    const isActive: boolean = value === currentRadioButton;

    const radioButtonClassNames: string = classNames([
        styles.radioButton,
        { [styles.disabled]: disabled },
    ]);

    return (
        <div className={styles.selector}>
            <input
                aria-label={ariaLabel}
                checked={isActive ? isActive : checked}
                disabled={disabled}
                id={id}
                name={name}
                type={'radio'}
                value={value}
                onChange={(e) => onRadioButtonClick(value, e)}
                readOnly
            />
            <label
                htmlFor={id}
                className={value === '' ? styles.labelNoValue : ''}
            >
                <span className={radioButtonClassNames}></span>
                <span className={styles.selectorLabel}>{value}</span>
            </label>
        </div>
    );
};
