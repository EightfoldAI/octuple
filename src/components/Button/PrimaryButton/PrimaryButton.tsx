import React, { FC, Ref } from 'react';
import { BaseButton, ButtonProps, ButtonSize, ButtonType } from '../';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            className,
            disabled = false,
            disruptive = false,
            htmlType,
            icon,
            iconColor,
            onClick,
            size = ButtonSize.Flex,
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
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                className={buttonClassNames}
                disabled={disabled}
                disruptive={disruptive}
                htmlType={htmlType}
                icon={icon}
                iconColor={iconColor}
                onClick={onClick}
                size={size}
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
