import React, { FC } from 'react';

import { mergeClasses } from '../../shared/utilities';

import { PanelHeaderProps } from './Panel.types';

import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';

import styles from './panel.module.scss';

export const PanelHeader: FC<PanelHeaderProps> = ({ onClose, title }) => {
    const headerTitle: string = mergeClasses(['octuple-h4', styles.headerTitle]);

    return (
        <div className={styles.logoGradientHeaderWrapper}>
            <div className={headerTitle}>{title}</div>
            <div>
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
