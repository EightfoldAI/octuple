import React, { FC, useState } from 'react';
import { RadioButtonProps } from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../selectors.module.scss';

export const RadioButton: FC<RadioButtonProps> = ({
    ariaLabel,
    checked = false,
    color = '',
    disabled = false,
    id,
    index,
    forRadioGroup,
    name,
    value,
    onChange,
    updateRadioGroup,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const radioButtonClassNames: string = classNames([
        styles.radioButton,
        { [styles.disabled]: disabled },
    ]);

    const toggleChecked = () => {
        if (!disabled && forRadioGroup) updateRadioGroup(index);
        else if (!disabled) setIsChecked(!isChecked);
    };

    return (
        <div className={styles.selector}>
            <input
                aria-label={ariaLabel}
                checked={forRadioGroup ? checked : isChecked}
                color={color}
                disabled={disabled}
                id={id}
                name={name}
                onChange={onChange}
                type={'radio'}
                value={value}
            />
            <label style={value === '' ? { marginBottom: '15px' } : null}>
                <span
                    className={radioButtonClassNames}
                    onClick={toggleChecked}
                ></span>
                <span className={styles.selectorLabel}>{value}</span>
            </label>
        </div>
    );
};
