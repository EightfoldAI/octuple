import React, { FC } from 'react';
import { SnackbarProps, SnackbarType } from './Snackbar.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName } from '../Icon';
import { NeutralButton } from '../Button';

import styles from './snackbar.module.scss';

export const Snackbar: FC<SnackbarProps> = ({
    content,
    icon,
    type = SnackbarType.neutral,
    closable,
    onClose,
    style,
    className,
    closeIcon = IconName.mdiClose,
    closeButtonProps,
}) => {
    const snackbarClasses: string = classNames([
        styles.snackbars,
        className,
        { [styles.neutral]: type === SnackbarType.neutral },
        { [styles.positive]: type === SnackbarType.positive },
        { [styles.warning]: type === SnackbarType.warning },
        { [styles.disruptive]: type === SnackbarType.disruptive },
    ]);

    const messageClasses: string = classNames([styles.message, 'body2']);

    const getIconName = (): IconName => {
        if (icon) {
            return icon;
        }
        switch (type) {
            case SnackbarType.disruptive:
            case SnackbarType.neutral:
                return IconName.mdiInformation;
            case SnackbarType.positive:
                return IconName.mdiCheckCircle;
            case SnackbarType.warning:
                return IconName.mdiAlert;
        }
    };

    return (
        <div className={snackbarClasses} style={style}>
            <Icon path={getIconName()} className={styles.icon} />
            <div className={messageClasses}>{content}</div>
            {closable && (
                <NeutralButton
                    icon={closeIcon}
                    ariaLabel={'Close'}
                    onClick={onClose}
                    {...closeButtonProps}
                />
            )}
        </div>
    );
};
