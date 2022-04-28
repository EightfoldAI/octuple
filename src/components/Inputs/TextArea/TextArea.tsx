import React, { FC, useState } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName } from '../../Icon/index';
import { TextInputWidth, TextAreaProps, TextInputTheme } from '../index';
import { Tooltip } from '../../Tooltip';
import { useDebounce } from '../../../hooks/useDebounce';
import { classNames, uniqueId } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextArea: FC<TextAreaProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    disabled = false,
    enableExpand = false,
    id,
    inputWidth = TextInputWidth.fitContent,
    label,
    labelIconButtonProps,
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
    theme = TextInputTheme.light,
    value,
    waitInterval = 10,
}) => {
    const [textAreaId] = useState<string>(uniqueId(id || 'textarea-'));

    const textAreaClassNames: string = classNames([
        className,
        styles.textArea,
        { [styles.textAreaNoExpand]: !enableExpand },
        { [styles.dark]: theme === TextInputTheme.dark },
        { [styles.inputStretch]: inputWidth === TextInputWidth.fill },
    ]);

    const textAreaWrapperClassNames: string = classNames([
        styles.inputWrapper,
        {
            [styles.inputStretch]: inputWidth === TextInputWidth.fill,
        },
    ]);

    const handleChange = useDebounce<React.ChangeEvent<HTMLTextAreaElement>>(
        (_event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            triggerChange(_event),
        waitInterval
    );

    const triggerChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        onChange;
    };

    return (
        <div className={textAreaWrapperClassNames}>
            <div className={styles.fieldLabel}>
                {label && (
                    <label className={styles.textStyle} htmlFor={name}>
                        {label}
                    </label>
                )}
                {labelIconButtonProps?.show && (
                    <span className={styles.fieldLabelIconButton}>
                        <Tooltip
                            content={labelIconButtonProps.toolTipContent}
                            placement={
                                labelIconButtonProps?.toolTipPlacement || 'top'
                            }
                            positionStrategy={
                                labelIconButtonProps.toolTipPositionStrategy
                            }
                            theme={labelIconButtonProps.toolTipTheme}
                        >
                            <DefaultButton
                                allowDisabledFocus={
                                    labelIconButtonProps.allowDisabledFocus
                                }
                                ariaLabel={labelIconButtonProps.ariaLabel}
                                className={styles.labelIconButton}
                                disabled={labelIconButtonProps.disabled}
                                icon={
                                    labelIconButtonProps?.icon ||
                                    IconName.mdiInformation
                                }
                                iconColor={labelIconButtonProps.iconColor}
                                onClick={
                                    !labelIconButtonProps.allowDisabledFocus
                                        ? labelIconButtonProps.onClick
                                        : null
                                }
                                size={ButtonSize.Small}
                            />
                        </Tooltip>
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
                id={textAreaId}
                maxLength={maxlength}
                minLength={minlength}
                name={name}
                onChange={!allowDisabledFocus ? handleChange : null}
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
