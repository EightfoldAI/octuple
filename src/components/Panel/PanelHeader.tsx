import React, { FC, Ref, useEffect, useState } from 'react';
import { PanelHeaderProps, PanelLocale } from './Panel.types';
import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';
import LocaleReceiver, {
    useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './panel.module.scss';

export const PanelHeader: FC<PanelHeaderProps> = React.forwardRef(
    (props: PanelHeaderProps, ref: Ref<HTMLDivElement>) => {
        const {
            actionButtonOneProps,
            actionButtonTwoProps,
            actionDefaultButtonProps,
            closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
            closeIcon = IconName.mdiClose,
            locale = enUS,
            onClose,
            title,
            ...rest
        } = props;

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
                        <div
                            ref={ref}
                            {...rest}
                            className={styles.logoGradientHeaderWrapper}
                        >
                            <div className={styles.headerTitle}>
                                {actionDefaultButtonProps && (
                                    <SystemUIButton
                                        {...actionDefaultButtonProps}
                                    />
                                )}
                                {title}
                            </div>
                            <div className={styles.headerActionButtons}>
                                {actionButtonOneProps && (
                                    <SystemUIButton {...actionButtonOneProps} />
                                )}
                                {actionButtonTwoProps && (
                                    <SystemUIButton {...actionButtonTwoProps} />
                                )}
                                {onClose && (
                                    <SystemUIButton
                                        iconProps={{
                                            path: closeIcon,
                                            color: 'var(--white-color)',
                                        }}
                                        ariaLabel={closeButtonAriaLabelText}
                                        onClick={onClose}
                                        transparent
                                    />
                                )}
                            </div>
                        </div>
                    );
                }}
            </LocaleReceiver>
        );
    }
);
