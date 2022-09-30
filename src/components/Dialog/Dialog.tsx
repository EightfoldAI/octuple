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
            cancelButtonText: defaultCancelButtonText,
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
            okButtonText: defaultOkButtonText,
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

        const [cancelButtonText, setCancelButtonText] = useState<string>(
            defaultCancelButtonText
        );
        const [closeButtonAriaLabelText, setCloseButtonAriaLabelText] =
            useState<string>(defaultCloseButtonAriaLabelText);
        const [okButtonText, setOkButtonText] =
            useState<string>(defaultOkButtonText);

        // Locs: if the prop isn't provided use the loc defaults.
        // If the mergedLocale is changed, update.
        useEffect(() => {
            setCancelButtonText(
                props.cancelButtonText
                    ? props.cancelButtonText
                    : mergedLocale.lang!.cancelButtonText
            );
            setCloseButtonAriaLabelText(
                props.closeButtonAriaLabelText
                    ? props.closeButtonAriaLabelText
                    : mergedLocale.lang!.closeButtonAriaLabelText
            );
            setOkButtonText(
                props.okButtonText
                    ? props.okButtonText
                    : mergedLocale.lang!.okButtonText
            );
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
                                            text={cancelButtonText}
                                            {...cancelButtonProps}
                                            onClick={onCancel}
                                        />
                                    )}
                                    {okButtonProps && (
                                        <PrimaryButton
                                            text={okButtonText}
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
                            okButtonText={okButtonText}
                            overlay={overlay}
                            width={width}
                        />
                    );
                }}
            </LocaleReceiver>
        );
    }
);
