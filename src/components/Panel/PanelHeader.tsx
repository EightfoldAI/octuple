import React, { FC } from 'react';

import { PanelHeaderProps } from './Panel.types';

import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';

import styles from './panel.module.scss';

export const PanelHeader: FC<PanelHeaderProps> = ({
    onClose,
    title,
    onNoodles,
    onMaximise,
}) => {
    return (
        <div className={styles.logoGradientHeaderWrapper}>
            <div className={styles.headerTitle}>{title}</div>
            <div className={styles.headerActionButtons}>
                {!!onNoodles && (
                    <SystemUIButton
                        iconProps={{
                            path: IconName.mdiNoodles,
                            color: 'var(--white-color)',
                        }}
                        onClick={onNoodles}
                        transparent
                    />
                )}
                {!!onMaximise && (
                    <SystemUIButton
                        iconProps={{
                            path: IconName.mdiArrowExpand,
                            color: 'var(--white-color)',
                        }}
                        onClick={onMaximise}
                        transparent
                    />
                )}
                {!!onClose && (
                    <SystemUIButton
                        iconProps={{
                            path: IconName.mdiClose,
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
