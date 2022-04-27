import React, { FC, useState } from 'react';
import { CheckBoxProps } from '../';
import { classNames } from '../../../shared/utilities';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckBoxProps> = ({
    ariaLabel,
    checked = false,
    defaultChecked,
    disabled = false,
    id,
    name,
    value = '',
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const checkBoxCheckClassNames: string = classNames([
        styles.checkmark,
        { [styles.disabled]: disabled },
    ]);

    const toggleChecked = (): void => {
        if (!disabled) setIsChecked(!isChecked);
    };

    return (
        <div className={styles.selector}>
            <input
                aria-label={ariaLabel}
                checked={isChecked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                onChange={onChange}
                name={name}
                type={'checkbox'}
                value={value}
                readOnly
            />
            <label className={value === '' ? styles.labelNoValue : ''}>
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
