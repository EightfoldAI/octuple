import { IconName } from './mdi';
import { IconProps as MdiIconProps } from '@mdi/react/dist/IconProps';

export enum IconSize {
    Large = '24px',
    Medium = '20px',
    Small = '16px',
    XSmall = '14px',
}

export interface IconProps extends MdiIconProps {
    /**
     * The icon svg path name.
     */
    path: IconName;
    /**
     * The icon is aria-hidden.
     * @default false
     */
    ariaHidden?: boolean;
    /**
     * The icon class names.
     */
    className?: string;
    /**
     * The icon color.
     */
    color?: string;
    /**
     * The icon description.
     */
    description?: string;
    /**
     * The icon is horizontal.
     * @default false
     */
    horizontal?: boolean;
    /**
     * The icon id.
     */
    id?: string;
    /**
     * The icon aria role.
     * @default 'presentation'
     */
    role?: string;
    /**
     * The icon is rotated.
     * @default 0
     */
    rotate?: number;
    /**
     * The icon size.
     * @default IconSize.Medium
     */
    size?: IconSize;
    /**
     * The icon spin animation timer in milliseconds, seconds.
     * @default false
     */
    spin?: boolean | number;
    /**
     * The icon title.
     */
    title?: string;
    /**
     * The icon is vertical.
     * @default false
     */
    vertical?: boolean;
}
