import React, { FC, Ref, useEffect, useState } from 'react';
import { InfoBarLocale, InfoBarsProps, InfoBarType } from './InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { SystemUIButton } from '../Button';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './infoBar.module.scss';

export const InfoBar: FC<InfoBarsProps> = React.forwardRef(
  (props: InfoBarsProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonProps,
      classNames,
      closable,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      content,
      icon,
      locale = enUS,
      onClose,
      role = 'presentation',
      style,
      type = InfoBarType.neutral,
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

    const infoBarClasses: string = mergeClasses([
      styles.infoBar,
      classNames,
      { [styles.neutral]: type === InfoBarType.neutral },
      { [styles.positive]: type === InfoBarType.positive },
      { [styles.warning]: type === InfoBarType.warning },
      { [styles.disruptive]: type === InfoBarType.disruptive },
    ]);

    const messageClasses: string = mergeClasses([styles.message, 'body2']);

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
            <div
              {...rest}
              className={infoBarClasses}
              ref={ref}
              style={style}
              role={role}
            >
              <Icon path={getIconName()} classNames={styles.icon} />
              <div className={messageClasses}>{content}</div>
              {actionButtonProps && (
                <SystemUIButton
                  {...actionButtonProps}
                  disruptive={type === InfoBarType.disruptive}
                />
              )}
              {closable && (
                <SystemUIButton
                  iconProps={{ path: closeIcon }}
                  ariaLabel={closeButtonAriaLabelText}
                  onClick={onClose}
                  {...closeButtonProps}
                  disruptive={type === InfoBarType.disruptive}
                />
              )}
            </div>
          );
        }}
      </LocaleReceiver>
    );
  }
);
