import React, { FC } from 'react';

import { mergeClasses } from '../../shared/utilities';

import { EventType } from './Panel.types';

import { SystemUIButton } from '../Button';
import { IconName } from '../Icon';

import styles from './panel.module.scss';

interface PanelHeaderProps {
    onClose?: (e: EventType) => void;
    title?: string;
}

export const PanelHeader: FC<PanelHeaderProps> = ({ onClose, title }) => {
    const headerTitle: string = mergeClasses(['header4', styles.headerTitle]);

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
