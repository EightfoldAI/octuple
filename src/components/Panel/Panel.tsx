import React, { FC, MouseEventHandler } from 'react';
import { classNames } from '../../shared/utilities';
import { PanelProps, SizeType } from './';

import styles from './panel.module.scss';

export const Panel: FC<PanelProps> = ({
    size = 'medium',
    visible = false,
    onClose = () => {},
    children,
}) => {
    const panelBackdropClasses: string = classNames([
        styles.panelBackdrop,
        { [styles.visible]: visible },
    ]);

    const panelClasses: string = classNames([
        styles.panel,
        styles.right,
        { [styles.large]: size === SizeType.large },
        { [styles.medium]: size === SizeType.medium },
        { [styles.small]: size === SizeType.small },
    ]);

    return (
        <div className={panelBackdropClasses} onClick={onClose}>
            <div
                className={panelClasses}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
};
