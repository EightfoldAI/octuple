import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import {
    BaseButton,
    ButtonIconAlign,
    ButtonProps,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonType,
} from '../';

import styles from '../button.module.scss';

export const SecondaryButton: FC<ButtonProps> = React.forwardRef(
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
            floatingButtonProps,
            htmlType,
            iconProps,
            onClick,
            text,
            shape = ButtonShape.Pill,
            size = ButtonSize.Medium,
            split,
            splitButtonChecked = false,
            splitButtonProps,
            style,
            toggle,
            buttonWidth,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = mergeClasses([
            classNames,
            styles.button,
            styles.buttonSecondary,
            { [styles.buttonSecondaryDisruptive]: disruptive },
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
                disruptive={disruptive}
                dropShadow={dropShadow}
                floatingButtonProps={floatingButtonProps}
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
                toggle={toggle}
                type={ButtonType.Secondary}
                buttonWidth={buttonWidth}
            />
        );
    }
);
