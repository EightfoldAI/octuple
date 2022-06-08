import React, { FC, Ref } from 'react';
import { RadioButton } from '../';
import { RadioGroupProvider } from './RadioGroup.context';
import { mergeClasses } from '../../../shared/utilities';
import { RadioButtonProps, RadioGroupProps } from './Radio.types';

import styles from './radio.module.scss';

export const RadioGroup: FC<RadioGroupProps> = React.forwardRef(
    (
        { onChange, items, classNames, style, ariaLabel, value, ...rest },
        ref: Ref<HTMLDivElement>
    ) => {
        const radioGroupClasses: string = mergeClasses([
            styles.radioGroup,
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
                        <RadioButton key={item.value} {...item} />
                    ))}
                </div>
            </RadioGroupProvider>
        );
    }
);
