export enum IconSize {
    Large = '1.5rem',
    Medium = '1.25rem',
    Small = '1rem',
    XSmall = '0.875rem',
}

export interface IconProps {
    /**
     * The icon string.
     */
    icon: string;
    /**
     * The icon is aria-hidden.
     */
    ariaHidden?: boolean;
    /**
     * The icon class names.
     */
    classes?: string;
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
     */
    horizontal?: boolean;
    /**
     * The icon aria role.
     */
    role?: string;
    /**
     * The icon is rotated.
     */
    rotate?: number;
    /**
     * The icon size.
     */
    size?: IconSize;
    /**
     * The icon spin animation timer in milliseconds, seconds.
     */
    spin?: number;
    /**
     * The icon title.
     */
    title?: string;
    /**
     * The icon is vertical.
     */
    vertical?: boolean;
}
