import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { RadioButtonProps } from './Radio.types';
import { mergeClasses, generateId } from '../../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = React.forwardRef(
    (
        {
            ariaLabel,
            checked = false,
            disabled = false,
            name,
            value = '',
            id,
            onChange,
            label,
            style,
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const radioButtonId = useRef<string>(id || generateId());
        const radioGroupContext = useRadioGroup();
        const [isActive, setIsActive] = useState<boolean>(
            radioGroupContext?.value === value || checked
        );

        const radioButtonClassNames: string = mergeClasses([
            styles.radioButton,
            { [styles.disabled]: disabled },
        ]);

        const labelClassNames: string = mergeClasses([
            { [styles.labelNoValue]: value === '' },
        ]);

        useEffect(() => {
            setIsActive(radioGroupContext?.value === value);
        }, [radioGroupContext?.value]);

        const toggleChecked = (
            e: React.ChangeEvent<HTMLInputElement>
        ): void => {
            if (!radioGroupContext) {
                setIsActive(!isActive);
            }
            radioGroupContext?.onChange?.(e);
            onChange?.(e);
        };

        return (
            <div
                className={styles.selector}
                data-test-id={dataTestId}
                style={style}
            >
                <input
                    ref={ref}
                    aria-label={ariaLabel}
                    checked={isActive}
                    disabled={disabled}
                    id={radioButtonId.current}
                    name={name}
                    type={'radio'}
                    value={value}
                    onChange={toggleChecked}
                    readOnly
                />
                <label
                    htmlFor={radioButtonId.current}
                    className={labelClassNames}
                >
                    <span
                        id={`${radioButtonId.current}-custom-radio`}
                        className={radioButtonClassNames}
                    />
                    <span className={styles.selectorLabel}>{label}</span>
                </label>
            </div>
        );
    }
);
