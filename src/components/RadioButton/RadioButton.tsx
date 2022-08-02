import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { RadioButtonProps, RadioButtonValue } from './';
import { mergeClasses, generateId } from '../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            disabled = false,
            name,
            value = '',
            id,
            onChange,
            label,
            classNames,
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
        const [selectedValue, setSelectedValue] =
            useState<RadioButtonValue>(value);

        const radioButtonClassNames: string = mergeClasses([
            styles.radioButton,
        ]);

        const selectorClassNames: string = mergeClasses([
            styles.selector,
            classNames,
            { [styles.disabled]: allowDisabledFocus || disabled },
        ]);

        const labelClassNames: string = mergeClasses([
            { [styles.labelNoValue]: value === '' },
        ]);

        // TODO: Follow-up on React issue 24439 https://github.com/facebook/react/issues/24439
        // Bug: Checked attribute does not update in the dom - Meta folks are planning on
        // updating this in a future React version, this could be an A11y issue so need
        // to find a anti-pattern workaround. They closed the bug, but it's definitely still repro.
        useEffect(() => {
            setIsActive(radioGroupContext?.value === value);
        }, [radioGroupContext?.value]);

        const toggleChecked = (
            e: React.ChangeEvent<HTMLInputElement>
        ): void => {
            if (!radioGroupContext) {
                setSelectedValue(e.currentTarget?.value as RadioButtonValue);
            } else {
                radioGroupContext?.onChange?.(e);
            }

            onChange?.(e);
        };

        return (
            <div
                className={selectorClassNames}
                data-test-id={dataTestId}
                style={style}
            >
                <input
                    ref={ref}
                    aria-disabled={disabled}
                    aria-label={ariaLabel}
                    checked={
                        radioGroupContext
                            ? isActive
                            : selectedValue === value && checked
                    }
                    disabled={!allowDisabledFocus && disabled}
                    id={radioButtonId.current}
                    name={name}
                    type={'radio'}
                    value={value}
                    onChange={!allowDisabledFocus ? toggleChecked : null}
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
