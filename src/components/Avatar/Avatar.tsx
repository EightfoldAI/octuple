'use client';

import React, { FC, Ref, useEffect, useMemo, useRef, useState } from 'react';
import {
  AvatarFallbackProps,
  AvatarIconProps,
  AvatarOutlineProps,
  AvatarProps,
  BaseAvatarProps,
  StatusItemIconAlign,
  StatusItemsPosition,
  StatusItemsProps,
} from './';
import { Icon } from '../Icon';
import { Popup } from '../Popup';
import { Tooltip } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { ConditionalWrapper, mergeClasses } from '../../shared/utilities';

import styles from './avatar.module.scss';

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
  // Returns: [status item size, status item padding]
  const statusItemSize: number = (avatarSize * 16) / 100;
  return [statusItemSize, (statusItemSize * 6) / 16];
};

// 0.06 factor is chosen based on design
const StatusItemWrapperPaddingFactor: number = 0.06;
const DefaultStatusItemMaxTextLength: number = 3;
const MinStatusItemFontSize: number = 12;
const StatusItemFontDiff: string = '2px';

const StatusItemOutlineDefaults: React.CSSProperties = {
  outlineColor: 'var(--grey-color)',
  outlineOffset: '0px',
  outlineStyle: 'solid',
  outlineWidth: '2px',
};

