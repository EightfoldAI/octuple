import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { generateId, mergeClasses } from '../../shared/utilities';
import { CheckBoxLabelPosition, CheckboxProps } from './';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckboxProps> = React.forwardRef(
    (
        {
            ariaLabel,
            checked = false,
            classNames,
            defaultChecked,
            disabled = false,
            id,
            label,
            labelPosition = CheckBoxLabelPosition.End,
            name,
            onChange,
            style,
            toggle = false,
            value,
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
        ]);

        const checkBoxCheckClassNames: string = mergeClasses([
            styles.checkmark,
            { [styles.toggle]: toggle },
        ]);

        const labelClassNames: string = mergeClasses([
            { [styles.labelNoValue]: value === '' },
        ]);

        const selectorLabelClassNames: string = mergeClasses([
            styles.selectorLabel,
            {
                [styles.selectorLabelEnd]:
                    labelPosition === CheckBoxLabelPosition.End,
            },
            {
                [styles.selectorLabelStart]:
                    labelPosition === CheckBoxLabelPosition.Start,
            },
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
                    {labelPosition == CheckBoxLabelPosition.Start && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                    <span className={checkBoxCheckClassNames} />
                    {labelPosition == CheckBoxLabelPosition.End && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                </label>
            </div>
        );
    }
);
