import React, { FC, Ref, useState } from 'react';
import { Icon, IconName } from '../../Icon';
import { Label } from '../../Label';
import { TextInputWidth, TextAreaProps, TextInputTheme } from '../index';
import { useDebounce } from '../../../hooks/useDebounce';
import { mergeClasses, uniqueId } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextArea: FC<TextAreaProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            disabled = false,
            enableExpand = false,
            id,
            inputWidth = TextInputWidth.fitContent,
            labelProps,
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
            ...rest
        },
        ref: Ref<HTMLTextAreaElement>
    ) => {
        const [textAreaId] = useState<string>(uniqueId(id || 'textarea-'));

        const textAreaClassNames: string = mergeClasses([
            classNames,
            styles.textArea,
            { [styles.textAreaNoExpand]: !enableExpand },
            { [styles.dark]: theme === TextInputTheme.dark },
            { [styles.inputStretch]: inputWidth === TextInputWidth.fill },
        ]);

        const textAreaWrapperClassNames: string = mergeClasses([
            styles.inputWrapper,
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
        ]);

        const debouncedChange = useDebounce<
            React.ChangeEvent<HTMLTextAreaElement>
        >(
            (
                _event?: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                >
            ) => onChange?.(_event),
            waitInterval
        );

        // We need to persist the syntheticevent object, as useDebounce uses a timeout function internally
        // Reference: https://reactjs.org/docs/legacy-event-pooling.html
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.persist();
            debouncedChange(e);
        };

        return (
            <div className={textAreaWrapperClassNames}>
                {labelProps && <Label {...labelProps} />}
                <textarea
                    {...rest}
                    ref={ref}
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
                        classNames={styles.textAreaResizeIcon}
                        path={IconName.mdiResizeBottomRight}
                    />
                )}
            </div>
        );
    }
);
