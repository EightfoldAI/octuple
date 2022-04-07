import React, { FC, Ref } from 'react';
import { BaseButton, ButtonProps, ButtonSize, ButtonType } from '../';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const DefaultButton: FC<ButtonProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            className,
            disabled = false,
            htmlType,
            icon,
            iconColor,
            onClick,
            text,
            theme,
            size = ButtonSize.Flex,
            style,
            toggle,
            buttonWidth,
            disruptive = false,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = classNames([
            className,
            styles.button,
            styles.buttonDefault,
            { [styles.buttonDisruptive]: disruptive },
        ]);

        return (
            <BaseButton
                {...rest}
                ref={ref}
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                className={buttonClassNames}
                disabled={disabled}
                htmlType={htmlType}
                icon={icon}
                iconColor={iconColor}
                onClick={onClick}
                size={size}
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
