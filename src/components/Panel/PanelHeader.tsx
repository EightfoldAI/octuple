'use client';

import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { PanelHeaderProps, PanelLocale } from './Panel.types';
import { Button, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './panel.module.scss';
import themedComponentStyles from './panel.theme.module.scss';
import { mergeClasses } from '../../shared/utilities';

export const PanelHeader: FC<PanelHeaderProps> = React.forwardRef(
  (props: PanelHeaderProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionDefaultButtonProps,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeIcon = IconName.mdiClose,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      gradient = false,
      locale = enUS,
      onClose,
      theme,
      themeContainerId,
      title,
      ...rest
    } = props;

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [panelLocale] = useLocaleReceiver('Panel');
    let mergedLocale: PanelLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = panelLocale || props.locale;
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

    return (
      <LocaleReceiver componentName={'Panel'} defaultLocale={enUS}>
        {(_contextLocale: PanelLocale) => {
          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <div
                ref={ref}
                {...rest}
                className={mergeClasses([
                  styles.logoGradientHeaderWrapper,
                  { [themedComponentStyles.theme]: mergedTheme },
                ])}
              >
                <div className={styles.headerTitle}>
                  {actionDefaultButtonProps && (
                    <Button
                      configContextProps={configContextProps}
                      gradient={mergedGradient}
                      theme={mergedTheme}
                      themeContainerId={themeContainerId}
                      variant={ButtonVariant.SystemUI}
                      {...actionDefaultButtonProps}
                    />
                  )}
                  {title}
                </div>
                <div className={styles.headerActionButtons}>
                  {actionButtonOneProps && (
                    <Button
                      configContextProps={configContextProps}
                      gradient={mergedGradient}
                      theme={mergedTheme}
                      themeContainerId={themeContainerId}
                      variant={ButtonVariant.SystemUI}
                      {...actionButtonOneProps}
                    />
                  )}
                  {actionButtonTwoProps && (
                    <Button
                      configContextProps={configContextProps}
                      gradient={mergedGradient}
                      theme={mergedTheme}
                      themeContainerId={themeContainerId}
                      variant={ButtonVariant.SystemUI}
                      {...actionButtonTwoProps}
                    />
                  )}
                  {onClose && (
                    <Button
                      configContextProps={configContextProps}
                      gradient={mergedGradient}
                      iconProps={{
                        path: closeIcon,
                        color: 'var(--white-color)',
                      }}
                      ariaLabel={closeButtonAriaLabelText}
                      onClick={onClose}
                      theme={mergedTheme}
                      themeContainerId={themeContainerId}
                      transparent
                      variant={ButtonVariant.SystemUI}
                    />
                  )}
                </div>
              </div>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
