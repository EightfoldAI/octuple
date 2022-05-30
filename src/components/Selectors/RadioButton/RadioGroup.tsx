import React, { FC, Ref, useState } from 'react';
import { RadioButton } from '../';
import { RadioGroupProvider } from './RadioGroup.context';
import { mergeClasses } from '../../../shared/utilities';
import {
    RadioButtonProps,
    RadioButtonValue,
    RadioGroupProps,
} from './Radio.types';

import styles from './radio.module.scss';

export const RadioGroup: FC<RadioGroupProps> = React.forwardRef(
    (
        {
            defaultValue = '',
            onChange,
            items,
            classNames,
            style,
            ariaLabel,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const [radioGroupValue, setRadioGroupValue] =
            useState<RadioButtonValue>(defaultValue);

        const radioGroupClasses: string = mergeClasses([
            styles.radioGroup,
            classNames,
        ]);

        return (
            <RadioGroupProvider onChange={onChange} value={radioGroupValue}>
                <div
                    role="group"
                    className={radioGroupClasses}
                    style={style}
                    ref={ref}
                    aria-label={ariaLabel}
                    {...rest}
                >
                    {items.map((item: RadioButtonProps) => (
                        <RadioButton
                            key={item.value}
                            {...item}
                            onChange={(event) => {
                                setRadioGroupValue(event.target.value);
                            }}
                        />
                    ))}
                </div>
            </RadioGroupProvider>
        );
    }
);
