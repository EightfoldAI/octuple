import React, { FC, Ref } from 'react';
import {
    BaseButton,
    ButtonProps,
    ButtonSize,
    ButtonShape,
    ButtonTextAlign,
    ButtonType,
} from '../';
import { IconName } from '../../Icon';
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
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            split,
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

        const splitButtonClassNames: string = classNames([
            className,
            buttonClassNames,
            { [styles.splitRight]: split },
            {
                [styles.disabled]:
                    splitButtonProps?.allowDisabledFocus ||
                    splitButtonProps?.disabled,
            },
        ]);

        return (
            <>
                <BaseButton
                    ref={ref}
                    alignText={alignText}
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
                    split={split}
                    style={style}
                    text={text}
                    theme={theme}
                    type={ButtonType.Primary}
                    toggle={toggle}
                    buttonWidth={buttonWidth}
                />
                {split && (
                    <BaseButton
                        ref={splitButtonProps?.ref}
                        alignText={splitButtonProps?.alignText}
                        allowDisabledFocus={
                            splitButtonProps?.allowDisabledFocus
                        }
                        ariaLabel={splitButtonProps?.ariaLabel}
                        checked={splitButtonProps?.checked}
                        className={splitButtonClassNames}
                        disabled={splitButtonProps?.disabled}
                        disruptive={disruptive}
                        dropShadow={dropShadow}
                        htmlType="button"
                        icon={
                            splitButtonProps?.icon || splitButtonProps?.checked
                                ? IconName.mdiChevronUp
                                : IconName.mdiChevronDown
                        }
                        iconColor={splitButtonProps?.iconColor}
                        onClick={onClick}
                        shape={shape}
                        size={size}
                        style={splitButtonProps?.style}
                        theme={theme}
                        type={ButtonType.Primary}
                    />
                )}
            </>
        );
    }
);
