import React, { FC, Ref, useMemo } from 'react';

// Styles:
import styles from './avatar.module.scss';
import {
  AvatarFallbackProps,
  AvatarIconProps,
  AvatarProps,
  BaseAvatarProps,
  StatusIconsPosition,
  StatusIconsProps,
} from './';
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

const AvatarStatusIcons: FC<BaseAvatarProps> = React.forwardRef(
  ({ statusIcons, size }) => {
    const getStatusIconStyle = (
      iconProps: StatusIconsProps
    ): React.CSSProperties => {
      return {
        position: 'absolute',
        borderRadius: '50%',
        background: iconProps.backgroundColor || '#fff',
        padding: iconProps.padding || '6px',
      };
    };

    const statusIconsPosition = (
      subIconPos: StatusIconsPosition,
      icon: StatusIconsProps
    ): React.CSSProperties => {
      const outerWidth = size;
      const innerWidth = `(${icon.size} + (2 * ${icon.padding}))`;

      switch (subIconPos) {
        case StatusIconsPosition.Top:
          return {
            top: `calc(-1 * ${innerWidth} / 2)`,
            left: `calc((${outerWidth} - ${innerWidth}) / 2)`,
          };
        case StatusIconsPosition.Bottom:
          return {
            bottom: `calc(-1 * ${innerWidth} / 2)`,
            left: `calc((${outerWidth} - ${innerWidth}) / 2)`,
          };
        case StatusIconsPosition.Left:
          return {
            bottom: `calc((${outerWidth} - ${innerWidth}) / 2)`,
            left: `calc(-1 * ${innerWidth} / 2)`,
          };
        case StatusIconsPosition.Right:
          return {
            bottom: `calc((${outerWidth} - ${innerWidth}) / 2)`,
            right: `calc(-1 * ${innerWidth} / 2)`,
          };
        case StatusIconsPosition.TopRight:
          return {
            top: `0`,
            right: `0`,
          };
        case StatusIconsPosition.TopLeft:
          return {
            top: `0`,
            left: `0`,
          };
        case StatusIconsPosition.BottomRight:
          return {
            bottom: `0`,
            right: `0`,
          };
        case StatusIconsPosition.BottomLeft:
          return {
            bottom: `0`,
            left: `0`,
          };
      }
    };

    return (
      <>
        {Object.keys(statusIcons).map((position: StatusIconsPosition) => {
          const iconProps = statusIcons[position];
          return (
            <div
              style={{
                ...getStatusIconStyle(iconProps),
                ...statusIconsPosition(position, iconProps),
              }}
              onClick={iconProps.onClick}
            >
              <Icon {...iconProps} />
            </div>
          );
        })}
      </>
    );
  }
);

const AvatarFallback: FC<AvatarFallbackProps> = React.forwardRef(
  (
    { children, classNames, style, hashingFunction, theme, randomiseTheme },
    ref: Ref<HTMLDivElement>
  ) => {
    const colorSetIndex: number = useMemo(() => {
      if (randomiseTheme) {
        return Math.floor(Math.random() * 100) % AVATAR_THEME_SET.length;
      }
      if (hashingFunction) {
        return Math.floor(hashingFunction()) % AVATAR_THEME_SET.length;
      }
      return -1;
    }, []);

    const avatarClasses: string = mergeClasses([
      styles.wrapperStyle,
      styles.avatar,
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
  (
    { iconProps, fontSize, classNames, style, children },
    ref: Ref<HTMLDivElement>
  ) => {
    const wrapperClasses: string = mergeClasses([
      styles.wrapperStyle,
      styles.avatar,
      classNames,
    ]);

    return (
      <div ref={ref} className={wrapperClasses} style={style}>
        <Icon size={fontSize} {...iconProps} />
        {children}
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
      statusIcons = {},
      children,
      hashingFunction,
      theme,
      randomiseTheme,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const imageClasses: string = mergeClasses([
      styles.avatar,
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
      ...(Object.keys(statusIcons).length > 0 ? { position: 'relative' } : {}),
    };

    if (src) {
      return (
        <div ref={ref} style={wrapperContainerStyle} className={classNames}>
          <img
            src={src}
            className={imageClasses}
            alt={alt}
            width={size}
            height={size}
          />
          <AvatarStatusIcons statusIcons={statusIcons} size={size} />
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
        >
          <AvatarStatusIcons statusIcons={statusIcons} size={size} />
        </AvatarIcon>
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
        <AvatarStatusIcons statusIcons={statusIcons} size={size} />
      </AvatarFallback>
    );
  }
);
