import * as React from 'react';
import { IconName } from '../Icon';
import { OcThemeNames } from '../ConfigProvider';

export interface PillProps {
    theme?: OcThemeNames;
    color?: string;
    icon?: IconName;
    closable?: boolean;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