const AvatarOutlineDefaults: React.CSSProperties = {
  outlineColor: 'var(--green-tertiary-color)',
  outlineOffset: '2px',
  outlineStyle: 'solid',
  outlineWidth: '4px',
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
  ({ outline, size, statusItems }, ref: Ref<HTMLDivElement>) => {
    const statusItemsRef = useRef<{
      [key in StatusItemsPosition]?: HTMLSpanElement;
    }>({});
    const [showStatusItemsText, setShowStatusItemsText] = useState<{
      [key in StatusItemsPosition]?: boolean;
    }>({});
    const htmlDir: string = useCanvasDirection();

    const updateStatusItemTextVisibility = (position: StatusItemsPosition) => {
      const value = statusItemsRef.current[position];
      if (value === undefined) {
        return;
      }
      const styles = getComputedStyle(value); // getComputedStyle always outputs a pixel value
      // We do slice to remove "px"
      setShowStatusItemsText((prevState) => ({
        ...prevState,
        [position]:
          parseInt(styles.fontSize.slice(0, -2)) >= MinStatusItemFontSize,
      }));
    };

    useEffect(() => {
      updateStatusItemTextVisibility(StatusItemsPosition.Top);
      updateStatusItemTextVisibility(StatusItemsPosition.Bottom);
      updateStatusItemTextVisibility(StatusItemsPosition.Left);
      updateStatusItemTextVisibility(StatusItemsPosition.Right);
      updateStatusItemTextVisibility(StatusItemsPosition.TopRight);
      updateStatusItemTextVisibility(StatusItemsPosition.TopLeft);
      updateStatusItemTextVisibility(StatusItemsPosition.BottomRight);
      updateStatusItemTextVisibility(StatusItemsPosition.BottomLeft);
    }, [statusItemsRef.current]);

    const getStatusItemPositionStyle = (
      itemPos: StatusItemsPosition
    ): React.CSSProperties => {
      const outlineWidth: string = outline?.outlineWidth ?? '0px'; // Avatar outline width
      const outlineOffset: string = outline?.outlineOffset ?? '0px'; // Avatar outline offset
      const radius: string = `calc((${size} + ${outlineWidth} + ${outlineOffset}) / 2)`;

      switch (htmlDir === 'rtl' ? statusItemPositionRtlMap[itemPos] : itemPos) {
        case StatusItemsPosition.TopRight:
          return {
            transform: `rotate(${-45}deg) translate(${radius}) rotate(${45}deg)`,
          };
        case StatusItemsPosition.TopLeft:
          return {
            transform: `rotate(${-135}deg) translate(${radius}) rotate(${135}deg)`,
          };
        case StatusItemsPosition.BottomRight:
          return {
            transform: `rotate(${45}deg) translate(${radius}) rotate(${-45}deg)`,
          };
        case StatusItemsPosition.BottomLeft:
          return {
            transform: `rotate(${135}deg) translate(${radius}) rotate(${-135}deg)`,
          };
        case StatusItemsPosition.Left:
          return {
            transform: `rotate(${180}deg) translate(${radius}) rotate(${-180}deg)`,
          };
        case StatusItemsPosition.Right:
          return { transform: `translate(${radius})` };
        case StatusItemsPosition.Top:
          return {
            transform: `rotate(${-90}deg) translate(${radius}) rotate(${90}deg)`,
          };
        case StatusItemsPosition.Bottom:
        default:
          return {
            transform: `rotate(${90}deg) translate(${radius}) rotate(${-90}deg)`,
          };
      }
    };

    return (
      <>
        {Object.keys(statusItems).map((position: StatusItemsPosition) => {
          const statusItemProps: StatusItemsProps = statusItems[position];
          const alignIcon: StatusItemIconAlign =
            statusItemProps.alignIcon ?? StatusItemIconAlign.Right;
          const showStatusItemText: boolean =
            statusItemProps.text &&
            statusItemProps.text.length <=
              (statusItemProps.textMaxLength ?? DefaultStatusItemMaxTextLength);
          const wrapperPadding: string | number =
            statusItemProps?.wrapperStyle?.padding ??
            `(${size} * ${StatusItemWrapperPaddingFactor})`;
          const statusItemTextClasses = mergeClasses([
            styles.avatarStatusItemText,
            { [styles.avatarStatusItemTextRtl]: htmlDir === 'rtl' },
            {
              [styles.textMarginRight]: alignIcon == StatusItemIconAlign.Right,
            },
            { [styles.textMarginLeft]: alignIcon == StatusItemIconAlign.Left },
          ]);
          const statusItemIconElement = (
            <Icon
              {...statusItemProps}
              classNames={styles.avatarStatusItemIcon}
            />
          );
          return (
            <div
              key={position}
              ref={ref}
              style={{
                background:
                  statusItemProps.backgroundColor ??
                  'var(--avatar-status-item-background)',
                padding: `calc(${wrapperPadding})`,
                ...getStatusItemPositionStyle(position),
                ...(statusItemProps.outline
                  ? {
                      outlineColor:
                        statusItemProps.outline?.outlineColor ??
                        StatusItemOutlineDefaults.outlineColor,
                      outlineOffset:
                        statusItemProps.outline?.outlineOffset ??
                        StatusItemOutlineDefaults.outlineOffset,
                      outlineStyle:
                        statusItemProps.outline?.outlineStyle ??
                        StatusItemOutlineDefaults.outlineStyle,
                      outlineWidth:
                        statusItemProps.outline?.outlineWidth ??
                        StatusItemOutlineDefaults.outlineWidth,
                    }
                  : {}),
                ...(statusItemProps.wrapperStyle ?? {}),
              }}
              className={`${styles.avatarStatusItem} ${
                statusItemProps.wrapperClassName ?? ''
              } ${statusItemProps.onClick ? styles.clickable : ''}`}
              {...(statusItemProps.onClick
                ? {
                    onClick: statusItemProps.onClick,
                    role: 'button',
                  }
                : {})}
              {...(statusItemProps.ariaLabel
                ? { 'aria-label': statusItemProps.ariaLabel }
                : {})}
            >
              {alignIcon == StatusItemIconAlign.Left && statusItemIconElement}
              {showStatusItemText && (showStatusItemsText[position] ?? true) && (
                <span
                  ref={(el) => (statusItemsRef.current[position] = el)}
                  style={{
                    color: statusItemProps.color,
                    fontSize: `calc(${statusItemProps.size} + ${StatusItemFontDiff})`,
                    lineHeight: statusItemProps.size,
                  }}
                  className={statusItemTextClasses}
                >
                  {statusItemProps.text}
                </span>
              )}
              {alignIcon == StatusItemIconAlign.Right && statusItemIconElement}
            </div>
          );
        })}
      </>
    );
  }
);

