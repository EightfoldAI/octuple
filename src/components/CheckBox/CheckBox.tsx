import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { generateId, mergeClasses } from '../../shared/utilities';
import { CheckboxProps, LabelPosition, SelectorSize } from './';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckboxProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            classNames,
            defaultChecked,
            disabled = false,
            id,
            label,
            labelPosition = LabelPosition.End,
            name,
            onChange,
            size = SelectorSize.Medium,
            style,
            toggle = false,
            value,
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const checkBoxId = useRef<string>(id || generateId());
        const [isChecked, setIsChecked] = useState<boolean>(
            defaultChecked || checked
        );

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        const checkboxWrapperClassNames: string = mergeClasses([
            styles.selector,
            {
                [styles.selectorSmall]:
                    size === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.selectorMedium]:
                    size === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.selectorMedium]:
                    size === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.selectorLarge]:
                    size === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.selectorLarge]: size === SelectorSize.Large },
            { [styles.selectorMedium]: size === SelectorSize.Medium },
            { [styles.selectorSmall]: size === SelectorSize.Small },
            classNames,
            { [styles.disabled]: allowDisabledFocus || disabled },
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
                [styles.selectorLabelEnd]: labelPosition === LabelPosition.End,
                [styles.selectorLabelStart]:
                    labelPosition === LabelPosition.Start,
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
                    {labelPosition == LabelPosition.Start && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                    <span className={checkBoxCheckClassNames} />
                    {labelPosition == LabelPosition.End && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                </label>
            </div>
        );
    }
);
