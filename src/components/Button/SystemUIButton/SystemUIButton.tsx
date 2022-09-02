import React, { FC, Ref } from 'react';
import {
    BaseButton,
    ButtonIconAlign,
    ButtonProps,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonType,
} from '..';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const SystemUIButton: FC<ButtonProps> = React.forwardRef(
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
            floatingButtonProps,
            htmlType,
            iconProps,
            onClick,
            text,
            shape = ButtonShape.Pill,
            size = ButtonSize.Medium,
            split,
            splitButtonProps,
            splitButtonChecked = false,
            style,
            toggle,
            buttonWidth,
            transparent = false,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const buttonClassNames: string = mergeClasses([
            classNames,
            styles.button,
            styles.buttonSystemUi,
            { [styles.transparent]: transparent },
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
                type={ButtonType.SystemUI}
                buttonWidth={buttonWidth}
            />
        );
    }
);
