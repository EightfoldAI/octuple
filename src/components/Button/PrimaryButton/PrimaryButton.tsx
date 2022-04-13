import React, { FC, Ref } from 'react';
import {
    BaseButton,
    ButtonProps,
    ButtonSize,
    ButtonShape,
    ButtonTextAlign,
    ButtonType,
} from '../';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            className,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            htmlType,
            icon,
            iconColor,
            onClick,
            onContextMenu,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            split,
            splitButtonChecked = false,
            splitButtonProps,
            style,
            text,
            theme,
            toggle,
            buttonWidth,
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = classNames([
            className,
            styles.button,
            styles.buttonPrimary,
            { [styles.buttonPrimaryDisruptive]: disruptive },
        ]);

        return (
            <BaseButton
                ref={ref}
                alignText={alignText}
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                className={buttonClassNames}
                splitButtonChecked={splitButtonChecked}
                disabled={disabled}
                disruptive={disruptive}
                dropShadow={dropShadow}
                htmlType={htmlType}
                icon={icon}
                iconColor={iconColor}
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
