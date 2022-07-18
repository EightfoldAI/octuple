import React, { FC, Ref, useEffect, useState } from 'react';
import { Icon, IconName } from '../../Icon';
import { Label, LabelSize } from '../../Label';
import {
    TextAreaProps,
    TextInputShape,
    TextInputSize,
    TextInputTheme,
    TextInputWidth,
} from '../index';
import { useDebounce } from '../../../hooks/useDebounce';
import { mergeClasses, uniqueId } from '../../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';

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
            inline = false,
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
            shape = TextInputShape.Rectangle,
            size = TextInputSize.Flex,
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
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const [textAreaId] = useState<string>(uniqueId(id || 'textarea-'));
        const [inputValue, setInputValue] = useState(value);

        const textAreaClassNames: string = mergeClasses([
            classNames,
            styles.textArea,
            {
                [styles.inline]: inline,
            },
            { [styles.textAreaNoExpand]: !enableExpand },
            { [styles.pillShape]: shape === TextInputShape.Pill },
            {
                [styles.underline]: shape === TextInputShape.Underline,
            },
            { [styles.dark]: theme === TextInputTheme.dark },
            { [styles.inputStretch]: inputWidth === TextInputWidth.fill },
        ]);

        const textAreaGroupClassNames: string = mergeClasses([
            styles.textAreaGroup,
            {
                [styles.inline]: inline,
            },
        ]);

        const textAreaWrapperClassNames: string = mergeClasses([
            styles.inputWrapper,
            { [styles.pillShape]: shape === TextInputShape.Pill },
            {
                [styles.underline]: shape === TextInputShape.Underline,
            },
            {
                [styles.inline]: inline,
            },
            { [styles.pillShape]: shape === TextInputShape.Pill },
            {
                [styles.underline]: shape === TextInputShape.Underline,
            },
            {
                [styles.inputSize3]:
                    size === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputSize1]:
                    size === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputSize1]: size === TextInputSize.Large },
            { [styles.inputSize2]: size === TextInputSize.Medium },
            { [styles.inputSize3]: size === TextInputSize.Small },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
            {
                [styles.disabled]: allowDisabledFocus || disabled,
            },
        ]);

        useEffect(() => setInputValue(value), [value]);

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
            setInputValue(e.target.value);
            debouncedChange(e);
        };

        const getLabelSize = (): LabelSize => {
            let labelSize: LabelSize;
            if (largeScreenActive) {
                labelSize = LabelSize.Small;
            } else if (mediumScreenActive) {
                labelSize = LabelSize.Medium;
            } else if (smallScreenActive) {
                labelSize = LabelSize.Medium;
            } else if (xSmallScreenActive) {
                labelSize = LabelSize.Large;
            }
            return labelSize;
        };

        const inputSizeToLabelSizeMap = new Map<TextInputSize, LabelSize>([
            [TextInputSize.Flex, getLabelSize()],
            [TextInputSize.Large, LabelSize.Large],
            [TextInputSize.Medium, LabelSize.Medium],
            [TextInputSize.Small, LabelSize.Small],
        ]);

        return (
            <div className={textAreaWrapperClassNames}>
                {labelProps && (
                    <Label
                        inline={inline}
                        size={inputSizeToLabelSizeMap.get(size)}
                        {...labelProps}
                    />
                )}
                <div className={textAreaGroupClassNames}>
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
                        value={inputValue}
                    />
                    {enableExpand && (
                        <Icon
                            classNames={styles.textAreaResizeIcon}
                            path={IconName.mdiResizeBottomRight}
                        />
                    )}
                </div>
            </div>
        );
    }
);
