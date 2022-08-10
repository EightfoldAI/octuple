import React, { Ref, FC, useMemo } from 'react';

// Styles:
import styles from './avatar.module.scss';
import { AvatarProps, AvatarFallbackProps, AvatarIconProps } from './';
import { mergeClasses } from '../../shared/utilities';
import { Icon } from '../Icon';

export const AVATAR_THEME_SET = [
    styles.red,
    styles.redOrange,
    styles.orange,
    styles.yellow,
    styles.yellowGreen,
    styles.green,
    styles.blueGreen,
    styles.blue,
    styles.blueViolet,
    styles.violet,
    styles.violetRed,
    styles.grey,
];

const AvatarFallback: FC<AvatarFallbackProps> = React.forwardRef(
    (
        { children, classNames, style, hashingFunction, theme, randomiseTheme },
        ref: Ref<HTMLDivElement>
    ) => {
        const colorSetIndex: number = useMemo(() => {
            if (randomiseTheme) {
                return (
                    Math.floor(Math.random() * 100) % AVATAR_THEME_SET.length
                );
            }
            if (hashingFunction) {
                return Math.floor(hashingFunction()) % AVATAR_THEME_SET.length;
            }
            return -1;
        }, []);

        const avatarClasses: string = mergeClasses([
            styles.wrapperStyle,
            classNames,
            { [styles.red]: theme === 'red' },
            { [styles.redOrange]: theme === 'redOrange' },
            { [styles.orange]: theme === 'orange' },
            { [styles.yellow]: theme === 'yellow' },
            { [styles.yellowGreen]: theme === 'yellowGreen' },
            { [styles.green]: theme === 'green' },
            { [styles.blueGreen]: theme === 'blueGreen' },
            { [styles.blue]: theme === 'blue' },
            { [styles.blueViolet]: theme === 'blueViolet' },
            { [styles.violet]: theme === 'violet' },
            { [styles.violetRed]: theme === 'violetRed' },
            { [styles.grey]: theme === 'grey' },
            AVATAR_THEME_SET?.[colorSetIndex],
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
            hashingFunction,
            theme,
            randomiseTheme,
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
                hashingFunction={hashingFunction}
                theme={theme}
                randomiseTheme={randomiseTheme}
            >
                {children}
            </AvatarFallback>
        );
    }
);
