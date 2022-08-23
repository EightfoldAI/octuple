import React, { FC } from 'react';

import { PanelHeaderProps } from './Panel.types';

import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';

import styles from './panel.module.scss';

export const PanelHeader: FC<PanelHeaderProps> = ({
    onClose,
    closeIcon = IconName.mdiClose,
    title,
    actionDefaultButtonProps,
    actionButtonOneProps,
    actionButtonTwoProps,
}) => {
    return (
        <div className={styles.logoGradientHeaderWrapper}>
            <div className={styles.headerTitle}>
                {!!actionDefaultButtonProps && (
                    <SystemUIButton {...actionDefaultButtonProps} />
                )}
                {title}
            </div>
            <div className={styles.headerActionButtons}>
                {!!actionButtonOneProps && (
                    <SystemUIButton {...actionButtonOneProps} />
                )}
                {!!actionButtonTwoProps && (
                    <SystemUIButton {...actionButtonTwoProps} />
                )}
                {!!onClose && (
                    <SystemUIButton
                        iconProps={{
                            path: closeIcon,
                            color: 'var(--white-color)',
                        }}
                        ariaLabel={'Close'}
                        onClick={onClose}
                        transparent
                    />
                )}
            </div>
        </div>
    );
};
