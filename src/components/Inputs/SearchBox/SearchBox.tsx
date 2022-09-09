import React, { FC, Ref, useContext } from 'react';
import DisabledContext, {
    Disabled,
} from '../../ConfigProvider/DisabledContext';
import { ShapeContext, Shape, SizeContext, Size } from '../../ConfigProvider';
import { IconName } from '../../Icon';
import {
    SearchBoxProps,
    TextInput,
    TextInputIconAlign,
    TextInputShape,
    TextInputSize,
    TextInputWidth,
} from '../index';
import { FormItemInputContext } from '../../Form/Context';
import { getMergedStatus } from '../../../shared/utilities';

export const SearchBox: FC<SearchBoxProps> = React.forwardRef(
    (
        {
            alignIcon = TextInputIconAlign.Left,
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            clearable = true,
            clearButtonAriaLabel,
            configContextProps = {
                noDisabledContext: false,
                noShapeContext: false,
                noSizeContext: false,
            },
            disabled = false,
            formItemInput = false,
            iconProps,
            iconButtonProps = {
                allowDisabledFocus: false,
                disabled: false,
                iconProps: { path: IconName.mdiMagnify },
            },
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
            onSubmit,
            placeholder = 'Search',
            shape = TextInputShape.Pill,
            size = TextInputSize.Medium,
            status,
            style,
            value,
            waitInterval = 500,
            ...rest
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const { status: contextStatus, isFormItemInput } =
            useContext(FormItemInputContext);
        const mergedStatus = getMergedStatus(contextStatus, status);
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallyShaped: Shape = useContext(ShapeContext);
        const mergedShape = configContextProps.noShapeContext
            ? shape
            : contextuallyShaped || shape;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        return (
            <form role="search" onSubmit={(_event) => onSubmit?.(_event)}>
                <TextInput
                    {...rest}
                    ref={ref}
                    alignIcon={alignIcon}
                    clearable={clearable}
                    allowDisabledFocus={allowDisabledFocus}
                    ariaLabel={ariaLabel}
                    autoFocus={autoFocus}
                    classNames={classNames}
                    clearButtonAriaLabel={clearButtonAriaLabel}
                    disabled={mergedDisabled}
                    formItemInput={mergedFormItemInput}
                    htmlType="search"
                    iconProps={iconProps}
                    iconButtonProps={{
                        htmlType: 'button',
                        iconProps: {
                            path: IconName.mdiMagnify,
                        },
                        ...iconButtonProps,
                        disabled: mergedDisabled,
                    }}
                    id={id}
                    inline={inline}
                    inputWidth={inputWidth}
                    labelProps={labelProps}
                    maxlength={maxlength}
                    minlength={minlength}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    shape={mergedShape}
                    size={mergedSize}
                    status={mergedStatus}
                    style={style}
                    value={value}
                    waitInterval={waitInterval}
                />
            </form>
        );
    }
);