const AvatarFallback: FC<AvatarFallbackProps> = React.forwardRef(
  (
    {
      children,
      classNames,
      hashingFunction,
      onClick,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      randomiseTheme,
      style,
      theme,
    },
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
      <div
        ref={ref}
        className={avatarClasses}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        tabIndex={0}
      >
        {children}
      </div>
    );
  }
);

const AvatarIcon: FC<AvatarIconProps> = React.forwardRef(
  (
    {
      children,
      classNames,
      fontSize,
      iconProps,
      onClick,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      style,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const wrapperClasses: string = mergeClasses([
      styles.wrapperStyle,
      classNames,
    ]);

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        tabIndex={0}
      >
        <Icon size={fontSize} {...iconProps} />
        {children}
      </div>
    );
  }
);

export const Avatar: FC<AvatarProps> = React.forwardRef(
  (
    {
      alt,
      children,
      classNames,
      fontSize = '18px',
      hashingFunction,
      key,
      iconProps,
      onClick,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      outline,
      popupProps = undefined,
      randomiseTheme,
      size = '32px',
      src,
      statusItems = {},
      style = {},
      theme,
      tooltipProps = undefined,
      type = 'square',
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const [popupTriggerSize, setPopupTriggerSize] = useState<number>(
      parseInt(size, 10)
    );
    const [popupVisible, setPopupVisibility] = useState<boolean>(false);

    let calculatedOutline: AvatarOutlineProps = undefined;
    if (outline !== undefined) {
      calculatedOutline = {
        outlineColor:
          outline?.outlineColor ?? AvatarOutlineDefaults.outlineColor,
        outlineOffset:
          outline?.outlineOffset ??
          AvatarOutlineDefaults.outlineOffset.toString(),
        outlineStyle:
          outline?.outlineStyle ?? AvatarOutlineDefaults.outlineStyle,
        outlineWidth:
          outline?.outlineWidth ??
          AvatarOutlineDefaults.outlineWidth.toString(),
      };
    }

    useEffect(() => {
      setPopupTriggerSize(parseInt(size, 10));
    }, [size]);

    const popupClassNames: string = mergeClasses([
      { [styles.avatarPopup]: popupProps && !!popupVisible },
      { [styles.avatarPopupVisible]: popupProps && !!popupVisible },
      { [styles.avatarPopupHidden]: popupProps && !popupVisible },
      { [styles.round]: type === 'round' },
    ]);

    const imageClassNames: string = mergeClasses([
      styles.avatar,
      styles.imageStyle,
      popupClassNames,
    ]);

    const wrapperContainerClassNames: string = mergeClasses([
      styles.avatarImgWrapper,
      popupClassNames,
      classNames,
    ]);

    const wrapperContainerStyle: React.CSSProperties = {
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      fontSize: fontSize,
      ...style,
      ...(Object.keys(statusItems).length > 0 ? { position: 'relative' } : {}),
    };

    const getPopup = (children: React.ReactNode): JSX.Element => (
      <Popup
        closeOnPopupClick={false}
        key={`${key}-popup`}
        minHeight={Math.floor(popupTriggerSize + popupTriggerSize / 1.5)}
        offset={-Math.floor(popupTriggerSize / 2)}
        onVisibleChange={(isVisible) => setPopupVisibility(isVisible)}
        placement="bottom-start"
        popupStyle={{
          margin:
            htmlDir === 'rtl'
              ? `0 ${Math.floor(popupTriggerSize / 4)}px`
              : `0 -${Math.floor(popupTriggerSize / 4)}px`,
          padding: `${Math.floor(popupTriggerSize / 3)}px`,
          paddingTop: `${Math.floor(popupTriggerSize / 1.5)}px`,
          borderRadius: `${Math.floor(popupTriggerSize / 4)}px`,
        }}
        portal
        tabIndex={-1} // Prevent focus on the reference wrapper, defer to Avatar
        triggerAbove
        visibleArrow={false}
        width={Math.floor(popupTriggerSize * 4)}
        {...popupProps}
      >
        {children}
      </Popup>
    );

    if (src) {
      return (
        <ConditionalWrapper
          condition={tooltipProps !== undefined || popupProps !== undefined}
          wrapper={(children: React.ReactNode): JSX.Element => (
            <>
              {tooltipProps && popupProps === undefined && (
                <Tooltip
                  classNames={styles.avatarTooltip}
                  key={`${key}-tooltip`}
                  tabIndex={-1}
                  {...tooltipProps}
                >
                  {children}
                </Tooltip>
              )}
              {popupProps && getPopup(children)}
            </>
          )}
        >
          <div
            className={wrapperContainerClassNames}
            ref={ref}
            style={wrapperContainerStyle}
          >
            <img
              alt={alt}
              className={imageClassNames}
              height={size}
              onClick={onClick}
              onKeyDown={onKeyDown}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              src={src}
              style={calculatedOutline}
              tabIndex={0}
              width={size}
            />
            <AvatarStatusItems
              outline={calculatedOutline}
              size={size}
              statusItems={statusItems}
            />
          </div>
        </ConditionalWrapper>
      );
    }

    const wrapperClassNames: string = mergeClasses([
      imageClassNames,
      classNames,
    ]);

    const wrapperChildClassNames: string = mergeClasses([
      popupClassNames,
      classNames,
    ]);

    if (iconProps) {
      return (
        <ConditionalWrapper
          condition={tooltipProps !== undefined || popupProps !== undefined}
          wrapper={(children: React.ReactNode): JSX.Element => (
            <>
              {tooltipProps && popupProps === undefined && (
                <Tooltip
                  classNames={styles.avatarTooltip}
                  key={`${key}-tooltip`}
                  tabIndex={-1}
                  {...tooltipProps}
                >
                  <div>{children}</div>
                </Tooltip>
              )}
              {popupProps &&
                getPopup(
                  <div className={wrapperChildClassNames}>{children}</div>
                )}
            </>
          )}
        >
          <AvatarIcon
            classNames={wrapperClassNames}
            fontSize={fontSize}
            iconProps={iconProps}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={ref}
            style={{ ...wrapperContainerStyle, ...(calculatedOutline ?? {}) }}
          >
            <AvatarStatusItems
              outline={calculatedOutline}
              size={size}
              statusItems={statusItems}
            />
          </AvatarIcon>
        </ConditionalWrapper>
      );
    }

    return (
      <ConditionalWrapper
        condition={tooltipProps !== undefined || popupProps !== undefined}
        wrapper={(children: React.ReactNode): JSX.Element => (
          <>
            {tooltipProps && popupProps === undefined && (
              <Tooltip
                classNames={styles.avatarTooltip}
                key={`${key}-tooltip`}
                tabIndex={-1}
                {...tooltipProps}
              >
                <div>{children}</div>
              </Tooltip>
            )}
            {popupProps &&
              getPopup(
                <div className={wrapperChildClassNames}>{children}</div>
              )}
          </>
        )}
      >
        <AvatarFallback
          classNames={wrapperClassNames}
          hashingFunction={hashingFunction}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          randomiseTheme={randomiseTheme}
          ref={ref}
          style={{ ...wrapperContainerStyle, ...(calculatedOutline ?? {}) }}
          theme={theme}
        >
          {children}
          <AvatarStatusItems
            outline={calculatedOutline}
            size={size}
            statusItems={statusItems}
          />
        </AvatarFallback>
      </ConditionalWrapper>
    );
  }
);
