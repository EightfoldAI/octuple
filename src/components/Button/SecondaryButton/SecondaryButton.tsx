import React, { FC, Ref } from 'react';
import { classNames } from '../../../shared/utilities';
import {
    ButtonShape,
    BaseButton,
    ButtonProps,
    ButtonSize,
    ButtonType,
} from '../';

import styles from '../button.module.scss';

export const SecondaryButton: FC<ButtonProps> = React.forwardRef(
    (
        {
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
            text,
            theme,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            style,
            toggle,
            buttonWidth,
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = classNames([
            className,
            styles.button,
            styles.buttonSecondary,
            { [styles.buttonSecondaryDisruptive]: disruptive },
        ]);

        return (
            <BaseButton
                ref={ref}
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                className={buttonClassNames}
                disabled={disabled}
                disruptive={disruptive}
                dropShadow={dropShadow}
                htmlType={htmlType}
                icon={icon}
                iconColor={iconColor}
                onClick={onClick}
                shape={shape}
                size={size}
                style={style}
                text={text}
                theme={theme}
                type={ButtonType.Secondary}
                toggle={toggle}
                buttonWidth={buttonWidth}
            />
        );
    }
);
