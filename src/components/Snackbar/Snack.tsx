import React, { FC } from 'react';
import { SnackbarProps, SnackbarType } from './Snackbar.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName } from '../Icon';

import styles from './snackbar.module.scss';

export const Snack: FC<SnackbarProps> = ({
    message,
    type = SnackbarType.neutral,
}) => {
    const snackbarClasses = classNames([
        styles.snackbars,
        { [styles.neutral]: type === SnackbarType.neutral },
        { [styles.positive]: type === SnackbarType.positive },
        { [styles.warning]: type === SnackbarType.warning },
        { [styles.disruptive]: type === SnackbarType.disruptive },
    ]);

    const messageClasses = classNames([styles.message, 'body2']);

    const getIconName = () => {
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
        <div className={snackbarClasses}>
            <Icon path={getIconName()} className={styles.icon} />
            <div className={messageClasses}>{message}</div>
        </div>
    );
};
