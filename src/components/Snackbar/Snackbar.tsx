import React, { FC, Ref, useImperativeHandle } from 'react';
import { SnackbarProps, SnackbarType } from './Snackbar.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName } from '../Icon';

import styles from './snackbar.module.scss';

export type SnackbarHandler = {
    addSnack: () => void;
    removeSnack: () => void;
};

export const Snackbar = React.forwardRef<SnackbarHandler, SnackbarProps>(
    ({ message, type = SnackbarType.neutral }, ref) => {
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

        const addSnack = () => {};

        const removeSnack = () => {};

        useImperativeHandle(ref, () => ({
            addSnack,
            removeSnack,
        }));

        return (
            <div className={snackbarClasses}>
                <Icon path={getIconName()} className={styles.icon} />
                <div className={messageClasses}>{message}</div>
            </div>
        );
    }
);
