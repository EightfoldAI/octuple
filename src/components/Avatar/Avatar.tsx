import React, { FC, Ref, useMemo } from 'react';

// Styles:
import styles from './avatar.module.scss';
import {
  AvatarFallbackProps,
  AvatarIconProps,
  AvatarProps,
  BaseAvatarProps,
  StatusItemsPosition,
  StatusItemsProps,
} from './';
import { mergeClasses } from '../../shared/utilities';
import { Icon } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

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

export const getStatusItemSizeAndPadding = (
  avatarSize: number
): [number, number] => {
  const statusItemSize: number = (avatarSize * 16) / 100;
  return [statusItemSize, (statusItemSize * 6) / 16];
};

const statusItemPositionRtlMap: {
  [key in StatusItemsPosition]: StatusItemsPosition;
} = {
  [StatusItemsPosition.Top]: StatusItemsPosition.Top,
  [StatusItemsPosition.Bottom]: StatusItemsPosition.Bottom,
  [StatusItemsPosition.Left]: StatusItemsPosition.Right,
  [StatusItemsPosition.Right]: StatusItemsPosition.Left,
  [StatusItemsPosition.TopRight]: StatusItemsPosition.TopLeft,
  [StatusItemsPosition.TopLeft]: StatusItemsPosition.TopRight,
  [StatusItemsPosition.BottomRight]: StatusItemsPosition.BottomLeft,
  [StatusItemsPosition.BottomLeft]: StatusItemsPosition.BottomRight,
};

const AvatarStatusItems: FC<BaseAvatarProps> = React.forwardRef(
  ({ outline, size, statusItems }) => {
    const htmlDir: string = useCanvasDirection();

    const getStatusItemPositionStyle = (
      itemPos: StatusItemsPosition,
      itemProps: StatusItemsProps
    ): React.CSSProperties => {
      const outlineWidth: string = outline ? outline.outlineWidth : '0px'; // Avatar outline width
      const avatarWidth: string = size;
      const itemWidth: string = `(${itemProps.size} + (2 * ${itemProps.padding}))`; // Status item width

      switch (htmlDir === 'rtl' ? statusItemPositionRtlMap[itemPos] : itemPos) {
        case StatusItemsPosition.TopRight:
          return {
            top: `calc(-1 * ${outlineWidth})`,
            right: `calc(-1 * ${outlineWidth})`,
          };
        case StatusItemsPosition.TopLeft:
          return {
            top: `calc(-1 * ${outlineWidth})`,
            left: `calc(-1 * ${outlineWidth})`,
          };
        case StatusItemsPosition.BottomRight:
          return {
            bottom: `calc(-1 * ${outlineWidth})`,
            right: `calc(-1 * ${outlineWidth})`,
          };
        case StatusItemsPosition.BottomLeft:
          return {
            bottom: `calc(-1 * ${outlineWidth})`,
            left: `calc(-1 * ${outlineWidth})`,
          };
        case StatusItemsPosition.Left:
          return {
            bottom: `calc((${avatarWidth} - ${itemWidth}) / 2)`,
            left: `calc(-1 * ${itemWidth} / 2 - ${outlineWidth})`,
          };
        case StatusItemsPosition.Right:
          return {
            bottom: `calc((${avatarWidth} - ${itemWidth}) / 2)`,
            right: `calc(-1 * ${itemWidth} / 2 - ${outlineWidth})`,
          };
        case StatusItemsPosition.Top:
          return {
            top: `calc(-1 * ${itemWidth} / 2 - ${outlineWidth})`,
            left: `calc((${avatarWidth} - ${itemWidth}) / 2)`,
          };
        case StatusItemsPosition.Bottom:
        default:
          return {
            bottom: `calc(-1 * ${itemWidth} / 2 - ${outlineWidth})`,
            left: `calc((${avatarWidth} - ${itemWidth}) / 2)`,
          };
      }
    };

    return (
      <>
        {Object.keys(statusItems).map((position: StatusItemsPosition) => {
          const statusItemProps: StatusItemsProps = statusItems[position];
          return (
            <div
              style={{
                position: 'absolute',
                borderRadius: '50%',
                background:
                  statusItemProps.backgroundColor || 'var(--white-color)',
                padding: statusItemProps.padding,
                ...getStatusItemPositionStyle(position, statusItemProps),
                ...(statusItemProps.outline
                  ? {
                      'outline-color': statusItemProps.outline.outlineColor,
                      'outline-offset': statusItemProps.outline.outlineOffset,
                      'outline-style': statusItemProps.outline.outlineStyle,
                      'outline-width': statusItemProps.outline.outlineWidth,
                    }
                  : {}),
              }}
              {...(statusItemProps.onClick
                ? {
                    className: styles.avatarStatusBtn,
                    onClick: statusItemProps.onClick,
                    role: 'button',
                  }
                : {})}
              {...(statusItemProps.ariaLabel
                ? { 'aria-label': statusItemProps.ariaLabel }
                : {})}
            >
              <Icon {...statusItemProps} />
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
    { children, classNames, fontSize, iconProps, style },
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
      outline,
      statusItems = {},
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
      ...(Object.keys(statusItems).length > 0 ? { position: 'relative' } : {}),
      ...(outline
        ? {
            'outline-color': outline.outlineColor,
            'outline-offset': outline.outlineOffset,
            'outline-style': outline.outlineStyle,
            'outline-width': outline.outlineWidth,
          }
        : {}),
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
          <AvatarStatusItems
            outline={outline}
            size={size}
            statusItems={statusItems}
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
        >
          <AvatarStatusItems
            outline={outline}
            size={size}
            statusItems={statusItems}
          />
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
        <AvatarStatusItems
          outline={outline}
          size={size}
          statusItems={statusItems}
        />
      </AvatarFallback>
    );
  }
);
