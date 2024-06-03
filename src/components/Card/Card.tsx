'use client';

import React, { FC, Ref, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { CardProps, CardSize, CardType } from './Card.types';
import { mergeClasses } from '../../shared/utilities';
import { ButtonShape, TwoStateButton } from '../Button';
import { SizeContext, Size } from '../ConfigProvider';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Pill } from '../Pills';
import { List } from '../List';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './card.module.scss';

export const Card: FC<CardProps> = React.forwardRef(
  (
    {
      allowDisabledFocus = false,
      avatar,
      body,
      bodyClassNames,
      bodyListOnePillProps,
      bodyListTwoPillProps,
      bodyListOneProps,
      bodyListTwoProps,
      bordered = false,
      children,
      classNames,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
      },
      disabled = false,
      dropShadow = false,
      footer,
      footerClassNames,
      footerProps,
      header,
      headerButtonProps,
      headerClassNames,
      headerIcon,
      headerTitle,
      height,
      icon,
      insetFocusVisible = false,
      isSelected = false,
      name,
      size = CardSize.Medium,
      style,
      subHeaderProps,
      subHeaderSeparatorIcon,
      type = CardType.list,
      width,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const htmlDir: string = useCanvasDirection();

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize = configContextProps.noSizeContext
      ? size
      : contextuallySized || size;

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const cardClasses: string = mergeClasses([
      classNames,
      styles.card,
      {
        [styles.cardBordered]: !!bordered,
      },
      {
        [styles.cardSmall]: mergedSize === CardSize.Flex && largeScreenActive,
      },
      {
        [styles.cardMedium]: mergedSize === CardSize.Flex && mediumScreenActive,
      },
      {
        [styles.cardMedium]: mergedSize === CardSize.Flex && smallScreenActive,
      },
      {
        [styles.cardLarge]: mergedSize === CardSize.Flex && xSmallScreenActive,
      },
      { [styles.list]: type === CardType.list },
      { [styles.disabled]: allowDisabledFocus || mergedDisabled },
      { [styles.cardLarge]: mergedSize === CardSize.Large },
      { [styles.cardMedium]: mergedSize === CardSize.Medium },
      { [styles.cardSmall]: mergedSize === CardSize.Small },
      { [styles.dropShadow]: dropShadow },
      { [styles.insetFocusVisible]: insetFocusVisible },
      { [styles.cardRtl]: htmlDir === 'rtl' },
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const footerClasses: string = mergeClasses([
      styles.footer,
      footerClassNames,
    ]);

    return (
      <div
        {...rest}
        className={cardClasses}
        ref={ref}
        style={{ ...style, ...{ height, width } }}
      >
        {children ? (
          children
        ) : (
          <>
            {/** TODO: Update predefined variants to meet latest specification. */}
            <div className={headerClasses}>
              {header && header}
              {(icon || headerTitle) && (
                <div className={styles.mainHeader}>
                  {icon && (
                    <Icon path={icon} classNames={styles.icon} size={'40px'} />
                  )}
                  {headerTitle && (
                    <div className={styles.title}>
                      {headerTitle}
                      <div className={styles.subHeader}>
                        {subHeaderProps &&
                          subHeaderProps.map((item, idx) => {
                            return (
                              <>
                                <div>{item}</div>
                                {idx < subHeaderProps.length - 1 && (
                                  <Icon
                                    path={subHeaderSeparatorIcon}
                                    classNames={styles.separator}
                                  />
                                )}
                              </>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {headerButtonProps && (
                <div className={styles.buttonIcon}>
                  <TwoStateButton
                    classNames={styles.mainHeaderButton}
                    shape={ButtonShape.Round}
                    iconOneProps={headerButtonProps.iconProps}
                    {...headerButtonProps}
                  />
                </div>
              )}
            </div>
            <div className={bodyClasses}>
              {bodyListOneProps && (
                <List
                  layout="horizontal"
                  classNames={styles.list}
                  itemStyle={{ margin: '5px' }}
                  items={bodyListOneProps.contents}
                  renderItem={(item) => {
                    return bodyListOneProps.type === 'list' ? (
                      <div className={styles.listItem}>
                        {item.showIcon && (
                          <Icon {...bodyListOneProps.iconProps} />
                        )}
                        <span>{item.label}</span>
                      </div>
                    ) : (
                      <Pill label={item.label} {...bodyListOnePillProps} />
                    );
                  }}
                />
              )}
              {bodyListTwoProps && (
                <Stack direction="horizontal" gap="xs" wrap="wrap">
                  {bodyListTwoProps?.contents.map((item) => {
                    return bodyListTwoProps.type === 'list' ? (
                      <div className={styles.listItem}>
                        {item.showIcon && (
                          <Icon {...bodyListOneProps.iconProps} />
                        )}
                        <span>{item.label}</span>
                      </div>
                    ) : (
                      <Pill label={item.label} {...bodyListTwoPillProps} />
                    );
                  })}
                </Stack>
              )}
              {body && body}
            </div>
            <div className={footerClasses}>
              {footerProps && (
                <div className={styles.container}>
                  {footerProps.map((item: any) => {
                    return (
                      <div className={styles.content}>
                        <Icon {...item.iconProps} />
                        <div>{item.text}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              {footer && footer}
            </div>
          </>
        )}
      </div>
    );
  }
);
