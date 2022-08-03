import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { generateId, mergeClasses } from '../../shared/utilities';
import { CheckboxProps } from './';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckboxProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            defaultChecked,
            disabled = false,
            name,
            value,
            id,
            onChange,
            label,
            classNames,
            style,
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const checkBoxId = useRef<string>(id || generateId());
        const [isChecked, setIsChecked] = useState<boolean>(
            defaultChecked || checked
        );

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        const checkboxWrapperClassNames: string = mergeClasses([
            styles.selector,
            classNames,
            { [styles.disabled]: allowDisabledFocus || disabled },
        ]);

        const checkBoxCheckClassNames: string = mergeClasses([
            styles.checkmark,
        ]);

        const labelClassNames: string = mergeClasses([
            { [styles.labelNoValue]: value === '' },
        ]);

        const toggleChecked = (
            e: React.ChangeEvent<HTMLInputElement>
        ): void => {
            setIsChecked(e.target.checked);
            onChange?.(e);
        };

        return (
            <div
                className={checkboxWrapperClassNames}
                style={style}
                data-test-id={dataTestId}
            >
                <input
                    ref={ref}
                    aria-disabled={disabled}
                    aria-label={ariaLabel}
                    checked={isChecked}
                    disabled={!allowDisabledFocus && disabled}
                    id={checkBoxId.current}
                    onChange={!allowDisabledFocus ? toggleChecked : null}
                    name={name}
                    type={'checkbox'}
                    value={value}
                    readOnly
                />
                <label htmlFor={checkBoxId.current} className={labelClassNames}>
                    <span className={checkBoxCheckClassNames} />
                    <span className={styles.selectorLabel}>{label}</span>
                </label>
            </div>
        );
    }
);
