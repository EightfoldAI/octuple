import React, { FC, Ref } from 'react';
import { InfoBarsProps, InfoBarType } from './InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { SystemUIButton } from '../Button';

import styles from './infoBar.module.scss';

export const InfoBar: FC<InfoBarsProps> = React.forwardRef(
    (
        {
            content,
            icon,
            type = InfoBarType.neutral,
            closable,
            onClose,
            style,
            classNames,
            closeIcon = IconName.mdiClose,
            closeButtonProps,
            actionButtonProps,
            role = 'presentation',
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
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
                        ariaLabel={'Close'}
                        onClick={onClose}
                        {...closeButtonProps}
                        disruptive={type === InfoBarType.disruptive}
                    />
                )}
            </div>
        );
    }
);
