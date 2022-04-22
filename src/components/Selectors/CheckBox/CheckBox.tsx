import React, { FC, useState } from 'react';
import { CheckBoxProps } from '../Selectors.types';
import { classNames } from '../../../shared/utilities';

import styles from '../selectors.module.scss';

export const CheckBox: FC<CheckBoxProps> = ({
    ariaLabel,
    checked = false,
    color,
    defaultChecked = false,
    disabled = false,
    id,
    name,
    value,
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const checkBoxCheckClassNames: string = classNames([
        styles.checkmark,
        { [styles.disabled]: disabled },
    ]);

    const toggleChecked = () => {
        if (!disabled) setIsChecked(!isChecked);
    };

    return (
        <div className={styles.selector}>
            <input
                aria-label={ariaLabel}
                checked={isChecked}
                color={color}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                onChange={onChange}
                name={name}
                type={'checkbox'}
                value={value}
            />
            <label>
                <span
                    className={checkBoxCheckClassNames}
                    onClick={toggleChecked}
                ></span>
                <span className={styles.selectorLabel} onClick={toggleChecked}>
                    {value}
                </span>
            </label>
        </div>
    );
};
