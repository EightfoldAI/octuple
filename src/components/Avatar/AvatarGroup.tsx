import React, { Ref } from 'react';
import { Avatar, AvatarGroupProps, AvatarGroupVariant } from '.';
import { List } from '../List';
import { Tooltip } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import {
  cloneElement,
  ConditionalWrapper,
  mergeClasses,
  toArray,
} from '../../shared/utilities';

import styles from './avatar.module.scss';

export const AvatarGroup: React.FC<AvatarGroupProps> = React.forwardRef(
  (
    {
      avatarListProps,
      children,
      classNames,
      groupStyle = AvatarGroupVariant.Overlapped,
      maxProps,
      size,
      style,
      type,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const maxCount: number = maxProps?.count;

    const avatarGroupClassNames: string = mergeClasses([
      styles.avatarGroup,
      { [styles.spaced]: groupStyle === AvatarGroupVariant.Spaced },
      { [styles.avatarGroupRtl]: htmlDir === 'rtl' },
      {
        [styles.spacedRtl]:
          htmlDir === 'rtl' && groupStyle === AvatarGroupVariant.Spaced,
      },
      classNames,
    ]);

    const childrenWithProps: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >[] = toArray(children).map(
      (
        child: React.ReactElement<
          any,
          string | React.JSXElementConstructor<any>
        >,
        index: number
      ) =>
        cloneElement(child, {
          key: `avatar-key-${index}`,
          size: size,
          type: type,
        })
    );

    const numChildren: number = avatarListProps
      ? avatarListProps?.items.length
      : childrenWithProps.length;

    const maxCountAvatar: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > = (
      <Avatar
        size={size}
        type={type}
        fontSize={styles.maxCountFontSize}
        {...maxProps}
        classNames={mergeClasses([
          styles.avatarGroupMaxCount,
          maxProps?.classNames,
        ])}
      >
        {!!maxProps?.value && maxProps?.value}
        {!maxProps?.value && `+${numChildren - maxCount}`}
      </Avatar>
    );

    const maxCountItem = (): React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > => (
      <ConditionalWrapper
        condition={maxProps?.tooltipProps !== undefined}
        wrapper={(
          children: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
          >
        ): JSX.Element => (
          <Tooltip
            {...maxProps.tooltipProps}
            classNames={mergeClasses([
              styles.avatarGroupTooltip,
              maxProps.tooltipProps.classNames,
            ])}
            content={maxProps.tooltipProps.content}
            key="avatar-tooltip-key"
          >
            {children}
          </Tooltip>
        )}
      >
        {maxCountAvatar}
      </ConditionalWrapper>
    );

    if (avatarListProps && maxCount && maxCount < numChildren) {
      const childrenShown: React.ReactNode[] = avatarListProps?.items.slice(
        0,
        maxCount
      );
      return (
        <List
          layout={'horizontal'}
          {...rest}
          ref={ref}
          additionalItem={maxCountAvatar}
          classNames={avatarGroupClassNames}
          items={childrenShown}
          renderItem={avatarListProps?.renderItem}
          renderAdditionalItem={maxCountItem}
          style={style}
        />
      );
    }

    if (!avatarListProps && maxCount && maxCount < numChildren) {
      const childrenShow: React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      >[] = childrenWithProps?.slice(0, maxCount);
      childrenShow?.push(maxCountItem());
      return (
        <div
          {...rest}
          ref={ref}
          className={avatarGroupClassNames}
          style={style}
        >
          {childrenShow}
        </div>
      );
    }

    return (
      <div {...rest} ref={ref} className={avatarGroupClassNames} style={style}>
        {childrenWithProps}
      </div>
    );
  }
);
