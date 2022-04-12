import React, { FC } from 'react';
import { RadioButtonProps, SelectorSize } from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../selectors.module.scss';

export const RadioButton: FC<RadioButtonProps> = ({
    ariaLabel,
    checked = false,
    color = '',
    id,
    inputType = 'radio',
    name,
    size = SelectorSize.Medium,
    value,
    onClick,
}) => {
    const radioButtonDivClassNames: string = classNames([styles.selector]);

    const radioButtonInputWrapperClassNames: string = classNames([
        styles.selectorWrapper,
    ]);

    const radioButtonLabelClassNames: string = classNames([
        styles.selectorLabel,
    ]);

    const radioButtonClassNames: string = classNames([
        styles.radioButton,
        { [styles.selectorSmall]: size === SelectorSize.Small },
        { [styles.selectorMedium]: size === SelectorSize.Medium },
        { [styles.selectorLarge]: size === SelectorSize.Large },
        { [styles.red]: color === 'red' },
        { [styles.orange]: color === 'orange' },
        { [styles.yellow]: color === 'yellow' },
        { [styles.green]: color === 'green' },
        { [styles.bluegreen]: color === 'bluegreen' },
        { [styles.blue]: color === 'blue' },
        { [styles.violet]: color === 'violet' },
        { [styles.grey]: color === 'grey' },
    ]);

    return (
        <div className={radioButtonDivClassNames}>
            <label className={radioButtonInputWrapperClassNames}>
                <input
                    aria-label={ariaLabel}
                    checked={checked}
                    color={color}
                    id={id}
                    name={name}
                    onClick={onClick}
                    type={inputType}
                    value={value}
                />
                <span className={radioButtonClassNames}></span>
                <span className={radioButtonLabelClassNames}>{value}</span>
            </label>
        </div>
    );
};
