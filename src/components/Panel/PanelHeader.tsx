import React, { FC } from 'react';

import { mergeClasses } from '../../shared/utilities';

import { PanelHeaderProps } from './Panel.types';

import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';

import styles from './panel.module.scss';

export const PanelHeader: FC<PanelHeaderProps> = ({ onClose, title }) => {
    return (
        <div className={styles.logoGradientHeaderWrapper}>
            <div className={styles.headerTitle}>{title}</div>
            <div className={styles.headerActionButtons}>
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
