import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import { generateId, mergeClasses } from '../../shared/utilities';
import { CheckboxProps, LabelAlign, LabelPosition, SelectorSize } from './';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckboxProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            classNames,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            defaultChecked,
            disabled = false,
            formItemInput = false,
            id,
            label,
            labelPosition = LabelPosition.End,
            labelAlign = LabelAlign.Center,
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

        const htmlDir: string = useCanvasDirection();

        const checkBoxId = useRef<string>(id || generateId());
        const [isChecked, setIsChecked] = useState<boolean>(
            defaultChecked || checked
        );

        const { isFormItemInput } = useContext(FormItemInputContext);
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        const checkboxWrapperClassNames: string = mergeClasses([
            styles.selector,
            {
                [styles.selectorSmall]:
                    mergedSize === SelectorSize.Flex && largeScreenActive,
            },
            {
                [styles.selectorMedium]:
                    mergedSize === SelectorSize.Flex && mediumScreenActive,
            },
            {
                [styles.selectorMedium]:
                    mergedSize === SelectorSize.Flex && smallScreenActive,
            },
            {
                [styles.selectorLarge]:
                    mergedSize === SelectorSize.Flex && xSmallScreenActive,
            },
            { [styles.selectorLarge]: mergedSize === SelectorSize.Large },
            { [styles.selectorMedium]: mergedSize === SelectorSize.Medium },
            { [styles.selectorSmall]: mergedSize === SelectorSize.Small },
            classNames,
            { [styles.disabled]: allowDisabledFocus || mergedDisabled },
            { [styles.selectorRtl]: htmlDir === 'rtl' },
            { ['in-form-item']: mergedFormItemInput },
        ]);

        const checkBoxCheckClassNames: string = mergeClasses([
            styles.checkmark,
            { [styles.toggle]: toggle },
        ]);

        const labelClassNames: string = mergeClasses([
            {
                [styles.labelNoValue]: value === '',
                [styles.alignStart]: labelAlign === LabelAlign.Start,
                [styles.alignEnd]: labelAlign === LabelAlign.End,
            },
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
                    aria-disabled={mergedDisabled}
                    aria-label={ariaLabel}
                    checked={isChecked}
                    disabled={!allowDisabledFocus && mergedDisabled}
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
