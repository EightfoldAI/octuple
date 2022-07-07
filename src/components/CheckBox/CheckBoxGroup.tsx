import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../shared/utilities';
import { CheckboxGroupProps, CheckBox } from './';

import styles from './checkbox.module.scss';

export const CheckBoxGroup: FC<CheckboxGroupProps> = React.forwardRef(
    (
        {
            items = [],
            onChange,
            value,
            classNames,
            style,
            ariaLabel,
            layout = 'vertical',
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const checkboxGroupClassNames = mergeClasses([
            styles.checkboxGroup,
            { [styles.vertical]: layout === 'vertical' },
            { [styles.horizontal]: layout === 'horizontal' },
            classNames,
        ]);

        return (
            <div
                className={checkboxGroupClassNames}
                style={style}
                role="group"
                aria-label={ariaLabel}
                ref={ref}
                {...rest}
            >
                {items.map((item) => (
                    <CheckBox
                        {...item}
                        checked={value?.includes(item.value)}
                        key={item.value}
                        onChange={() => {
                            const optionIndex = value?.indexOf(item.value);
                            const newValue = [...value];
                            if (optionIndex === -1) {
                                newValue.push(item.value);
                            } else {
                                newValue.splice(optionIndex, 1);
                            }
                            onChange?.(newValue);
                        }}
                    />
                ))}
            </div>
        );
    }
);
