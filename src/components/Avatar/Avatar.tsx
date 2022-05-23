import React, { Children, FC } from 'react';

// Styles:
import styles from './avatar.module.scss';
import { AvatarProps, AvatarFallbackProps, AvatarIconProps } from './';
import { mergeClasses } from '../../shared/utilities';
import { Icon } from '../Icon';

export const AVATAR_CLASS_SET = [
    styles.disruptive,
    styles.grey,
    styles.blue,
    styles.orange,
    styles.green,
    styles.violet,
    styles.yellow,
    styles.bluegreen,
];

const AvatarFallback: FC<AvatarFallbackProps> = ({
    children,
    classNames,
    style = {},
}) => {
    const avatarClasses: string = mergeClasses([
        styles.wrapperStyle,
        classNames,
        AVATAR_CLASS_SET[
            Math.floor(Math.random() * 100) % AVATAR_CLASS_SET.length
        ],
    ]);

    return (
        <div className={avatarClasses} style={style}>
            <span>{children}</span>
        </div>
    );
};

const AvatarIcon: FC<AvatarIconProps> = ({
    iconProps,
    fontSize,
    classNames,
    style = {},
}) => {
    const wrapperClasses: string = mergeClasses([
        styles.wrapperStyle,
        classNames,
    ]);

    return (
        <div className={wrapperClasses} style={style}>
            <Icon size={`${fontSize}px`} {...iconProps} />
        </div>
    );
};

export const Avatar: FC<AvatarProps> = ({
    classNames,
    src,
    alt,
    size = 32,
    type = 'square',
    style = {},
    fontSize = 18,
    iconProps,
    children,
}) => {
    const imageClasses: string = mergeClasses([
        styles.imageStyle,
        classNames,
        { [styles.roundImage]: type === 'round' },
    ]);

    if (src) {
        return (
            <img
                src={src}
                className={imageClasses}
                alt={alt}
                width={size}
                height={size}
                style={style}
            />
        );
    }

    const wrapperContainerStyle: Object = {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        fontSize: `${fontSize}px`,
        ...style,
    };

    if (iconProps) {
        return (
            <AvatarIcon
                iconProps={iconProps}
                classNames={imageClasses}
                style={wrapperContainerStyle}
                fontSize={fontSize}
            />
        );
    }

    return (
        <AvatarFallback classNames={imageClasses} style={wrapperContainerStyle}>
            {children}
        </AvatarFallback>
    );
};

export default Avatar;
