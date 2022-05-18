import React, { FC, useEffect } from 'react';
import { RadioButtonProps } from '../';
import { mergeClasses, generateId } from '../../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = ({
    ariaLabel,
    activeRadioButton,
    checked = false,
    disabled = false,
    name,
    value = '',
    id = generateId(),
}) => {
    const { onRadioButtonClick, currentRadioButton } = useRadioGroup();
    const isActive: boolean = value === currentRadioButton;

    useEffect(() => {
        if (onRadioButtonClick) onRadioButtonClick(activeRadioButton, null);
    }, [activeRadioButton]);

    const radioButtonClassNames: string = mergeClasses([
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
                tabIndex={-1}
                type={'radio'}
                value={value}
                onClick={(e) => onRadioButtonClick(value, e)}
                readOnly
            />
            <label
                htmlFor={id}
                className={value === '' ? styles.labelNoValue : ''}
            >
                <span className={radioButtonClassNames} tabIndex={0}></span>
                <span className={styles.selectorLabel}>{value}</span>
            </label>
        </div>
    );
};
