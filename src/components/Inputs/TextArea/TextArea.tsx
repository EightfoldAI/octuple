import React, { FC } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName } from '../../Icon/index';
import { TextAreaProps, TextInputTheme } from '../index';
import { classNames, debounce } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextArea: FC<TextAreaProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    disabled = false,
    enableExpand = false,
    id,
    label,
    labelIconButtonProps = {
        icon: IconName.mdiInformation,
    },
    maxlength,
    minlength,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    required = false,
    style,
    textAreaCols = 50,
    textAreaRows = 5,
    value,
    waitInterval = 10,
}) => {
    const textAreaClassNames: string = classNames([
        className,
        styles.textArea,
        { [styles.textAreaNoExpand]: !enableExpand },
    ]);

    const handleChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        debounce(() => triggerChange(_event), waitInterval);
    };

    const triggerChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        onChange;
    };

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.fieldLabelWrapper}>
                {label && (
                    <label className={styles.fieldLabel} htmlFor={name}>
                        {label}
                    </label>
                )}
                {labelIconButtonProps && (
                    <span className={styles.fieldLabelIconButton}>
                        <DefaultButton
                            allowDisabledFocus={
                                labelIconButtonProps.allowDisabledFocus
                            }
                            ariaLabel={labelIconButtonProps.ariaLabel}
                            disabled={labelIconButtonProps.disabled}
                            icon={labelIconButtonProps.icon}
                            iconColor={labelIconButtonProps.iconColor}
                            onClick={labelIconButtonProps.onClick}
                            size={ButtonSize.Small}
                        />
                    </span>
                )}
            </div>
            <textarea
                aria-disabled={allowDisabledFocus}
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                className={textAreaClassNames}
                cols={textAreaCols}
                disabled={disabled}
                id={id}
                maxLength={maxlength}
                minLength={minlength}
                name={name}
                onChange={handleChange}
                onBlur={!allowDisabledFocus ? onBlur : null}
                onFocus={!allowDisabledFocus ? onFocus : null}
                onKeyDown={!allowDisabledFocus ? onKeyDown : null}
                placeholder={placeholder}
                required={required}
                style={style}
                rows={textAreaRows}
                tabIndex={0}
                value={value}
            />
            {enableExpand && (
                <Icon
                    className={styles.textAreaResizeIcon}
                    path={IconName.mdiResizeBottomRight}
                />
            )}
        </div>
    );
};
