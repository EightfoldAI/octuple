import React, { FC } from 'react';
import { CheckBoxProps, SelectorSize } from '../Selectors.types';
import { classNames } from '../../../shared/utilities';

import styles from '../selectors.module.scss';

export const CheckBox: FC<CheckBoxProps> = ({
    ariaLabel,
    checked = false,
    color,
    defaultChecked = false,
    disabled = false,
    inputType = 'checkbox',
    id,
    name,
    size = SelectorSize.Medium,
    value,
    onClick,
}) => {
    const checkBoxDivClassNames: string = classNames([styles.selector]);

    const checkBoxInputWrapperClassNames: string = classNames([
        styles.selectorWrapper,
    ]);

    const checkBoxLabelClassNames: string = classNames([styles.selectorLabel]);

    const checkBoxCheckClassNames: string = classNames([
        styles.checkmark,
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
        <div className={checkBoxDivClassNames}>
            <label className={checkBoxInputWrapperClassNames}>
                <input
                    aria-label={ariaLabel}
                    checked={checked}
                    color={color}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    id={id}
                    onClick={onClick}
                    name={name}
                    type={inputType}
                    value={value}
                />
                <span className={checkBoxCheckClassNames}></span>
                <span className={checkBoxLabelClassNames}>{value}</span>
            </label>
        </div>
    );
};
