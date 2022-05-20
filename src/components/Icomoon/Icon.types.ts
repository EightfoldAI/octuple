import { OcBaseProps } from '../OcBase';

export enum IcomoonSize {
    Large = '24px',
    Medium = '20px',
    Small = '16px',
    XSmall = '14px',
}

export interface IcomoonProps extends OcBaseProps<HTMLSpanElement> {
    /**
     * The icon is aria-hidden.
     * @default false
     */
    ariaHidden?: boolean;
    /**
     * The icon color.
     */
    color?: string;
    /**
     * Name of the icon as defined in icomoon app
     */
    iconName: string;
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
    size?: IcomoonSize | string;
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
