import React, { FC, Ref, useRef, useState } from 'react';
import { generateId, mergeClasses } from '../../../shared/utilities';
import { CheckboxProps } from './Checkbox.types';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckboxProps> = React.forwardRef(
    (
        {
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

        const checkboxWrapperClassNames: string = mergeClasses([
            styles.selector,
            classNames,
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
                    aria-label={ariaLabel}
                    checked={isChecked}
                    disabled={disabled}
                    id={checkBoxId.current}
                    onChange={toggleChecked}
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
