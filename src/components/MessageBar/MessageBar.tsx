'use client';

import React, { FC, Ref, useEffect, useState } from 'react';
import { MessageBarsProps, MessageBarType } from './MessageBar.types';
import { InfoBarLocale } from '../InfoBar/InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from '../InfoBar/Locale/en_US';

import styles from './messageBar.module.scss';

export const MessageBar: FC<MessageBarsProps> = React.forwardRef(
  (props: MessageBarsProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonProps,
      classNames,
      closable,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      content,
      header,
      icon,
      locale = enUS,
      onClose,
      role = 'alert',
      style,
      type = MessageBarType.neutral,
      ...rest
    } = props;

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

    const messageBarClassNames: string = mergeClasses([
      styles.messageBar,
      classNames,
      { [styles.neutral]: type === MessageBarType.neutral },
      { [styles.positive]: type === MessageBarType.positive },
      { [styles.warning]: type === MessageBarType.warning },
      { [styles.disruptive]: type === MessageBarType.disruptive },
    ]);

    const messageBarTypeToIconNameMap = new Map<MessageBarType, IconName>([
      [MessageBarType.disruptive, IconName.mdiAlertCircle],
      [MessageBarType.neutral, IconName.mdiInformation],
      [MessageBarType.positive, IconName.mdiCheckCircle],
      [MessageBarType.warning, IconName.mdiAlert],
    ]);

    const getIconName = (): IconName => {
      if (icon) {
        return icon;
      }
      return messageBarTypeToIconNameMap.get(type);
    };

    return (
      <LocaleReceiver componentName={'InfoBar'} defaultLocale={enUS}>
        {(_contextLocale: InfoBarLocale) => {
          return (
            <div
              {...rest}
              className={messageBarClassNames}
              ref={ref}
              style={style}
              role={role}
            >
              <Icon path={getIconName()} classNames={styles.icon} />
              <div className={styles.message}>
                {header && <h4 className={styles.header}>{header}</h4>}
                <div className={styles.innerMessage}>{content}</div>
              </div>
              {(actionButtonProps || closable) && (
                <div className={styles.actions}>
                  {actionButtonProps && (
                    <Button
                      variant={ButtonVariant.Neutral}
                      {...actionButtonProps}
                    />
                  )}
                  {closable && (
                    <Button
                      ariaLabel={closeButtonAriaLabelText}
                      iconProps={{ path: closeIcon }}
                      onClick={onClose}
                      shape={ButtonShape.Round}
                      variant={ButtonVariant.Neutral}
                      {...closeButtonProps}
                    />
                  )}
                </div>
              )}
            </div>
          );
        }}
      </LocaleReceiver>
    );
  }
);
