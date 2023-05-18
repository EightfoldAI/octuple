import React, { FC, Ref, useEffect, useState } from 'react';
import { MessageBarsProps, MessageBarType } from './MessageBar.types';
import { InfoBarLocale } from '../InfoBar/InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { ButtonShape, NeutralButton } from '../Button';
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

    const getIconName = (): IconName => {
      if (icon) {
        return icon;
      }
      switch (type) {
        case MessageBarType.disruptive:
        case MessageBarType.neutral:
          return IconName.mdiInformation;
        case MessageBarType.positive:
          return IconName.mdiCheckCircle;
        case MessageBarType.warning:
          return IconName.mdiAlert;
      }
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
                    <NeutralButton {...actionButtonProps} />
                  )}
                  {closable && (
                    <NeutralButton
                      ariaLabel={closeButtonAriaLabelText}
                      iconProps={{ path: closeIcon }}
                      onClick={onClose}
                      shape={ButtonShape.Round}
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
