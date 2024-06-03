'use client';

import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { DialogProps, DialogSize } from './Dialog.types';
import { mergeClasses } from '../../shared/utilities';
import { Button, ButtonVariant } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';
import { DialogLocale } from './BaseDialog/BaseDialog.types';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './BaseDialog/Locale/en_US';

import styles from './dialog.module.scss';
import themedComponentStyles from './dialog.theme.module.scss';

export const Dialog: FC<DialogProps> = React.forwardRef(
  (props: DialogProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      actionsClassNames,
      bodyClassNames,
      bodyPadding = true,
      cancelButtonProps,
      cancelText: defaultCancelButtonText,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      dialogClassNames,
      gradient = false,
      headerButtonProps,
      headerClassNames,
      headerIcon,
      height,
      locale = enUS,
      okButtonProps,
      okText: defaultOkButtonText,
      onOk,
      onCancel,
      overlay,
      parent = typeof document !== 'undefined' ? document.body : null,
      size = DialogSize.medium,
      theme,
      themeContainerId,
      width,
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
    const [dialogLocale] = useLocaleReceiver('Dialog');
    let mergedLocale: DialogLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = dialogLocale || props.locale;
    }

    const [cancelText, setCancelButtonText] = useState<string>(
      defaultCancelButtonText
    );
    const [closeButtonAriaLabelText, setCloseButtonAriaLabelText] =
      useState<string>(defaultCloseButtonAriaLabelText);
    const [okText, setOkButtonText] = useState<string>(defaultOkButtonText);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCancelButtonText(
        props.cancelText ? props.cancelText : mergedLocale.lang!.cancelText
      );
      setCloseButtonAriaLabelText(
        props.closeButtonAriaLabelText
          ? props.closeButtonAriaLabelText
          : mergedLocale.lang!.closeButtonAriaLabelText
      );
      setOkButtonText(props.okText ? props.okText : mergedLocale.lang!.okText);
    }, [mergedLocale]);

    const dialogClasses: string = mergeClasses([
      styles.dialog,
      { [styles.noBodyPadding]: bodyPadding === false },
      dialogClassNames,
      { [styles.small]: size === DialogSize.small },
      { [styles.medium]: size === DialogSize.medium },
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const actionClasses: string = mergeClasses([
      styles.footer,
      actionsClassNames,
    ]);

    return (
      <LocaleReceiver componentName={'Dialog'} defaultLocale={enUS}>
        {(contextLocale: DialogLocale) => {
          const locale = { ...contextLocale, ...mergedLocale };

          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <BaseDialog
                {...rest}
                ref={ref}
                actionButtonOneProps={actionButtonOneProps}
                actionButtonTwoProps={actionButtonTwoProps}
                actionButtonThreeProps={actionButtonThreeProps}
                actions={
                  <>
                    {cancelButtonProps && (
                      <Button
                        configContextProps={configContextProps}
                        gradient={mergedGradient}
                        text={cancelText}
                        theme={mergedTheme}
                        themeContainerId={themeContainerId}
                        variant={
                          mergedGradient
                            ? ButtonVariant.Secondary
                            : ButtonVariant.Neutral
                        }
                        {...cancelButtonProps}
                        onClick={onCancel}
                      />
                    )}
                    {okButtonProps && (
                      <Button
                        configContextProps={configContextProps}
                        gradient={mergedGradient}
                        text={okText}
                        theme={mergedTheme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Primary}
                        {...okButtonProps}
                        onClick={onOk}
                      />
                    )}
                  </>
                }
                actionsClassNames={actionClasses}
                bodyClassNames={bodyClasses}
                bodyPadding={bodyPadding}
                closeButtonAriaLabelText={closeButtonAriaLabelText}
                closeButtonProps={closeButtonProps}
                closeIcon={closeIcon}
                configContextProps={configContextProps}
                dialogClassNames={dialogClasses}
                gradient={mergedGradient}
                headerButtonProps={headerButtonProps}
                headerClassNames={headerClasses}
                headerIcon={headerIcon}
                height={height}
                locale={locale}
                okText={okText}
                overlay={overlay}
                theme={mergedTheme}
                themeContainerId={themeContainerId}
                width={width}
              />
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
