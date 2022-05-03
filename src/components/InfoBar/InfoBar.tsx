import React, { FC } from 'react';
import { InfoBarsProps, InfoBarType } from './InfoBar.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';
import { NeutralButton } from '../Button';

import styles from './infoBar.module.scss';

export const InfoBar: FC<InfoBarsProps> = ({
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
}) => {
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
        <div className={infoBarClasses} style={style} role={role}>
            <Icon path={getIconName()} classNames={styles.icon} />
            <div className={messageClasses}>{content}</div>
            {actionButtonProps && <NeutralButton {...actionButtonProps} />}
            {closable && (
                <NeutralButton
                    iconProps={{ path: closeIcon }}
                    ariaLabel={'Close'}
                    onClick={onClose}
                    {...closeButtonProps}
                />
            )}
        </div>
    );
};
