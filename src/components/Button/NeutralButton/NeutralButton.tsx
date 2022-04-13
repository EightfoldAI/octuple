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

export const NeutralButton: FC<ButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            checked = false,
            className,
            disabled = false,
            dropShadow = false,
            htmlType,
            icon,
            iconColor,
            onClick,
            text,
            theme,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            split,
            splitButtonProps,
            splitButtonChecked = false,
            style,
            toggle,
            buttonWidth,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = classNames([
            className,
            styles.button,
            styles.buttonNeutral,
        ]);

        return (
            <BaseButton
                {...rest}
                ref={ref}
                alignText={alignText}
                allowDisabledFocus={allowDisabledFocus}
                ariaLabel={ariaLabel}
                checked={checked}
                className={buttonClassNames}
                disabled={disabled}
                dropShadow={dropShadow}
                htmlType={htmlType}
                icon={icon}
                iconColor={iconColor}
                onClick={onClick}
                shape={shape}
                size={size}
                split={split}
                splitButtonChecked={splitButtonChecked}
                splitButtonProps={splitButtonProps}
                style={style}
                text={text}
                theme={theme}
                type={ButtonType.Neutral}
                toggle={toggle}
                buttonWidth={buttonWidth}
            />
        );
    }
);
