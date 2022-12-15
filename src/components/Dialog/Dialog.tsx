import React, { FC, Ref, useEffect, useState } from 'react';
import { DialogProps, DialogSize } from './Dialog.types';
import { mergeClasses } from '../../shared/utilities';
import { NeutralButton, PrimaryButton } from '../Button';
import { BaseDialog } from './BaseDialog/BaseDialog';
import { DialogLocale } from './BaseDialog/BaseDialog.types';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './BaseDialog/Locale/en_US';

import styles from './dialog.module.scss';

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
      dialogClassNames,
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
      parent = document.body,
      size = DialogSize.medium,
      width,
      ...rest
    } = props;

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
            <BaseDialog
              {...rest}
              ref={ref}
              actionButtonOneProps={actionButtonOneProps}
              actionButtonTwoProps={actionButtonTwoProps}
              actionButtonThreeProps={actionButtonThreeProps}
              actions={
                <>
                  {cancelButtonProps && (
                    <NeutralButton
                      text={cancelText}
                      {...cancelButtonProps}
                      onClick={onCancel}
                    />
                  )}
                  {okButtonProps && (
                    <PrimaryButton
                      text={okText}
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
              dialogClassNames={dialogClasses}
              headerButtonProps={headerButtonProps}
              headerClassNames={headerClasses}
              headerIcon={headerIcon}
              height={height}
              locale={locale}
              okText={okText}
              overlay={overlay}
              width={width}
            />
          );
        }}
      </LocaleReceiver>
    );
  }
);
