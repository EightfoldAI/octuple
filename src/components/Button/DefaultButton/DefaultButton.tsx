import React, { FC, Ref } from 'react';
import {
    BaseButton,
    ButtonIconAlign,
    ButtonProps,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonType,
} from '../';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const DefaultButton: FC<ButtonProps> = React.forwardRef(
    (
        {
            alignIcon = ButtonIconAlign.Left,
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            classNames,
            counter,
            disabled = false,
            dropShadow = false,
            htmlType,
            iconProps,
            onClick,
            text,
            theme,
            shape = ButtonShape.Pill,
            size = ButtonSize.Flex,
            split,
            splitButtonChecked,
            splitButtonProps,
            style,
            toggle,
            buttonWidth,
            disruptive = false,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = mergeClasses([
            classNames,
            styles.button,
            styles.buttonDefault,
            { [styles.buttonDisruptive]: disruptive },
        ]);

        return (
            <BaseButton
                {...rest}
                ref={ref}
                alignIcon={alignIcon}
                alignText={alignText}
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                classNames={buttonClassNames}
                counter={counter}
                disabled={disabled}
                dropShadow={dropShadow}
                htmlType={htmlType}
                iconProps={iconProps}
                onClick={onClick}
                shape={shape}
                size={size}
                split={split}
                splitButtonChecked={splitButtonChecked}
                splitButtonProps={splitButtonProps}
                style={style}
                text={text}
                theme={theme}
                type={ButtonType.Default}
                toggle={toggle}
                buttonWidth={buttonWidth}
            />
        );
    }
);
