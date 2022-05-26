import React, { Ref, FC } from 'react';

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

const AvatarFallback: FC<AvatarFallbackProps> = React.forwardRef(
    ({ children, classNames, style }, ref: Ref<HTMLDivElement>) => {
        const avatarClasses: string = mergeClasses([
            styles.wrapperStyle,
            classNames,
            AVATAR_CLASS_SET[
                Math.floor(Math.random() * 100) % AVATAR_CLASS_SET.length
            ],
        ]);

        return (
            <div ref={ref} className={avatarClasses} style={style}>
                {children}
            </div>
        );
    }
);

const AvatarIcon: FC<AvatarIconProps> = React.forwardRef(
    ({ iconProps, fontSize, classNames, style }, ref: Ref<HTMLDivElement>) => {
        const wrapperClasses: string = mergeClasses([
            styles.wrapperStyle,
            classNames,
        ]);

        return (
            <div ref={ref} className={wrapperClasses} style={style}>
                <Icon size={fontSize} {...iconProps} />
            </div>
        );
    }
);

export const Avatar: FC<AvatarProps> = React.forwardRef(
    (
        {
            classNames,
            src,
            alt,
            size = '32px',
            type = 'square',
            style = {},
            fontSize = '18px',
            iconProps,
            children,
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const imageClasses: string = mergeClasses([
            styles.imageStyle,
            { [styles.roundImage]: type === 'round' },
        ]);

        const wrapperContainerStyle: React.CSSProperties = {
            width: size,
            height: size,
            minWidth: size,
            minHeight: size,
            fontSize: fontSize,
            ...style,
        };

        if (src) {
            return (
                <div
                    ref={ref}
                    style={wrapperContainerStyle}
                    className={classNames}
                >
                    <img
                        src={src}
                        className={imageClasses}
                        alt={alt}
                        width={size}
                        height={size}
                    />
                </div>
            );
        }

        const wrapperClasses: string = mergeClasses([classNames, imageClasses]);

        if (iconProps) {
            return (
                <AvatarIcon
                    iconProps={iconProps}
                    classNames={wrapperClasses}
                    style={wrapperContainerStyle}
                    fontSize={fontSize}
                    ref={ref}
                />
            );
        }

        return (
            <AvatarFallback
                classNames={wrapperClasses}
                style={wrapperContainerStyle}
                ref={ref}
            >
                {children}
            </AvatarFallback>
        );
    }
);
