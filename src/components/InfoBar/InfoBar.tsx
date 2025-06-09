'use client';

import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName, ThemeNames } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { InfoBarLocale, InfoBarsProps, InfoBarType } from './InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { Button, ButtonShape, ButtonWidth, ButtonVariant } from '../Button';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './infoBar.module.scss';
import themedComponentStyles from './infoBar.theme.module.scss';

export const InfoBar: FC<InfoBarsProps> = React.forwardRef(
  (props: InfoBarsProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonClassNames,
      actionButtonProps,
      bordered = false,
      classNames,
      closable,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      content,
      contentClassNames,
      contentWrapperClassNames,
      gradient = false,
      icon,
      iconClassNames,
      iconProps,
      locale = enUS,
      onClose,
      role = 'alert',
      style,
      theme,
      themeContainerId,
      type = InfoBarType.neutral,
      ...rest
    } = props;
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    console.log('iconProps', iconProps);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [infoBarLocale] = useLocaleReceiver('InfoBar');
    let mergedLocale: InfoBarLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = infoBarLocale || props.locale;
    }

    const [closeButtonAriaLabelText, setCloseButtonAriaLabelText] =
      useState<string>(defaultCloseButtonAriaLabelText);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCloseButtonAriaLabelText(
        props.closeButtonAriaLabelText
          ? props.closeButtonAriaLabelText
          : mergedLocale.lang!.closeButtonAriaLabelText
      );
    }, [mergedLocale]);

    setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 1000);

    const infoBarClassNames: string = mergeClasses([
      styles.infoBar,
      { [styles.bordered]: !!bordered },
      classNames,
      { [styles.neutral]: type === InfoBarType.neutral },
      { [styles.positive]: type === InfoBarType.positive },
      { [styles.warning]: type === InfoBarType.warning },
      { [styles.disruptive]: type === InfoBarType.disruptive },
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.gradient]: mergedGradient },
      { [styles.aiAgent]: mergedTheme === ThemeNames.AIAgent },
    ]);

    const messageClasses: string = mergeClasses([
      styles.message,
      'body2',
      contentClassNames,
    ]);

    const getIconName = (): IconName => {
      if (icon) {
        return icon;
      }
      switch (type) {
        case InfoBarType.disruptive:
        case InfoBarType.neutral:
          return IconName.mdiInformation;
        case InfoBarType.positive:
          return IconName.mdiCheckCircle;
        case InfoBarType.warning:
          return IconName.mdiAlert;
      }
    };

    return (
      <LocaleReceiver componentName={'InfoBar'} defaultLocale={enUS}>
        {(_contextLocale: InfoBarLocale) => {
          return (
            <ThemeContextProvider
              containerId={themeContainerId}
              componentClassName={themedComponentStyles.theme}
              theme={mergedTheme}
            >
              <div
                {...rest}
                className={infoBarClassNames}
                ref={ref}
                style={style}
              >
                <Icon
                  path={getIconName()}
                  classNames={mergeClasses([styles.icon, iconClassNames])}
                  iconProps={iconProps}
                />
                <div
                  className={mergeClasses([
                    styles.contentWrapper,
                    contentWrapperClassNames,
                  ])}
                >
                  <div className={messageClasses} role={role}>
                    {content}
                  </div>
                  {actionButtonProps && (
                    <Button
                      buttonWidth={ButtonWidth.fitContent}
                      transparent
                      {...actionButtonProps}
                      classNames={mergeClasses([
                        styles.actionButton,
                        actionButtonClassNames,
                        actionButtonProps.classNames,
                      ])}
                      variant={ButtonVariant.SystemUI}
                    />
                  )}
                </div>
                {closable && (
                  <Button
                    ariaLabel={closeButtonAriaLabelText}
                    iconProps={{ path: closeIcon }}
                    onClick={onClose}
                    shape={ButtonShape.Round}
                    ref={closeButtonRef}
                    transparent
                    {...closeButtonProps}
                    classNames={mergeClasses([
                      styles.closeButton,
                      closeButtonProps?.classNames,
                    ])}
                    variant={ButtonVariant.SystemUI}
                  />
                )}
              </div>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
