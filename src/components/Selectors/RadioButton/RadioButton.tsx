import React, { FC, useState } from 'react';
import { RadioButtonProps } from '../';
import { classNames } from '../../../shared/utilities';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = ({
    ariaLabel,
    checked = false,
    disabled = false,
    id,
    index,
    forRadioGroup,
    name,
    value = '',
    onChange,
    updateRadioGroup,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const radioButtonClassNames: string = classNames([
        styles.radioButton,
        { [styles.disabled]: disabled },
    ]);

    const toggleChecked = (): void => {
        if (!disabled && forRadioGroup) updateRadioGroup(index);
        else if (!disabled) setIsChecked(!isChecked);
    };

    return (
        <div className={styles.selector}>
            <input
                aria-label={ariaLabel}
                checked={forRadioGroup ? checked : isChecked}
                disabled={disabled}
                id={id}
                name={name}
                onChange={onChange}
                type={'radio'}
                value={value}
                readOnly
            />
            <label className={value === '' ? styles.labelNoValue : ''}>
                <span
                    className={radioButtonClassNames}
                    onClick={toggleChecked}
                ></span>
                <span className={styles.selectorLabel}>{value}</span>
            </label>
        </div>
    );
};
