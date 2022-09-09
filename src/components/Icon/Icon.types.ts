import { IconName } from './mdi';
import { IconProps as MdiIconProps } from '@mdi/react/dist/IconProps';

export enum IconSize {
    Large = '24px',
    Medium = '20px',
    Small = '16px',
    XSmall = '14px',
}

export interface IconProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        Omit<MdiIconProps, 'path'> {
    /**
     * The icon is aria-hidden.
     * @default false
     */
    ariaHidden?: boolean;
    /**
     * Custom classnames of the component
     */
    classNames?: string;
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
     * Name of the icon as defined in icomoon app
     */
    icomoonIconName?: string;
    /**
     * The icon id.
     */
    id?: string;
    /**
     * The icon svg path name.
     */
    path?: IconName;
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
    size?: IconSize | string;
    /**
     * The icon spin animation timer in milliseconds, seconds.
     * @default false
     */
    spin?: boolean | number;
    /**
     * Style of the icon wrapper
     */
    style?: React.CSSProperties;
    /**
     * The icon title.
     */
    title?: string;
    /**
     * The icon is vertical.
     * @default false
     */
    vertical?: boolean;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;
}
