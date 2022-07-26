import React, { FC, Ref } from 'react';
import {
    RadioButtonLabelPosition,
    RadioButtonProps,
    RadioGroupProps,
    RadioButton,
} from './';
import { RadioGroupProvider } from './RadioGroup.context';
import { mergeClasses } from '../../shared/utilities';

import styles from './radio.module.scss';

export const RadioGroup: FC<RadioGroupProps> = React.forwardRef(
    (
        {
            ariaLabel,
            classNames,
            items,
            labelPosition = RadioButtonLabelPosition.End,
            layout = 'vertical',
            onChange,
            style,
            value,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const radioGroupClasses: string = mergeClasses([
            styles.radioGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            classNames,
        ]);

        return (
            <RadioGroupProvider onChange={onChange} value={value}>
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
                            labelPosition={labelPosition}
                            {...item}
                        />
                    ))}
                </div>
            </RadioGroupProvider>
        );
    }
);
