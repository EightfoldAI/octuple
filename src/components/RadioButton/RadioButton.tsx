import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { RadioButtonProps, RadioButtonValue } from './';
import { LabelPosition, SelectorSize } from '../CheckBox';
import { mergeClasses, generateId } from '../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';

import styles from './radio.module.scss';

export const RadioButton: FC<RadioButtonProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            classNames,
            disabled = false,
            id,
            name,
            label,
            labelPosition = LabelPosition.End,
            onChange,
            size = SelectorSize.Medium,
            style,
            value = '',
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

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
                    aria-disabled={allowDisabledFocus}
                    aria-label={ariaLabel}
                    checked={
                        radioGroupContext
                            ? isActive
                            : selectedValue === value && checked
                    }
                    disabled={disabled}
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
                    {labelPosition == LabelPosition.Start && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                    <span
                        id={`${radioButtonId.current}-custom-radio`}
                        className={radioButtonClassNames}
                    />
                    {labelPosition == LabelPosition.End && (
                        <span className={selectorLabelClassNames}>{label}</span>
                    )}
                </label>
            </div>
        );
    }
);
