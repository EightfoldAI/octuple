import React, { FC, Ref } from 'react';
import {
    BaseButton,
    ButtonIconAlign,
    ButtonProps,
    ButtonSize,
    ButtonShape,
    ButtonTextAlign,
    ButtonType,
} from '../';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = React.forwardRef(
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
            disruptive = false,
            dropShadow = false,
            htmlType,
            iconProps,
            onClick,
            onContextMenu,
            shape = ButtonShape.Pill,
            size = ButtonSize.Flex,
            split,
            splitButtonChecked = false,
            splitButtonProps,
            style,
            text,
            theme,
            toggle,
            buttonWidth,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = mergeClasses([
            classNames,
            styles.button,
            styles.buttonPrimary,
            { [styles.buttonPrimaryDisruptive]: disruptive },
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
                splitButtonChecked={splitButtonChecked}
                disabled={disabled}
                disruptive={disruptive}
                dropShadow={dropShadow}
                htmlType={htmlType}
                iconProps={iconProps}
                onClick={onClick}
                onContextMenu={onContextMenu}
                shape={shape}
                size={size}
                split={split}
                splitButtonProps={splitButtonProps}
                style={style}
                text={text}
                theme={theme}
                type={ButtonType.Primary}
                toggle={toggle}
                buttonWidth={buttonWidth}
            />
        );
    }
);
