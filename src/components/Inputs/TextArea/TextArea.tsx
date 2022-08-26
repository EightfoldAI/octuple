import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import DisabledContext, {
    DisabledType,
} from '../../ConfigProvider/DisabledContext';
import {
    ShapeContext,
    ShapeType,
    SizeContext,
    SizeType,
} from '../../ConfigProvider';
import { Icon, IconName } from '../../Icon';
import { Label } from '../../Label';
import {
    TextAreaProps,
    TextInputShape,
    TextInputSize,
    TextInputWidth,
} from '../index';
import { useDebounce } from '../../../hooks/useDebounce';
import { mergeClasses, uniqueId } from '../../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { FormItemInputContext } from '../../Form/Context';
import { getMergedStatus } from '../../../shared/utilities';

import styles from '../input.module.scss';
import { ValidateStatus } from '../../Form/FormItem';

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
            shape = 'rectangle' as ShapeType,
            size = 'medium' as SizeType,
            status,
            style,
            textAreaCols = 50,
            textAreaRows = 5,
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

        const { status: contextStatus, isFormItemInput } =
            useContext(FormItemInputContext);
        const mergedStatus = getMergedStatus(contextStatus, status);

        const contextuallyDisabled: DisabledType = useContext(DisabledContext);
        const mergedDisabled: boolean = contextuallyDisabled || disabled;

        const contextuallySized: SizeType = useContext(SizeContext);
        const mergedSize = contextuallySized || size;

        const contextuallyShaped: ShapeType = useContext(ShapeContext);
        const mergedShape = contextuallyShaped || shape;

        const getStatusClassNames = (
            status?: ValidateStatus,
            hasFeedback?: boolean
        ): string => {
            return mergeClasses({
                [styles.statusSuccess]: status === 'success',
                [styles.statusWarning]: status === 'warning',
                [styles.statusError]: status === 'error',
                [styles.statusValidating]: status === 'validating',
                [styles.hasFeedback]: hasFeedback,
            });
        };

        const textAreaClassNames: string = mergeClasses([
            classNames,
            styles.textArea,
            {
                [styles.inline]: inline,
            },
            { [styles.textAreaNoExpand]: !enableExpand },
            { [styles.pillShape]: mergedShape === TextInputShape.Pill },
            {
                [styles.underline]: mergedShape === TextInputShape.Underline,
            },
            { [styles.inputStretch]: inputWidth === TextInputWidth.fill },
            { ['in-form-item']: isFormItemInput },
            getStatusClassNames(mergedStatus),
        ]);

        const textAreaGroupClassNames: string = mergeClasses([
            styles.textAreaGroup,
            {
                [styles.inline]: inline,
            },
            getStatusClassNames(mergedStatus),
        ]);

        const textAreaWrapperClassNames: string = mergeClasses([
            styles.inputWrapper,
            { [styles.pillShape]: mergedShape === TextInputShape.Pill },
            {
                [styles.underline]: mergedShape === TextInputShape.Underline,
            },
            {
                [styles.inline]: inline,
            },
            {
                [styles.inputSmall]:
                    mergedSize === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputLarge]:
                    mergedSize === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputLarge]: mergedSize === TextInputSize.Large },
            { [styles.inputMedium]: mergedSize === TextInputSize.Medium },
            { [styles.inputSmall]: mergedSize === TextInputSize.Small },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
            {
                [styles.disabled]: allowDisabledFocus || mergedDisabled,
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

        return (
            <div className={textAreaWrapperClassNames}>
                {labelProps && (
                    <Label inline={inline} size={mergedSize} {...labelProps} />
                )}
                <div className={textAreaGroupClassNames}>
                    <textarea
                        {...rest}
                        ref={ref}
                        aria-disabled={mergedDisabled}
                        aria-label={ariaLabel}
                        autoFocus={autoFocus}
                        className={textAreaClassNames}
                        cols={textAreaCols}
                        disabled={!allowDisabledFocus && mergedDisabled}
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
